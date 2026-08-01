#!/usr/bin/env node
/**
 * Copia de seguridad manual de la base de datos.
 *
 * Prisma Postgres (plan Starter) guarda un snapshot automático al día y solo
 * conserva 7 días, sin recuperación a un punto exacto: entre snapshot y
 * snapshot puede perderse hasta un día de datos. Ejecuta este script antes
 * de cualquier operación de riesgo (migraciones, limpiezas, importaciones).
 *
 *   npm run db:backup
 *
 * Genera backups/AAAA-MM-DD_HHMM.sql (ignorado por git: contiene datos
 * personales de los alumnos y nunca debe subirse al repositorio).
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const rojo = (t) => `\x1b[31m${t}\x1b[0m`;
const verde = (t) => `\x1b[32m${t}\x1b[0m`;
const gris = (t) => `\x1b[90m${t}\x1b[0m`;

// pg_dump necesita una conexión directa de Postgres. La URL de Accelerate
// (prisma+postgres://) no sirve: se busca la primera postgres:// disponible.
const candidatas = [
  process.env.DATABASE_URL_DIRECTA,
  process.env.POSTGRES_URL,
  process.env.DATABASE_URL,
  process.env.PRISMA_DATABASE_URL,
];
const url = candidatas.find((u) => u && /^postgres(ql)?:\/\//.test(u));

if (!url) {
  console.error(rojo('\n✖ No se encontró una conexión directa de Postgres.'));
  console.error('\n  pg_dump no admite las URLs de Prisma Accelerate');
  console.error('  (las que empiezan por prisma+postgres://).');
  console.error('\n  Copia la cadena de conexión directa desde console.prisma.io');
  console.error('  y ejecuta:');
  console.error(gris('    DATABASE_URL_DIRECTA="postgresql://…" npm run db:backup\n'));
  process.exit(1);
}

const ahora = new Date();
const p = (n) => String(n).padStart(2, '0');
const nombre = `${ahora.getFullYear()}-${p(ahora.getMonth() + 1)}-${p(ahora.getDate())}_${p(ahora.getHours())}${p(ahora.getMinutes())}.sql`;
const carpeta = join(process.cwd(), 'backups');
const destino = join(carpeta, nombre);

await mkdir(carpeta, { recursive: true });

console.log(gris(`\nGuardando copia en backups/${nombre} …`));

const dump = spawn('pg_dump', [url, '--no-owner', '--no-privileges', '-f', destino], {
  stdio: ['ignore', 'inherit', 'inherit'],
});

dump.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error(rojo('\n✖ pg_dump no está instalado.'));
    console.error('\n  Instálalo con:');
    console.error(gris('    brew install postgresql@16\n'));
  } else {
    console.error(rojo(`\n✖ No se pudo ejecutar pg_dump: ${err.message}\n`));
  }
  process.exit(1);
});

dump.on('close', (code) => {
  if (code === 0) {
    console.log(verde(`✓ Copia guardada: backups/${nombre}`));
    console.log(gris('  Consérvala fuera del proyecto si vas a hacer algo delicado.\n'));
  } else {
    console.error(rojo(`\n✖ pg_dump terminó con error (código ${code}).`));
    console.error('  La copia puede estar incompleta: no continúes con la operación.\n');
    process.exit(1);
  }
});
