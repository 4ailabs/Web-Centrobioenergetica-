import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { handleCourseClick } from '../utils/framerIntegration';
import type { Course } from '../types';
import { ArrowRight, ExternalLink } from 'lucide-react';

const AllCourses: React.FC = () => {
  const allCourses = useCourses();
  const navigate = useNavigate();

  // Solo cursos disponibles (con videos), no los futuros
  const activeCourseIds = [102, 101, 103, 107, 108]; // Set Point, Aminoácidos, Bioenergética V4, Resonantia, Mascotas
  const courses = allCourses.filter(c => activeCourseIds.includes(c.id));

  const first = useMemo(() => courses[0], [courses]);
  const rest = useMemo(() => courses.slice(1), [courses]);

  const goToCourse = (course: Course) => {
    navigate(`/course/${course.id}`);
    handleCourseClick(course.id, course.title);
  };

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-10">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
          Nuestros <span className="text-primary-600">cursos</span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
          Formación especializada en bioenergética, nutrición y terapias integrativas.
        </p>
      </div>

      {/* Lead course — horizontal card, image left + text right */}
      {first && (
        <div className="px-6 lg:px-0 pb-8">
          <div
            onClick={() => goToCourse(first)}
            className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2 overflow-hidden aspect-[4/3] sm:aspect-auto sm:min-h-[220px]">
                {first.imageUrl && (
                  <img
                    src={first.imageUrl}
                    alt={first.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="sm:w-1/2 p-6 flex flex-col justify-center">
                <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                  {first.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                  {first.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{first.lessons} lecciones</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver curso <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest — 2 column grid */}
      {rest.length > 0 && (
        <div className="px-6 lg:px-0">
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5`}>
            {/* BV4 External Card */}
            <a
              href="https://bioenergetica-v4.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800">
                <svg width="96" height="96" viewBox="0 0 512 512" fill="none" className="opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm">
                  <path d="M 256 56 L 440 256 L 256 456 L 72 256 Z" stroke="#1a1a2e" strokeWidth="12" strokeLinejoin="miter" className="dark:stroke-neutral-200"/>
                  <path d="M 256 152 L 340 256 L 256 360 L 172 256 Z" stroke="#c06a2a" strokeWidth="6" opacity="0.65"/>
                  <line x1="72" y1="256" x2="440" y2="256" stroke="#1a1a2e" strokeWidth="3" opacity="0.18" className="dark:stroke-neutral-200"/>
                  <circle cx="256" cy="256" r="16" fill="#00856a"/>
                  <circle cx="256" cy="256" r="6" fill="#ffffff" opacity="0.5"/>
                </svg>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug group-hover:text-primary-600 transition-colors">
                    Bioenergética V4
                  </h3>
                  <ExternalLink className="w-3 h-3 text-neutral-400 opacity-50" />
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                  Las 13 Improntas de Supervivencia. Portal de alumnos con material del curso.
                </p>
                <span className="text-xs text-neutral-400">Acceder al portal →</span>
              </div>
            </a>

            {rest.map((course) => (
              <div
                key={course.id}
                onClick={() => goToCourse(course)}
                className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
              >
                <div className="overflow-hidden aspect-[16/9]">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-700" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                    {course.description}
                  </p>
                  <span className="text-xs text-neutral-400">{course.lessons} lecciones</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
