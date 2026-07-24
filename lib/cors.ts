import type { VercelRequest, VercelResponse } from '@vercel/node';

// Orígenes autorizados para consumir la API. La app corre en el dominio de
// Vercel (mismo origen que /api) y embebida en el sitio de Framer; el resto
// del mundo no tiene por qué llamar a estos endpoints desde un navegador.
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^http:\/\/localhost(:\d+)?$/,
  /^https:\/\/(www\.)?institutocentrobioenergetica\.com$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/[a-z0-9-]+\.framer\.app$/,
  /^https:\/\/[a-z0-9-]+\.framer\.website$/,
];

export function applyCors(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && ALLOWED_ORIGIN_PATTERNS.some((p) => p.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
