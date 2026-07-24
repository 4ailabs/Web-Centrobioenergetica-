import type { VercelRequest, VercelResponse } from '@vercel/node';
import { usersService } from '../server/services/users.service.js';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

import { getJwtSecret } from '../lib/jwt.js';

async function verifyAdmin(req: VercelRequest): Promise<{ valid: boolean; error?: string; user?: any }> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return { valid: false, error: 'No token provided' };

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string; email: string; isAdmin: boolean };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isAdmin) return { valid: false, error: 'Not authorized' };
    return { valid: true, user };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}

import { applyCors } from '../lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const auth = await verifyAdmin(req);
    if (!auth.valid) return res.status(401).json({ error: auth.error });

    if (req.method === 'GET') {
      const users = await usersService.getAllUsers();
      return res.json(users);
    }

    if (req.method === 'POST') {
      const user = await usersService.createUser(req.body);
      return res.status(201).json(user);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/users:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
