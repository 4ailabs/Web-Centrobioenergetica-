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

  try {
    // Verificar admin para todas las operaciones
    const auth = await verifyAdmin(req);
    if (!auth.valid) {
      return res.status(401).json({ error: auth.error });
    }

    // GET - Listar todos los usuarios
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          approved: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(users);
    }

    // POST - Crear nuevo usuario
    if (req.method === 'POST') {
      const { email, password, name, isAdmin, approved } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          isAdmin: isAdmin || false,
          approved: approved !== undefined ? approved : true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          isAdmin: true,
          approved: true,
        },
      });

      return res.status(201).json(user);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/users:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
