import type { Course } from '../types';
import type { TonoBadge } from '../components/ui/Badge';

// Fuente única del catálogo visible y del estado de cada curso.
// Antes estos ids vivían duplicados (y desincronizados) en Dashboard y AllCourses.
export type CourseEstado = 'nuevo' | 'en-curso' | 'proximamente' | 'grabacion';

export const ACTIVE_COURSE_IDS = [110, 106, 109, 104, 107, 108, 102, 101, 103, 105];

// Llave del tablero 3D, no un curso. Se administra con la misma maquinaria de
// inscripción, pero separada del 110: el tablero y los videos del taller se
// conceden por su cuenta cada uno.
export const ID_TABLERO = 111;

// Lo que el administrador puede conceder no coincide con lo que el alumno ve en
// el catálogo. Si el tablero entrara en ACTIVE_COURSE_IDS aparecería listado
// como un curso más a la venta.
export const ACCESOS_ASIGNABLES_IDS = [...ACTIVE_COURSE_IDS, ID_TABLERO];

export const URL_TABLERO = 'https://caminos.institutocentrobioenergetica.com';

// La misma regla que aplica api/acceso-tablero.ts en el servidor. Se repite
// aquí solo para decidir si se enseña el enlace: quien no lo tenga no ve una
// puerta que le daría en las narices. Si las dos reglas se separan, lo peor que
// pasa es un enlace de más o de menos — la que manda es la del servidor.
export function tieneAccesoAlTablero(esAdmin: boolean, cursos: string[] | undefined): boolean {
  return esAdmin || Boolean(cursos?.includes(String(ID_TABLERO)));
}

export const COURSE_META: Record<number, { estado: CourseEstado; landingPath?: string }> = {
  110: { estado: 'proximamente', landingPath: '/cuatro-caminos' },
  106: { estado: 'en-curso', landingPath: '/regulacion-bioelectrica' },
  109: { estado: 'grabacion', landingPath: '/crania' },
  104: { estado: 'grabacion', landingPath: '/reset-hormonal' },
  107: { estado: 'grabacion', landingPath: '/resonantia' },
  108: { estado: 'grabacion', landingPath: '/taller-mascotas' },
  105: { estado: 'grabacion', landingPath: '/actos-que-mueven' },
  102: { estado: 'grabacion' },
  101: { estado: 'grabacion' },
  103: { estado: 'grabacion' },
};

export const ESTADO_LABEL: Record<CourseEstado, string> = {
  'nuevo': 'Nuevo',
  'en-curso': 'En curso',
  'proximamente': 'Próximamente',
  'grabacion': 'Grabación disponible',
};

// El estado de un curso se pinta con <Badge>. Aquí solo se dice qué tono le
// toca a cada uno; el aspecto del tono vive en components/ui/Badge.tsx, que es
// el único sitio donde hay que tocarlo si cambia.
export const ESTADO_TONO: Record<CourseEstado, TonoBadge> = {
  'nuevo': 'marca',
  'en-curso': 'activo',
  'proximamente': 'proximo',
  'grabacion': 'neutro',
};

// Un visitante explora la landing pública del curso; un alumno inscrito va
// directo a su contenido. La decisión se toma en el componente con useAuth.
export function courseHref(course: Course, isEnrolled: boolean): string {
  const meta = COURSE_META[course.id];
  // Un curso que aún no se imparte no tiene nada que reproducir: aunque quien
  // pulse sea admin o esté inscrito, la landing es la única página con
  // contenido. Sin esto, /course/:id se abre vacío.
  const tieneVideos = (course.modules ?? []).some((m) => (m.videos?.length ?? 0) > 0);
  if (!tieneVideos && meta?.landingPath) return meta.landingPath;
  if (isEnrolled || !meta?.landingPath) return `/course/${course.id}`;
  return meta.landingPath;
}
