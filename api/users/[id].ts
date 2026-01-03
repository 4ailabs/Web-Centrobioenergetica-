import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
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

    // GET - Obtener usuario específico
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          approved: true,
          subscriptionStatus: true,
          enrolledCourses: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.json(user);
    }

    // PUT - Actualizar usuario
    if (req.method === 'PUT') {
      const { email, password, name, isAdmin, approved, subscriptionStatus, enrolledCourses } = req.body;

      const updateData: any = {};
      if (email !== undefined) updateData.email = email;
      if (name !== undefined) updateData.name = name;
      if (isAdmin !== undefined) updateData.isAdmin = isAdmin;
      if (approved !== undefined) updateData.approved = approved;
      if (subscriptionStatus !== undefined) updateData.subscriptionStatus = subscriptionStatus;
      if (enrolledCourses !== undefined) updateData.enrolledCourses = enrolledCourses;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          approved: true,
          subscriptionStatus: true,
          enrolledCourses: true,
        },
      });

      return res.json(user);
    }

    // DELETE - Eliminar usuario
    if (req.method === 'DELETE') {
      // Verificar que no se elimine a sí mismo
      if (auth.user?.id === userId) {
        return res.status(400).json({ error: 'No puedes eliminarte a ti mismo' });
      }

      await prisma.user.delete({
        where: { id: userId },
      });

      return res.json({ message: 'Usuario eliminado correctamente' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/users/[id]:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
