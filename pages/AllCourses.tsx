import React from 'react';
import { useCourses } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';

const AllCourses: React.FC = () => {
  const courses = useCourses();

  // Cursos hardcodeados (se pueden eliminar después)
  const coursesHardcoded: Course[] = [
  {
    id: 1,
    title: 'Biomagnetismo Kids',
    description: 'Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños y su desarrollo energético.',
    author: '',
    price: 0,
    lessons: 12,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Oh Cards',
    description: 'Descubre el poder terapéutico de las Oh Cards como herramienta de autoconocimiento y sanación emocional.',
    author: '',
    price: 0,
    lessons: 8,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Morphic Field Therapy',
    description: 'Aprende sobre los campos morfogenéticos y cómo utilizarlos para la sanación y transformación personal.',
    author: '',
    price: 0,
    lessons: 15,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'El Secreto de las Vitaminas y Minerales',
    description: 'Descubre los micronutrientes esenciales y su papel fundamental en el equilibrio energético y la salud integral.',
    author: '',
    price: 0,
    lessons: 20,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Gestalting Modelado Creativo',
    description: 'Técnicas de modelado creativo basadas en la terapia gestalt para el desarrollo personal y artístico.',
    author: '',
    price: 0,
    lessons: 14,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'Flores de Bach',
    description: 'Descubre el sistema de sanación natural con esencias florales del Dr. Edward Bach para el equilibrio emocional.',
    author: '',
    price: 0,
    lessons: 16,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    title: 'Despertar Intuitivo',
    description: 'Desarrolla y fortalece tu intuición natural a través de técnicas de conexión energética y meditación.',
    author: '',
    price: 0,
    lessons: 18,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    title: 'Auriculoterapia',
    description: 'Aprende la técnica de acupuntura auricular para el tratamiento de diversos desequilibrios energéticos.',
    author: '',
    price: 0,
    lessons: 22,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    title: 'Taller de Alimentación',
    description: 'Taller práctico sobre alimentación consciente y su impacto en el bienestar energético y físico.',
    author: '',
    price: 0,
    lessons: 10,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    title: 'Nutrigenómica y Genotipos',
    description: 'Explora la relación entre la nutrición, la genética y el bienestar personal a través de la nutrigenómica.',
    author: '',
    price: 0,
    lessons: 25,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    title: 'Terapia de Muñecos y Playmobil',
    description: 'Técnica básica y explorando los caminos de la vida a través del juego terapéutico con muñecos.',
    author: '',
    price: 0,
    lessons: 12,
    level: 'Principiante',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    title: 'Taller de Sandplay',
    description: 'Explora el mundo del sandplay como herramienta terapéutica para el autoconocimiento y sanación.',
    author: '',
    price: 0,
    lessons: 14,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 13,
    title: 'Lego Serious Play',
    description: 'Metodología de pensamiento con las manos para materializar ideas complejas y descubrir insights profundos.',
    author: '',
    price: 0,
    lessons: 16,
    level: 'Intermedio',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 14,
    title: 'Conflictos Biológicos',
    description: 'Comprende la relación entre conflictos emocionales y manifestaciones biológicas para la sanación integral.',
    author: '',
    price: 0,
    lessons: 18,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 15,
    title: 'Par Biomagnético',
    description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
    author: '',
    price: 0,
    lessons: 22,
    level: 'Avanzado',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-2xl lg:text-4xl font-bold text-black">Nuestros Cursos</h1>
        <p className="text-base lg:text-lg text-gray-500 mt-4 max-w-4xl">
            Desbloquea tu potencial con nuestros cursos transformadores. Eleva tus habilidades, encuentra tu equilibrio y comienza un nuevo camino hacia el bienestar con nuestra guía experta.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-10">
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