# Plan DSL — reconstrucción de /descubrir en Framer (capas nativas)

- **Fecha:** 24 de julio de 2026
- **Contexto:** ver [FRAMER_DESCUBRIR.md](./FRAMER_DESCUBRIR.md) para la arquitectura, hallazgos e IDs de referencia.
- **Objetivo:** reemplazar la plantilla repetida `hOGE7fwnZ` (code component `DescubrirCard`, que no muestra datos CMS en el lienzo) por **capas nativas con bindings**, fieles al diseño de `pages/Descubrir.tsx` (Vercel), más un componente de código mínimo solo para el reproductor de audio.

Este documento es el plano completo devuelto por el agente de investigación DSL. Se ejecuta por bloques con `apply-changes -s <session> -p /descubrir -e "<DSL>"`, verificando con capturas tras cada bloque relevante. Placeholders a resolver antes de ejecutar: `«CAT_1..N»` (categorías reales de la colección), `«AUDIO_ID»` (id del componente tras `createCodeFile`), y los `left` de las réplicas de breakpoint (según `$rect` real del Desktop).

## Estado de ejecución (actualizar aquí cada sesión)

- [x] Bloque 0.1 — font-search Newsreader/Inter: **hecho**. Newsreader existe nativo (pesos 200-800, variable, ejes wght/opsz). Inter exacto no confirmado — la búsqueda devolvió "Inter Display" como *closest match*; re-verificar `font-search` con `"Inter"` a secas o usar "Inter Display"/system sans si Inter no aparece exacto.
- [ ] Bloque 0.2 — lookup de iconos Lucide exactos ("Headphones", "Arrow Right") — **pendiente, NO asumir nombres**.
- [ ] Bloque 0.3 — `readComponentControls` de `codeFile/qfwo9rf:default` (decidir si se reutiliza como reproductor o se crea uno nuevo).
- [ ] Bloque 0.4 — `getCMSItems` de "Descubrir" → valores reales de `categoria` (sustituir `«CAT_1..N»` en Bloque 5). Categorías conocidas por los items ya cargados: "Regulación Bioeléctrica", "Sonido terapéutico", "Rituales terapéuticos" (puede haber más si se agregan artículos genéricos).
- [ ] Bloque 0.5 — solicitar guía "Computed Values" antes de aplicar transforms.
- [ ] Bloque 0.6 — leer `$rect` del breakpoint Desktop (`pPitL4PjX`) para calcular `left` seguros de Tablet/Phone.
- [ ] Bloques 1-13 — no ejecutados aún.

**Retomar exactamente aquí**: Bloque 0.2 (iconos) en adelante.

---

## 1. Decisión de arquitectura (resumen — detalle completo en FRAMER_DESCUBRIR.md)

- **Tarjetas: capas nativas** (`FrameNode`/`RichTextNode` con bindings `var(--variable-<id>)`), no code component. Fuente: guía CMS Collection Lists — *"all content must always be placed within the Repeated Item, so that we may assign variables"*; `critical-reminders.md`: *"Always use CMS Collections and CMS Collection Lists to display list-like data."*
- **Variante Artículo/Audio**: UNA plantilla repetida con bloques `visible` condicionados por `ComputedValue<boolean>` sobre el campo `formato` (transform `convertFromOption`), no dos listas ni un ComponentNode con variantes.
- **Único code component: el reproductor de audio** (`ControlType.File` con `allowedFileTypes:["mp3"]`, Set Variable al campo Audio, `stopPropagation`/`preventDefault` para no disparar el link de la tarjeta).
- **Chips de filtro**: patrón "Custom UI controls" de la guía — botones con variantes Default/Active, `onClick → SET_VARIABLE_VALUE`, variable de página `string` **sin `initialValue`** (opcional = "Todo" por defecto), chip "Todo" resetea con `value="null"`.
- **Destacada**: segunda Collection List con `limit=1` + filtro `destacado equals true`; el grid principal filtra `destacado equals true` + `negate` (para excluirla).
- **Detail page**: `/descubrir/:Descubrir`, rich text con presets por etiqueta (`stylePresetHeading2/3`, `stylePresetParagraph`), reproductor condicional, curso relacionado condicional (`isSet`).

## 2. Plano DSL completo y ordenado

### Bloque 0 — Preparación (lecturas, sin DSL)

1. `read-project -q '[{"type":"font-search","name":"Newsreader"},{"type":"font-search","name":"Inter"}]'` — **hecho**, ver estado arriba.
2. Lookup de iconos exactos del set Lucide (u otro set de `<available-icon-sets>`) para "Headphones" y "Arrow Right", y el nombre del control de color del icono (`$control__color` a confirmar).
3. `readComponentControls` sobre `codeFile/qfwo9rf:default`.
4. `getCMSItems` de "Descubrir" → categorías reales.
5. Solicitar guía **"Computed Values"** antes de aplicar cualquier transform.
6. `getNode` sobre `pPitL4PjX` → confirmar que no tiene `$breakpoints` réplicas aún; leer `$rect` para calcular `left` de Tablet/Phone (placeholder usado abajo: `left(desktop)+width+100`).

### Bloque 1 — Color styles (tokens)

```
+ColorStyleTokenNode color-fondo name="Editorial/Fondo";
SET color-fondo light="#FBFAF7";
+ColorStyleTokenNode color-tarjeta name="Editorial/Tarjeta";
SET color-tarjeta light="#FFFFFF";
+ColorStyleTokenNode color-borde name="Editorial/Borde";
SET color-borde light="#E6E1D8";
+ColorStyleTokenNode color-tinta name="Editorial/Tinta";
SET color-tinta light="#26221B";
+ColorStyleTokenNode color-cuerpo name="Editorial/Cuerpo";
SET color-cuerpo light="#5C564C";
+ColorStyleTokenNode color-acento name="Editorial/Acento";
SET color-acento light="#9A4F3C";
+ColorStyleTokenNode color-acento-chip name="Editorial/Acento Chip";
SET color-acento-chip light="#B5604A";
+ColorStyleTokenNode color-meta name="Editorial/Meta";
SET color-meta light="#6F6C66";
```

### Bloque 2 — Text styles, link style, image style

```
+TextStylePresetNode preset-h1 name="Titular Serif" tag="h1";
SET preset-h1 fontName="Newsreader" fontWeight="500" fontSize="40px" lineHeight="1.1em" letterSpacing="-0.01em" textColor="var(--token-color-tinta)";
+TextStylePresetNode preset-titulo-destacada name="Título Destacada" tag="h2";
SET preset-titulo-destacada fontName="Newsreader" fontWeight="500" fontSize="24px" lineHeight="1.2em" textColor="var(--token-color-tinta)";
+TextStylePresetNode preset-titulo-tarjeta name="Título Tarjeta" tag="h3";
SET preset-titulo-tarjeta fontName="Newsreader" fontWeight="500" fontSize="19px" lineHeight="1.25em" textColor="var(--token-color-tinta)";
+TextStylePresetNode preset-eyebrow name="Eyebrow" tag="p";
SET preset-eyebrow fontName="Inter" fontWeight="700" fontSize="10px" letterSpacing="0.14em" lineHeight="1.2em" textTransform="uppercase" textColor="var(--token-color-acento)";
+TextStylePresetNode preset-cuerpo name="Cuerpo" tag="p";
SET preset-cuerpo fontName="Inter" fontWeight="400" fontSize="13.5px" lineHeight="1.6em" textColor="var(--token-color-cuerpo)";
+TextStylePresetNode preset-meta name="Meta" tag="p";
SET preset-meta fontName="Inter" fontWeight="500" fontSize="10px" letterSpacing="0.02em" lineHeight="1.2em" textColor="var(--token-color-meta)";
+TextStylePresetNode preset-parrafo-articulo name="Párrafo Artículo" tag="p";
SET preset-parrafo-articulo fontName="Inter" fontWeight="400" fontSize="17px" lineHeight="1.7em" textColor="var(--token-color-cuerpo)" paragraphSpacing="18";
+TextStylePresetNode preset-h2-articulo name="Encabezado 2 Artículo" tag="h2";
SET preset-h2-articulo fontName="Newsreader" fontWeight="500" fontSize="28px" lineHeight="1.2em" textColor="var(--token-color-tinta)" paragraphSpacing="12";
+TextStylePresetNode preset-h3-articulo name="Encabezado 3 Artículo" tag="h3";
SET preset-h3-articulo fontName="Newsreader" fontWeight="500" fontSize="22px" lineHeight="1.25em" textColor="var(--token-color-tinta)" paragraphSpacing="10";
+LinkStylePresetNode preset-enlace name="Enlace Editorial";
SET preset-enlace link.textColor="var(--token-color-acento)" link.textDecoration="none" link.hover.textDecoration="underline" link.hover.textColor="var(--token-color-acento-chip)";
+ImageStylePresetNode preset-imagen name="Imagen Editorial";
SET preset-imagen radius="16px";
```

### Bloque 3 — Variable de página (filtro) y componente Chip

```
+Variable var-cat name="Categoría" type="string" scope="rfN15UvFm" queryParam="categoria";
+ComponentNode comp-chip name="Chip Filtro";
+FrameNode chip-default parent="comp-chip";
SET chip-default name="Default" htmlTag="button" cursor="pointer" layout="stack" stackDirection="horizontal" stackDistribution="center" stackAlignment="center" gap="6px" padding="8px 14px" width="auto" height="auto" fill="var(--token-color-tarjeta)" border="1px solid var(--token-color-borde)" radius="99px" overflow="clip";
+Variable chip-var-label name="Etiqueta" type="string" initialValue="Todo" scope="comp-chip";
+EventHandlerVariable chip-var-click name="Click" scope="comp-chip";
SET chip-default onTap.0.action="TRIGGER_EVENT" onTap.0.controls.id="var(--variable-chip-var-click)";
+RichTextNode chip-label parent="chip-default" name="Etiqueta";
SET chip-label text="var(--variable-chip-var-label)" width="auto" height="auto" fontName="Inter" fontWeight="500" fontSize="12px" lineHeight="1em" textColor="var(--token-color-cuerpo)" userSelect="none";
CREATE_VARIANT chip-active from="chip-default";
SET chip-active name="Active" fill="var(--token-color-acento-chip)" border="1px solid var(--token-color-acento-chip)";
SET chip-activechip-label textColor="#FFFFFF";
```

> Nota: `var-cat` sin `initialValue` = opcional = "Todo". Tras crear `comp-chip`, verificar con `readComponentControls` que el `eventKey` expuesto por "Click" es `onClick` (patrón del ejemplo oficial); si difiere, usar el eventKey reportado en el Bloque 5.

### Bloque 4 — Header editorial

Hijos actuales de `QwA5qFShp`: `[N1MppbLbr, pTuHXf_pD, SLV9v7wPY]`.

```
+RichTextNode header-eyebrow parent="QwA5qFShp" position="0";
SET header-eyebrow text="Contenido del Instituto" tag="p" textStylePreset="Eyebrow" width="1fr" height="auto";
SET N1MppbLbr textStylePreset="Titular Serif";
SET pTuHXf_pD fontName="Inter" fontWeight="400" fontSize="15px" lineHeight="1.6em" textColor="var(--token-color-cuerpo)" textWrapBalance="true" width="1fr";
SET dqDoSQx9p fill="var(--token-color-fondo)";
```

(No tocar el `text` de `N1MppbLbr`/`pTuHXf_pD`: preservar ediciones manuales previas.)

### Bloque 5 — Fila de chips con filtrado dinámico

```
+FrameNode chips-row parent="QwA5qFShp" position="3";
SET chips-row name="Filtros Categoría" layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="center" stackWrapEnabled="true" gap="8px" width="1fr" height="auto";
+ComponentInstanceNode chip-todo parent="chips-row" position="0" component="comp-chip";
SET chip-todo $control__etiqueta="Todo" width="auto" height="auto" onClick.0.action="SET_VARIABLE_VALUE" onClick.0.controls.variable="var(--variable-var-cat)" onClick.0.controls.value="null" $control__variant.from="var(--variable-var-cat)" $control__variant.transforms.0.name="isSet" $control__variant.transforms.1.name="convertFromBoolean" $control__variant.transforms.1.outputType="option" $control__variant.transforms.1.truthy="Default" $control__variant.transforms.1.falsy="Active";
+ComponentInstanceNode chip-cat-1 parent="chips-row" position="1" component="comp-chip";
SET chip-cat-1 $control__etiqueta="«CAT_1»" width="auto" height="auto" onClick.0.action="SET_VARIABLE_VALUE" onClick.0.controls.variable="var(--variable-var-cat)" onClick.0.controls.value="«CAT_1»" $control__variant.from="var(--variable-var-cat)" $control__variant.transforms.0.name="equals" $control__variant.transforms.0.value="«CAT_1»" $control__variant.transforms.1.name="convertFromBoolean" $control__variant.transforms.1.outputType="option" $control__variant.transforms.1.truthy="Active" $control__variant.transforms.1.falsy="Default";
/** Repetir chip-cat-2..N con cada valor real de `categoria` obtenido en Bloque 0.4 */
```

### Bloque 6 — Lista Destacada

```
+FrameNode lista-destacada parent="QwA5qFShp" position="4";
SET lista-destacada name="Destacado" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="0px" width="1fr" height="auto" maxWidth="100%";
+FrameNode dest-card parent="lista-destacada" position="0";
SET dest-card name="Tarjeta Destacada" layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="start" gap="0px" width="1fr" height="auto" minHeight="240px" fill="var(--token-color-tarjeta)" border="1px solid var(--token-color-borde)" radius="16px" overflow="clip" cursor="pointer";
SET lista-destacada collectionList.collection="Descubrir" collectionList.repeatedDescendantId="dest-card" collectionList.limit="1" collectionList.sorting.0.variable="fgTU6R2Hu" collectionList.sorting.0.direction="desc" collectionList.filters.0.variableId="DusHQf7Ml" collectionList.filters.0.transforms.0.name="equals" collectionList.filters.0.transforms.0.value="true" collectionList.filters.1.variableId="VEtnvWVT3" collectionList.filters.1.transforms.0.name="equals" collectionList.filters.1.transforms.0.value="var(--variable-var-cat)" collectionList.filtersOperator="and";
+FrameNode dest-media parent="dest-card" position="0";
SET dest-media name="Imagen" fill="var(--variable-XQaufAnYQ)" width="1fr" height="1fr";
+FrameNode dest-body parent="dest-card" position="1";
SET dest-body name="Texto" layout="stack" stackDirection="vertical" stackDistribution="center" stackAlignment="start" gap="10px" padding="28px 28px 28px 28px" width="1fr" height="auto";
+FrameNode dest-meta parent="dest-body" position="0";
SET dest-meta layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="1fr" height="auto";
+RichTextNode dest-cat parent="dest-meta" position="0";
SET dest-cat text="var(--variable-VEtnvWVT3)" tag="p" textStylePreset="Eyebrow" width="auto" height="auto";
+RichTextNode dest-dur parent="dest-meta" position="1";
SET dest-dur text="var(--variable-yHeN9yKyB)" tag="p" textStylePreset="Meta" width="auto" height="auto";
+RichTextNode dest-titulo parent="dest-body" position="1";
SET dest-titulo text="var(--variable-I8dyr3UPI)" tag="h2" textStylePreset="Título Destacada" width="1fr" height="auto";
+RichTextNode dest-desc parent="dest-body" position="2";
SET dest-desc text="var(--variable-oo1D67Hrv)" tag="p" textStylePreset="Cuerpo" textTruncation="3" width="1fr" height="auto";
+FrameNode dest-cta parent="dest-body" position="3";
SET dest-cta layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="center" gap="4px" width="auto" height="auto";
+RichTextNode dest-cta-label parent="dest-cta" position="0";
SET dest-cta-label text="Abrir" width="auto" height="auto" fontName="Inter" fontWeight="600" fontSize="12px" lineHeight="1em" textColor="var(--token-color-acento)";
+IconNode dest-cta-icon parent="dest-cta" position="1" set="Lucide" $control__icon="Arrow Right";
SET dest-cta-icon $control__color="var(--token-color-acento)" width="12px" height="12px" aspectRatio="1";
```

### Bloque 7 — Reconstrucción del grid: tarjeta nativa + filtros + orden + empty state

```
+FrameNode card-item parent="SLV9v7wPY" position="0";
SET card-item name="Tarjeta" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="0px" width="1fr" height="1fr" fill="var(--token-color-tarjeta)" border="1px solid var(--token-color-borde)" radius="16px" overflow="clip" cursor="pointer";
SET SLV9v7wPY collectionList.repeatedDescendantId="card-item" gridRowHeightType="auto" collectionList.sorting.0.variable="fgTU6R2Hu" collectionList.sorting.0.direction="desc" collectionList.filters.0.variableId="DusHQf7Ml" collectionList.filters.0.transforms.0.name="equals" collectionList.filters.0.transforms.0.value="true" collectionList.filters.0.transforms.1.name="negate" collectionList.filters.1.variableId="VEtnvWVT3" collectionList.filters.1.transforms.0.name="equals" collectionList.filters.1.transforms.0.value="var(--variable-var-cat)" collectionList.filtersOperator="and";
DEL hOGE7fwnZ;
+FrameNode card-media parent="card-item" position="0";
SET card-media name="Imagen" fill="var(--variable-XQaufAnYQ)" width="1fr" aspectRatio="1.6" visible.from="var(--variable-XeA5ucPyT)" visible.transforms.0.name="convertFromOption" visible.transforms.0.outputType="boolean" visible.transforms.0.cases.0.from="Audio" visible.transforms.0.cases.0.to="false" visible.transforms.0.default="true";
+FrameNode card-body parent="card-item" position="1";
SET card-body name="Contenido" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="8px" padding="18px 20px 20px 20px" width="1fr" height="1fr";
+FrameNode card-meta parent="card-body" position="0";
SET card-meta layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="1fr" height="auto";
+FrameNode card-eyebrow parent="card-meta" position="0";
SET card-eyebrow layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="center" gap="6px" width="auto" height="auto";
+IconNode card-audio-icon parent="card-eyebrow" position="0" set="Lucide" $control__icon="Headphones";
SET card-audio-icon $control__color="var(--token-color-acento)" width="12px" height="12px" aspectRatio="1" visible.from="var(--variable-XeA5ucPyT)" visible.transforms.0.name="convertFromOption" visible.transforms.0.outputType="boolean" visible.transforms.0.cases.0.from="Audio" visible.transforms.0.cases.0.to="true" visible.transforms.0.default="false";
+RichTextNode card-cat parent="card-eyebrow" position="1";
SET card-cat text="var(--variable-VEtnvWVT3)" tag="p" textStylePreset="Eyebrow" width="auto" height="auto";
+RichTextNode card-dur parent="card-meta" position="1";
SET card-dur text="var(--variable-yHeN9yKyB)" tag="p" textStylePreset="Meta" width="auto" height="auto";
+RichTextNode card-titulo parent="card-body" position="1";
SET card-titulo text="var(--variable-I8dyr3UPI)" tag="h3" textStylePreset="Título Tarjeta" width="1fr" height="auto";
+RichTextNode card-desc parent="card-body" position="2";
SET card-desc text="var(--variable-oo1D67Hrv)" tag="p" textStylePreset="Cuerpo" textTruncation="2" width="1fr" height="auto";
+FrameNode card-cta parent="card-body" position="3";
SET card-cta layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="center" gap="4px" width="auto" height="auto";
+RichTextNode card-cta-label parent="card-cta" position="0";
SET card-cta-label text="Abrir" width="auto" height="auto" fontName="Inter" fontWeight="600" fontSize="12px" lineHeight="1em" textColor="var(--token-color-acento)";
+IconNode card-cta-icon parent="card-cta" position="1" set="Lucide" $control__icon="Arrow Right";
SET card-cta-icon $control__color="var(--token-color-acento)" width="12px" height="12px" aspectRatio="1";
+FrameNode grid-empty parent="SLV9v7wPY" position="1";
SET grid-empty name="Estado Vacío" layout="stack" stackDirection="vertical" stackDistribution="center" stackAlignment="center" gap="8px" padding="32px 24px 32px 24px" width="1fr" height="auto" minHeight="140px" border="1px dashed var(--token-color-borde)" radius="16px" gridItemColumnSpan="all" visible.from="var(--variable-SLV9v7wPY-item-count)" visible.transforms.0.name="equals" visible.transforms.0.value="0";
+RichTextNode grid-empty-text parent="grid-empty" position="0";
SET grid-empty-text text="No hay contenido en esta categoría todavía." tag="p" textStylePreset="Cuerpo" textAlignment="center" width="auto" height="auto";
```

> Claves: `repeatedDescendantId` re-apuntado ANTES del `DEL` del viejo template; empty state = hijo de la lista (no del item repetido) con `visible` computado desde la variable implícita `var(--variable-<listId>-item-count) equals 0`; `gridItemColumnSpan="all"` para que abarque las 2 columnas.

### Bloque 8 — Reproductor de audio (code component)

1. `createCodeFile("AudioPlayer.tsx", …)` — control `audio` `ControlType.File` `allowedFileTypes:["mp3"]`, wrapper con `onClick={(e)=>{e.stopPropagation(); e.preventDefault();}}`, `<audio controls preload="none" style={{width:"100%"}}>`. Anotar el `componentId` devuelto → `«AUDIO_ID»`.
2. DSL:

```
+FrameNode card-audio-wrap parent="card-body" position="3";
SET card-audio-wrap name="Reproductor" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="0px" width="1fr" height="auto" visible.from="var(--variable-XeA5ucPyT)" visible.transforms.0.name="convertFromOption" visible.transforms.0.outputType="boolean" visible.transforms.0.cases.0.from="Audio" visible.transforms.0.cases.0.to="true" visible.transforms.0.default="false";
+ComponentInstanceNode card-audio-player parent="card-audio-wrap" position="0" component="«AUDIO_ID»";
SET card-audio-player $control__audio="var(--variable-tNzvMqT4H)" width="1fr" height="auto";
```

(El `card-cta` "Abrir →" queda en position 4 tras esta inserción.)

### Bloque 9 — Hover sutil

```
SET card-item hoverEffect.y="-2px" hoverEffect.shadow="0px 8px 20px 0px rgba(38, 34, 27, 0.07)";
SET dest-card hoverEffect.y="-2px" hoverEffect.shadow="0px 8px 20px 0px rgba(38, 34, 27, 0.07)";
```

### Bloque 10 — Página de detalle `/descubrir/:Descubrir`

Crear ANTES de los links (Bloque 11).

```
+WebPageNode pagina-detalle name="Descubrir – Detalle" path="/descubrir/:Descubrir";
+FrameNode det-desktop parent="pagina-detalle";
SET det-desktop name="Desktop" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="center" gap="0px" width="1200px" height="auto" fill="var(--token-color-fondo)" overflow="clip";
+FrameNode det-inner parent="det-desktop" position="0";
SET det-inner name="Contenido" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="20px" width="100%" maxWidth="720px" height="auto" padding="56px 24px 96px 24px";
+RichTextNode det-back parent="det-inner" position="0";
SET det-back text="← Volver a Descubrir" tag="p" fontName="Inter" fontWeight="500" fontSize="13px" width="1fr" height="auto" link.href="/descubrir" linkStylePreset="Enlace Editorial";
+FrameNode det-meta-top parent="det-inner" position="1";
SET det-meta-top layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="1fr" height="auto";
+RichTextNode det-cat parent="det-meta-top" position="0";
SET det-cat text="var(--variable-VEtnvWVT3)" tag="p" textStylePreset="Eyebrow" width="auto" height="auto";
+RichTextNode det-dur parent="det-meta-top" position="1";
SET det-dur text="var(--variable-yHeN9yKyB)" tag="p" textStylePreset="Meta" width="auto" height="auto";
+RichTextNode det-titulo parent="det-inner" position="2";
SET det-titulo text="var(--variable-I8dyr3UPI)" tag="h1" textStylePreset="Titular Serif" width="1fr" height="auto";
+FrameNode det-byline parent="det-inner" position="3";
SET det-byline layout="stack" stackDirection="horizontal" stackDistribution="start" stackAlignment="center" gap="10px" width="1fr" height="auto";
+RichTextNode det-autor parent="det-byline" position="0";
SET det-autor text="var(--variable-QoiPoQrQV)" tag="p" textStylePreset="Meta" width="auto" height="auto";
+RichTextNode det-fecha parent="det-byline" position="1";
SET det-fecha tag="p" textStylePreset="Meta" width="auto" height="auto" text.from="var(--variable-fgTU6R2Hu)" text.transforms.0.name="toDateString" text.transforms.0.display="date" text.transforms.0.dateStyle="medium";
+FrameNode det-hero parent="det-inner" position="4";
SET det-hero name="Imagen" fill="var(--variable-XQaufAnYQ)" width="1fr" aspectRatio="1.6" radius="16px" overflow="clip" visible.from="var(--variable-XeA5ucPyT)" visible.transforms.0.name="convertFromOption" visible.transforms.0.outputType="boolean" visible.transforms.0.cases.0.from="Audio" visible.transforms.0.cases.0.to="false" visible.transforms.0.default="true";
+FrameNode det-audio-wrap parent="det-inner" position="5";
SET det-audio-wrap name="Reproductor" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="0px" padding="16px 16px 16px 16px" width="1fr" height="auto" fill="var(--token-color-tarjeta)" border="1px solid var(--token-color-borde)" radius="16px" visible.from="var(--variable-XeA5ucPyT)" visible.transforms.0.name="convertFromOption" visible.transforms.0.outputType="boolean" visible.transforms.0.cases.0.from="Audio" visible.transforms.0.cases.0.to="true" visible.transforms.0.default="false";
+ComponentInstanceNode det-audio-player parent="det-audio-wrap" position="0" component="«AUDIO_ID»";
SET det-audio-player $control__audio="var(--variable-tNzvMqT4H)" width="1fr" height="auto";
+RichTextNode det-contenido parent="det-inner" position="6";
SET det-contenido text="var(--variable-tl63EcxHK)" width="1fr" height="auto" stylePresetHeading2="Encabezado 2 Artículo" stylePresetHeading3="Encabezado 3 Artículo" stylePresetParagraph="Párrafo Artículo" imageStylePreset="Imagen Editorial" linkStylePreset="Enlace Editorial";
+FrameNode det-curso parent="det-inner" position="7";
SET det-curso name="Curso Relacionado" layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="4px" padding="20px 20px 20px 20px" width="1fr" height="auto" fill="var(--token-color-tarjeta)" border="1px solid var(--token-color-borde)" radius="16px" cursor="pointer" link.href="var(--variable-ky8stbDJg)" visible.from="var(--variable-ky8stbDJg)" visible.transforms.0.name="isSet";
+RichTextNode det-curso-eyebrow parent="det-curso" position="0";
SET det-curso-eyebrow text="Curso relacionado" tag="p" textStylePreset="Eyebrow" width="1fr" height="auto";
+RichTextNode det-curso-titulo parent="det-curso" position="1";
SET det-curso-titulo text="var(--variable-eC4JrJVBX)" tag="h3" textStylePreset="Título Tarjeta" width="1fr" height="auto";
SET pagina-detalle metadata.title="{{Titulo}} — Instituto Centrobioenergética" metadata.description="{{Descripcion}}" draft="false";
```

**Crítico**: en `det-contenido` NO usar `textStylePreset` ni estilos inline de raíz — solo presets por etiqueta, exactamente como arriba.

### Bloque 11 — Links de tarjetas a la página de detalle

Ejecutar solo después de que exista la página del Bloque 10.

```
SET card-item link.href="/descubrir/:Descubrir" link.collectionItem="var(--variable-MpAYRR0Dm)";
SET dest-card link.href="/descubrir/:Descubrir" link.collectionItem="var(--variable-MpAYRR0Dm)";
```

### Bloque 12 — Breakpoints responsive de /descubrir (Tablet 810 / Phone 390)

```
CREATE_VARIANT bp-tablet from="pPitL4PjX";
SET bp-tablet name="Tablet" width="810px" left="1300px" top="0px";
CREATE_VARIANT bp-phone from="pPitL4PjX";
SET bp-phone name="Phone" width="390px" left="2210px" top="0px";
SET bp-tabletQwA5qFShp padding="40px 24px 80px 24px";
SET bp-phoneQwA5qFShp padding="32px 16px 64px 16px" gap="16px";
SET bp-phoneSLV9v7wPY layout="stack" stackDirection="vertical" stackDistribution="start" stackAlignment="start" gap="16px";
SET bp-phonecard-item width="1fr" height="auto";
SET bp-phonedest-card stackDirection="vertical" minHeight="0px" height="auto";
SET bp-phonedest-media width="1fr" height="auto" aspectRatio="1.6";
SET bp-phonedest-body padding="20px 20px 20px 20px";
SET preset-h1 breakpoint.medium.fontSize="34px" breakpoint.small.fontSize="28px";
```

(Los `left` de arriba son placeholder — recalcular con el `$rect` real leído en Bloque 0.6.)

### Bloque 13 — Breakpoints de la página de detalle

```
CREATE_VARIANT det-tablet from="det-desktop";
SET det-tablet name="Tablet" width="810px" left="1300px" top="0px";
CREATE_VARIANT det-phone from="det-desktop";
SET det-phone name="Phone" width="390px" left="2210px" top="0px";
SET det-phonedet-inner padding="32px 16px 64px 16px" gap="16px";
```

## 3. Gotchas (aplican a todos los bloques)

1. Cada nodo se crea con `+` y se configura en un `SET` separado; configurar el contenedor ANTES de insertar hijos.
2. **`repeatedDescendantId` antes del `DEL`**: nunca borrar `hOGE7fwnZ` antes de re-apuntar `collectionList.repeatedDescendantId` en el Bloque 7, o la lista queda inválida.
3. **Réplicas**: nunca `+`/`DEL`/`DUPE`/`MOVE`-a-otro-padre sobre descendientes de réplica; todo lo nuevo va al Primary y se sobreescribe con `SET <replicaId><originalId>`. Crear réplicas AL FINAL (Bloques 12-13), con el Primary ya completo.
4. **Width rules**: texto hijo directo de stack vertical → `width="1fr"`; labels compactos en stacks horizontales → `auto`; hijos directos del grid → `1fr`/`1fr` con `gridRowHeightType="auto"`.
5. `space-between` + `gap` no van juntos en el mismo nodo.
6. `RichTextNode` nunca lleva `padding` propio.
7. `overflow="clip"` en tarjetas con `radius` para que la imagen respete las esquinas.
8. **Iconos**: nombres EXACTOS del catálogo vía lookup — nunca asumir "Headphones"/"Arrow Right" sin confirmar (Bloque 0.2 pendiente).
9. **Fuentes**: `font-search` obligatorio antes de cualquier `fontName` nuevo (hecho para Newsreader/Inter; revisar si "Inter" exacto existe o usar "Inter Display").
10. **Links**: la página destino debe existir antes del `link.href` (por eso Bloque 10 precede al 11); todo `RichTextNode` con `link.href` exige `linkStylePreset`; páginas enlazadas deben llevar `draft="false"`.
11. **Variable opcional**: no dar `initialValue` a `var-cat` — así el chip "Todo" la resetea con `value="null"`.
12. **Empty state obligatorio al filtrar**: implementado en el grid (Bloque 7); la lista Destacada no lleva uno propio por decisión de diseño (evitar mensaje duplicado) — si se quiere estricto, replicar el patrón dentro de `lista-destacada`.
13. **Computed Values**: solicitar la guía antes de aplicar transforms (Bloque 0.5, pendiente).
14. El `path` de una página no se puede cambiar después de creada; `/descubrir/:Descubrir` debe salir correcto a la primera.
15. El reproductor de audio debe hacer `stopPropagation`/`preventDefault` en clicks o el link de la tarjeta secuestrará el play.
16. IDs existentes a usar tal cual: `rfN15UvFm`, `pPitL4PjX`, `dqDoSQx9p`, `QwA5qFShp`, `N1MppbLbr`, `pTuHXf_pD`, `SLV9v7wPY`, `hOGE7fwnZ` (este último se borra en Bloque 7).
17. **eventKey del Chip**: tras crear `comp-chip` (Bloque 3), verificar con `readComponentControls` que "Click" se expone como `onClick` antes de emitir el Bloque 5.
18. Cada `+` con `position` desplaza a los hermanos — el plano ya contabiliza los desplazamientos (p. ej. `card-cta` pasa a position 4 tras insertar el reproductor en el Bloque 8).

## 4. Flujo de verificación por bloque

Tras cada bloque con impacto visual (4, 5, 6, 7, 8, 9, 10, 12, 13):
1. `apply-changes -s <session> -p /descubrir -e "<bloque>"`.
2. Si hay errores, leerlos y corregir antes de continuar (no acumular bloques sobre un estado con errores).
3. `framer.publish()` (va a staging, `more-root-479148.framer.app`).
4. Captura con Playwright de `https://more-root-479148.framer.app/descubrir` (esperar ~6-7s tras publicar) y revisar visualmente antes de seguir.
5. Solo publicar a **producción** con aprobación explícita del usuario.
