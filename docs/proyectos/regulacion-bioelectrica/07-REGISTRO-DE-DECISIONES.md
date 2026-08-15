# Registro de decisiones

## Decisiones vigentes

### 2026-08-15 — Alinear la tipografía web con el manual B5

**Decisión:** retirar Newsreader de la propiedad RB y gobernar todo el texto con Inter, una sola familia. `RB/Title` pasa a Inter 400 y `RB/Heading` a Inter 500. Georgia permanece exclusivamente dentro de los logotipos.

**Razón:** la hoja de estilo del manual imprimible lo declara en un comentario: `/* sin Georgia: todo el manual en la familia humanista (Avenir) */`. El B5 fija `--display` y `--serif` en Avenir Next y reserva Georgia para la marca, como establece `Manual_de_Marca_RB_2026.md` §4. La decisión del 13 de agosto había introducido una serif editorial que ningún documento de marca respalda, y los titulares dejaron de hablar con la voz del propio material impreso.

**Alternativas consideradas:** Avenir Next, descartada por ser licenciada y no estar disponible en Framer. Mulish, Nunito Sans y Figtree, sustitutas próximas a Avenir, descartadas por añadir una familia nueva sin necesidad. STIX Two Text, Source Serif 4 y EB Garamond, descartadas por mantener el registro serif que el manual rechaza. Newsreader con más peso, descartada por conservar la familia equivocada.

**Consecuencias:** se retira Newsreader de las ocho páginas RB. Los nodos que aún lo usan pertenecen a `/`, la portada del Instituto, que es otra marca. Se añade el preset `RB/Nav Móvil` (Inter 500 a 24 px) porque `RB/Nav` a 14 px es medida de barra de escritorio y no funciona dentro del cajón móvil. La escala de peso sigue la regla de que a mayor tamaño corresponde menor peso: a 76 px un peso 600 produce una mancha excesiva. Esta decisión sustituye a «Modernizar el sistema tipográfico RB» del 13 de agosto en todo lo relativo a titulares.

**Responsable:** dirección del proyecto.

### 2026-08-15 — Suavizar la tinta en dos niveles

**Decisión:** sustituir el casi-negro `#282927` por dos tonos: `RB/Ink Titular` (`#4A4643`) para titulares y `RB/Ink Accessible` (`#3A3833`) para cuerpo y texto general. `RB/Muted Accessible` no cambia.

**Razón:** `13.6:1` supera el contraste de cualquier libro impreso, donde el cuerpo ronda `10-12:1`. En pantalla retroiluminada ese exceso produce halación y cansa en lectura larga. El peso percibido nacía además en el titular, no en el cuerpo: a 76 px la superficie oscura es enorme, mientras el mismo tono a 17 px se lee sin esfuerzo.

**Alternativas consideradas:** adoptar literalmente `--ink #2C2C2A` del manual, descartada por ser indistinguible del valor anterior. Un solo tono más suave para todo, descartada por no resolver el titular sin restar firmeza al cuerpo. Llevar todo a `#4A4643`, descartada porque el cuerpo a 17 px se percibe lavado sobre `Papel`.

**Consecuencias:** los dos niveles reproducen la relación `--ink` / `--soft` del B5. Ambos cumplen el nivel **AAA**, de modo que el ajuste no cede accesibilidad. Se actualizaron 25 nodos de titular en ocho páginas RB. Las páginas del nodo de lesión no se tocaron: no usan estos presets y conservan su propio sistema.

**Responsable:** dirección del proyecto.

### 2026-08-13 — Consolidar el sistema público de conocimiento

**Decisión:** organizar la web pública en Método, Principios, Biblioteca RB, Ciencia y referencias, Audio y video, Formación e información institucional.

**Razón:** principios, publicaciones propias, bibliografía externa y contenidos audiovisuales tienen funciones, metadatos y flujos editoriales diferentes.

**Implementación prevista:** conservar `RB · Publicaciones`; crear `RB · Principios`, `RB · Referencias`, `RB · Medios` y `RB · Temas`; añadir `RB · Series` y `RB · Personas` únicamente cuando exista contenido suficiente.

**Consecuencia:** `Mediateca` no se utiliza como nombre público. La navegación mostrará `Audio y video`; el CMS interno se llamará `RB · Medios`. El mapa canónico se mantiene en `02-ARQUITECTURA-WEB.md`.

### 2026-08-13 — Usar `Curso_Video/Clases_Didacticas` como origen editorial

**Decisión:** las páginas educativas, artículos y principios públicos se derivan primero de las lecciones situadas en `Curso_Vigente/Modulo_*/Curso_Video/Clases_Didacticas/`.

**Razón:** estas lecciones contienen la versión didáctica que debe orientar la comunicación pública del método.

**Consecuencia:** programas, manuales de trabajo, guiones, transcripciones y materiales de referencia se emplean como contraste o apoyo. Los borradores del CMS deben registrar la lección didáctica específica y corregirse si fueron asociados únicamente a otra fuente.

### 2026-08-13 — Separar tres capas de contenido

**Decisión:** tratar divulgación pública, formación y contenido profesional como experiencias diferentes.

**Razón:** tienen audiencias, riesgos, objetivos y niveles de acceso distintos.

### 2026-08-13 — Mantener `cursos-timeline` como fuente académica

**Decisión:** no duplicar la biblioteca completa dentro del repositorio web.

**Razón:** evitar divergencia de versiones y conservar una fuente de verdad clara.

### 2026-08-13 — Crear `rb-public-foundation`

**Decisión:** crear una rama hija de `public-homepage` dedicada a la página pilar y al sistema editorial público.

**Razón:** la arquitectura y dirección visual ya tienen una base aprobada; la rama hija preserva `public-homepage` y evita afectar `main`.

### 2026-08-13 — No considerar `noIndex` como protección

**Decisión:** el manual no se tratará como restringido hasta contar con control de acceso real.

**Razón:** una URL directa sigue siendo accesible aunque no aparezca en buscadores.

### 2026-08-13 — Adoptar una dirección híbrida y un blog central

**Decisión:** combinar arquitectura científica, calidez educativa e infraestructura editorial propia; el blog será una función central de adquisición y educación.

**Razón:** una plantilla escolar o de cursos por sí sola no cubre investigación, lectura extensa, referencias ni crecimiento orgánico.

### 2026-08-13 — Rehacer la página pilar y retirar el prototipo profesional

**Decisión:** convertir `/regulacion-bioelectrica` en la página pública principal del método y retirar de su experiencia el prototipo del manual operativo.

**Razón:** la versión anterior presentaba primero el programa El Cuerpo Eléctrico y mezclaba divulgación, formación y contenido profesional. La nueva composición explica el método antes de conducir a Biblioteca RB o formación.

### 2026-08-13 — Aplicar la marca RB canónica en Framer

**Decisión:** retirar la tarjeta conceptual del hero y usar los lockups oficiales de Regulación Bioeléctrica y El Cuerpo Eléctrico en navegación, hero y formación.

**Razón:** el dipolo ampliado y el degradado podían interpretarse como una variante del logotipo sin respaldo en el manual de marca.

**Implementación:** conservar los SVG maestros en el repositorio y reproducirlos mediante `RBBrandMark.tsx` dentro de Framer porque el importador rechazó los elementos `<text>` del SVG. El componente mantiene Georgia 400, geometría, colores y opacidad canónicos y no expone controles de deformación.

**Consecuencia:** las imágenes científicas futuras se tratarán como contenido editorial independiente; no modificarán ni sustituirán el identificador.

### 2026-08-13 — Evitar la duplicación del nombre en el hero

**Decisión:** conservar “Regulación Bioeléctrica” como único H1 y reemplazar el segundo lockup textual del hero por el dipolo ampliado de dos esferas.

**Razón:** la portada del manual demuestra una jerarquía más clara: el dipolo funciona como motivo de identidad y marca de agua, mientras el nombre o título se lee una sola vez.

**Consecuencia:** el lockup completo permanece en la barra superior; el hero utiliza solamente el símbolo en baja opacidad y con la relación 100 % / 35 % entre esferas.

### 2026-08-13 — Adoptar una voz educativa afirmativa

**Decisión:** eliminar la acumulación de negaciones, justificaciones y advertencias de la página pilar, manteniendo un único aviso sanitario general en el pie.

**Razón:** una voz excesivamente defensiva debilitaba la claridad del método y repetía precauciones en lugar de explicar su propuesta educativa.

**Consecuencia:** la narrativa prioriza comprensión, observación, integración, fuentes y formación. Los avisos específicos se reservan para contenidos que realmente los requieran.

### 2026-08-13 — Elevar la estructura antes de redefinir la paleta

**Decisión:** consolidar primero la escala tipográfica, la retícula, el ritmo entre secciones y el recorrido editorial; la paleta se trabajará como una fase independiente.

**Razón:** el carácter profesional de un método emergente debe sostenerse mediante arquitectura, claridad y consistencia, no únicamente mediante color o efectos visuales.

**Implementación:** apertura de mayor escala, franja de posicionamiento, secuencia numerada del `01` al `07`, bloque de estructura del método, principios, sistema de conocimiento, Biblioteca RB, formación y respaldo institucional. Se verificaron las composiciones de escritorio, tablet y móvil.

**Consecuencia:** la siguiente intervención de marca se concentrará en tokens cromáticos y contraste, sin volver a alterar la arquitectura aprobada salvo que una prueba de uso lo justifique.

### 2026-08-13 — Cerrar la paleta clara de la página pilar

**Decisión:** retirar `RB/Night` de la sección `02 · Estructura del método` y construir la página con `Papel`, `Niebla`, `Verde bosque`, tinta accesible, texto secundario accesible y líneas sutiles.

**Razón:** la franja casi negra se percibía discordante respecto al carácter editorial, educativo y sereno del resto de la página.

**Implementación:** la sección pasó a `Niebla`; sus cuatro tarjetas utilizan `Papel`; footer, CTA y etiquetas comparten verde bosque; textos sobre color usan marfil con contraste AA. Se crearon tokens específicos para el dipolo y las líneas sobre color.

**Consecuencia:** la página ya no contiene colores directos en rellenos, bordes ni texto. La pieza gráfica provisional de `El Cuerpo Eléctrico` conserva temporalmente su tratamiento oscuro como parte del recurso editorial, no como superficie del sistema.

### 2026-08-13 — Aislar el estilo cromático de la navegación RB

**Decisión:** sustituir en la barra superior el estilo global terracota `Link` por un preset específico `RB/Nav Link`, con tinta en reposo y verde bosque en interacción.

**Razón:** el terracota no pertenece a la paleta pública de Regulación Bioeléctrica y se percibía discordante.

**Consecuencia:** la navegación queda integrada con la paleta RB sin modificar el estilo global utilizado por otras páginas del proyecto.

### 2026-08-13 — Modernizar el sistema tipográfico RB

**Decisión:** utilizar Newsreader para titulares editoriales y momentos conceptuales; Inter para navegación, etiquetas, cuerpo, tarjetas, CTA y títulos funcionales; Space Mono para numeración técnica; y restringir Georgia a los logotipos oficiales.

**Razón:** la combinación de Cormorant Garamond, Outfit y Georgia producía una apariencia excesivamente clásica y fragmentada para un método científico emergente.

**Consecuencia:** la página gana contraste entre una voz editorial reconocible y una interfaz contemporánea, técnica y legible. `RB/Title` queda normalizado en Newsreader a `76 / 64 / 48 px` para escritorio, tablet y móvil. La tipografía incrustada en la imagen provisional de `El Cuerpo Eléctrico` se resolverá al sustituir ese recurso.

### 2026-08-13 — Adoptar localización nativa con inglés internacional

**Decisión:** mantener español de México como fuente y crear inglés internacional mediante la localización nativa de Framer, compartiendo páginas y CMS.

**Razón:** duplicar páginas manualmente produciría divergencia de diseño, contenido, rutas y metadatos. La infraestructura localizada permite equivalencia de páginas, slugs traducidos y control editorial por idioma.

**Implementación:** estrategia documentada en `09-LOCALIZACION-INGLES.md` y terminología en `10-GLOSARIO-BILINGUE.md`. La activación espera el cierre de paleta, copy y revisión académica del original español.

**Consecuencia:** la futura rama `rb-localization-en` partirá de la versión pública aprobada y no incluirá el manual profesional en su lanzamiento piloto.

### 2026-08-13 — Fijar los nombres ingleses del método y el programa

**Decisión:** utilizar `Bioelectric Regulation` para el método y `The Electric Body` como título editorial inglés del programa.

**Razón:** ambos usos ya existen en las fuentes inglesas del repositorio académico. Se evita crear una terminología paralela desde el sitio web.

**Consecuencia:** el lockup gráfico de `El Cuerpo Eléctrico` permanece en español hasta que exista una versión inglesa aprobada; no se introduce la sigla `BR`.

### 2026-08-13 — Evitar máximas autocelebratorias

**Decisión:** no utilizar máximas autocelebratorias sobre honestidad, evidencia o dogma, ni fórmulas equivalentes en la web pública o la versión inglesa.

**Razón:** el rigor debe percibirse en las fuentes, la trazabilidad y la calidad del contenido, no declararse mediante una frase moralizante o promocional.

**Consecuencia:** la voz pública se mantiene educativa, directa y sustentada en el contenido.

### 2026-08-13 — Retirar el currículum de la portada

**Decisión:** eliminar del `main` la sección curricular del Dr. Miguel Ojeda Rios y no mencionar universidades en la portada.

**Razón:** la página principal debe concentrarse en explicar el método, sus principios, su biblioteca y su camino formativo.

**Consecuencia:** la sección `06 · Camino formativo` conduce directamente a `07 · Respaldo institucional`. Una posible biografía quedará para una página independiente y no forma parte del alcance actual.

### 2026-08-13 — Integrar el footer con el verde de marca

**Decisión:** sustituir el fondo `RB/Night` del footer por el token existente `Verde bosque` y usar texto marfil de alto contraste.

**Razón:** el fondo anterior se percibía discordante respecto a los acentos verdes que articulan la página.

**Consecuencia:** el footer funciona como cierre cromático de la identidad y reutiliza el sistema cromático aprobado para la página pilar.

### 2026-08-13 — Reservar `agente` para la agencia biológica

**Decisión:** en la biblioteca pública, `agente` designa al sistema biológico descrito por el marco TAME. No se utiliza como sinónimo de profesional, practicante o persona formada.

**Razón:** `Curso_Video/Clases_Didacticas/Clase_3_El_Cuerpo_Agente/Leccion_3.1_El_Cuerpo_Agente_y_TAME.md` define la agencia como una propiedad del sistema biológico. Usar la misma palabra para el profesional produciría una ambigüedad conceptual.

**Consecuencia:** el tercer artículo se titula `Estado bioeléctrico, instrumento y procedimiento`; la ficha `Agencia biológica` explica el uso del término antes de relacionarlo con RB.

### 2026-08-13 — Implementar Principios como colección independiente

**Decisión:** crear `RB · Principios` separada de `RB · Publicaciones`, con fichas breves, ordenadas y trazables a una lección didáctica.

**Razón:** un principio estable cumple una función distinta a un artículo editorial extenso y requiere navegación, metadatos y ritmo de lectura propios.

**Consecuencia:** existen seis borradores iniciales y páginas de índice y detalle con `noIndex`. La aprobación pública depende de revisión académica.

## Decisiones pendientes

| Asunto | Opciones | Requisito para decidir |
|---|---|---|
| Base de la rama RB | `main` o estado aprobado de `public-homepage` | Decisión sobre nueva portada del Instituto |
| Acceso profesional | portal existente, autenticación externa o plataforma separada | Revisión técnica y experiencia de alumnos |
| Conversión principal | newsletter, lista de interés o inscripción | Prioridad comercial del trimestre |
| Dominio/ruta final | subcarpeta institucional u otra propiedad | Estrategia institucional de dominios |

## Plantilla para nuevas decisiones

```text
### AAAA-MM-DD — Título

Decisión:
Razón:
Alternativas consideradas:
Consecuencias:
Responsable:
```
