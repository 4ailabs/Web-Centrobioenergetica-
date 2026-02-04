
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
    <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 space-y-12 sm:space-y-32 pb-20">
      {/* Premium Hero Section - Compact & Professional */}
      <div className="relative mx-3 sm:mx-4 h-[340px] sm:h-[380px] lg:h-[450px] overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 shadow-lg">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/hero_clinical_professional.png"
            alt="Bioenergetic Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/70 via-transparent to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative h-full z-10 flex flex-col justify-end pb-6 sm:justify-center sm:pb-0 px-5 sm:px-6 lg:px-20 max-w-6xl mx-auto w-full space-y-2.5 sm:space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-primary-600/30 backdrop-blur-md rounded-full border border-primary-400/40 w-fit">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
            <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wide">Formación de Vanguardia</span>
          </div>

          <div className="space-y-1.5 sm:space-y-2 md:space-y-2">
            <h1 className="text-[26px] leading-[1.1] sm:text-3xl md:text-4xl lg:text-7xl font-black text-white tracking-tight sm:leading-none uppercase">
              Instituto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Centrobioenergética
              </span>
            </h1>
            <p className="text-[13px] leading-snug sm:text-base lg:text-xl text-white/80 max-w-xl font-medium">
              Excelencia académica para el desarrollo humano y la consciencia bioenergética avanzada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={() => navigate('/cursos')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-primary-600 text-white rounded-xl font-black uppercase tracking-wide text-[11px] hover:bg-primary-500 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn min-h-[44px] touch-manipulation shadow-lg"
            >
              Oferta Académica
              <span className="group-hover/btn:translate-x-1 transition-transform text-sm">→</span>
            </button>
            <button
              onClick={() => navigate('/servicios')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 rounded-xl font-black uppercase tracking-wide text-[11px] transition-all active:scale-95 text-center min-h-[44px] touch-manipulation"
            >
              Servicios
            </button>
          </div>
        </div>

        {/* Decorative Glass Elements */}
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Featured Programs Section */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <div className="relative">
          {/* Header */}
          <div className="flex flex-col items-start mb-10 gap-3 relative z-10">
            <h2 className="text-xs font-black text-primary-600 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-10 h-px bg-primary-600/30"></span>
              Cursos Destacados
            </h2>
            <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight leading-none">
              Programas de <span className="text-primary-600">Formación</span>
            </h3>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14 relative z-10">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview Section */}
      <section className="px-4 max-w-7xl mx-auto w-full">
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
      </section>

      {/* Quick Access Grid - Balanced */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
        {[
          { icon: NewsIcon, title: "Noticias", desc: "Investigaciones y novedades.", action: onNavigateToNews },
          { icon: AboutUsIcon, title: "Nosotros", desc: "Misión y equipo experto.", action: onNavigateToAbout },
          { icon: AppsIcon, title: "Apps", desc: "Herramientas exclusivas.", action: onNavigateToApps }
        ].map((item, idx) => (
          <div
            key={item.title}
            onClick={item.action}
            className="group relative bg-[var(--panel-bg)] border border-[var(--border-color)] hover:border-primary-600/50 rounded-xl p-8 sm:p-10 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 touch-manipulation"
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