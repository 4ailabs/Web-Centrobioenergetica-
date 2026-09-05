import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authService } from '../server/services/auth.service.js';
import { applyCors } from '../lib/cors.js';
import { isRateLimited, recordFailure, clearFailures, getClientIp } from '../lib/rate-limit.js';
import { emitirSesion } from '../lib/sesion.js';

// Ventanas de rate limiting. El límite por email es el que frena la fuerza
// bruta; el de IP es holgado a propósito para no bloquear a un grupo que
// entra desde la misma red (taller presencial, consultorio, red móvil).
const IP_LIMIT = 40;
const IP_WINDOW = 10 * 60_000;
const EMAIL_LIMIT = 8;
const EMAIL_WINDOW = 15 * 60_000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const ipKey = `login-ip:${getClientIp(req)}`;
  const emailKey = `login-email:${String(email).toLowerCase()}`;

  if (isRateLimited(emailKey, EMAIL_LIMIT) || isRateLimited(ipKey, IP_LIMIT)) {
    return res.status(429).json({ error: 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.' });
  }

  try {
    const result = await authService.loginUser({ email, password });
    // Entrada correcta: se limpian los contadores para que un usuario que
    // acierta nunca arrastre bloqueos previos.
    clearFailures(ipKey, emailKey);
    // Además del JSON, la sesión sale como cookie del dominio padre: es lo que
    // deja entrar al tablero de Los Cuatro Caminos, que está en otro subdominio.
    emitirSesion(req, res, result.token);
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

    const esCredencialInvalida = error.message?.includes('Credenciales');
    const esPendienteAprobacion = error.message?.includes('aprobación');

    // Solo la contraseña equivocada cuenta como intento fallido: una cuenta
    // pendiente de aprobación no debe autobloquearse por reintentar.
    if (esCredencialInvalida) {
      recordFailure(emailKey, EMAIL_WINDOW);
      recordFailure(ipKey, IP_WINDOW);
    }

    const status = esCredencialInvalida ? 401 : esPendienteAprobacion ? 403 : 500;
    return res.status(status).json({ error: error.message || 'Error al iniciar sesión' });
  }
}
