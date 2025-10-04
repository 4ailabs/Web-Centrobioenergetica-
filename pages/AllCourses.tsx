
import React from 'react';
import type { Course } from '../types';
import CourseCard from '../components/CourseCard';

const courses: Course[] = [
  {
    id: 1,
    title: 'Técnicas de Relajación Profunda',
    description: 'Aprende a liberar el estrés y encontrar la calma interior con nuestras técnicas guiadas.',
    author: 'Elena García',
    price: 99,
    lessons: 22,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e50?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Introducción a la Bioenergética',
    description: 'Descubre los principios fundamentales de la bioenergética y cómo aplicarlos en tu vida diaria.',
    author: 'Javier Pérez',
    price: 70,
    lessons: 10,
    level: 'Moderado',
    imageUrl: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Nutrición Holística y Consciente',
    description: 'Explora cómo una alimentación consciente puede transformar tu salud, energía y bienestar general.',
    author: 'Sofía López',
    price: 120,
    lessons: 35,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'Meditación y Mindfulness para Todos',
    description: 'Domina el arte de la atención plena para mejorar tu concentración, reducir la ansiedad y vivir el presente.',
    author: 'David Chen',
    price: 85,
    lessons: 18,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const AllCourses: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-3xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-black">Nuestros Cursos</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-4xl">
            Desbloquea tu potencial con nuestros cursos transformadores. Eleva tus habilidades, encuentra tu equilibrio y comienza un nuevo camino hacia el bienestar con nuestra guía experta.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {courses.map((course, index) => (
          <div key={course.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 150}ms`, opacity: 0 }}>
              <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;