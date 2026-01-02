
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
    <div className="w-full lg:pt-12 pt-8 space-y-20 pb-20">
      {/* Hero Section with Depth */}
      <header className="animate-fade-in px-4 relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/10 rounded-full border border-primary-600/20">
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Bienvenido al Instituto</span>
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-[var(--text-main)] tracking-tight leading-[0.9] uppercase">
            Instituto <br />
            <span className="text-primary-600 underline decoration-primary-600/20 decoration-8 underline-offset-8">Centrobioenergética</span>
          </h1>
          <p className="text-lg lg:text-xl text-[var(--text-muted)] max-w-xl leading-relaxed font-medium">
            Tu plataforma integral para la evolución personal y el bienestar bionergético avanzado.
          </p>
        </div>
      </header>

      {/* Featured Programs Section */}
      <section className="animate-slide-in-up px-4">
        <div className="relative">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-xs font-black text-primary-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-10 h-px bg-primary-600/30"></span>
                Programas Destacados
              </h2>
              <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight leading-none">
                Inicia tu <span className="text-primary-600">Transformación</span>
              </h3>
            </div>
            <button
              onClick={() => navigate('/cursos')}
              className="group flex items-center gap-3 px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-all hover:shadow-2xl hover:shadow-primary-600/20 active:scale-95 whitespace-nowrap"
            >
              Catálogo completo
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14 relative z-10">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview Section */}
      <section className="px-4 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">Últimas Noticias</h2>
          </div>
          <button
            onClick={onNavigateToNews}
            className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            Ver todas <span className="text-base">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_DATA.news.slice(0, 2).map((article, idx) => (
            <div
              key={article.id}
              onClick={onNavigateToNews}
              className="group flex flex-col sm:flex-row bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[2rem] overflow-hidden hover:border-primary-600/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
      </section>

      {/* Quick Access Grid - Balanced */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { icon: NewsIcon, title: "Noticias", desc: "Investigaciones y novedades.", action: onNavigateToNews },
          { icon: AboutUsIcon, title: "Nosotros", desc: "Misión y equipo experto.", action: onNavigateToAbout },
          { icon: AppsIcon, title: "Apps", desc: "Herramientas exclusivas.", action: onNavigateToApps }
        ].map((item, idx) => (
          <div
            key={item.title}
            onClick={item.action}
            className="group relative bg-[var(--panel-bg)] border border-[var(--border-color)] hover:border-primary-600/50 rounded-3xl p-10 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary-600/5 group-hover:bg-primary-600 text-primary-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 shadow-sm">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight group-hover:text-primary-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed font-medium text-sm group-hover:text-[var(--text-main)] transition-colors">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;