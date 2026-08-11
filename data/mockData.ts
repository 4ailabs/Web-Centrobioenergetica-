import type { Course, NewsArticle, AppInfo, CalendarEvent } from '../types';

// Servicios clínicos
export interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  imageUrl: string;
}

// Productos Wellkitt
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
}

// Resultados de búsqueda
export interface SearchResults {
  courses: Course[];
  services: Service[];
  products: Product[];
  news: NewsArticle[];
  events: CalendarEvent[];
}

// Datos centralizados
export const MOCK_DATA = {
  courses: [
    {
      // Curso Selecto del 5 y 19 de septiembre de 2026. Todavía sin módulos:
      // la landing (/cuatro-caminos) es lo único que se muestra hasta que se
      // imparta y haya grabación.
      id: 110,
      title: 'Los Cuatro Caminos — Formación en terapia con muñecos',
      description: 'Lectura proyectiva de trayectoria vital. Una vida se repite en la dirección que tomó; esta formación la hace visible sobre una hoja, en minutos, y enseña a conducirla hasta la elección.',
      author: 'Dr. Miguel Ojeda Rios',
      price: 0,
      lessons: 0,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/cuatro-caminos/cuatro-caminos-cover.jpg',
    },
    {
      id: 109,
      title: 'CRANIA — Práctica Craneofascial',
      description: 'Devuelve el flujo. Práctica craneofascial autoaplicada para liberar fascia profunda de rostro, cuello, mandíbula y cráneo con respiración integrada.',
      author: 'Dr. Miguel Ojeda Rios',
      price: 0,
      lessons: 2,
      level: 'Básico' as const,
      imageUrl: '/images/courses/crania/crania-course-cover.svg',
      modules: [
        {
          id: 1,
          title: 'CRANIA — Devuelve el flujo',
          description: 'Clase práctica craneofascial del 25 de abril de 2026.',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Capítulo 1',
              description: '',
              order: 1,
              cloudflareStreamId: 'a1fb33b485dda81c6dd95b87df581369',
            },
            {
              id: 2,
              title: 'Capítulo 2',
              description: '',
              order: 2,
              cloudflareStreamId: 'aae245f4bc5623632c98d79665a438fc',
            },
          ],
        },
      ],
    },
    {
      id: 108,
      title: 'Lo Que Tu Mascota Quiere Decirte',
      description: 'Taller de 2 módulos. Tu mascota es tu espejo. Aprende a leer las señales y sanar el vínculo con tu animal a través de Flores de Bach, Pares Biomagnéticos y lectura del campo mórfico.',
      author: 'Dr. Miguel Ojeda Rios',
      price: 0,
      lessons: 4,
      level: 'Básico-Intermedio' as const,
      imageUrl: '/images/courses/taller-mascotas/mascota.webp',
      modules: [
        {
          id: 1,
          title: 'Módulo 1 — Tu mascota es tu espejo',
          description: '',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
              cloudflareStreamId: '1cf35aebc7554832a5a071c2f4cba207',
            },
            {
              id: 2,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
              cloudflareStreamId: '829616be5b41b7413288a7d474ce5b57',
            },
          ],
        },
        {
          id: 2,
          title: 'Módulo 2 — Sana el vínculo con tu animal',
          description: '',
          order: 2,
          videos: [
            {
              id: 3,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
            },
            {
              id: 4,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
            },
          ],
        },
      ],
    },
    {
      id: 107,
      title: 'Resonantia — Diapasones Terapéuticos',
      description: 'Lo que sigue vibrando cuando el sonido se apaga. Un día completo para aprender a usar la vibración del diapasón 128 Hz como intervención sobre el sistema nervioso.',
      author: 'Dr. Miguel Ojeda Rios',
      price: 0,
      lessons: 4,
      level: 'Intermedio' as const,
      imageUrl: '/images/courses/resonantia/Resonantia.webp',
      modules: [
        {
          id: 1,
          title: 'Resonantia — Taller completo',
          description: '',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
              cloudflareStreamId: '21a122a1b20486bdb5505948e96b1c47',
            },
            {
              id: 2,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
              cloudflareStreamId: 'c2f8e4614aa626e73cc8ae241c20922e',
            },
            {
              id: 3,
              title: 'Capítulo 3',
              description: '',
              duration: '1:00:00',
              order: 3,
            },
            {
              id: 4,
              title: 'Capítulo 4',
              description: '',
              duration: '1:00:00',
              order: 4,
            },
          ],
        },
      ],
    },
    {
      id: 106,
      title: 'El Cuerpo Eléctrico — RB',
      description: 'Tu cuerpo es un mapa eléctrico. Aprende a leerlo. Formación profesional en evaluación y regulación del estado bioeléctrico del cuerpo humano con campos magnéticos estáticos.',
      author: 'Dr. Miguel Ojeda Rios',
      price: 0,
      lessons: 8,
      level: 'Intermedio' as const,
      imageUrl: '/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp',
      modules: [
        { id: 1, title: 'El Cuerpo Eléctrico', description: '11 de julio · 10:00 – 18:00 h', order: 1, videos: [
          // La estructura canónica de la formación vive en cursos-timeline,
          // en 00_Sistema_de_Produccion/00_Estructura_Maestra_Formacion.md:
          // Módulo → Clases → Lecciones. El Módulo 1 son 15 lecciones en 4
          // clases (C1:4, C2:3, C3:4, C4:4).
          //
          // La clase en vivo del 11 de julio se grabó en tres partes —dos por
          // la mañana y una después de la comida—, y cada parte cubre clases
          // completas: C1, C2, y C3+C4.
          //
          // El título se queda en «Capítulo N», que es la convención del resto
          // del catálogo. Lo que hay dentro se cuenta en la descripción, que
          // aparece bajo el reproductor.
          //
          // Si algún día se publica el curso grabado en estudio, cada lección
          // tendrá su propio video y esta lista pasa de 3 a 15 entradas.
          { id: 1, title: 'Capítulo 1', description: 'Clase 1 · Mañana · 4 lecciones. Qué es la Regulación Bioeléctrica y qué no es · El linaje del método: Becker, Broeringmeyer, Goiz · La matriz extracelular · El Vmem y la jerarquía.', duration: '', order: 1, cloudflareStreamId: '32a4d7ec68c9fd2a23e7d80728e76da2' },
          { id: 5, title: 'Capítulo 2', description: 'Clase 2 · Mañana · 3 lecciones. El campo magnético y el tejido · El imán · El sustrato continuo.', duration: '', order: 2, cloudflareStreamId: '4c08589240dca30ec59c74daa8d03844' },
          { id: 6, title: 'Capítulo 3', description: 'Clases 3 y 4 · Tarde · 8 lecciones. El cuerpo agente y TAME · Persuadibilidad, el ojo y los cuatro niveles · El macrófago y por qué regular no es curar · Mantenimiento y el punto trauma · El rastreo · Acidosis temporal y latente · El nodo de lesión y el ciclo por zonas · Rejilla combinada y cierre.', duration: '', order: 3, cloudflareStreamId: '15af37421329831b45eabf739439f950' },
        ] },
        { id: 2, title: 'La lectura del cuerpo', description: '25 de julio · 10:00 – 18:00 h', order: 2, videos: [
          // A diferencia del Módulo 1, aquí no hay una transcripción
          // Mañana/Tarde que confirme qué tramo del día cubre este video: el
          // registro de la clase en vivo (cursos-timeline, Modulo_2/
          // Clases_Impartidas) documenta pistas de AUDIO usadas para
          // reconstruir texto, no una partición verificada de los videos
          // subidos a Cloudflare. Por eso la descripción se deja vacía en
          // lugar de adivinar el contenido.
          { id: 2, title: 'Capítulo 1', description: '', duration: '', order: 1, cloudflareStreamId: 'daaa8edf3f034c5354651f192f092ee9' },
          { id: 7, title: 'Capítulo 2', description: '', duration: '', order: 2, cloudflareStreamId: 'cc85f0171ae2dbe6cc781f7f996592d8' },
          { id: 8, title: 'Capítulo 3', description: '', duration: '', order: 3, cloudflareStreamId: '63818bcf28ca5456b45e468be1d6ee60' },
        ] },
        { id: 3, title: 'Los ejes de regulación', description: '8 de agosto · 10:00 – 18:00 h', order: 3, videos: [{ id: 3, title: 'Módulo 3 — RB', description: 'Jornada completa.', duration: '8:00:00', order: 1 }] },
        { id: 4, title: 'La sesión completa', description: '22 de agosto · 10:00 – 18:00 h', order: 4, videos: [{ id: 4, title: 'Módulo 4 — RB', description: 'Jornada completa.', duration: '8:00:00', order: 1 }] },
      ],
    },
    {
      id: 105,
      title: 'Actos que Mueven',
      description: 'Taller vivencial de rituales personales. El cuerpo no cambia con lo que entiendes — cambia con lo que haces. Dos módulos para aprender a diseñar y ejecutar actos rituales con la Secuencia TAME.',
      author: 'Dr. Miguel Ojeda Ríos',
      price: 0,
      lessons: 2,
      level: 'Básico' as const,
      imageUrl: '/images/courses/actos-que-mueven/ritual_2.webp',
      modules: [
        {
          id: 1,
          title: 'Los 5 Actos Fundamentales',
          description: '6 de junio · 10:00 – 18:00 h. Cinco actos rituales independientes, cada uno trabajando un patrón diferente.',
          order: 1,
          videos: [
            { id: 1, title: 'Módulo 1 — Actos que Mueven', description: 'Jornada completa. 10:00 – 18:00 h.', duration: '8:00:00', order: 1 },
          ],
        },
        {
          id: 2,
          title: 'La Secuencia que Transforma',
          description: '20 de junio · 10:00 – 18:00 h. Secuencia progresiva de 6 actos encadenados: Descenso → Encuentro → Ascenso.',
          order: 2,
          videos: [
            { id: 2, title: 'Módulo 2 — Actos que Mueven', description: 'Jornada completa. 10:00 – 18:00 h.', duration: '8:00:00', order: 1 },
          ],
        },
      ],
    },
    {
      id: 104,
      title: 'El Reset Hormonal',
      description: 'Método de equilibrio para el climaterio y la postmenopausia. Sistema de regulación femenina con Cartografía Hormonal, fitoterapia específica y protocolos probados.',
      author: 'Dr. Miguel Ojeda Ríos',
      price: 0,
      lessons: 3,
      level: 'Intermedio' as const,
      imageUrl: '/images/courses/reset-hormonal/reset_hormonal.webp',
      modules: [
        {
          id: 1,
          title: 'Reset Hormonal',
          description: 'Cartografía Hormonal Femenina, protocolos de aplicación y botica del reset.',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Clase 1 — El Mapa Hormonal',
              description: 'Cartografía Hormonal Femenina para climaterio y postmenopausia.',
              cloudflareStreamId: '6af0e03d65db7038c604d2f613e8ef4a',
              duration: '00:00',
              order: 1,
            },
            {
              id: 2,
              title: 'Clase 2 — El Método',
              description: 'Protocolos de aplicación, lectura del caso y personalización del plan.',
              cloudflareStreamId: '87c2e0ae3597984cf6ddb5585b7a7bcc',
              duration: '00:00',
              order: 2,
            },
            {
              id: 3,
              title: 'Clase 3 — La Botica del Reset',
              description: 'Fitoterapia específica, casos clínicos e integración del método.',
              cloudflareStreamId: 'e42c273dd9b06fbef21a33fa8e83743e',
              duration: '00:00',
              order: 3,
            },
          ],
        },
      ],
    },
    {
      id: 102,
      title: 'Set Point',
      description: 'Descubre y ajusta tu punto de ajuste metabólico y energético para alcanzar un bienestar sostenible y definitivo.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 4,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/setpoint/image.webp',
      modules: [
        {
          id: 1,
          title: 'Módulo 1',
          description: '',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
              cloudflareStreamId: 'c20772de81a54659f8d835ac49d48969',
            },
            {
              id: 2,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
              cloudflareStreamId: '7e9b19f5d4ad373aa08473785ddee7ea',
            },
            {
              id: 3,
              title: 'Capítulo 3',
              description: '',
              duration: '1:00:00',
              order: 3,
              cloudflareStreamId: 'dbd6974162250926a307fc593a0f28fe',
            },
          ],
        },
        {
          id: 2,
          title: 'Módulo 2',
          description: '',
          order: 2,
          videos: [
            {
              id: 3,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
              cloudflareStreamId: '81ab89ca0cff635143ed4dfb18416382',
            },
            {
              id: 4,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
              cloudflareStreamId: '703c3ad4c80acb68a08f5a2d0ef3f310',
            },
          ],
        },
      ],
    },
    {
      id: 101,
      title: 'Nutrición con Aminoácidos',
      description: 'Aprende cómo los aminoácidos esenciales transforman tu salud, potencian tu energía y equilibran tu bioquímica corporal.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 3,
      level: 'Intermedio' as const,
      imageUrl: '/images/courses/aminoacidos/Nutricion_aminoacidos_poster.webp',
      modules: [
        {
          id: 1,
          title: 'Módulo 1: Fundamentos de los Aminoácidos',
          description: 'Introducción a la estructura y función de los aminoácidos en el cuerpo humano.',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Introducción a los Aminoácidos',
              description: '¿Qué son y por qué son vitales?',
              duration: '2:21:00',
              order: 1,
              cloudflareStreamId: '81ab89ca0cff635143ed4dfb18416382',
            },
          ],
        },
        {
          id: 2,
          title: 'Módulo 2: Aplicaciones Terapéuticas',
          description: 'Uso clínico de aminoácidos para tratar diversas condiciones de salud.',
          order: 2,
          videos: [
            {
              id: 2,
              title: 'Protocolos Clínicos',
              description: 'Cómo aplicar aminoácidos en terapia.',
              duration: '2:15:00',
              order: 1,
            },
          ],
        },
        {
          id: 3,
          title: 'Módulo 3: Nutrición Avanzada',
          description: 'Estrategias avanzadas de suplementación y sinergia nutricional.',
          order: 3,
          videos: [
            {
              id: 3,
              title: 'Sinergia y Absorción',
              description: 'Maximizando los beneficios.',
              duration: '2:10:00',
              order: 1,
            },
          ],
        },
      ],
    },
    {
      id: 103,
      title: 'Bioenergética V4',
      description: 'Las 13 Improntas de Supervivencia. Nivel avanzado de formación bioenergética. Tres módulos intensivos de jornada completa para profundizar en los principios y aplicaciones de la bioenergética clínica.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 3,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/bioenergetica-v4/Bioenergetica.webp',
      modules: [
        {
          id: 1,
          title: 'Módulo 1',
          description: '',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Capítulo 1',
              description: '',
              duration: '1:00:00',
              order: 1,
              cloudflareStreamId: '9797e003c44c18885dd2122320a74a5c',
            },
            {
              id: 2,
              title: 'Capítulo 2',
              description: '',
              duration: '1:00:00',
              order: 2,
              cloudflareStreamId: '72e6e051437c277664ac5f8d189a6954',
            },
            {
              id: 3,
              title: 'Capítulo 3',
              description: '',
              duration: '1:00:00',
              order: 3,
              cloudflareStreamId: '4efb010092163cd0c8275362ad66b8ef',
            },
            {
              id: 4,
              title: 'Capítulo 4',
              description: '',
              duration: '1:00:00',
              order: 4,
              cloudflareStreamId: 'c439e2fa0ecac8b94f112ac36572016c',
            },
          ],
        },
        {
          id: 2,
          title: 'Módulo 2',
          description: '',
          order: 2,
          videos: [
            {
              id: 2,
              title: 'Módulo 2 — Bioenergética V4',
              description: 'Jornada completa. 10:00 – 18:00 h.',
              duration: '8:00:00',
              order: 1,
            },
          ],
        },
        {
          id: 3,
          title: 'Módulo 3',
          description: '',
          order: 3,
          videos: [
            {
              id: 3,
              title: 'Módulo 3 — Bioenergética V4',
              description: 'Jornada completa. 10:00 – 18:00 h.',
              duration: '8:00:00',
              order: 1,
            },
          ],
        },
      ],
    },
    /* Cursos anteriores ocultos temporalmente
    {
      id: 1,
      title: 'Biomagnetismo Kids',
...
    },
    */
  ] as Course[],

  services: [
    {
      id: 1,
      title: 'Biomagnetismo',
      description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
      duration: '60-90 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Auriculoterapia',
      description: 'Técnica de acupuntura auricular para el tratamiento de diversos desequilibrios energéticos.',
      duration: '45-60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Remedios Florales',
      description: 'Sistema de sanación natural con esencias florales para el equilibrio emocional.',
      duration: '30-45 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Terapia de Muñecos',
      description: 'Técnica terapéutica que utiliza muñecos para explorar los caminos de la vida.',
      duration: '60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Sandplay',
      description: 'Herramienta terapéutica que utiliza arena para el autoconocimiento y sanación.',
      duration: '45-60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: 'Conflictos Biológicos',
      description: 'Análisis de la relación entre conflictos emocionales y manifestaciones biológicas.',
      duration: '90-120 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ] as Service[],

  products: [
    {
      id: 1,
      name: 'Kit de Biomagnetismo',
      description: 'Set completo con imanes terapéuticos para sesiones de biomagnetismo en casa.',
      price: '$299 MXN',
      category: 'Terapéutico',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Esencias Florales de Bach',
      description: 'Colección completa de 38 esencias florales para el equilibrio emocional.',
      price: '$450 MXN',
      category: 'Esencias',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Set de Auriculoterapia',
      description: 'Kit profesional con semillas y herramientas para terapia auricular.',
      price: '$180 MXN',
      category: 'Terapéutico',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      name: 'Muñecos Terapéuticos',
      description: 'Colección de muñecos especializados para terapia de muñecos y playmobil.',
      price: '$320 MXN',
      category: 'Terapéutico',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      name: 'Kit de Sandplay',
      description: 'Set completo con bandeja, arena y figuras para terapia de sandplay.',
      price: '$280 MXN',
      category: 'Terapéutico',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      name: 'Vitaminas y Minerales',
      description: 'Suplementos naturales para el equilibrio energético y la salud integral.',
      price: '$150 MXN',
      category: 'Suplementos',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ] as Product[],

  news: [
    {
      id: 23,
      title: 'Escucha: el cuerpo eléctrico, en voz del Dr. Ojeda',
      description: 'Una cápsula de dos minutos para entender por qué tu cuerpo tiene una capa eléctrica que organiza todo lo demás — narrada por el Dr. Miguel Ojeda Rios.',
      category: 'Regulación Bioeléctrica',
      contentType: 'audio',
      audioUrl: '/audio/descubrir/cuerpo-electrico.mp3',
      audioDuration: '2:24',
      imageUrl: '/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp',
      author: 'Dr. Miguel Ojeda Rios',
      relatedCourseIds: [106],
    },
    {
      id: 20,
      title: '¿Qué es el cuerpo eléctrico? Por qué tu cuerpo se puede leer como un mapa',
      description: 'Entre tus células hay un sistema con carga eléctrica que regula la comunicación de cada tejido. Entenderlo cambia la pregunta que le hacemos al cuerpo.',
      category: 'Regulación Bioeléctrica',
      content: `Estamos acostumbrados a pensar el cuerpo en términos químicos: hormonas, nutrientes, medicamentos. Y no está mal — es la capa en la que se mueve buena parte de la medicina moderna. Pero hay otra capa, más antigua y más rápida, que organiza todo lo demás y que solemos pasar por alto: la capa eléctrica.

No hablamos de metáforas. La bioelectricidad es un campo de investigación con nombres, laboratorios y publicaciones. Robert Becker abrió el camino a mediados del siglo pasado estudiando cómo la corriente eléctrica participa en la regeneración de los tejidos. Décadas después, el biólogo Michael Levin, en la Universidad de Tufts, lo llevó al detalle celular con trabajos publicados en revistas como Cell, Frontiers y PNAS.

La matriz que rodea a las células:
Entre tus células no hay un espacio vacío. Hay un sistema activo, con carga eléctrica, que regula la comunicación celular, la distribución de iones y el microambiente de cada tejido. Es el terreno donde ocurre todo lo demás. Cuando esa carga se altera —por inflamación, acidosis o estrés sostenido— se crean las condiciones para la enfermedad, muchas veces antes de que aparezca cualquier síntoma. Ahí está la oportunidad: leer el terreno antes de que se rompa.

El voltaje de cada célula:
Cada célula mantiene un voltaje en su membrana, lo que se conoce como Vmem. Durante mucho tiempo se pensó que era simplemente un subproducto del metabolismo, un dato pasivo. Hoy sabemos que es lo contrario: es una señal que le indica a la célula qué hacer. Levin demostró que modificar ese voltaje cambia el comportamiento de un tejido —cómo crece, cómo se organiza, incluso qué forma toma— sin tocar el ADN.

> La información eléctrica no es consecuencia de la biología. En buena medida, la instruye.

El cuerpo como red, no como puntos sueltos:
Las células de un tejido están conectadas entre sí por uniones llamadas gap junctions, y a través de ellas comparten información eléctrica. Una señal puede viajar a zonas distantes en cuestión de segundos. Por eso, desde este marco, el cuerpo se lee como una red continua y no como una colección de partes aisladas: lo que ocurre en un punto puede estar sosteniendo lo que se manifiesta en otro, lejos de ahí.

Cada órgano defiende una meta:
Un órgano no es una pieza pasiva: se comporta como un sistema que defiende un punto de calibración, un rango en el que "sabe" funcionar. Cuando algo lo desafía, responde para volver a ese rango. El problema aparece cuando la respuesta se queda encendida después de que el desafío ya pasó.

Un ejemplo que lo vuelve concreto es el del ojo que se adapta: por qué un niño se vuelve miope puede leerse no como una simple falla óptica, sino como una adaptación del sistema a las condiciones en las que vive. La misma imagen —una respuesta que resolvió algo y luego no se apagó— reaparece en muchos otros cuadros.

Un cambio en la pregunta:
Aquí está el giro que propone este marco. Desde la mirada bioeléctrica, la enfermedad muchas veces no es un error del cuerpo: es una respuesta que se quedó activa cuando ya no hacía falta. La pregunta deja de ser solo "¿qué está roto?" y pasa a ser "¿qué señal se quedó encendida, y cómo ayudo al tejido a recalibrarse?".

Ese cambio de pregunta también sirve para quien está sano. No se trata solo de corregir lo que ya falló, sino de cuidar el terreno para que siga funcionando bien: es lo que en fisiología se llama salutogénesis —el estudio de lo que genera salud— frente a la carga que el cuerpo acumula con el tiempo.

Una nota necesaria:
Esto no reemplaza a la medicina, al diagnóstico ni al tratamiento profesional. Es un marco de lectura, con fundamento en la ciencia contemporánea de la bioelectricidad, que orienta el trabajo de regulación y el cuidado a largo plazo. Entender el cuerpo como un mapa que se puede leer no sustituye al mapa clínico: lo complementa.`,
      imageUrl: '/images/courses/regulacion-bioelectrica/propuesta_1_fondo_mapa_becker.webp',
      author: 'Dr. Miguel Ojeda Rios',
      readTime: '6 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['El cuerpo tiene una capa eléctrica', 'El voltaje instruye al tejido', 'Se lee como una red, no como puntos'],
      relatedCourseIds: [106],
    },
    {
      id: 21,
      title: 'Por qué 128 Hz: la frecuencia que la neurología usa para medir y la terapia usa para intervenir',
      description: 'Un diapasón de 128 Hz entra por el hueso y llega al sistema nervioso antes de que la mente opine. Qué lo hace distinto de "poner música relajante".',
      category: 'Sonido terapéutico',
      content: `No toda vibración es igual, y no todas las frecuencias hacen lo mismo. La de 128 Hz tiene una particularidad que la separa del resto: es la que la neurología clínica emplea desde hace décadas para evaluar la conducción ósea y explorar la sensibilidad. Cuando un neurólogo apoya un diapasón sobre un hueso para valorar cómo viaja la vibración por el cuerpo, usa precisamente esta frecuencia. No es "mística": es una herramienta de medición con historia.

Que la misma frecuencia sirva para medir y para intervenir no es casualidad. Habla de una vía de entrada al cuerpo que es física, medible y repetible.

Del hueso al sistema nervioso:
Cuando apoyas un diapasón de 128 Hz sobre el cuerpo, su vibración no entra por el oído: viaja a través del hueso y del tejido conectivo hasta el sistema nervioso. Esa distinción lo cambia todo. Escuchar música relajante es una experiencia que pasa por la interpretación —te gusta, te recuerda algo, te calma—. La vibración por conducción ósea, en cambio, llega al tejido antes de que la mente tenga tiempo de opinar. No le pide permiso a la interpretación.

Tu voz también es un instrumento:
Aquí hay una buena noticia: no necesitas comprar nada para empezar. El tarareo —el humming, ese zumbido con la boca cerrada— es una de las formas más accesibles de trabajar la vibración desde dentro. Y no es un decir: hay evidencia de que el tarareo aumenta de forma marcada la producción de óxido nítrico nasal, una molécula asociada a la función vascular y respiratoria. Una parte importante del efecto vibratorio puede lograrse con la propia voz, sin instrumento.

La diferencia está en la secuencia:
Y llegamos a lo esencial, lo que distingue este trabajo de "poner sonidos bonitos". Una frecuencia, por sí sola, relaja. Pero lo que convierte al sonido en una herramienta de regulación no es la frecuencia: es la estructura. Cómo, dónde, en qué puntos y en qué orden se aplica.

> Un diapasón sin secuencia es relajación. El mismo diapasón dentro de una secuencia con intención es intervención.

Por eso este enfoque no consiste en repartir vibración al azar, sino en trabajar con un método: puntos concretos del cuerpo, un orden, una intención clara. La misma herramienta, usada con estructura, deja de ser un rato agradable para convertirse en trabajo sobre el sistema nervioso.

Una nota necesaria:
Este es contenido educativo. La vibración terapéutica acompaña procesos de bienestar y regulación; no sustituye el tratamiento médico cuando este es necesario, ni pretende reemplazar un diagnóstico.`,
      imageUrl: '/images/courses/resonantia/Resonantia.webp',
      author: 'Dr. Miguel Ojeda Rios',
      readTime: '5 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['128 Hz es una frecuencia de medición clínica', 'Entra por el hueso, no por el aire', 'La secuencia convierte sonido en intervención'],
      relatedCourseIds: [107],
    },
    {
      id: 22,
      title: 'El cuerpo no distingue entre una experiencia real y un acto ritual',
      description: 'Hay cosas que la mente ya entendió pero el cuerpo no soltó. Por qué un acto físico con suficiente carga sensorial logra lo que entenderlo no basta para mover.',
      category: 'Rituales terapéuticos',
      content: `Casi todos hemos vivido esto: entendemos perfectamente lo que nos pasó. Podemos explicarlo con claridad, ponerle nombre, incluso aconsejar a otro que atraviesa lo mismo. Y sin embargo, algo sigue apretado en el cuerpo. La comprensión llegó hace tiempo; el cambio, no. Es una de las experiencias más frustrantes que existen: saber, y que saber no baste.

Por qué entender no siempre alcanza:
La razón es más sencilla de lo que parece, y tiene que ver con dos lenguajes distintos. La mente trabaja con palabras y significados. El cuerpo trabaja con experiencias. Cuando algo nos marcó, no quedó guardado como una idea ordenada, sino como una huella sensorial: una tensión en los hombros, un gesto que se repite, una forma de respirar cuando aparece cierto tema. Y esa huella no vive en el terreno de las palabras, así que no se disuelve con una explicación, por correcta que sea. Le hablamos en un idioma que no es el suyo.

Lo que hace un acto ritual:
Aquí entra otra vía. Un acto físico —romper una pieza de cerámica y repararla con oro, escribir una carta y enterrarla para sembrar una semilla encima, sostener una piedra pesada y después soltarla— tiene una cualidad que la conversación no tiene: es irreversible y sucede en el cuerpo, no en la cabeza. La cerámica rota no vuelve a estar entera. La semilla queda en la tierra. El cuerpo estuvo ahí, hizo el gesto, sintió el peso.

> El cuerpo no distingue entre una experiencia real y una experiencia ritual con suficiente carga sensorial.

Con suficiente carga sensorial —peso, textura, temperatura, esfuerzo, gesto— el sistema nervioso registra el acto como una experiencia real, no como un símbolo que hay que interpretar. Y a partir de esa experiencia, algo puede recalibrarse en el mismo idioma en que quedó grabado.

No necesitas creerlo:
Esta es quizá la parte más contraintuitiva, y la más liberadora. No hace falta convicción previa. No hace falta "sentir la energía" ni entender la teoría antes de empezar. No se trata de creer que el acto funciona: se trata de hacerlo con presencia, de estar de verdad ahí mientras sucede. El cuerpo hace el resto.

Por eso, cuando se le pregunta a la gente qué se llevó, casi nunca responde con una idea nueva. Responde con una sensación: "algo se movió", "contacté con algo que no podía alcanzar con la mente", "no necesitaba creerlo, solo sucedió". No cambiaron de opinión. Cambió algo por debajo de la opinión.

Una nota necesaria:
Este contenido es educativo y describe un enfoque vivencial de trabajo corporal y emocional. No sustituye la atención psicológica ni médica cuando es necesaria; cuando hay heridas profundas, el acompañamiento profesional es parte del cuidado, no una alternativa a él.`,
      imageUrl: '/images/courses/actos-que-mueven/ritual_2.webp',
      author: 'Dr. Miguel Ojeda Rios',
      readTime: '5 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['La comprensión no siempre mueve el cuerpo', 'Un acto irreversible deja huella real', 'No requiere creer: requiere hacer'],
      relatedCourseIds: [105],
    },
    {
      id: 1,
      title: 'Respirar más lento: una práctica de cinco minutos para bajar el ritmo',
      description: 'Una guía breve para hacer una pausa, observar tu respiración y retomar el día con más presencia.',
      category: 'Hábitos de bienestar',
      content: `Cuando el día se acelera, la respiración puede volverse corta y rápida. Esta práctica propone detenerte cinco minutos y recuperar un ritmo más cómodo, sin forzar el cuerpo.

Prueba esta práctica:
1. Siéntate con ambos pies apoyados en el suelo.
2. Inhala por la nariz durante cuatro segundos.
3. Exhala lentamente durante seis segundos.
4. Repite durante cinco minutos, sin buscar una respiración perfecta.
5. Si te distraes, vuelve al conteo con amabilidad.

Qué puedes observar:
Al terminar, nota si cambió la tensión de tus hombros, el ritmo de tus pensamientos o tu forma de estar sentado. No necesitas sentir algo extraordinario: reconocer una diferencia pequeña también es información útil.

Cómo convertirla en hábito:
Úsala al despertar, antes de una conversación importante o al cerrar la jornada. Vincularla con una actividad que ya haces facilita que se vuelva parte de tu rutina.

Cuida esto:
Si aparece mareo, incomodidad o sensación de falta de aire, detén la práctica y vuelve a tu respiración natural. La intención es acompañar al cuerpo, no exigirle.`,
      author: 'Equipo editorial',
      readTime: '5 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Exhalar un poco más largo', 'Soltar hombros y mandíbula', 'Practicar con regularidad'],
      relatedCourseIds: [107],
      imageUrl: '/images/news/editorial/respiracion-consciente.webp',
    },
    {
      id: 2,
      title: 'Una rutina nocturna de 20 minutos para preparar el descanso',
      description: 'Un ritual de cierre sencillo para bajar el ritmo y crear señales claras de que el día terminó.',
      category: 'Descanso y recuperación',
      content: `Dormir no siempre empieza cuando apagas la luz. Para muchas personas, el descanso se prepara durante la última parte del día, con señales repetibles y menos estímulos.

Prueba esta rutina:
1. Dedica cinco minutos a estirar suavemente cuello, hombros y piernas.
2. Deja el teléfono fuera de la cama y prepara lo que necesitarás por la mañana.
3. Reserva diez minutos para leer, escribir o hacer una actividad tranquila.
4. Cierra con cinco minutos de respiración lenta o silencio.

Qué revisar:
Durante una semana, observa la hora de la cena, el consumo de cafeína, la luz de la habitación y las preocupaciones que llevas a la cama. No busques hacerlo perfecto; busca reconocer patrones.

Una rutina flexible:
Si una noche no puedes cumplir los veinte minutos, conserva una sola señal de cierre. La regularidad suele ser más útil que una rutina extensa que no puedes sostener.

Cuida esto:
Si las dificultades para dormir son persistentes o afectan tu funcionamiento diario, consulta con un profesional de salud para valorar tu caso.`,
      author: 'Equipo editorial',
      readTime: '6 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Crear señales de cierre', 'Reducir estímulos por la noche', 'Priorizar regularidad'],
      relatedCourseIds: [104],
      imageUrl: '/images/news/editorial/sueno-reparador.webp',
    },
    {
      id: 3,
      title: 'Cómo armar un plato variado sin dietas extremas',
      description: 'Una guía práctica para organizar tus comidas con variedad, calidad y equilibrio, sin convertirlas en una lista de prohibiciones.',
      category: 'Nutrición funcional',
      content: `Comer mejor no tiene que empezar con una dieta rígida. Una forma más sostenible es revisar la variedad del plato y hacer cambios pequeños que puedas repetir.

Arma tu plato:
- Usa aproximadamente la mitad para vegetales variados.
- Añade una fuente de proteína, como huevo, pescado, leguminosas o pollo.
- Completa con un carbohidrato que disfrutes, como camote, quinoa o arroz integral.
- Agrega grasas y sabor con aguacate, nueces, aceite de oliva o especias.

Empieza por una comida:
Durante siete días, mejora solo el desayuno o la cena. Observa saciedad, digestión, energía y facilidad para sostener el cambio. Una modificación realista puede enseñarte más que un plan perfecto que abandonas.

Qué evitar en el lenguaje:
No necesitas clasificar los alimentos como "buenos" o "malos" para tomar decisiones. Conviene hablar de frecuencia, variedad, contexto y preferencias personales.

Cuida esto:
Esta guía es educativa. Las necesidades cambian según la edad, la actividad física y las condiciones de salud. Para una recomendación individual, consulta con un profesional de nutrición.`,
      author: 'Equipo editorial',
      readTime: '7 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Priorizar variedad', 'Combinar grupos de alimentos', 'Cambiar una cosa a la vez'],
      relatedCourseIds: [101],
      imageUrl: '/images/news/editorial/nutricion-funcional.webp',
    },
    {
      id: 4,
      title: '15 minutos de movilidad para empezar con menos rigidez',
      description: 'Una secuencia amable para despertar articulaciones, cambiar de postura y volver al cuerpo sin exigencia.',
      category: 'Movimiento terapéutico',
      content: `Si pasas muchas horas sentado o despiertas con el cuerpo rígido, una secuencia breve puede ayudarte a empezar con más atención. La prioridad no es la intensidad: es moverte dentro de un rango cómodo.

Secuencia de 15 minutos:
- Cuello y hombros: tres minutos.
- Columna y cadera: cinco minutos.
- Piernas y tobillos: cinco minutos.
- Respiración y pausa final: dos minutos.

Cómo practicarla:
Haz cada movimiento de forma lenta y reduce el rango si aparece molestia. Puedes usar una pared o una silla para sentirte estable. Al final, anota una palabra sobre cómo se siente tu cuerpo.

Hazla sostenible:
Elige un momento fijo, como después de levantarte o antes de terminar la jornada. Si solo tienes cinco minutos, conserva un movimiento de cada bloque y vuelve a la práctica al día siguiente.

Cuida esto:
Si estás recuperándote de una lesión o tienes una condición que limita el movimiento, busca orientación profesional antes de iniciar una rutina nueva.`,
      author: 'Equipo editorial',
      readTime: '5 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Mover sin rebotes', 'Respetar el rango cómodo', 'Elegir regularidad'],
      relatedCourseIds: [106],
      imageUrl: '/images/news/editorial/movimiento-terapeutico.webp',
    },
    {
      id: 5,
      title: 'Cómo repartir los líquidos durante el día',
      description: 'Una guía sencilla para observar tus señales de sed y acompañar el agua con hábitos cotidianos.',
      category: 'Hábitos de bienestar',
      content: `Hidratarte mejor no consiste en perseguir una cifra idéntica todos los días. El clima, la actividad, la alimentación y tu estado de salud cambian lo que necesitas.

Distribuye tus tomas:
1. Empieza el día con un vaso de agua si te resulta cómodo.
2. Lleva una botella medible y toma pequeñas cantidades a lo largo de la jornada.
3. Ajusta tu consumo si hace calor o realizas actividad física.
4. Incluye alimentos ricos en agua, como frutas, verduras y sopas.

Mira el contexto:
La sed, la boca seca, el dolor de cabeza y la orina más concentrada pueden orientarte, pero no sustituyen una valoración. No hace falta beber de manera forzada para cumplir una meta.

Un hábito fácil:
Deja agua disponible en los lugares donde pasas más tiempo. La visibilidad y la comodidad suelen ayudar más que una regla complicada.

Cuida esto:
Si tienes restricciones de líquidos o una enfermedad renal o cardiaca, consulta con tu equipo de salud antes de cambiar de forma importante tu consumo.`,
      author: 'Equipo editorial',
      readTime: '4 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Repartir las tomas', 'Observar señales del cuerpo', 'Beber sin forzar'],
      relatedCourseIds: [102],
      imageUrl: '/images/news/editorial/hidratacion-inteligente.webp',
    },
    {
      id: 6,
      title: 'Micro-pausas: tres pasos para responder con más calma',
      description: 'Una práctica breve para interrumpir el piloto automático y elegir el siguiente paso con más claridad.',
      category: 'Salud emocional',
      content: `No siempre puedes detener lo que ocurre durante el día. Sí puedes crear un pequeño espacio antes de responder. Una micro-pausa dura entre uno y tres minutos y puede ocurrir entre dos tareas.

Método de tres pasos:
1. Reconocer: ponle nombre a lo que sientes, sin convertirlo en una etiqueta sobre ti.
2. Respirar: haz seis respiraciones lentas y permite que los hombros bajen.
3. Elegir: decide qué necesitas hacer ahora, no qué tendrías que resolver para siempre.

Cuándo probarla:
- Antes de responder un mensaje difícil.
- Al terminar una reunión intensa.
- Antes de comer, si notas que estás en piloto automático.
- Al cambiar de una tarea a otra.

Una pausa posible:
Puedes practicarla mientras esperas que hierva el agua o antes de abrir una nueva pestaña. No tiene que verse perfecta; solo necesita darte un momento de elección.

Cuida esto:
Si una emoción se siente abrumadora o existe riesgo para ti o para alguien más, busca apoyo profesional y una red de confianza. Regular no significa hacerlo todo a solas.`,
      author: 'Equipo editorial',
      readTime: '4 min de lectura',
      reviewedAt: '24 de julio de 2026',
      highlights: ['Nombrar lo que ocurre', 'Respirar antes de actuar', 'Elegir el siguiente paso'],
      relatedCourseIds: [105],
      imageUrl: '/images/news/editorial/salud-emocional.webp',
    },
  ] as NewsArticle[],

  apps: [
    {
      id: 1,
      name: 'Framer',
      category: 'Plataforma de Diseño Web',
      description: 'Pasa fácilmente del diseño a un sitio de primera clase con Framer, el constructor web para profesionales creativos. Optimiza para cada punto de interrupción, sin necesidad de código y publica de forma gratuita.',
      logo: null, // Se maneja en el componente
      website: '#',
    },
    {
      id: 2,
      name: 'Notion',
      category: 'Espacio de Trabajo',
      description: 'Una nueva herramienta que combina tus aplicaciones de trabajo diarias en una sola. Es el espacio de trabajo todo en uno para ti y tu equipo.',
      logo: null,
      website: '#',
    },
    {
      id: 3,
      name: 'Lemon Squeezy',
      category: 'Plataforma de Pagos',
      description: 'Lemon Squeezy es la plataforma todo en uno para gestionar tu negocio SaaS. Pagos, suscripciones, cumplimiento fiscal global, prevención de fraudes, multidivisa.',
      logo: null,
      website: '#',
    },
    {
      id: 4,
      name: 'Gumroad',
      category: 'Plataforma de Pagos',
      description: 'Gumroad: hacemos que sea fácil ganar tu primer dólar en línea vendiendo productos digitales y membresías. Gumroad fue creado para ayudarte a experimentar con todo tipo de ideas y formatos.',
      logo: null,
      website: '#',
    },
    {
      id: 5,
      name: 'Asana',
      category: 'Gestión de Proyectos',
      description: 'Mantén a todos y todo organizado. Con Asana, puedes asignar tareas, establecer plazos y seguir el progreso. Mantén a los equipos remotos y distribuidos enfocados en sus metas.',
      logo: null,
      website: '#',
    },
    {
      id: 6,
      name: 'Diagram',
      category: 'Herramienta de Diseño IA',
      description: 'Un diagrama es una representación simbólica de información usando técnicas de visualización. Los diagramas se han utilizado desde tiempos prehistóricos, pero se hicieron más frecuentes durante la Ilustración.',
      logo: null,
      website: '#',
    },
  ] as AppInfo[],

  events: [
    {
      id: 1,
      title: 'Lo Que Tu Mascota Quiere Decirte — Módulo 1',
      description: 'Tu Mascota Es Tu Espejo. Remedios florales, lectura del campo mórfico y los 10 conflictos más comunes mascota-dueño.',
      date: '2026-03-27T15:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 2,
      title: 'Lo Que Tu Mascota Quiere Decirte — Módulo 2',
      description: 'Sana el Vínculo con Tu Animal. Pares biomagnéticos para mascotas, fórmulas avanzadas de flores y protocolo integrado.',
      date: '2026-04-10T15:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 3,
      title: 'El Reset Hormonal — El Mapa',
      description: 'Cartografía Hormonal Femenina: 9 mapas de regulación para climaterio y postmenopausia.',
      date: '2026-05-16T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 4,
      title: 'El Reset Hormonal — El Método',
      description: 'Protocolos de aplicación, fitoterapia específica y La Botica del Reset.',
      date: '2026-05-30T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 5,
      title: 'Actos que Mueven — Los 5 Actos Fundamentales',
      description: 'Taller vivencial de rituales personales. Cinco actos rituales con la Secuencia TAME.',
      date: '2026-06-06T10:00:00Z',
      type: 'workshop',
      location: 'Presencial',
    },
    {
      id: 6,
      title: 'Actos que Mueven — La Secuencia que Transforma',
      description: 'Secuencia progresiva de 6 actos encadenados: Descenso, Encuentro y Ascenso.',
      date: '2026-06-20T10:00:00Z',
      type: 'workshop',
      location: 'Presencial',
    },
    {
      id: 7,
      title: 'Regulación Bioeléctrica — El Cuerpo Eléctrico',
      description: 'Módulo 1: Qué es el cuerpo eléctrico, la matriz extracelular, el voltaje de la célula (Vmem) y el caso del Ojo Adaptativo.',
      date: '2026-07-11T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 8,
      title: 'Regulación Bioeléctrica — La lectura del cuerpo',
      description: 'Módulo 2: El instrumento, la lectura del perfil bioeléctrico y los primeros ejes de regulación.',
      date: '2026-07-25T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 9,
      title: 'Regulación Bioeléctrica — Los ejes de regulación',
      description: 'Módulo 3: Los ejes completos y el criterio para decidir cuál atender primero cuando hay varios.',
      date: '2026-08-08T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
    {
      id: 10,
      title: 'Regulación Bioeléctrica — La sesión completa',
      description: 'Módulo 4: La sesión completa, el mantenimiento, casos clínicos y supervisión en vivo.',
      date: '2026-08-22T10:00:00Z',
      type: 'workshop',
      location: 'Presencial u Online',
    },
  ] as CalendarEvent[],
};

// Función de búsqueda optimizada
export const searchData = (query: string): SearchResults => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

  if (searchTerms.length === 0) {
    return {
      courses: [],
      services: [],
      products: [],
      news: [],
      events: [],
    };
  }

  const filterByTerms = (items: any[], searchFields: string[]) => {
    return items.filter(item =>
      searchTerms.every(term =>
        searchFields.some(field => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(term);
        })
      )
    );
  };

  return {
    courses: filterByTerms(MOCK_DATA.courses, ['title', 'description', 'level']),
    services: filterByTerms(MOCK_DATA.services, ['title', 'description']),
    products: filterByTerms(MOCK_DATA.products, ['name', 'description', 'category']),
    news: filterByTerms(MOCK_DATA.news, ['title', 'description', 'category']),
    events: filterByTerms(MOCK_DATA.events, ['title', 'description', 'location']),
  };
};
