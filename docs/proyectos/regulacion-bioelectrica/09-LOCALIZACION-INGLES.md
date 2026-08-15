# Localización inglesa

## Objetivo

Crear una versión inglesa rigurosa y sostenible del sitio público de Regulación Bioeléctrica sin duplicar páginas, romper la identidad ni convertir una traducción automática en contenido publicado sin revisión.

La localización debe servir a tres objetivos:

1. explicar el método a una audiencia internacional;
2. construir descubrimiento orgánico alrededor de `Bioelectric Regulation` y bioelectricity;
3. preparar una biblioteca inglesa que conserve trazabilidad científica y editorial.

## Estado comprobado

El 13 de agosto de 2026 se corrigió el idioma fuente del proyecto a español de México (`es-MX`) y se creó el locale `English` con slug `en`, fallback en español y traducción automática desactivada. Se cargó manualmente un piloto de portada y del principio `Membrane potential` en la rama `rb-public-foundation`.

Framer muestra `Locale limit exceeded (1/0)`: el plan actual no incluye locales adicionales y ofrece comprar el complemento de localización. No se realizó ninguna compra ni publicación. El piloto sigue siendo un borrador no publicable y se detalla en `11-PILOTO-INGLES.md`.

## Arquitectura aprobada

| Elemento | Decisión |
|---|---|
| Idioma fuente | Español de México (`es-MX`) |
| Idioma localizado | Inglés internacional (`en`) |
| Plataforma | Localización nativa de Framer |
| Páginas | Una sola estructura compartida; no duplicar páginas manualmente |
| Selector | Control discreto `ES / EN` que conserva la ruta equivalente |
| CMS | Los mismos registros, con campos y slugs localizados |
| Rutas | Traducidas y revisadas por idioma |
| Traducción automática | Solo borrador; nunca aprobación editorial |
| Publicación | Por versión completa y revisada, no por cadenas aisladas |

Rutas piloto:

```text
ES  /regulacion-bioelectrica
EN  /en/bioelectric-regulation

ES  /regulacion-bioelectrica/articulos
EN  /en/bioelectric-regulation/articles
```

Los slugs de artículos se traducirán cuando aporten claridad y valor SEO. Los enlaces internos deben apuntar siempre a la versión correspondiente del contenido.

## Principio editorial

La versión inglesa es una **localización**, no una traducción literal.

- Conserva arquitectura, evidencia, nivel de acceso y propósito del original.
- Adapta sintaxis, analogías y rótulos para que suenen naturales en inglés internacional.
- Evita calcos españoles y sujetos semánticos impropios.
- No amplifica afirmaciones clínicas ni convierte hipótesis en hechos.
- Mantiene la distinción entre divulgación pública, formación y contenido profesional.
- Conserva el mismo identificador de fuente y la misma fecha de revisión que el original.

La fuente académica ya establece como voz preferida un inglés clínico internacional, claro y directo, y fija `Bioelectric Regulation` como término propio del método.

## Gobierno terminológico

El archivo [10-GLOSARIO-BILINGUE.md](10-GLOSARIO-BILINGUE.md) es la referencia operativa para la web. Su autoridad deriva de:

1. `Curso_Vigente/Modulo_1/Revision_Traduccion_Manual_RB_EN.md`;
2. `Curso_Vigente/00_Sistema_de_Produccion/Guia_Pedagogica_Estandar_Mundial.md`;
3. `Curso_Vigente/Programa_El_Cuerpo_Electrico_RB.md`;
4. `Fundamentos_Cientificos/` y literatura primaria;
5. decisiones editoriales registradas en este proyecto.

Cuando un término no esté resuelto, se marca `PENDIENTE` y no se publica hasta su revisión por los roles de terminología y revisión académica.

## Flujo de producción

```text
Original español aprobado
→ extracción de cadenas y campos CMS
→ borrador inglés
→ control terminológico
→ revisión de naturalidad
→ revisión científica y de alcance
→ revisión SEO y accesibilidad
→ control visual en tres breakpoints
→ aprobación editorial
→ publicación
```

Estados mínimos:

| Estado | Significado |
|---|---|
| `Source pending` | El original español aún puede cambiar. |
| `Draft` | Existe una primera versión inglesa. |
| `Terminology review` | Se verifican glosario, nombres y siglas. |
| `Scientific review` | Se cotejan afirmaciones, fuentes y nivel de evidencia. |
| `Layout review` | Se revisan cortes, longitud y jerarquía visual. |
| `Approved` | Puede publicarse. |

La traducción automática de Framer puede acelerar `Draft`, pero cualquier edición humana aprobada debe prevalecer sobre futuras regeneraciones.

## Alcance del lanzamiento piloto

La primera versión inglesa debe incluir, como mínimo:

- página pilar completa;
- navegación, pie y selector de idioma;
- metadatos SEO y rutas localizadas;
- página de Biblioteca RB;
- tres artículos públicos revisados;
- página o bloque formativo de `The Electric Body`;
- páginas legales y avisos que correspondan;
- verificación de `lang`, `hreflang`, canonical, enlaces y sitemap.

No se lanzará una biblioteca inglesa vacía ni se localizará el manual profesional como parte de este piloto.

## Secuencia de implementación

1. Cerrar paleta y copy fuente en español.
2. Resolver los términos pendientes del glosario.
3. Crear una rama hija `rb-localization-en` desde la versión pública aprobada.
4. Resolver el complemento de localización necesario para utilizar el locale `en` ya configurado.
5. Activar rutas localizadas y añadir el selector `ES / EN`.
6. Localizar primero la página pilar y revisar sus tres breakpoints.
7. Localizar Biblioteca RB y tres artículos piloto.
8. Ejecutar revisión científica, editorial, SEO y accesibilidad.
9. Generar preview privado para aprobación.
10. Publicar únicamente con autorización explícita.

## Control de cambios

- Un cambio sustantivo en español reabre la revisión de su equivalente inglés.
- Las fechas, cifras, nombres, CTA y avisos no se sincronizan por memoria: se comparan contra la fuente.
- Los cambios de ruta se verifican también en redirects, enlaces, canonical y reglas localizadas.
- Cada artículo registra responsable de localización y fecha de revisión inglesa.
- El contenido profesional conserva su gobernanza y acceso propios en ambos idiomas.

## Referencias técnicas de Framer

- [Localized page paths](https://www.framer.com/help/articles/localized-page-paths/)
- [Language attribute](https://www.framer.com/help/articles/language-attribute/)
- [Auto Translate for Localization](https://www.framer.com/help/articles/auto-translate-for-localization/)
- [Supported languages for Localization](https://www.framer.com/help/articles/supported-languages-for-localization/)
