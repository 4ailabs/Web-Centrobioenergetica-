# Regulación Bioeléctrica — sitio público

Centro de dirección y continuidad del proyecto web público de Regulación Bioeléctrica (RB) en Framer.

## Objetivo

Construir un sistema educativo público y sostenible para explicar la Regulación Bioeléctrica mediante principios, publicaciones propias, referencias científicas, audio, video y una ruta clara hacia el programa formativo **El Cuerpo Eléctrico**.

El proyecto debe distinguir tres experiencias:

1. **Divulgación pública:** conceptos, fundamentos, evidencia, noticias y preguntas frecuentes.
2. **Formación:** presentación y acceso al programa El Cuerpo Eléctrico.
3. **Contenido profesional:** manuales, algoritmos, fichas clínicas, técnicas y protocolos con acceso y gobernanza propios.

## Estado actual — 13 de agosto de 2026

- Proyecto Framer: `Instituto`.
- Rama principal de Framer: `main`.
- Rama base del trabajo RB: `public-homepage`.
- Rama activa de construcción pública: `rb-public-foundation`.
- En `main` todavía no existen las rutas de RB.
- En `public-homepage` existen:
  - `/regulacion-bioelectrica`;
  - `/regulacion-bioelectrica/nodo-de-lesion`;
  - una plantilla CMS para 23 secciones del manual;
  - la colección CMS `Manual · Nodo de lesión`;
  - una nueva portada general del Instituto.
- El manual está configurado como `noIndex`, pero no tiene control de acceso.
- En `rb-public-foundation` ya existen:
  - una página pilar completamente rediseñada en `/regulacion-bioelectrica`;
  - `/regulacion-bioelectrica/articulos`;
  - la plantilla `/regulacion-bioelectrica/articulos/:RB · Publicaciones`;
  - la colección CMS `RB · Publicaciones`;
  - tres artículos reescritos desde las clases didácticas y marcados como `Borrador`;
  - la colección CMS `RB · Principios`, con seis registros trazables en `Borrador`;
  - `/regulacion-bioelectrica/principios`;
  - la plantilla `/regulacion-bioelectrica/principios/:RB · Principios`;
  - cabecera editorial con el logo oficial en Biblioteca RB y artículos;
  - navegación contextual, acceso a Biblioteca RB y sección formativa;
  - breakpoints revisados para escritorio, tablet y móvil.
- Las rutas editoriales permanecen con `noIndex` durante la fase de borrador.
- La comprobación de preview de rama está lista, sin errores ni advertencias. No se confirmó ningún despliegue y producción no fue modificada.
- El branding canónico ya está aplicado en navegación, hero y sección formativa; la tarjeta conceptual no oficial fue retirada.
- La adaptación vectorial `RBBrandMark.tsx` y las reglas de uso están documentadas en `04-MARCA-Y-PEDAGOGIA.md`.

## Estructura documental

| Documento | Propósito |
|---|---|
| [01-ALCANCE-Y-GOBERNANZA.md](01-ALCANCE-Y-GOBERNANZA.md) | Define audiencias, fronteras editoriales y responsabilidades. |
| [02-ARQUITECTURA-WEB.md](02-ARQUITECTURA-WEB.md) | Mapa de rutas, CMS y recorrido público. |
| [03-FUENTES-DE-VERDAD.md](03-FUENTES-DE-VERDAD.md) | Jerarquía de fuentes del repositorio `cursos-timeline`. |
| [04-MARCA-Y-PEDAGOGIA.md](04-MARCA-Y-PEDAGOGIA.md) | Reglas de marca, ilustración y explicación didáctica. |
| [05-FRAMER-Y-RAMAS.md](05-FRAMER-Y-RAMAS.md) | Estrategia de ramas, preview, revisión y publicación. |
| [06-HOJA-DE-RUTA.md](06-HOJA-DE-RUTA.md) | Fases, entregables, criterios de salida y prioridades. |
| [07-REGISTRO-DE-DECISIONES.md](07-REGISTRO-DE-DECISIONES.md) | Decisiones arquitectónicas y asuntos pendientes. |
| [08-DIRECCION-VISUAL-Y-EDITORIAL.md](08-DIRECCION-VISUAL-Y-EDITORIAL.md) | Referencias de diseño y criterios para el blog. |
| [09-LOCALIZACION-INGLES.md](09-LOCALIZACION-INGLES.md) | Arquitectura, flujo y criterios de lanzamiento para inglés. |
| [10-GLOSARIO-BILINGUE.md](10-GLOSARIO-BILINGUE.md) | Terminología canónica español→inglés para web pública. |
| [11-PILOTO-INGLES.md](11-PILOTO-INGLES.md) | Prueba controlada de localización para portada y primer principio. |
| [12-MODELO-DE-CONTENIDO-PILAR.md](12-MODELO-DE-CONTENIDO-PILAR.md) | Qué debe contener la portada del método y por qué. Cadena del argumento, ficha por sección y contrato de vocabulario. |

Los SVG controlados para la implementación en Framer están en [`assets/`](assets/). No sustituyen los archivos maestros del repositorio académico.

La guía técnica del manual existente continúa en [FRAMER_NODO_LESION.md](../../FRAMER_NODO_LESION.md). Ese documento está subordinado a las reglas de acceso y publicación definidas aquí.

## Arquitectura pública aprobada

El sistema se organiza en Método, Principios, Biblioteca RB, Ciencia y referencias, Audio y video, Formación, Autor, Fuentes y revisión, Preguntas frecuentes y Contacto. El mapa de rutas y las colecciones CMS se mantienen en [02-ARQUITECTURA-WEB.md](02-ARQUITECTURA-WEB.md).

`Mediateca` no se utiliza como nombre público. La sección visible se denomina **Audio y video** y su colección interna será `RB · Medios`.

## Principios operativos

- El repositorio `cursos-timeline` conserva las fuentes académicas, pedagógicas y visuales.
- Este repositorio conserva la implementación web y la documentación de dirección.
- Framer es la plataforma de publicación, no la fuente clínica o académica.
- Ningún protocolo profesional se vuelve público por conveniencia técnica.
- Cada afirmación científica sensible debe poder rastrearse a una fuente aprobada.
- Los cambios se revisan en rama y preview antes de integrarse a `main`.
- Publicar en producción requiere autorización explícita.

## Próximo hito

Realizar la revisión académica de los tres artículos y seis principios, crear `RB · Referencias` y la sección Ciencia y referencias, y después preparar `RB · Medios` y Audio y video antes de ampliar la localización inglesa.
