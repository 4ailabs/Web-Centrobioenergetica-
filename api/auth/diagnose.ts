import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.json({
        userExists: false,
        message: 'El email no está registrado.',
        action: 'Por favor, regístrate primero.',
      });
    }

    if (!user.approved) {
      return res.json({
        userExists: true,
        isApproved: false,
        message: 'Tu cuenta está pendiente de aprobación.',
        action: 'Un administrador debe aprobar tu cuenta antes de poder iniciar sesión.',
      });
    }

    if (!user.password) {
      return res.json({
        userExists: true,
        isApproved: true,
        hasPassword: false,
        message: 'Tu cuenta no tiene contraseña configurada.',
        action: 'Contacta al administrador para configurar tu contraseña.',
      });
    }

    const isPasswordValid = password ? await bcrypt.compare(password, user.password) : false;

    if (!isPasswordValid) {
      return res.json({
        userExists: true,
        isApproved: true,
        hasPassword: true,
        isPasswordValid: false,
        message: 'La contraseña es incorrecta.',
        action: 'Por favor, verifica tu contraseña e intenta de nuevo.',
      });
    }

    return res.json({
      userExists: true,
      isApproved: true,
      hasPassword: true,
      isPasswordValid: true,
      message: 'Las credenciales son válidas.',
    });
  } catch (error: any) {
    console.error('Error diagnosing:', error);
    return res.status(500).json({ error: 'Error al diagnosticar' });
  }
}

