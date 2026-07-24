import React from 'react';
import ProgramPage from '../components/ProgramPage';

// RE Brand Colors (solo usados dentro del heroElement)
const SI = '#8B4513';
const SIL = '#C4926A';
const BK = '#2C2C2A';
const CR = '#E8E6DE';
const CG = "'Cormorant Garamond', Georgia, serif";

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

const heroElement = (
  <div>
    {/* Hero — warm, gestural, con imagen del taller */}
    <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 280, background: BK }}>
      <img
        src="/images/courses/actos-que-mueven/ritual_2.webp"
        alt="Actos que Mueven"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      />
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
          Taller vivencial · Impartido en junio 2026 · Grabación disponible
        </p>
      </div>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${SIL}, transparent)` }} />
    </div>

    {/* Lo que reporta la gente después */}
    <div className="mt-6 py-8 px-6 rounded-xl" style={{ background: '#F7F0E8' }}>
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
            style={{ fontFamily: CG, color: BK, border: `1px solid ${SI}30`, background: '#fff' }}
          >
            "{frase}"
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ActosQueMueven: React.FC = () => (
  <ProgramPage
    titulo="Actos que Mueven"
    slogan="El cuerpo no cambia con lo que entiendes"
    hook="Actos que Mueven es un taller donde no se habla de rituales: se hacen. Dos sábados de actos físicos irreversibles con objetos cotidianos — platos, piedras, espejos, tierra, velas — que el sistema nervioso registra como experiencia real. No necesitas creerlo. No necesitas entenderlo primero. Solo necesitas hacerlo. El cuerpo hace el resto."
    frase='"El cuerpo no distingue entre una experiencia real y una experiencia ritual con suficiente carga sensorial."'
    badge="Grabación disponible"
    fechas="Grabación completa disponible"
    modalidad="Online · A tu ritmo"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={[
      'Impartido en junio 2026 · Presencial CDMX',
      '2 sábados completos · 10:00 – 18:00 h',
      '2 módulos · 13 actos',
      'Primera generación',
    ]}
    heroElement={heroElement}
    titleFont="'Cormorant Garamond', Georgia, serif"
    accentColor="#8B4513"
    paraQuien={{
      texto: 'Para cualquier persona que sienta que hay algo que la mente ya entendió pero el cuerpo no soltó. No se requiere formación previa. No se requiere experiencia terapéutica. Solo disposición para hacer.',
      nota: 'Todo público · Sin requisitos previos · Formato vivencial',
    }}
    modulos={[
      {
        numero: '1',
        fecha: 'Grabación',
        titulo: 'Los 5 Actos Fundamentales',
        resultado: 'Tienes 5 actos rituales que puedes repetir en casa — y entiendes por qué funcionan.',
        bloques: [
          { time: '', title: 'Apertura y secuencia TAME', desc: 'Encuadre del taller, reglas del espacio y los 5 pasos que hacen que un acto ritual llegue al sistema nervioso en lugar de quedarse en la mente.' },
          { time: '', title: 'Romper y reparar', desc: 'Para cuando algo te impactó con tanta fuerza que las piezas de la experiencia se separaron. Un acto con cerámica, quiebre y reparación con pegamento dorado (kintsugi).' },
          { time: '', title: 'Lo que nunca se dijo', desc: 'Para cuando la voz fue silenciada y lo no dicho se acumuló en la garganta. Un acto con escritura, voz y una botella que guarda y después libera.' },
          { time: '', title: 'Ponerse de pie', desc: 'Para cuando aprendiste a hacerte pequeño para no ser blanco. Un acto frente al espejo que trabaja la postura, el tamaño real y la presencia.' },
          { time: '', title: 'La cara que construí', desc: 'Para cuando construiste una cara para el mundo porque mostrar la real parecía peligroso. Un acto con máscara, espejo y la decisión de quitársela.' },
          { time: '', title: 'El primer bocado', desc: 'Para cuando todo se apagó por dentro. Un acto en la oscuridad con vela, luz y alimento que trabaja con la depleción y el reencendido.' },
        ],
      },
      {
        numero: '2',
        fecha: 'Grabación',
        titulo: 'La Secuencia que Transforma',
        resultado: 'Viviste una secuencia completa de descenso, encuentro y ascenso — y te llevas los objetos transformados.',
        bloques: [
          { time: '', title: 'Reencuentro', desc: 'Revisión de lo que se movió en las dos semanas entre módulos. Qué acto repitieron, qué notaron, qué apareció en el cuerpo y en la vida cotidiana.' },
          { time: '', title: 'El peso (descenso)', desc: 'Entrar al cuerpo tal como está, con todo lo que carga. Un acto con piedra de río que se sostiene, se baja y se suelta.' },
          { time: '', title: 'La herida que habla (descenso)', desc: 'Nombrar lo que duele y darle palabras. Una carta escrita a la herida misma — no a la persona que la causó — y un acto de contención.' },
          { time: '', title: 'El espejo (encuentro)', desc: 'Mirarse sin máscara y encontrar al que está adentro. Confrontación prolongada con el propio reflejo y un diálogo que no se olvida.' },
          { time: '', title: 'Diálogo con las partes (encuentro)', desc: 'Escuchar lo que cada zona del cuerpo guarda: garganta, pecho, estómago, piernas, manos. Un recorrido interoceptivo guiado con escritura.' },
          { time: '', title: 'La entrega a la tierra (ascenso)', desc: 'Soltar lo que ya no se necesita cargar. La carta se entierra, una semilla se siembra encima. Donde había dolor, ahora crece algo vivo.' },
          { time: '', title: 'El nuevo paso (ascenso)', desc: 'Dar el primer paso como alguien que soltó. La piedra se lava, se convierte en testigo, y el participante camina un camino nuevo frente al grupo.' },
        ],
      },
    ]}
    entregables={[]}
    entregableGroups={[
      {
        titulo: 'Actos y método',
        items: [
          '5 actos rituales fundamentales para practicar en casa',
          'La Secuencia TAME: 5 pasos para que el acto llegue al cuerpo',
          'Una secuencia progresiva de 6 fases como modelo',
        ],
      },
      {
        titulo: 'Experiencia',
        items: [
          'Objetos transformados que te llevas a casa',
          'Canal de seguimiento grupal post-taller',
        ],
      },
    ]}
    metodo={{
      texto: 'Este taller es parte de Ritual Experiencing (RE) — un método de intervención basado en actos físicos irreversibles que el sistema nervioso registra como experiencia real.',
      nota: 'Desarrollado por el Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica',
    }}
    whatsappMsg="Hola, quiero pedir acceso a la grabación del taller Actos que Mueven"
    ctaLabel="Pedir acceso a la grabación"
    notaCta="Grabación de la primera generación · Impartido en junio 2026"
  />
);

export default ActosQueMueven;
