import React from 'react';

/**
 * El tono dice qué clase de dato es, no de qué color va.
 * Nombrarlos por color (`verde`, `ámbar`) obliga a renombrarlos el día que
 * cambie la paleta, y hace que nadie recuerde cuál tocaba usar.
 */
export type TonoBadge =
  /** Lo que está activo ahora mismo. */
  | 'activo'
  /** Algo terminado o correcto. */
  | 'logrado'
  /** Requiere atención, sin ser un error. */
  | 'atencion'
  /** Destacado de marca. */
  | 'marca'
  /** Dato neutro, sin carga. */
  | 'neutro'
  /** Inverso, para lo que aún no ocurre. */
  | 'proximo';

const TONO: Record<TonoBadge, string> = {
  activo: 'bg-salvia-500 text-white',
  logrado: 'bg-salvia-50 dark:bg-salvia-400/10 text-salvia-600 dark:text-salvia-400',
  atencion: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  marca: 'bg-primary-600 text-white',
  neutro:
    'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600',
  proximo: 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800',
};

interface BadgeProps {
  tono?: TonoBadge;
  /** Icono pequeño a la izquierda del texto. */
  icono?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Etiqueta de estado. Se repetía en doce sitios con medidas ligeramente
 * distintas; aquí el tamaño es uno solo, y lo que cambia es el tono.
 */
const Badge: React.FC<BadgeProps> = ({ tono = 'neutro', icono, className = '', children }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium leading-none whitespace-nowrap ${TONO[tono]} ${className}`}
  >
    {icono}
    {children}
  </span>
);

export default Badge;
