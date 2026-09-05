import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { getJwtSecret } from '../lib/jwt.js';
import { applyCors } from '../lib/cors.js';
import { ID_TABLERO } from '../data/catalog.js';

// El tablero de Los Cuatro Caminos vive en otro subdominio y no puede consultar
// la base de datos: pregunta aquí si quien llama tiene derecho a entrar.
//
// La regla es la misma que guarda los videos en stream-token.ts, para que el
// tablero se administre igual que cualquier otro acceso: se inscribe al alumno
// y con eso entra. Pero mira el ID_TABLERO, no el curso 110: los videos del
// taller y el tablero se conceden por separado.
//
// Se responde en cada carga, en vez de meter los accesos en el token, porque
// durante un taller se inscribe gente sobre la marcha y un token de treinta
// días la dejaría fuera hasta que volviera a entrar.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cabecera = req.headers.authorization;
  const token = cabecera && cabecera.split(' ')[1];
  if (!token) return res.status(401).json({ acceso: false });

  try {
    const datos = jwt.verify(token, getJwtSecret()) as { userId: string };
    const usuario = await prisma.user.findUnique({
      where: { id: datos.userId },
      select: { id: true, approved: true, isAdmin: true },
    });

    if (!usuario || !usuario.approved) return res.status(403).json({ acceso: false });

    // A diferencia de stream-token.ts, aquí premiumUnlocked no abre nada: ese
    // atajo daría el tablero a gente a la que nadie se lo concedió, y el tablero
    // se concede uno por uno. Solo el administrador pasa sin inscripción.
    if (usuario.isAdmin) return res.status(200).json({ acceso: true });

    const inscripcion = await prisma.progress.findFirst({
      where: { userId: usuario.id, courseId: ID_TABLERO },
      select: { id: true },
    });

    return res.status(inscripcion ? 200 : 403).json({ acceso: Boolean(inscripcion) });
  } catch {
    return res.status(401).json({ acceso: false });
  }
}
