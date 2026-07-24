import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useUIState } from '../contexts/AppContext';

// Resonantia Brand Colors
const LIGHT = {
  AZ: '#4A5568',    // Pizarra cálido
  AZL: '#718096',   // Pizarra medio
  CIELO: '#F0EDE8', // Fondo cálido neutro
  CIELO_L: '#F7F4F0',
  BK: '#2C2C2A',    // Texto principal
  GR: '#888780',    // Texto secundario
  CR: '#E8E6DE',    // Borde sutil
  BG: '#FAF9F6',    // Fondo página
  CARD: '#FFFFFF',  // Card background
  CARD_BORDER: '#E2EAF0',
};

const DARK = {
  AZ: '#9CB3D0',    // Pizarra claro para contraste
  AZL: '#7A8FA8',
  CIELO: '#252520',
  CIELO_L: '#1E1E1B',
  BK: '#DEDBD6',    // Texto claro cálido
  GR: '#7A7770',    // Texto secundario
  CR: '#3A3A35',    // Borde sutil oscuro
  BG: '#100E12',    // Fondo página oscuro
  CARD: '#1A1816',  // Card background
  CARD_BORDER: '#2A2A24',
};

const CG = "'Cormorant Garamond', Georgia, serif";
const S = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Símbolo de onda / diapasón
const OndaSvg = ({ size = 40, color = LIGHT.AZ, opacity = 0.8 }: { size?: number; color?: string; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M10 40 Q20 20 30 40 Q40 60 50 40 Q60 20 70 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity={opacity} />
    <circle cx="40" cy="40" r="3" fill={color} opacity={opacity * 0.6} />
  </svg>
);

const Resonantia: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUIState();
  const C = isDarkMode ? DARK : LIGHT;
  const { AZ, AZL, CIELO, CIELO_L, BK, GR, CR, BG } = C;
  const [openBloque, setOpenBloque] = useState<number | null>(0);

  const bloques = [
    {
      n: '1',
      titulo: 'Fundamentos',
      horario: 'Grabación',
      accent: AZ,
      temas: [
        ['El sonido como intervención biológica', 'El nervio vago, la teoría polivagal y cómo la vibración de baja frecuencia activa el sistema parasimpático. Explicado desde la medicina, no desde la música.'],
        ['El diapasón 128 Hz: tu herramienta', 'Los 6 puntos del cuerpo: esternón, clavícula, mastoides, sacro, rodillas, muñecas. Cómo activarlo, cómo colocarlo, cuánto tiempo.'],
        ['Demostración del arsenal completo', 'Espectro Solar Armónico, Auto 64 Hz, Auto 32 Hz, diapasones largos y campanas tibetanas. Los participantes reciben el baño de sonido completo.'],
        ['Tu voz como diapasón', 'Humming en 4 zonas del cuerpo. Vocal toning. Voz + diapasón simultáneos. El 80% del efecto vibratorio se logra sin instrumento.'],
      ],
    },
    {
      n: '2',
      titulo: 'Los 3 Protocolos de Vibración',
      horario: 'Grabación',
      accent: AZ,
      temas: [
        ['Estructura de intervención con diapasón', 'Una secuencia de 5 pasos que convierte el sonido en intervención directa sobre el sistema nervioso. Sin estructura, el diapasón es solo sonido bonito.'],
        ['Protocolo 1: El Intervalo que Te Falta', 'Autoaplicación. Un diapasón, una secuencia guiada, evidencia física de lo que se movió. Para uso personal, en casa, sin acompañante.'],
        ['Protocolo 2: El Concierto del Cuerpo', 'Trabajo en parejas para terapeutas. Secuencia completa de evaluación e intervención sobre otro cuerpo con el diapasón.'],
        ['Protocolo 3: Lo que el Hueso Recuerda', 'Experiencia grupal profunda guiada por el Dr. Ojeda. 20 diapasones simultáneos + 20 voces. Un campo sonoro colectivo.'],
      ],
    },
    {
      n: '3',
      titulo: 'Integración y Práctica de Vida',
      horario: 'Grabación',
      accent: AZL,
      temas: [
        ['Tu protocolo diario', '4 momentos del día: al despertar, antes de trabajar, después del estrés, antes de dormir. 5 a 10 minutos. De por vida.'],
        ['Para terapeutas: integración en consultorio', 'Cómo introducir el diapasón en sesión. Combinación con biomagnetismo, escritura terapéutica y constelaciones con objetos.'],
        ['Cierre e integración', 'Sesión final guiada por el Dr. Ojeda con el arsenal completo de instrumentos. Los participantes reciben en silencio.'],
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
      <div className="relative overflow-hidden rounded-xl mx-6 lg:mx-0" style={{ minHeight: 280, background: BK }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 25% 60%, rgba(26,58,92,0.25) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 30%, rgba(74,127,165,0.12) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10 flex flex-col justify-center py-12 px-8" style={{ minHeight: 280 }}>
          <OndaSvg size={52} color={AZL} opacity={0.85} />
          <div className="flex flex-col mt-5">
            <span style={{ fontFamily: CG, fontSize: 36, fontWeight: 300, color: '#E8EEF4', letterSpacing: 3, lineHeight: 1.05 }}>RESONANTIA</span>
            <span style={{ fontFamily: CG, fontSize: 16, fontWeight: 300, color: AZL, letterSpacing: 2, lineHeight: 1.4, marginTop: 6 }}>Diapasones Terapéuticos</span>
          </div>
          <p className="mt-4 max-w-sm" style={{ fontSize: 14, color: '#E8EEF4', opacity: 0.55, lineHeight: 1.5 }}>
            Taller completo · Grabación disponible · A tu ritmo
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AZL}, transparent)` }} />
      </div>

      {/* ===== HEADLINE ===== */}
      <div className="px-6 lg:px-0 pt-6 pb-6 max-w-3xl border-t" style={{ borderColor: CR }}>
        <h1 style={{ fontFamily: CG, fontSize: 26, fontWeight: 400, color: BK, letterSpacing: 0.5, lineHeight: 1.3 }}>
          Lo que sigue vibrando cuando el sonido se apaga.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: '#555' }}>
          Un diapasón de 128 Hz entra por el hueso, recorre el tejido conectivo y llega al sistema nervioso antes de que la mente tenga tiempo de opinar. No es musicoterapia. No es meditación con cuencos. No es relajación.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed" style={{ color: '#555' }}>
          <strong style={{ color: BK }}>Resonantia</strong> es un día completo para aprender a usar esa vibración — en ti y en otros. Con 3 protocolos que tienen estructura, secuencia y un acto irreversible que el cuerpo registra.
        </p>
        <p className="mt-3 text-[14px] italic" style={{ fontFamily: CG, color: AZ, lineHeight: 1.6 }}>
          "Un diapasón sin secuencia es relajación. Un diapasón dentro de la secuencia TAME es intervención."
        </p>
      </div>

      {/* ===== FECHA Y PRECIOS ===== */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: CIELO }}>
            <OndaSvg size={28} color={AZ} opacity={0.7} />
            <div>
              <p className="text-[14px] font-medium" style={{ color: BK }}>Grabación disponible</p>
              <p className="text-[12px]" style={{ color: GR }}>Jornada completa grabada · Acceso inmediato</p>
            </div>
          </div>
        </div>

        {/* Precios */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="px-4 py-2 rounded-lg text-center" style={{ background: C.CARD, border: `1px solid ${CR}` }}>
            <p className="text-[13px] font-semibold" style={{ color: AZ }}>$1,500 MXN</p>
            <p className="text-[11px]" style={{ color: GR }}>Acceso online · Grabación completa</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-[13px] px-3 py-1 rounded-md" style={{ background: CIELO, color: AZ }}>Acceso inmediato tras confirmar</span>
          <span className="text-[13px] px-3 py-1 rounded-md" style={{ background: '#F1EFE8', color: GR }}>Dr. Miguel Ojeda Rios</span>
        </div>
      </div>

      {/* ===== PARA QUIÉN ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="p-6 rounded-xl" style={{ background: CIELO_L, border: `1px solid ${CR}` }}>
          <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: AZ }}>Para quién</span>
          <p className="mt-2 text-[15px] leading-relaxed" style={{ color: '#555' }}>
            Para todo público y terapeutas. No se requiere formación musical. No se requiere experiencia terapéutica previa. Solo un cuerpo y disposición para sentir.
          </p>
          <p className="mt-2 text-[13px]" style={{ color: GR }}>Todo público · Sin requisitos · Online</p>
        </div>
      </div>

      {/* ===== PROGRAMA ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[13px] font-medium uppercase tracking-wider" style={{ color: GR }}>Programa</span>
          <div className="h-px flex-1" style={{ background: CR }} />
          <span className="text-[13px]" style={{ color: GR }}>3 bloques · 1 jornada completa</span>
        </div>

        <div className="space-y-4">
          {bloques.map((b, bi) => {
            const isOpen = openBloque === bi;
            return (
              <div key={bi} className="rounded-xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: C.CARD, border: `1px solid ${C.CARD_BORDER}` }}>
                <button onClick={() => setOpenBloque(isOpen ? null : bi)} className="w-full flex items-start gap-4 p-5 text-left">
                  <div className="flex items-center justify-center shrink-0 rounded-lg" style={{ width: 40, height: 40, background: b.accent + '12' }}>
                    <span className="text-base font-bold" style={{ fontFamily: CG, color: b.accent }}>{b.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[15px] font-medium" style={{ color: BK }}>{b.titulo}</h2>
                    <p className="text-[13px] mt-0.5" style={{ color: GR }}>{b.horario} · {b.temas.length} temas</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: GR }} />
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${CR}` }}>
                    {b.temas.map(([title, desc], ti) => (
                      <div key={ti} className="flex gap-3 px-5 py-3.5" style={{ borderBottom: ti < b.temas.length - 1 ? `1px solid ${CR}` : 'none' }}>
                        <span className="text-[13px] font-medium w-5 text-right shrink-0 pt-0.5" style={{ color: GR }}>{ti + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-[14px] font-medium" style={{ color: BK }}>{title}</h3>
                          <p className="text-[13px] mt-0.5 leading-relaxed" style={{ color: GR }}>{desc}</p>
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

      {/* ===== LA EVIDENCIA ===== */}
      <div className="pb-10 -mx-6 lg:mx-0">
        <div className="py-10 px-6" style={{ background: CIELO_L }}>
          <p className="text-center mb-6" style={{ fontFamily: CG, fontSize: 20, fontWeight: 300, color: AZ, letterSpacing: 0.5 }}>
            La ciencia detrás del sonido
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              ['15×', 'El tarareo aumenta el óxido nítrico nasal 15 veces (Weitzberg, 2002)'],
              ['40 Hz', 'Reduce amiloide en cerebro — beneficio cognitivo confirmado en 8 RCTs (MIT, 2016–2025)'],
              ['7.83 Hz', 'Mejora el sueño medido por polisomnografía en RCT doble ciego (Huang, 2022)'],
              ['128 Hz', 'Frecuencia estándar en neurología para evaluar conducción ósea y neuropatía'],
            ].map(([stat, desc], i) => (
              <div key={i} className="flex gap-3 p-4 rounded-lg" style={{ background: C.CARD, border: `1px solid ${CR}` }}>
                <span className="text-[18px] font-bold shrink-0" style={{ fontFamily: CG, color: AZ }}>{stat}</span>
                <p className="text-[13px] leading-relaxed" style={{ color: '#555' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== LO QUE TE LLEVAS ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[13px] font-medium uppercase tracking-wider" style={{ color: GR }}>Lo que te llevas</span>
          <div className="h-px flex-1" style={{ background: CR }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cat: 'Con tu acceso a la grabación', accent: AZL, items: [
              'Protocolo diario de autoaplicación (PDF)',
              'Protocolo "El Intervalo que Te Falta" completo para hacer en casa',
              'Guía de 6 puntos del 128 Hz',
              'Guía para terapeutas: integración del diapasón en consultorio',
              'Canal de seguimiento grupal (WhatsApp)',
            ]},
          ].map((group, gi) => (
            <div key={gi} className="p-5 rounded-xl" style={{ background: C.CARD, border: `1px solid ${C.CARD_BORDER}` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: group.accent }} />
                <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: group.accent }}>{group.cat}</span>
              </div>
              <div className="mt-2 space-y-2">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AZ }} />
                    <span className="text-[14px] leading-relaxed" style={{ color: '#555' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MÉTODO ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="p-6 rounded-xl flex items-start gap-4" style={{ background: CIELO_L, border: `1px solid ${CR}` }}>
          <OndaSvg size={32} color={AZ} opacity={0.6} />
          <div>
            <p className="text-[15px] leading-relaxed" style={{ color: '#555' }}>
              El diapasón tiene algo que ningún otro instrumento tiene: un inicio, una vibración que se siente en el hueso, y un final exacto donde el sonido se apaga y queda el silencio. Cada protocolo de Resonantia usa esa transición como punto de intervención — el momento donde el sistema nervioso registra el cambio de estado en tiempo real.
            </p>
            <p className="mt-1.5 text-[13px]" style={{ color: GR }}>
              Desarrollado por el Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica
            </p>
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="px-6 lg:px-0 pb-6">
        <a
          href="https://wa.me/525579076626?text=Hola%2C%20quiero%20acceso%20a%20la%20grabacion%20de%20Resonantia%20%E2%80%94%20Diapasones%20Terapeuticos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-5 py-4 text-white rounded-xl font-medium text-[15px] transition-opacity hover:opacity-90"
          style={{ background: AZ }}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Pedir acceso a la grabación
        </a>
        <p className="text-center mt-3 text-[13px]" style={{ color: GR }}>
          Grabación completa de la jornada · Acceso online
        </p>
      </div>

      {/* ===== ENDORSEMENT ===== */}
      <div className="text-center pt-6 pb-4">
        <OndaSvg size={24} color={GR} opacity={0.5} />
        <p className="mt-1.5" style={{ fontFamily: CG, fontSize: 10, color: GR, letterSpacing: 3, textTransform: 'uppercase' }}>
          Instituto Centrobioenergetica
        </p>
      </div>

    </div>
  );
};

export default Resonantia;
