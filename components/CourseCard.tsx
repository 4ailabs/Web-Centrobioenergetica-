
import React from 'react';
import type { Course } from '../types';
import { ArrowRightIcon } from './Icons';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2 group">
      <div className="overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
        <p className="text-gray-500 text-lg mb-6 flex-grow">{course.description}</p>
        
        <div className="border-t border-gray-200 pt-6 flex justify-between items-center text-lg">
          <p className="text-gray-600">por <span className="font-bold text-black">{course.author}</span></p>
          <p className="font-bold text-black">{course.price}$</p>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
            <div className="flex space-x-6 text-lg">
                <p className="text-gray-500">Lecciones: <span className="text-black font-bold">{course.lessons}</span></p>
                <p className="text-gray-500">Nivel: <span className="text-black font-bold">{course.level}</span></p>
            </div>
            <a href="#" className="text-black hover:text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="w-7 h-7" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;