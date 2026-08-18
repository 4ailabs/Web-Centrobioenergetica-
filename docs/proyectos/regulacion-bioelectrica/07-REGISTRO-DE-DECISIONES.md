# Registro de decisiones

## Decisiones vigentes

### 2026-08-15 — El artículo se compone como pieza de lectura, no como página de composición

**Decisión:** columna única centrada, sin aparato lateral, cuerpo a `20px / 32px` sobre una mancha de `620px` —unos 62 caracteres—, título de artículo a `44px`, título de sección a `27px`. El material final va al pie de la columna: referencias primero, firma después.

**Razón:** se replicó tres veces la retícula de la portada —columna de lectura más margen con filete— sobre una pieza que no la admite. Un margen de aparato se gana su sitio solo cuando el contenido puede **anclarse a un punto del flujo**, como las sidenotes de Tufte o las figuras al margen de Distill. En Framer el cuerpo es un único bloque de texto enriquecido: nunca podrá anclarse nada, de modo que el filete corría 2.900px junto a una columna vacía.

**Evidencia, esta vez consultada y no recordada:** de seis publicaciones profesionales revisadas en su HTML y su CSS —eLife, PLOS Biology, Distill, Works in Progress, Our World in Data y Tufte CSS— **cinco usan columna única sin aparato lateral**, con las figuras dentro del flujo y el material final al pie. La única que usa margen es Tufte, y lo hace con `float: right` anclado a su punto del texto.

**Regla de tipo de página que sale de ahí:** las páginas de composición —portada e índices— alinean su contenido en `x92`, porque tienen bloques que ocupan los `1016` de ancho. **Las piezas de lectura se centran**, porque una sola columna no tiene con qué alinearse y el eje izquierdo solo produce un vacío a la derecha.

**Rango de títulos:** `72` la portada del método · `56` las páginas de sección · `44` la pieza. Antes las cuatro llevaban `72`, que es el tamaño del nombre del método, y por eso el título del artículo no guardaba relación con su propio texto.

**Nota sobre proporción:** cuando una columna se ve apretada, se escala el tipo, no la línea. Inter tiene una altura de x de `0,546 em` frente a `0,484` de Georgia: entrega más masa negra por línea, así que alargar la medida empeora la legibilidad en vez de mejorarla.

### 2026-08-15 — Qué admite el campo de texto enriquecido, comprobado

**Constatación verificada con una prueba directa**, no inferida. Se inyectaron diez construcciones en el campo `Contenido` de `RB · Publicaciones` y se leyó el resultado guardado.

**Sobrevive:** `p` · `h3` · `strong` · `em` · `img` · `blockquote` · `ul`/`li` · `table` (envuelta en `figure`).

**Se descarta:** **todos los atributos `style` en línea** —`conservaStyle: false`—, y con ellos `float` y los márgenes negativos. También se aplanan a texto plano `<sup>` y `<a href="#ancla">`.

**Consecuencias.** No hay notas al margen, porque dependen de `float`. No hay llamadas de nota. No hay anclas internas, de modo que tampoco cabe un índice que salte a las secciones. Y `table` solo sobrevive en su forma más simple: con `tbody` o con etiquetas anidadas dentro de las celdas, Framer descarta la tabla entera.

**Regla operativa:** el texto enriquecido sirve para texto. **Todo lo que tenga estructura visual —tablas, escalas, diagramas— se autora como SVG**, se sube con `framer.uploadImage` y se coloca en línea con `<img>`. Es la única vía que da control sobre filetes, alineación y paleta.

### 2026-08-15 — Las figuras SVG deben responder al modo oscuro

**Decisión:** ningún SVG lleva fondo opaco ni colores en duro. Fondo transparente, colores por variable CSS y una consulta `@media (prefers-color-scheme: dark)` **dentro del propio archivo**.

**Razón:** un `<img>` no hereda el CSS de la página, así que la única forma de que una figura respete el tema es que traiga su propia consulta. Las dos primeras figuras se subieron con `fill="#F8F7F2"` y pintaban una caja clara sobre página oscura.

**Valores:** tinta `#3A3833` / `#F4F1EA` · apagado `#66655F` / `#C9C5BC` · línea `#D7D7CF` / blanco al 22% · acento `#08745F` / `#8EDBCB`. El alfa de la línea en oscuro sube del 8% que declara el token al 22%: al 8% los filetes de una tabla son invisibles, que es el mismo defecto de contraste corregido por la mañana en la Fig. 2 de la portada.

### 2026-08-15 — El pie es mobiliario del sitio y va en todas las rutas

**Decisión:** las seis rutas RB llevan el mismo pie —contacto y línea de identidad—, igual que llevan la misma barra.

**Razón:** solo la portada tenía pie. `/articulos`, `/principios`, `/metodo`, el manual y las plantillas terminaban de golpe con su último bloque de contenido.

**Distinción que ordena el criterio, y que costó cuatro iteraciones aprender:** **el mobiliario del sitio —barra y pie— debe ser idéntico en todas las rutas**, porque es identidad. **La retícula de lectura no**, porque cada género tiene la suya. Se estuvo copiando lo que no correspondía y rechazando copiar lo que sí.

### 2026-08-15 — El primer artículo pasa de esqueleto a pieza

**Decisión:** «Qué significa que el cuerpo sea bioeléctrico» pasa de `713` a `1.626` palabras, con once secciones, dos figuras, una cita destacada y catorce referencias.

**Razón:** los tres artículos eran esqueletos de 160 a 198 palabras etiquetados como «5 min» y «6 min» —un error de factor cinco que el lector detecta al instante—. Y el primero repetía la portada: su contenido era el de la sección `01`.

**Qué aporta ahora que la portada no tiene:** la densidad de carga fija medida en tejidos humanos, el potencial de Donnan y el pH local que puede diferir del de la sangre, la normokaliemia con deficiencia tisular, y la cascada calcio → magnesio → potasio. Material de la Lección 1.3, que no se había leído.

**Y una sección que ninguna página del sitio ofrecía:** *Tres niveles de evidencia*. Distingue las cuantificaciones publicadas, la cascada del mesénquima —coherente con esa biofísica pero con menos respaldo controlado— y los métodos derivados de la bioelectrónica de Vincent, que **no han sido validados por ensayos clínicos**, dicho con esas palabras. Es lo que un clínico busca, y sustituye al descargo genérico.

**Corrección de fondo:** el texto no contestaba su propio título. Ahora abre respondiendo qué significa, despliega las tres consecuencias que se siguen, y cierra volviendo a la pregunta.

### 2026-08-15 — El modelo de la portada se extiende a las subpáginas RB

**Decisión:** `/articulos`, `/principios` y `/metodo` adoptan la gramática de documento: Inter en toda la página, sin tarjetas, sin bandas de color a ancho completo, listas separadas por filete de `1px`, secciones por filete de `2px`, y medida de `1016px`.

**Razón:** las tres estaban en estados distintos y ninguna en el modelo. `/articulos` y `/principios` iban en **Playfair** con las publicaciones en tarjetas de esquina redondeada, y usaban los tokens de color retirados el 15 de agosto —`Tinta` `#282927` y `Texto secundario`—. `/metodo` ya estaba en Inter y con folios, pero conservaba bandas de color y tarjetas, que son las dos cosas que `12-MODELO §5bis` retira por nombre.

**Consecuencias:** el hallazgo de fondo es que el proyecto ya tenía una familia de presets `RB/` completa —Title, Heading, Subheading, Lead, Body, Small, Label, Nav— **que no se estaba usando en ninguna parte**: la portada estila cada nodo en directo y las subpáginas heredaban presets de Playfair de una versión anterior. En lugar de estilar nodo a nodo, los presets `RB/` se alinearon a la escala del modelo y se asignaron. **El modelo queda así portable**: las páginas restantes se migran asignando preset, no reescribiendo atributos. Nota operativa: los presets son de proyecto, no de página.

### 2026-08-15 — Una sola barra de navegación para todo RB

**Decisión:** las seis páginas RB usan el componente `Navegación RB` de la portada, en flujo (`relative`, `maxWidth 1200`), con la variante que corresponde a cada breakpoint.

**Razón:** no era un problema estético. Las subpáginas tenían una cabecera propia con **dos** enlaces, Método y Biblioteca. **`/principios` no aparecía en ninguna barra del sitio**: la ruta existía, tenía seis registros y solo se llegaba escribiendo la URL. `/nodo-de-lesion` no tenía barra en absoluto, de modo que se entraba al manual sin forma de volver. Y ninguna tenía cajón móvil.

**Consecuencias:** lo que se cambie en el componente se propaga a las seis páginas. Queda pendiente ahí la píldora `FORMACIÓN`, que contradice la gramática del documento y solo es editable desde el editor de componentes.

### 2026-08-15 — Tres páginas competían por el mismo titular

**Decisión:** `/articulos` pasa a titularse **Biblioteca RB**, `/principios` a **Principios del método** y `/metodo` a **Estructura del método**.

**Razón:** las tres se titulaban «Qué es la Regulación Bioeléctrica», que es la pregunta que responde la portada. Cuatro páginas del mismo sitio compitiendo por la misma consulta.

### 2026-08-15 — El campo Fuentes publicaba rutas del repositorio

**Decisión:** las seis rutas de archivo del campo `Fuentes` de `RB · Publicaciones` se sustituyen por la referencia legible de cada lección. El campo `Revisor Académico` se vacía.

**Razón:** los artículos imprimían en público cadenas como `Curso_Vigente/Modulo_1/Curso_Video/Clases_Didacticas/Clase_1_El_Cuerpo_Electrico/Leccion_1.1_Que_es_la_RB.md`. No es una referencia: es la estructura interna del repositorio académico expuesta a cualquier lector. `Revisor Académico` decía «Pendiente» y se imprimía en la cabecera del artículo como si fuera un dato; el estado editorial ya declara Borrador.

### 2026-08-15 — CORREGIDA · Las plantillas CMS sí son editables por API

**Esta entrada era falsa y se corrige.** Las páginas `:slug` **sí** se editan: hay que dirigirse a ellas con la **ruta padre** (`/regulacion-bioelectrica/articulos`), no con la ruta que contiene `:slug`. La pista estaba a la vista —las capturas de la plantilla ya funcionaban así— y no la vi. Lo que sigue describe el diagnóstico equivocado del que se partió: `pagePath` rechaza la ruta con `:slug`, `navigateTo` está prohibido en modo `api`, `session new` no admite abrir una página concreta, `setAttributes` devuelve éxito sin aplicar nada y `addComponentInstance` falla con «Parent node not found» sobre un breakpoint existente. El árbol se lee entero; no se escribe.

**Trabajo pendiente en el editor de Framer**, ya diagnosticado: borrar los tres breakpoints sobrantes de `/articulos/:slug`; sustituir la cabecera vieja por el componente; retirar el aviso «no sustituye valoración, diagnóstico ni tratamiento profesional», que al vivir en la plantilla se repite en todas las publicaciones; quitar la tarjeta del panel de estado; título a `RB/Title` en vez de Playfair; enlace de vuelta a `RB/Accent Accessible` en vez de terracota; medida a `1016`; y añadir `Última Revisión`, que la portada promete y la plantilla no muestra. `/principios/:slug` además pide Categoría, Nivel y Tiempo de lectura, campos que su colección no tiene: hay que reconstruirla contra los siete reales.

### 2026-08-15 — La sección 04 se parte en dos columnas

**Decisión:** la columna de lectura de `04` se divide. La primera lleva el título y el párrafo del instrumento; entre las dos va el enunciado con la definición de nodo; la segunda lleva el dipolo y el procedimiento.

**Razón:** los tres párrafos vivían en una sola columna, de modo que un bloque a ancho de retícula solo podía colocarse detrás de los tres. La definición de nodo habría aterrizado después del párrafo del procedimiento, y el lector se habría encontrado «Cada tejido tiene su rango» antes de saber qué es un nodo — el defecto de términos definidos tarde que la auditoría de comprensión ya había señalado.

**Consecuencias:** de paso se cierran dos huecos de esa misma auditoría. El segundo momento nunca se llamaba **aplicación**, aunque el término existe en el vocabulario del método, y **perfil bioeléctrico** aparecía como resultado sin decir qué contiene.

**Trampas de la API, anotadas para no repetirlas:** los `FrameNode` creados por DSL nacen **sin layout y con los hijos en `absolute`**, así que hay que declarar `layout: "stack"` explícitamente o el bloque se sale de la página. `SET` sobre el texto de un `TextRun` que no tiene atributos propios **no prende**: hay que usar `setText` en el nodo. Y `visible: false` en escritorio **cascada** hacia tablet y móvil: cada breakpoint necesita su declaración.

### 2026-08-15 — La Fig. 3 pasa a eje logarítmico, y solo en escritorio

**Decisión:** en escritorio, la tabla de intensidades se sustituye por un eje logarítmico de `1016px` con seis décadas, de `0,01` a `10 000` militeslas. Las dos bandas propias del método —ventana de respuesta tisular y imanes clínicos— van en `RB/Accent Accessible`; las tres de referencia, en `RB/Muted Accessible`. En tablet y móvil se conserva la tabla.

**Razón:** son cinco magnitudes que cubren cinco órdenes, y en una lista el lector tiene que hacer la aritmética de cabeza. En eje logarítmico el argumento se ve solo: la ventana tisular queda por debajo de lo que el imán entrega en superficie, y a dos décadas de una resonancia.

**Alternativas consideradas:** llevar el eje a los tres breakpoints, descartada por dos motivos. Las posiciones son absolutas y están calculadas sobre `1016px`, de modo que en los `714px` útiles de tablet se saldrían del marco. Y un revisor externo señaló que **la tabla en móvil está especialmente bien resuelta**: sustituirla en todas partes habría tirado un acierto para arreglar otro sitio.

**Desviación deliberada de la auditoría:** la propuesta original pedía las bandas de referencia en `Salvia suave`. Sobre `Papel` eso da `1,4:1` — exactamente el defecto de invisibilidad que se acababa de corregir en la Fig. 2. Van en `Muted Accessible`, que da `5,45:1` y conserva la jerarquía.

### 2026-08-15 — Biblioteca y Formación salen de la serie numerada

**Decisión:** `05` y `06` pierden el folio, su filete de cabecera baja de `2px` en `RB/Ink Accessible` a `1px` en `Línea sutil`, y no llevan columna de margen. La serie numerada queda en `01`–`04`.

**Razón:** la cadena del argumento definida en `12-MODELO §3` va de `01` a `04`. Biblioteca y Formación son aparato institucional, no eslabones. Mientras llevaran folio y filete grueso, la página pedía que sus titulares afirmaran algo —y de ahí salió `Publicaciones propias, con sus fuentes a la vista`, una frase de folleto que hubo que retirar el mismo día. Un tercer revisor externo señaló además que las dos secciones abrían composición a dos columnas sin usar la derecha, y que faltaba transición entre el documento explicativo y la parte institucional. Sacarlas de la serie resuelve las tres cosas y devuelve al filete de `2px` su único significado.

**Alternativas consideradas:** mantenerlas numeradas y darles aparato real en el margen —los últimos títulos de la Biblioteca, y duración y modalidad en Formación—, descartada porque el aparato habría sido de relleno y ninguna de las dos tiene nota que aportar al argumento.

### 2026-08-15 — El verde solo marca lo accionable y el dato

**Decisión:** `RB/Accent Accessible` queda reservado a enlaces, llamadas de nota y dato destacado en figura. Los rótulos de aparato pasan a `RB/Muted Accessible`. Las llamadas `¹ ²` pasan a verde con peso 600. El correo del colofón pasa a verde.

**Razón:** el verde marcaba a la vez enlaces, rótulos, estados y datos, de modo que no se podía saber qué era pulsable. Mientras tanto las llamadas de nota —único puente entre el cuerpo y el margen— iban en tinta normal y eran invisibles, y el correo, que es lo único accionable para un clínico o un periodista, iba en tinta plana.

**Consecuencias:** la causa era una sola: el preset `RB/Label` llevaba el token de acento. Se corrigió ahí. **Los presets son de proyecto, no de página**, así que el cambio alcanza a las demás páginas RB que usen `RB/Label`; si en alguna el rótulo verde era intencionado, hay que declarar la excepción en esa página. Las llamadas exigieron partir el `TextRun` del párrafo: `setText` no admite formato parcial y `getHTML` no está expuesto en la sesión del agente.

### 2026-08-15 — Los pies de figura salen de la monoespaciada

**Decisión:** el pie va en Inter 400 a `13px`, interlineado `1.5`, en `RB/Muted Accessible`, con medida máxima de `440px`. Solo el prefijo `Fig. N —` conserva Space Mono 700 a `10px`. El pie va siempre debajo de la figura.

**Razón:** iban enteros en Space Mono a `10px` —monoespaciada, en gris, a cuerpo mínimo y con medida mayor que la del propio texto—, y en móvil se leían como textura y no como contenido consultable. Space Mono queda donde trabaja: cifras, folios y etiquetas numéricas. El pie de la `Fig. 3` estaba encima de la figura, único caso de la página.

### 2026-08-15 — Medida única y retícula invariante en la página pilar

**Decisión:** las seis secciones componen a `544px` de mancha. El canal entre lectura y margen pasa de `84px` a `124px`, el filete de margen se sitúa en `x760` y se dibuja siempre, con su altura fijada por la columna de lectura. El ritmo vertical se cierra en la escala `16 / 24 / 32 / 48 / 64 / 96`.

**Razón:** dos auditorías externas independientes —una de dirección de arte editorial científica, otra de comprensión y divulgación— señalaron la misma sección por caminos distintos. La `02` componía a `640px` y `89` caracteres por línea, contra `76` en el resto, por aplicación de la cláusula que autorizaba `maxWidth 640px` a las secciones sin margen. Es la sección más densa de la página y la que lleva la tesis del método: estaba puesta en la peor medida disponible. La cuenta nueva cierra en `668 + 348 = 1016`, que corrige de paso un descentrado de `164px` que la página arrastraba sin decisión.

**Alternativas consideradas:** dibujar el filete solo donde hay nota, descartada porque una retícula que aparece y desaparece con el contenido no es una retícula. Rellenar los márgenes vacíos por simetría, descartada por el propio modelo: el aparato no se inventa.

**Consecuencias:** queda derogada la cláusula de `maxWidth 640px` de `12-MODELO §5bis`. Los valores de escritorio se filtraron a los breakpoints menores al aplicarlos y hubo que declarar override propio en tablet —canal de `64px`, margen de `240px` sobre `714` útiles— y en móvil, donde el margen vuelve a ser bloque con filete superior y no existe filete vertical. El filete siempre dibujado deja al descubierto que `02`, `05` y `06` no tienen aparato que aportar; eso es un hueco de contenido, no de retícula, y queda abierto.

**Responsable:** dirección del proyecto.

### 2026-08-15 — Corregir la Fig. 2 y las áreas táctiles

**Decisión:** las celdas de la Fig. 2 llevan contorno de `2px` en `RB/Ink Accessible`, la isla lo lleva en `RB/Accent Accessible`, y los enlaces pasan de `1px` a `2px`. Los enlaces de bloque adoptan `minHeight 24px`. Los dos textos del pie pasan de `fit-content` a `100%`.

**Razón:** las celdas iban en `Salvia suave` sobre `Niebla`, que da `1,23:1`. WCAG 2.2 SC 1.4.11 pide `3:1` para gráficos informativos, pero antes de eso el problema es que no se veían: la isla —el concepto entero de la sección `03`— era del color del papel. Los enlaces medían `20px` de alto contra el mínimo de `24×24` de SC 2.5.8. El `fit-content` del pie impedía el salto de línea y la segunda línea se salía del viewport a `390px`.

**Consecuencias:** la isla se lee ahora por sus enlaces ausentes, no por ser más pálida, que era la lectura equivocada. En `TextNode` el atributo es `minHeight`: `padding` no existe en ese tipo de nodo.

### 2026-08-15 — Retirar «sostener» y cerrar el contrato de vocabulario

**Decisión:** el verbo `sostener` sale de la portada, y `punto de calibración` se sustituye por `voltaje de referencia`. Los titulares de `04` y `05` pasan de rótulo a enunciado.

**Razón:** `sostener` aparecía cuatro veces con tres significados —durar, mantener y defender— y en la `02` no describía ninguna operación física: la definición real venía después de los dos puntos. El término preciso es `defender`, que es además el que la fisiología usa para una variable regulada. `punto de calibración` era un tercer nombre para lo que el §6 de `12-MODELO` manda llamar `referencia` de forma consistente en toda la página.

**Consecuencias:** `Con qué se trabaja, y en qué orden` era el único titular de la página que no afirmaba nada, y encabezaba la sección que el lector busca. Pasa a `El imán cambia el voltaje de las células que alcanza`. `Ideas, fuentes y actualidad` —tres sustantivos sin verbo— pasa a `Publicaciones propias, con sus fuentes a la vista`.

**Responsable:** dirección del proyecto.

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
