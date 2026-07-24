// Secreto JWT centralizado para api/ (serverless) y server/ (Express).
// Sin fallback deliberadamente: firmar tokens con un secreto público permitiría
// a cualquiera fabricar sesiones de admin. Si falta la variable, fallamos.
// Lectura perezosa para no depender del orden de carga de dotenv en desarrollo.
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'JWT_SECRET no está definida. Configúrala en .env (desarrollo) o en las variables de entorno de Vercel.'
    );
  }
  return secret;
}
