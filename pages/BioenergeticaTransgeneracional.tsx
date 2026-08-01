import React from 'react';
import ProgramPage from '../components/ProgramPage';
import { COLOR } from '../lib/tokens';

// Paleta del hero — misma que el Folleto de Beca impreso
const BK = '#362F29';
const SAGE = COLOR.salvia;
const TERRA = COLOR.terracota;
const TAN = '#E2D6C6';
const GOLD = COLOR.ambar;
const G = "Georgia, 'Times New Roman', serif";

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

const heroElement = (
  <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 240, background: BK }}>
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
      <p className="mt-3" style={{ fontFamily: G, fontSize: 9, color: TAN, opacity: 0.6, letterSpacing: 3, textTransform: 'uppercase' as const }}>
        Instituto Centrobioenergetica
      </p>
    </div>
  </div>
);

const BioenergeticaTransgeneracional: React.FC = () => (
  <ProgramPage
    titulo="Bioenergética Transgeneracional"
    titleFont={G}
    slogan="Un marco actualizado para el rastreo transgeneracional en consulta"
    hook="A lo largo de 4 viernes, construyes el mapa de tu propio árbol familiar y aprendes a leer en él lo que no es tuyo: duelos no resueltos, misiones heredadas, patrones que se repiten entre generaciones — con evidencia reciente sobre transmisión intergeneracional (ADN mitocondrial y cromosoma Y, epigenética del trauma, co-regulación del sistema nervioso, programación metabólica)."
    frase="No es un webinar gratuito: es una beca por invitación, con formulario de aceptación y cupo limitado."
    heroElement={heroElement}
    fechas="4 sesiones en vivo · Viernes, 2 horas"
    modalidad="Presencial y por Zoom"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Beca por invitación', 'Formulario de aceptación', 'Cupo limitado']}
    badge="Próximamente"
    accentColor={TERRA}
    paraQuien={{
      texto:
        'Alumnos del Instituto Centrobioenergetica, terapeutas de bioenergética o biomagnetismo formados en otras escuelas, y profesionales de la salud.',
      nota: 'No es un programa abierto al público general.',
    }}
    modalidades={[
      {
        titulo: 'Presencial',
        desc: 'Incluye material impreso. Cupo limitado. Al terminar, acceso a una sesión de práctica presencial supervisada en el Instituto.',
      },
      {
        titulo: 'Por Zoom',
        desc: 'Plazas limitadas. Las 4 sesiones se graban para quienes no puedan asistir en vivo.',
      },
    ]}
    modulos={[
      {
        numero: '1',
        fecha: 'Sesión 1 · 2 horas',
        titulo: 'El Mapa que Cargas',
        resultado:
          'Construyes el genograma y genosociograma de tu propia familia — el material de trabajo de las siguientes 3 sesiones.',
        bloques: [
          {
            time: '',
            title: 'La actualización',
            desc: 'Por qué "se hereda" algo sin que sea una metáfora: líneas de ADN directas (mitocondrial y cromosoma Y), trauma histórico colectivo, co-regulación del sistema nervioso entre generaciones, herencia epigenética del trauma.',
          },
          {
            time: '',
            title: 'Construcción del mapa',
            desc: 'Cómo construir un genograma (mínimo 3 generaciones) y un genosociograma, y cómo detectar la repetición de ciclos: síndrome de aniversario, oficios o roles que se repiten, enfermedades en la misma rama, edades críticas que coinciden.',
          },
        ],
      },
      {
        numero: '2',
        fecha: 'Sesión 2 · 2 horas',
        titulo: 'La Línea Paterna y el Camino que Caminas',
        resultado:
          'Ves, con un caso real, hasta dónde llega una técnica que hace visible la dirección de vida heredada por línea paterna.',
        bloques: [
          {
            time: '',
            title: 'La actualización',
            desc: 'El cromosoma Y como la única línea genética que pasa intacta de padre a hijo, generación tras generación. Los Cuatro Caminos de la Vida —Migrante, Sufrimiento, Deber, Placer— y su relación con los movimientos sistémicos familiares.',
          },
          {
            time: '',
            title: 'Demostración en vivo',
            desc: 'Con un voluntario, el Dr. Ojeda hace la lectura completa frente al grupo con la técnica proyectiva de muñecos: interpreta, pregunta, conecta el resultado con el genosociograma — el gancho hacia Terapia con Muñecos: Playmobil Pro y Los Caminos de la Vida.',
          },
        ],
      },
      {
        numero: '3',
        fecha: 'Sesión 3 · 2 horas',
        titulo: 'La Línea Materna: Lo que se Hereda por el Campo',
        resultado:
          'Cierras la lectura del genograma con la línea materna, a través del campo familiar que se transmite entre generaciones de mujeres.',
        bloques: [
          {
            time: '',
            title: 'La actualización',
            desc: 'El ADN mitocondrial como línea materna intacta. Co-regulación del sistema nervioso: el bebé aprende a regular su cuerpo copiando el de quien lo cuida, antes de tener recuerdos conscientes.',
          },
          {
            time: '',
            title: 'Demostración en vivo',
            desc: 'Con el genograma de la Sesión 1, el Dr. Ojeda guía la lectura completa del campo familiar frente al grupo — el gancho hacia NIG y Campos Mórficos.',
          },
        ],
      },
      {
        numero: '4',
        fecha: 'Sesión 4 · 2 horas',
        titulo: 'Los Abuelos, los Tatarabuelos y el Cuerpo que Sobrevive',
        resultado:
          'Integras las 4 sesiones y te llevas un mapa familiar completo, con una ruta clara para profundizar.',
        bloques: [
          {
            time: '',
            title: 'La actualización',
            desc: 'Programas de supervivencia metabólicos: la Hambruna Holandesa (1944-45) y la hipótesis del gen ahorrador — lo que ayudó a sobrevivir el hambre de los abuelos hoy, en abundancia, se traduce en resistencia a la insulina.',
          },
          {
            time: '',
            title: 'Cierre e integración',
            desc: 'Se marcan épocas de hambruna, guerra o migración forzada en el genograma y se cruzan con patrones metabólicos actuales. Las 3 frases de liberación transgeneracional: Reconocimiento → Liberación → Corte.',
          },
        ],
      },
    ]}
    entregables={[
      'Diploma de participación del Instituto Centrobioenergetica',
      'Una Sesión de Práctica Incluida, presencial, con supervisión',
      'Grabación de las 4 sesiones',
      'Ruta clara hacia Playmobil Pro, Campos Mórficos y Setpoint',
    ]}
    metodo={{
      texto:
        'Cómo funciona la beca: al llenar el formulario, tu solicitud será revisada por el Instituto. Si es aceptada, recibirás tu carta de aceptación de beca con los detalles de acceso. Cupo limitado — no todas las solicitudes son aceptadas.',
    }}
    requisitos="Conocimiento previo de rastreo (test muscular) u otras técnicas de acceso al inconsciente."
    whatsappMsg="Hola, quiero solicitar mi beca para el programa Bioenergética Transgeneracional"
    ctaLabel="Solicitar mi beca"
    ctaHref="https://docs.google.com/forms/d/e/1FAIpQLSe4LbOkxKHUjTFsPS1Vh0yG4ZtmJj4_9NhgsCFbolOz275gHA/viewform"
    notaCta="Formulario de aceptación · Cupo limitado · Presencial y por Zoom"
  />
);

export default BioenergeticaTransgeneracional;
