import React from 'react';
import { ClinicalServicesIcon, PhoneIcon } from '../components/Icons';
import { Stethoscope, Brain, Infinity, Flower, Package, Scale, Apple, MessageSquare, Box } from 'lucide-react';

const ClinicalServices: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8", strokeWidth: 1.5 };
    switch (iconName) {
      case 'medical': return <Stethoscope {...iconProps} className="w-8 h-8 text-blue-600" strokeWidth={1.5} />;
      case 'brain': return <Brain {...iconProps} className="w-8 h-8 text-purple-600" strokeWidth={1.5} />;
      case 'infinity': return <Infinity {...iconProps} className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />;
      case 'flower': return <Flower {...iconProps} className="w-8 h-8 text-pink-600" strokeWidth={1.5} />;
      case 'package': return <Package {...iconProps} className="w-8 h-8 text-orange-600" strokeWidth={1.5} />;
      case 'scale': return <Scale {...iconProps} className="w-8 h-8 text-teal-600" strokeWidth={1.5} />;
      case 'apple': return <Apple {...iconProps} className="w-8 h-8 text-red-600" strokeWidth={1.5} />;
      case 'message': return <MessageSquare {...iconProps} className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />;
      case 'box': return <Box {...iconProps} className="w-8 h-8 text-amber-600" strokeWidth={1.5} />;
      default: return <Package {...iconProps} className="w-8 h-8 text-gray-600" strokeWidth={1.5} />;
    }
  };

  const services = [
    {
      id: 1,
      title: 'Consulta médica presencial y online',
      description: 'Atención personalizada para evaluar y tratar problemas de salud a través de un enfoque integrativo, ya sea de forma presencial o mediante videollamada.',
      benefits: [
        'Evaluación y tratamiento integral de problemas de salud.',
        'Atención personalizada y adaptada.',
        'Máxima comodidad (presencial o videollamada).',
        'Diagnóstico preciso y receta de tratamiento.'
      ],
      includes: 'Diagnóstico y receta del tratamiento.',
      notIncludes: 'Terapia de Biomagnetismo.',
      icon: 'medical',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Neuroaprendizaje y brain gym en niños',
      description: 'Técnicas que estimulan el cerebro infantil para mejorar la memoria, la concentración y el aprendizaje, utilizando ejercicios físicos y estrategias de desarrollo cognitivo.',
      benefits: [
        'Mejora significativa de memoria y concentración.',
        'Optimización del proceso de aprendizaje.',
        'Estimula el desarrollo cognitivo integral infantil.'
      ],
      icon: 'brain',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Terapia de metaposiciones',
      description: 'Explora la conexión energética entre seres vivos a través de patrones invisibles de información que influyen en la conducta, las emociones y la salud.',
      benefits: [
        'Profunda comprensión de la conexión energética.',
        'Mejora sustancial de la conducta y las emociones.',
        'Impacto positivo y duradero en la salud general.'
      ],
      icon: 'infinity',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Consulta de Flores de Bach',
      description: 'Consulta que utiliza esencias florales para equilibrar emociones, reducir el estrés y promover un estado de bienestar general a nivel físico y mental.',
      benefits: [
        'Equilibrio emocional profundo y duradero.',
        'Efectiva reducción del estrés diario.',
        'Promoción activa del bienestar físico y mental.'
      ],
      icon: 'flower',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'Consulta Online Nutricional',
      description: 'Consulta a través de un Formulario y supervisado por el médico, con receta online personalizada.',
      benefits: [
        'Supervisión médica especializada y profesional.',
        'Total conveniencia de la consulta desde casa.',
        'Receta de productos nutricionales altamente personalizada.'
      ],
      icon: 'package',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: 'Control de peso con auriculoterapia',
      description: 'Uso de técnicas como la estimulación de puntos específicos en la oreja para regular el apetito, mejorar la digestión y apoyar el proceso de control y pérdida de peso.',
      benefits: [
        'Regulación natural y efectiva del apetito.',
        'Mejora notable de la función digestiva.',
        'Apoyo integral en el proceso de control y pérdida de peso.'
      ],
      icon: 'scale',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 7,
      title: 'Plan de Alimentación personalizada',
      description: 'Plan de Alimentación personalizada en la que se analizan las características biológicas y genéticas del paciente para una nutrición adecuada.',
      benefits: [
        'Plan adaptado a tus características únicas.',
        'Guía individualizada para una nutrición óptima.',
        'Promueve una mejor salud y bienestar general.',
        'Incluye lista de compras y opciones de snacks.'
      ],
      icon: 'apple',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 8,
      title: 'Terapia de conflictología biológica',
      description: 'Aborda conflictos emocionales desde una perspectiva biológica, ayudando a identificar su origen, su impacto en la salud y facilitando su procesamiento para una resolución efectiva.',
      benefits: [
        'Identificación profunda del origen emocional.',
        'Procesamiento y resolución efectiva de traumas.',
        'Mejora significativa del impacto emocional en la salud.'
      ],
      icon: 'message',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 9,
      title: 'Terapia Sand Play (Caja de Arena)',
      description: 'Terapia expresiva en la que el paciente representa su mundo interno mediante figuras y arena, facilitando el procesamiento de emociones y la resolución de traumas de manera simbólica.',
      benefits: [
        'Representación y exploración del mundo interno.',
        'Facilita el procesamiento de emociones complejas.',
        'Resolución de traumas de manera simbólica y segura.'
      ],
      icon: 'package',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="w-full bg-white p-3 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl lg:mt-20 mt-12 sm:mt-16">
      <header className="mb-6 sm:mb-8 lg:mb-12">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
            <ClinicalServicesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-black">Servicios Clínicos</h1>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
          Terapias especializadas para el bienestar integral y la sanación energética
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 mb-8 sm:mb-12 lg:mb-16">
        {services.map((service, index) => (
          <div key={service.id} className="group bg-white border border-gray-100 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-2 hover:border-green-200">
            <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
              <img 
                src={service.imageUrl} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {getIcon(service.icon)}
              </div>
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">{service.title}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
              
              {/* Beneficios */}
              <div className="mb-3 sm:mb-4">
                <h4 className="text-xs sm:text-sm font-semibold text-green-600 mb-1 sm:mb-2 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
                  Beneficios clave:
                </h4>
                <ul className="space-y-1">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 text-xs">✓</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información adicional */}
              {(service.includes || service.notIncludes) && (
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  {service.includes && (
                    <p className="text-xs text-gray-600 mb-1 leading-relaxed">
                      <span className="font-medium">Incluye:</span> {service.includes}
                    </p>
                  )}
                  {service.notIncludes && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-medium">No incluye:</span> {service.notIncludes}
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Sección de Contacto */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-100">
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Agenda tu Cita</h2>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          Para más información sobre nuestros servicios clínicos o para agendar una cita, contáctanos:
        </p>
        
        {/* Información de ubicación */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-start">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-1">
              <span className="text-green-600 text-xs sm:text-sm">📍</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Ubicación</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Acapulco 36, int. 104<br />
                Col. Roma Norte, CDMX
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a 
            href="tel:+525579076626"
            className="flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full font-semibold text-sm sm:text-base lg:text-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
            <span className="text-center">
              <span className="hidden sm:inline">Agendar Cita: </span>
              <span className="sm:hidden">Llamar: </span>
              +52 55 7907 6626
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClinicalServices;
