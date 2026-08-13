import type { VercelRequest, VercelResponse } from '@vercel/node';

// Orígenes autorizados para consumir la API. La app corre en el dominio de
// Vercel (mismo origen que /api) y embebida en el sitio de Framer; el resto
// del mundo no tiene por qué llamar a estos endpoints desde un navegador.
//
// El patrón del dominio propio admite cualquier subdominio de un solo nivel,
// no solo `www`: el aula vive en `aula.institutocentrobioenergetica.com` y
// antes quedaba fuera de la lista. Cuando la app se sirve desde ahí las
// llamadas son del mismo origen y no pasan por este filtro, así que el fallo
// no se veía; aparecía solo al llamar a la API desde otro origen — por
// ejemplo desde el sitio de Framer — y el navegador lo reportaba como un
// error de red sin decir que la causa era CORS.
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^http:\/\/localhost(:\d+)?$/,
  /^https:\/\/([a-z0-9-]+\.)?institutocentrobioenergetica\.com$/,
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
