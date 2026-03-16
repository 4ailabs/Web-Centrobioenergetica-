import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const Dipolo = ({ color = '#0F6E56', size = 44 }: { color?: string; size?: number }) => (
  <svg width={size} height={size * 0.27} viewBox="0 0 44 12" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5" fill={color} />
    <line x1="13" y1="6" x2="25" y2="6" stroke={color} strokeWidth="0.8" />
    <circle cx="32" cy="6" r="5" fill={color} opacity="0.35" />
  </svg>
);

const C = {
  teal: '#0F6E56', tealMid: '#5DCAA5', tealLight: '#E1F5EE',
  black: '#2C2C2A', cream: '#E8E6DE', grey: '#888780',
  coral: '#D85A30', purple: '#534AB7', amber: '#BA7517',
  greyLight: '#F1EFE8', bg: '#FAF9F6',
};

const RBMetodo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>

      {/* Back */}
      <div className="px-6 lg:px-0 pt-6 pb-2">
        <button onClick={() => navigate(-1 as any)} className="flex items-center gap-2 text-neutral-400 hover:transition-colors text-sm" style={{ ['--tw-text-opacity' as any]: 1 }} onMouseEnter={(e) => (e.currentTarget.style.color = C.teal)} onMouseLeave={(e) => (e.currentTarget.style.color = '#a3a3a3')}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>
      </div>

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden" style={{ background: C.bg, minHeight: 400 }}>
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice">
          {[[80,60,2.5,0.06],[150,140,3,0.08],[95,200,2,0.05],[170,350,2.5,0.07],[60,380,2,0.05],[250,420,3,0.06],
            [1020,50,2,0.05],[1100,120,2.8,0.07],[1050,200,2,0.04],[1140,280,3,0.08],[1080,380,2.5,0.06],[950,350,2.2,0.06],
            [350,40,1.5,0.03],[850,30,1.8,0.03],[400,450,1.5,0.03],[800,460,2,0.03]
          ].map(([cx,cy,r,o], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={C.teal} opacity={o} />)}
          {[[80,60,150,140],[150,140,95,200],[170,350,60,380],[170,350,250,420],
            [1020,50,1100,120],[1100,120,1050,200],[1140,280,1080,380],[950,350,1080,380]
          ].map(([x1,y1,x2,y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.teal} strokeWidth="0.5" opacity="0.04" />)}
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-center py-14 px-6" style={{ minHeight: 400 }}>
          <Dipolo size={64} />
          <div className="flex flex-col items-center gap-0.5 mt-6">
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: C.black, letterSpacing: 1.5 }}>Regulación</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: C.teal, letterSpacing: 1.5 }}>bioeléctrica</span>
          </div>
          <p className="text-center max-w-md mt-4" style={{ fontSize: 13, color: C.grey, lineHeight: 1.6 }}>
            Evaluación y regulación del estado bioeléctrico de los tejidos del cuerpo humano con campos magnéticos estáticos.
          </p>
          <div style={{ width: 48, height: 1, background: C.teal, opacity: 0.3, marginTop: 20 }} />
          <div className="flex gap-3 mt-5">
            <button onClick={() => navigate('/regulacion-bioelectrica')} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: C.teal }}>
              Formación en RB
            </button>
            <a href="#que-es" className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:border-neutral-400 transition-colors" style={{ borderColor: '#C8C4BE', color: C.black }}>
              Conocer el método
            </a>
          </div>
          <span className="mt-5" style={{ fontFamily: 'Georgia, serif', fontSize: 9, color: C.grey, letterSpacing: 3, textTransform: 'uppercase' as const }}>
            Instituto Centrobioenergetica
          </span>
        </div>
      </div>

      {/* ===== QUÉ ES RB — para alguien que no sabe nada ===== */}
      <div id="que-es" className="px-6 lg:px-0 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>¿Qué es?</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="space-y-4 max-w-2xl">
          <p className="text-[14px] leading-relaxed" style={{ color: C.black }}>
            Tu cuerpo es un sistema eléctrico. Cada célula tiene un voltaje. Cada tejido forma una red de células que comparten información eléctrica entre sí. Cuando esa red funciona bien, el cuerpo se mantiene sano. Cuando se desregula, aparecen las condiciones para la enfermedad — muchas veces antes de que cualquier estudio de laboratorio lo detecte.
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: '#555' }}>
            La <strong style={{ color: C.black }}>Regulación Bioeléctrica (RB)</strong> es un procedimiento que permite dos cosas: <strong style={{ color: C.teal }}>leer</strong> el estado eléctrico de tus tejidos y <strong style={{ color: C.teal }}>facilitar</strong> que regresen a su estado óptimo. Se hace con campos magnéticos estáticos — imanes de uso clínico aplicados sobre puntos específicos del cuerpo.
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: '#555' }}>
            No es un diagnóstico médico. No identifica enfermedades ni microorganismos. Lo que hace es mapear dónde tu cuerpo está desregulado y ayudarlo a regularse. Es complementario a la medicina convencional, nunca sustituto.
          </p>
        </div>
      </div>

      {/* ===== CÓMO FUNCIONA — 3 pasos ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Cómo funciona</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: '1', title: 'Rastreo', color: C.teal, desc: 'El terapeuta pasa un imán por las distintas regiones de tu cuerpo. Cuando encuentra una zona desregulada, un reflejo muscular lo señala. Así se construye un mapa de tu estado bioeléctrico — individualizado, de ese momento.' },
            { n: '2', title: 'Impactación', color: C.purple, desc: 'Se colocan dos imanes de polaridad opuesta sobre los puntos identificados. Esto modifica las condiciones del microambiente del tejido — pH, distribución de iones, voltaje celular — y facilita que regrese a su rango óptimo.' },
            { n: '3', title: 'Seguimiento', color: C.amber, desc: 'Se registra el perfil bioeléctrico de cada sesión. En la siguiente, se compara: ¿qué zonas mejoraron? ¿Cuáles persisten? El seguimiento es medible y documentable — no depende de la percepción subjetiva.' },
          ].map((step, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: step.color + '12' }}>
                  <span className="text-sm font-bold" style={{ fontFamily: 'Georgia, serif', color: step.color }}>{step.n}</span>
                </div>
                <h3 className="text-[14px] font-semibold" style={{ color: C.black }}>{step.title}</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== POR QUÉ ES DIFERENTE — sin ser defensivo ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Qué lo hace diferente</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="space-y-3">
          {[
            { title: 'Lectura por regiones', color: C.teal, desc: 'El cuerpo se explora en 10 regiones anatómicas. No solo puntos memorizados — territorios completos. Esto permite detectar desregulaciones que no están en ningún catálogo.' },
            { title: 'Perfil individualizado', color: C.purple, desc: 'Dos personas con el mismo síntoma pueden tener mapas bioeléctricos completamente diferentes. El perfil es tuyo, no genérico.' },
            { title: 'No solo para enfermos', color: C.amber, desc: 'Un deportista puede usarlo para optimizar. Una persona sana para prevenir. No necesitas estar enfermo para saber cómo está tu terreno bioeléctrico.' },
            { title: 'Documentable', color: C.coral, desc: 'Cada sesión genera un registro: cuántos nodos, en qué regiones, qué densidad. Se puede comparar entre sesiones. Es seguimiento real, no percepción.' },
            { title: 'Comunicable', color: C.teal, desc: 'El reporte de una sesión de RB usa lenguaje que cualquier médico puede leer. Eso permite colaboración con otros profesionales de salud.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors">
              <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: item.color }} />
              <div>
                <span className="text-[13px] font-medium" style={{ color: C.black }}>{item.title}</span>
                <span className="text-[13px]" style={{ color: '#555' }}> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PARA QUIÉN ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Para quién</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Si eres paciente', color: C.teal, desc: 'Puedes solicitar una sesión de RB como complemento a tu tratamiento médico. El terapeuta te explica en lenguaje claro qué encontró y qué se hizo. Sin jerga, sin promesas.' },
            { title: 'Si eres profesional de salud', color: C.purple, desc: 'RB es una herramienta que puedes integrar a tu práctica. El fundamento está publicado en revistas indexadas. No necesitas creer en nada — la evidencia está disponible.' },
            { title: 'Si quieres aprender', color: C.amber, desc: 'El curso "El Cuerpo Eléctrico" te forma en RB en 4 sábados. No necesitas experiencia previa. Abierto a cualquier persona interesada.' },
            { title: 'Si ya rastrean', color: C.coral, desc: 'Lo que haces funciona. RB te da el marco biofísico para explicar por qué, el rastreo por regiones para ver más, y el lenguaje para comunicarlo profesionalmente.' },
          ].map((card, i) => (
            <div key={i} className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
                <h3 className="text-[13px] font-semibold" style={{ color: C.black }}>{card.title}</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BASE CIENTÍFICA — como dato, no como defensa ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Base científica</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          {[
            { desc: 'Los campos magnéticos estáticos interactúan con canales iónicos de la membrana celular', ref: 'Wu et al., 2022 · Physical Review Applied' },
            { desc: 'El voltaje de una célula determina su comportamiento — no solo su genética', ref: 'Levin, 2012–2025 · Cell · Development · BioEssays' },
            { desc: 'El cerebro humano contiene cristales de magnetita que responden a campos magnéticos', ref: 'Kirschvink, 1992 · PNAS' },
            { desc: 'Una señal bioeléctrica viaja entre extremidades del cuerpo en aproximadamente 30 segundos', ref: 'Busse et al., 2018 · Development' },
          ].map((item, i) => (
            <div key={i} className={`px-4 py-3.5 ${i > 0 ? 'border-t border-neutral-100 dark:border-neutral-700' : ''}`}>
              <p className="text-[13px]" style={{ color: C.black }}>{item.desc}</p>
              <p className="text-[11px] mt-0.5" style={{ color: C.grey }}>{item.ref}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LA HERRAMIENTA: LOS IMANES ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>La herramienta</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 max-w-2xl">
          <p className="text-[14px] leading-relaxed mb-3" style={{ color: C.black }}>
            RB utiliza imanes de neodimio de uso clínico — campos magnéticos estáticos en el rango de 0.1 a 0.5 Tesla. Son instrumentos biofísicos con efectos documentados sobre la membrana celular, los canales iónicos y la matriz extracelular.
          </p>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#555' }}>
            Se aplican en pares de polaridad opuesta sobre los nodos que el rastreo identificó. Un polo norte y un polo sur, colocados simultáneamente. La impactación dura entre 15 y 30 minutos por par. Es el gesto clínico central de RB — y lo que aprenderás a ejecutar en la formación.
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: '#555' }}>
            Los imanes son la herramienta. Lo que los hace útiles es saber dónde colocarlos, por qué en ese punto, y qué efecto esperar. Eso es lo que enseña el curso.
          </p>
        </div>
      </div>

      {/* ===== QUÉ VAS A APRENDER — Fundamentos ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Qué vas a entender</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-[13px] font-semibold mb-2" style={{ color: C.black }}>La matriz extracelular como sistema eléctrico</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
              Entre las células hay un sistema activo con carga eléctrica negativa que regula la comunicación celular, la distribución de iones y el microambiente de cada tejido. Cuando esa carga se altera, se crean condiciones favorables para la enfermedad — muchas veces antes de que aparezcan síntomas. Entender esto es la base de lo que vas a hacer como terapeuta de RB.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-[13px] font-semibold mb-2" style={{ color: C.black }}>El voltaje celular como señal instructiva</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
              Cada célula tiene un voltaje que determina su comportamiento — no solo su genética. Investigadores de Tufts University lo han demostrado: modificar el voltaje de un grupo de células cambia lo que hacen, sin tocar su ADN. Cuando impactas con imanes, estás influyendo en esa señal. Saber esto te permite explicar a cualquier médico lo que haces y por qué.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-[13px] font-semibold mb-2" style={{ color: C.black }}>Las redes bioeléctricas y por qué existen los pares</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
              Los tejidos son redes de células conectadas que comparten información eléctrica. Cuando una zona se desregula, la señal viaja por la red a puntos distantes. Por eso el rastreo encuentra pares: dos nodos de la misma red con estados bioeléctricos diferentes. Esto es lo que vas a detectar y corregir.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-[13px] font-semibold mb-2" style={{ color: C.black }}>Cada tejido tiene su rango — no hay un número universal</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.grey }}>
              La sangre, el músculo, el estómago, el pulmón — cada uno tiene su rango óptimo diferente. No existe un "valor normal" único para todo el cuerpo. La impactación facilita que cada tejido regrese a su rango propio. Aprender a respetar esa especificidad es parte fundamental de la formación.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PREGUNTAS FRECUENTES ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Preguntas frecuentes</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>

        <div className="space-y-2 max-w-2xl">
          {[
            {
              q: '¿Necesito ser médico para aprender RB?',
              a: 'No. La formación está abierta a cualquier persona. Si eres profesional de salud, lo integras a tu práctica. Si no lo eres, adquieres una herramienta profesional con la que puedes empezar a ejercer.'
            },
            {
              q: '¿En qué se diferencia de otros cursos de biomagnetismo?',
              a: 'La técnica es la misma: rastreo e impactación con imanes. Lo que cambió es el fundamento — de "pH y resonancia vibracional" a matriz extracelular, voltaje celular y redes bioeléctricas. Publicado en revistas indexadas. Además, RB incluye el rastreo por 10 regiones anatómicas, que no se enseña en la formación clásica.'
            },
            {
              q: 'Ya tomé un curso de Par Biomagnético. ¿Me sirve?',
              a: 'Sí. No repites lo que ya sabes. Vienes por el marco biofísico que te faltaba, el rastreo por regiones, y la forma de comunicar tu trabajo profesionalmente. Hay una modalidad de actualización diseñada para ti.'
            },
            {
              q: '¿Puedo ejercer al terminar?',
              a: 'Sí. Al completar los 4 módulos recibes certificación del Instituto, protocolos, atlas de puntos por regiones, y acceso al grupo de supervisión mensual. Sales con todo lo necesario para hacer sesiones completas.'
            },
            {
              q: '¿El curso es presencial o en línea?',
              a: 'Ambos. Presencial en Ciudad de México (15 lugares) y en línea en vivo (cupo abierto). Ambas modalidades reciben el mismo contenido y certificación. La práctica de rastreo presencial se coordina en sesiones complementarias para alumnos en línea.'
            },
            {
              q: '¿Tiene base científica real?',
              a: 'Los mecanismos por los cuales un campo magnético interactúa con los tejidos están publicados en Physical Review Applied, Cell, PNAS y Development. Lo que aún falta por verificar es la configuración específica de dos imanes opuestos simultáneos. Eso lo decimos abiertamente — la honestidad sobre lo que no sabemos es parte de la formación.'
            },
            {
              q: '¿Qué relación tiene con el Dr. Goiz y el Par Biomagnético?',
              a: 'Conservamos la técnica clínica del Dr. Goiz íntegramente. Actualizamos el marco teórico con la ciencia disponible hoy. El Dr. Ojeda fue el único que Goiz autorizó para dar el diplomado en la Universidad Autónoma Chapingo. RB es la evolución natural del biomagnetismo.'
            },
          ].map((item, i) => (
            <details key={i} className="group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-[13px] font-medium" style={{ color: C.black }}>{item.q}</span>
                <ChevronDown className="w-4 h-4 shrink-0 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 -mt-1">
                <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ===== DR. OJEDA ===== */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: C.grey }}>Desarrollado por</span>
          <div className="h-px flex-1" style={{ background: C.cream }} />
        </div>
        <p className="text-[13px] leading-relaxed max-w-2xl" style={{ color: '#555' }}>
          <strong style={{ color: C.black }}>Dr. Miguel Ojeda Rios</strong> — Médico cirujano. 25 años en medicina integrativa. 2,800 terapeutas formados. Único autorizado por el Dr. Goiz para el diplomado de biomagnetismo en la Universidad Autónoma Chapingo.
        </p>
      </div>

      {/* ===== CTA AL CURSO ===== */}
      <div id="programa" className="px-6 lg:px-0 pb-10">
        <div
          onClick={() => navigate('/regulacion-bioelectrica')}
          className="group cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 transition-colors overflow-hidden"
          style={{ background: C.tealLight }}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Dipolo size={36} />
              <span className="px-2 py-0.5 text-white text-[10px] font-medium rounded-full" style={{ background: C.teal }}>Julio–Agosto 2026</span>
            </div>
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-base font-normal mb-1">
              <span style={{ color: C.black }}>El Cuerpo </span><span style={{ color: C.teal }}>Eléctrico</span>
            </h2>
            <p className="text-xs mb-1" style={{ color: C.grey }}>Formación en RB · 4 sábados · Presencial y en línea</p>
            <p className="text-xs mb-3" style={{ color: C.grey }}>$2,000 MXN por módulo · $7,200 pago único</p>
            <div className="flex items-center gap-1 text-sm font-medium" style={{ color: C.teal }}>
              Ver programa completo <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== ENDORSEMENT ===== */}
      <div className="px-6 lg:px-0 text-center pb-4">
        <Dipolo size={28} color={C.grey} />
        <p className="mt-2" style={{ fontFamily: 'Georgia, serif', fontSize: 9, color: C.grey, letterSpacing: 3, textTransform: 'uppercase' as const }}>
          Instituto Centrobioenergetica
        </p>
      </div>

    </div>
  );
};

export default RBMetodo;
