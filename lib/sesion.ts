import type { VercelRequest, VercelResponse } from '@vercel/node';

// El tablero de Los Cuatro Caminos vive en caminos.institutocentrobioenergetica.com
// y no tiene usuarios propios: valida esta misma cookie con el mismo JWT_SECRET.
// Por eso se emite en el dominio padre y no en el host concreto — es lo que la
// hace visible desde el otro subdominio. El token sigue viajando también en el
// JSON, porque la propia aula lo guarda en localStorage para sus llamadas.
const NOMBRE = 'icb_sesion';
const DOMINIO_PADRE = 'institutocentrobioenergetica.com';
const DURACION = 30 * 24 * 60 * 60; // en segundos, igual que la caducidad del JWT

function anfitrion(req: VercelRequest): string {
  return String(req.headers.host ?? '').split(':')[0].toLowerCase();
}

function atributos(req: VercelRequest, edad: number): string {
  const host = anfitrion(req);
  const partes = ['Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${edad}`];

  // En local el atributo Domain haría que el navegador descartara la cookie
  // entera, y Secure la impediría viajar por http.
  const esLocal = host === 'localhost' || host === '127.0.0.1';
  if (!esLocal) partes.push('Secure');
  if (host === DOMINIO_PADRE || host.endsWith(`.${DOMINIO_PADRE}`)) {
    partes.push(`Domain=.${DOMINIO_PADRE}`);
  }

  return partes.join('; ');
}

export function emitirSesion(req: VercelRequest, res: VercelResponse, token: string): void {
  res.setHeader('Set-Cookie', `${NOMBRE}=${token}; ${atributos(req, DURACION)}`);
}

// Para borrarla, los atributos Domain y Path deben coincidir con los de origen
// o el navegador la deja intacta. De ahí que ambas pasen por `atributos`.
export function borrarSesion(req: VercelRequest, res: VercelResponse): void {
  res.setHeader('Set-Cookie', `${NOMBRE}=; ${atributos(req, 0)}`);
}
