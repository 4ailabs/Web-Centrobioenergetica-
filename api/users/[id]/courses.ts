import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper para verificar autenticación y admin
async function verifyAdmin(req: VercelRequest): Promise<{ valid: boolean; error?: string; user?: any }> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { valid: false, error: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; isAdmin: boolean };
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

      // Primero eliminar todos los progress existentes para cursos
      await prisma.progress.deleteMany({
        where: {
          userId: userId,
          courseId: { not: null }
        }
      });

      // Crear nuevos registros de progreso para cada curso
      if (courseIds.length > 0) {
        await prisma.progress.createMany({
          data: courseIds.map((courseId: string) => ({
            userId: userId,
            courseId: parseInt(courseId),
            completed: false,
            progress: 0,
          })),
          skipDuplicates: true,
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
