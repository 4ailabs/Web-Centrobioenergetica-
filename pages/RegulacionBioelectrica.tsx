import React from 'react';
import ProgramPage from '../components/ProgramPage';

const G = "Georgia, 'Times New Roman', serif";

const hero = (
  <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 240 }}>
    <img
      src="/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp"
      alt="Mapa bioeléctrico del cuerpo — Regulación Bioeléctrica"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectPosition: 'center' }}
    />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,31,0.7) 0%, rgba(13,27,31,0.3) 100%)' }} />
    <div className="relative z-10 flex flex-col justify-center py-10 px-8" style={{ minHeight: 240 }}>
      <svg width={48} height={48 * 0.27} viewBox="0 0 44 12">
        <circle cx="6" cy="6" r="5" fill="#5DCAA5" />
        <line x1="13" y1="6" x2="25" y2="6" stroke="#5DCAA5" strokeWidth="0.8" />
        <circle cx="32" cy="6" r="5" fill="#5DCAA5" opacity="0.35" />
      </svg>
      <div className="flex flex-col mt-4">
        <span style={{ fontFamily: G, fontSize: 24, color: '#E8E6DE', letterSpacing: 1.5 }}>Regulación</span>
        <span style={{ fontFamily: G, fontSize: 24, color: '#5DCAA5', letterSpacing: 1.5 }}>Bioeléctrica</span>
      </div>
      <p className="mt-2 max-w-sm" style={{ fontSize: 12, color: '#E8E6DE', opacity: 0.7, lineHeight: 1.5 }}>
        Formación profesional · 4 sábados · Julio–Agosto 2026
      </p>
    </div>
  </div>
);

const RegulacionBioelectrica: React.FC = () => (
  <ProgramPage
    titulo="El Cuerpo Eléctrico"
    titleFont={G}
    hook="Formación profesional en Regulación Bioeléctrica (RB) — un método de evaluación y regulación del estado bioeléctrico de los tejidos del cuerpo humano mediante campos magnéticos estáticos, con fundamento en la ciencia contemporánea de la bioelectricidad (Robert Becker; Michael Levin, Tufts; publicado en revistas como Cell, Frontiers y PNAS)."
    heroElement={hero}
    fechas="Julio – Agosto 2026 · 4 módulos"
    modalidad="Presencial CDMX · En línea en vivo"
    instructor="Dr. Miguel Ojeda Rios"
    detalles={['Sábado 11 julio', 'Sábado 25 julio', 'Sábado 8 agosto', 'Sábado 22 agosto', '10:00 – 18:00 h', 'Presencial CDMX', 'En línea en vivo']}
    badge="En curso"
    accentColor="#0F6E56"
    metodoLink={{ label: 'Conoce el método detrás de este curso', path: '/rb' }}
    metodo={{
      texto: 'En 4 sábados aprendes a leer el perfil bioeléctrico del cuerpo, a razonar por ejes de regulación, y a aplicar con criterio y seguridad — documentando tu trabajo en lenguaje que cualquier médico pueda leer. Desde cero, con práctica supervisada por el Dr. Miguel Ojeda Rios.',
    }}
    modalidades={[
      {
        titulo: 'Empiezas de cero',
        desc: 'No necesitas conocimientos previos. Aprendes la Regulación Bioeléctrica desde los fundamentos, con el marco científico actualizado. Al terminar, conduces sesiones completas. Requisitos: ninguno.',
      },
      {
        titulo: 'Ya trabajas el cuerpo',
        desc: 'Ganas el porqué y el método que le falta a tu oficio: el fundamento científico, el razonamiento por ejes de regulación, y la forma de comunicar tu trabajo profesionalmente. Requisitos: ninguno · experiencia previa deseable, no indispensable.',
      },
    ]}
    modulos={[
      {
        numero: '1',
        fecha: '11 de julio',
        titulo: 'El Cuerpo Eléctrico',
        resultado: 'Entiendes por qué el cuerpo es eléctrico y qué significa regular — y puedes explicarlo.',
        bloques: [
          { time: '', title: 'La matriz extracelular', desc: 'Entre tus células hay un sistema activo con carga eléctrica que regula la comunicación celular, la distribución de iones y el microambiente de cada tejido. Cuando esa carga se altera —por inflamación, acidosis o estrés sostenido— se crean las condiciones para la enfermedad, antes de que aparezcan los síntomas.' },
          { time: '', title: 'El voltaje de la célula (Vmem)', desc: 'Cada célula mantiene un voltaje que no es un subproducto del metabolismo: es una señal que le indica qué hacer. Michael Levin, en la Universidad de Tufts, demostró que modificar ese voltaje cambia el comportamiento del tejido sin tocar el ADN.' },
          { time: '', title: 'La red bioeléctrica', desc: 'Los tejidos son redes conectadas por gap junctions que comparten información eléctrica; una señal viaja a puntos distantes en cuestión de segundos. Por eso el cuerpo se lee como una red continua, no como puntos sueltos.' },
          { time: '', title: 'El órgano como sistema con una meta', desc: 'Cada órgano defiende un punto de calibración. La enfermedad no es un error: es una respuesta que se quedó activa cuando ya no hacía falta. Regular no es corregir el síntoma — es devolverle la señal para recalibrarse.' },
          { time: '', title: 'Caso ejemplar: el Ojo Adaptativo', desc: 'Por qué un niño se vuelve miope, leído en cuatro niveles de razonamiento clínico. El caso que muestra, en vivo, cómo cambia la pregunta frente a cualquier paciente.' },
          { time: '', title: 'Salud y mantenimiento', desc: 'La Regulación Bioeléctrica sirve tanto para quien está enfermo como para quien quiere mantenerse sano: salutogénesis y carga alostática, el marco de la prevención y el cuidado a largo plazo.' },
        ],
      },
      {
        numero: '2',
        fecha: '25 de julio',
        titulo: 'La lectura del cuerpo',
        resultado: 'Lees un perfil bioeléctrico, aplicas con seguridad, y trabajas los primeros ejes de regulación.',
        bloques: [
          { time: '', title: 'El instrumento', desc: 'Qué es el campo magnético estático (0.1–0.5 T) y cómo interactúa con el tejido: los canales iónicos de la membrana, el microambiente de la matriz, y la magnetita del tejido cerebral. Qué hace y qué no. Seguridad, contraindicaciones y límites.' },
          { time: '', title: 'El iliopsoas como sensor', desc: 'Este músculo tiene inervación dual —somática y simpática— con fusión fascial con la cadena simpática lumbar y continuidad con el diafragma. Es músculo voluntario y sensor del sistema nervioso autónomo a la vez. El Dr. Ojeda demuestra en vivo cómo se lee la respuesta.' },
          { time: '', title: 'Nodo, dipolo y perfil bioeléctrico', desc: 'La nomenclatura del método: el nodo (dónde el estado eléctrico se salió de su rango), el dipolo (dos nodos de la misma red) y el perfil bioeléctrico (el mapa del paciente). Cada tejido tiene su propio rango; no existe un valor universal.' },
          { time: '', title: 'Los primeros ejes de regulación', desc: 'El eje del estrés —transversal, el que se atiende primero—, el eje intestinal (barrera y microbiota) y el eje metabólico-energético (los 5 tipos de fatiga). Cómo se leen y cómo se regulan.' },
          { time: '', title: 'Prácticas', desc: 'Cada participante realiza la lectura del perfil bioeléctrico y la aplicación con otro compañero, con supervisión directa del Dr. Ojeda.' },
        ],
      },
      {
        numero: '3',
        fecha: '8 de agosto',
        titulo: 'Los ejes de regulación',
        resultado: 'Reconoces los ejes de regulación y priorizas con criterio cuando el paciente presenta varios.',
        bloques: [
          { time: '', title: 'El eje inflamatorio', desc: 'El sistema inmune y por qué el problema no es inflamar, sino no resolver. Cómo se lee y cómo se regula el estado inflamatorio.' },
          { time: '', title: 'El eje de biotransformación', desc: 'El hígado y la carga ambiental. A diferencia de otros ejes, aquí el trabajo es sobre el circuito molecular del órgano, no sobre un nodo bioeléctrico literal.' },
          { time: '', title: 'El eje redox', desc: 'La deriva oxidativa del medio interno: el eje de fondo, el del largo plazo, y cómo cuidarlo.' },
          { time: '', title: 'El criterio clínico', desc: 'Perfiles combinados y jerarquía: cuál eje se atiende primero y por qué. Este es el módulo que te da criterio para trabajar con orden y sin dispersarte.' },
          { time: '', title: 'Prácticas', desc: 'Sesión completa supervisada: lectura del perfil bioeléctrico y aplicación, en dos rondas.' },
        ],
      },
      {
        numero: '4',
        fecha: '22 de agosto',
        titulo: 'La sesión completa',
        resultado: 'Conduces una sesión completa, ofreces planes de mantenimiento, y documentas tu trabajo.',
        bloques: [
          { time: '', title: 'La sesión de mantenimiento', desc: 'El mantenimiento como formato clínico propio: periodicidad, lenguaje al paciente, registro por eje. La persona sana también se atiende (salutogénesis aplicada).' },
          { time: '', title: 'Casos clínicos', desc: 'El Dr. Ojeda presenta casos reales anonimizados. Los participantes proponen su lectura e interpretación, y se discute en grupo la integración de los ejes.' },
          { time: '', title: 'Estrategias y mapas', desc: 'Integración de los ejes de regulación en el paciente real: cómo combinar y priorizar, leyendo el mapa completo del perfil bioeléctrico.' },
          { time: '', title: 'Supervisión en vivo', desc: 'Sesiones completas de RB frente al grupo, con supervisión en tiempo real del Dr. Ojeda: puede interrumpir, corregir y ampliar.' },
          { time: '', title: 'Documentación profesional', desc: 'Cómo escribir un reporte de sesión que un médico pueda leer y respetar, y cómo explicar la Regulación Bioeléctrica a otros profesionales de la salud.' },
        ],
      },
    ]}
    entregables={[]}
    entregableGroups={[
      { titulo: 'Materiales', items: ['Manual del Cuerpo Eléctrico', 'Fichas clínicas de los ejes de regulación', 'Biblioteca de grabaciones de los módulos'] },
      { titulo: 'Método', items: ['Protocolo de lectura del perfil bioeléctrico', 'Guía de aplicación con seguridad', 'Guía de documentación clínica'] },
      { titulo: 'Evidencia', items: ['Tabla de evidencia científica del mecanismo'] },
      { titulo: 'Comunidad', items: ['Certificación del Instituto Centrobioenergetica', 'Grupo de supervisión mensual con el Dr. Ojeda'] },
    ]}
    requisitos="Ninguno. Empiezas de cero; experiencia previa deseable, no indispensable."
    whatsappMsg="Hola, quiero inscribirme al curso de Regulación Bioeléctrica"
    ctaLabel="Inscribirme por WhatsApp"
    notaCta="Presencial y en línea · Primera generación RB"
  />
);

export default RegulacionBioelectrica;
