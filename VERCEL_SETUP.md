# Configuración de Vercel

## Variables de Entorno Requeridas

Asegúrate de configurar estas variables de entorno en tu proyecto de Vercel:

### Base de Datos (Requerido)
```
DATABASE_URL="postgresql://..."
```
Obtén esta URL de tu proveedor de base de datos PostgreSQL (Supabase, Neon, Railway, etc.)

### JWT Secret (Requerido)
```
JWT_SECRET="tu_secret_key_super_seguro_aqui"
```
Genera un secret aleatorio seguro para firmar tokens JWT

### Client URL (Opcional pero Recomendado)
```
CLIENT_URL="https://tu-app.vercel.app"
```
La URL de tu aplicación desplegada en Vercel. Si no se configura, se permitirán todas las peticiones en producción (menos seguro pero funcional).

### Cloudflare Stream (Opcional)
```
VITE_CLOUDFLARE_ACCOUNT_ID="tu_account_id"
VITE_CLOUDFLARE_API_TOKEN="tu_api_token"
```
Solo si usas Cloudflare Stream para videos

### Google AI (Opcional)
```
GEMINI_API_KEY="tu_gemini_api_key"
```
Solo si usas la integración con Google AI

## Credenciales de Admin por Defecto

Después del primer deploy, podrás iniciar sesión con:

- **Email**: `admin@instituto.com`
- **Password**: `admin123`

**⚠️ IMPORTANTE**: Cambia esta contraseña inmediatamente después del primer login.

## Pasos de Configuración en Vercel

1. **Crear Base de Datos PostgreSQL**
   - Ve a [Supabase](https://supabase.com), [Neon](https://neon.tech), o [Railway](https://railway.app)
   - Crea un nuevo proyecto PostgreSQL
   - Copia la `DATABASE_URL`

2. **Configurar Variables de Entorno en Vercel**
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega todas las variables requeridas arriba

3. **Redeploy**
   - Ve a Deployments
   - Click en el último deployment
   - Click "Redeploy"
   - Selecciona "Use existing Build Cache" → NO
   - Deploy

4. **Verificar el Seed**
   - Revisa los logs del deployment
   - Deberías ver "Admin user created"
   - Si no aparece, ejecuta manualmente:
     ```bash
     npm run db:seed
     ```

## Solución de Problemas

### No puedo iniciar sesión con admin@instituto.com

**Solución 1: Ejecutar seed manualmente (RECOMENDADO)**
```bash
# En tu proyecto local conectado a la DB de producción
DATABASE_URL="tu_database_url_de_produccion" npm run db:seed
```

**Solución 2: Usar el script create-admin**
```bash
# Crear con credenciales por defecto
DATABASE_URL="tu_database_url_de_produccion" npm run create-admin

# O con credenciales personalizadas
DATABASE_URL="tu_database_url_de_produccion" npm run create-admin tu@email.com tupassword "Tu Nombre"
```

**Solución 3: Crear admin manualmente con SQL**
1. Conéctate a tu base de datos
2. Ejecuta este SQL:
```sql
INSERT INTO "User" (id, email, password, name, "isAdmin", approved, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@instituto.com',
  '$2a$10$XqYwGLe7pZ9QHQP4YK5M0.6Hzc8K0mJzN4KjL1XvGZJKpMzVqN9Jm', -- admin123 hasheado
  'Admin Instituto',
  true,
  true,
  NOW(),
  NOW()
);
```

### Error: "prisma db push" falla

Verifica que `DATABASE_URL` esté configurada correctamente en Vercel.

### El seed se ejecuta pero no crea el usuario

Revisa que:
1. La base de datos esté accesible
2. Las tablas existan (schema aplicado)
3. No haya errores en los logs de build

## Verificación Post-Deploy

1. Abre tu app en Vercel
2. Ve a `/login`
3. Ingresa:
   - Email: `admin@instituto.com`
   - Password: `admin123`
4. Deberías poder acceder al dashboard admin
5. **Cambia la contraseña inmediatamente**
