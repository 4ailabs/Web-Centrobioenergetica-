import React from 'react';
import { Link } from 'react-router-dom';

export type VarianteBoton = 'primario' | 'contorno' | 'salvia' | 'contornoClaro';
export type TamanoBoton = 'sm' | 'md' | 'lg';

const VARIANTE: Record<VarianteBoton, string> = {
  /** La acción principal de la pantalla. Solo una por vista. */
  primario: 'bg-primary-600 hover:bg-primary-700 text-white',
  /** Acción secundaria sobre fondo claro. */
  contorno:
    'border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400',
  /** Contacto por WhatsApp y acciones de seguimiento. */
  salvia: 'bg-salvia-500 hover:bg-salvia-600 text-white',
  /** Secundaria sobre imagen o fondo oscuro, donde el contorno neutro se pierde. */
  contornoClaro: 'border border-white/40 hover:border-white/70 text-white',
};

// La altura mínima no es decorativa: por debajo de 36 px el dedo falla, y en
// este panel casi todo se usa desde el teléfono.
const TAMANO: Record<TamanoBoton, string> = {
  sm: 'px-3.5 py-2 text-[12.5px] rounded-lg min-h-[36px]',
  md: 'px-5 py-2.5 text-sm rounded-xl min-h-[40px]',
  lg: 'px-5 py-3 text-sm rounded-xl min-h-[44px]',
};

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:pointer-events-none';

interface Comun {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  anchoCompleto?: boolean;
  className?: string;
  children: React.ReactNode;
}

type PropsBoton = Comun &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: never;
    to?: never;
  };

type PropsEnlace = Comun &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    /** Enlace externo. Se abre en otra pestaña. */
    href: string;
    to?: never;
  };

type PropsRuta = Comun & {
  /** Ruta interna. Navega sin recargar. */
  to: string;
  href?: never;
};

export type ButtonProps = PropsBoton | PropsEnlace | PropsRuta;

/**
 * El botón del sitio.
 *
 * Antes este mismo bloque de clases estaba escrito a mano en seis archivos, y
 * ya habían empezado a divergir entre sí: distinto radio, distinta altura,
 * ninguno con estado de foco visible. Aquí el foco viene de serie, que es lo
 * que permite usar el sitio con el teclado.
 */
const Button = (props: ButtonProps) => {
  const { variante = 'primario', tamano = 'md', anchoCompleto = false, className = '', children } = props;

  const clases = [BASE, VARIANTE[variante], TAMANO[tamano], anchoCompleto ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={clases}>
        {children}
      </Link>
    );
  }

  // Se descartan las props de presentación para no volcarlas en el DOM: React
  // avisaría por consola de cada atributo desconocido.
  if ('href' in props && props.href) {
    const { variante: _v, tamano: _t, anchoCompleto: _a, className: _c, children: _h, href, ...anchor } =
      props as PropsEnlace;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases} {...anchor}>
        {children}
      </a>
    );
  }

  const { variante: _v, tamano: _t, anchoCompleto: _a, className: _c, children: _h, ...boton } =
    props as PropsBoton;
  return (
    <button className={clases} {...boton}>
      {children}
    </button>
  );
};

export default Button;
