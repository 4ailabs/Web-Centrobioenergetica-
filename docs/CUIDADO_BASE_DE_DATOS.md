# Cuidado con la base de datos

Reglas para no volver a perder usuarios. Léelo antes de tocar nada relacionado con la base de datos.

## La regla de oro

**Nunca ejecutes comandos de Prisma apuntando a la base de producción**, salvo `db:deploy`.

Dos comandos de Prisma están diseñados **solo para desarrollo** y pueden borrar la base entera:

| Comando | Qué puede hacer |
|---|---|
| `prisma migrate dev` | Si detecta que la base no coincide con el historial de migraciones, **resetea la base completa** (borra todas las tablas y sus datos). |
| `prisma db push` | Sincroniza el esquema sin migraciones. Si un cambio requiere perder datos (quitar una columna, cambiar un tipo), **los borra**. |

Esta es la causa más probable de una pérdida de usuarios: ejecutar uno de los dos con `DATABASE_URL` apuntando a producción.

## Protección automática (ya instalada)

Los comandos peligrosos ahora pasan por `scripts/guard-db.mjs`, que **bloquea la ejecución si la base no es local**:

```
✖ BLOQUEADO: este comando puede borrar datos de producción.
  La base a la que apuntas no es local: ep-xxx.aws.neon.tech
```

Solo se salta con una confirmación explícita e intencionada (`CONFIRMO_PERDIDA_DE_DATOS=si`), pensada para que nunca ocurra por accidente ni por autocompletado del historial de la terminal.

## Comandos y cuándo usarlos

| Comando | Seguro en producción | Para qué |
|---|---|---|
| `npm run db:deploy` | ✅ **Sí** | Aplicar migraciones pendientes en producción. Nunca borra datos. |
| `npm run db:generate` | ✅ Sí | Regenerar el cliente de Prisma. No toca la base. |
| `npm run db:studio` | ⚠️ Con cuidado | Abre un editor visual de la base. Permite borrar filas a mano. |
| `npm run db:seed` | ⚠️ Con cuidado | Crea el usuario admin si no existe. No borra nada. |
| `npm run db:migrate:dev` | ❌ **No** | Solo desarrollo local. Bloqueado por la guardia. |
| `npm run db:push:peligroso` | ❌ **No** | Solo desarrollo local. Bloqueado por la guardia. |

## Flujo correcto para cambiar el esquema

1. Trabaja contra una base **local** (o una copia), nunca la de producción.
2. Edita `prisma/schema.prisma`.
3. `npm run db:migrate:dev` en local → genera el archivo de migración.
4. Sube la migración al repositorio (commit).
5. En producción, aplica con `npm run db:deploy`.

Nunca saltes del paso 2 al 5 con `db:push`.

## Copias de seguridad

La base es **Prisma Postgres — plan Starter** (`prisma-webcentro`), gestionada desde la integración de Vercel.

| | Plan actual (Starter) |
|---|---|
| Copias automáticas | Sí, un *snapshot* diario |
| Retención | Últimos 7 días |
| Recuperación a un punto exacto | **No disponible** en Prisma Postgres |
| Matiz | Solo se crea copia los días con actividad |

Consecuencia práctica: ante un borrado se puede volver al estado del día anterior, pero **se pierde hasta un día de datos**. Las copias se ven y se restauran en **console.prisma.io** (no en Vercel).

### Copia manual antes de cualquier operación de riesgo

```bash
npm run db:backup
```

Genera `backups/AAAA-MM-DD_HHMM.sql`. Requiere `pg_dump` instalado (`brew install postgresql@16`) y la **cadena de conexión directa** de Postgres, que se copia desde `console.prisma.io` — las URLs de Accelerate (`prisma+postgres://`) no sirven para `pg_dump`:

```bash
DATABASE_URL_DIRECTA="postgresql://…" npm run db:backup
```

La carpeta `backups/` está excluida del repositorio: esos archivos contienen datos personales de los alumnos y **nunca deben subirse a GitHub**. Guárdalos en un sitio seguro y borra los que ya no necesites.

Hazlo siempre antes de: migraciones, limpiezas de datos, importaciones masivas o cualquier operación que no hayas hecho antes.

## Borrados desde la aplicación

- **Eliminar un usuario** desde `/admin` borra en cascada todo su progreso, sesiones e historial. Es irreversible. Para retirar el acceso sin destruir el historial, usa **revocar/suspender** en lugar de eliminar.
- **Retirar un curso** a un alumno borra su avance en ese curso (es lo que significa retirarlo), pero **no toca sus otros cursos** desde el arreglo del 1 de agosto de 2026. Antes de esa fecha, guardar los cursos de un alumno borraba y recreaba todo su progreso — ese fallo ya está corregido.

## Si algo sale mal

1. **No sigas ejecutando comandos.** Cada escritura posterior reduce lo que se puede recuperar.
2. Entra al panel del proveedor de base de datos y busca la restauración a un punto anterior.
3. Restaura a un momento previo al incidente.
