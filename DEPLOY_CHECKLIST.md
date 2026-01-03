# ✅ Checklist de Deploy a Vercel

## Pre-Deploy

- [ ] Tienes una base de datos PostgreSQL lista (Supabase, Neon, Railway)
- [ ] Tienes la `DATABASE_URL` de tu base de datos
- [ ] Has generado un `JWT_SECRET` aleatorio y seguro

## Configuración en Vercel

### 1. Variables de Entorno (Settings → Environment Variables)

Configura estas variables **ANTES** de hacer el primer deploy:

```env
# REQUERIDO
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu_jwt_secret_super_seguro_minimo_32_caracteres

# RECOMENDADO (para mejor seguridad CORS)
CLIENT_URL=https://tu-app.vercel.app

# OPCIONAL (solo si usas Cloudflare Stream)
VITE_CLOUDFLARE_ACCOUNT_ID=tu_account_id
VITE_CLOUDFLARE_API_TOKEN=tu_api_token

# OPCIONAL (solo si usas Google AI)
GEMINI_API_KEY=tu_gemini_api_key
```

### 2. Build Settings

Vercel debería detectar automáticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Si no, configúralas manualmente.

## Deploy

1. Push a tu repositorio GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno
4. Deploy

## Post-Deploy

### Verificar que el Admin fue creado

1. Ve a los **Deployment Logs** en Vercel
2. Busca el mensaje: `"Admin user created"` o `"Admin user already exists"`
3. Si no aparece, continúa a la siguiente sección

### Si el admin NO fue creado

**Opción 1: Redeploy con logs**
1. Deployments → Click en el último → Redeploy
2. Desmarca "Use existing Build Cache"
3. Revisa los logs

**Opción 2: Crear admin manualmente (RECOMENDADO)**

En tu terminal local:

```bash
# Asegúrate de tener tu DATABASE_URL de producción
export DATABASE_URL="postgresql://..."

# Ejecuta el script
npm run create-admin
```

O con credenciales personalizadas:

```bash
DATABASE_URL="postgresql://..." npm run create-admin admin@instituto.com mipassword "Mi Nombre"
```

## Verificación Final

1. Abre tu app desplegada: `https://tu-app.vercel.app`
2. Ve a `/login`
3. Inicia sesión con:
   - Email: `admin@instituto.com`
   - Password: `admin123`
4. ✅ Si entras al dashboard → **¡ÉXITO!**
5. ⚠️ **IMPORTANTE**: Cambia la contraseña inmediatamente

## Troubleshooting

### ❌ Error: "prisma db push" falla durante el build

**Causa**: DATABASE_URL no está configurada o es inválida

**Solución**:
1. Verifica que DATABASE_URL esté en Environment Variables
2. Asegúrate de que el formato sea correcto: `postgresql://...`
3. Prueba la conexión desde tu local
4. Redeploy

### ❌ Error: Cannot connect to database

**Causa**: La base de datos no acepta conexiones externas

**Solución**:
1. En Supabase/Neon/Railway, permite conexiones externas
2. Verifica que el pooling esté habilitado
3. Usa la connection string de "Direct connection" o "Pooler"

### ❌ Error: Seed no se ejecuta

**Causa**: El comando de seed falla silenciosamente

**Solución**:
1. Revisa los logs completos del build
2. Ejecuta manualmente: `npm run create-admin`
3. O usa el SQL directo (ver VERCEL_SETUP.md)

### ❌ No puedo iniciar sesión después de crear el admin

**Causa**: El password hash no coincide

**Solución**:
```bash
# Resetea el admin con el script
DATABASE_URL="..." npm run create-admin admin@instituto.com admin123 "Admin Instituto"
```

## URLs Importantes

- 📱 **App**: https://tu-app.vercel.app
- 🔐 **Login**: https://tu-app.vercel.app/login
- 👨‍💼 **Dashboard Admin**: https://tu-app.vercel.app/dashboard
- 📊 **Vercel Dashboard**: https://vercel.com/dashboard

## Próximos Pasos

Después del primer deploy exitoso:

1. ✅ Cambia la contraseña del admin
2. ✅ Crea usuarios adicionales desde el panel admin
3. ✅ Configura cursos y videos
4. ✅ Prueba el sistema de permisos
5. ✅ Configura un dominio personalizado (opcional)

## ¿Necesitas más ayuda?

Consulta [VERCEL_SETUP.md](./VERCEL_SETUP.md) para detalles completos.
