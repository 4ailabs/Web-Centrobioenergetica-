import type { Course, NewsArticle, AppInfo } from '../types';

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
}

// Datos centralizados
export const MOCK_DATA = {
  courses: [
    {
      id: 1,
      title: 'Biomagnetismo Kids',
      description: 'Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños y su desarrollo energético.',
      author: '',
      price: 0,
      lessons: 12,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Oh Cards',
      description: 'Descubre el poder terapéutico de las Oh Cards como herramienta de autoconocimiento y sanación emocional.',
      author: '',
      price: 0,
      lessons: 8,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Morphic Field Therapy',
      description: 'Aprende sobre los campos morfogenéticos y cómo utilizarlos para la sanación y transformación personal.',
      author: '',
      price: 0,
      lessons: 15,
      level: 'Intermedio' as const,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'El Secreto de las Vitaminas y Minerales',
      description: 'Descubre los micronutrientes esenciales y su papel fundamental en el equilibrio energético y la salud integral.',
      author: '',
      price: 0,
      lessons: 20,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Gestalting Modelado Creativo',
      description: 'Técnicas de modelado creativo basadas en la terapia gestalt para el desarrollo personal y artístico.',
      author: '',
      price: 0,
      lessons: 14,
      level: 'Intermedio' as const,
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: 'Flores de Bach',
      description: 'Descubre el sistema de sanación natural con esencias florales del Dr. Edward Bach para el equilibrio emocional.',
      author: '',
      price: 0,
      lessons: 16,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 7,
      title: 'Despertar Intuitivo',
      description: 'Desarrolla y fortalece tu intuición natural a través de técnicas de conexión energética y meditación.',
      author: '',
      price: 0,
      lessons: 18,
      level: 'Intermedio' as const,
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 8,
      title: 'Auriculoterapia',
      description: 'Aprende la técnica de acupuntura auricular para el tratamiento de diversos desequilibrios energéticos.',
      author: '',
      price: 0,
      lessons: 22,
      level: 'Avanzado' as const,
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 9,
      title: 'Taller de Alimentación',
      description: 'Taller práctico sobre alimentación consciente y su impacto en el bienestar energético y físico.',
      author: '',
      price: 0,
      lessons: 10,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 10,
      title: 'Nutrigenómica y Genotipos',
      description: 'Explora la relación entre la nutrición, la genética y el bienestar personal a través de la nutrigenómica.',
      author: '',
      price: 0,
      lessons: 25,
      level: 'Avanzado' as const,
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 11,
      title: 'Terapia de Muñecos y Playmobil',
      description: 'Técnica básica y explorando los caminos de la vida a través del juego terapéutico con muñecos.',
      author: '',
      price: 0,
      lessons: 12,
      level: 'Principiante' as const,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 12,
      title: 'Taller de Sandplay',
      description: 'Explora el mundo del sandplay como herramienta terapéutica para el autoconocimiento y sanación.',
      author: '',
      price: 0,
      lessons: 14,
      level: 'Intermedio' as const,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 13,
      title: 'Lego Serious Play',
      description: 'Metodología de pensamiento con las manos para materializar ideas complejas y descubrir insights profundos.',
      author: '',
      price: 0,
      lessons: 16,
      level: 'Intermedio' as const,
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 14,
      title: 'Conflictos Biológicos',
      description: 'Comprende la relación entre conflictos emocionales y manifestaciones biológicas para la sanación integral.',
      author: '',
      price: 0,
      lessons: 18,
      level: 'Avanzado' as const,
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 15,
      title: 'Par Biomagnético',
      description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
      author: '',
      price: 0,
      lessons: 22,
      level: 'Avanzado' as const,
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
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
      author: 'Henry Carter',
      imageUrl: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Revolución del Bienestar en la Educación para Adultos',
      description: 'Plataformas pioneras de e-learning ofrecen extensos programas de formación en bienestar.',
      author: 'Elisabeth Brooks',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Aplicaciones Innovadoras para el Crecimiento Personal',
      description: 'Una plataforma particular utiliza inteligencia artificial para guiarte en tu desarrollo personal.',
      author: 'Steve Mills',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Tendencias en Bienestar y E-Learning para 2024',
      description: 'El aprendizaje en línea continúa evolucionando, con tendencias de bienestar actualizadas para 2024.',
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
  };
};
