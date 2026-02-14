import React, { useState } from 'react';
import { ClinicalServicesIcon, FilterIcon } from '../components/Icons';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import CTASection from '../components/ui/CTASection';
import {
  Stethoscope,
  Brain,
  Infinity,
  Flower,
  Package,
  Scale,
  Apple,
  MessageSquare,
  Box,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react';

const ClinicalServices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8", strokeWidth: 1.5 };
    switch (iconName) {
      case 'medical': return <Stethoscope {...iconProps} className="text-primary-600" />;
      case 'brain': return <Brain {...iconProps} className="text-primary-600" />;
      case 'infinity': return <Infinity {...iconProps} className="text-primary-600" />;
      case 'flower': return <Flower {...iconProps} className="text-primary-600" />;
      case 'package': return <Package {...iconProps} className="text-primary-600" />;
      case 'scale': return <Scale {...iconProps} className="text-primary-600" />;
      case 'apple': return <Apple {...iconProps} className="text-primary-600" />;
      case 'message': return <MessageSquare {...iconProps} className="text-primary-600" />;
      case 'box': return <Box {...iconProps} className="text-primary-600" />;
      default: return <Package {...iconProps} className="text-primary-600" />;
    }
  };

  const categories = ['Todas', 'Salud Emocional', 'Nutrición y Metabolismo', 'Niños y Aprendizaje'];

  const services = [
    {
      id: 1,
      title: 'Consulta médica presencial y online',
      category: 'Nutrición y Metabolismo',
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
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Neuroaprendizaje y brain gym en niños',
      category: 'Niños y Aprendizaje',
      description: 'Técnicas que estimulan el cerebro infantil para mejorar la memoria, la concentración y el aprendizaje, utilizando ejercicios físicos y estrategias de desarrollo cognitivo.',
      benefits: [
        'Mejora significativa de memoria y concentración.',
        'Optimización del proceso de aprendizaje.',
        'Estimula el desarrollo cognitivo integral infantil.'
      ],
      icon: 'brain',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Terapia de metaposiciones',
      category: 'Salud Emocional',
      description: 'Explora la conexión energética entre seres vivos a través de patrones invisibles de información que influyen en la conducta, las emociones y la salud.',
      benefits: [
        'Profunda comprensión de la conexión energética.',
        'Mejora sustancial de la conducta y las emociones.',
        'Impacto positivo y duradero en la salud general.'
      ],
      icon: 'infinity',
      imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Consulta de Flores de Bach',
      category: 'Salud Emocional',
      description: 'Consulta que utiliza esencias florales para equilibrar emociones, reducir el estrés y promover un estado de bienestar general a nivel físico y mental.',
      benefits: [
        'Equilibrio emocional profundo y duradero.',
        'Efectiva reducción del estrés diario.',
        'Promoción activa del bienestar físico y mental.'
      ],
      icon: 'flower',
      imageUrl: 'https://images.unsplash.com/photo-1490237014491-8aa29811ea56?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'Consulta Online Nutricional',
      category: 'Nutrición y Metabolismo',
      description: 'Consulta a través de un Formulario y supervisado por el médico, con receta online personalizada.',
      benefits: [
        'Supervisión médica especializada y profesional.',
        'Total conveniencia de la consulta desde casa.',
        'Receta de productos nutricionales altamente personalizada.'
      ],
      icon: 'package',
      imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 6,
      title: 'Control de peso con auriculoterapia',
      category: 'Nutrición y Metabolismo',
      description: 'Uso de técnicas como la estimulación de puntos específicos en la oreja para regular el apetito, mejorar la digestión y apoyar el proceso de control y pérdida de peso.',
      benefits: [
        'Regulación natural y efectiva del apetito.',
        'Mejora notable de la función digestiva.',
        'Apoyo integral en el proceso de control y pérdida de peso.'
      ],
      icon: 'scale',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 7,
      title: 'Plan de Alimentación personalizada',
      category: 'Nutrición y Metabolismo',
      description: 'Plan de Alimentación personalizada en la que se analizan las características biológicas y genéticas del paciente para una nutrición adecuada.',
      benefits: [
        'Plan adaptado a tus características únicas.',
        'Guía individualizada para una nutrición óptima.',
        'Promueve una mejor salud y bienestar general.',
        'Incluye lista de compras y opciones de snacks.'
      ],
      icon: 'apple',
      imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 8,
      title: 'Terapia de conflictología biológica',
      category: 'Salud Emocional',
      description: 'Aborda conflictos emocionales desde una perspectiva biológica, ayudando a identificar su origen, su impacto en la salud y facilitando su procesamiento para una resolución efectiva.',
      benefits: [
        'Identificación profunda del origen emocional.',
        'Procesamiento y resolución efectiva de traumas.',
        'Mejora significativa del impacto emocional en la salud.'
      ],
      icon: 'message',
      imageUrl: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?q=80&w=2940&auto=format&fit=crop',
    },
    {
      id: 9,
      title: 'Terapia Sand Play (Caja de Arena)',
      category: 'Salud Emocional',
      description: 'Terapia expresiva en la que el paciente representa su mundo interno mediante figuras y arena, facilitando el procesamiento de emociones y la resolución de traumas de manera simbólica.',
      benefits: [
        'Representación y exploración del mundo interno.',
        'Facilita el procesamiento de emociones complejas.',
        'Resolución de traumas de manera simbólica y segura.'
      ],
      icon: 'box',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2940&auto=format&fit=crop',
    },
  ];

  const filteredServices = activeCategory === 'Todas'
    ? services
    : services.filter(s => s.category === activeCategory);

  const faqs = [
    {
      q: '¿Cómo agendo una cita?',
      a: 'Puedes agendar tu cita llamando directamente a nuestro número de contacto o enviando un mensaje por WhatsApp. Nuestro equipo te ayudará a encontrar el mejor horario para ti.'
    },
    {
      q: '¿Las consultas online son efectivas?',
      a: 'Sí, las consultas online permiten realizar una evaluación exhaustiva y seguimiento continuo. Son ideales para asesoría nutricional, revisión de estudios y seguimiento de tratamientos.'
    },
    {
      q: '¿Qué formas de pago aceptan?',
      a: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos en efectivo para las consultas presenciales.'
    }
  ];

  const steps = [
    { icon: <Clock className="w-6 h-6" />, title: 'Agenda', desc: 'Reserva tu espacio fácilmente por WhatsApp o teléfono.' },
    { icon: <Target className="w-6 h-6" />, title: 'Evaluación', desc: 'Primera sesión para entender tus necesidades y objetivos.' },
    { icon: <Zap className="w-6 h-6" />, title: 'Tratamiento', desc: 'Inicio de tu plan personalizado con seguimiento constante.' }
  ];

  return (
    <div className="w-full space-y-12 pb-20 px-6 py-12 lg:py-20">
      <PageHeader
        icon={<ClinicalServicesIcon className="w-6 h-6" />}
        tag="Cuidado Profesional"
        title="Servicios"
        titleAccent="Clínicos"
        description="Terapias especializadas diseñadas para tu bienestar integral, combinando medicina tradicional, nutrición y sanación energética."
      />

      {/* Categories Filter */}
      <section className="max-w-6xl mx-auto w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex items-center gap-3 min-w-max">
          <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <FilterIcon className="w-5 h-5 text-primary-600" />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${activeCategory === cat
                ? 'bg-primary-600 text-white shadow-md border-primary-600'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-primary-600 hover:text-primary-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Services */}
      <section className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Icon Box */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white dark:bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700 shadow-md">
                  {getIcon(service.icon)}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {service.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-normal leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-2">
                  {service.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full py-2 mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-200 group/btn">
                  <span>Saber más</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-6xl mx-auto w-full py-12">
        <div className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SectionHeader
              tag="Proceso de Atención"
              title="Tu camino hacia el"
              titleAccent="bienestar paso a paso"
              description="Nos enfocamos en un trato humano y personalizado desde el primer contacto, asegurando que cada etapa de tu terapia sea clara y efectiva."
            />

            <div className="grid gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-600 transition-all group hover:shadow-lg">
                  <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-primary-600 shrink-0 group-hover:scale-105 transition-transform border border-neutral-200 dark:border-neutral-600">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-1 group-hover:text-primary-600 transition-colors">{step.title}</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm font-normal leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto w-full py-12">
        <SectionHeader
          title="Preguntas"
          titleAccent="Frecuentes"
          description="Todo lo que necesitas saber antes de tu primera consulta."
          center
        />

        <div className="space-y-4 mt-8">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-lg transition-all duration-200 ${openFaq === i
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-600/10'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left group"
              >
                <span className="font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-neutral-600 dark:text-neutral-400 text-sm font-normal leading-relaxed border-t border-neutral-200 dark:border-neutral-700 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ClinicalServices;
