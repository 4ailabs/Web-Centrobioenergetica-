import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

// Paleta — misma que el Folleto de Beca impreso
const BK = '#362F29';
const GR = '#746C62';
const SAGE = '#8FA87A';
const TERRA = '#B5604A';
const TAN = '#E2D6C6';
const GOLD = '#E8A857';
const BG = '#FAF6F0';

const S = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const G = "Georgia, 'Times New Roman', serif";

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe4LbOkxKHUjTFsPS1Vh0yG4ZtmJj4_9NhgsCFbolOz275gHA/viewform';

// Símbolo — árbol genealógico esquemático (dos líneas convergentes, herencia)
const Arbol = ({ size = 44, color = SAGE }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <circle cx="10" cy="8" r="3.5" stroke={color} strokeWidth="1.6" />
    <circle cx="34" cy="8" r="3.5" stroke={color} strokeWidth="1.6" />
    <circle cx="22" cy="24" r="4.2" fill={color} opacity="0.18" stroke={color} strokeWidth="1.6" />
    <path d="M10 11.5 V17 H34 V11.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M22 17 V19.8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M22 28.2 V33" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="22" cy="37.5" r="3" fill={color} />
  </svg>
);

const BioenergeticaTransgeneracional: React.FC = () => {
  const navigate = useNavigate();
  const [openMod, setOpenMod] = useState<number | null>(0);

  const sesiones = [
    {
      n: '1', fecha: 'Sesión 1', titulo: 'El Mapa que Cargas', accent: SAGE,
      resultado: 'Construyes el genograma y genosociograma de tu propia familia — el material de trabajo de las siguientes 3 sesiones.',
      temas: [
        ['La actualización', 'Por qué "se hereda" algo sin que sea una metáfora: líneas de ADN directas (mitocondrial y cromosoma Y), trauma histórico colectivo, co-regulación del sistema nervioso entre generaciones, herencia epigenética del trauma.'],
        ['Construcción del mapa', 'Cómo construir un genograma (mínimo 3 generaciones) y un genosociograma, y cómo detectar la repetición de ciclos: síndrome de aniversario, oficios o roles que se repiten, enfermedades en la misma rama, edades críticas que coinciden.'],
      ],
    },
    {
      n: '2', fecha: 'Sesión 2', titulo: 'La Línea Paterna y el Camino que Caminas', accent: TERRA,
      resultado: 'Ves, con un caso real, hasta dónde llega una técnica que hace visible la dirección de vida heredada por línea paterna.',
      temas: [
        ['La actualización', 'El cromosoma Y como la única línea genética que pasa intacta de padre a hijo, generación tras generación. Los Cuatro Caminos de la Vida —Migrante, Sufrimiento, Deber, Placer— y su relación con los movimientos sistémicos familiares.'],
        ['Demostración en vivo', 'Con un voluntario, el Dr. Ojeda hace la lectura completa frente al grupo con la técnica proyectiva de muñecos: interpreta, pregunta, conecta el resultado con el genosociograma — el gancho hacia Terapia con Muñecos: Playmobil Pro y Los Caminos de la Vida.'],
      ],
    },
    {
      n: '3', fecha: 'Sesión 3', titulo: 'La Línea Materna: Lo que se Hereda por el Campo', accent: GOLD,
      resultado: 'Cierras la lectura del genograma con la línea materna, a través del campo familiar que se transmite entre generaciones de mujeres.',
      temas: [
        ['La actualización', 'El ADN mitocondrial como línea materna intacta. Co-regulación del sistema nervioso: el bebé aprende a regular su cuerpo copiando el de quien lo cuida, antes de tener recuerdos conscientes.'],
        ['Demostración en vivo', 'Con el genograma de la Sesión 1, el Dr. Ojeda guía la lectura completa del campo familiar frente al grupo — el gancho hacia NIG y Campos Mórficos.'],
      ],
    },
    {
      n: '4', fecha: 'Sesión 4', titulo: 'Los Abuelos, los Tatarabuelos y el Cuerpo que Sobrevive', accent: BK,
      resultado: 'Integras las 4 sesiones y te llevas un mapa familiar completo, con una ruta clara para profundizar.',
      temas: [
        ['La actualización', 'Programas de supervivencia metabólicos: la Hambruna Holandesa (1944-45) y la hipótesis del gen ahorrador — lo que ayudó a sobrevivir el hambre de los abuelos hoy, en abundancia, se traduce en resistencia a la insulina.'],
        ['Cierre e integración', 'Se marcan épocas de hambruna, guerra o migración forzada en el genograma y se cruzan con patrones metabólicos actuales. Las 3 frases de liberación transgeneracional: Reconocimiento → Liberación → Corte.'],
      ],
    },
  ];

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden" style={{ fontFamily: S, background: BG }}>

      {/* Volver */}
      <div className="px-6 lg:px-0 pt-6 pb-2">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden rounded-xl mx-6 lg:mx-0" style={{ minHeight: 240, background: BK }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 25% 70%, ${SAGE}22 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 75% 25%, ${GOLD}18 0%, transparent 55%)` }} />
        <div className="relative z-10 flex flex-col justify-center py-10 px-8" style={{ minHeight: 240 }}>
          <Arbol size={48} color={SAGE} />
          <div className="flex flex-col mt-4">
            <span style={{ fontFamily: G, fontSize: 22, color: TAN, letterSpacing: 1 }}>Bioenergética</span>
            <span style={{ fontFamily: G, fontSize: 22, color: GOLD, letterSpacing: 1 }}>Transgeneracional</span>
          </div>
          <p className="mt-2 max-w-sm" style={{ fontSize: 12, color: TAN, opacity: 0.75, lineHeight: 1.5 }}>
            Beca por invitación · 4 sesiones en vivo · Viernes, 2 horas
          </p>
        </div>
      </div>

      {/* ===== HEADLINE ===== */}
      <div className="px-6 lg:px-0 pt-5 pb-6 max-w-3xl border-t" style={{ borderColor: TAN }}>
        <h1 style={{ fontFamily: G, fontSize: 22, color: BK, letterSpacing: 0.3, lineHeight: 1.35 }}>
          Un marco actualizado para el rastreo <span style={{ color: TERRA }}>transgeneracional</span> en consulta
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
          A lo largo de 4 viernes, construyes el mapa de tu propio árbol familiar y aprendes a leer en él lo que no es tuyo: duelos no resueltos, misiones heredadas, patrones que se repiten entre generaciones — con evidencia reciente sobre transmisión intergeneracional (ADN mitocondrial y cromosoma Y, epigenética del trauma, co-regulación del sistema nervioso, programación metabólica).
        </p>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
          No es un webinar gratuito: es una <strong style={{ color: BK }}>beca por invitación</strong>, con formulario de aceptación y cupo limitado.
        </p>
      </div>

      {/* ===== DIRIGIDO A ===== */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="p-5 rounded-xl" style={{ background: '#fff', border: `1px solid ${TAN}` }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: TERRA }}>Dirigido a</span>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
            Alumnos del Instituto Centrobioenergetica, terapeutas de bioenergética o biomagnetismo formados en otras escuelas, y profesionales de la salud. Requisito: conocimiento previo de rastreo (test muscular) u otras técnicas de acceso al inconsciente. No es un programa abierto al público general.
          </p>
        </div>
      </div>

      {/* ===== MODALIDAD ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl" style={{ background: '#fff', border: `1.5px solid ${SAGE}40` }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: SAGE }}>Presencial</span>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
              Incluye material impreso. Cupo limitado. Al terminar, acceso a una sesión de práctica presencial supervisada en el Instituto.
            </p>
          </div>
          <div className="p-5 rounded-xl" style={{ background: '#fff', border: `1.5px solid ${SAGE}40` }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: SAGE }}>Por Zoom</span>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
              Plazas limitadas. Las 4 sesiones se graban para quienes no puedan asistir en vivo.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PROGRAMA ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: GR }}>Programa</span>
          <div className="h-px flex-1" style={{ background: TAN }} />
          <span className="text-[11px]" style={{ color: GR }}>4 sesiones · viernes</span>
        </div>

        <div className="space-y-4">
          {sesiones.map((m, mi) => {
            const isOpen = openMod === mi;
            return (
              <div key={mi} className="rounded-xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: '#fff', border: '1px solid #E8E1D5' }}>
                <button onClick={() => setOpenMod(isOpen ? null : mi)} className="w-full flex items-start gap-4 p-5 text-left">
                  <div className="flex items-center justify-center shrink-0 rounded-lg" style={{ width: 36, height: 36, background: m.accent + '18' }}>
                    <span className="text-sm font-bold" style={{ fontFamily: G, color: m.accent }}>{m.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[13px] font-medium" style={{ fontFamily: S, color: BK }}>{m.titulo}</h2>
                    <p className="text-[11px] mt-0.5" style={{ color: GR }}>{m.fecha} · 2 horas</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: GR }} />
                </button>

                {isOpen && (
                  <div style={{ borderTop: '1px solid #F2EEE6' }}>
                    {m.temas.map(([title, desc], ti) => (
                      <div key={ti} className="flex gap-3 px-5 py-3" style={{ borderBottom: ti < m.temas.length - 1 ? '1px solid #F8F5F0' : 'none' }}>
                        <span className="text-[11px] font-medium w-4 text-right shrink-0 pt-0.5" style={{ color: GR }}>{ti + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-[12px] font-medium" style={{ color: BK }}>{title}</h3>
                          <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: GR }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                    <div className="px-5 py-3" style={{ background: TAN + '60' }}>
                      <p className="text-xs" style={{ color: TERRA }}>
                        <span className="font-semibold">Al terminar:</span>{' '}
                        <span style={{ color: '#555' }}>{m.resultado}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== INCLUYE ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: GR }}>Incluye</span>
          <div className="h-px flex-1" style={{ background: TAN }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Diploma de participación del Instituto Centrobioenergetica',
            'Una Sesión de Práctica Incluida, presencial, con supervisión',
            'Grabación de las 4 sesiones',
            'Ruta clara hacia Playmobil Pro, Campos Mórficos y Setpoint',
          ].map((item, ii) => (
            <div key={ii} className="p-4 rounded-xl flex items-start gap-2" style={{ background: '#fff', border: '1px solid #E8E1D5' }}>
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: SAGE }} />
              <span className="text-[13px] leading-relaxed" style={{ color: '#555' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MECÁNICA DE BECA ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="p-6 rounded-xl" style={{ background: BK }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>Cómo funciona la beca</span>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: TAN }}>
            Al llenar el formulario, tu solicitud será revisada por el Instituto. Si es aceptada, recibirás tu carta de aceptación de beca con los detalles de acceso. Cupo limitado — no todas las solicitudes son aceptadas.
          </p>
        </div>
      </div>

      {/* ===== CTA — formulario de solicitud ===== */}
      <div className="px-6 lg:px-0 pb-6">
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
          style={{ background: TERRA }}
        >
          Solicitar mi beca
        </a>
        <p className="text-center mt-3 text-[11px]" style={{ color: GR }}>
          Formulario de aceptación · Cupo limitado · Presencial y por Zoom
        </p>
      </div>

      {/* ===== ENDORSEMENT ===== */}
      <div className="text-center pt-6 pb-4">
        <Arbol size={24} color={GR} />
        <p className="mt-1.5" style={{ fontFamily: G, fontSize: 9, color: GR, letterSpacing: 3, textTransform: 'uppercase' as const }}>
          Instituto Centrobioenergetica
        </p>
      </div>

    </div>
  );
};

export default BioenergeticaTransgeneracional;
