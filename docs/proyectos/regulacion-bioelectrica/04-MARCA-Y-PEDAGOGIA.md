# Marca y pedagogía

## Jerarquía de marca

1. Instituto Centrobioenergética: respaldo institucional.
2. Regulación Bioeléctrica: nombre del método.
3. El Cuerpo Eléctrico: nombre del programa formativo.

No presentar El Cuerpo Eléctrico como sinónimo de todo el método.

### Uso de marca en inglés

- `Bioelectric Regulation` es el nombre inglés editorial del método.
- `The Electric Body` es la traducción editorial aprobada para títulos y comunicación inglesa.
- El logotipo de `El Cuerpo Eléctrico` permanece en español hasta diseñar y aprobar un lockup inglés canónico.
- No recomponer un logo inglés directamente en Framer ni traducir el nombre institucional.
- `RB` puede conservarse como sigla de origen español; no introducir `BR` sin una decisión global de marca.

## Identidad RB

- Color principal: `#0F6E56`.
- Color complementario: `#5DCAA5`.
- Fondo editorial: `#FAF9F6` y blanco.
- El dipolo usa dos nodos del mismo color, al 100 % y 35 % de opacidad.
- El identificador utiliza Georgia regular (`400`); no se sustituye por Playfair, Cormorant, Newsreader ni una sans serif.
- El símbolo se coloca siempre a la izquierda del nombre y conserva las proporciones del SVG maestro.
- El logotipo es monocromático por versión: verde petróleo sobre fondo claro o verde menta y crema sobre fondo oscuro.
- No aplicar gradientes, sombras, resplandores, volumen, rotación ni efectos al logotipo.
- No reconstruir la marca con capas decorativas de Framer. Utilizar el SVG canónico o el componente vectorial controlado que reproduce ese SVG sin alterar su geometría.
- Los colores técnicos de polaridad se respetan dentro del material profesional y no se sustituyen por colores decorativos.
- La firma del Instituto debe aparecer como respaldo, no competir con el identificador RB.

### Paleta operativa para la web

Los colores maestros del logotipo permanecen intactos. Para interfaz y texto se utiliza una adaptación accesible y semántica:

| Token | Valor claro | Función |
|---|---:|---|
| `Papel` | `#F8F7F2` | Fondo editorial dominante y tarjetas claras. |
| `Niebla` | `#E7ECE5` | Secciones de contraste suave y módulos informativos. |
| `Verde bosque` | `#08745F` | Botones principales, footer y acentos funcionales. |
| `Accent Accessible` | `#08745F` | Etiquetas, números y líneas activas sobre fondos claros. |
| `Ink Accessible` | `#282927` | Titulares y texto principal. |
| `Muted Accessible` | `#66655F` | Texto secundario sobre superficies claras. |
| `Línea sutil` | `#D7D7CF` | Bordes, divisores y retícula. |
| `RB/Sobre color` | `#F4F1EA` | Texto sobre verde bosque. |
| `RB/Dipolo activo` | `rgba(8, 116, 95, 0.16)` | Primera esfera y línea del motivo ampliado. |
| `RB/Dipolo referencia` | `rgba(8, 116, 95, 0.06)` | Segunda esfera del motivo ampliado. |

El verde canónico `#0F6E56` continúa dentro del logotipo y los activos maestros. El verde web `#08745F` se reserva para controles y texto pequeño porque ofrece mejor contraste. No sustituir uno por otro dentro de los SVG de marca.

La página pública no utiliza fondos casi negros como superficie estructural. El tono oscuro visible en la pieza provisional de `El Cuerpo Eléctrico` pertenece a esa imagen y deberá revisarse cuando se produzca el recurso definitivo.

### Activos web controlados

| Uso | Archivo |
|---|---|
| Marca RB sobre fondo claro | `assets/logo-principal-light.svg` |
| Marca RB sobre fondo oscuro | `assets/logo-principal-dark.svg` |
| Programa formativo | `assets/programa-el-cuerpo-electrico.svg` |

Las copias de `assets/` son activos de implementación web. La fuente maestra continúa en `cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Marca_Visual/Branding_RB_2026/`.

### Adaptación técnica en Framer

El importador SVG de Framer rechazó los archivos maestros porque contienen elementos tipográficos `<text>`. Para evitar rasterización y sustituciones de fuente se creó el componente `RBBrandMark.tsx` dentro del proyecto Framer.

El componente:

- reproduce los mismos `viewBox`, coordenadas, radios, líneas, opacidades y colores de los SVG maestros;
- declara `Georgia, Times New Roman, serif` y peso `400` dentro del vector;
- ofrece únicamente las configuraciones controladas `Regulación Bioeléctrica / claro`, `Regulación Bioeléctrica / oscuro` y `El Cuerpo Eléctrico`;
- incluye nombres accesibles para lectores de pantalla;
- no introduce animación, degradado, sombra ni controles capaces de deformar la marca.

Si Framer admite más adelante la importación directa de estos SVG con texto, el componente puede sustituirse por los activos maestros sin cambiar la composición.

### Tipografía editorial frente a tipografía de marca

- **Georgia 400:** obligatoria exclusivamente dentro de los logotipos oficiales.
- **Newsreader:** voz editorial para el título principal, encabezados mayores y momentos conceptuales. No se utiliza en navegación, párrafos ni controles.
- **Inter:** familia funcional para navegación, etiquetas, cuerpo, notas, CTA, tarjetas y títulos operativos.
- **Space Mono:** acento técnico reservado para numeración breve y datos estructurados.
- Una tipografía editorial distinta nunca debe emplearse para recomponer el nombre dentro del logotipo.
- Las ilustraciones científicas son contenido pedagógico independiente y no sustituyen ni modifican la marca.

La migración del 13 de agosto de 2026 retiró `Cormorant Garamond`, `Outfit`, `IBM Plex Sans` y Georgia de la interfaz editorial. El sistema final combina Newsreader para jerarquía editorial e Inter para claridad funcional, sin alterar la geometría de la marca. El título principal usa Newsreader en los tres breakpoints con escala `76 / 64 / 48 px`. La pieza gráfica provisional de `El Cuerpo Eléctrico` conserva tipografía incrustada propia hasta que se diseñe su reemplazo.

### Uso del dipolo en portadas y heroes

- Cuando “Regulación Bioeléctrica” ya aparece como título principal, no repetir el lockup textual completo dentro del mismo hero.
- En ese caso se utiliza únicamente el dipolo —dos esferas y una línea— como motivo visual ampliado.
- La segunda esfera conserva el 35 % de la opacidad de la primera.
- El motivo ampliado puede utilizar una opacidad general baja, como la marca de agua de la portada del manual, siempre que permanezcan intactas sus proporciones.
- El logotipo completo se reserva para navegación, firma o contextos donde el nombre no esté ya presente.

Referencia de composición: `Referencia/Punto_Trauma/Manual/manual_html/Manual_Pagina_01_Portada.html` en el repositorio `cursos-timeline`.

Fuentes canónicas:

```text
Marca_Visual/Branding_RB_2026/Manual_de_Marca_RB_2026.md
Marca_Visual/Relacion_con_Marca_Institucional.md
Marca_Visual/Direccion_de_Arte_Ilustracion/Sistema_de_Ilustracion_Cientifica.md
```

## Dirección de ilustración

- mapas de voltaje y gradientes legibles;
- vectores limpios y fondos claros como estándar;
- dos o tres colores de información más neutrales;
- función científica o pedagógica explícita;
- evitar redes energéticas genéricas, brillos místicos y anatomía 3D espectacular sin función;
- documentar alt text y propósito de cada figura.

La tarjeta conceptual abstracta creada inicialmente para el hero fue retirada el 13 de agosto de 2026 porque podía confundirse con una extensión del identificador y no respetaba la geometría canónica del dipolo. El lockup textual que la sustituyó se retiró después del hero porque duplicaba el nombre del H1 y resultaba demasiado pequeño. La composición vigente utiliza el título una sola vez y el dipolo ampliado como motivo visual. Las nuevas imágenes del hero se incorporarán únicamente después de aprobar su función pedagógica y su dirección de arte.

La corrección fue verificada visualmente en los breakpoints de escritorio, tablet y móvil de `/regulacion-bioelectrica`.

## Modelo pedagógico para web

La explicación pública debe avanzar en este orden:

```text
fenómeno observable
→ estado bioeléctrico
→ instrumento de lectura/intervención
→ agente y capacidad de regulación
→ procedimiento o formación
```

Cada unidad pública debe responder:

1. ¿Qué es?
2. ¿Por qué importa?
3. ¿Cómo se observa o estudia?
4. ¿Qué evidencia la sostiene?
5. ¿Qué límites tiene?
6. ¿Cuál es el siguiente paso seguro?

## Traducción del aula al sitio público

- No publicar una clase completa como artículo sin adaptación.
- Convertir cada concepto en una unidad autocontenida y enlazable.
- Separar explicación, evidencia, analogía y práctica.
- Señalar cuándo una imagen es esquema, interpretación o dato experimental.
- Evitar promesas absolutas y lenguaje que convierta una hipótesis en hecho establecido.
