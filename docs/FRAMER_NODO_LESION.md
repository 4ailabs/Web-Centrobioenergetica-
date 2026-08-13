# Framer — Manual web «El nodo de lesión»

Guía de continuidad para diseñar, mantener y publicar el manual de Regulación Bioeléctrica en Framer.

> Estado de referencia: agosto de 2026. Los identificadores se incluyen para facilitar la orientación, pero deben confirmarse contra el proyecto vivo antes de cada edición.

## 1. Objetivo y principio editorial

El manual se presenta como una experiencia web dividida en rutas compartibles. No es un archivo descargable, un `embed` del HTML original ni una reproducción rígida en tamaño B5.

La adaptación web puede reorganizar la composición, introducir navegación, mejorar la lectura responsiva y convertir ilustraciones en SVG. No puede:

- eliminar información;
- resumir o parafrasear contenido clínico;
- fusionar fragmentos hasta alterar su significado;
- sustituir criterios, tiempos, polaridades o instrucciones;
- convertir rótulos de una lámina en prosa;
- habilitar descarga o impresión como finalidad de la página.

Los únicos textos que pueden retirarse son duplicados puramente editoriales, por ejemplo un encabezado repetido por la extracción del documento. Antes de retirarlos se debe comprobar que no contienen información sustantiva.

## 2. Fuente de verdad

La fuente editorial principal es:

```text
/Users/miguel/Centrobioenergetica-Instituto/
  03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/
  Referencia/Punto_Trauma/Manual/Manual_Imprimible_RB.html
```

Las reglas de marca e ilustración se encuentran en:

```text
.../El_Cuerpo_Electrico_RB/Marca_Visual/
```

Antes de modificar contenido, comparar el texto de Framer con la fuente bloque por bloque. El repositorio web no reemplaza al manual como fuente clínica.

## 3. Proyecto y arquitectura en Framer

- Proyecto: `Instituto`
- Proyecto ID: `zzgwwJi3CXZa14noLOao`
- Rama de trabajo utilizada: `public-homepage`
- Editor: `https://framer.com/projects/Instituto--zzgwwJi3CXZa14noLOao-3HgR1`
- Componente principal: `NodoLesionManual.tsx`
- Code file observado: `zCbsRim`

### Rutas

- Portada e índice: `/regulacion-bioelectrica/nodo-de-lesion`
- Secciones: `/regulacion-bioelectrica/nodo-de-lesion/:slug`

La portada utiliza el componente en modo `index`. La plantilla CMS utiliza el modo `section` y recibe el número de hoja desde el campo CMS.

No crear 23 composiciones independientes. Un componente compartido debe renderizar la sección correcta según el número asociado al registro CMS. Así, los ajustes de tipografía, marca, navegación y accesibilidad se propagan a todo el manual.

## 4. CMS «Manual · Nodo de lesión»

Colección observada: `LywxZxN0C`.

Campos de referencia:

| Campo | ID observado | Uso |
|---|---|---|
| Título | `B8TAruCSg` | Nombre de la sección |
| Número | `rDcqF8Dud` | Selecciona el contenido del componente |
| Sección | `e0kdHnnaA` | Agrupación editorial |
| Tipo de hoja | `NFaoh3kZW` | Clasificación |
| Descripción | `bb3T2y4Nj` | Metadatos o resumen CMS |

La plantilla CMS debe enlazar el campo **Número** con la propiedad activa que decide la hoja. No debe quedar conectado a un control heredado.

Problema ya observado: el campo dinámico quedó vinculado a `pageNumber`/«Hoja heredada» mientras el componente daba prioridad a otro control fijo. El resultado era que todos los slugs mostraban la misma sección. Después de cualquier cambio en property controls, serializar la instancia CMS y comprobar la vinculación real.

## 5. Slugs vigentes

```text
03-indice
04-indice-continuacion
05-como-usar
06-anamnesis
07-exploracion
08-preparacion-paciente
09-medicion-simetria
10-algoritmo-inicial
11-algoritmo-cierre
12-acidosis-temporal
13-acidosis-temporal-continuacion
14-acidosis-latente
15-dipolo-local
16-dipolo-local-continuacion
17-punto-distante
18-punto-distante-nodos
19-rejilla-gradiente
20-cierre-integracion
21-mapa-zonas
22-hallazgos-plan
23-terminos-tecnica
24-fundamento-cientifico
25-contraportada
```

Los enlaces del índice y del paginador deben usar rutas reales con estos slugs. No usar hashes, carruseles ni un enlace genérico a la portada.

## 6. Sistema visual

### Marca RB

- Acento principal: teal `#0F6E56`.
- Fondo: blanco.
- Texto principal: negro/gris cálido.
- El coral `#D85A30` se reserva para advertencias; no representa nodos ni polaridades.
- El logotipo de Regulación Bioeléctrica usa dos círculos del mismo teal, uno al 100 % y otro al 35 %, conectados por una línea.

### Convención técnica de imanes

Dentro de las láminas del manual se debe respetar la convención exacta del original:

- Norte `N`: gris cálido `#847F78`.
- Sur `S`: verde agua `#4E9384`.

No sustituir estos colores por ámbar, naranja o el teal general de marca.

### Tipografía y jerarquía

- Mantener la familia tipográfica del manual en el contenido.
- Títulos con peso moderado; evitar pesos `650` o `700` en titulares grandes.
- Contexto/eyebrow: verde, mayúsculas, tracking amplio y peso medio.
- Título: negro, separado del contexto y con peso aproximado `500`.
- Introducción clínica: cursiva, gris cálido y ancho de lectura limitado.
- Subtítulos técnicos: verde, mayúsculas y peso `600`.
- Numeración de pasos: verde y claramente separada del cuerpo.

### Negritas semánticas

Usar negrita media (`600`) de forma selectiva, nunca para párrafos completos. Son candidatos:

- `Indicación:`;
- `polo positivo (Sur)` y `polo negativo (Norte)`;
- `cara positiva` y `cara negativa`;
- `acortamiento funcional` e `isometría`;
- `zona confirmada`, `dipolo local` y `nodo regulador a distancia`;
- tiempos, ángulos y decisiones clínicas relevantes.

El énfasis cambia la presentación, no el texto. Dentro de una introducción en cursiva, el término destacado puede pasar a redonda para crear contraste editorial.

## 7. Ilustraciones SVG

Los SVG deben ser informativos, no decorativos. Mantener:

- línea fina y consistente;
- etiquetas Avenir o la sans del manual;
- títulos y descripciones accesibles;
- colores de polaridad exactos;
- adaptación responsiva sin pérdida de legibilidad.

Ilustraciones prioritarias:

- medición de la simetría;
- acidosis temporal;
- acidosis latente;
- dipolo local;
- punto distante;
- rejilla de gradiente;
- mapa corporal de zonas.

Cuando una lámina incluya rótulos como «Procedimiento», «Dipolo distante» o «Zona renal», conservarlos como elementos de la figura o encabezados separados. Nunca concatenarlos dentro del párrafo introductorio.

## 8. Navegación y footer

La experiencia utiliza un marco discreto alrededor del contenido:

- cabecera del manual con logo RB y acceso al índice;
- contenido de una sola sección;
- navegación anterior/siguiente con títulos descriptivos;
- estado de progreso;
- footer editorial con el logotipo RB completo y firma institucional.

Evitar dos divisores horizontales consecutivos. Debe existir una sola separación clara antes del paginador, seguida de suficiente espacio antes del footer.

En móvil:

- no escalar una hoja completa hasta volverla ilegible;
- permitir reflujo en una columna;
- mantener áreas táctiles de al menos 44 px;
- evitar navegación fija que cubra contenido;
- revisar tablas y SVG de forma individual.

## 9. Flujo operativo con el agente de Framer

### Preparación

```bash
node --version
npx @framer/agent@latest setup
npx @framer/agent@latest session new "zzgwwJi3CXZa14noLOao"
```

Requisitos:

- Node.js 24 o superior;
- reutilizar la misma sesión durante la conversación;
- leer el `index.md` y el inventario generado del proyecto;
- verificar el árbol vivo antes de confiar en IDs históricos.

### Antes de editar

1. Identificar la ruta, breakpoint e instancia exactos.
2. Serializar la instancia afectada.
3. Leer el componente actual y localizar la regla compartida.
4. Comparar el contenido con el manual original.
5. Confirmar que la modificación no elimina información.

### Después de editar

1. Ejecutar `typecheck` y `lint` del code file.
2. Comprobar que existen las 23 rutas/casos.
3. Verificar vínculos CMS en la instancia, no solo en el código.
4. Revisar escritorio, tablet y móvil.
5. Probar índice, anterior, siguiente, portada y enlaces directos.
6. Crear una vista previa privada.
7. Publicar a producción solo con autorización explícita.

## 10. Preview y publicación

Una URL de preview es temporal y no debe almacenarse como referencia permanente. La guía debe conservar únicamente la ruta estable del sitio.

Reglas:

- `preview`: permitido para revisión sin afectar producción;
- publicación a producción: requiere confirmación explícita del usuario;
- después de publicar, probar al menos una ruta intermedia, la primera y la última;
- confirmar que un enlace directo conserva la sección solicitada y no vuelve al índice.

## 11. Lista de comprobación por página

Para cada una de las 23 rutas:

- [ ] El slug abre la sección correcta.
- [ ] El contexto y el título corresponden al manual.
- [ ] Todo el contenido sustantivo está presente.
- [ ] No hay rótulos de lámina mezclados con la prosa.
- [ ] Los pasos mantienen orden, numeración y criterios.
- [ ] Las polaridades, tiempos y medidas coinciden con el original.
- [ ] Las negritas son semánticas y no excesivas.
- [ ] El SVG usa la convención `N/S` correcta.
- [ ] Anterior, siguiente e índice llevan a rutas reales.
- [ ] El footer tiene separación suficiente.
- [ ] No hay desbordamiento horizontal en móvil.
- [ ] El foco y los enlaces son utilizables con teclado.

## 12. Datos que no deben versionarse

No guardar:

- tokens o credenciales;
- códigos temporales de autenticación;
- cookies o datos de sesión;
- URLs efímeras de preview;
- secretos de GitHub o Framer.

Los IDs de proyecto, colección, páginas y componentes no son secretos, pero pueden cambiar. Documentarlos como valores observados y validarlos antes de usarlos.
