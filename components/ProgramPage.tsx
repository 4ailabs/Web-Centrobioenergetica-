import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown } from 'lucide-react';

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
}

interface ProgramPageProps {
  titulo: string;
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
}

const ProgramPage: React.FC<ProgramPageProps> = ({
  titulo,
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
}) => {
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
        <span className="inline-block px-2.5 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded-full mb-3">{badge}</span>
        <h1 className="text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-3 leading-snug">
          {titulo}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
          {hook}
        </p>
      </div>

      {/* Dates + Modality — prominent anchor */}
      <div className="px-6 lg:px-0 pb-6">
        <div className="border-l-2 border-primary-600 pl-5 py-1">
          <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight leading-snug">
            {fechas}
          </p>
          <p className="text-sm text-primary-600 font-medium mt-1">
            {modalidad}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {instructor}
          </p>
        </div>
      </div>

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

      {/* Image */}
      {imagen && (
        <div className="px-6 lg:px-0 pb-10">
          <div className="rounded-xl overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-800">
            <img src={imagen} alt={titulo} className="w-full h-full object-cover" />
          </div>
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
                  <span className="text-2xl font-semibold text-primary-600 leading-none w-8 text-center shrink-0">{modulo.numero}</span>
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* What you get */}
      <div className="px-6 lg:px-0 pb-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Qué te llevas</h3>
        <div className="space-y-2.5">
          {entregables.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
              <span className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

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
      <div className="fixed bottom-0 left-0 right-0 lg:relative lg:mt-4 px-6 lg:px-0 pb-5 lg:pb-0 pt-3 bg-gradient-to-t from-[#F9F8F6] dark:from-[#100E12] via-[#F9F8F6]/95 dark:via-[#100E12]/95 to-transparent lg:from-transparent lg:via-transparent lg:bg-none z-30">
        <a
          href={`https://wa.me/525579076626?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary-600 text-white rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {ctaLabel}
        </a>
      </div>
    </div>
  );
};

export default ProgramPage;
