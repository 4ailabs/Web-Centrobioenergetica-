import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const T = '#0F6E56';
const TM = '#5DCAA5';
const TL = '#E1F5EE';
const BK = '#2C2C2A';
const GR = '#888780';
const BG = '#FAF9F6';
const CR = '#E8E6DE';
const CORAL = '#D85A30';
const PURPLE = '#534AB7';
const AMBER = '#BA7517';

const Dipolo = ({ size = 44, color = T }: { size?: number; color?: string }) => (
  <svg width={size} height={size * 0.27} viewBox="0 0 44 12">
    <circle cx="6" cy="6" r="5" fill={color} />
    <line x1="13" y1="6" x2="25" y2="6" stroke={color} strokeWidth="0.8" />
    <circle cx="32" cy="6" r="5" fill={color} opacity="0.35" />
  </svg>
);

const G = "Georgia, 'Times New Roman', serif";
const S = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const RegulacionBioelectrica: React.FC = () => {
  const navigate = useNavigate();
  const [openMod, setOpenMod] = useState<number | null>(0);

  const modulos = [
    {
      n: '1', fecha: '11 de julio', titulo: 'El Cuerpo Eléctrico', accent: T,
      resultado: 'Entiendes por qué el cuerpo es eléctrico y qué significa regular — y puedes explicarlo.',
      temas: [
        ['La matriz extracelular', 'Entre tus células hay un sistema activo con carga eléctrica que regula la comunicación celular, la distribución de iones y el microambiente de cada tejido. Cuando esa carga se altera —por inflamación, acidosis o estrés sostenido— se crean las condiciones para la enfermedad, antes de que aparezcan los síntomas.'],
        ['El voltaje de la célula (Vmem)', 'Cada célula mantiene un voltaje que no es un subproducto del metabolismo: es una señal que le indica qué hacer. Michael Levin, en la Universidad de Tufts, demostró que modificar ese voltaje cambia el comportamiento del tejido sin tocar el ADN.'],
        ['La red bioeléctrica', 'Los tejidos son redes conectadas por gap junctions que comparten información eléctrica; una señal viaja a puntos distantes en cuestión de segundos. Por eso el cuerpo se lee como una red continua, no como puntos sueltos.'],
        ['El órgano como sistema con una meta', 'Cada órgano defiende un punto de calibración. La enfermedad no es un error: es una respuesta que se quedó activa cuando ya no hacía falta. Regular no es corregir el síntoma — es devolverle la señal para recalibrarse.'],
        ['Caso ejemplar: el Ojo Adaptativo', 'Por qué un niño se vuelve miope, leído en cuatro niveles de razonamiento clínico. El caso que muestra, en vivo, cómo cambia la pregunta frente a cualquier paciente.'],
        ['Salud y mantenimiento', 'La Regulación Bioeléctrica sirve tanto para quien está enfermo como para quien quiere mantenerse sano: salutogénesis y carga alostática, el marco de la prevención y el cuidado a largo plazo.'],
      ],
    },
    {
      n: '2', fecha: '25 de julio', titulo: 'La lectura del cuerpo', accent: PURPLE,
      resultado: 'Lees un perfil bioeléctrico, aplicas con seguridad, y trabajas los primeros ejes de regulación.',
      temas: [
        ['El instrumento', 'Qué es el campo magnético estático (0.1–0.5 T) y cómo interactúa con el tejido: los canales iónicos de la membrana, el microambiente de la matriz, y la magnetita del tejido cerebral. Qué hace y qué no. Seguridad, contraindicaciones y límites.'],
        ['El iliopsoas como sensor', 'Este músculo tiene inervación dual —somática y simpática— con fusión fascial con la cadena simpática lumbar y continuidad con el diafragma. Es músculo voluntario y sensor del sistema nervioso autónomo a la vez. El Dr. Ojeda demuestra en vivo cómo se lee la respuesta.'],
        ['Nodo, dipolo y perfil bioeléctrico', 'La nomenclatura del método: el nodo (dónde el estado eléctrico se salió de su rango), el dipolo (dos nodos de la misma red) y el perfil bioeléctrico (el mapa del paciente). Cada tejido tiene su propio rango; no existe un valor universal.'],
        ['Los primeros ejes de regulación', 'El eje del estrés —transversal, el que se atiende primero—, el eje intestinal (barrera y microbiota) y el eje metabólico-energético (los 5 tipos de fatiga). Cómo se leen y cómo se regulan.'],
        ['Prácticas', 'Cada participante realiza la lectura del perfil bioeléctrico y la aplicación con otro compañero, con supervisión directa del Dr. Ojeda.'],
      ],
    },
    {
      n: '3', fecha: '8 de agosto', titulo: 'Los ejes de regulación', accent: AMBER,
      resultado: 'Reconoces los ejes de regulación y priorizas con criterio cuando el paciente presenta varios.',
      temas: [
        ['El eje inflamatorio', 'El sistema inmune y por qué el problema no es inflamar, sino no resolver. Cómo se lee y cómo se regula el estado inflamatorio.'],
        ['El eje de biotransformación', 'El hígado y la carga ambiental. A diferencia de otros ejes, aquí el trabajo es sobre el circuito molecular del órgano, no sobre un nodo bioeléctrico literal.'],
        ['El eje redox', 'La deriva oxidativa del medio interno: el eje de fondo, el del largo plazo, y cómo cuidarlo.'],
        ['El criterio clínico', 'Perfiles combinados y jerarquía: cuál eje se atiende primero y por qué. Este es el módulo que te da criterio para trabajar con orden y sin dispersarte.'],
        ['Prácticas', 'Sesión completa supervisada: lectura del perfil bioeléctrico y aplicación, en dos rondas.'],
      ],
    },
    {
      n: '4', fecha: '22 de agosto', titulo: 'La sesión completa', accent: CORAL,
      resultado: 'Conduces una sesión completa, ofreces planes de mantenimiento, y documentas tu trabajo.',
      temas: [
        ['La sesión de mantenimiento', 'El mantenimiento como formato clínico propio: periodicidad, lenguaje al paciente, registro por eje. La persona sana también se atiende (salutogénesis aplicada).'],
        ['Casos clínicos', 'El Dr. Ojeda presenta casos reales anonimizados. Los participantes proponen su lectura e interpretación, y se discute en grupo la integración de los ejes.'],
        ['Estrategias y mapas', 'Integración de los ejes de regulación en el paciente real: cómo combinar y priorizar, leyendo el mapa completo del perfil bioeléctrico.'],
        ['Supervisión en vivo', 'Sesiones completas de RB frente al grupo, con supervisión en tiempo real del Dr. Ojeda: puede interrumpir, corregir y ampliar.'],
        ['Documentación profesional', 'Cómo escribir un reporte de sesión que un médico pueda leer y respetar, y cómo explicar la Regulación Bioeléctrica a otros profesionales de la salud.'],
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

      {/* ===== HERO — imagen + overlay ===== */}
      <div className="relative overflow-hidden rounded-xl mx-6 lg:mx-0" style={{ minHeight: 240 }}>
        <img src="/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.png" alt="Mapa bioeléctrico del cuerpo — Regulación Bioeléctrica" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,31,0.7) 0%, rgba(13,27,31,0.3) 100%)' }} />
        <div className="relative z-10 flex flex-col justify-center py-10 px-8" style={{ minHeight: 240 }}>
          <Dipolo size={48} color="#5DCAA5" />
          <div className="flex flex-col mt-4">
            <span style={{ fontFamily: G, fontSize: 24, color: '#E8E6DE', letterSpacing: 1.5 }}>Regulación</span>
            <span style={{ fontFamily: G, fontSize: 24, color: '#5DCAA5', letterSpacing: 1.5 }}>Bioeléctrica</span>
          </div>
          <p className="mt-2 max-w-sm" style={{ fontSize: 12, color: '#E8E6DE', opacity: 0.7, lineHeight: 1.5 }}>
            Formación profesional · 4 sábados · Julio–Agosto 2026
          </p>
        </div>
      </div>

      {/* ===== HEADLINE + LINK AL MÉTODO ===== */}
      <div className="px-6 lg:px-0 pt-5 pb-6 max-w-3xl border-t" style={{ borderColor: '#E8E6DE' }}>
        <h1 style={{ fontFamily: G, fontSize: 22, color: BK, letterSpacing: 0.5, lineHeight: 1.3 }}>
          El Cuerpo <span style={{ color: T }}>Eléctrico</span>
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
          Formación profesional en <strong style={{ color: BK }}>Regulación Bioeléctrica (RB)</strong> — un método de evaluación y regulación del estado bioeléctrico de los tejidos del cuerpo humano mediante campos magnéticos estáticos, con fundamento en la ciencia contemporánea de la bioelectricidad (Robert Becker; Michael Levin, Tufts; publicado en revistas como <em>Cell</em>, <em>Frontiers</em> y <em>PNAS</em>).
        </p>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
          En 4 sábados aprendes a leer el perfil bioeléctrico del cuerpo, a razonar por <strong style={{ color: BK }}>ejes de regulación</strong>, y a aplicar con criterio y seguridad — documentando tu trabajo en lenguaje que cualquier médico pueda leer. Desde cero, con práctica supervisada por el Dr. Miguel Ojeda Rios.
        </p>
        <button onClick={() => navigate('/rb')} className="mt-3 flex items-center gap-1.5 text-sm font-medium" style={{ color: T }}>
          Conoce el método detrás de este curso
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* ===== FECHAS — prominentes ===== */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex flex-wrap gap-3">
          {['11 julio', '25 julio', '8 agosto', '22 agosto'].map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: TL }}>
              <span className="text-lg font-bold" style={{ fontFamily: G, color: T }}>{i + 1}</span>
              <div>
                <p className="text-[12px] font-medium" style={{ color: BK }}>Sábado {f}</p>
                <p className="text-[10px]" style={{ color: GR }}>10:00 – 18:00 h</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-md" style={{ background: TL, color: T }}>Presencial CDMX</span>
          <span className="text-[11px] px-2.5 py-1 rounded-md" style={{ background: TL, color: T }}>En línea en vivo</span>
          <span className="text-[11px] px-2.5 py-1 rounded-md" style={{ background: '#F1EFE8', color: GR }}>Dr. Miguel Ojeda Rios</span>
        </div>
      </div>

      {/* ===== MODALIDADES — dos columnas ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl" style={{ background: '#fff', border: `1.5px solid ${T}30` }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: T }}>Empiezas de cero</span>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
              No necesitas conocimientos previos. Aprendes la Regulación Bioeléctrica desde los fundamentos, con el marco científico actualizado. Al terminar, conduces sesiones completas.
            </p>
            <p className="mt-2 text-[11px]" style={{ color: GR }}>Requisitos: ninguno</p>
          </div>
          <div className="p-5 rounded-xl" style={{ background: '#fff', border: `1.5px solid ${T}30` }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: T }}>Ya trabajas el cuerpo</span>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#555' }}>
              Ganas el porqué y el método que le falta a tu oficio: el fundamento científico, el razonamiento por ejes de regulación, y la forma de comunicar tu trabajo profesionalmente.
            </p>
            <p className="mt-2 text-[11px]" style={{ color: GR }}>Requisitos: ninguno · experiencia previa deseable, no indispensable</p>
          </div>
        </div>
      </div>

      {/* ===== PROGRAMA — no accordion, sino cards abiertas ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: GR }}>Programa</span>
          <div className="h-px flex-1" style={{ background: CR }} />
          <span className="text-[11px]" style={{ color: GR }}>4 módulos · 21 temas</span>
        </div>

        <div className="space-y-4">
          {modulos.map((m, mi) => {
            const isOpen = openMod === mi;
            return (
              <div key={mi} className="rounded-xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: '#fff', border: '1px solid #E8E4DE' }}>
                <button onClick={() => setOpenMod(isOpen ? null : mi)} className="w-full flex items-start gap-4 p-5 text-left">
                  <div className="flex items-center justify-center shrink-0 rounded-lg" style={{ width: 36, height: 36, background: m.accent + '12' }}>
                    <span className="text-sm font-bold" style={{ fontFamily: G, color: m.accent }}>{m.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[13px] font-medium" style={{ fontFamily: S, color: BK }}>{m.titulo}</h2>
                    <p className="text-[11px] mt-0.5" style={{ color: GR }}>Sábado {m.fecha} · {m.temas.length} temas</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: GR }} />
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid #F0EDE6` }}>
                    {m.temas.map(([title, desc], ti) => (
                      <div key={ti} className="flex gap-3 px-5 py-3" style={{ borderBottom: ti < m.temas.length - 1 ? '1px solid #F8F6F2' : 'none' }}>
                        <span className="text-[11px] font-medium w-4 text-right shrink-0 pt-0.5" style={{ color: GR }}>{ti + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-[12px] font-medium" style={{ color: BK }}>{title}</h3>
                          <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: GR }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                    {/* Al terminar */}
                    <div className="px-5 py-3" style={{ background: TL }}>
                      <p className="text-xs" style={{ color: T }}>
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

      {/* ===== LO QUE RECIBES — grid, no lista ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: GR }}>Lo que recibes</span>
          <div className="h-px flex-1" style={{ background: CR }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cat: 'Materiales', accent: T, items: ['Manual del Cuerpo Eléctrico', 'Fichas clínicas de los ejes de regulación', 'Biblioteca de grabaciones de los módulos'] },
            { cat: 'Método', accent: PURPLE, items: ['Protocolo de lectura del perfil bioeléctrico', 'Guía de aplicación con seguridad', 'Guía de documentación clínica'] },
            { cat: 'Evidencia', accent: AMBER, items: ['Tabla de evidencia científica del mecanismo'] },
            { cat: 'Comunidad', accent: CORAL, items: ['Certificación del Instituto Centrobioenergetica', 'Grupo de supervisión mensual con el Dr. Ojeda'] },
          ].map((group, gi) => (
            <div key={gi} className="p-4 rounded-xl" style={{ background: '#fff', border: '1px solid #E8E4DE' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: group.accent }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: group.accent }}>{group.cat}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: T }} />
                    <span className="text-xs leading-relaxed" style={{ color: '#555' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="px-6 lg:px-0 pb-6">
        <a
          href="https://wa.me/525579076626?text=Hola%2C%20quiero%20inscribirme%20al%20curso%20de%20Regulaci%C3%B3n%20Bioel%C3%A9ctrica"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
          style={{ background: T }}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Inscribirme por WhatsApp
        </a>
        <p className="text-center mt-3 text-[11px]" style={{ color: GR }}>
          Presencial y en línea · Primera generación RB
        </p>
      </div>

      {/* ===== ENDORSEMENT ===== */}
      <div className="text-center pt-6 pb-4">
        <Dipolo size={24} color={GR} />
        <p className="mt-1.5" style={{ fontFamily: G, fontSize: 9, color: GR, letterSpacing: 3, textTransform: 'uppercase' as const }}>
          Instituto Centrobioenergetica
        </p>
      </div>

    </div>
  );
};

export default RegulacionBioelectrica;
