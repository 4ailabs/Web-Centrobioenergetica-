# Arquitectura web

## Capas del producto

```text
Instituto Centrobioenergética
└── Regulación Bioeléctrica — método y sistema educativo público
    ├── Principios — definiciones estables del método
    ├── Biblioteca RB — publicaciones propias
    ├── Ciencia y referencias — bibliografía externa y comentarios
    ├── Audio y video — videos, audios, podcast y conversaciones
    ├── El Cuerpo Eléctrico — programa formativo
    └── Área profesional — manuales y herramientas restringidas
```

RB es el método. **El Cuerpo Eléctrico** es el programa formativo. El Instituto es la marca institucional que respalda ambos. Biblioteca RB, Ciencia y referencias y Audio y video cumplen funciones diferentes y no deben mezclarse en una sola colección.

## Navegación principal

```text
Logo RB · Método · Principios · Biblioteca · Ciencia · Audio y video · Formación
```

- El logo oficial enlaza a `/regulacion-bioelectrica`.
- `Formación` funciona como acción destacada.
- En móvil, la navegación debe resolverse mediante un componente compartido con estado cerrado y abierto.
- Autor, política editorial, preguntas frecuentes y contacto se ubican en navegación secundaria o footer.

## Mapa de rutas públicas

| Ruta | Función | Acceso |
|---|---|---|
| `/regulacion-bioelectrica` | Página pilar del método | Público/indexable |
| `/regulacion-bioelectrica/metodo` | Definición, objeto, secuencia, fundamentos y resultado del método | Público/indexable |
| `/regulacion-bioelectrica/principios` | Índice de conceptos fundamentales | Público/indexable |
| `/regulacion-bioelectrica/principios/:slug` | Ficha conceptual individual | Público/indexable |
| `/regulacion-bioelectrica/articulos` | Archivo de Biblioteca RB | Público/indexable |
| `/regulacion-bioelectrica/articulos/:slug` | Artículo o noticia | Público/indexable |
| `/regulacion-bioelectrica/ciencia-y-referencias` | Archivo de publicaciones científicas externas | Público/indexable |
| `/regulacion-bioelectrica/ciencia-y-referencias/:slug` | Registro y comentario de una referencia | Público/indexable |
| `/regulacion-bioelectrica/temas/:slug` | Tema que relaciona principios, artículos, referencias y medios | Público/indexable |
| `/regulacion-bioelectrica/audio-y-video` | Archivo de videos, audios, podcast y conversaciones | Público/indexable |
| `/regulacion-bioelectrica/audio-y-video/:slug` | Pieza audiovisual individual y transcripción | Público/indexable |
| `/regulacion-bioelectrica/series/:slug` | Serie ordenada de piezas audiovisuales | Público/indexable |
| `/regulacion-bioelectrica/el-cuerpo-electrico` | Programa y temario de El Cuerpo Eléctrico | Público/indexable |
| `/regulacion-bioelectrica/autor` | Presentación breve del Dr. Miguel Ojeda Rios | Público/indexable |
| `/regulacion-bioelectrica/fuentes-y-revision` | Fuentes, proceso editorial y correcciones | Público/indexable |
| `/regulacion-bioelectrica/preguntas-frecuentes` | Respuestas directas sobre método, contenido y formación | Público/indexable |
| `/regulacion-bioelectrica/contacto` | Consultas editoriales, formación y colaboraciones | Público/indexable |

Las rutas nuevas permanecerán en borrador o con `noIndex` hasta contar con contenido aprobado, metadatos, enlaces y revisión responsive.

## Función de cada área

### Método

La página pilar presenta RB y conduce al resto del sistema. La ruta `/regulacion-bioelectrica/metodo` desarrolla sin repetir el recorrido de portada: definición operativa, objeto de estudio, secuencia de rastreo y aplicación, fundamentos conceptuales y alcance del perfil obtenido durante el rastreo.

La página Método no contiene maniobras, instrucciones de aplicación ni materiales profesionales. Su redacción pública deriva de las clases didácticas vigentes y conserva una separación explícita entre perfil bioeléctrico y diagnóstico.

### Principios

Fichas breves y estables derivadas de `Curso_Video/Clases_Didacticas`: Regulación Bioeléctrica, cuerpo bioeléctrico, estado bioeléctrico, instrumento, sustrato, agente, regulación y procedimiento. No sustituyen a los artículos extensos.

### Biblioteca RB

Publicaciones propias del proyecto: artículos introductorios, desarrollos conceptuales, noticias comentadas, historia y preguntas desarrolladas. Cada pieza registra autoría, revisión, fuente, fecha y estado editorial.

### Ciencia y referencias

Publicaciones científicas externas organizadas por tema, año y tipo. Cada registro distingue lo que afirma la fuente, la nota editorial y su relación conceptual con RB. Una referencia externa nunca se presenta como validación directa del método sin evidencia específica.

### Audio y video

Videos explicativos, audios, podcast, entrevistas, conversaciones y clases públicas. Cada pieza incluye duración, participantes, transcripción, fuente didáctica y contenidos relacionados. `Mediateca` no se utilizará como nombre público.

### Formación

Presenta El Cuerpo Eléctrico: objetivos, audiencia, estructura general, modalidad, requisitos e inscripción. No expone procedimientos profesionales restringidos.

### Información institucional

- `Autor`: síntesis profesional breve, sin currículum extenso ni listado de universidades.
- `Fuentes y revisión`: origen didáctico, adaptación, revisión, correcciones y distinción entre evidencia, interpretación e hipótesis.
- `Preguntas frecuentes`: respuestas concretas derivadas de fuentes aprobadas.
- `Contacto`: separa consultas editoriales, formación, colaboraciones, prensa y correcciones.

## CMS público

### Implementado

#### Página `Método`

La ruta `/regulacion-bioelectrica/metodo` está implementada en Framer con cinco bloques editoriales: objeto de estudio, secuencia, fundamentos, resultado y alcance. Cuenta con variantes de escritorio, tablet y móvil, enlaces coherentes hacia Biblioteca RB y Principios, y permanece con `noIndex` durante la revisión académica.

#### `RB · Publicaciones`

Título, slug, resumen, contenido enriquecido, categoría, nivel, autor, revisor, fechas, duración de lectura, fuentes, estado editorial, imagen, texto alternativo y destacado.

#### `RB · Principios`

Título, slug, definición, desarrollo, orden, fuentes, autor y estado editorial. La colección contiene seis registros iniciales en estado `Borrador`:

1. Potencial de membrana.
2. Microambiente tisular.
3. Primero rastreo, después aplicación.
4. Campo magnético estático.
5. Agencia biológica.
6. Diferenciar mecanismo e intervención.

También están implementados el índice `/regulacion-bioelectrica/principios` y la plantilla `/regulacion-bioelectrica/principios/:RB · Principios`, con variantes de escritorio, tablet y móvil. Permanecen con `noIndex` hasta completar revisión académica y aprobación editorial.

### Siguiente etapa

#### `RB · Referencias`

Título original, autores, año, revista o editorial, DOI/URL, tipo, tema, resumen editorial, relación con RB y estado de verificación.

#### `RB · Medios`

Título, slug, tipo, descripción, proveedor, URL, duración, participantes, transcripción, subtítulos, capítulos, fuente didáctica, estado editorial y relaciones.

#### `RB · Temas`

Nombre, slug, definición, nivel, orden y relaciones con principios, publicaciones, referencias y medios.

### Crear cuando exista contenido suficiente

- `RB · Series`: identidad, descripción, temporada, orden y episodios.
- `RB · Personas`: nombre, función, biografía breve, imagen, autorizaciones y participaciones.

No crear colecciones vacías sin una relación o consulta concreta que las necesite.

## Capa profesional

| Ruta propuesta | Función | Acceso esperado |
|---|---|---|
| `/regulacion-bioelectrica/profesionales` | Entrada al área profesional | No indexable |
| `/regulacion-bioelectrica/profesionales/nodo-de-lesion` | Índice del manual | Autenticado/restringido |
| `/regulacion-bioelectrica/profesionales/nodo-de-lesion/:slug` | Secciones del manual | Autenticado/restringido |

Las rutas profesionales no se migrarán ni redirigirán hasta decidir el mecanismo real de acceso. `noIndex` no constituye protección.

## Elementos globales

- Cabecera y footer compartidos.
- Navegación móvil accesible.
- Buscador para principios, artículos, referencias y medios.
- Página 404.
- Metadatos y datos estructurados por tipo de contenido.
- Relaciones entre contenidos y navegación anterior/siguiente.
- Accesibilidad de imágenes, transcripciones y subtítulos.
- Privacidad, cookies y aviso de alcance, propios o heredados del Instituto.
- Español de México como fuente e inglés internacional como localización.

## Footer

El footer debe enlazar Método, Biblioteca RB, Ciencia y referencias, Audio y video, Formación, Autor, Fuentes y revisión, Preguntas frecuentes, Contacto, privacidad, cookies, aviso de alcance e idioma.

## Orden de construcción

1. Revisar académicamente la página Método, los tres artículos y los seis principios actuales.
2. Crear Ciencia y referencias y `RB · Referencias`.
3. Crear Audio y video y `RB · Medios`.
4. Completar y unificar navegación y footer.
5. Crear Formación.
6. Crear Fuentes y revisión.
7. Crear Autor, Preguntas frecuentes y Contacto.
8. Incorporar buscador y relaciones entre contenidos.
9. Preparar la localización inglesa.
10. Completar SEO, accesibilidad, revisión y publicación.
