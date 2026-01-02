import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../types';
import { ArrowRightIcon } from './Icons';
import LazyImage from './LazyImage';
import { handleCourseClick } from '../utils/framerIntegration';

interface CourseCardProps {
  course: Course;
  onCourseClick?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = memo(({ course, onCourseClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    onCourseClick?.(course);
    navigate(`/course/${course.id}`);
    handleCourseClick(course.id, course.title);
  }, [course, onCourseClick, navigate]);

  // Predefined aesthetic gradients
  const gradients = [
    'from-blue-400 to-indigo-600',
    'from-emerald-400 to-cyan-600',
    'from-violet-400 to-purple-600',
    'from-rose-400 to-pink-600',
    'from-amber-400 to-orange-600',
    'from-slate-400 to-slate-600',
  ];

  const getGradient = (id: number) => gradients[id % gradients.length];

  return (
    <div
      onClick={handleClick}
      className="group relative bg-[var(--panel-bg)] rounded-[2rem] overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 dark:hover:shadow-primary-600/10 transition-all duration-500 cursor-pointer flex flex-col h-full hover:border-primary-500/20"
    >
      {/* Image Container */}
      <div className="relative h-56 lg:h-64 overflow-hidden bg-[var(--bg-main)]">
        {course.imageUrl ? (
          <LazyImage
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(course.id)} flex items-center justify-center p-12 transition-transform duration-700 ease-out group-hover:scale-110`}>
            <div className="text-white/20">
              {/* Icon placeholder could go here if needed */}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg border 
            ${course.level === 'Avanzado' ? 'bg-amber-500/80 text-white border-amber-400' :
              course.level === 'Intermedio' ? 'bg-primary-500/80 text-white border-primary-400' :
                'bg-blue-500/80 text-white border-blue-400'}`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 flex flex-col flex-grow relative">
        <div className="flex-grow">
          <h3 className="text-xl lg:text-2xl font-black text-[var(--text-main)] mb-3 group-hover:text-primary-600 transition-colors duration-300 uppercase">
            {course.title}
          </h3>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
            {course.description}
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--border-color)] flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-black">Lecciones</span>
              <span className="text-sm font-black text-[var(--text-main)]">{course.lessons}</span>
            </div>
            <div className="w-px h-8 bg-[var(--border-color)]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-black">Certificado</span>
              <span className="text-sm font-black text-[var(--text-main)]">Incluido</span>
            </div>
          </div>

          <div className="w-12 h-12 bg-[var(--bg-main)] group-hover:bg-primary-600 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-600/20 border border-[var(--border-color)] group-hover:border-primary-500">
            <ArrowRightIcon className="w-5 h-5 text-[var(--text-muted)] group-hover:text-white transition-all group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;