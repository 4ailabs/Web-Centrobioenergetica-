# 📘 Guía de Integración: Sistema de Usuarios y Cloudflare Stream

Esta guía explica cómo se integró el sistema de usuarios y Cloudflare Stream desde `app-ei` a esta aplicación.

## ✅ Lo que se ha integrado

### 1. Sistema de Usuarios
- ✅ Autenticación con JWT
- ✅ Registro de usuarios
- ✅ Login/Logout
- ✅ Sistema de aprobación de usuarios (`approved`)
- ✅ Roles de administrador (`isAdmin`)
- ✅ Seguridad con bcrypt para contraseñas
- ✅ Contexto de autenticación en React

### 2. Cloudflare Stream
- ✅ Integración para reproducir videos
- ✅ Soporte en `CourseDetail` para videos de Cloudflare Stream
- ✅ Fallback a Vimeo si no hay Cloudflare Stream ID

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"

# JWT Secret (¡cámbialo en producción!)
JWT_SECRET="your-secret-key-change-in-production"

# API Configuration
PORT=3001
CLIENT_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3001"

# Cloudflare Stream
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
VITE_CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
```

### 2. Base de Datos

1. **Instala PostgreSQL** si no lo tienes
2. **Crea una base de datos**:
   ```sql
   CREATE DATABASE centrobioenergetica;
   ```
3. **Actualiza `DATABASE_URL`** en `.env` con tus credenciales
4. **Genera el cliente de Prisma**:
   ```bash
   npm run db:generate
   ```
5. **Ejecuta las migraciones**:
   ```bash
   npm run db:migrate
   ```
   O si prefieres hacer push directo:
   ```bash
   npm run db:push
   ```

### 3. Cloudflare Stream

1. **Obtén tu Account ID**:
   - Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Selecciona tu cuenta
   - Copia el **Account ID** de la barra lateral derecha

2. **Crea un API Token**:
   - Ve a [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Crea un token con permisos de **Cloudflare Stream** → **Edit**
   - Guarda el token (solo se muestra una vez)

3. **Actualiza las variables** en `.env`

### 4. Crear el Primer Administrador

Después de configurar la base de datos, crea el primer administrador manualmente usando Prisma Studio:

```bash
npm run db:studio
```

O crea un script temporal (puedes crear `scripts/init-admin.ts`):

```typescript
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@example.com';
  const password = 'Admin123';
  const name = 'Administrador';

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      approved: true,
      isAdmin: true,
    },
  });

  console.log('✅ Admin creado:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Ejecuta con: `tsx scripts/init-admin.ts`

## 🎯 Uso

### Desarrollo

Ejecuta tanto el servidor backend como el frontend:

```bash
npm run dev:all
```

O por separado:

**Terminal 1** (Backend API):
```bash
npm run dev:server
```

**Terminal 2** (Frontend Vite):
```bash
npm run dev
```

### Producción

1. **Compila el frontend**:
   ```bash
   npm run build
   ```

2. **Ejecuta el servidor backend**:
   ```bash
   npm run dev:server
   ```

   O usa PM2 para producción:
   ```bash
   pm2 start server/index.ts --name api
   ```

## 📁 Estructura de Archivos

```
├── server/
│   └── index.ts              # Servidor Express con APIs de autenticación
├── lib/
│   ├── prisma.ts             # Cliente de Prisma
│   └── cloudflare-stream.ts  # Utilidades de Cloudflare Stream
├── contexts/
│   └── AuthContext.tsx       # Contexto de autenticación React
├── pages/
│   ├── Login.tsx             # Página de login
│   └── Register.tsx          # Página de registro
├── prisma/
│   └── schema.prisma         # Schema de base de datos
└── types.ts                  # Tipos TypeScript (actualizado con cloudflareStreamId)
```

## 🔐 Autenticación

### Rutas Protegidas

Para proteger una ruta, usa el hook `useAuth`:

```tsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Contenido protegido</div>;
};
```

### Usar el Usuario Actual

```tsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Hola, {user?.name || user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};
```

## 🎥 Cloudflare Stream en Cursos

Para agregar un video de Cloudflare Stream a un curso, agrega el `cloudflareStreamId` en el video:

```typescript
{
  id: 1,
  title: 'Video 1: Introducción',
  cloudflareStreamId: 'a1b2c3d4e5f6g7h8i9j0', // UID del video en Cloudflare
  order: 1,
}
```

El componente `CourseDetail` automáticamente:
1. Prioriza Cloudflare Stream si existe `cloudflareStreamId`
2. Usa Vimeo si solo hay `vimeoId`
3. Muestra un placeholder si no hay ningún video

## 📝 APIs Disponibles

### `POST /api/register`
Registrar un nuevo usuario (pendiente de aprobación)

### `POST /api/login`
Iniciar sesión (devuelve JWT token)

### `GET /api/auth/me`
Verificar token actual y obtener usuario

### `POST /api/auth/diagnose`
Diagnosticar problemas de autenticación

## 🔧 Scripts Disponibles

- `npm run dev` - Frontend Vite
- `npm run dev:server` - Backend Express
- `npm run dev:all` - Ambos simultáneamente
- `npm run db:generate` - Generar cliente Prisma
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:push` - Push directo del schema
- `npm run db:studio` - Abrir Prisma Studio

## ⚠️ Notas Importantes

1. **JWT_SECRET**: Cambia el secreto en producción
2. **DATABASE_URL**: No commitees el `.env` con credenciales reales
3. **Cloudflare**: El Account ID puede ser público (`VITE_*`), pero el API Token debe ser privado
4. **Aprobación**: Los usuarios deben ser aprobados por un admin antes de poder iniciar sesión

## 🆘 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### Error: "Database connection failed"
- Verifica que PostgreSQL esté corriendo
- Verifica `DATABASE_URL` en `.env`
- Verifica que la base de datos exista

### Error: "Invalid token"
- El token puede haber expirado (30 días)
- Haz logout y login nuevamente

### Videos no se reproducen
- Verifica que `VITE_CLOUDFLARE_ACCOUNT_ID` esté configurado
- Verifica que el `cloudflareStreamId` sea correcto
- Verifica que el video esté "readyToStream" en Cloudflare

## 📚 Recursos

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Cloudflare Stream](https://developers.cloudflare.com/stream/)
- [Documentación de Express](https://expressjs.com/)

