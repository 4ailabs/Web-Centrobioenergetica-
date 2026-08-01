/**
 * Los colores de marca, con nombre.
 *
 * Tailwind ya los expone como clases (`bg-primary-600`, `text-salvia-400`…) y
 * esa es la forma preferida siempre que se pueda. Este módulo existe para los
 * sitios donde una clase no llega: atributos `fill` y `stroke` de un SVG
 * inline, gradientes construidos en JavaScript, o un `style` calculado.
 *
 * La regla práctica: si escribes un hexadecimal de marca en un componente,
 * está mal — impórtalo de aquí. scripts/check-colores.mjs lo comprueba.
 *
 * Los acentos propios de cada landing de curso (el azul de CRANIA, el verde de
 * Regulación Bioeléctrica) NO viven aquí a propósito: son identidad de ese
 * curso y solo se usan en su página. Ponerlos en común los volvería paleta
 * general, que es justo lo que no son.
 */

export const COLOR = {
  /** Terracota. El color del instituto. Equivale a primary-600. */
  terracota: '#B5604A',
  /** Terracota oscuro, para estados presionados. primary-700. */
  terracotaOscuro: '#9a4f3c',
  /** Salvia. El acompañante. salvia-400. */
  salvia: '#8FA87A',
  /** Salvia oscuro. salvia-500. */
  salviaOscuro: '#7a9466',
  /** Ámbar. Acento de apoyo, usado en el isotipo. */
  ambar: '#E8A857',
  /** Crema. El fondo del sitio en claro. neutral-50. */
  crema: '#F9F8F6',
  /** Tinta. El fondo del sitio en oscuro. */
  tinta: '#100E12',
} as const;

export type ColorDeMarca = keyof typeof COLOR;
