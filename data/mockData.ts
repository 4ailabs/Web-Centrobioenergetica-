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
      id: 101, // New ID to avoid collision
      title: 'Nutrición con Aminoácidos',
      description: 'Aprende cómo los aminoácidos esenciales transforman tu salud, potencian tu energía y equilibran tu bioquímica corporal.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 3,
      level: 'Intermedio' as const,
      imageUrl: '/images/courses/aminoacidos.png',
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
              cloudflareStreamId: 'ff0846b7205163091e526a387e578d7b',
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
      id: 102, // New ID
      title: 'Set Point',
      description: 'Descubre y ajusta tu punto de ajuste metabólico y energético para alcanzar un bienestar sostenible y definitivo.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 2,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/setpoint.png',
      modules: [
        {
          id: 1,
          title: 'Módulo Único: Ajustando tu Set Point',
          description: 'Conceptos clave y práctica.',
          order: 1,
          videos: [
            {
              id: 1,
              title: '¿Qué es el Set Point?',
              description: 'Entendiendo el termostato metabólico.',
              duration: '15:00',
              order: 1,
            },
            {
              id: 2,
              title: 'Reprogramación Bioenergética',
              description: 'Técnicas para modificar tu punto de ajuste.',
              duration: '20:00',
              order: 2,
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
      title: 'Flores de Bach',
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
      id: 1,
      title: 'El Poder de la Respiración Consciente en el Día a Día',
      description: 'Nuevos estudios revelan cómo la respiración puede impactar positivamente tu salud física y mental.',
      category: 'Salud Integral',
      content: `La respiración consciente no es solo una técnica de relajación; es una herramienta poderosa que influye directamente en nuestro sistema nervioso autónomo. Al practicarla regularmente, podemos reducir los niveles de cortisol, la hormona del estrés, y mejorar significativamente nuestra claridad mental y capacidad de respuesta emocional.

Beneficios clave:
1. Regulación del Nervio Vago: Activa la respuesta de relajación del cuerpo.
2. Equilibrio Bioquímico: Optimiza el intercambio de oxígeno y dióxido de carbono a nivel celular.
3. Enfoque Mental: Reduce la "niebla mental" y mejora la concentración sostenida.

Técnicas sugeridas:
- Respiración en Caja (4-4-4-4): Inhala en 4, mantén en 4, exhala en 4, mantén en 4. Ideal para momentos de alta tensión.
- Respiración Diafragmática: Enfócate en expandir el abdomen en lugar del pecho para una oxigenación más profunda.

Integrar breves pausas de respiración consciente a lo largo del día puede transformar tu energía vital y tu bienestar a largo plazo.`,
      author: 'Henry Carter',
      imageUrl: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Revolución del Bienestar en la Educación para Adultos',
      description: 'Plataformas pioneras de e-learning ofrecen extensos programas de formación en bienestar.',
      category: 'E-Learning',
      content: 'La educación para adultos está experimentando un cambio de paradigma, donde el bienestar emocional se considera tan importante como las habilidades técnicas. Nuevos programas integran meditación y gestión del estrés en su currículo.',
      author: 'Elisabeth Brooks',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Aplicaciones Innovadoras para el Crecimiento Personal',
      description: 'Una plataforma particular utiliza inteligencia artificial para guiarte en tu desarrollo personal.',
      category: 'Tecnología',
      content: 'La inteligencia artificial está permitiendo una personalización sin precedentes en el crecimiento personal. Estas aplicaciones analizan patrones de comportamiento para ofrecer consejos personalizados en tiempo real.',
      author: 'Steve Mills',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Tendencias en Bienestar y E-Learning para 2024',
      description: 'El aprendizaje en línea continúa evolucionando, con tendencias de bienestar actualizadas para 2024.',
      category: 'Tendencias',
      content: 'Para el 2024, esperamos ver una mayor integración de la realidad virtual en las sesiones de bienestar, permitiendo entornos inmersivos para la meditación y el entrenamiento bionergético.',
      author: 'Jessica Hayes',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      title: 'Taller IA: Prompts',
      description: 'Taller práctico para aprender a "hablarle" a la inteligencia artificial con instrucciones efectivas (prompts) para obtener mejores respuestas en trabajo, consultas, terapia, docencia y creación de contenido. Se llevan plantillas listas y ejemplos aplicados a casos reales.',
      date: '2026-02-06T18:00:00Z',
      type: 'workshop',
      location: 'Online',
    },
    {
      id: 2,
      title: 'Set Point | Módulo 2',
      description: 'Continuación del programa de Set Point (punto de ajuste). Enfocado en profundizar en patrones, regulación interna y reprogramación de hábitos/estado emocional para sostener cambios. Se trabajan ejercicios guiados y herramientas aplicables en la vida diaria.',
      date: '2026-02-07T10:00:00Z',
      type: 'workshop',
      location: 'Centro Bioenergética',
    },
    {
      id: 3,
      title: 'Nutrición con aminoácidos (2 modulo)',
      description: 'Sesión formativa sobre cómo usar aminoácidos como estrategia nutricional: energía, recuperación, saciedad, masa muscular, estado de ánimo y soporte metabólico. Ideal para quienes quieren entender el "por qué" y el "cómo" de una suplementación inteligente.',
      date: '2026-02-09T19:00:00Z',
      type: 'live',
      location: 'Online',
    },
    {
      id: 4,
      title: 'Taller Leche Dorada',
      description: 'Taller de preparación y uso funcional de la "leche dorada" (cúrcuma y sinergias). Enfoque: bienestar digestivo, soporte antiinflamatorio, descanso y rutina de cuidado diario. Se llevan receta, variaciones y guía de uso.',
      date: '2026-02-13T17:00:00Z',
      type: 'workshop',
      location: 'Presencial',
    },
    {
      id: 5,
      title: 'LSP: El ADN de tu marca',
      description: 'Sesión con LEGO® Serious Play para definir el ADN de marca: propósito, esencia, valores, diferenciadores, promesa y personalidad. Súper útil para emprendedores, terapeutas, coaches y proyectos que quieren claridad para comunicar y vender mejor.',
      date: '2026-02-16T09:00:00Z',
      type: 'workshop',
      location: 'Centro Bioenergética',
    },
    {
      id: 6,
      title: 'Taller Mantequilla Ghee',
      description: 'Taller práctico para elaborar ghee y aprender a usarlo en la cocina diaria. Se aborda calidad de grasas, digestión, puntos de humo, conservación y recetas simples para integrar el ghee como base culinaria.',
      date: '2026-02-20T18:00:00Z',
      type: 'workshop',
      location: 'Cocina Terapéutica',
    },
    {
      id: 7,
      title: 'Bioenergética básica',
      description: 'Introducción estructurada a fundamentos de bioenergética: lectura del cuerpo, energía vital, regulación emocional y herramientas básicas de trabajo personal. Ideal como primera puerta para quien quiere entender el enfoque y aplicarlo de forma ordenada.',
      date: '2026-02-21T10:00:00Z',
      type: 'workshop',
      location: 'Centro Bioenergética',
    },
    {
      id: 8,
      title: 'Nutrición con aminoácidos (tercer modulo)',
      description: 'Segunda sesión del mismo eje formativo; puede funcionar como continuación, profundización o como nueva oportunidad para quienes se integran después. Se refuerza aplicación práctica y dudas frecuentes.',
      date: '2026-02-23T19:00:00Z',
      type: 'live',
      location: 'Online',
    },
    {
      id: 9,
      title: 'Constelación sistemica',
      description: 'Taller vivencial de constelaciones (enfoque sistémico) para observar dinámicas familiares y patrones repetidos (pareja, dinero, salud, profesión). Trabajo profundo, con insights y movimientos internos de integración.',
      date: '2026-02-26T17:00:00Z',
      type: 'workshop',
      location: 'Sala Sistémica',
    },
    {
      id: 10,
      title: 'Taller de elabracion (Asaí)',
      description: 'Taller tipo "nutri" para preparar açaí (bowls y variaciones) con enfoque funcional: energía, antioxidantes, combinaciones inteligentes, porciones y toppings que suman a objetivos (bienestar, rendimiento, saciedad).',
      date: '2026-02-27T18:00:00Z',
      type: 'workshop',
      location: 'Cocina Terapéutica',
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
    news: filterByTerms(MOCK_DATA.news, ['title', 'description', 'author']),
    events: filterByTerms(MOCK_DATA.events, ['title', 'description', 'location']),
  };
};
