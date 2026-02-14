import React from 'react';
import { CoursesIcon, NewsIcon, MailIcon, PhoneIcon, YoutubeIcon } from '../components/Icons';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 space-y-20 pb-20">
      {/* Header Section */}
      <header className="px-6 max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
              Sobre <br />
              <span className="text-primary-600">nosotros</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Conoce el Instituto Centrobioenergética y nuestra misión de transformación personal.
            </p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team working on laptops"
          className="w-full h-52 lg:h-80 object-cover rounded-lg"
        />
      </section>

      {/* Main Content */}
      <section className="px-6 max-w-4xl mx-auto w-full space-y-8">
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Bienvenido al Instituto <span className="text-primary-600">Centrobioenergética</span>
          </h2>
          <div className="space-y-4 text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            <p>
              En el Instituto Centrobioenergética, brindamos una experiencia de aprendizaje unificada y cautivadora diseñada para adaptarse a tus necesidades. Nos dedicamos a llevar la educación a tu alcance, ofreciendo una diversa gama de cursos para potenciar tu viaje de aprendizaje.
            </p>
            <p>
              Nuestra plataforma combina tecnología de punta con enfoques personalizados, asegurando que tengas las herramientas y recursos para tener éxito en tus esfuerzos educativos. Explora un mundo de conocimiento con nuestra interfaz fácil de usar, funciones de seguimiento de progreso y materiales de aprendizaje interactivos.
            </p>
            <p>
              Ya seas estudiante, profesional o aprendiz de por vida, el Instituto Centrobioenergética es tu destino central para una educación de calidad. Únete a nosotros en esta aventura educativa, donde el aprendizaje no conoce límites, y deja que el Instituto Centrobioenergética sea tu guía hacia un futuro más brillante.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Cards */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Cursos Card */}
          <a
            href="/cursos"
            className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-10 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-200">
              <CoursesIcon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
              Cursos
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal">
              Explora nuestra oferta académica de cursos transformadores
            </p>
          </a>

          {/* Noticias Card */}
          <a
            href="/news"
            className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-10 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-200">
              <NewsIcon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
              Noticias
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-normal">
              Lee los últimos artículos y novedades del Instituto
            </p>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="bg-gradient-to-br from-primary-600/10 via-primary-600/5 to-transparent dark:from-primary-600/20 dark:via-primary-600/10 dark:to-transparent rounded-lg border border-primary-200 dark:border-primary-600/30 p-12 lg:p-16">
          {/* Section Title */}
          <h3 className="text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 text-center mb-12">
            ¿Alguna pregunta?
          </h3>

          {/* Contact Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600">
                <MailIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary-600 mb-1">Email</p>
                <a
                  href="mailto:contacto@institutocentrobioenergetica.com"
                  className="text-neutral-900 dark:text-neutral-50 font-medium hover:text-primary-600 transition-colors break-all"
                >
                  contacto@institutocentrobioenergetica.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary-600 mb-1">Teléfono</p>
                <a
                  href="tel:+525579076626"
                  className="text-neutral-900 dark:text-neutral-50 font-medium hover:text-primary-600 transition-colors"
                >
                  +52 55 7907 6626
                </a>
              </div>
            </div>

            {/* YouTube */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600">
                <YoutubeIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary-600 mb-1">YouTube</p>
                <a
                  href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 dark:text-neutral-50 font-medium hover:text-primary-600 transition-colors"
                >
                  Wellvibe Media
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
