import React from 'react';
import type { Course } from '../types';
import { ArrowRightIcon } from './Icons';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-gray-50 hover:bg-gray-100 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:translate-y-2 group">
      <div className="overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-48 lg:h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
      </div>
      <div className="p-4 lg:p-8 flex flex-col flex-grow">
        <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3">{course.title}</h3>
        <p className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-6 flex-grow line-clamp-3">{course.description}</p>
        
        <div className="border-t border-gray-300 pt-4 lg:pt-6 flex justify-between items-center">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 text-xs lg:text-sm">
            <p className="text-gray-500">Lecciones: <span className="text-black font-bold">{course.lessons}</span></p>
            <p className="text-gray-500">Nivel: <span className="text-black font-bold">{course.level}</span></p>
          </div>
          <a href="#" className="text-black hover:text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;