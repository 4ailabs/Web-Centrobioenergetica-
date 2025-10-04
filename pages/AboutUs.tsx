import React from 'react';
import { CoursesIcon, NewsIcon, MailIcon, PhoneIcon } from '../components/Icons';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8">
        <h1 className="text-xl lg:text-3xl font-bold text-black">Sobre Nosotros</h1>
        <div className="flex space-x-2 mt-6">
            <button className="px-4 py-2 bg-gray-100 rounded-full font-semibold text-sm">Instituto</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold text-sm flex items-center space-x-2">
              <MailIcon className="w-4 h-4 text-green-500" />
              <span>Correo</span>
            </button>
        </div>
      </header>

      <div className="my-8 lg:my-12">
        <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Team working on laptops" 
            className="w-full h-48 lg:h-[400px] object-cover rounded-2xl lg:rounded-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-lg lg:text-2xl font-bold mb-4">Bienvenido al Instituto Centrobioenergetica</h2>
        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
            En el Instituto Centrobioenergetica, brindamos una experiencia de aprendizaje unificada y cautivadora diseñada para adaptarse a tus necesidades. Nos dedicamos a llevar la educación a tu alcance, ofreciendo una diversa gama de cursos para potenciar tu viaje de aprendizaje. Nuestra plataforma combina tecnología de punta con enfoques personalizados, asegurando que tengas las herramientas y recursos para tener éxito en tus esfuerzos educativos.
        </p>
         <p className="text-sm lg:text-base text-gray-600 leading-relaxed mt-4">
            Explora un mundo de conocimiento con nuestra interfaz fácil de usar, funciones de seguimiento de progreso y materiales de aprendizaje interactivos. Ya seas estudiante, profesional o aprendiz de por vida, el Instituto Centrobioenergetica es tu destino central para una educación de calidad. Únete a nosotros en esta aventura educativa, donde el aprendizaje no conoce límites, y deja que el Instituto Centrobioenergetica sea tu guía hacia un futuro más brillante.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-12 lg:mt-16 max-w-5xl mx-auto">
        <div className="bg-gray-50 p-6 lg:p-8 rounded-2xl lg:rounded-3xl text-center hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="inline-block bg-gray-200 p-3 rounded-full">
                <CoursesIcon className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition-colors" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold mt-4">CURSOS</h3>
            <p className="text-gray-600 mt-2 text-sm">Explora nuestros cursos en línea</p>
        </div>
        <div className="bg-gray-50 p-6 lg:p-8 rounded-2xl lg:rounded-3xl text-center hover:bg-gray-100 transition-colors cursor-pointer group">
             <div className="inline-block bg-gray-200 p-3 rounded-full">
                <NewsIcon className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition-colors" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold mt-4">NOTICIAS</h3>
            <p className="text-gray-600 mt-2 text-sm">Lee las últimas noticias</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 bg-gray-50 p-6 lg:p-8 rounded-2xl lg:rounded-3xl">
        <h3 className="text-lg lg:text-xl font-bold text-black text-center mb-6">Contáctanos</h3>
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <MailIcon className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-gray-700 text-sm">info@centrobioenergetica.org</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <PhoneIcon className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-gray-700 text-sm">+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;