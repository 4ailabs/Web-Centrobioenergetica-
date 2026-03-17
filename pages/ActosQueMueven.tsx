import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

// RE Brand Colors
const SI = '#8B4513';
const SIL = '#C4926A';
const ARENA = '#F2E8DC';
const ARENA_L = '#F7F0E8';
const BK = '#2C2C2A';
const GR = '#888780';
const CR = '#E8E6DE';
const BG = '#FAF9F6';

// Module accent — warm earth palette
const COBRE = '#A0522D';
const OCRE = '#96632A';

const CG = "'Cormorant Garamond', Georgia, serif";
const S = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// RE Vortex Symbol
const Vortice = ({ size = 32, color = SI, opacity = 0.82 }: { size?: number; color?: string; opacity?: number }) => (
  <svg width={size} height={size} viewBox="-1 -19 138 155">
    <path
      d="M 72 122 C 73 121, 74 120, 73 119 C 72 118, 71 119, 71 120 C 71 121, 72 122, 72 122 C 76 121, 79 117, 78 113 C 76 109, 70 108, 68 111 C 66 114, 68 120, 72 119 C 80 116, 88 104, 84 92 C 80 80, 62 76, 52 84 C 42 92, 50 108, 66 104 C 90 96, 108 72, 100 52 C 92 34, 56 26, 40 40 C 24 54, 34 78, 58 74 C 100 62, 128 32, 118 10 C 108 -6, 48 -10, 26 8 C 8 24, 18 50, 48 48"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={opacity}
    />
    <circle cx="72" cy="124" r="2.8" fill={color} opacity={0.55} />
  </svg>
);

const ActosQueMueven: React.FC = () => {
  const navigate = useNavigate();
  const [openMod, setOpenMod] = useState<number | null>(0);

  const modulos = [
    {
      n: '1', fecha: '6 de junio', titulo: 'Los 5 Actos Fundamentales', accent: SI,
      resultado: 'Tienes 5 actos rituales que puedes repetir en casa — y entiendes por qué funcionan.',
      temas: [
        ['Apertura y secuencia TAME', 'Encuadre del taller, reglas del espacio y los 5 pasos que hacen que un acto ritual llegue al sistema nervioso en lugar de quedarse en la mente.'],
        ['Romper y reparar', 'Para cuando algo te impactó con tanta fuerza que las piezas de la experiencia se separaron. Un acto con cerámica, quiebre y reparación con pegamento dorado (kintsugi).'],
        ['Lo que nunca se dijo', 'Para cuando la voz fue silenciada y lo no dicho se acumuló en la garganta. Un acto con escritura, voz y una botella que guarda y después libera.'],
        ['Ponerse de pie', 'Para cuando aprendiste a hacerte pequeño para no ser blanco. Un acto frente al espejo que trabaja la postura, el tamaño real y la presencia.'],
        ['La cara que construí', 'Para cuando construiste una cara para el mundo porque mostrar la real parecía peligroso. Un acto con máscara, espejo y la decisión de quitársela.'],
        ['El primer bocado', 'Para cuando todo se apagó por dentro. Un acto en la oscuridad con vela, luz y alimento que trabaja con la depleción y el reencendido.'],
      ],
    },
    {
      n: '2', fecha: '20 de junio', titulo: 'La Secuencia que Transforma', accent: COBRE,
      resultado: 'Viviste una secuencia completa de descenso, encuentro y ascenso — y te llevas los objetos transformados.',
      temas: [
        ['Reencuentro', 'Revisión de lo que se movió en las dos semanas entre módulos. Qué acto repitieron, qué notaron, qué apareció en el cuerpo y en la vida cotidiana.'],
        ['El peso (descenso)', 'Entrar al cuerpo tal como está, con todo lo que carga. Un acto con piedra de río que se sostiene, se baja y se suelta.'],
        ['La herida que habla (descenso)', 'Nombrar lo que duele y darle palabras. Una carta escrita a la herida misma — no a la persona que la causó — y un acto de contención.'],
        ['El espejo (encuentro)', 'Mirarse sin máscara y encontrar al que está adentro. Confrontación prolongada con el propio reflejo y un diálogo que no se olvida.'],
        ['Diálogo con las partes (encuentro)', 'Escuchar lo que cada zona del cuerpo guarda: garganta, pecho, estómago, piernas, manos. Un recorrido interoceptivo guiado con escritura.'],
        ['La entrega a la tierra (ascenso)', 'Soltar lo que ya no se necesita cargar. La carta se entierra, una semilla se siembra encima. Donde había dolor, ahora crece algo vivo.'],
        ['El nuevo paso (ascenso)', 'Dar el primer paso como alguien que soltó. La piedra se lava, se convierte en testigo, y el participante camina un camino nuevo frente al grupo.'],
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

      {/* ===== HERO — warm, gestural ===== */}
      <div className="relative overflow-hidden rounded-xl mx-6 lg:mx-0" style={{ minHeight: 280, background: BK }}>
        {/* Warm radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(139,69,19,0.12) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(196,146,106,0.08) 0%, transparent 50%)' }} />
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10 flex flex-col justify-center py-12 px-8" style={{ minHeight: 280 }}>
          <Vortice size={56} color={SIL} opacity={0.75} />
          <div className="flex flex-col mt-5">
            <span style={{ fontFamily: CG, fontSize: 32, fontWeight: 300, color: CR, letterSpacing: 1.5, lineHeight: 1.05 }}>Actos que</span>
            <span style={{ fontFamily: CG, fontSize: 32, fontWeight: 300, color: SIL, letterSpacing: 1.5, lineHeight: 1.05 }}>Mueven</span>
          </div>
          <p className="mt-3 max-w-sm" style={{ fontSize: 14, color: CR, opacity: 0.6, lineHeight: 1.5 }}>
            Taller vivencial · 2 sábados · Junio 2026
          </p>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SIL}, transparent)` }} />
      </div>

      {/* ===== HEADLINE ===== */}
      <div className="px-6 lg:px-0 pt-6 pb-6 max-w-3xl border-t" style={{ borderColor: CR }}>
        <h1 style={{ fontFamily: CG, fontSize: 26, fontWeight: 400, color: BK, letterSpacing: 0.5, lineHeight: 1.3 }}>
          El cuerpo no cambia con lo que entiendes
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: '#555' }}>
          <strong style={{ color: BK }}>Actos que Mueven</strong> es un taller donde no se habla de rituales: se hacen. Dos sábados de actos físicos irreversibles con objetos cotidianos — platos, piedras, espejos, tierra, velas — que el sistema nervioso registra como experiencia real.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed" style={{ color: '#555' }}>
          No necesitas creerlo. No necesitas entenderlo primero. Solo necesitas hacerlo. El cuerpo hace el resto.
        </p>
        <p className="mt-3 text-[14px] italic" style={{ fontFamily: CG, color: SI, lineHeight: 1.6 }}>
          "El cuerpo no distingue entre una experiencia real y una experiencia ritual con suficiente carga sensorial."
        </p>
      </div>

      {/* ===== FECHAS ===== */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex flex-wrap gap-3">
          {[
            { n: 1, fecha: '6 junio', titulo: 'Los 5 Actos' },
            { n: 2, fecha: '20 junio', titulo: 'La Secuencia' },
          ].map((f) => (
            <div key={f.n} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: ARENA }}>
              <span className="text-xl font-bold" style={{ fontFamily: CG, color: SI }}>{f.n}</span>
              <div>
                <p className="text-[14px] font-medium" style={{ color: BK }}>Sábado {f.fecha}</p>
                <p className="text-[12px]" style={{ color: GR }}>{f.titulo} · 10:00 – 18:00 h</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[13px] px-3 py-1 rounded-md" style={{ background: ARENA, color: SI }}>Presencial CDMX</span>
          <span className="text-[13px] px-3 py-1 rounded-md" style={{ background: '#F1EFE8', color: GR }}>Dr. Miguel Ojeda Rios</span>
        </div>
      </div>

      {/* ===== PARA QUIÉN ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="p-6 rounded-xl" style={{ background: ARENA_L, border: `1px solid ${ARENA}` }}>
          <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: SI }}>Para quién</span>
          <p className="mt-2 text-[15px] leading-relaxed" style={{ color: '#555' }}>
            Para cualquier persona que sienta que hay algo que la mente ya entendió pero el cuerpo no soltó. No se requiere formación previa. No se requiere experiencia terapéutica. Solo disposición para hacer.
          </p>
          <p className="mt-2 text-[13px]" style={{ color: GR }}>Todo público · Sin requisitos previos · Formato vivencial</p>
        </div>
      </div>

      {/* ===== PROGRAMA ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[13px] font-medium uppercase tracking-wider" style={{ color: GR }}>Programa</span>
          <div className="h-px flex-1" style={{ background: CR }} />
          <span className="text-[13px]" style={{ color: GR }}>2 módulos · 13 actos</span>
        </div>

        <div className="space-y-4">
          {modulos.map((m, mi) => {
            const isOpen = openMod === mi;
            return (
              <div key={mi} className="rounded-xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: '#fff', border: '1px solid #E8E4DE' }}>
                <button onClick={() => setOpenMod(isOpen ? null : mi)} className="w-full flex items-start gap-4 p-5 text-left">
                  <div className="flex items-center justify-center shrink-0 rounded-lg" style={{ width: 40, height: 40, background: m.accent + '12' }}>
                    <span className="text-base font-bold" style={{ fontFamily: CG, color: m.accent }}>{m.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[15px] font-medium" style={{ fontFamily: S, color: BK }}>{m.titulo}</h2>
                    <p className="text-[13px] mt-0.5" style={{ color: GR }}>Sábado {m.fecha} · {m.temas.length} actos</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: GR }} />
                </button>

                {isOpen && (
                  <div style={{ borderTop: '1px solid #F0EDE6' }}>
                    {m.temas.map(([title, desc], ti) => (
                      <div key={ti} className="flex gap-3 px-5 py-3.5" style={{ borderBottom: ti < m.temas.length - 1 ? '1px solid #F8F6F2' : 'none' }}>
                        <span className="text-[13px] font-medium w-5 text-right shrink-0 pt-0.5" style={{ color: GR }}>{ti + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-[14px] font-medium" style={{ color: BK }}>{title}</h3>
                          <p className="text-[13px] mt-0.5 leading-relaxed" style={{ color: GR }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                    {/* Al terminar */}
                    <div className="px-5 py-3.5" style={{ background: ARENA }}>
                      <p className="text-[13px]" style={{ color: SI }}>
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

      {/* ===== LO QUE REPORTA LA GENTE ===== */}
      <div className="pb-10 -mx-6 lg:mx-0">
        <div className="py-10 px-6" style={{ background: ARENA_L }}>
          <p className="text-center mb-6" style={{ fontFamily: CG, fontSize: 20, fontWeight: 300, color: SI, letterSpacing: 0.5 }}>
            Lo que reporta la gente después
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              'Algo se movió dentro.',
              'Contacté con algo que no podía hacer con la mente.',
              'No necesitaba creerlo. Solo sucedió.',
              'Entré a un terreno inesperado.',
              'Pasé a un nivel de consciencia diferente.',
            ].map((frase, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-[14px] italic"
                style={{
                  fontFamily: CG,
                  color: BK,
                  border: `1px solid ${SI}30`,
                  background: '#fff',
                }}
              >
                "{frase}"
              </span>
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
            { cat: 'Actos y método', accent: SI, items: [
              '5 actos rituales fundamentales para practicar en casa',
              'La Secuencia TAME: 5 pasos para que el acto llegue al cuerpo',
              'Una secuencia progresiva de 6 fases como modelo',
            ]},
            { cat: 'Experiencia', accent: SI, items: [
              'Objetos transformados que te llevas a casa',
              'Canal de seguimiento grupal post-taller',
            ]},
          ].map((group, gi) => (
            <div key={gi} className="p-5 rounded-xl" style={{ background: '#fff', border: '1px solid #E8E4DE' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: group.accent }} />
                <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: group.accent }}>{group.cat}</span>
              </div>
              <div className="mt-2 space-y-2">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: SI }} />
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
        <div className="p-6 rounded-xl flex items-start gap-4" style={{ background: ARENA_L, border: `1px solid ${ARENA}` }}>
          <Vortice size={32} color={SI} opacity={0.6} />
          <div>
            <p className="text-[15px] leading-relaxed" style={{ color: '#555' }}>
              Este taller es parte de <strong style={{ color: BK }}>Ritual Experiencing (RE)</strong> — un método de intervención basado en actos físicos irreversibles que el sistema nervioso registra como experiencia real.
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
          href="https://wa.me/525579076626?text=Hola%2C%20quiero%20inscribirme%20al%20taller%20Actos%20que%20Mueven"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-5 py-4 text-white rounded-xl font-medium text-[15px] transition-opacity hover:opacity-90"
          style={{ background: SI }}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Inscribirme por WhatsApp
        </a>
        <p className="text-center mt-3 text-[13px]" style={{ color: GR }}>
          Presencial · Cupo limitado a 15 personas · Primera generación
        </p>
      </div>

      {/* ===== ENDORSEMENT ===== */}
      <div className="text-center pt-6 pb-4">
        <Vortice size={24} color={GR} opacity={0.5} />
        <p className="mt-1.5" style={{ fontFamily: CG, fontSize: 10, color: GR, letterSpacing: 3, textTransform: 'uppercase' as const }}>
          Instituto Centrobioenergetica
        </p>
      </div>

    </div>
  );
};

export default ActosQueMueven;
