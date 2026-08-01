import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authService } from '../server/services/auth.service.js';
import { applyCors } from '../lib/cors.js';
import { isRateLimited, recordFailure, getClientIp } from '../lib/rate-limit.js';

// Holgado a propósito: un grupo entero puede registrarse desde la misma red
// (taller presencial). Solo frena la creación masiva y automatizada.
const REGISTER_LIMIT = 15;
const REGISTER_WINDOW = 60 * 60_000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ipKey = `register-ip:${getClientIp(req)}`;
  if (isRateLimited(ipKey, REGISTER_LIMIT)) {
    return res.status(429).json({ error: 'Demasiados registros desde esta conexión. Intenta más tarde.' });
  }

  try {
    const { email, password, name } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const result = await authService.registerUser({ email, password, name });
    recordFailure(ipKey, REGISTER_WINDOW);
    return res.status(201).json(result);
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(400).json({
      error: error.message || 'Error al registrar usuario',
    });
  }
}
