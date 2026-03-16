import React, { useState } from 'react';
import CTASection from '../components/ui/CTASection';
import {
  Stethoscope, Brain, Infinity, Flower, Package, Scale, Apple, MessageSquare, Box,
  CheckCircle2, ChevronDown, ChevronUp, Clock, Target, Zap, ArrowRight
} from 'lucide-react';

const ClinicalServices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const cls = "w-5 h-5 text-primary-600";
    switch (iconName) {
      case 'medical': return <Stethoscope className={cls} />;
      case 'brain': return <Brain className={cls} />;
      case 'infinity': return <Infinity className={cls} />;
      case 'flower': return <Flower className={cls} />;
      case 'package': return <Package className={cls} />;
      case 'scale': return <Scale className={cls} />;
      case 'apple': return <Apple className={cls} />;
      case 'message': return <MessageSquare className={cls} />;
      case 'box': return <Box className={cls} />;
      default: return <Package className={cls} />;
    }
  };

  const categories = ['Todas', 'Salud Emocional', 'Nutrición y Metabolismo', 'Niños y Aprendizaje'];

  const services = [
    { id: 1, title: 'Consulta médica presencial y online', category: 'Nutrición y Metabolismo', description: 'Atención personalizada para evaluar y tratar problemas de salud a través de un enfoque integrativo.', benefits: ['Evaluación integral', 'Presencial o videollamada', 'Diagnóstico y receta'], icon: 'medical' },
    { id: 2, title: 'Neuroaprendizaje y brain gym en niños', category: 'Niños y Aprendizaje', description: 'Técnicas que estimulan el cerebro infantil para mejorar la memoria, concentración y aprendizaje.', benefits: ['Mejora memoria y concentración', 'Desarrollo cognitivo', 'Ejercicios prácticos'], icon: 'brain' },
    { id: 3, title: 'Terapia de metaposiciones', category: 'Salud Emocional', description: 'Explora la conexión energética entre seres vivos a través de patrones invisibles de información.', benefits: ['Comprensión energética', 'Mejora emocional', 'Impacto en salud'], icon: 'infinity' },
    { id: 4, title: 'Consulta de Flores de Bach', category: 'Salud Emocional', description: 'Esencias florales para equilibrar emociones, reducir estrés y promover bienestar general.', benefits: ['Equilibrio emocional', 'Reducción del estrés', 'Bienestar físico y mental'], icon: 'flower' },
    { id: 5, title: 'Consulta Online Nutricional', category: 'Nutrición y Metabolismo', description: 'Consulta a través de formulario supervisado por el médico, con receta online personalizada.', benefits: ['Supervisión médica', 'Desde casa', 'Receta personalizada'], icon: 'package' },
    { id: 6, title: 'Control de peso con auriculoterapia', category: 'Nutrición y Metabolismo', description: 'Estimulación de puntos en la oreja para regular apetito y apoyar el control de peso.', benefits: ['Regulación del apetito', 'Mejora digestiva', 'Apoyo integral'], icon: 'scale' },
    { id: 7, title: 'Plan de Alimentación personalizada', category: 'Nutrición y Metabolismo', description: 'Se analizan las características biológicas y genéticas del paciente para una nutrición adecuada.', benefits: ['Plan adaptado', 'Nutrición óptima', 'Lista de compras incluida'], icon: 'apple' },
    { id: 8, title: 'Terapia de conflictología biológica', category: 'Salud Emocional', description: 'Aborda conflictos emocionales desde una perspectiva biológica para identificar su origen e impacto.', benefits: ['Origen emocional', 'Resolución de traumas', 'Impacto en salud'], icon: 'message' },
    { id: 9, title: 'Terapia Sand Play', category: 'Salud Emocional', description: 'Terapia expresiva con figuras y arena para procesar emociones y resolver traumas simbólicamente.', benefits: ['Exploración interna', 'Procesamiento emocional', 'Resolución simbólica'], icon: 'box' },
  ];

  const filtered = activeCategory === 'Todas' ? services : services.filter(s => s.category === activeCategory);

  const faqs = [
    { q: '¿Cómo agendo una cita?', a: 'Puedes agendar tu cita llamando directamente a nuestro número de contacto o enviando un mensaje por WhatsApp.' },
    { q: '¿Las consultas online son efectivas?', a: 'Sí, las consultas online permiten realizar una evaluación exhaustiva y seguimiento continuo.' },
    { q: '¿Qué formas de pago aceptan?', a: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos en efectivo para consultas presenciales.' }
  ];

  const steps = [
    { icon: <Clock className="w-4 h-4" />, title: 'Agenda', desc: 'Reserva por WhatsApp o teléfono.' },
    { icon: <Target className="w-4 h-4" />, title: 'Evaluación', desc: 'Primera sesión para entender tus necesidades.' },
    { icon: <Zap className="w-4 h-4" />, title: 'Tratamiento', desc: 'Plan personalizado con seguimiento.' }
  ];

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-8">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
          Servicios <span className="text-primary-600">Clínicos</span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
          Terapias especializadas para tu bienestar integral.
        </p>
      </div>

      {/* Filter pills */}
      <div className="px-6 lg:px-0 pb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                ? 'bg-primary-600 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services list — clean, editorial */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {filtered.map((service) => {
            const isExpanded = expandedService === service.id;
            return (
              <div
                key={service.id}
                className="py-5 first:pt-0 last:pb-0 cursor-pointer group"
                onClick={() => setExpandedService(isExpanded ? null : service.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-primary-600/8 dark:bg-primary-600/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(service.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug group-hover:text-primary-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">{service.category}</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {isExpanded && (
                      <div className="mt-3 animate-fade-in">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.benefits.map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-primary-600 shrink-0" />
                              <span className="text-xs text-neutral-600 dark:text-neutral-400">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works — compact */}
      <div className="px-6 lg:px-0 py-8 border-t border-neutral-200 dark:border-neutral-700">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-5">Proceso de atención</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-8 h-8 bg-primary-600/8 dark:bg-primary-600/15 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                {step.icon}
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">{step.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ — minimal */}
      <div className="px-6 lg:px-0 py-8 border-t border-neutral-200 dark:border-neutral-700">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-5">Preguntas frecuentes</h2>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-4 flex items-center justify-between text-left group"
              >
                <span className="text-[14px] font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-primary-600 transition-colors">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <p className="pb-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-0 pt-4">
        <CTASection />
      </div>
    </div>
  );
};

export default ClinicalServices;
