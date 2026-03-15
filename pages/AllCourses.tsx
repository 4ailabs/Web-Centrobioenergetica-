import React from 'react';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';

const AllCourses: React.FC = () => {
  const courses = useCourses();

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      <div className="px-6 lg:px-0 pt-8 lg:pt-12 pb-10">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-3">
          Nuestros <span className="text-primary-600">cursos</span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
          Desbloquea tu potencial con nuestros cursos transformadores.
        </p>
      </div>

      <div className="px-6 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
