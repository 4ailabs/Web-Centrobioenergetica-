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

  if (isRateLimited(`register:${getClientIp(req)}`, 5, 60 * 60_000)) {
    return res.status(429).json({ error: 'Demasiados registros desde esta conexión. Intenta más tarde.' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const result = await authService.registerUser({ email, password, name });
    return res.status(201).json(result);
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(400).json({
      error: error.message || 'Error al registrar usuario',
    });
  }
}
