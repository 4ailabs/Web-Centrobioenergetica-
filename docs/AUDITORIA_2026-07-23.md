# Auditoría técnica y de diseño — Instituto Centrobioenergética

- **Fecha:** 23 de julio de 2026
- **Alcance:** rama `main`, commit `e0bf36e`
- **Stack auditado:** React 19 + Vite 6 + TypeScript 5.8 + Tailwind 4 + react-router-dom 7 · Express/Prisma (JWT + bcrypt) · Vercel
- **Informe visual (artifact):** https://claude.ai/code/artifact/3332c04f-68b6-4a0b-b00b-c08541e332eb (copia local: [`auditoria-2026-07-23.html`](./auditoria-2026-07-23.html))

## Metodología

Cuatro auditorías independientes ejecutadas en paralelo por agentes especializados, con verificación cruzada posterior (varios hallazgos fueron confirmados por 2+ auditorías de forma independiente). Todos los hallazgos citan archivo y línea del código real; no se incluyó nada especulativo.

1. **Arquitectura y calidad de código frontend** — App.tsx, contextos, componentes, páginas, tipos, configuración TS/Vite.
2. **Backend y seguridad** — `api/`, `server/`, Prisma, autenticación JWT, secretos, CORS, headers.
3. **Diseño y UX** — tokens, tipografía, consistencia entre páginas, dark mode, componentes, CTAs y conversión.
4. **Rendimiento, SEO y accesibilidad** — bundle, imágenes, fuentes, metadatos, rastreabilidad, WCAG.

## Resumen ejecutivo

El sitio tiene una base de calidad: dirección de diseño con criterio (minimalismo cálido terracota/salvia), tokens CSS bien diseñados, un template `ProgramPage` excelente y autorización de admin correctamente revalidada en backend. Pero opera con **tres riesgos que anulan su propósito comercial**:

1. **Es invisible para Google** — todo el sitio lleva `noindex, nofollow`.
2. **El contenido de pago es accesible sin cuenta** — los videos de Cloudflare Stream no usan URLs firmadas y sus IDs viajan en el bundle público.
3. **La autenticación es comprometible** — `JWT_SECRET` con fallback público hardcodeado en 7 archivos.

Métricas clave: **33 hallazgos verificados** (7 críticos, 11 altos) · bundle JS único de **531 KB** sin code-splitting · **26 MB** de imágenes sin optimizar · consistencia de diseño **4/10** · ~**2.500 líneas** de código muerto · 2 errores reales de TypeScript en `main` que el build no detecta.

---

## 1. Hallazgos críticos

### C1. Sitio completo marcado `noindex, nofollow`
- `index.html:14` — `<meta name="robots" content="noindex, nofollow" />`, confirmado en el build de producción.
- Además: sin meta description, sin Open Graph/Twitter cards (al compartir por WhatsApp no aparece imagen ni descripción), sin canonical, sin `sitemap.xml` ni `robots.txt`, y las 24 rutas comparten el mismo `<title>` estático (0 usos de `document.title` o Helmet en el repo).
- **Mejora:** quitar la meta robots (o condicionarla a previews), añadir description + OG + canonical, crear sitemap/robots, hook `usePageMeta` por ruta.

### C2. Videos de pago accesibles sin cuenta
- `data/mockData.ts` — 19 `cloudflareStreamId` embebidos en el bundle público.
- `pages/CourseDetail.tsx:52-71` — `hasAccess` se calcula solo en el navegador; el candado es cosmético.
- `lib/cloudflare-stream.ts:95` — embed `iframe.videodelivery.net/<uid>` sin URL firmada.
- **Mejora:** activar `requireSignedURLs` en Cloudflare Stream y emitir tokens firmados desde `api/` tras verificar JWT + inscripción; sacar los UIDs del bundle.

### C3. `JWT_SECRET` con fallback público en 7 archivos
- `api/users.ts:6`, `api/users/[id].ts:6`, `api/auth/me.ts:5`, `api/users/[id]/courses.ts:6`, `api/users/[id]/subscription.ts:6`, `server/middleware/auth.ts:5`, `server/services/auth.service.ts:5` — `process.env.JWT_SECRET || 'your-secret-key-change-in-production'`. Si la variable falta (p. ej. preview deployment), cualquiera firma tokens de admin.
- `api/health.ts:18` — publica sin autenticación si `JWT_SECRET` está definida (`hasJwtSecret`), confirmando al atacante cuándo el fallback está activo.
- `contexts/AuthContext.tsx` — token de 30 días en `localStorage` (amplifica cualquier XSS).
- **Mejora:** eliminar el fallback (fallar en arranque), centralizar en un módulo, rotar el secreto, acortar expiración, vaciar o proteger `/api/health`. Considerar cookie HttpOnly.

### C4. Claves de API camino del bundle público
- `lib/cloudflare-stream.ts:65-66` — `VITE_CLOUDFLARE_API_TOKEN` (todo `VITE_*` se incrusta en el JS del cliente).
- `vite.config.ts:20-23` — `define` inyecta `GEMINI_API_KEY` en el cliente. Hoy no se filtra solo porque `geminiService.ts` está roto y sin usar.
- **Mejora:** mover toda llamada con token a funciones en `api/`, eliminar los `define` y el prefijo `VITE_` de secretos, rotar ambas claves.

### C5. 26 MB de imágenes y bundle único de 531 KB
- `public/images` = 26 MB: `resonantia/banner.jpg` 4,2 MB, `mascota.png` 2,5 MB, `mujer_sana.png` 2,1 MB… 0 de 34 archivos en WebP/AVIF.
- `App.tsx:8-35` — las 24 páginas importadas estáticamente, 0 `React.lazy` en el repo → un solo chunk de 531 KB (147 KB gzip).
- Ningún `<img>` con `loading="lazy"` ni dimensiones; `LazyImage` existe pero solo lo usa `CourseCard`.
- **Mejora:** WebP (~90 % menos peso), `React.lazy` por ruta (chunk inicial estimado −40/60 %), lazy + dimensiones en todas las imágenes.

---

## 2. Seguridad y backend

| Hallazgo | Severidad | Detalle |
|---|---|---|
| Registro auto-aprobado | Alta | `auth.service.ts:63` crea usuarios con `approved: true` (el schema dice `@default(false)`) pero muestra "pendiente de aprobación". Cualquiera entra de inmediato. |
| CORS abierto | Alta | `Access-Control-Allow-Origin: *` en todos los endpoints (`api/*.ts`, `vercel.json:10`); restringir a la lista blanca que ya existe en `server/index.ts:21-29`. |
| Endpoint `/diagnose` | Alta | `auth.service.ts:134-188` revela si un email existe y si una contraseña es válida — oráculo de credential stuffing. Eliminarlo. |
| Sin rate limiting | Alta | Login/registro sin límites; fuerza bruta viable. |
| `/api/auth/me` Express sin middleware | Alta (dev) | `auth.routes.ts:61-64` responde sin validar token (ruta duplicada). |
| Admin `admin123` en el repo | Media | `prisma/seed.ts:8`, `scripts/create-admin.ts:20`, `scripts/reset-admin.ts` — contraseñas públicas. Verificar producción y exigir env var. |
| Headers de seguridad | Media | `vercel.json:18` — sin HSTS, `nosniff`, `Referrer-Policy` ni CSP de scripts; `X-Frame-Options` vacío. |
| Dos backends paralelos | Media | `api/` y `server/` duplican lógica con validaciones divergentes; dos handlers instancian su propio `PrismaClient` en vez del singleton `lib/prisma.ts`. |
| Errores que filtran información | Baja | `api/login.ts:42`, `api/health.ts:24-27` devuelven mensajes/códigos crudos de error. |
| Inputs sin validar con esquema | Baja | `req.body` directo a servicios en rutas admin; usar Zod. |

**Verificado como correcto:** ningún `.env` commiteado; bcrypt cost 10 en todos los paths; mensajes de login genéricos; rol admin revalidado en backend contra la DB; DELETE impide auto-eliminación.

---

## 3. Diseño y UX

Calificación por dimensión: consistencia **4/10** · jerarquía tipográfica **4/10** · tokens **3/10** · componentes **5/10** · dark mode **4/10**. **Global 4/10**: hay una dirección clara y de calidad, pero solo la mitad del producto la sigue.

- **Cuatro páginas de venta reimplementan todo desde cero** (Alta): `Resonantia.tsx` (332 líneas), `RegulacionBioelectrica.tsx` (276), `BioenergeticaTransgeneracional.tsx` (247), `ActosQueMueven.tsx` (312) duplican con estilos inline (50-72 `style={{}}` por página) el esqueleto que `components/ProgramPage.tsx` ya resuelve (y que sí usan TallerMascotas, ResetHormonal y Crania). Consecuencias: dark mode roto (páginas blancas en modo oscuro; cards blancos sobre fondo oscuro en Resonantia), sin CTA sticky en móvil en las páginas más largas, acordeón de módulos duplicado ×4, SVG de WhatsApp (~1.900 caracteres) copiado en 7 archivos, teléfono hardcodeado en 8.
- **76 colores hex hardcodeados** ignoran los tokens de `index.css`/`tailwind.config.js` (`#B5604A` ×28, `#8FA87A` ×21…).
- **Tres sistemas tipográficos en conflicto** (Alta): `FONT_SYSTEM.md`/`INTER_IMPLEMENTATION.md` declaran "Inter ✅ completado" pero Inter no se importa; Tailwind define Outfit + Newsreader; `public/styles/fonts.css` fuerza headings a "Fraunces" que tampoco se importa (caen a Georgia); las páginas de venta hardcodean Cormorant Garamond/Georgia inline. Carga vía `@import` render-blocking de ~20 variantes sin preconnect.
- **Fechas vencidas como próximas** (Alta, confianza): con fecha 23-jul-2026, Crania anuncia "25 de abril de 2026" con badge "Disponible" (`Crania.tsx:10`), ResetHormonal "16 de mayo", TallerMascotas "27 de marzo", Resonantia "11 de abril". Centralizar fecha + estado y CTA adaptativo.
- **Sin escala de headings**: H1 de 20 a 36 px según página; la home no tiene H1 (el titular es un `<p>`, `Dashboard.tsx:33-38`). Cuerpo de venta a 11-12 px para audiencia 35-60 años.
- **Sin primitivas**: no existe `Button`, `Badge` ni acordeón compartido; `ui/` tiene 5 piezas de una generación anterior usadas solo por News/ClinicalServices.
- **Clase `dark` en un div** (`App.tsx:83`) en vez de `document.documentElement` → hack de wrapper en el modal de búsqueda.
- **Precios solo en Resonantia**; el resto delega a WhatsApp (asimetría que resta confianza). Enlaces legales del footer a `#` (pendiente legal). Los programas en venta no aparecen en el menú lateral.
- Offset móvil mágico `pt-[72px] lg:pt-0` repetido en 17 archivos.

---

## 4. Rendimiento, SEO y accesibilidad

**Rendimiento** (además de C5): fuentes vía `@import` render-blocking sin preconnect; `vite.config.ts` sin `manualChunks`; logo servido desde squarespace-cdn.com existiendo `public/logo-instituto.svg`; imágenes Unsplash a 2940 px; thumbnails YouTube `maxresdefault` para tarjetas pequeñas; `framer-motion` instalado solo para código muerto.

**SEO** (además de C1): navegación no rastreable — `NavItem.tsx:13-18` usa `<a href="#">` + `navigate()`, tarjetas como `<div onClick>`, solo 3 `<Link>` en todo el proyecto; `/course/:courseId` (el contenido con más intención de compra) tras login sin ficha pública.

**Accesibilidad:**
- **0 atributos ARIA en toda la app** (0 `aria-label`, 0 `role`): hamburguesa, cerrar búsqueda y colapsar sidebar son icon-only sin nombre accesible.
- **Un usuario de teclado no puede abrir ningún curso**: tarjetas `<div onClick>` sin `tabIndex`/`role`/`onKeyDown`.
- **Modal de búsqueda** (`pages/Search.tsx:30-62`): sin `role="dialog"`/`aria-modal`, sin focus trap, Escape solo con foco en el input, foco no se devuelve al cerrar.
- **Contrastes WCAG AA incumplidos** (ratios calculados): `--text-muted` 3,25:1 claro / 3,46:1 oscuro; subtítulo de la home ~2,5:1; `text-primary-600` 4,18:1 como texto normal.
- **0 usos de `prefers-reduced-motion`**; `key={activePage}` remonta y anima todo el árbol en cada navegación (y de forma inconsistente, por el bug de `activePage`).

---

## 5. Arquitectura y calidad de código

- **El build no valida tipos** (Alta): `npx tsc --noEmit` reporta 2 errores reales en `main`: `Resonantia.tsx:37` referencia `AZ` fuera de scope (ReferenceError latente) y `services/geminiService.ts:2` importa `@google/genai`, que no está instalado. Añadir `tsc --noEmit` al build.
- **TS sin `strict`** y tipos de React llegando por `@types/react-router-dom` v5 obsoleto (se usa router v7).
- **~2.500 líneas de código muerto** (Alta): ecosistema Wellkitt completo sin ruta (Wellkitt 424 + WellkittCategory 133 + CartContext 195 + `wellkitt-components/` + `constants/`), `News` importado sin ruta, `CourseDetailPage.tsx` (151, demo sin usar), `geminiService`/`analyticsService`/`useMobileDetect`/`NavItem` sin imports, capa Framer vestigial (`framer-components/`, `utils/framerIntegration.ts`, `embed.html`), `framer-motion` sin un solo uso.
- **`activePage` duplica al router** (Alta): string manual + `PAGE_MAP` + callbacks del Dashboard + props del Sidebar nunca usadas (el activo real sale de `pathname`). Su único consumidor real es la animación, y falla. Eliminar y usar `useLocation().pathname`.
- **Sidebar montado dos veces** (`App.tsx:84-102`) cuando el componente ya gestiona móvil y desktop internamente: DOM duplicado, dos estados de menú.
- **Datos estáticos disfrazados de estado**: cursos/servicios/apps en el reducer sin acciones que los modifiquen; "selectores memoizados" que no memoizan nada.
- **Tipos silenciados**: `as Course[]` encubre niveles inválidos (`'Básico'` no existe en la unión de `types.ts:29`); dos tipos `Product` incompatibles; IDs mágicos en la UI (`course.id === 103` → URL externa hardcodeada).
- **Sin ErrorBoundary** en todo el repo: cualquier error de render deja pantalla blanca.
- Menores: banner de Test Hormonal duplicado en 2 páginas; `console.log` en producción; `prisma`/`@types/*` en `dependencies`; sin ESLint/Prettier ni scripts `lint`/`typecheck`; 7 `.md` de despliegue en la raíz.

**Métricas**: archivos más grandes — `mockData.ts` 917 líneas, `TestVinculoAnimal` 737, `TestHormonal` 724, `AdminDashboard` 446. Duplicación entre páginas de programa: ~1.150 líneas que migradas a `ProgramPage` quedarían en ~80-150 líneas de datos cada una (reducción neta ~700-800 líneas).

---

## 6. Plan de acción priorizado

### Fase 1 — Fugas críticas (≈ 1-2 días, máximo impacto)
1. Quitar `noindex,nofollow` + meta description, OG, canonical, sitemap y robots.txt.
2. Eliminar fallback de `JWT_SECRET`, rotar el secreto, vaciar `/api/health`, borrar `/diagnose`.
3. Sacar `VITE_CLOUDFLARE_API_TOKEN` y `GEMINI_API_KEY` del cliente; rotar ambas.
4. Decidir y corregir el flujo de aprobación de registro; verificar que el admin de producción no use `admin123`.
5. Corregir las fechas vencidas de los 4 programas (o su estado).
6. Arreglar los 2 errores de TypeScript y añadir `tsc --noEmit` al build.

### Fase 2 — Rendimiento y confianza (≈ 3-5 días)
1. Imágenes >500 KB a WebP (26 MB → ~2 MB) + `loading="lazy"` + dimensiones.
2. `React.lazy` por ruta (mínimo: admin, tests, CourseDetail) + ErrorBoundary.
3. URLs firmadas de Cloudflare Stream servidas desde la API.
4. Cerrar CORS a lista blanca, completar headers de seguridad, rate limiting en auth.
5. Commit de limpieza: código muerto, docs obsoletos, `framer-motion`.
6. Navegación con `<Link>/<NavLink>`, un solo Sidebar, eliminar `activePage`.

### Fase 3 — Sistema de diseño unificado (≈ 1-2 semanas)
1. Extender `ProgramPage` (hero oscuro, precios, entregables) y migrar las 4 páginas de venta bespoke.
2. Primitivas: `Button` (variante WhatsApp), `Badge`, `ModuleAccordion`, `HorizontalCourseCard`; lint que prohíba hex inline.
3. Tipografía consolidada en 2 familias + escala de headings; clase `dark` en `<html>`; borrar `fonts.css` y docs tipográficos obsoletos.
4. Accesibilidad: ARIA en icon-buttons, modal de búsqueda accesible, contrastes AA, `prefers-reduced-motion`.
5. `usePageMeta` por ruta + ficha pública de cada curso + páginas legales reales.
6. Consolidar los dos backends en una capa de servicios con Zod y el singleton de Prisma.
