import React from 'react';
import ProgramPage from '../components/ProgramPage';

// Fuentes y colores del hero (solo se usan dentro del heroElement)
const CG = "'Cormorant Garamond', Georgia, serif";
const HERO_BG = '#2C2C2A';
const HERO_TEXT = '#E8EEF4';
const HERO_AZL = '#7A8FA8';

// Símbolo de onda / diapasón
const OndaSvg = ({ size = 40, color = HERO_AZL, opacity = 0.8 }: { size?: number; color?: string; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M10 40 Q20 20 30 40 Q40 60 50 40 Q60 20 70 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity={opacity} />
    <circle cx="40" cy="40" r="3" fill={color} opacity={opacity * 0.6} />
  </svg>
);

// Hero oscuro característico de Resonantia (siempre oscuro, independiente del modo)
const heroElement = (
  <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 280, background: HERO_BG }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 25% 60%, rgba(26,58,92,0.25) 0%, transparent 65%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 30%, rgba(74,127,165,0.12) 0%, transparent 50%)' }} />
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
    }} />
    <div className="relative z-10 flex flex-col justify-center py-12 px-8" style={{ minHeight: 280 }}>
      <OndaSvg size={52} color={HERO_AZL} opacity={0.85} />
      <div className="flex flex-col mt-5">
        <span style={{ fontFamily: CG, fontSize: 36, fontWeight: 300, color: HERO_TEXT, letterSpacing: 3, lineHeight: 1.05 }}>RESONANTIA</span>
        <span style={{ fontFamily: CG, fontSize: 16, fontWeight: 300, color: HERO_AZL, letterSpacing: 2, lineHeight: 1.4, marginTop: 6 }}>Diapasones Terapéuticos</span>
      </div>
      <p className="mt-4 max-w-sm" style={{ fontSize: 14, color: HERO_TEXT, opacity: 0.55, lineHeight: 1.5 }}>
        Taller completo · Grabación disponible · A tu ritmo
      </p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${HERO_AZL}, transparent)` }} />
  </div>
);

const modulos = [
  {
    numero: '1',
    fecha: 'Grabación',
    titulo: 'Fundamentos',
    bloques: [
      { time: '', title: 'El sonido como intervención biológica', desc: 'El nervio vago, la teoría polivagal y cómo la vibración de baja frecuencia activa el sistema parasimpático. Explicado desde la medicina, no desde la música.' },
      { time: '', title: 'El diapasón 128 Hz: tu herramienta', desc: 'Los 6 puntos del cuerpo: esternón, clavícula, mastoides, sacro, rodillas, muñecas. Cómo activarlo, cómo colocarlo, cuánto tiempo.' },
      { time: '', title: 'Demostración del arsenal completo', desc: 'Espectro Solar Armónico, Auto 64 Hz, Auto 32 Hz, diapasones largos y campanas tibetanas. Los participantes reciben el baño de sonido completo.' },
      { time: '', title: 'Tu voz como diapasón', desc: 'Humming en 4 zonas del cuerpo. Vocal toning. Voz + diapasón simultáneos. El 80% del efecto vibratorio se logra sin instrumento.' },
    ],
  },
  {
    numero: '2',
    fecha: 'Grabación',
    titulo: 'Los 3 Protocolos de Vibración',
    bloques: [
      { time: '', title: 'Estructura de intervención con diapasón', desc: 'Una secuencia de 5 pasos que convierte el sonido en intervención directa sobre el sistema nervioso. Sin estructura, el diapasón es solo sonido bonito.' },
      { time: '', title: 'Protocolo 1: El Intervalo que Te Falta', desc: 'Autoaplicación. Un diapasón, una secuencia guiada, evidencia física de lo que se movió. Para uso personal, en casa, sin acompañante.' },
      { time: '', title: 'Protocolo 2: El Concierto del Cuerpo', desc: 'Trabajo en parejas para terapeutas. Secuencia completa de evaluación e intervención sobre otro cuerpo con el diapasón.' },
      { time: '', title: 'Protocolo 3: Lo que el Hueso Recuerda', desc: 'Experiencia grupal profunda guiada por el Dr. Ojeda. 20 diapasones simultáneos + 20 voces. Un campo sonoro colectivo.' },
    ],
  },
  {
    numero: '3',
    fecha: 'Grabación',
    titulo: 'Integración y Práctica de Vida',
    bloques: [
      { time: '', title: 'Tu protocolo diario', desc: '4 momentos del día: al despertar, antes de trabajar, después del estrés, antes de dormir. 5 a 10 minutos. De por vida.' },
      { time: '', title: 'Para terapeutas: integración en consultorio', desc: 'Cómo introducir el diapasón en sesión. Combinación con biomagnetismo, escritura terapéutica y constelaciones con objetos.' },
      { time: '', title: 'Cierre e integración', desc: 'Sesión final guiada por el Dr. Ojeda con el arsenal completo de instrumentos. Los participantes reciben en silencio.' },
    ],
  },
];

const entregableGroups = [
  {
    titulo: 'Con tu acceso a la grabación',
    items: [
      'Protocolo diario de autoaplicación (PDF)',
      'Protocolo "El Intervalo que Te Falta" completo para hacer en casa',
      'Guía de 6 puntos del 128 Hz',
      'Guía para terapeutas: integración del diapasón en consultorio',
      'Canal de seguimiento grupal (WhatsApp)',
    ],
  },
  {
    titulo: 'La ciencia detrás del sonido',
    items: [
      '15× — El tarareo aumenta el óxido nítrico nasal 15 veces (Weitzberg, 2002)',
      '40 Hz — Reduce amiloide en cerebro — beneficio cognitivo confirmado en 8 RCTs (MIT, 2016–2025)',
      '7.83 Hz — Mejora el sueño medido por polisomnografía en RCT doble ciego (Huang, 2022)',
      '128 Hz — Frecuencia estándar en neurología para evaluar conducción ósea y neuropatía',
    ],
  },
];

const Resonantia: React.FC = () => (
  <ProgramPage
    titulo="Resonantia — Diapasones Terapéuticos"
    titleFont={CG}
    slogan="Lo que sigue vibrando cuando el sonido se apaga."
    hook="Un diapasón de 128 Hz entra por el hueso, recorre el tejido conectivo y llega al sistema nervioso antes de que la mente tenga tiempo de opinar. No es musicoterapia. No es meditación con cuencos. No es relajación. Resonantia es un día completo para aprender a usar esa vibración — en ti y en otros. Con 3 protocolos que tienen estructura, secuencia y un acto irreversible que el cuerpo registra."
    frase='"Un diapasón sin secuencia es relajación. Un diapasón dentro de la secuencia TAME es intervención."'
    heroElement={heroElement}
    badge="Grabación disponible"
    fechas="Grabación completa disponible"
    modalidad="Online · A tu ritmo"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Jornada completa grabada · Acceso inmediato', 'Acceso inmediato tras confirmar']}
    precios={[{ valor: '$1,500 MXN', etiqueta: 'Acceso online · Grabación completa' }]}
    paraQuien={{
      texto: 'Para todo público y terapeutas. No se requiere formación musical. No se requiere experiencia terapéutica previa. Solo un cuerpo y disposición para sentir.',
      nota: 'Todo público · Sin requisitos · Online',
    }}
    modulos={modulos}
    entregables={[]}
    entregableGroups={entregableGroups}
    metodo={{
      texto: 'El diapasón tiene algo que ningún otro instrumento tiene: un inicio, una vibración que se siente en el hueso, y un final exacto donde el sonido se apaga y queda el silencio. Cada protocolo de Resonantia usa esa transición como punto de intervención — el momento donde el sistema nervioso registra el cambio de estado en tiempo real.',
      nota: 'Desarrollado por el Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica',
    }}
    whatsappMsg="Hola, quiero acceso a la grabación de Resonantia — Diapasones Terapéuticos"
    ctaLabel="Pedir acceso a la grabación"
    notaCta="Grabación completa de la jornada · Acceso online"
    accentColor="#4A5568"
  />
);

export default Resonantia;
