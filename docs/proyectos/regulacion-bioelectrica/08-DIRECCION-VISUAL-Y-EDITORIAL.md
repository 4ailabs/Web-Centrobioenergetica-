# Dirección visual y editorial

## Dirección aprobada

El sitio se diseñará como una combinación de instituto científico, biblioteca editorial y puerta de entrada al programa El Cuerpo Eléctrico.

Referencias funcionales:

- **Quantia:** arquitectura científica, publicaciones, recursos y divulgación.
- **MindSpring:** calidez educativa, composición tipográfica y retícula modular.
- **Commonplace:** archivo editorial, categorías y lectura de artículos.
- **Sistema RB:** identidad, mapas bioeléctricos, ilustración científica y respaldo del Instituto.

Las referencias no se copiarán ni se mezclarán visualmente de forma literal. El sistema final debe sentirse propio de Regulación Bioeléctrica.

## Principios visuales

- Fondo claro y editorial como estado dominante.
- Verde RB como acento informativo, no como relleno indiscriminado.
- Newsreader para jerarquía editorial; Inter para la interfaz y la lectura continua; Space Mono como acento técnico y Georgia solo dentro de la marca oficial.
- Retícula visible, divisores finos y espacios generosos.
- Ilustraciones científicas con propósito; evitar fotografía de stock como lenguaje principal.
- Animación discreta que ayude a comprender relaciones o estados.
- Autoridad basada en fuentes, autoría y revisión, no en testimonios exagerados.

## Composición de la página pilar

La revisión visual del 13 de agosto de 2026 elevó la página antes de definir una nueva paleta. La intención es que la estructura sostenga por sí misma la autoridad del proyecto, sin depender de efectos decorativos ni de una imagen principal provisional.

- Apertura de gran escala con el nombre del método una sola vez y el dipolo oficial como campo visual.
- Franja de posicionamiento que presenta campo, método y ecosistema editorial.
- Recorrido numerado del `01` al `07` para convertir la página en una introducción progresiva.
- Alternancia entre `Papel` y `Niebla` para establecer ritmo y profundidad sin una franja oscura dominante.
- Retícula institucional de 1200 px en escritorio, con adaptación específica para tablet y móvil.
- Módulo “Sistema de conocimiento” para conectar revisión editorial, comunicación pública, biblioteca y formación.
- Tarjetas con geometría sobria, divisores visibles y radios mínimos para evitar una apariencia genérica de plantilla.
- Imágenes científicas reservadas para una fase posterior; deben incorporarse como contenido editorial, no como sustitutos del sistema de identidad.

Los breakpoints de escritorio, tablet y móvil fueron revisados mediante capturas completas. La paleta ya está aplicada mediante tokens semánticos y la auditoría de la página no detecta colores directos fuera del sistema.

### Sistema cromático aprobado

- `Papel` domina fondos y tarjetas.
- `Niebla` diferencia secciones pedagógicas y módulos de apoyo.
- `Verde bosque` concentra CTA, footer y acentos de navegación.
- La jerarquía de texto tiene **tres niveles**, revisados el 15 de agosto de 2026:

| Token | Valor | Uso | Contraste sobre `Papel` |
|---|---|---|---|
| `RB/Ink Titular` | `#4A4643` | Titulares (`RB/Title`, `RB/Heading`) | `8.7:1` — AAA |
| `RB/Ink Accessible` | `#3A3833` | Cuerpo y texto general | `10.6:1` — AAA |
| `RB/Muted Accessible` | `#66655F` | Texto secundario | `5.5:1` — AA |

  El casi-negro anterior (`#282927`, `13.6:1`) superaba el contraste de cualquier libro impreso y producía halación en pantalla. Los dos niveles reproducen la relación `--ink` / `--soft` del manual B5. Los titulares llevan el tono más suave porque a 76 px la mancha oscura es enorme; el cuerpo conserva más firmeza porque a 17 px la necesita. Ambos siguen cumpliendo el nivel AAA, de modo que el ajuste no cede accesibilidad.
- `Línea sutil` unifica bordes, divisores y retículas.
- `RB/Sobre color` garantiza texto marfil sobre verde bosque.
- Los dos tonos translúcidos del dipolo son tokens derivados del mismo verde web.
- `RB/Night` queda retirado de las secciones estructurales de la portada.
- La navegación utiliza `RB/Nav Link`: tinta en reposo y verde bosque en `hover`; no hereda el terracota del estilo global `Link`.

### Sistema tipográfico aprobado

Revisado el 15 de agosto de 2026. La web usa **una sola familia para todo el texto**, igual que el manual B5. Georgia permanece exclusivamente dentro de los logotipos.

- `RB/Title`: Inter 400, escala responsiva `76 / 64 / 48 px`, tracking `-0.025em`, interlineado `0.98em`.
- `RB/Heading`: Inter 500 a `40 px`, tracking `-0.02em`, para encabezados editoriales de sección.
- `RB/Subheading`: Inter 500 a `28 px` para tarjetas y módulos funcionales.
- `RB/Lead` (20 px), `RB/Body` (17 px) y `RB/Small`: Inter 400.
- `RB/Nav`: Inter 500 a `14 px`, para la barra de escritorio y tablet.
- `RB/Nav Móvil`: Inter 500 a `24 px`, tracking `-0.02em`, para el cajón desplegable de la barra móvil. `RB/Nav` a 14 px es medida de barra de escritorio y resulta ilegible dentro del cajón.
- `RB/Label`: Inter 600 a `12 px` en mayúsculas, tracking `0.07em`.
- Numeración técnica: Space Mono 700.
- Logotipos: Georgia 400 integrada en el activo o componente oficial.

**Por qué se retiró Newsreader.** La hoja de estilo del manual imprimible lo declara de forma explícita: `/* sin Georgia: todo el manual en la familia humanista (Avenir) */`. El B5 fija `--display` y `--serif` en Avenir Next y reserva Georgia para la marca, tal como establece `Manual_de_Marca_RB_2026.md` §4. La web había adoptado una serif editorial que ningún documento de marca respalda. Avenir Next es licenciada y no está disponible en Framer; Inter cumple la misma función —humanista, una sola familia para display y cuerpo— y ya gobernaba interfaz, cuerpo, tarjetas y navegación.

Escala de peso: a 76 px un peso 600 produce una mancha excesiva. La regla es que a mayor tamaño, menor peso — de ahí Inter 400 en `RB/Title` y 500 en `RB/Heading`.

Cormorant Garamond, Outfit e IBM Plex Sans no están activos en los tres breakpoints de la página pública RB; algunos presets globales heredados pueden conservarse mientras otras páginas del proyecto todavía los utilicen. Newsreader ya no aparece en ninguna página RB; los nodos que aún lo usan pertenecen a `/`, la portada del Instituto, que es otra marca y otro sistema.

El contraste comprobado entre `Verde bosque` y `RB/Sobre color` es aproximadamente `5.07:1`. Ambos cumplen WCAG AA para texto normal.

### Cierre del footer

**Revisado el 15 de agosto de 2026.** El footer se compone con un filete superior de `1px` en `Línea sutil` sobre fondo `Papel`, y dos líneas en Space Mono a `10px`: el nombre del método a la izquierda y el aviso sanitario a la derecha.

La decisión anterior —banda de `Verde bosque` con textos marfil— se tomó para una página construida con tarjetas y bandas de color. Con la gramática de documento adoptada en esa misma fecha, una banda de color sólido al pie es el único bloque de color de toda la página y se percibe discordante. El cierre lo hace ahora el mismo filete que separa las secciones.

Esta entrada sustituye a la anterior sobre el cierre cromático del footer.

### Una advertencia sobre las decisiones cromáticas

Las decisiones de color de este documento se tomaron para una composición de tarjetas y bandas. **Al cambiar la gramática visual hay que releerlas todas**, porque varias dejan de tener sentido fuera de aquel sistema. El caso del footer es el ejemplo: correcta en su contexto, discordante en el nuevo.

## Voz editorial

La página debe hablar desde el conocimiento y la vocación educativa, no desde la defensa anticipada.

- Explicar primero qué es, cómo se estudia y por qué resulta relevante.
- Utilizar una voz afirmativa, serena y precisa.
- Presentar fuentes, revisión y contexto como fortalezas del proyecto.
- Evitar acumular fórmulas como “no se afirma”, “no ofrece”, “sin promesas” o “dentro de límites” en bloques consecutivos.
- Concentrar el aviso sanitario general en una sola nota breve en el pie de página.
- Añadir advertencias específicas únicamente cuando una publicación o tema realmente las requiera.
- No convertir prudencia académica en lenguaje inseguro, justificante o apologético.
- No usar máximas tripartitas sobre honestidad, evidencia o dogma, ni eslóganes equivalentes de tono sentencioso, moralizante o autocelebratorio.
- Demostrar rigor mediante fuentes, revisión y claridad; no declararlo mediante máximas publicitarias.
- No incluir universidades, currículum ni trayectoria académica personal en la portada.
- Reservar una posible biografía profesional para una página independiente, sujeta a revisión editorial posterior.

La revisión del 13 de agosto de 2026 sustituyó el tono defensivo de la página pilar por una narrativa organizada alrededor de comprensión, observación, integración, fuentes y formación.

### Norma de redacción concreta

Todo contenido público debe poder relacionarse con una lección de `Curso_Video/Clases_Didacticas`, una definición aprobada o una referencia verificable. La adaptación editorial puede simplificar la sintaxis, pero no volver impreciso el concepto.

- Nombrar el concepto, proceso o sujeto de cada afirmación.
- Explicar qué significa un término antes de desarrollar sus consecuencias.
- Utilizar oraciones directas y párrafos con una función identificable.
- Separar hechos documentados, interpretación del método e hipótesis.
- Conservar la terminología de la fuente didáctica; no introducir sinónimos ornamentales.
- Indicar condiciones, alcance o incertidumbre cuando formen parte real de la afirmación.
- Eliminar frases que podrían pertenecer indistintamente a cualquier sitio educativo, científico o de bienestar.

No se admiten:

- metáforas decorativas, espirituales o grandilocuentes;
- conceptos sin definición concreta, referentes imprecisos o abstracciones acumuladas;
- preguntas retóricas usadas como sustituto de una explicación;
- eslóganes, manifiestos y frases sentenciosas;
- superlativos o promesas como `revolucionario`, `transformador`, `único` o `cambiará la manera de entender` sin una fuente que los justifique;
- fórmulas previsibles de redacción generada por IA, como `en un mundo donde`, `más que un método`, `no se trata solo de... sino de...`, `adentrarnos`, `descubrir un universo`, `un puente entre`, `un viaje hacia` o equivalentes;
- series de tres palabras abstractas empleadas para simular profundidad o autoridad.

Prueba editorial: si una frase puede trasladarse a otra disciplina cambiando únicamente el nombre de Regulación Bioeléctrica, la frase debe reescribirse o eliminarse.

## Papel del blog

El blog se presentará como **Biblioteca RB** durante la primera fase. Tendrá una página de archivo, categorías temáticas y plantillas de artículo optimizadas para lectura extensa.

La base ya está implementada en Framer mediante la colección CMS `RB · Publicaciones`. El archivo y la plantilla de artículo permanecen fuera de indexación mientras solo existan borradores.

El archivo y los artículos utilizan una cabecera editorial compacta. La marca oficial de Regulación Bioeléctrica aparece una sola vez en la parte superior; los enlaces `Método` y `Biblioteca` conectan el sistema editorial con la página pilar. La cabecera usa los estilos compartidos `RB/Nav` y `RB/Nav Link`, sin crear una segunda interpretación tipográfica del logo.

Biblioteca RB conserva exclusivamente publicaciones propias. Las fuentes externas se organizan en **Ciencia y referencias** y los videos, audios, podcast y conversaciones en **Audio y video**. `Mediateca` no se utiliza como etiqueta pública.

Categorías iniciales:

1. Principios de RB.
2. El cuerpo bioeléctrico.
3. Ciencia comentada.
4. Historia e investigadores.
5. Conceptos fundamentales.
6. Noticias y actualidad.
7. Educación y formación.
8. Preguntas frecuentes.

## Plantilla de artículo

Cada artículo debe contemplar:

- título, resumen y nivel de lectura;
- autor y revisor académico;
- fecha de publicación y última revisión;
- tiempo estimado de lectura;
- contenido enriquecido con figuras y pies;
- referencias verificables;
- distinción entre evidencia, interpretación e hipótesis;
- aviso de alcance cuando corresponda;
- lecturas relacionadas;
- llamada contextual hacia El Cuerpo Eléctrico.

## Criterios de calidad

- Lectura cómoda en móvil y escritorio.
- Jerarquía semántica correcta.
- Fuentes visibles y enlazables.
- Imágenes con texto alternativo.
- Sin afirmaciones clínicas no revisadas.
- Página útil aun sin llamada comercial.
- Enlaces internos entre principios, artículos y programa formativo.
- Lenguaje concreto, sin ambigüedad, metáforas decorativas ni fórmulas genéricas de IA.
- Correspondencia verificable entre las afirmaciones principales y las lecciones de `Curso_Video/Clases_Didacticas`.
