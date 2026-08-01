import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../../../lib/jwt.js';

const prisma = new PrismaClient();

// Helper para verificar autenticación y admin
async function verifyAdmin(req: VercelRequest): Promise<{ valid: boolean; error?: string; user?: any }> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { valid: false, error: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string; email: string; isAdmin: boolean };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isAdmin) {
      return { valid: false, error: 'Not authorized' };
    }

    return { valid: true, user };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}

import { applyCors } from '../../../lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Verificar admin
    const auth = await verifyAdmin(req);
    if (!auth.valid) {
      return res.status(401).json({ error: auth.error });
    }

    // PUT - Actualizar cursos del usuario
    if (req.method === 'PUT') {
      const { courseIds } = req.body;

      if (!Array.isArray(courseIds)) {
        return res.status(400).json({ error: 'courseIds must be an array' });
      }

      // Actualización diferencial. La inscripción y el avance del alumno
      // viven en las mismas filas de `progress`, así que reemplazarlas en
      // bloque borraba el progreso de los cursos que el alumno conserva.
      // Solo se crean los cursos añadidos y se borran los retirados; los
      // que permanecen no se tocan.
      const solicitados = courseIds
        .map((courseId: string) => parseInt(courseId, 10))
        .filter((courseId: number) => Number.isFinite(courseId));

      const inscripcionesActuales = await prisma.progress.findMany({
        where: { userId: userId, courseId: { not: null } },
        select: { courseId: true },
        distinct: ['courseId'],
      });
      const actuales = inscripcionesActuales
        .map((p) => p.courseId)
        .filter((courseId): courseId is number => courseId !== null);

      const aInscribir = solicitados.filter((courseId) => !actuales.includes(courseId));
      const aRetirar = actuales.filter((courseId) => !solicitados.includes(courseId));

      if (aInscribir.length > 0) {
        await prisma.progress.createMany({
          data: aInscribir.map((courseId) => ({
            userId: userId,
            courseId,
            completed: false,
            progress: 0,
          })),
          skipDuplicates: true,
        });
      }

      // Retirar un curso sí elimina su avance: es lo que significa quitarlo.
      if (aRetirar.length > 0) {
        await prisma.progress.deleteMany({
          where: { userId: userId, courseId: { in: aRetirar } },
        });
      }

      // Obtener los cursos actualizados del usuario
      const userProgress = await prisma.progress.findMany({
        where: {
          userId: userId,
          courseId: { not: null }
        },
        select: {
          courseId: true,
        }
      });

      const enrolledCourses = userProgress.map(p => p.courseId?.toString()).filter(Boolean);

      return res.json({
        message: 'Cursos actualizados',
        enrolledCourses
      });
    }

    // GET - Obtener cursos del usuario
    if (req.method === 'GET') {
      const userProgress = await prisma.progress.findMany({
        where: {
          userId: userId,
          courseId: { not: null }
        },
        select: {
          courseId: true,
          completed: true,
          progress: true,
        }
      });

      return res.json({
        courses: userProgress
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/users/[id]/courses:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
