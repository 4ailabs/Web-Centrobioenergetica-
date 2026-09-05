import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from '../lib/cors.js';
import { borrarSesion } from '../lib/sesion.js';

// La cookie de sesión es HttpOnly, así que el navegador no puede borrarla por
// su cuenta. Sin este endpoint, cerrar sesión en el aula dejaría abierto el
// tablero de Los Cuatro Caminos hasta que la cookie caducara.
export default function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  borrarSesion(req, res);
  return res.status(200).json({ ok: true });
}
