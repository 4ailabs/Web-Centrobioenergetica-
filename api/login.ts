import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authService } from '../server/services/auth.service.js';
import { applyCors } from '../lib/cors.js';
import { isRateLimited, getClientIp } from '../lib/rate-limit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(`login:${getClientIp(req)}`, 10, 5 * 60_000)) {
    return res.status(429).json({ error: 'Demasiados intentos. Espera unos minutos e intenta de nuevo.' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const result = await authService.loginUser({ email, password });
    return res.json(result);
  } catch (error: any) {
    console.error('Error logging in:', error);

    // Detectar errores de base de datos
    if (error.code === 'P2002' || error.code === 'P2025') {
      return res.status(500).json({ error: 'Error de base de datos. Por favor, intenta de nuevo.' });
    }

    if (error.message?.includes('Prisma') || error.message?.includes('database')) {
      return res.status(500).json({ error: 'Error de conexión con la base de datos. Por favor, intenta más tarde.' });
    }

    const status = error.message.includes('Credenciales') ? 401 :
      error.message.includes('aprobación') ? 403 : 500;
    return res.status(status).json({ error: error.message || 'Error al iniciar sesión' });
  }
}
