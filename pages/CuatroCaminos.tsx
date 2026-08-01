import React from 'react';
import ProgramPage from '../components/ProgramPage';
import PromoVideo from '../components/PromoVideo';
import { COLOR } from '../lib/tokens';

const PROMO_STREAM_ID = '160c7c518e2a036ae5d0872f07d63f25';

const TERRACOTA = COLOR.terracota;

/**
 * La roseta de los cuatro caminos: el modelo propio del Instituto y lo único
 * del taller que no se puede copiar. Va junto al promo porque explica de un
 * vistazo qué se lee sobre la hoja.
 */
const Roseta = () => (
  <div className="mt-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-6">
    <svg viewBox="0 0 420 250" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Las cuatro direcciones: Norte migrante, Sur sufrimiento, Oeste deber, Este placer">
      <rect x="118" y="72" width="184" height="118" rx="3" className="fill-neutral-50 dark:fill-neutral-900/40 stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1.4" />
      <line x1="118" y1="131" x2="302" y2="131" className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1.4" />
      <line x1="210" y1="72" x2="210" y2="190" className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1.4" />
      <circle cx="210" cy="131" r="3.2" fill={TERRACOTA} />

      <text x="210" y="26" textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 8.5, letterSpacing: 1.6, fontWeight: 700 }}>ESTE</text>
      <text x="210" y="43" textAnchor="middle" className="fill-neutral-800 dark:fill-neutral-100" style={{ fontSize: 12.5, fontWeight: 600 }}>Placer</text>
      <text x="210" y="58" textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 9 }}>gozo · conservación</text>

      <text x="316" y="120" textAnchor="start" className="fill-neutral-400" style={{ fontSize: 8.5, letterSpacing: 1.6, fontWeight: 700 }}>NORTE</text>
      <text x="316" y="137" textAnchor="start" className="fill-neutral-800 dark:fill-neutral-100" style={{ fontSize: 12.5, fontWeight: 600 }}>Migrante</text>
      <text x="316" y="152" textAnchor="start" className="fill-neutral-400" style={{ fontSize: 9 }}>búsqueda de lo nuevo</text>

      <text x="210" y="212" textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 8.5, letterSpacing: 1.6, fontWeight: 700 }}>OESTE</text>
      <text x="210" y="229" textAnchor="middle" className="fill-neutral-800 dark:fill-neutral-100" style={{ fontSize: 12.5, fontWeight: 600 }}>Deber</text>
      <text x="210" y="244" textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 9 }}>misión · responsabilidad</text>

      <text x="104" y="120" textAnchor="end" className="fill-neutral-400" style={{ fontSize: 8.5, letterSpacing: 1.6, fontWeight: 700 }}>SUR</text>
      <text x="104" y="137" textAnchor="end" className="fill-neutral-800 dark:fill-neutral-100" style={{ fontSize: 12.5, fontWeight: 600 }}>Sufrimiento</text>
      <text x="104" y="152" textAnchor="end" className="fill-neutral-400" style={{ fontSize: 9 }}>supervivencia · conflicto</text>
    </svg>
    <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
      Un muñeco cae sobre una hoja con dos ejes. Los pies quedan apuntando a un rumbo, y ese rumbo abre la sesión.
    </p>
  </div>
);

const heroElement = (
  <>
    <PromoVideo
      streamId={PROMO_STREAM_ID}
      titulo="Los Cuatro Caminos — Formación en terapia con muñecos"
      etiqueta="Ver el taller en 90 segundos"
      posterTime="4s"
    />
    <Roseta />
  </>
);

const CuatroCaminos: React.FC = () => (
  <ProgramPage
    titulo="Los Cuatro Caminos"
    // El descriptor no se recorta en ninguna pieza: es lo que distingue esta
    // formación del curso «Los Caminos de la Vida», dirigido a público general.
    slogan="Formación en terapia con muñecos · Lectura proyectiva de trayectoria vital"
    hook="Una vida se repite en la dirección que tomó. Se ve en el trabajo, en el cuerpo, en el dinero, en el rol que carga. Y lo que sostiene esa dirección está más allá de lo que la persona alcanza a contar."
    frase="Lo que se hace consciente puede ser elegido en lugar de repetido automáticamente."
    badge="Próximamente"
    fechas="Sábados 5 y 19 de septiembre de 2026"
    modalidad="Presencial en el Instituto y por Zoom · Cupo limitado"
    instructor="Dr. Miguel Ojeda Rios · Curso Selecto"
    detalles={['2 módulos · 13 horas de contenido', '10:00 a 18:00 h', 'Práctica supervisada']}
    heroElement={heroElement}
    paraQuien={{
      texto:
        'Terapeutas y profesionales de la salud con consulta activa, con formación previa en rastreo o en otras técnicas de acceso al inconsciente. Si ya trabajas con técnicas proyectivas, esta suma un modelo propio y un protocolo cerrado.',
      nota: 'No es un curso de iniciación.',
    }}
    modulos={[
      {
        numero: '1',
        fecha: 'Sábado 5 de septiembre',
        titulo: 'La dirección y de dónde viene',
        bloques: [
          {
            time: '10:00',
            title: 'El problema, los cuatro caminos y los cuadrantes',
            desc: 'Las cuatro formas en que una dirección no elegida aparece en consulta. Después el mapa: Norte el migrante, Sur el sufrimiento, Oeste el deber, Este el placer — cada uno con sus recursos y sus costos. Y la regla que evita convertirlo en un test de personalidad: ningún camino es mejor que otro.',
          },
          {
            time: '11:45',
            title: 'Qué pone a alguien en un camino',
            desc: 'Los dos catálogos de eventos —el de la biografía y el de la línea familiar— y qué preguntar con ellos. El patrón que instala la dirección en el cuerpo: el filtro con el que se decide y el mecanismo de supervivencia que la sostiene. Y el caso más frecuente, con protocolo propio: la dirección apareció y el consultante no tiene historia que ofrecer.',
          },
          {
            time: '14:30',
            title: 'El protocolo, de la pregunta de trabajo al cierre',
            desc: 'La pregunta de trabajo va antes que todo lo demás; se practica formularla y reformularla. Quién entra a la hoja y quién no. Los siete pasos, uno por uno, y demostración completa con un voluntario pensando en voz alta. Los criterios de exclusión se dan antes de la primera práctica.',
          },
          {
            time: '16:15',
            title: 'Práctica supervisada',
            desc: 'Primero la estabilidad de la lectura: altura, superficie y modo de soltar se estandarizan, y se practica qué decir cuando la figura cae distinto. Después dos rondas, con la propia línea y con casos tipo, y las cuatro primeras preguntas terapéuticas. Cierra con la tarea de los 14 días.',
          },
        ],
        resultado: 'Haces visible una dirección y sabes preguntarle al consultante por ella.',
      },
      {
        numero: '2',
        fecha: 'Sábado 19 de septiembre',
        titulo: 'La historia familiar y la elección',
        bloques: [
          {
            time: '10:00',
            title: 'Corrección de casos, y la familia sobre la hoja',
            desc: 'Se revisan en plenaria las lecturas que cada quien hizo entre módulos, con las fotos. Es el bloque donde más se aprende, porque la corrección ocurre sobre trabajo propio. Después, la comparación de caminos entre miembros: iguales, opuestos, perpendiculares, y qué dice cada cruce.',
          },
          {
            time: '11:45',
            title: 'Lo que revela la posición',
            desc: 'Más allá de la dirección: quién mira a quién, qué dice la actitud corporal de cada figura, quién queda protegiendo y quién quedó fuera. Y una distinción que cambia la conducta terapéutica: un hijo por encima de sus padres dice carga asumida, no autoridad. Demostración con una familia completa.',
          },
          {
            time: '14:30',
            title: 'El diálogo, la devolución y la elección',
            desc: 'Las seis preguntas terapéuticas del método. Cómo se distingue si el material viene de la biografía o de la línea familiar, y por qué cada caso pide un cierre distinto. El paso 8, que convierte la lectura en intervención: reposicionamiento y devolución, con su gesto exacto. Y qué sigue, qué queda fuera del alcance y cuándo derivar.',
          },
          {
            time: '16:15',
            title: 'Sesión completa y cierre',
            desc: 'Cada quien conduce una sesión de principio a fin con su compañero —de la pregunta de trabajo al reposicionamiento, familia incluida—, con supervisión directa. Integración, diploma y ruta de continuidad dentro del Instituto.',
          },
        ],
        resultado: 'Conduces una sesión completa y sabes con qué continuar según lo que apareció.',
      },
    ]}
    entregableGroups={[
      {
        titulo: 'El protocolo',
        items: [
          'Los siete pasos, de la pregunta de trabajo al cierre',
          'Las seis preguntas que verifican la lectura',
          'Los criterios de exclusión y el encuadre previo',
        ],
      },
      {
        titulo: 'El material',
        items: [
          'Los dos catálogos de eventos: biografía y línea familiar',
          'Cinco fichas de mesa, una por camino más la de eventos',
          'Diploma de participación',
        ],
      },
    ]}
    entregables={[]}
    metodo={{
      texto:
        'Se trabaja con un consultante a la vez, sobre una mesa, y cabe dentro de una sesión de consultorio. Lo que aparece sobre la hoja es una imagen fija que se lee, y el reconocimiento lo produce el consultante con sus propias palabras. Se usan muñecos tipo Playmobil, sin personajes reconocibles.',
      nota: 'El modelo de los Cuatro Caminos y los catálogos de eventos son desarrollo propio del Instituto Centrobioenergetica.',
    }}
    requisitos="Conocimiento previo de rastreo o de otras técnicas de acceso al inconsciente. El set de muñecos y la hoja se prestan durante el taller; en la modalidad por Zoom, el material se envía con anticipación."
    ctaLabel="Apartar mi lugar"
    whatsappMsg="Hola, me interesa Los Cuatro Caminos — Formación en terapia con muñecos (5 y 19 de septiembre). ¿Me comparten sede e inversión?"
    notaCta="Cupo limitado por el número de parejas que la práctica supervisada permite corregir. Te confirmamos sede e inversión al apartar tu lugar."
  />
);

export default CuatroCaminos;
