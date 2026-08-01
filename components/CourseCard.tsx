import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../types';
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
      className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
    >
      <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-700 aspect-[4/3]">
        {course.imageUrl ? (
          <LazyImage
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
          {course.description}
        </p>
        {/* Un curso que aún no se imparte tiene 0 lecciones: mejor no decir nada
            que anunciar un cero. */}
        {course.lessons > 0 && (
          <span className="text-xs text-neutral-600 dark:text-neutral-500">{course.lessons} lecciones</span>
        )}
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
