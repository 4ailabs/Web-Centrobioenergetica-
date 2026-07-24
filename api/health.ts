import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma.js';

// Respuesta mínima a propósito: este endpoint es público y no debe revelar
// detalles de infraestructura (variables de entorno, errores de DB, conteos).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({ status: 'error' });
  }
}
