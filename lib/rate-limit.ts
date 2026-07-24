import type { VercelRequest } from '@vercel/node';

// Rate limiting en memoria por instancia. En serverless cada instancia tiene
// su propio contador, así que el límite efectivo es aproximado — suficiente
// para frenar fuerza bruta simple sin añadir dependencias externas. Si el
// tráfico crece, migrar a un almacén compartido (p. ej. Upstash Redis).
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) {
      if (now > b.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > limit;
}

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}
