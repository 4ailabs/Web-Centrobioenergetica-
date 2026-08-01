import type { VercelRequest } from '@vercel/node';

// Rate limiting en memoria por instancia. En serverless cada instancia tiene
// su propio contador, así que el límite efectivo es aproximado — suficiente
// para frenar fuerza bruta simple sin añadir dependencias externas. Si el
// tráfico crece, migrar a un almacén compartido (p. ej. Upstash Redis).
//
// Se cuentan SOLO los intentos fallidos (ver recordFailure): así un grupo de
// alumnos entrando desde la misma red (un taller presencial, una clínica)
// nunca se bloquea entre sí por iniciar sesión correctamente.
const buckets = new Map<string, { count: number; resetAt: number }>();

function prune(now: number) {
  if (buckets.size <= 10_000) return;
  for (const [k, b] of buckets) {
    if (now > b.resetAt) buckets.delete(k);
  }
}

/** Consulta si la clave ya superó el límite. No incrementa el contador. */
export function isRateLimited(key: string, limit: number): boolean {
  const bucket = buckets.get(key);
  if (!bucket) return false;
  if (Date.now() > bucket.resetAt) {
    buckets.delete(key);
    return false;
  }
  return bucket.count >= limit;
}

/** Registra un intento fallido para la clave. */
export function recordFailure(key: string, windowMs: number): void {
  const now = Date.now();
  prune(now);
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  bucket.count += 1;
}

/** Limpia el contador tras un intento exitoso. */
export function clearFailures(...keys: string[]): void {
  for (const key of keys) buckets.delete(key);
}

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}
