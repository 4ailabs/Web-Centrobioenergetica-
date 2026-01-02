import React from 'react';
import { CoursesIcon, NewsIcon, MailIcon, PhoneIcon, YoutubeIcon } from '../components/Icons';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full bg-[var(--panel-bg)] p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16 border border-[var(--border-color)]">
      <header className="mb-8 p-4">
        <h1 className="text-3xl lg:text-5xl font-black text-[var(--text-main)] tracking-tight mb-6">
          Sobre <span className="text-primary-600">Nosotros</span>
        </h1>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-2 bg-primary-600 text-white rounded-full font-bold text-sm shadow-lg shadow-primary-600/20">Instituto</button>
          <button
            onClick={() => window.location.href = 'mailto:contacto@institutocentrobioenergetica.com'}
            className="px-6 py-2 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] rounded-full font-bold text-sm flex items-center space-x-2 hover:bg-primary-600 hover:text-white transition-all"
          >
            <MailIcon className="w-4 h-4 text-primary-600" />
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

      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-2xl lg:text-4xl font-black text-[var(--text-main)] mb-6">Bienvenido al Instituto <span className="text-primary-600">Centrobioenergética</span></h2>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          En el Instituto Centrobioenergetica, brindamos una experiencia de aprendizaje unificada y cautivadora diseñada para adaptarse a tus necesidades. Nos dedicamos a llevar la educación a tu alcance, ofreciendo una diversa gama de cursos para potenciar tu viaje de aprendizaje. Nuestra plataforma combina tecnología de punta con enfoques personalizados, asegurando que tengas las herramientas y recursos para tener éxito en tus esfuerzos educativos.
        </p>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed mt-6">
          Explora un mundo de conocimiento con nuestra interfaz fácil de usar, funciones de seguimiento de progreso y materiales de aprendizaje interactivos. Ya seas estudiante, profesional o aprendiz de por vida, el Instituto Centrobioenergetica es tu destino central para una educación de calidad. Únete a nosotros en esta aventura educativa, donde el aprendizaje no conoce límites, y deja que el Instituto Centrobioenergetica sea tu guía hacia un futuro más brillante.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-16 lg:mt-24 max-w-5xl mx-auto px-4">
        <div className="bg-[var(--bg-main)] p-8 lg:p-12 rounded-[2.5rem] text-center border border-[var(--border-color)] hover:border-primary-500 transition-all cursor-pointer group shadow-sm">
          <div className="inline-block bg-primary-600/10 p-4 rounded-2xl mb-6">
            <CoursesIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl lg:text-2xl font-black text-[var(--text-main)] group-hover:text-primary-600 transition-colors">CURSOS</h3>
          <p className="text-[var(--text-muted)] mt-4">Explora nuestros cursos en línea</p>
        </div>
        <div className="bg-[var(--bg-main)] p-8 lg:p-12 rounded-[2.5rem] text-center border border-[var(--border-color)] hover:border-primary-500 transition-all cursor-pointer group shadow-sm">
          <div className="inline-block bg-primary-600/10 p-4 rounded-2xl mb-6">
            <NewsIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl lg:text-2xl font-black text-[var(--text-main)] group-hover:text-primary-600 transition-colors">NOTICIAS</h3>
          <p className="text-[var(--text-muted)] mt-4">Lee las últimas noticias</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-20 bg-primary-600/5 p-10 lg:p-16 rounded-[3rem] border border-primary-600/10 mx-4">
        <h3 className="text-2xl lg:text-3xl font-black text-[var(--text-main)] text-center mb-10">¿Alguna pregunta?</h3>
        <div className="flex flex-col md:flex-row md:justify-center items-center gap-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center shadow-lg border border-[var(--border-color)]">
              <MailIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Email</span>
              <span className="text-[var(--text-main)] font-bold">contacto@institutocentrobioenergetica.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center shadow-lg border border-[var(--border-color)]">
              <PhoneIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Teléfono</span>
              <span className="text-[var(--text-main)] font-bold">+52 55 7907 6626</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[var(--bg-main)] rounded-2xl flex items-center justify-center shadow-lg border border-[var(--border-color)]">
              <YoutubeIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">YouTube</span>
              <a href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u" target="_blank" rel="noopener noreferrer" className="text-[var(--text-main)] font-bold hover:text-primary-600 transition-colors">wellvibe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;