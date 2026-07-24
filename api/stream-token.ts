import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { getJwtSecret } from '../lib/jwt.js';
import { applyCors } from '../lib/cors.js';
import { MOCK_DATA } from '../data/mockData.js';

// Localiza a qué curso pertenece un video de Cloudflare Stream.
function findCourseIdByStreamUid(uid: string): number | null {
  for (const course of MOCK_DATA.courses) {
    for (const mod of course.modules ?? []) {
      for (const video of mod.videos ?? []) {
        if (video.cloudflareStreamId === uid) return course.id;
      }
    }
  }
  return null;
}

// Emite un token de reproducción firmado de Cloudflare Stream, solo para
// alumnos autenticados, aprobados y con el curso asignado (o admin/premium).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const uidParam = req.query.uid;
  const uid = Array.isArray(uidParam) ? uidParam[0] : uidParam;
  if (!uid || !/^[a-f0-9]{32}$/.test(uid)) {
    return res.status(400).json({ error: 'Video inválido' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, approved: true, isAdmin: true, premiumUnlocked: true },
    });
    if (!user || !user.approved) {
      return res.status(403).json({ error: 'Usuario no autorizado' });
    }

    const courseId = findCourseIdByStreamUid(uid);
    if (courseId === null) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    if (!user.isAdmin && !user.premiumUnlocked) {
      const enrollment = await prisma.progress.findFirst({
        where: { userId: user.id, courseId },
        select: { id: true },
      });
      if (!enrollment) {
        return res.status(403).json({ error: 'No tienes acceso a este curso' });
      }
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    if (!accountId || !apiToken) {
      console.error('Faltan CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN en el entorno');
      return res.status(500).json({ error: 'Servicio de video no configurado' });
    }

    const cfResp = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${uid}/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        // 12 h: cubre jornadas grabadas completas sin dejar tokens eternos.
        body: JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 12 * 3600 }),
      }
    );
    const data = (await cfResp.json()) as {
      success?: boolean;
      result?: { token?: string };
      errors?: unknown;
    };
    if (!cfResp.ok || !data.success || !data.result?.token) {
      console.error('Error de Cloudflare al firmar token:', JSON.stringify(data.errors ?? data));
      return res.status(502).json({ error: 'No se pudo autorizar la reproducción' });
    }

    return res.json({ token: data.result.token });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    console.error('Error en /api/stream-token:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
}
