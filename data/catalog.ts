import type { Course } from '../types';
import type { TonoBadge } from '../components/ui/Badge';

// Fuente única del catálogo visible y del estado de cada curso.
// Antes estos ids vivían duplicados (y desincronizados) en Dashboard y AllCourses.
export type CourseEstado = 'nuevo' | 'en-curso' | 'proximamente' | 'grabacion';

export const ACTIVE_COURSE_IDS = [110, 106, 109, 104, 107, 108, 102, 101, 103, 105];

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
