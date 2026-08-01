/**
 * Fuente única de los metadatos de cada ruta.
 *
 * La consumen dos lados, y por razones distintas:
 *
 * 1. `usePageMeta`, en el navegador — actualiza el título de la pestaña y la
 *    descripción al navegar dentro de la app.
 *
 * 2. `scripts/prerender-meta.ts`, durante el build — escribe un HTML por ruta
 *    con estas etiquetas ya puestas. Esto es lo que arregla la vista previa al
 *    compartir un enlace: los robots de WhatsApp, Facebook y LinkedIn NO
 *    ejecutan JavaScript, así que solo leen lo que viene en el HTML servido.
 *    Poner las og: desde el cliente no sirve para nada en esos casos.
 *
 * Nota sobre `noindex`: index.html marca el sitio como no indexable a
 * propósito, porque la cara pública es el sitio de Framer y esta app va
 * embebida. Eso NO afecta a las og:, que se leen igual.
 */

/** Dominio donde vive esta app. No es el dominio público (ese es Framer). */
export const SITE_URL = 'https://institutocentrobioenergetica.vercel.app';
export const SITE_NAME = 'Instituto Centrobioenergética';
export const DEFAULT_IMAGE = '/images/imagenes_instituto/clases.webp';

export interface PageMeta {
  /** Título de la pestaña y de la vista previa. Sin el nombre del instituto:
   *  se añade solo, salvo en la portada. */
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz. Evitar SVG: los robots no lo previsualizan. */
  image?: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Instituto Centrobioenergética',
    description:
      'Escuela de práctica en salud complementaria y bienestar integral. Formación aplicable desde el primer día con el Dr. Miguel Ojeda Rios, presencial en México y online.',
    image: '/images/imagenes_instituto/clases.webp',
  },

  // ── Cursos con landing propia ──
  '/cuatro-caminos': {
    title: 'Los Cuatro Caminos — Formación en terapia con muñecos',
    description:
      'Lectura proyectiva de trayectoria vital. Dos sábados, 5 y 19 de septiembre de 2026, para terapeutas con consulta activa. Presencial en el Instituto y por Zoom.',
    image: '/images/courses/cuatro-caminos/cuatro-caminos-cover.jpg',
  },
  '/regulacion-bioelectrica': {
    title: 'El Cuerpo Eléctrico — Formación en Regulación Bioeléctrica',
    description:
      'Tu cuerpo es un mapa eléctrico. Aprende a leerlo. Formación profesional en evaluación y regulación del estado bioeléctrico con campos magnéticos estáticos.',
    image: '/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp',
  },
  '/rb': {
    title: 'El método de la Regulación Bioeléctrica',
    description:
      'En qué se apoya la regulación bioeléctrica, qué mide y cómo se aplica en consulta. El método detrás de El Cuerpo Eléctrico.',
    image: '/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp',
  },
  '/crania': {
    title: 'CRANIA — Práctica Craneofascial',
    description:
      'Devuelve el flujo. Práctica craneofascial autoaplicada para liberar fascia profunda de rostro, cuello, mandíbula y cráneo, con respiración integrada.',
    image: '/images/courses/crania/crania_16_9_webinar.webp',
  },
  '/resonantia': {
    title: 'Resonantia — Diapasones Terapéuticos',
    description:
      'Lo que sigue vibrando cuando el sonido se apaga. Aprende a usar la vibración del diapasón 128 Hz como intervención sobre el sistema nervioso.',
    image: '/images/courses/resonantia/Resonantia.webp',
  },
  '/reset-hormonal': {
    title: 'El Reset Hormonal',
    description:
      'Método de equilibrio para el climaterio y la postmenopausia. Cartografía Hormonal, fitoterapia específica y protocolos probados.',
    image: '/images/courses/reset-hormonal/reset_hormonal.webp',
  },
  '/actos-que-mueven': {
    title: 'Actos que Mueven — Rituales Somato-Simbólicos',
    description:
      'El cuerpo no cambia con lo que entiendes: cambia con lo que haces. Dos módulos para diseñar y ejecutar actos rituales con la Secuencia TAME.',
    image: '/images/courses/actos-que-mueven/ritual_2.webp',
  },
  '/taller-mascotas': {
    title: 'Lo Que Tu Mascota Quiere Decirte',
    description:
      'Tu mascota es tu espejo. Aprende a leer las señales y a sanar el vínculo con tu animal con Flores de Bach, Pares Biomagnéticos y lectura del campo mórfico.',
    image: '/images/courses/taller-mascotas/mascota.webp',
  },
  '/bioenergetica-transgeneracional': {
    title: 'Bioenergética Transgeneracional',
    description:
      'Construye el mapa de tu árbol familiar y aprende a leer en él lo que no es tuyo. Cuatro sesiones, beca por invitación con cupo limitado.',
  },

  // ── Secciones ──
  '/cursos': {
    title: 'Cursos',
    description:
      'Formación especializada en bioenergética, nutrición y terapias integrativas. Cursos presenciales, en línea y grabaciones disponibles a tu ritmo.',
  },
  '/descubrir': {
    title: 'Descubrir',
    description:
      'Artículos y audios sobre los temas que trabajamos en los cursos: el cuerpo eléctrico, la vibración, el ritual y la lectura del patrón.',
  },
  '/servicios': {
    title: 'Servicios clínicos',
    description:
      'Consulta y terapias del Instituto Centrobioenergética: biomagnetismo, auriculoterapia, remedios florales, sandplay y terapia con muñecos.',
  },
  '/sobre-nosotros': {
    title: 'Sobre el instituto',
    description:
      'Quiénes somos, cómo enseñamos y qué distingue la formación del Instituto Centrobioenergética, dirigido por el Dr. Miguel Ojeda Rios.',
  },
  '/calendario': {
    title: 'Calendario',
    description: 'Próximas clases, módulos y talleres del Instituto Centrobioenergética.',
  },
  '/aplicaciones': {
    title: 'Aplicaciones',
    description: 'Herramientas y aplicaciones clínicas del Instituto Centrobioenergética.',
  },

  // ── Tests ──
  '/test-hormonal': {
    title: 'Test hormonal',
    description:
      'Responde unas preguntas y ubica tu perfil dentro de la Cartografía Hormonal del Reset Hormonal.',
    image: '/images/courses/reset-hormonal/reset_hormonal.webp',
  },
  '/test-vinculo-animal': {
    title: 'Test del vínculo con tu animal',
    description:
      'Descubre qué refleja tu mascota de ti y por dónde empezar a trabajar el vínculo.',
    image: '/images/courses/taller-mascotas/mascota.webp',
  },
};

/** Título completo tal como se muestra en la pestaña y en la vista previa. */
export function fullTitle(meta: PageMeta): string {
  return meta.title === SITE_NAME ? meta.title : `${meta.title} · ${SITE_NAME}`;
}

/** Metadatos de una ruta, con la portada como respaldo. */
export function metaForPath(pathname: string): PageMeta {
  // Se normaliza la barra final para que /cursos y /cursos/ den lo mismo.
  const limpio = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PAGE_META[limpio] ?? PAGE_META['/'];
}
