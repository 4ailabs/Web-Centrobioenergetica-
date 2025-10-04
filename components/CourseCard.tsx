import React, { memo, useCallback } from 'react';
import type { Course } from '../types';
import { ArrowRightIcon } from './Icons';
import LazyImage from './LazyImage';
import { handleCourseClick } from '../utils/framerIntegration';

interface CourseCardProps {
  course: Course;
  onCourseClick?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = memo(({ course, onCourseClick }) => {
  const handleClick = useCallback(() => {
    // Primero llamar al callback local si existe
    onCourseClick?.(course);
    
    // Luego enviar a Framer
    handleCourseClick(course.id, course.title);
  }, [course, onCourseClick]);
  return (
    <div className="bg-gray-50 hover:bg-gray-100 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:translate-y-2 group">
      <div className="overflow-hidden">
        <LazyImage 
          src={course.imageUrl} 
          alt={course.title} 
          className="h-48 lg:h-64 transition-transform duration-300 ease-in-out group-hover:scale-105" 
        />
      </div>
      <div className="p-4 lg:p-8 flex flex-col flex-grow">
        <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3">{course.title}</h3>
        <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-6 flex-grow line-clamp-3">{course.description}</p>
        
        <div className="border-t border-gray-300 pt-4 lg:pt-6 flex justify-between items-center">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 text-xs lg:text-sm">
            <p className="text-gray-500">Lecciones: <span className="text-black font-bold">{course.lessons}</span></p>
            <p className="text-gray-500">Nivel: <span className="text-black font-bold">{course.level}</span></p>
          </div>
          <button 
            onClick={handleClick}
            className="text-black hover:text-gray-600 transition-transform duration-300 group-hover:translate-x-1"
            aria-label={`Ver detalles de ${course.title}`}
          >
            <ArrowRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;