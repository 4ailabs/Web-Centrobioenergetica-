import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/AppContext';
import { handleCourseClick } from '../utils/framerIntegration';
import type { Course } from '../types';
import { ArrowRight } from 'lucide-react';

const AllCourses: React.FC = () => {
  const allCourses = useCourses();
  const navigate = useNavigate();

  // Solo cursos disponibles (con videos), no los futuros
  const activeCourseIds = [102, 101, 103]; // Set Point, Aminoácidos, Bioenergética V4
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
          <div className={`grid grid-cols-1 ${rest.length === 1 ? 'sm:grid-cols-1 max-w-md' : 'sm:grid-cols-2'} gap-5`}>
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
