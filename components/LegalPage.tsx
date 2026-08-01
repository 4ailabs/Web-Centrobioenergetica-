import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  titulo: string;
  /** Se muestra bajo el título: en qué fecha quedó así este texto. */
  actualizado: string;
  entradilla?: string;
  children: React.ReactNode;
}

/**
 * Marco común de las páginas legales. Texto largo y de lectura seguida, así
 * que la medida se limita a ~65 caracteres y el cuerpo va más aireado que en
 * el resto del sitio.
 */
const LegalPage: React.FC<LegalPageProps> = ({ titulo, actualizado, entradilla, children }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      <div className="px-6 lg:px-0 pt-6 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      <div className="px-6 lg:px-0 max-w-[68ch]">
        <h1 className="font-editorial text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100 leading-tight [text-wrap:balance]">
          {titulo}
        </h1>
        <p className="mt-2 text-xs text-neutral-400">Última actualización: {actualizado}</p>

        {entradilla && (
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {entradilla}
          </p>
        )}

        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </div>
  );
};

/** Un apartado con su título. */
export const Seccion: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <section>
    <h2 className="font-editorial text-lg text-neutral-800 dark:text-neutral-100 leading-snug mb-3">
      {titulo}
    </h2>
    <div className="space-y-3 text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
      {children}
    </div>
  </section>
);

/** Lista de puntos, con el mismo ritmo que el cuerpo del texto. */
export const Lista: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="relative pl-5">
        <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full bg-primary-600" />
        {item}
      </li>
    ))}
  </ul>
);

/** Bloque destacado, para lo que no debe pasarse por alto. */
export const Aviso: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-l-2 border-primary-600 pl-4 py-1 text-[14.5px] leading-relaxed text-neutral-700 dark:text-neutral-200">
    {children}
  </div>
);

export default LegalPage;
