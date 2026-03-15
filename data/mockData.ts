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
      id: 102,
      title: 'Set Point',
      description: 'Descubre y ajusta tu punto de ajuste metabólico y energético para alcanzar un bienestar sostenible y definitivo.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 4,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/setpoint/image.png',
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
      imageUrl: '/images/courses/aminoacidos/Nutricion_aminoacidos_poster.jpg',
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
      description: 'Nivel avanzado de formación bioenergética. Tres módulos intensivos de jornada completa para profundizar en los principios y aplicaciones de la bioenergética clínica.',
      author: 'Centro Bioenergética',
      price: 0,
      lessons: 3,
      level: 'Avanzado' as const,
      imageUrl: '/images/courses/bioenergetica-v4/Bioenergetica.png',
      modules: [
        {
          id: 1,
          title: 'Módulo 1: Fundamentos Avanzados',
          description: 'Revisión y profundización de los principios bioenergéticos. Jornada de 10:00 a 18:00.',
          order: 1,
          videos: [
            {
              id: 1,
              title: 'Módulo 1 — Bioenergética V4',
              description: 'Jornada completa. 10:00 – 18:00 h.',
              duration: '8:00:00',
              order: 1,
            },
          ],
        },
        {
          id: 2,
          title: 'Módulo 2: Aplicación Clínica',
          description: 'Protocolos avanzados y casos clínicos aplicados. Jornada de 10:00 a 18:00.',
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
          title: 'Módulo 3: Integración y Práctica',
          description: 'Integración de contenidos y práctica supervisada. Jornada de 10:00 a 18:00.',
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
      title: 'Respiración Consciente para Regular Estrés y Energía',
      description: 'Aprende una rutina diaria paso a paso para bajar tensión, mejorar enfoque y sostener energía estable durante la jornada.',
      category: 'Hábitos de Bienestar',
      content: `La respiración consciente es una herramienta central en medicina integrativa y bienestar general. Cuando respiramos de forma lenta y diafragmática, favorecemos la respuesta de calma del cuerpo, reducimos la tensión acumulada y recuperamos claridad para tomar mejores decisiones.

En consulta, muchas personas reportan que su respiración diaria suele ser corta y acelerada. Eso mantiene al cuerpo en estado de alerta y, con el tiempo, se traduce en fatiga, irritabilidad y baja concentración.

Protocolo sugerido:
1. Inhala por nariz 4 segundos.
2. Exhala por nariz 6 segundos.
3. Repite por 5 minutos, 2 veces al día.
4. Mantén hombros sueltos y mandíbula relajada.
5. Si te distraes, vuelve suavemente al conteo.

Beneficios observados:
- Mejor regulación emocional.
- Mayor claridad mental.
- Sensación de energía más estable durante el día.
- Menos tensión cervical al final de la tarde.
- Mejor calidad de descanso nocturno.

Cuándo usarla:
- Antes de una reunión importante.
- Al despertar, antes de revisar el celular.
- Después de comer, para retomar actividades con foco.
- Antes de dormir, como ritual de cierre del día.

Tip práctico: inicia con 3 minutos y aumenta gradualmente. La constancia vale más que la duración.`,
      imageUrl: '/images/news/respiracion-consciente.svg',
    },
    {
      id: 2,
      title: 'Sueño Reparador: Rutina Nocturna desde la Medicina Integrativa',
      description: 'Descubre una rutina nocturna completa para conciliar mejor el sueño, recuperarte más rápido y despertar con más energía.',
      category: 'Descanso y Recuperación',
      content: `Dormir bien es una base del bienestar integral. Desde un enfoque natural, recomendamos una rutina de cierre diario que combine hábitos sencillos, repetibles y adaptables a distintos estilos de vida.

El cuerpo responde mejor cuando recibe señales claras de que el día terminó. Por eso, más que buscar "dormir de golpe", la clave está en preparar gradualmente al sistema nervioso.

Checklist nocturno:
- Cenar ligero 2-3 horas antes de dormir.
- Reducir pantallas 60 minutos antes.
- Tomar una infusión relajante (sin cafeína).
- Respiración lenta durante 3 minutos en cama.
- Mantener habitación oscura, fresca y silenciosa.
- Evitar conversaciones estresantes al cierre del día.

Mini rutina sugerida (20 minutos):
1. 5 min de estiramientos suaves.
2. 10 min de higiene nocturna sin pantallas.
3. 5 min de respiración o lectura tranquila.

Cuando el descanso mejora, también se beneficia la digestión, la regulación del apetito, la memoria y la capacidad de concentración al día siguiente.

Recomendación práctica: mantén horarios similares entre semana y fin de semana para estabilizar tu ritmo circadiano.`,
      imageUrl: '/images/news/sueno-reparador.svg',
    },
    {
      id: 3,
      title: 'Alimentación Antiinflamatoria: Guía Básica para Empezar',
      description: 'Una guía extendida para organizar tus comidas con enfoque antiinflamatorio y sostener resultados sin dietas extremas.',
      category: 'Nutrición Funcional',
      content: `La alimentación antiinflamatoria no es una dieta estricta; es una forma de comer enfocada en calidad, variedad y equilibrio. Su objetivo es disminuir la carga inflamatoria diaria que puede manifestarse como cansancio, digestión pesada, antojos o hinchazón.

En lugar de prohibir alimentos, se priorizan combinaciones que ayuden al cuerpo a recuperarse mejor: fibra, grasas saludables, proteína de calidad e hidratación suficiente.

Recomendaciones iniciales:
1. Prioriza alimentos frescos y de temporada.
2. Incluye grasas saludables (aguacate, nueces, aceite de oliva).
3. Aumenta vegetales de colores en cada comida.
4. Reduce ultraprocesados, azúcares y exceso de harinas refinadas.
5. Incluye fuentes de omega-3 2 a 3 veces por semana.
6. Mantén horarios regulares de comida.

Ejemplo de plato funcional:
- Mitad del plato: vegetales variados.
- Un cuarto: proteína (huevo, pescado, leguminosas o pollo).
- Un cuarto: carbohidrato de calidad (camote, quinoa, arroz integral).
- Extra: aceite de oliva y especias como cúrcuma o jengibre.

En pocas semanas, muchas personas perciben mejor digestión, menos fatiga y mayor estabilidad en su energía.

Tip clave: empieza por mejorar desayuno y cena. Dos cambios sostenidos generan más impacto que diez cambios imposibles de mantener.`,
      imageUrl: '/images/news/nutricion-funcional.svg',
    },
    {
      id: 4,
      title: 'Movimiento Suave: 15 Minutos para Activar Circulación',
      description: 'Te compartimos una secuencia más completa de movilidad consciente para liberar rigidez y elevar tu energía en pocos minutos.',
      category: 'Movimiento Terapéutico',
      content: `No necesitas entrenamientos largos para sentir cambios. Una rutina suave de movilidad articular y estiramientos conscientes durante 15 minutos puede mejorar circulación, postura y energía.

Este tipo de movimiento es ideal para personas que pasan muchas horas sentadas, con estrés acumulado o con sensación de rigidez al despertar. Lo importante no es la intensidad, sino la regularidad y la calidad del movimiento.

Secuencia sugerida:
- Cuello y hombros (3 min).
- Columna y cadera (5 min).
- Piernas y tobillos (5 min).
- Respiración final (2 min).

Pautas para hacerlo bien:
- Mueve lento, sin dolor y sin rebotes.
- Coordina cada movimiento con respiración nasal.
- Mantén atención en la postura y en cómo se siente tu cuerpo.

Resultados esperados tras 2-3 semanas:
- Menor tensión muscular.
- Mejor postura al caminar o trabajar.
- Más energía al inicio del día.

La clave está en la constancia: poco tiempo, todos los días.`,
      imageUrl: '/images/news/movimiento-terapeutico.svg',
    },
    {
      id: 5,
      title: 'Hidratación Inteligente: Más que Tomar Agua',
      description: 'Conoce cómo hidratarte mejor durante el día para apoyar digestión, circulación, piel y rendimiento mental.',
      category: 'Hábitos de Bienestar',
      content: `La hidratación adecuada es una base silenciosa del bienestar. No se trata solo de cantidad, sino de distribución durante el día y de acompañarla con minerales naturales en la alimentación.

Señales frecuentes de hidratación insuficiente:
- Cansancio temprano.
- Dolor de cabeza leve.
- Piel seca.
- Baja concentración.
- Estreñimiento ocasional.

Estrategia práctica:
1. Toma un vaso de agua al despertar.
2. Distribuye tomas pequeñas cada 2-3 horas.
3. Aumenta consumo en días de calor o actividad física.
4. Incluye frutas y verduras ricas en agua.

Tip simple: usa una botella medible para visualizar tu avance diario sin obsesionarte.`,
      imageUrl: '/images/news/hidratacion-inteligente.svg',
    },
    {
      id: 6,
      title: 'Gestión Emocional Cotidiana con Micro-Pausas',
      description: 'Una metodología breve para regular emociones durante el día sin detener por completo tus actividades.',
      category: 'Salud Emocional',
      content: `La salud emocional no se trabaja solo en momentos de crisis. Integrar micro-pausas de 1 a 3 minutos durante el día ayuda a reducir sobrecarga mental y prevenir reacciones impulsivas.

Método 3R:
1. Reconocer: nombra lo que estás sintiendo.
2. Respirar: realiza 6 respiraciones lentas.
3. Reencuadrar: elige una acción pequeña y posible.

Ejemplos de micro-pausas:
- Antes de responder un mensaje difícil.
- Al terminar una reunión intensa.
- Antes de comer, para cortar el piloto automático.

Beneficios esperados:
- Menos reactividad emocional.
- Mejor comunicación.
- Más sensación de control y calma interna.`,
      imageUrl: '/images/news/salud-emocional.svg',
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
    news: filterByTerms(MOCK_DATA.news, ['title', 'description', 'category']),
    events: filterByTerms(MOCK_DATA.events, ['title', 'description', 'location']),
  };
};
