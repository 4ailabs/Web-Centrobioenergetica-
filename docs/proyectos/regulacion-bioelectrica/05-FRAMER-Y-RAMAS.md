# Framer y estrategia de ramas

## Estado comprobado

Proyecto: `Instituto` (`zzgwwJi3CXZa14noLOao`).

| Rama Framer | Estado |
|---|---|
| `main` | Sitio principal actual; no contiene las páginas RB nuevas. |
| `public-homepage` | Contiene nueva portada del Instituto, página RB y manual CMS. |
| `rb-public-foundation` | Rama hija de `public-homepage` para la página pilar y el sistema editorial público. |

En el repositorio Git, esta documentación se inició en `docs/rb-estructura-proyecto`.

## Decisión vigente

La implementación pública se realizará en `rb-public-foundation`, creada desde `public-homepage` el 13 de agosto de 2026. `public-homepage` queda como referencia estable y `main` no se modifica durante esta fase.

URL de trabajo de la rama:

`https://framer.com/projects/Instituto--zzgwwJi3CXZa14noLOao-3HgR1?branch=gy6b3t6n2&node=icFg0bpnJ`

## Base implementada en la rama

- Página pilar `/regulacion-bioelectrica` rediseñada como experiencia editorial pública.
- Separación visible entre método, divulgación, Biblioteca RB y formación.
- Secciones de definición, cuerpo bioeléctrico, estructura del método, principios y sistema de conocimiento.
- El prototipo del manual dejó de formar parte de la navegación y presentación pública.
- Colección CMS `RB · Publicaciones` con campos editoriales, académicos, SEO y accesibilidad.
- Archivo público `/regulacion-bioelectrica/articulos`.
- Plantilla CMS `/regulacion-bioelectrica/articulos/:RB · Publicaciones`.
- Cabecera editorial incorporada en el archivo y la plantilla de artículo, con el componente oficial `RBBrandMark`, enlaces al método y a Biblioteca RB y divisor alineado con la retícula.
- El espaciado superior del archivo y del artículo se recalibró después de añadir la cabecera; la composición se verificó en escritorio y móvil.
- Breakpoints de escritorio, tablet y móvil.
- Estados editoriales visibles y aviso de alcance educativo.
- Acceso a la Biblioteca RB desde `/regulacion-bioelectrica`.
- `noIndex` temporal en archivo y artículos.
- Verificación visual de escritorio, tablet y móvil completada.
- Preview comprobado como listo, sin confirmar despliegue de rama ni modificar producción.
- Corrección de branding del hero: retirada de la tarjeta conceptual no canónica y uso del SVG oficial de Regulación Bioeléctrica.
- Marca del programa separada de la marca del método mediante el activo `programa-el-cuerpo-electrico.svg`.
- Activos SVG de implementación y reglas tipográficas registrados en `04-MARCA-Y-PEDAGOGIA.md`.
- Componente vectorial `RBBrandMark.tsx` creado en Framer como adaptación fiel de los SVG maestros debido a una limitación del importador.
- Marca oficial aplicada en navegación, hero y entrada de la sección formativa.
- Estilo `RB/Title` actualizado a Newsreader regular, con escala responsiva `76 / 64 / 48 px`, y revisión visual completada en escritorio, tablet y móvil.
- Jerarquía visual elevada con apertura de gran escala, franja de posicionamiento y recorrido editorial numerado del `01` al `07`.
- Módulo “Sistema de conocimiento” incorporado para articular revisión editorial, comunicación pública, biblioteca y formación.
- Adaptaciones específicas de espaciado, retícula y apilado verificadas en escritorio, tablet y móvil.
- Paleta cromática deliberadamente aplazada a la siguiente fase para resolverla mediante tokens coherentes.
- Idioma fuente corregido a español de México (`es-MX`) y locale `English` (`en`) creado en la rama de trabajo, con fallback en español y `Auto Translate` desactivado.
- Framer muestra `Locale limit exceeded (1/0)`; no se compró el complemento de localización y no se publicó la versión inglesa.
- Se retiró de la portada la sección curricular del autor; no se muestran universidades y `07 · Respaldo institucional` vuelve a cerrar el recorrido editorial.
- El footer cambió de `RB/Night` a `Verde bosque`, con textos marfil; se verificó visualmente en escritorio y móvil.
- La franja `02 · Estructura del método` cambió de `RB/Night` a `Niebla`, con tarjetas `Papel`, texto accesible y líneas sutiles.
- La página pilar quedó completamente vinculada a tokens cromáticos; la auditoría no encontró rellenos, bordes ni colores de texto directos.
- La paleta final se verificó mediante capturas completas de escritorio, tablet y móvil.
- Los enlaces de la barra superior dejaron de heredar el terracota global. Se creó `RB/Nav Link`, con tinta en reposo y verde bosque en interacción, sin afectar otras páginas del proyecto.
- El sistema editorial combina Newsreader para titulares editoriales e Inter para navegación, cuerpo, tarjetas, etiquetas y títulos funcionales. Space Mono permanece para numeración y Georgia solo dentro de los logotipos oficiales. Verificado en los tres breakpoints.
- Los tres registros piloto de `RB · Publicaciones` se reescribieron desde `Curso_Video/Clases_Didacticas`; sus fuentes anteriores basadas en programa o manual fueron sustituidas por lecciones concretas.
- El artículo ambiguo `Instrumento, agente y procedimiento` se renombró `Estado bioeléctrico, instrumento y procedimiento`. En la biblioteca pública, `agente` queda reservado al sistema biológico descrito por TAME y no designa al profesional.
- Colección CMS `RB · Principios` creada con seis registros iniciales, autoría, orden, estado editorial, desarrollo y fuente.
- Índice `/regulacion-bioelectrica/principios` y plantilla CMS `/regulacion-bioelectrica/principios/:RB · Principios` implementados y verificados visualmente en escritorio y móvil.
- Las referencias visibles de Principios usan módulo, clase y lección; las rutas internas completas se conservan en `03-FUENTES-DE-VERDAD.md`.
- Las páginas y registros de Principios permanecen con `noIndex` y estado `Borrador`. No se generó preview de publicación ni se modificó producción en esta fase.
- Página `/regulacion-bioelectrica/metodo` creada en `rb-public-foundation` con ID `DdCoDaXzJ`. Desarrolla definición, objeto de estudio, secuencia, fundamentos, perfil resultante y alcance público a partir de `Curso_Video/Clases_Didacticas`.
- La página Método reutiliza el sistema editorial RB: logo oficial, Newsreader, Inter, Space Mono y tokens de papel, tinta, niebla, verde bosque y línea sutil. No incorpora imágenes provisionales.
- La composición se verificó en escritorio, tablet y móvil. En tablet, las tarjetas de tres elementos usan una retícula `2 + 1` para evitar particiones tipográficas; en móvil se apilan en una columna.
- Los enlaces `Método` y `Biblioteca` quedaron normalizados en la página pilar, Método, Principios y Artículos. `Método` apunta a `/regulacion-bioelectrica/metodo` y `Biblioteca` a `/regulacion-bioelectrica/articulos`.
- La auditoría textual de Método no encontró universidades ni los lemas prohibidos. La ruta permanece con `noIndex`; no se publicó ni se generó despliegue de la rama.
- El idioma fuente se corrigió a `es-MX`; se añadió el locale `English` con slug `en`, fallback en español y traducción automática desactivada.
- Se cargó manualmente un piloto inglés de la página pilar y `Potencial de membrana`. Framer registra aproximadamente `2%` de avance; el detalle queda en `11-PILOTO-INGLES.md`.
- El plan actual reporta `Locale limit exceeded (1/0)`. No se compró el complemento, no se habilitó una página inglesa incompleta y producción permanece sin cambios.

### Limpieza manual pendiente en Framer

Durante la vinculación de la plantilla CMS, Framer conservó una copia técnica porque el agente no permite eliminar páginas CMS. Puede borrarse manualmente, después de comprobar la página correcta:

- eliminar `Principio · archivo técnico`;
- conservar `Principio`, cuya ruta es `/regulacion-bioelectrica/principios/:RB · Principios`;
- no borrar las colecciones `RB · Publicaciones` ni `RB · Principios`.

## Estrategia para la implementación

1. Mantener `public-homepage` como referencia; evitar cambios no relacionados.
2. Construir en `rb-public-foundation` la página pilar, navegación y CMS público.
3. Revisar arquitectura y acceso profesional sin mover todavía el manual.
4. Decidir si la nueva portada del Instituto se integra primero a `main`.
5. Preparar la integración de `rb-public-foundation` únicamente después de esa decisión.
6. Mantener el manual profesional sin cambios durante esa fase.
7. Revisar escritorio, tablet, móvil, accesibilidad y enlaces.
8. Generar preview privado y obtener aprobación.
9. Integrar a `main` siguiendo el flujo disponible en Framer.

## Cuándo abrir ramas adicionales

Abrir una rama separada solo para trabajo de alto riesgo o independiente:

- `rb-professional-access`: autenticación, rutas o migración del manual;
- `rb-editorial-cms`: migración masiva de publicaciones;
- `rb-brand-system`: cambios globales de tokens, tipografía o navegación institucional.
- `rb-localization-en`: configuración de idioma, selector, rutas, página pilar y CMS en inglés; se abrirá desde la versión pública aprobada.

No crear una rama por cada página ni trabajar simultáneamente sobre las mismas rutas en varias ramas.

## Sesión del 15 de agosto de 2026

Todo el trabajo se realizó en `rb-public-foundation`. `main` no se tocó.

### Navegación

La barra superior dejó de ser un frame por breakpoint y pasó a ser el componente **`Navegación RB`** con cuatro variantes: `Desktop`, `Tablet`, `Phone` y `Phone Open`. El cajón móvil colapsa por altura (`56 px` con recorte) y abre a `auto`, con el contenido idéntico en ambas variantes para que la transición no salte.

Ajustes aplicados sobre esa base:

- Los cuatro enlaces quedan fuera del orden de tabulación en la variante cerrada. Antes se recortaban sin ocultarse, de modo que el teclado entraba en enlaces invisibles y los lectores de pantalla los anunciaban.
- El cajón pasó de retícula de dos columnas a una sola, para que el botón `Formación` deje de compartir fila con un enlace.
- Áreas de toque por encima del mínimo de 44 pt: filas de `52 px`, botón de `54 px`, disparador de `44 px`.
- La cabecera móvil es `position: fixed` con `zIndex 5`, compensada con `56 px` de margen superior en el breakpoint. Antes vivía en el flujo y al abrirse desplazaba la página entera `240 px`.
- Las cuatro anclas (`metodo`, `principios`, `biblioteca`, `formacion`) llevan `scrollMarginTop: 72 px`; con la cabecera fija habrían aterrizado ocultas detrás de ella.
- Los enlaces cierran el cajón al pulsarse. Antes solo el disparador sabía cerrarlo, y el menú permanecía abierto sobre el destino de las anclas.
- Se eliminó el frame `Biblioteca móvil`, residuo del botón anterior.

### Pie

`Pie RB` había perdido el cierre cromático documentado y mostraba `Papel` con texto oscuro. Se restituyó `Verde bosque` con texto marfil y se retiró el filete superior de `1 px`, que existía para separar el pie cuando ambos compartían fondo y sobre la banda verde quedaba como una línea suelta.

### Página del programa

Se creó `/regulacion-bioelectrica/el-cuerpo-electrico`, hermana de `/metodo`, `/principios` y `/articulos`. Contiene cabecera, apertura, «para quién es» y el arco del curso; faltan los cuatro módulos, los datos del programa, «lo que te llevas» y el pie.

Reparte el contenido con la portada institucional: **aquí el programa y su temario; en la página del Instituto, convocatoria, fechas e inscripción.** No se publican los horarios módulo a módulo porque contienen perfil bioeléctrico, dipolo y aplicación paso a paso, material que `01-ALCANCE-Y-GOBERNANZA.md` clasifica como restringido.

> Toda página nueva hereda automáticamente la plantilla **`Navegación Instituto`**, que trae la cabecera y el pie del sitio antiguo. Las páginas RB no usan plantilla: hay que fijar `layoutTemplate` en `null` al crearlas.

### Correcciones de sistema

- El nodo `Evidencia y límites` se renombró `Sistema de conocimiento`: su contenido nunca fue evidencia ni límites, y el nombre inducía a error en las auditorías.
- Un encabezado de la sección `02` tenía la fuente escrita directamente encima del preset. Se devolvió a `RB/Heading`.
- Quedó un token de color fantasma, `RB/Ink Display`, sin valor y que la API no lista aunque el chequeo de nombres sí detecta. El token válido es `RB/Ink Titular`. Conviene borrarlo a mano desde el panel de colores.

### Pendiente en la rama

- El texto de la sección `06` se solapa con la figura en móvil.
- `Pie RB` es la única sección sin `maxWidth`; por encima de `1200 px` se despega de la retícula.
- La figura de `El Cuerpo Eléctrico` está encuadrada con las cabezas y los pies cortados, y su escala cromática queda pegada al borde derecho sin rótulo.
- `Biblioteca RB` y `Principios fundamentales` muestran contenido estático mientras el CMS ya tiene 3 y 6 registros.

## Convenciones

- Nombres cortos, minúsculas y con guiones.
- Una rama debe tener un objetivo verificable.
- Registrar rama base y páginas afectadas en el registro de decisiones.
- No publicar desde una rama de trabajo.
- `preview` no equivale a publicación.
- Producción requiere autorización explícita y comprobación posterior.

## Protección del manual

`noIndex` solo impide indexación; no restringe acceso. Antes de promover las páginas del manual se debe decidir entre:

- autenticación real fuera o dentro del ecosistema Framer;
- portal de alumnos existente;
- publicación de una versión divulgativa separada;
- mantener el manual sin enlaces públicos hasta contar con control de acceso.

---

## Cómo escribir en Framer sin fallar en silencio

Cuatro cosas de la API del agente costaron una sesión entera de trabajo perdido. Todas producen
fallos silenciosos: la llamada no lanza excepción, devuelve algo con buena pinta y no aplica nada.

**`applyChanges` devuelve el informe de errores, y hay que leerlo.** La documentación es explícita:
«Commands that fail (including syntax errors) are reported in the result's `errors` without blocking
the remaining commands». El lote no se aborta —cada comando falla por su cuenta— y el retorno trae
`{ message, errors, linter }`. El `linter` además avisa de solapamientos y separaciones negativas
entre hermanos de un stack. Descartar ese valor de retorno es descartar el único aviso que hay.

```js
const r = await framer.agent.applyChanges(dsl, { pagePath })
if (r?.errors && Object.keys(r.errors).length) throw new Error(JSON.stringify(r.errors))
```

**`setAttributes` ignora en silencio lo que no reconoce.** Devuelve el nodo igual, con propiedad
inventada o sin ella. No sirve como comprobación. En concreto **no** aplica `elementId`,
`scrollTargetEnabled`, `textTransform` ni `link`: esos van por DSL.

**El enlace es `link.href=`, no `link=`.** Un `link="#ancla"` se ignora sin avisar. Por eso las cinco
entradas del sumario del frontispicio estuvieron sin enlazar desde que se crearon. La forma correcta
usa la ruta completa:

```
SET <id> link.href="/regulacion-bioelectrica#clinica" link.smoothScroll="true";
```

**Las dos superficies ven cosas distintas.** `elementId` y `link` no existen en los objetos de la API
de plugin (`framer.getNodesWithType`), que devuelven `null`; se leen en `attributes` de la API del
agente (`framer.agent.getNodesOfTypes`). Verificar por la superficie equivocada da falsos negativos.
Y `pagePath` **no acota las lecturas**, solo `applyChanges`: una lectura con `pagePath` devuelve el
proyecto entero.

La sintaxis completa del DSL está en `framer.agent.getSystemPrompt()`. Conviene volcarla a un archivo
y buscar en ella antes de inventar un nombre de atributo.

### Regla de verificación

Contar vueltas de un bucle no es verificar. Se comprueba releyendo el estado desde cero y comparando
con lo esperado; para una imagen, descargando el archivo servido y mirando su contenido. Dos veces en
esta sesión se dio por aplicado algo que no lo estaba —las tres figuras de la portada y los enlaces
del sumario— porque el informe contaba iteraciones.

### Pendiente · el optimizador de SVG rompe el modo oscuro

Al subir un SVG, Framer saca la regla `:root{}` con la paleta clara y la escribe como atributo
`style=` en el elemento `<svg>`, dejando el bloque `@media (prefers-color-scheme: dark)` dentro de
`<style>`. Un atributo gana a una hoja de estilos, así que **el modo oscuro no se aplica en ninguna
figura del sitio**. Marcar las declaraciones oscuras con `!important` tampoco sobrevive al
optimizador. Sin resolver.
