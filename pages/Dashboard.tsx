
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import ExternalLink from '../components/ExternalLink';
import { NewsIcon, AboutUsIcon, AppsIcon } from '../components/Icons';
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
    <div className="w-full lg:mt-20 mt-16 space-y-12">
      <header className="animate-fade-in px-4">
        <h1 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] tracking-tight leading-tight">
          Instituto <span className="text-primary-600">Centrobioenergética</span>
        </h1>
        <p className="text-lg lg:text-xl text-[var(--text-muted)] mt-4 max-w-2xl">
          Tu plataforma integral para el crecimiento consciente y el bienestar bionergético avanzado.
        </p>
      </header>

      <section className="glass-panel p-6 lg:p-10 rounded-[2.5rem] animate-slide-in-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-main)] mb-3">Programas Destacados</h2>
            <p className="text-[var(--text-muted)]">
              Inicia tu camino de transformación con nuestras metodologías de vanguardia.
            </p>
          </div>
          <button
            onClick={() => navigate('/cursos')}
            className="w-full md:w-auto px-8 py-3 bg-[var(--text-main)] text-[var(--bg-main)] rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-200/50 hover:-translate-y-1 active:scale-95 whitespace-nowrap"
          >
            Explorar Catálogo completo →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {featuredCourses.map((course, index) => (
            <div key={course.id} className="animate-slide-in-up" style={{ animationDelay: `${200 + index * 150}ms`, opacity: 0 }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      {/* Accesos Rápidos con diseño mejorado */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {/* Noticias */}
        <div
          onClick={onNavigateToNews}
          className="group relative bg-[var(--panel-bg)] backdrop-blur-sm border border-[var(--border-color)] hover:border-primary-500 hover:shadow-2xl rounded-3xl p-8 cursor-pointer transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <NewsIcon className="w-24 h-24 text-[var(--text-main)]" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 group-hover:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-inner border border-primary-600/10">
              <NewsIcon className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-primary-600 transition-colors">Noticias</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Mantente al día con investigaciones, eventos y novedades.</p>
          </div>
        </div>

        {/* Sobre Nosotros */}
        <div
          onClick={onNavigateToAbout}
          className="group relative bg-[var(--panel-bg)] backdrop-blur-sm border border-[var(--border-color)] hover:border-primary-500 hover:shadow-2xl rounded-3xl p-8 cursor-pointer transition-all duration-500"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <AboutUsIcon className="w-24 h-24 text-[var(--text-main)]" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 group-hover:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-inner border border-primary-600/10">
              <AboutUsIcon className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-primary-600 transition-colors">Sobre Nosotros</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Nuestra historia, misión y el equipo detrás del instituto.</p>
          </div>
        </div>

        {/* Apps */}
        <div
          onClick={onNavigateToApps}
          className="group relative bg-[var(--panel-bg)] backdrop-blur-sm border border-[var(--border-color)] hover:border-primary-500 hover:shadow-2xl rounded-3xl p-8 cursor-pointer transition-all duration-500 sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <AppsIcon className="w-24 h-24 text-[var(--text-main)]" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 group-hover:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-inner border border-primary-600/10">
              <AppsIcon className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-primary-600 transition-colors">Apps</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Herramientas digitales exclusivas para tu práctica diaria.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;