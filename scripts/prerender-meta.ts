/**
 * Escribe un HTML por ruta con sus metadatos ya puestos.
 *
 * Por qué hace falta: los robots que generan la vista previa de un enlace
 * —WhatsApp, Facebook, LinkedIn, Telegram— NO ejecutan JavaScript. Solo leen
 * el HTML que responde el servidor. En una SPA todas las rutas devuelven el
 * mismo index.html, así que todos los enlaces se ven idénticos por más que el
 * cliente cambie las etiquetas después.
 *
 * La solución es generar, en el build, un archivo estático por ruta:
 *
 *   dist/cuatro-caminos/index.html   →   se sirve en /cuatro-caminos
 *
 * Vercel busca en el sistema de archivos ANTES de aplicar los rewrites de
 * vercel.json, así que estos archivos ganan y el resto de rutas sigue cayendo
 * en el index.html de siempre. La app de React se monta igual: el HTML es el
 * mismo salvo por las etiquetas del <head>.
 *
 * Se ejecuta después de `vite build`. Ver el script `build` de package.json.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PAGE_META,
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  fullTitle,
  type PageMeta,
} from '../lib/pageMeta.js';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');
const MARCADOR = '<!--PAGE_META-->';
const INICIO = '<!--PAGE_META:inicio-->';
const FIN = '<!--PAGE_META:fin-->';

/**
 * Devuelve la plantilla al estado virgen.
 *
 * La ruta '/' escribe sobre el mismo dist/index.html del que se lee, así que
 * una segunda pasada sin reconstruir encontraría el marcador ya sustituido y
 * fallaría. En Vercel eso no ocurre —el build es limpio—, pero en local sí, y
 * el error no se parece en nada a la causa. Con las marcas de inicio y fin el
 * bloque se puede reemplazar tantas veces como haga falta.
 */
function normalizar(html: string): string {
  const yaProcesado = new RegExp(`${INICIO}[\\s\\S]*?${FIN}`);
  return yaProcesado.test(html) ? html.replace(yaProcesado, MARCADOR) : html;
}

/** Escapa lo que va dentro de un atributo HTML. */
function esc(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function bloqueMeta(ruta: string, meta: PageMeta): string {
  const titulo = fullTitle(meta);
  const url = `${SITE_URL}${ruta}`;
  const imagen = `${SITE_URL}${meta.image ?? DEFAULT_IMAGE}`;

  return [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="es_MX" />`,
    `<meta property="og:title" content="${esc(titulo)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(imagen)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(titulo)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(imagen)}" />`,
  ].join('\n  ');
}

function componer(plantilla: string, ruta: string, meta: PageMeta): string {
  const titulo = fullTitle(meta);
  let html = plantilla.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(titulo)}</title>`);

  if (html.includes(MARCADOR)) {
    html = html.replace(MARCADOR, `${INICIO}\n  ${bloqueMeta(ruta, meta)}\n  ${FIN}`);
  } else {
    // Sin marcador el build seguiría funcionando pero sin vistas previas, y
    // eso se nota tarde y en el peor momento. Mejor romper aquí.
    throw new Error(
      `No se encontró ${MARCADOR} en index.html. Sin ese marcador no se pueden insertar las etiquetas por ruta.`,
    );
  }
  return html;
}

/**
 * Generar el archivo no basta: Vercel tiene que servirlo cuando alguien pide
 * la ruta SIN barra final —que es como se comparte un enlace—. Eso lo decide
 * el rewrite de vercel.json, y ese archivo se escribe a mano. Si alguien añade
 * una ruta a PAGE_META y olvida el rewrite, el HTML se genera pero nadie lo ve
 * nunca: el comodín lo tapa y la vista previa sigue siendo la genérica.
 *
 * Es un fallo silencioso, así que aquí se vuelve ruidoso.
 */
async function verificarRewrites(rutas: string[]) {
  const vercelJson = JSON.parse(await readFile(join(RAIZ, 'vercel.json'), 'utf8'));
  const declarados = new Set<string>(
    (vercelJson.rewrites ?? []).map((r: { source: string }) => r.source),
  );

  const faltantes = rutas.filter((r) => r !== '/' && !declarados.has(r));
  if (faltantes.length > 0) {
    throw new Error(
      `Estas rutas tienen metadatos pero no rewrite en vercel.json, así que su ` +
        `vista previa seguiría siendo la genérica:\n` +
        faltantes.map((r) => `  { "source": "${r}", "destination": "${r}/index.html" },`).join('\n') +
        `\n\nAñádelas al array "rewrites", ANTES del comodín.`,
    );
  }
}

async function main() {
  const indexPath = join(DIST, 'index.html');
  let plantilla: string;
  try {
    plantilla = await readFile(indexPath, 'utf8');
  } catch {
    throw new Error(`No existe ${indexPath}. Este script corre después de "vite build".`);
  }
  plantilla = normalizar(plantilla);

  const rutas = Object.keys(PAGE_META);
  let escritos = 0;

  for (const ruta of rutas) {
    const html = componer(plantilla, ruta, PAGE_META[ruta]);
    const destino = ruta === '/' ? indexPath : join(DIST, ruta, 'index.html');
    await mkdir(dirname(destino), { recursive: true });
    await writeFile(destino, html, 'utf8');
    escritos++;
  }

  console.log(`prerender-meta: ${escritos} rutas con metadatos propios.`);

  await verificarRewrites(rutas);

  // Las rutas que no están en el mapa caen en el rewrite hacia el index.html
  // de la raíz, que ya lleva los metadatos de la portada. Se dice en voz alta
  // para que no parezca que quedaron cubiertas.
  console.log('prerender-meta: el resto de rutas comparte la vista previa de la portada.');
}

main().catch((err) => {
  console.error('prerender-meta falló:', err.message);
  process.exit(1);
});
