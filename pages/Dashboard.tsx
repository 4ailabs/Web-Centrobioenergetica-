
import React, { useState, useEffect, useMemo } from 'react';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import ExternalLink from '../components/ExternalLink';
import { NewsIcon, AboutUsIcon, AppsIcon } from '../components/Icons';

interface DashboardProps {
  onNavigateToCourses?: () => void;
  onNavigateToNews?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToApps?: () => void;
}

// Componente del Contador
const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
      <div className="bg-white bg-opacity-20 text-white text-xs font-bold rounded p-1.5 min-w-[30px] flex items-center justify-center">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-green-200 text-[10px] mt-0.5 font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <svg className="w-3 h-3 text-yellow-300 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <TimeUnit value={timeLeft.days} label="Días" />
      <span className="text-green-200 text-xs mx-0.5">:</span>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <span className="text-green-200 text-xs mx-0.5">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-green-200 text-xs mx-0.5">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToCourses, onNavigateToNews, onNavigateToAbout, onNavigateToApps }) => {
  const courses = useCourses();
  
  // Memoizar los primeros 4 cursos para evitar re-renders innecesarios
  const featuredCourses = useMemo(() => courses.slice(0, 4), [courses]);

  // Cursos hardcodeados para el dashboard (se pueden eliminar después)
  const coursesHardcoded: Course[] = [
  {
    id: 1,
    title: 'Biomagnetismo Kids',
    description: 'Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños y su desarrollo energético.',
    author: '',
    price: 0,
    lessons: 12,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Oh Cards',
    description: 'Descubre el poder terapéutico de las Oh Cards como herramienta de autoconocimiento y sanación emocional.',
    author: '',
    price: 0,
    lessons: 8,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Morphic Field Therapy',
    description: 'Aprende sobre los campos morfogenéticos y cómo utilizarlos para la sanación y transformación personal.',
    author: '',
    price: 0,
    lessons: 15,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'El Secreto de las Vitaminas y Minerales',
    description: 'Descubre los micronutrientes esenciales y su papel fundamental en el equilibrio energético y la salud integral.',
    author: '',
    price: 0,
    lessons: 20,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Gestalting Modelado Creativo',
    description: 'Técnicas de modelado creativo basadas en la terapia gestalt para el desarrollo personal y artístico.',
    author: '',
    price: 0,
    lessons: 14,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'Flores de Bach',
    description: 'Descubre el sistema de sanación natural con esencias florales del Dr. Edward Bach para el equilibrio emocional.',
    author: '',
    price: 0,
    lessons: 16,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    title: 'Despertar Intuitivo',
    description: 'Desarrolla y fortalece tu intuición natural a través de técnicas de conexión energética y meditación.',
    author: '',
    price: 0,
    lessons: 18,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    title: 'Auriculoterapia',
    description: 'Aprende la técnica de acupuntura auricular para el tratamiento de diversos desequilibrios energéticos.',
    author: '',
    price: 0,
    lessons: 22,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    title: 'Taller de Alimentación',
    description: 'Taller práctico sobre alimentación consciente y su impacto en el bienestar energético y físico.',
    author: '',
    price: 0,
    lessons: 10,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    title: 'Nutrigenómica y Genotipos',
    description: 'Explora la relación entre la nutrición, la genética y el bienestar personal a través de la nutrigenómica.',
    author: '',
    price: 0,
    lessons: 25,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    title: 'Terapia de Muñecos y Playmobil',
    description: 'Técnica básica y explorando los caminos de la vida a través del juego terapéutico con muñecos.',
    author: '',
    price: 0,
    lessons: 12,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    title: 'Taller de Sandplay',
    description: 'Explora el mundo del sandplay como herramienta terapéutica para el autoconocimiento y sanación.',
    author: '',
    price: 0,
    lessons: 14,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 13,
    title: 'Lego Serious Play',
    description: 'Metodología de pensamiento con las manos para materializar ideas complejas y descubrir insights profundos.',
    author: '',
    price: 0,
    lessons: 16,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 14,
    title: 'Conflictos Biológicos',
    description: 'Comprende la relación entre conflictos emocionales y manifestaciones biológicas para la sanación integral.',
    author: '',
    price: 0,
    lessons: 18,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 15,
    title: 'Par Biomagnético',
    description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
    author: '',
    price: 0,
    lessons: 22,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-xl lg:text-3xl font-bold text-black leading-tight">Instituto Centrobioenergetica</h1>
        <p className="text-base lg:text-lg text-gray-500 mt-2">Tu Guía para el Crecimiento y Bienestar</p>
      </header>

      {/* Banner del Seminario Internacional */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-6 lg:p-8 mb-8 lg:mb-12 text-white relative overflow-hidden shadow-2xl border border-green-500">
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl lg:text-3xl font-bold">Seminario Internacional</h2>
              <p className="text-green-100 text-sm lg:text-lg">Inteligencia Energética 2025</p>
              <p className="text-green-200 text-xs lg:text-sm">Del Cerebro Reactivo al Creativo</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Información Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 lg:p-6 mb-4 shadow-lg border border-white border-opacity-20">
                <h3 className="text-lg lg:text-xl font-semibold mb-3">Ciudad de México • Diciembre 2025</h3>
                <p className="text-green-100 text-sm lg:text-base mb-4">
                  <strong>5 sesiones transformadoras:</strong> 3 presenciales (5-7 dic) + 2 online (ene-feb 2026)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Neuroplasticidad + IA</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Bioenergética Avanzada</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>LEGO® Serious Play®</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Context Engineering</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-green-100">
                <p className="mb-2">
                  <strong>Transforma tu cerebro reactivo en una herramienta de creación consciente</strong> a través de metodologías de vanguardia que integran neuroplasticidad, bioenergética y herramientas de IA.
                </p>
                <p>
                  <strong>12 ediciones transformando vidas</strong> • Más de una década de experiencia
                </p>
              </div>
            </div>
            
            {/* Información de Inscripción */}
            <div className="flex flex-col justify-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 lg:p-6 mb-4 shadow-lg border border-white border-opacity-20">
                <h4 className="font-semibold text-lg mb-3">Inversión</h4>
                
                {/* Contador de tiempo */}
                <div className="mb-3 p-2 bg-yellow-400 bg-opacity-20 rounded-lg border border-yellow-300 shadow-md">
                  <p className="text-center text-yellow-300 text-[10px] font-semibold mb-1.5">Oferta Early Bird termina en</p>
                  <CountdownTimer targetDate="2025-10-16T23:59:59" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Early Bird:</span>
                    <span className="font-bold text-lg">$8,000 MXN</span>
                  </div>
                  <div className="text-xs text-green-200">
                    Válido hasta 16 oct 2025
                  </div>
                  <div className="flex justify-between">
                    <span>Precio Regular:</span>
                    <span className="font-medium">$9,500 MXN</span>
                  </div>
                  <div className="text-xs text-green-200 mt-2">
                    Aparta con $3,000 MXN
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <ExternalLink
                  href="https://inteligencia-energetica.com/"
                  className="block w-full bg-white text-green-700 px-6 py-3 rounded-full font-bold text-sm lg:text-base hover:bg-green-50 transition-colors shadow-xl hover:shadow-2xl text-center border-2 border-green-200"
                >
                  Inscribirse Ahora →
                </ExternalLink>
                
                <div className="text-xs text-green-200 text-center">
                  Plazas limitadas • Se llena rápidamente
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-15 rounded-full -translate-y-16 translate-x-16 shadow-lg"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12 shadow-md"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full shadow-md"></div>
      </div>

      <div className="border-t border-gray-200 pt-6 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-lg lg:text-2xl font-bold mb-2">Últimos Cursos</h2>
          <p className="text-sm lg:text-base text-gray-500">
            Elige entre nuestros cursos y aprende con expertos líderes en la industria del bienestar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-10 mb-8">
          {featuredCourses.map((course, index) => (
            <div key={course.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 150}ms`, opacity: 0 }}>
                <CourseCard course={course} />
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <button 
            onClick={onNavigateToCourses}
            className="px-6 py-3 bg-black text-white rounded-full font-medium text-sm lg:text-base hover:bg-green-500 transition-colors shadow-sm hover:shadow-md"
          >
            Ver todos los Cursos →
          </button>
        </div>
      </div>

      {/* Secciones Minimizadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Noticias */}
        <div 
          onClick={onNavigateToNews}
          className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg rounded-2xl p-4 lg:p-6 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-green-100 rounded-full flex items-center justify-center mr-3 transition-colors">
              <NewsIcon className="w-5 h-5 text-blue-600 group-hover:text-green-600" />
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 group-hover:text-green-600">Noticias</h3>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-700">Mantente al día con las últimas novedades del instituto</p>
        </div>

        {/* Sobre Nosotros */}
        <div 
          onClick={onNavigateToAbout}
          className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg rounded-2xl p-4 lg:p-6 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mr-3 transition-colors">
              <AboutUsIcon className="w-5 h-5 text-green-600 group-hover:text-green-700" />
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 group-hover:text-green-600">Sobre Nosotros</h3>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-700">Conoce nuestra misión y valores</p>
        </div>

        {/* Apps */}
        <div 
          onClick={onNavigateToApps}
          className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg rounded-2xl p-4 lg:p-6 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-purple-100 group-hover:bg-green-100 rounded-full flex items-center justify-center mr-3 transition-colors">
              <AppsIcon className="w-5 h-5 text-purple-600 group-hover:text-green-600" />
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 group-hover:text-green-600">Apps</h3>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-700">Herramientas y aplicaciones útiles</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;