
import React from 'react';
import { CoursesIcon, NewsIcon } from '../components/Icons';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-black">Sobre Nosotros</h1>
        <div className="flex space-x-2 mt-6">
            <button className="px-6 py-2 bg-gray-100 rounded-full font-semibold">Instituto</button>
            <button className="px-6 py-2 bg-black text-white rounded-full font-semibold">Correo</button>
        </div>
      </header>

      <div className="my-12">
        <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Team working on laptops" 
            className="w-full h-[400px] object-cover rounded-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">¡Bienvenido al Instituto Centrobioenergetica!</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
            En el Instituto Centrobioenergetica, brindamos una experiencia de aprendizaje unificada y cautivadora diseñada para adaptarse a tus necesidades. Nos dedicamos a llevar la educación a tu alcance, ofreciendo una diversa gama de cursos para potenciar tu viaje de aprendizaje. Nuestra plataforma combina tecnología de punta con enfoques personalizados, asegurando que tengas las herramientas y recursos para tener éxito en tus esfuerzos educativos.
        </p>
         <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Explora un mundo de conocimiento con nuestra interfaz fácil de usar, funciones de seguimiento de progreso y materiales de aprendizaje interactivos. Ya seas estudiante, profesional o aprendiz de por vida, el Instituto Centrobioenergetica es tu destino central para una educación de calidad. Únete a nosotros en esta aventura educativa, donde el aprendizaje no conoce límites, y deja que el Instituto Centrobioenergetica sea tu guía hacia un futuro más brillante.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-3xl text-center">
            <div className="inline-block bg-gray-200 p-4 rounded-full">
                <CoursesIcon className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mt-4">CURSOS</h3>
            <p className="text-gray-600 mt-2">Explora nuestros cursos en línea</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl text-center">
             <div className="inline-block bg-gray-200 p-4 rounded-full">
                <NewsIcon className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mt-4">NOTICIAS</h3>
            <p className="text-gray-600 mt-2">Lee las últimas noticias</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;