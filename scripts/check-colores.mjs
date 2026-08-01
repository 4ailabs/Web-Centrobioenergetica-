/**
 * Impide que los colores de marca vuelvan a escribirse a mano.
 *
 * El problema que resuelve: cuando el terracota está escrito literal en veinte
 * archivos, cambiarlo deja de ser una decisión de diseño y pasa a ser una
 * cacería. Tailwind ya lo expone como `primary-600`, y lib/tokens.ts lo expone
 * como `COLOR.terracota` para los sitios donde una clase no llega —un `fill` de
 * SVG, un gradiente construido en JavaScript—.
 *
 * Lo que NO comprueba, a propósito: los colores propios de cada landing de
 * curso (el azul de CRANIA, el verde de Regulación Bioeléctrica). Son identidad
 * de ese curso, viven solo en su página y no forman parte de la paleta común.
 *
 * Uso:  node scripts/check-colores.mjs
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CARPETAS = ['components', 'pages'];

// Los de marca. Se comparan en minúsculas.
const DE_MARCA = {
  '#b5604a': 'COLOR.terracota (o la clase primary-600)',
  '#9a4f3c': 'COLOR.terracotaOscuro (o la clase primary-700)',
  '#8fa87a': 'COLOR.salvia (o la clase salvia-400)',
  '#7a9466': 'COLOR.salviaOscuro (o la clase salvia-500)',
  '#e8a857': 'COLOR.ambar',
  '#f9f8f6': 'COLOR.crema (o la clase neutral-50)',
};

// Archivos con permiso explícito. Cada uno con su razón: sin razón, no entra.
const PERMITIDOS = new Set([
  // Define los tokens: aquí es donde tienen que estar los literales.
  'lib/tokens.ts',
]);

function archivos(dir) {
  const salida = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) salida.push(...archivos(ruta));
    else if (/\.(tsx|ts)$/.test(entrada)) salida.push(ruta);
  }
  return salida;
}

const hallazgos = [];

for (const carpeta of CARPETAS) {
  for (const ruta of archivos(join(RAIZ, carpeta))) {
    const rel = relative(RAIZ, ruta);
    if (PERMITIDOS.has(rel)) continue;

    const lineas = readFileSync(ruta, 'utf8').split('\n');
    lineas.forEach((linea, i) => {
      for (const [hex, sugerencia] of Object.entries(DE_MARCA)) {
        if (linea.toLowerCase().includes(hex)) {
          hallazgos.push({ archivo: rel, linea: i + 1, hex, sugerencia, texto: linea.trim() });
        }
      }
    });
  }
}

if (hallazgos.length === 0) {
  console.log('check-colores: sin colores de marca escritos a mano.');
  process.exit(0);
}

console.error(`check-colores: ${hallazgos.length} color(es) de marca escritos a mano.\n`);
for (const h of hallazgos) {
  console.error(`  ${h.archivo}:${h.linea}`);
  console.error(`    ${h.texto.slice(0, 100)}`);
  console.error(`    → usa ${h.sugerencia}\n`);
}
console.error('Si un caso es legítimo, añádelo a PERMITIDOS en este script con su razón.');
process.exit(1);
