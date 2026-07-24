import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { getJwtSecret } from '../lib/jwt.js';
import { applyCors } from '../lib/cors.js';

// Progreso de video del alumno. Las filas de inscripción (videoId null)
// las gestiona el admin en api/users/[id]/courses.ts — aquí no se tocan.
function getUserId(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  try {
    if (req.method === 'GET') {
      const courseIdParam = req.query.courseId;
      const courseIdStr = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;

      if (courseIdStr) {
        const courseId = parseInt(courseIdStr, 10);
        if (Number.isNaN(courseId)) return res.status(400).json({ error: 'courseId inválido' });
        const rows = await prisma.progress.findMany({
          where: { userId, courseId, videoId: { not: null } },
          select: { videoId: true, completed: true },
          orderBy: { updatedAt: 'desc' },
        });
        return res.json({
          completedVideoIds: rows.filter((r) => r.completed).map((r) => r.videoId),
          lastVideoId: rows[0]?.videoId ?? null,
        });
      }

      // Sin courseId: lo último visto en cualquier curso (para "Continuar")
      const last = await prisma.progress.findFirst({
        where: { userId, videoId: { not: null } },
        orderBy: { updatedAt: 'desc' },
        select: { courseId: true, videoId: true, completed: true, updatedAt: true },
      });
      return res.json({ lastWatched: last });
    }

    if (req.method === 'POST') {
      const { courseId, videoId, moduleId, completed } = (req.body ?? {}) as {
        courseId?: number;
        videoId?: number;
        moduleId?: number;
        completed?: boolean;
      };
      if (typeof courseId !== 'number' || typeof videoId !== 'number') {
        return res.status(400).json({ error: 'courseId y videoId son requeridos' });
      }

      const existing = await prisma.progress.findFirst({
        where: { userId, courseId, videoId },
      });

      const row = existing
        ? await prisma.progress.update({
            where: { id: existing.id },
            data: {
              completed: typeof completed === 'boolean' ? completed : existing.completed,
              progress:
                completed === true ? 100 : completed === false ? 0 : Math.max(existing.progress, 1),
            },
          })
        : await prisma.progress.create({
            data: {
              userId,
              courseId,
              videoId,
              moduleId: typeof moduleId === 'number' ? moduleId : null,
              completed: completed === true,
              progress: completed === true ? 100 : 1,
            },
          });

      return res.json({ ok: true, completed: row.completed });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error en /api/progress:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
}
