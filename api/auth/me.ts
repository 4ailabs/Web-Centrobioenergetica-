import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; isAdmin: boolean };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        approved: true,
        totalXP: true,
        premiumUnlocked: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!user.approved) {
      return res.status(403).json({ error: 'Usuario no aprobado' });
    }

    // Cargar cursos inscritos del usuario
    const enrollments = await prisma.progress.findMany({
      where: { userId: user.id },
      select: { courseId: true },
      distinct: ['courseId'],
    });

    return res.json({
      user: {
        ...user,
        totalXP: user.totalXP || 0,
        enrolledCourses: enrollments
          .map((e) => e.courseId?.toString() || '')
          .filter(Boolean),
        subscriptionStatus: user.premiumUnlocked ? 'active' : 'inactive',
      }
    });
  } catch (error: any) {
    console.error('Error in /api/auth/me:', error);

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
