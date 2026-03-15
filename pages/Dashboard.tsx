import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import { AboutUsIcon, AppsIcon, CoursesIcon, YoutubeIcon } from '../components/Icons';

interface DashboardProps {
  onNavigateToCourses?: () => void;
  onNavigateToNews?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToApps?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToAbout, onNavigateToApps }) => {
  const courses = useCourses();
  const navigate = useNavigate();

  const featuredCourse = useMemo(() => courses[0], [courses]);
  const gridCourses = useMemo(() => courses.slice(1), [courses]);

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      {/* Hero */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-12 pb-10 lg:pb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.1] mb-4">
          Instituto <span className="text-primary-600">Centrobioenergética</span>
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed mb-6">
          Excelencia académica para el desarrollo humano y la consciencia bioenergética avanzada.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/cursos')}
            className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Oferta Académica
          </button>
          <button
            onClick={() => navigate('/servicios')}
            className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors"
          >
            Servicios Clínicos
          </button>
          <button
            onClick={() => navigate('/calendario')}
            className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors"
          >
            Calendario
          </button>
        </div>
      </div>

      {/* Featured Course — card with full-width image */}
      {featuredCourse && (
        <div
          className="px-6 lg:px-0 pb-12 group cursor-pointer"
          onClick={() => navigate(`/course/${featuredCourse.id}`)}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors">
            <div className="aspect-[2.2/1] overflow-hidden">
              {featuredCourse.imageUrl && (
                <img
                  src={featuredCourse.imageUrl}
                  alt={featuredCourse.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}
            </div>
            <div className="p-5 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-50 leading-snug tracking-tight mb-2 group-hover:text-primary-600 transition-colors">
                {featuredCourse.title}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                {featuredCourse.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>{featuredCourse.lessons} lecciones</span>
                <span>·</span>
                <span>Certificado</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Grid — 3 columns */}
      <div className="px-6 lg:px-0 pb-12">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCourses.length >= 3 ? 'lg:grid-cols-3' : ''} gap-x-5 gap-y-8`}>
          {gridCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Explore */}
      <div className="px-6 lg:px-0 border-t border-neutral-200 dark:border-neutral-700 pt-8">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-4">Explorar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: AboutUsIcon, title: "Nosotros", action: onNavigateToAbout },
            { icon: AppsIcon, title: "Apps", action: onNavigateToApps },
            { icon: CoursesIcon, title: "Todos los cursos", action: () => navigate('/cursos') },
            { icon: YoutubeIcon, title: "Wellvibe Media", action: () => navigate('/wellvibe-media') }
          ].map((item) => (
            <div
              key={item.title}
              onClick={item.action}
              className="group flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-7 h-7 bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500 rounded-lg flex items-center justify-center shrink-0 group-hover:text-primary-600 transition-colors">
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 transition-colors">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
