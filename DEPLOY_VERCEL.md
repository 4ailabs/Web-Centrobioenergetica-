# 🚀 Guía de Despliegue en Vercel

Esta guía explica cómo desplegar la aplicación con sistema de usuarios y Cloudflare Stream en Vercel.

## 📋 Configuración en Vercel

### 1. Variables de Entorno

En el [Dashboard de Vercel](https://vercel.com/dashboard), ve a tu proyecto → Settings → Environment Variables y agrega:

#### Base de Datos
```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
```

**Opción recomendada**: Usa [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) que se integra automáticamente:

1. Ve a tu proyecto en Vercel
2. Storage → Create Database → Postgres
3. Copia la `POSTGRES_PRISMA_URL` y úsala como `DATABASE_URL`

#### Autenticación
```
JWT_SECRET=tu-secreto-super-seguro-cambiar-en-produccion
```

Genera un secreto seguro:
```bash
openssl rand -base64 32
```

#### Cloudflare Stream
```
CLOUDFLARE_ACCOUNT_ID=tu-account-id
CLOUDFLARE_API_TOKEN=tu-api-token
VITE_CLOUDFLARE_ACCOUNT_ID=tu-account-id
```

⚠️ **Importante**: Las variables que empiezan con `VITE_` son públicas y se exponen en el cliente.

### 2. Configuración del Proyecto

El archivo `vercel.json` ya está configurado para:
- ✅ Detectar automáticamente las funciones serverless en `/api`
- ✅ Generar Prisma Client en build time
- ✅ Reescribir rutas de API correctamente

### 3. Desplegar

#### Opción 1: Push a GitHub (Recomendado)

1. Asegúrate de que todos los cambios estén commitados:
   ```bash
   git add .
   git commit -m "Add authentication and Cloudflare Stream integration"
   git push origin main
   ```

2. Vercel detectará automáticamente el push y desplegará

#### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔧 Configuración de Prisma en Vercel

### Para Vercel Postgres (Recomendado)

1. Crea la base de datos en Vercel Dashboard → Storage
2. Copia la `POSTGRES_PRISMA_URL`
3. Úsala como `DATABASE_URL` en Environment Variables
4. Ejecuta migraciones:

```bash
# Localmente con variables de producción
vercel env pull .env.local
npx prisma migrate deploy
```

### Para Base de Datos Externa

Si usas una base de datos externa (como Railway, Supabase, etc.):

1. Agrega `DATABASE_URL` a Environment Variables
2. Asegúrate de que la base de datos permita conexiones desde Vercel
3. Ejecuta migraciones antes del primer deploy

## 🗄️ Ejecutar Migraciones en Vercel

### Opción 1: Script de Migración en Vercel

Crea un script temporal en `scripts/migrate.ts`:

```typescript
import { prisma } from '../lib/prisma';

async function main() {
  console.log('Running migrations...');
  // Las migraciones se ejecutan automáticamente con prisma migrate deploy
  // Pero puedes ejecutar código personalizado aquí
  await prisma.$connect();
  console.log('Database connected successfully');
  await prisma.$disconnect();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Opción 2: Comando en Vercel Dashboard

Ve a tu proyecto → Settings → Build & Development Settings y agrega:

**Build Command:**
```bash
npm run build
```

**Install Command:**
```bash
npm install && prisma generate
```

## 📝 Crear el Primer Administrador

Después del primer deploy, crea el primer administrador usando Vercel CLI:

```bash
# Descargar variables de entorno
vercel env pull .env.local

# Ejecutar script de creación de admin
# (Necesitas crear este script primero)
tsx scripts/create-admin.ts
```

O usando Prisma Studio localmente conectado a la base de producción:

```bash
# Conectar a producción
DATABASE_URL="tu-url-de-produccion" npx prisma studio
```

Luego crea el usuario manualmente y marca `approved: true` e `isAdmin: true`.

## 🔍 Verificar el Despliegue

1. **Frontend**: Visita `https://tu-proyecto.vercel.app`
2. **API Register**: `https://tu-proyecto.vercel.app/api/register`
3. **API Login**: `https://tu-proyecto.vercel.app/api/login`
4. **API Auth Me**: `https://tu-proyecto.vercel.app/api/auth/me` (requiere token)

## ⚠️ Problemas Comunes

### Error: "Cannot find module '@prisma/client'"

**Solución**: Asegúrate de que `postinstall` script esté en `package.json`:
```json
"postinstall": "prisma generate"
```

Y que `prisma generate` se ejecute en el build command.

### Error: "Database connection failed"

**Solución**:
1. Verifica que `DATABASE_URL` esté configurada en Vercel
2. Si usas Vercel Postgres, asegúrate de usar `POSTGRES_PRISMA_URL`
3. Verifica que la base de datos esté activa

### Error: "Function not found" para API routes

**Solución**: Verifica que:
1. Los archivos estén en `/api` (no `/server`)
2. `vercel.json` esté configurado correctamente
3. Los archivos exporten `default` como función handler

### Error: CORS en producción

**Solución**: Las API routes de Vercel ya manejan CORS automáticamente. Si tienes problemas, verifica que estés usando las rutas correctas (`/api/*`).

## 📊 Estructura de Archivos para Vercel

```
/
├── api/                    # Serverless Functions (Vercel)
│   ├── register.ts
│   ├── login.ts
│   └── auth/
│       ├── me.ts
│       └── diagnose.ts
├── server/                 # Solo para desarrollo local
│   └── index.ts
├── lib/
│   ├── prisma.ts
│   └── cloudflare-stream.ts
├── pages/                  # Páginas React
├── contexts/               # Contextos React
├── vercel.json            # Configuración de Vercel
└── package.json
```

## 🎯 Diferencias: Desarrollo vs Producción

### Desarrollo Local
- Usa `server/index.ts` (Express)
- Ejecuta con `npm run dev:all`
- Backend en `http://localhost:3001`
- Frontend en `http://localhost:5173`

### Producción (Vercel)
- Usa `/api/*.ts` (Serverless Functions)
- Cada ruta es una función independiente
- Todo en el mismo dominio
- Sin necesidad de CORS entre frontend/backend

## 🔐 Seguridad en Producción

1. ✅ Cambia `JWT_SECRET` por un valor seguro
2. ✅ Usa HTTPS (automático en Vercel)
3. ✅ No commitees `.env` o `.env.local`
4. ✅ Configura rate limiting (considera usar Vercel Edge Middleware)
5. ✅ Valida todas las entradas en las APIs

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma en Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard → Deployments → [tu deploy] → Functions
2. Revisa los logs del build
3. Verifica las Environment Variables
4. Prueba localmente primero con `vercel dev`

