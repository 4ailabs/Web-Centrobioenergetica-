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

  // Predefined subtle gradients - minimal palette
  const gradients = [
    'from-neutral-200 to-neutral-300',
    'from-neutral-100 to-neutral-200',
    'from-neutral-200 to-neutral-300',
    'from-neutral-100 to-neutral-200',
    'from-neutral-200 to-neutral-300',
    'from-neutral-100 to-neutral-200',
  ];

  const getGradient = (id: number) => gradients[id % gradients.length];

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 lg:h-56 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
        {course.imageUrl ? (
          <LazyImage
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(course.id)}`} />
        )}

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
          {course.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
          {course.description}
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <span>{course.lessons} lecciones</span>
            <span>Certificado</span>
          </div>

          <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 group-hover:bg-primary-600 group-hover:text-white rounded-lg flex items-center justify-center transition-all duration-200">
            <ArrowRightIcon className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-white transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;