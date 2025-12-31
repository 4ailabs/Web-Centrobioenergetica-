import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Validar contraseña: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números',
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email no es válido' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario (approved = false por defecto)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        approved: false, // Usuario pendiente de aprobación
      },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
      },
    });

    return res.status(201).json({
      message: 'Registro exitoso. Tu cuenta está pendiente de aprobación por un administrador.',
      user,
    });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      error: 'Error al registrar usuario. Por favor, intenta de nuevo.',
    });
  }
}

