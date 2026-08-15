# Piloto inglés — portada y primer principio

## Estado

`Draft · Configurado parcialmente en Framer · No publicable`

Este piloto permite revisar terminología, naturalidad y alcance antes de activar la localización inglesa. La configuración y las traducciones se mantienen en la rama `rb-public-foundation`; no autorizan publicación.

## Estado técnico comprobado

Comprobación y ajuste del 13 de agosto de 2026:

- el idioma fuente se corrigió a español de México (`es-MX`);
- se creó el locale `English` con slug `en` y fallback en español;
- `Auto Translate` permanece desactivado;
- Framer muestra `Locale limit exceeded (1/0)` y ofrece comprar el complemento de localización;
- no se compró el complemento y no se publicó ningún cambio;
- Framer registra aproximadamente `2%` de avance por las cadenas cargadas manualmente.

Para poder activar la versión inglesa será necesario:

1. decidir si se contrata el complemento de localización de Framer;
2. completar y revisar la página pilar, no solo sus cadenas piloto;
3. mantener fuera de publicación los grupos que todavía no estén revisados;
4. habilitar únicamente el contenido que alcance estado `Approved`.

No se utilizará el fallback al español como sustituto de una traducción terminada, porque produciría páginas inglesas con contenido mezclado.

## Alcance de la prueba

- Navegación principal.
- Apertura de la página pilar.
- Metadatos provisionales.
- Ficha `Potencial de membrana`.
- Aviso educativo general.

## Cargado actualmente en Framer

- Metadatos ingleses de la página pilar.
- H1 `Bioelectric Regulation`.
- Introducción y texto de apoyo del hero.
- Título `Membrane potential`.
- Definición breve y desarrollo del primer principio.

Las demás cadenas de navegación, secciones, botones, rutas y avisos siguen pendientes. El locale no debe publicarse mientras la página pueda mezclar inglés y español.

## Portada

### Metadatos

```text
Title:
Bioelectric Regulation | Principles, Research and Education

Description:
Explore the principles, scientific foundations and educational pathway of Bioelectric Regulation through reviewed articles and accessible resources.
```

### Navegación

| Español | Inglés piloto |
|---|---|
| Método | Method |
| Principios | Principles |
| Biblioteca | Library |
| Formación | Education |

### Hero

| Función | Español vigente | Inglés piloto |
|---|---|---|
| Etiqueta | Campo emergente · Método · Formación | Emerging field · Method · Education |
| H1 | Regulación Bioeléctrica | Bioelectric Regulation |
| Introducción | Un marco para comprender el estado bioeléctrico de los tejidos y organizar su estudio mediante principios, instrumentos y formación. | A framework for understanding the bioelectric state of tissues and organising its study through principles, instruments and education. |
| Apoyo | Explora conceptos fundamentales, fuentes, publicaciones y rutas de formación en Regulación Bioeléctrica. | Explore foundational concepts, sources, publications and learning pathways in Bioelectric Regulation. |
| CTA principal | Conocer los principios | Explore the principles |
| CTA secundario | Biblioteca RB | Bioelectric Regulation Library |

### Observación terminológica

La estructura del método utiliza `Professional` o `trained practitioner` cuando se refiere a la persona formada. `Biological agency` queda reservado para el marco TAME. No se traducirá `Agente` como `Agent` cuando el sujeto sea el profesional.

## Principio piloto

### Registro

```text
English status: Draft
Terminology status: Reviewed against project glossary
Scientific review: Pending
Layout review: Pending
Source: Módulo 1 · El cuerpo eléctrico · Lección 1.4
```

### Traducción propuesta

```text
Title:
Membrane potential

Definition:
The voltage difference across a cell membrane, produced by ionic gradients and the activity of ion channels and transporters.

Body:
All cells maintain a membrane potential. Bioelectric Regulation treats it as a central variable because it contributes to ion transport, cell communication and tissue organisation.

Source shown publicly:
Module 1 · The bioelectric body · Lesson 1.4: Vmem and the hierarchy.

Author:
Dr. Miguel Ojeda Rios

Editorial status:
Draft

Review:
Scientific review pending
```

### Aviso educativo

```text
Educational information. Not a substitute for medical advice, diagnosis or treatment.
```

## Controles de calidad

- Comparar cada frase con el español vigente y la lección didáctica.
- Verificar el glosario de `10-GLOSARIO-BILINGUE.md`.
- Confirmar que la traducción no amplifique una afirmación clínica.
- Revisar naturalidad con un editor de inglés profesional.
- Revisar terminología científica y alcance con el responsable académico.
- Comprobar títulos, saltos de línea y tarjetas en escritorio, tablet y móvil.
- Mantener el grupo inglés excluido mientras falte cualquiera de estas revisiones.

## Criterio para completar y publicar

El piloto ya está cargado parcialmente. Solo puede completarse y publicarse cuando:

1. exista una decisión explícita sobre el complemento de localización;
2. el copy español correspondiente quede estable;
3. terminología y revisión científica estén aprobadas;
4. la página inglesa esté completa en los tres breakpoints;
5. exista autorización explícita para publicar.
