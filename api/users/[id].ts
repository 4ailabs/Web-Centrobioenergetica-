import type { VercelRequest, VercelResponse } from '@vercel/node';
import { usersService } from '../../server/services/users.service.js';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

async function verifyAdmin(req: VercelRequest): Promise<{ valid: boolean; error?: string; user?: any }> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return { valid: false, error: 'No token provided' };

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; isAdmin: boolean };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isAdmin) return { valid: false, error: 'Not authorized' };
    return { valid: true, user };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  try {
    const auth = await verifyAdmin(req);
    if (!auth.valid) return res.status(401).json({ error: auth.error });

    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, isAdmin: true, approved: true, createdAt: true },
      });
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.json(user);
    }

    if (req.method === 'PUT') {
      const user = await usersService.updateUser(userId, req.body);
      return res.json(user);
    }

    if (req.method === 'DELETE') {
      if (auth.user?.id === userId) return res.status(400).json({ error: 'No puedes eliminarte a ti mismo' });
      const result = await usersService.deleteUser(userId);
      return res.json(result);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/users/[id]:', error);
    if (error.code === 'P2025') return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
