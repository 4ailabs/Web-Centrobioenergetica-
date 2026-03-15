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

  return (
    <div
      onClick={handleClick}
      className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors duration-150 cursor-pointer flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-40 lg:h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        {course.imageUrl ? (
          <LazyImage
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 dark:bg-neutral-700" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50 mb-1.5 leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{course.lessons} lecciones</span>
          <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-700 group-hover:bg-primary-600 group-hover:text-white rounded-lg flex items-center justify-center transition-colors duration-150">
            <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
