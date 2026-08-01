import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { whatsappLink } from '../lib/whatsapp';

interface ProgramBlock {
  time: string;
  title: string;
  desc: string;
}

interface ProgramModule {
  numero: string;
  fecha: string;
  titulo: string;
  bloques: ProgramBlock[];
  resultado?: string;
}

interface ProgramPageProps {
  titulo: string;
  slogan?: string;
  hook: string;
  imagen?: string;
  fechas: string;
  modalidad: string;
  instructor: string;
  detalles?: string[];
  modulos: ProgramModule[];
  entregables: string[];
  requisitos?: string;
  whatsappMsg: string;
  ctaLabel?: string;
  badge?: string;
  accentColor?: string;
  metodoLink?: { label: string; path: string };
  testBanner?: { label: string; sublabel: string; path: string };
  heroElement?: React.ReactNode;
  titleFont?: string;
  modalidades?: { titulo: string; desc: string }[];
  /** Cita editorial en cursiva bajo el hook */
  frase?: string;
  /** Tarjetas de precio (p. ej. "$1,500 MXN" / "Acceso online") */
  precios?: { valor: string; etiqueta: string }[];
  /** Bloque "Para quién" con texto y nota corta opcional */
  paraQuien?: { texto: string; nota?: string };
  /** Grupos de entregables con título propio (alternativa a `entregables`) */
  entregableGroups?: { titulo: string; items: string[] }[];
  /** Párrafo del método/enfoque, con nota de autoría opcional */
  metodo?: { texto: string; nota?: string };
  /** Texto pequeño centrado bajo el botón del CTA */
  notaCta?: string;
  /** URL externa para el CTA (p. ej. un formulario). Si se define, el botón
   *  enlaza ahí en lugar de a WhatsApp y no muestra el icono de WhatsApp. */
  ctaHref?: string;
}

const ProgramPage: React.FC<ProgramPageProps> = ({
  titulo,
  slogan,
  hook,
  imagen,
  fechas,
  modalidad,
  instructor,
  detalles,
  modulos,
  entregables,
  requisitos,
  whatsappMsg,
  ctaLabel = 'Inscribirme por WhatsApp',
  badge = 'Próximamente',
  accentColor,
  metodoLink,
  testBanner,
  heroElement,
  titleFont,
  modalidades,
  frase,
  precios,
  paraQuien,
  entregableGroups,
  metodo,
  notaCta,
  ctaHref,
}) => {
  const accent = accentColor || undefined;
  const accentStyle = accent ? { backgroundColor: accent } : undefined;
  const accentBorder = accent ? { borderColor: accent } : undefined;
  const accentText = accent ? { color: accent } : undefined;
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-28 lg:pb-16 overflow-x-hidden">
      {/* Back */}
      <div className="px-6 lg:px-0 pt-6 pb-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {/* Badge + Title + Hook */}
      <div className="px-6 lg:px-0 pb-6">
        <span className={`inline-block px-2.5 py-0.5 text-white text-[10px] font-medium rounded-full mb-3 ${accent ? '' : 'bg-primary-600'}`} style={accentStyle}>{badge}</span>
        <h1 className="text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2 leading-snug" style={titleFont ? { fontFamily: titleFont } : undefined}>
          {titulo}
        </h1>
        {slogan && (
          <p className="font-editorial text-base italic text-neutral-600 dark:text-neutral-300 mb-2">
            {slogan}
          </p>
        )}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
          {hook}
        </p>
        {frase && (
          <p className="font-editorial italic text-[15px] leading-relaxed mt-3 max-w-xl" style={accentText || undefined}>
            {frase}
          </p>
        )}
        {metodoLink && (
          <button
            onClick={() => navigate(metodoLink.path)}
            className={`mt-3 flex items-center gap-1.5 text-sm font-medium transition-colors ${accent ? '' : 'text-primary-600'}`}
            style={accentText}
          >
            {metodoLink.label}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {/* Dates + Modality — prominent anchor */}
      <div className="px-6 lg:px-0 pb-6">
        <div className={`border-l-2 pl-5 py-1 ${accent ? '' : 'border-primary-600'}`} style={accentBorder}>
          <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight leading-snug">
            {fechas}
          </p>
          <p className={`text-sm font-medium mt-1 ${accent ? '' : 'text-primary-600'}`} style={accentText}>
            {modalidad}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {instructor}
          </p>
        </div>
      </div>

      {/* Precios */}
      {precios && precios.length > 0 && (
        <div className="px-6 lg:px-0 pb-6">
          <div className="flex flex-wrap gap-2">
            {precios.map((p, i) => (
              <div key={i} className="px-4 py-2.5 rounded-lg text-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <p className={`text-[13px] font-semibold ${accent ? '' : 'text-primary-600'}`} style={accentText}>{p.valor}</p>
                <p className="text-[12px] text-neutral-500 dark:text-neutral-400">{p.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details pills */}
      {detalles && detalles.length > 0 && (
        <div className="px-6 lg:px-0 pb-6">
          <div className="flex flex-wrap gap-2">
            {detalles.map((d, i) => (
              <span key={i} className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">{d}</span>
            ))}
          </div>
        </div>
      )}

      {/* Hero element or Image */}
      {heroElement ? (
        <div className="px-6 lg:px-0 pb-10">
          {heroElement}
        </div>
      ) : imagen ? (
        <div className="px-6 lg:px-0 pb-10">
          <div className="rounded-xl overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-800">
            <img src={imagen} alt={titulo} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        </div>
      ) : null}

      {/* Para quién */}
      {paraQuien && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className={`text-[11px] font-semibold uppercase tracking-widest ${accent ? '' : 'text-primary-600'}`} style={accentText}>Para quién</span>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{paraQuien.texto}</p>
            {paraQuien.nota && (
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{paraQuien.nota}</p>
            )}
          </div>
        </div>
      )}

      {/* Modalidades */}
      {modalidades && modalidades.length > 0 && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Dos modalidades</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modalidades.map((m, i) => (
              <div key={i} className={`p-4 rounded-xl border ${accent ? '' : 'border-primary-600/20'}`} style={accent ? { borderColor: accent + '30', backgroundColor: accent + '08' } : undefined}>
                <h3 className={`text-[13px] font-semibold mb-1.5 ${accent ? '' : 'text-primary-600'}`} style={accentText}>{m.titulo}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test banner */}
      {testBanner && (
        <div className="px-6 lg:px-0 pb-8">
          <button
            onClick={() => navigate(testBanner.path)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-600/10 hover:bg-primary-100 dark:hover:bg-primary-600/20 transition-colors text-left group"
          >
            <div>
              <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">{testBanner.label}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{testBanner.sublabel}</p>
            </div>
            <svg className="w-5 h-5 text-primary-500 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Program — Domestika/Coursera style accordion */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Programa</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
          <span className="text-[11px] text-neutral-400">{modulos.length} módulos · {modulos.reduce((acc, m) => acc + m.bloques.filter(b => b.desc).length, 0)} temas</span>
        </div>

        <div className="space-y-3">
          {modulos.map((modulo, mi) => {
            const isExpanded = expandedModule === mi;
            const temaCount = modulo.bloques.filter(b => b.desc).length;

            return (
              <div key={mi} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* Module header — clickable */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? null : mi)}
                  className="w-full flex items-center gap-4 p-4 text-left group"
                >
                  <span className={`text-2xl font-semibold leading-none w-8 text-center shrink-0 ${accent ? '' : 'text-primary-600'}`} style={accentText}>{modulo.numero}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug">{modulo.titulo}</h2>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{modulo.fecha} · {temaCount} temas</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded content — topic list */}
                {isExpanded && (
                  <div className="border-t border-neutral-100 dark:border-neutral-700">
                    {modulo.bloques.filter(b => b.desc).map((block, i) => (
                      <div key={i} className="flex gap-3 px-4 py-3 border-b border-neutral-50 dark:border-neutral-700/50 last:border-0">
                        <span className="text-[11px] text-neutral-400 font-medium w-5 text-right shrink-0 pt-0.5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-editorial text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug">{block.title}</h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1">{block.desc}</p>
                        </div>
                      </div>
                    ))}
                    {modulo.resultado && (
                      <div className="px-4 py-3" style={accent ? { backgroundColor: accent + '08' } : { backgroundColor: 'rgb(var(--color-primary-600) / 0.04)' }}>
                        <p className="text-xs font-medium" style={accentText || { color: 'rgb(var(--color-primary-600))' }}>
                          Al terminar: <span className="font-normal text-neutral-600 dark:text-neutral-300">{modulo.resultado}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* What you get — grupos con título */}
      {entregableGroups && entregableGroups.length > 0 && (
        <div className="px-6 lg:px-0 pb-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Qué te llevas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {entregableGroups.map((group, gi) => (
              <div key={gi} className="p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <span className={`text-[11px] font-semibold uppercase tracking-widest ${accent ? '' : 'text-primary-600'}`} style={accentText}>{group.titulo}</span>
                <div className="mt-3 space-y-2.5">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent ? '' : 'text-primary-600'}`} style={accentText} />
                      <span className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Método */}
      {metodo && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{metodo.texto}</p>
            {metodo.nota && (
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{metodo.nota}</p>
            )}
          </div>
        </div>
      )}

      {/* What you get */}
      {entregables.length > 0 && (
        <div className="px-6 lg:px-0 pb-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Qué te llevas</h3>
          <div className="space-y-2.5">
            {entregables.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent ? '' : 'text-primary-600'}`} style={accentText} />
                <span className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {requisitos && (
        <div className="px-6 lg:px-0 pb-8">
          <div className="flex items-start gap-2.5">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-500 dark:text-neutral-400"><span className="font-medium text-neutral-700 dark:text-neutral-300">Requisitos:</span> {requisitos}</p>
          </div>
        </div>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:relative lg:mt-4 px-6 lg:px-0 pb-5 lg:pb-0 pt-3 bg-gradient-to-t from-neutral-50 dark:from-[#100E12] via-neutral-50/95 dark:via-[#100E12]/95 to-transparent lg:from-transparent lg:via-transparent lg:bg-none z-30">
        <a
          href={ctaHref || whatsappLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full px-5 py-3 text-white rounded-xl font-medium text-sm transition-colors ${accent ? 'hover:opacity-90' : 'bg-primary-600 hover:bg-primary-700'}`}
          style={accentStyle}
        >
          {!ctaHref && <WhatsAppIcon className="w-4 h-4" />}
          {ctaLabel}
        </a>
        {notaCta && (
          <p className="text-center mt-2.5 text-xs text-neutral-500 dark:text-neutral-400">{notaCta}</p>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;
