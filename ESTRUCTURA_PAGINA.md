# Estructura de la página — Instituto Centrobioenergética

Referencia extraída del código real (`App.tsx`, `components/Sidebar.tsx`, `components/Footer.tsx`, páginas en `/pages`). Describe layout, no el sistema visual (ver `DESIGN_SYSTEM.md`).

## 1. Shell raíz (`App.tsx`)

```
<div class="{isDarkMode?'dark':''} bg-[var(--bg-main)] h-[100dvh] font-sans text-[var(--text-primary)] flex overflow-hidden">
  <div class="hidden lg:block shrink-0">        <!-- Sidebar instancia A (desktop) -->
    <Sidebar />
  </div>
  <div class="lg:hidden">                        <!-- Sidebar instancia B (mobile) -->
    <Sidebar />
  </div>
  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 overflow-y-auto overflow-x-hidden overscroll-none">
      <div class="p-2 lg:p-8">
        <div key="{activePage}" class="animate-fade-in">
          <Routes>...</Routes>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</div>
<!-- Modal de búsqueda: montado fuera del div flex raíz, condicional a isSearchOpen -->
```

Estructura: flex row → `[aside shrink-0]` + `[flex-1 flex-col → [main flex-1] + [footer shrink-0]]`.

**Clave:** el scroll vive en `<main>` (`overflow-y-auto`), no en la ventana (`html`/`body` tienen `overflow:hidden` en `index.css`). Por eso el footer queda fijo al fondo de la columna de contenido — no hay que hacer scroll hasta el final de la página para verlo.

**Detalle de implementación no obvio:** `Sidebar` se monta dos veces (instancia A envuelta en `hidden lg:block`, instancia B en `lg:hidden`), pero `Sidebar.tsx` internamente YA auto-condiciona cada pieza (header móvil, drawer, aside desktop) con sus propias clases `lg:hidden` / `hidden lg:flex`. Resultado funcional correcto, pero header/drawer/aside existen duplicados en el DOM — solo se ve una copia de cada uno por breakpoint. Al replicar, un solo `<Sidebar>` con condicionales internos basta; no hace falta el doble montaje.

## 2. Breakpoint único: `lg` (1024px)

No hay tratamiento intermedio de tablet. Todo el shell cambia de comportamiento en un solo punto:

| < 1024px | ≥ 1024px |
|---|---|
| Header fijo superior (`fixed top-0`, 100% width, `z-50`) | Sin header — aside visible directamente |
| Drawer lateral (`fixed`, `w-72`, `translate-x` para abrir/cerrar, `z-50`) | Aside fijo en flujo normal, `w-[220px]` expandido / `w-[60px]` colapsado |
| Overlay oscuro al abrir drawer (`bg-black/40`, `z-40`) | No aplica |
| Página compensa el header fijo con `pt-[72px]` | `lg:pt-0` — no hace falta compensar nada |

### Capas z-index activas con el drawer móvil abierto

1. Shell base (sidebar + main + footer) — sin z-index explícito
2. `z-40` — overlay oscuro, cierra el drawer al tocar
3. `z-50` — header + drawer móvil (dentro de `Sidebar.tsx`)
4. Modal de búsqueda — montado fuera del contenedor flex principal, por lo tanto por encima de todo lo anterior en el orden del DOM

### Sidebar de escritorio — mecánica de colapso

```
aside: hidden lg:flex h-screen ... transition-all duration-200 ease-[cubic-bezier(.33,1,.68,1)]
       colapsado: w-[60px] px-2   |   expandido: w-[220px] px-3
```

Estado en `contexts/AppContext.tsx` → `isSidebarCollapsed`. Toggle con ícono `PanelLeftClose`/`PanelLeftOpen` (lucide-react).

## 3. Anatomía de `<main>` (de afuera hacia adentro)

| Nivel | Nodo | Clases | Rol |
|---|---|---|---|
| 1 | `<main>` | `flex-1 overflow-y-auto overflow-x-hidden overscroll-none` | única región con scroll propio del shell; `overscroll-none` evita rebote del navegador |
| 2 | `<div>` | `p-2 lg:p-8` | padding del lienzo — casi nulo en móvil, generoso en desktop |
| 3 | `<div key={activePage}>` | `animate-fade-in` | la `key` cambia con la ruta → remount de React → dispara el fade-in en cada navegación; única transición de página, sin animación de salida |
| 4 | `<Routes>` → página activa | — | 18 rutas declaradas inline en `App.tsx`, sin lazy-loading ni layout compartido adicional |

`animate-fade-in` → keyframe `fadeIn` en `tailwind.config.js`, `0.4s ease-out forwards`, de `opacity:0` a `opacity:1`.

## 4. Patrón repetido dentro de cada ruta

Ninguna página delega su espaciado a `<main>`; cada una abre con el mismo envoltorio y compensa a mano el padding casi nulo de `main` en móvil.

```
<div class="w-full pt-[72px] lg:pt-0 pb-16">      <!-- wrapper de página -->
  <div class="px-6 lg:px-0 pt-8 lg:pt-10 pb-8|10"> <!-- hero/header -->
    ...título, descripción, fila de botones/pills...
  </div>
  <div class="px-6 lg:px-0 pb-8">                  <!-- tarjeta destacada -->
    <div class="flex flex-col sm:flex-row rounded-xl overflow-hidden border">
      <div class="sm:w-1/2 aspect-[16/9] sm:aspect-auto">img</div>
      <div class="sm:w-1/2 p-5|6">texto</div>
    </div>
  </div>
  <div class="px-6 lg:px-0">                       <!-- grilla del resto -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      ...cards...
    </div>
  </div>
</div>
```

| Clase | Por qué |
|---|---|
| `pt-[72px] lg:pt-0` | compensa el header fijo móvil (`fixed`, no ocupa espacio en el flujo) |
| `pb-16` | espacio final antes del footer |
| `px-6 lg:px-0` | padding horizontal manual en móvil porque `main` casi no aporta ninguno (`p-2`); en desktop el `p-8` de `main` ya alcanza |
| `grid-cols-1 sm:grid-cols-2` | pasa a 2 columnas desde `sm`, no espera a `lg` |

Confirmado en `Dashboard.tsx` y `AllCourses.tsx` — el patrón (hero → tarjeta destacada horizontal → grilla 2 columnas) se repite casi textual entre ambos archivos **por copia**, no por un componente compartido. Al replicar, considerar extraerlo a un componente `PageLayout`/`ContentGrid` en vez de duplicar.

## 5. Referencia de archivos

| Pieza | Archivo |
|---|---|
| Shell + definición de rutas | `App.tsx` |
| Sidebar (mobile header + drawer + desktop aside) | `components/Sidebar.tsx` |
| Footer (layout distinto mobile/desktop) | `components/Footer.tsx` |
| Estado global (sidebar, dark mode, página activa) | `contexts/AppContext.tsx` |
| Keyframe de animación de entrada | `tailwind.config.js` → `theme.extend.animation/keyframes` |
