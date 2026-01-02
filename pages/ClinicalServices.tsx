import React, { useState } from 'react';
import { ClinicalServicesIcon, PhoneIcon, SparklesIcon, FilterIcon } from '../components/Icons';
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
  ArrowRight,
  MapPin
} from 'lucide-react';

const ClinicalServices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8", strokeWidth: 1.5 };
    switch (iconName) {
      case 'medical': return <Stethoscope {...iconProps} className="text-blue-600" />;
      case 'brain': return <Brain {...iconProps} className="text-purple-600" />;
      case 'infinity': return <Infinity {...iconProps} className="text-indigo-600" />;
      case 'flower': return <Flower {...iconProps} className="text-pink-600" />;
      case 'package': return <Package {...iconProps} className="text-orange-600" />;
      case 'scale': return <Scale {...iconProps} className="text-teal-600" />;
      case 'apple': return <Apple {...iconProps} className="text-red-600" />;
      case 'message': return <MessageSquare {...iconProps} className="text-emerald-600" />;
      case 'box': return <Box {...iconProps} className="text-amber-600" />;
      default: return <Package {...iconProps} className="text-gray-600" />;
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
    <div className="w-full lg:mt-20 mt-16 space-y-12 pb-20">
      {/* Header Section */}
      <header className="px-4 relative overflow-hidden bg-[var(--panel-bg)] rounded-[2.5rem] py-12 border border-[var(--border-color)] shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
              <ClinicalServicesIcon className="w-6 h-6" />
            </div>
            <span className="text-primary-600 font-black uppercase tracking-widest text-[10px]">Cuidado Profesional</span>
          </div>
          <h1 className="text-3xl lg:text-6xl font-black text-[var(--text-main)] tracking-tight mb-4 uppercase">
            Servicios <span className="text-primary-600">Clínicos</span>
          </h1>
          <p className="text-base lg:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-medium">
            Terapias especializadas diseñadas para tu bienestar integral, combinando medicina tradicional, nutrición y sanación energética.
          </p>
        </div>
      </header>

      {/* Categories Filter */}
      <section className="px-4 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex items-center space-x-3 min-w-max">
          <div className="p-2.5 bg-[var(--panel-bg)] rounded-xl border border-[var(--border-color)] shadow-sm">
            <FilterIcon className="w-5 h-5 text-primary-600" />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20 border-primary-500'
                : 'bg-[var(--panel-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-primary-400 hover:text-primary-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Services */}
      <section className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group bg-[var(--panel-bg)] rounded-[2.5rem] overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/80 via-transparent to-transparent opacity-60"></div>

                {/* Glass Icon Box */}
                <div className="absolute top-6 left-6 w-14 h-14 bg-[var(--bg-main)]/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-[var(--border-color)]">
                  {getIcon(service.icon)}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-primary-600/90 backdrop-blur rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 group-hover:text-primary-600 transition-colors leading-tight uppercase">
                  {service.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 bg-primary-600/10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="text-sm text-[var(--text-muted)] leading-tight font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full group/btn relative flex items-center justify-center gap-2 py-4 bg-[var(--bg-main)] hover:bg-primary-600 text-[var(--text-main)] hover:text-white rounded-2xl font-bold transition-all overflow-hidden border border-[var(--border-color)] shadow-sm">
                  <span className="relative z-10">Saber más</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 py-12">
        <div className="bg-[var(--panel-bg)] rounded-[3rem] p-10 lg:p-16 text-[var(--text-main)] relative overflow-hidden border border-[var(--border-color)]">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 font-black uppercase tracking-widest text-[10px] mb-4 block">Proceso de Atención</span>
              <h2 className="text-3xl lg:text-5xl font-black mb-6 uppercase tracking-tight leading-none">Tu camino hacia el <br /><span className="text-primary-600">bienestar</span> paso a paso</h2>
              <p className="text-[var(--text-muted)] text-base lg:text-lg leading-relaxed mb-8 font-medium">
                Nos enfocamos en un trato humano y personalizado desde el primer contacto, asegurando que cada etapa de tu terapia sea clara y efectiva.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)] shadow-sm">
                  <SparklesIcon className="w-4 h-4 text-primary-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sin esperas largas</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)] shadow-sm">
                  <SparklesIcon className="w-4 h-4 text-primary-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Privacidad total</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 p-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-[2.5rem] hover:border-primary-600 transition-all group shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 bg-primary-600/10 rounded-2xl flex items-center justify-center text-primary-600 shrink-0 group-hover:scale-110 transition-transform border border-primary-600/10">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1 uppercase tracking-tight text-[var(--text-main)] group-hover:text-primary-600 transition-colors">{step.title}</h4>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-main)] mb-4 uppercase tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-[var(--text-muted)]">Todo lo que necesitas saber antes de tu primera consulta.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-[2rem] transition-all duration-300 ${openFaq === i ? 'border-primary-500 bg-primary-600/5' : 'border-[var(--border-color)] bg-[var(--bg-main)]'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-[var(--text-main)] group-hover:text-primary-600 lg:text-lg transition-colors">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary-600" /> : <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />}
              </button>
              {openFaq === i && (
                <div className="px-8 pb-8 text-[var(--text-muted)] leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA SECTION */}
      <section className="px-4">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-[3rem] p-8 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 shrink-0">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">¿Listo para comenzar tu sanación?</h2>
            <p className="text-primary-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Agenda tu cita hoy mismo y descubre cómo la bionergética y el enfoque integral pueden transformar tu vida.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+525579076626"
                className="px-10 py-5 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 border border-[var(--border-color)] shadow-slate-900/10"
              >
                <PhoneIcon className="w-6 h-6" />
                Llamar Ahora
              </a>
              <a
                href="https://wa.me/525579076626"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-[var(--text-main)] text-[var(--bg-main)] rounded-2xl font-black text-lg hover:bg-primary-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-slate-900/10"
              >
                <svg className="w-6 h-6 fill-current text-green-500" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <div className="mt-12 pt-12 border-t border-white/10 flex flex-col lg:flex-row items-center justify-center gap-8 text-sm text-primary-200">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-primary-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>Acapulco 36, Roma Norte, CDMX</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-primary-400">
                  <Clock className="w-4 h-4" />
                </span>
                <span>Lun - Vie: 9:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicalServices;
