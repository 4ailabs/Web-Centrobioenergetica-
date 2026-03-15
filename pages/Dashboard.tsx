
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import ExternalLink from '../components/ExternalLink';
import { NewsIcon, AboutUsIcon, AppsIcon } from '../components/Icons';
import { MOCK_DATA } from '../data/mockData';
import type { Course } from '../types';

interface DashboardProps {
  onNavigateToCourses?: () => void;
  onNavigateToNews?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToApps?: () => void;
}

// Componente del Contador - Temporalmente deshabilitado (solo usado para el seminario)
// const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const difference = new Date(targetDate).getTime() - new Date().getTime();

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         });
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       }
//     };

//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
//     <div className="text-center">
//       <div className="bg-white bg-opacity-20 text-white text-xs font-bold rounded p-1.5 min-w-[30px] flex items-center justify-center">
//         {value.toString().padStart(2, '0')}
//       </div>
//       <div className="text-green-200 text-[10px] mt-0.5 font-medium">
//         {label}
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-center gap-1 flex-wrap">
//       <svg className="w-3 h-3 text-yellow-300 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//       <TimeUnit value={timeLeft.days} label="Días" />
//       <span className="text-green-200 text-xs mx-0.5">:</span>
//       <TimeUnit value={timeLeft.hours} label="Horas" />
//       <span className="text-green-200 text-xs mx-0.5">:</span>
//       <TimeUnit value={timeLeft.minutes} label="Min" />
//       <span className="text-green-200 text-xs mx-0.5">:</span>
//       <TimeUnit value={timeLeft.seconds} label="Seg" />
//     </div>
//   );
// };

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToNews, onNavigateToAbout, onNavigateToApps }) => {
  const courses = useCourses();
  const navigate = useNavigate();

  // Memoizar los primeros 4 cursos para evitar re-renders innecesarios
  const featuredCourses = useMemo(() => courses.slice(0, 4), [courses]);

  return (
    <div className="w-full lg:pt-8 pt-[72px] sm:pt-8 space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section - Clean like Perplexity */}
      <div className="px-6 lg:px-8 py-12 lg:py-20 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.1]">
            Instituto <span className="text-primary-600">Centrobioenergética</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
            Excelencia académica para el desarrollo humano y la consciencia bioenergética avanzada.
          </p>

          {/* CTA Buttons - compact */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => navigate('/cursos')}
              className="px-5 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors min-h-[40px]"
            >
              Oferta Académica
            </button>
            <button
              onClick={() => navigate('/servicios')}
              className="px-5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-h-[40px]"
            >
              Servicios Clínicos
            </button>
            <button
              onClick={() => navigate('/calendario')}
              className="px-5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-h-[40px]"
            >
              Calendario
            </button>
          </div>
        </div>
      </div>

      {/* Featured Programs Section */}
      <section className="px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Cursos destacados
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Latest News Preview Section */}
      {/* <section className="px-4 max-w-[1500px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">Actualidad Científica</h2>
          </div>
          <button
            onClick={onNavigateToNews}
            className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2 min-h-[44px] touch-manipulation px-2"
          >
            Ver más artículos <span className="text-base">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_DATA.news.slice(0, 2).map((article, idx) => (
            <div
              key={article.id}
              onClick={onNavigateToNews}
              className="group flex flex-col sm:flex-row bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-primary-600/50 hover:shadow-2xl transition-all duration-500 cursor-pointer touch-manipulation"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-[8px] font-black rounded-full shadow-lg uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="sm:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center text-[8px] text-[var(--text-muted)] mb-3 font-black uppercase tracking-widest opacity-60">
                  <span>Hace 2 días</span>
                </div>
                <h3 className="text-xl font-black text-[var(--text-main)] mb-3 leading-tight uppercase group-hover:text-primary-600 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-[var(--text-muted)] text-xs line-clamp-2 leading-relaxed font-medium mb-4">{article.description}</p>
                <div className="flex items-center gap-2 text-primary-600 mt-auto">
                  <span className="text-[9px] font-black uppercase tracking-widest">Leer más</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Quick Access */}
      <section className="px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: AboutUsIcon, title: "Nosotros", desc: "Misión y equipo experto.", action: onNavigateToAbout },
            { icon: AppsIcon, title: "Apps", desc: "Herramientas exclusivas.", action: onNavigateToApps }
          ].map((item) => (
            <div
              key={item.title}
              onClick={item.action}
              className="group flex items-center gap-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 cursor-pointer transition-colors duration-150 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30"
            >
              <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {item.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;