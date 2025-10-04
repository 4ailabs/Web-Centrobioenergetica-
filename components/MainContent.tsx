
import React from 'react';
import type { Course } from '../types';
import CourseCard from '../components/CourseCard';

const courses: Course[] = [
  {
    id: 1,
    title: 'Integration of 3D Elements',
    description: 'The integration of three-dimensional (3D) elements in web design is gaining popularity',
    author: 'Emily Johnson',
    price: 99,
    lessons: 22,
    // FIX: Corrected type to 'Principiante' to match the Course interface.
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e50?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Dark Mode Design Trends',
    description: 'We look at how "Dark Mode" has become one of the dominant trends in design.',
    author: 'James Parker',
    price: 70,
    lessons: 10,
    // FIX: Corrected type to 'Moderado' to match the Course interface.
    level: 'Moderado',
    imageUrl: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Advanced CSS and Sass',
    description: 'Dive deep into modern CSS features like Flexbox, Grid, and custom properties.',
    author: 'Sarah Lee',
    price: 120,
    lessons: 35,
    // FIX: Corrected type to 'Avanzado' to match the Course interface.
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'React for Total Beginners',
    description: 'Learn the fundamentals of React, including components, state, and props.',
    author: 'David Chen',
    price: 85,
    lessons: 18,
    // FIX: Corrected type to 'Principiante' to match the Course interface.
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-3xl">
      <header className="mb-12 animate-fade-in" style={{ animationDelay: '200ms', opacity: 0 }}>
        <h1 className="text-6xl font-bold text-black">Welcome to iCourses</h1>
        <p className="text-2xl text-gray-500 mt-2">The Ultimate Guide to Web Design and Development</p>
      </header>

      <div className="border-t border-gray-200 pt-8 animate-fade-in" style={{ animationDelay: '400ms', opacity: 0 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest iCourses</h2>
          <a href="#" className="text-lg font-medium text-gray-600 hover:text-black transition-colors">
            View all iCourses
          </a>
        </div>
        <p className="text-lg text-gray-500 mb-8">
          Choose from over hundreds of courses and learn with industry leading experts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {courses.map((course, index) => (
            <div key={course.id} className="animate-slide-in-up" style={{ animationDelay: `${500 + index * 150}ms` }}>
                <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;