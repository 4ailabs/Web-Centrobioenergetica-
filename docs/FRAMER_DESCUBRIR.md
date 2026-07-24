# Descubrir en Framer — arquitectura, investigación y estado

- **Fecha:** 24 de julio de 2026
- **Modelo acordado:** **Framer = sitio público** (marketing, Descubrir, página del instructor, landings) · **Vercel = aula** (login, cursos, videos firmados, progreso).
- **Proyecto Framer:** institutocentrobioenergetica.com (staging: more-root-479148.framer.app), editor: framer.com/projects/Instituto--zzgwwJi3CXZa14noLOao-3HgR1

## Estado actual (qué ya existe en Framer)

1. **Colección CMS "Descubrir"** (id `P5_3_FaK7`) con 15 campos: Title, Content (rich text), Slug, Formato (enum: Artículo/Audio/Video/Guía), Categoría, Descripción, Imagen, Audio (file mp3), Duración, Claves, Autor, Curso (link), Título del curso, Destacado (bool), Fecha.
   - **Poblada con 4 elementos**: la cápsula de audio "El cuerpo eléctrico" (ElevenLabs, voz Dr. Ojeda) + 3 artículos propios (Cuerpo Eléctrico→RB, 128 Hz→Resonantia, Ritual→Actos que Mueven).
   - **El usuario puede publicar/editar desde el CMS sin código.** Assets aún referenciados por URL de Vercel (pendiente subirlos a Framer).
2. **Componente de código `DescubrirCard.tsx`** (codeFile `qfwo9rf`) — tarjeta artículo/audio con reproductor. Funciona publicada, pero **no muestra datos CMS en el lienzo del editor** (ver investigación).
3. **Página `/descubrir`** (WebPageNode `rfN15UvFm`, breakpoint Desktop `pPitL4PjX`) con lista CMS → renderiza OK en **staging**. Producción intacta.

## Investigación (con fuentes oficiales de Framer)

**Hallazgo clave:** los *code components* se renderizan como **preview estático** en el lienzo del editor y **ya no pueden leer el CMS** (Framer deshabilitó los internals; help: "Limitations when accessing the CMS with code"). Solo reciben datos vía property controls + "Set Variable", y en canvas muestran sus `defaultValue`. En cambio, las **capas nativas con bindings** (texto→campo, fill→imagen) **sí muestran el contenido real de cada item en el lienzo**, repetido por la collection list (Framer Academy — Collection Lists).

**Arquitectura recomendada (decidida): tarjeta híbrida**
- Tarjetas **100% capas nativas** dentro de la collection list → lienzo fiel y editable, diseño exacto.
- **Un solo code component: el reproductor de audio** (patrón soportado: `ControlType.File` con `allowedFileTypes:["mp3"]` + Set Variable al campo Audio; rama `RenderTarget.canvas` con preview estático; `defaultValue` en todo; SSR-safe). Alternativa de pago: "Audio Player 2P (BG)" del Marketplace (CMS-ready).
- **Newsreader** disponible nativa en Framer (Google Fonts, pestaña Web) → formalizar en **Text Styles** del proyecto (Editorial/H1, Card Title, Body, Eyebrow).
- **Destacada horizontal**: segunda collection list (limit 1, filtro Destacado=true). Grid principal 2 columnas.
- **Detail pages** `/descubrir/:slug`: plantilla con rich text vinculado (stylePresetHeading1-3/Paragraph), player condicional ("is set" sobre campo Audio), prev/next con `var(--variable-nextItemId)`.
- Filtros por categoría: chips con `SET_VARIABLE` + `collectionList.filters` (patrón tabs de la guía oficial) + empty state obligatorio.

## Especificación de diseño (fuente: prototipo en Vercel, `pages/Descubrir.tsx`)

- Fondo #FBFAF7 · tarjetas #FFFFFF, borde 1px #E6E1D8, radio 16px · hover sutil (elevar/borde acento).
- Titulares serif **Newsreader** (H1 40px/1.1 #26221B; tarjeta 19px, destacada 24px, peso 500) · cuerpo sans 13.5px/1.6 #5C564C · eyebrow 10px bold uppercase tracking 0.14em **#9A4F3C** · metadatos 10-11px #6F6C66.
- Chips filtro: pill radio 99px; activa fondo #B5604A texto blanco; inactiva blanco/borde #E6E1D8.
- Página max-width 900, padding 48/24/96. Breakpoints 1200/810/390 (grid → 1 col en phone).

## Lecciones técnicas del agente oficial de Framer (para no repetir errores)

- Usar **`npx @framer/agent`** (agente oficial), NO el plugin unframer MCP (no crea colecciones, se cuelga). Autorizar con la URL del **editor** (framer.com/projects/...), correr todo con permisos elevados y `-s <session>`.
- DSL: cada `+Node` necesita su `SET` aparte; el contenido va **dentro del breakpoint Desktop** (no colgado del WebPageNode); el breakpoint necesita `layout=stack` vertical + width fija.
- Binding imagen en componentes: control completo (`$control__imagen="var(--variable-ID)"`), no `.src`.
- `framer.publish()` publica a **staging**; producción es un paso aparte y solo con aprobación del usuario.
- Field variable ids de la colección (para DSL): titulo=I8dyr3UPI, categoria=VEtnvWVT3, formato=XeA5ucPyT, descripcion=oo1D67Hrv, contenido=tl63EcxHK, imagen=XQaufAnYQ, audio=tNzvMqT4H, duracion=yHeN9yKyB, claves=L9RuCouDr, autor=QoiPoQrQV, curso=ky8stbDJg, cursoTitulo=eC4JrJVBX, destacado=DusHQf7Ml, fecha=fgTU6R2Hu, slug=MpAYRR0Dm.

## Plan pendiente

1. Reconstruir las tarjetas como **capas nativas** (plano DSL en elaboración) — lienzo editable fiel al diseño.
2. Reproductor de audio como code component con preview estático en canvas.
3. Text Styles (Newsreader/sans) + chips de filtro + destacada horizontal + breakpoints Tablet/Phone.
4. Detail page `/descubrir/:slug` con rich text.
5. Subir imágenes y MP3 como assets de Framer (independencia de Vercel).
6. Enlace "Descubrir" en la navegación del sitio y **publicar a producción con aprobación del usuario**.

## Referencias

Framer Academy (Collection Lists, CMS pages) · Framer Help (Limitations CMS+code, custom fonts, video en CMS) · Framer Developers (Property Controls, Components Reference) · Marketplace audio players. El prototipo visual de referencia vive en este repo: `pages/Descubrir.tsx`.
