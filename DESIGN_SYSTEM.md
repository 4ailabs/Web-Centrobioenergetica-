# Sistema de diseño — Instituto Centrobioenergética

Referencia extraída del código real (`tailwind.config.js`, `index.css`, `public/styles/fonts.css`, `/components`). Estilo general: minimalismo cálido tipo Perplexity. Modo oscuro soportado vía clase `.dark` en `<html>`/root div.

## Color

Definido en `tailwind.config.js` → `theme.extend.colors`.

### `primary` (terracota — color de marca)

| Shade | Hex |
|---|---|
| 50 | `#faf3f0` |
| 100 | `#f0ddd6` |
| 200 | `#e3c0b0` |
| 300 | `#d49d84` |
| 400 | `#c47d62` |
| 500 / 600 | `#B5604A` |
| 700 | `#9a4f3c` |
| 800 | `#7a3f30` |
| 900 | `#5e3025` |

`primary-500` y `primary-600` son idénticos (`#B5604A`) — usar `primary-600` por convención en el código existente.

### `salvia` (acento secundario, verde vegetal)

| Shade | Hex |
|---|---|
| 50 | `#f4f7f1` |
| 100 | `#e4eade` |
| 200 | `#c8d5bc` |
| 300 | `#a8c0a0` |
| 400 | `#8FA87A` |
| 500 | `#7a9466` |
| 600 | `#657a55` |
| 700 | `#506244` |

### `neutral` (base — cálido, NUNCA gris puro tipo zinc/slate)

| Shade | Hex | Uso típico |
|---|---|---|
| 50 | `#F9F8F6` | fondo principal (light) |
| 100 | `#F2F0EC` | fondo secundario |
| 200 | `#e8e6e1` | bordes |
| 300 | `#d4d2cd` | bordes medios |
| 400 | `#a8a69f` | — |
| 500 | `#8c8a84` | texto muted |
| 600 | `#6b6963` | texto secundario |
| 700 | `#504e49` | — |
| 800 | `#3d3b37` | texto principal (light) |
| 900 | `#2a2825` | — |

### Modo oscuro — variables CSS (`index.css`, selector `.dark`)

| Variable | Valor |
|---|---|
| `--bg-main` | `#100E12` |
| `--bg-secondary` | `#1A181C` |
| `--bg-elevated` | `#222026` |
| `--text-primary` | `#DEDBD6` |
| `--text-secondary` | `#9E9B95` |
| `--text-muted` | `#6B6862` |
| `--border-light` | `rgba(222,219,214,0.08)` |
| `--border-medium` | `rgba(222,219,214,0.12)` |

### Modo claro — variables CSS (`index.css`, `:root`)

| Variable | Valor |
|---|---|
| `--primary` / `--primary-light` / `--primary-dark` | `#B5604A` / `#C47D62` / `#9a4f3c` |
| `--bg-main` / `--bg-secondary` / `--bg-elevated` | `#F9F8F6` / `#f5f5f2` / `#ffffff` |
| `--text-primary` / `--text-secondary` / `--text-muted` | `#3D3B37` / `#6B6963` / `#8C8A84` |
| `--border-light` / `--border-medium` | `#e8e6e1` / `#d4d2cd` |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.03)` |
| `--shadow-md` | `0 2px 4px rgba(0,0,0,0.04)` |
| `--shadow-lg` | `0 4px 12px rgba(0,0,0,0.06)` |

Regla: sombras siempre `rgba(0,0,0,…)` en negro puro, nunca con el color de marca — mantiene el look "sin ruido" tipo Perplexity.

**Nota de nomenclatura:** el token Tailwind se llama `primary` pero el valor es terracota (`#B5604A`). No confundir con una iteración anterior del proyecto ("Organic Science") que usaba verde bosque `#2d6a4f` — esa paleta ya no existe en el código.

## Tipografía

Tres familias activas, cada una con rol distinto. Importadas en `index.css` línea 1 vía `@import url(fonts.googleapis.com/css2?family=...)`.

| Familia | Import | Clase / mecanismo | Uso | Pesos activos |
|---|---|---|---|---|
| **Outfit** | sí | `font-sans`, `font-display` (Tailwind) — es la fuente por defecto de `body` y de la mayoría de `h1-h6` | UI, botones, nav, inputs, casi todos los encabezados | 300–700 |
| **Cormorant Garamond** | sí | `style={{fontFamily: "'Cormorant Garamond', Georgia, serif"}}` inline, NO mapeada en Tailwind | Títulos editoriales de autoridad — `Dashboard.tsx`, `Resonantia.tsx`, `ActosQueMueven.tsx` | 300–600, itálica 300/400 |
| **Newsreader** | sí | clase Tailwind `font-editorial` (`fontFamily.editorial` en config) | Acentos itálicos / subtítulos con carácter humano — `ProgramPage.tsx`, `TestHormonal.tsx`, `TestVinculoAnimal.tsx` | 300–600, itálica 400 |

### Fuente muerta (no usar como referencia)

`public/styles/fonts.css` define `--font-display: 'Fraunces', Georgia, serif`, pero Fraunces **nunca se importa** — no hay ningún `@import` que la cargue. La variable cae en silencio a Georgia y no se usa en ningún componente actual. Ignorar esta referencia al replicar el sistema.

### Jerarquía y pesos (`index.css`, regla global `h1-h6`)

```css
h1, h2, h3, h4, h5, h6 { @apply font-sans tracking-tight; font-weight: 600; }
```

### Tamaños responsive (`public/styles/fonts.css`)

| Elemento | < 768px | ≥ 769px |
|---|---|---|
| h1 | 1.875rem | 2.5rem |
| h2 | 1.5rem | 2rem |
| h3 | 1.25rem | 1.5rem |
| body | 0.9375rem | 1rem |

## Forma

| Token | Valor | Uso |
|---|---|---|
| Radio botones/inputs | `rounded-lg` (8px) | `InputField`, botones |
| Radio cards/íconos | `rounded-xl` (10–12px) | `AppCard`, tarjetas de curso |
| `borderRadius.pplx` (Tailwind custom) | `0.375rem` (6px) | uso puntual |
| `rounded-full` | — | solo avatares y pills de estado, nunca cards |

Sombras: tres niveles (`--shadow-sm/md/lg`, ver tabla de color), siempre grises casi transparentes.

## Patrones de componente

### NavItem (activo/inactivo) — `components/NavItem.tsx`, `components/Sidebar.tsx`

```
base:     flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-[14px]
activo:   bg-neutral-200/70 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-50 font-medium
inactivo: text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30
```

Sin borde lateral, sin acento de color en el estado activo — solo fondo neutro translúcido + peso de fuente.

### Botón primario

```
bg-primary-600 text-white hover:bg-primary-700 rounded-full (CTAs) o rounded-lg (formularios)
```

### Card (AppCard) — `components/AppCard.tsx`

```
group flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-neutral-800
ícono: w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-xl text-primary-600
título: text-[15px] font-semibold, group-hover:text-primary-600
```

### InputField — `components/ui/InputField.tsx`

```
label: text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2
input: w-full pl-12 pr-12 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
       rounded-lg focus:ring-2 focus:ring-primary-600/20 focus:ring-offset-2
```

### PageHeader / SectionHeader — `components/ui/PageHeader.tsx`, `SectionHeader.tsx`

```
tag:   text-primary-600 font-medium text-xs
title: text-xl lg:text-2xl (page) / text-lg lg:text-xl (section) font-semibold tracking-tight
desc:  text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal
```

Nota: estos títulos usan `font-semibold` sans (Outfit) directamente, **no** las fuentes serif editoriales — la serif se reserva para momentos específicos (ver tabla de tipografía).

## Reglas de replicación (resumen para generar código nuevo)

1. Color primario de acción = terracota `#B5604A` (`primary-600`), nunca verde.
2. Neutros siempre con sesgo cálido (`#F9F8F6`…`#2a2825`), nunca zinc/slate/gray puro de Tailwind.
3. Sans-serif (Outfit) por defecto en todo; serif (Cormorant Garamond o Newsreader) solo en momentos editoriales puntuales, nunca en UI de formularios/botones/nav.
4. Radio 8px en controles, 10–12px en cards; sombras siempre grises, nunca de color.
5. Dark mode vía clase `.dark`, tokens CSS custom properties en `:root`/`.dark`, no valores hardcodeados por componente.
