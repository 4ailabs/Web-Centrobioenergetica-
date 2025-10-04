import React from 'react';
import { ClinicalServicesIcon, MailIcon, PhoneIcon } from '../components/Icons';

const ClinicalServices: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Biomagnetismo',
      description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
      duration: '60-90 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Auriculoterapia',
      description: 'Técnica de acupuntura auricular para el tratamiento de diversos desequilibrios energéticos.',
      duration: '45-60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Flores de Bach',
      description: 'Sistema de sanación natural con esencias florales para el equilibrio emocional.',
      duration: '30-45 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Terapia de Muñecos',
      description: 'Técnica terapéutica que utiliza muñecos para explorar los caminos de la vida.',
      duration: '60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Sandplay',
      description: 'Herramienta terapéutica que utiliza arena para el autoconocimiento y sanación.',
      duration: '45-60 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: 'Conflictos Biológicos',
      description: 'Análisis de la relación entre conflictos emocionales y manifestaciones biológicas.',
      duration: '90-120 min',
      price: 'Consultar',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <ClinicalServicesIcon className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-black">Servicios Clínicos</h1>
        </div>
        <p className="text-base lg:text-lg text-gray-500">
          Terapias especializadas para el bienestar integral y la sanación energética
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 mb-12">
        {services.map((service, index) => (
          <div key={service.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-48 lg:h-56">
              <img 
                src={service.imageUrl} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Duración: {service.duration}</span>
                <span className="font-medium text-green-600">{service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Contacto */}
      <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">Agenda tu Cita</h2>
        <p className="text-sm lg:text-base text-gray-600 mb-6">
          Para más información sobre nuestros servicios clínicos o para agendar una cita, contáctanos:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="mailto:info@centrobioenergetica.com"
            className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full font-semibold text-sm lg:text-base hover:bg-green-600 transition-colors"
          >
            <MailIcon className="w-4 h-4 mr-2" />
            Enviar Email
          </a>
          <a 
            href="tel:+1234567890"
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm lg:text-base hover:bg-gray-200 transition-colors"
          >
            <PhoneIcon className="w-4 h-4 mr-2" />
            Llamar Ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClinicalServices;
