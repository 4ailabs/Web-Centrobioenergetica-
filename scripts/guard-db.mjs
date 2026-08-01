#!/usr/bin/env node
/**
 * Guardia contra comandos de Prisma que pueden destruir datos.
 *
 * `prisma migrate dev` y `prisma db push` están pensados para bases de datos
 * de desarrollo: ante cualquier discrepancia con el historial de migraciones
 * pueden RESETEAR la base de datos completa o eliminar columnas con sus datos.
 * Ejecutados por error contra la base de producción, borran los usuarios.
 *
 * Esta guardia bloquea el comando salvo que la base sea local, o que se
 * confirme de forma explícita e intencionada.
 */
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';

const rojo = (t) => `\x1b[31m${t}\x1b[0m`;
const amarillo = (t) => `\x1b[33m${t}\x1b[0m`;
const verde = (t) => `\x1b[32m${t}\x1b[0m`;

if (!url) {
  console.error(rojo('\n✖ No hay DATABASE_URL definida.'));
  console.error('  Sin saber a qué base apunta, este comando no se ejecuta.\n');
  process.exit(1);
}

const esLocal = /@(localhost|127\.0\.0\.1|host\.docker\.internal)[:/]/.test(url);

if (esLocal) {
  console.log(verde('✓ Base de datos local detectada. Continuando.'));
  process.exit(0);
}

// A partir de aquí: la base NO es local. Se asume producción.
const host = (() => {
  try {
    return new URL(url).host;
  } catch {
    return 'desconocido';
  }
})();

if (process.env.CONFIRMO_PERDIDA_DE_DATOS === 'si') {
  console.log(amarillo(`\n⚠  Ejecutando contra una base REMOTA (${host}).`));
  console.log(amarillo('   Confirmado mediante CONFIRMO_PERDIDA_DE_DATOS=si.\n'));
  process.exit(0);
}

console.error(rojo('\n✖ BLOQUEADO: este comando puede borrar datos de producción.'));
console.error(`\n  La base a la que apuntas no es local: ${amarillo(host)}`);
console.error('  `prisma migrate dev` y `prisma db push` pueden resetear la base');
console.error('  entera o eliminar columnas con sus datos.\n');
console.error('  Para aplicar migraciones en producción usa el comando seguro:');
console.error(verde('    npm run db:deploy'));
console.error('\n  (Nunca elimina datos: solo aplica las migraciones pendientes.)\n');
console.error('  Si de verdad necesitas este comando destructivo, haz antes una');
console.error('  copia de seguridad y repite con:');
console.error('    CONFIRMO_PERDIDA_DE_DATOS=si npm run <comando>\n');
process.exit(1);
