import React, { useState } from 'react';
import CTASection from '../components/ui/CTASection';
import {
  Stethoscope, Brain, Infinity, Flower, Package, Scale, Apple, MessageSquare, Box,
  ChevronDown, ArrowRight
} from 'lucide-react';

const ClinicalServices: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const cls = "w-4 h-4 text-primary-600";
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

  const groups = [
    {
      name: 'Salud Emocional',
      services: [
        { title: 'Terapia de metaposiciones', desc: 'Conexión energética a través de patrones invisibles de información.', icon: 'infinity' },
        { title: 'Consulta de Flores de Bach', desc: 'Esencias florales para equilibrar emociones y reducir estrés.', icon: 'flower' },
        { title: 'Conflictología biológica', desc: 'Conflictos emocionales desde una perspectiva biológica.', icon: 'message' },
        { title: 'Terapia Sand Play', desc: 'Procesamiento de emociones y resolución simbólica de traumas.', icon: 'box' },
      ]
    },
    {
      name: 'Nutrición y Metabolismo',
      services: [
        { title: 'Consulta médica presencial y online', desc: 'Evaluación integrativa presencial o por videollamada.', icon: 'medical' },
        { title: 'Consulta Online Nutricional', desc: 'Formulario supervisado por el médico con receta personalizada.', icon: 'package' },
        { title: 'Control de peso con auriculoterapia', desc: 'Estimulación auricular para regular apetito y digestión.', icon: 'scale' },
        { title: 'Plan de Alimentación personalizada', desc: 'Nutrición basada en características biológicas y genéticas.', icon: 'apple' },
      ]
    },
    {
      name: 'Niños y Aprendizaje',
      services: [
        { title: 'Neuroaprendizaje y brain gym', desc: 'Técnicas para mejorar memoria, concentración y aprendizaje infantil.', icon: 'brain' },
      ]
    },
  ];

  const faqs = [
    { q: '¿Cómo agendo una cita?', a: 'Puedes agendar tu cita llamando directamente a nuestro número de contacto o enviando un mensaje por WhatsApp.' },
    { q: '¿Las consultas online son efectivas?', a: 'Sí, las consultas online permiten realizar una evaluación exhaustiva y seguimiento continuo.' },
    { q: '¿Qué formas de pago aceptan?', a: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos en efectivo para consultas presenciales.' }
  ];

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16 overflow-x-hidden">
      {/* Header */}
      <div className="px-6 lg:px-0 pt-8 lg:pt-10 pb-10">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight mb-2">
          Servicios <span className="text-primary-600">Clínicos</span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
          Terapias especializadas para tu bienestar integral, combinando medicina integrativa, nutrición y sanación energética.
        </p>
      </div>

      {/* Services grouped by category */}
      <div className="px-6 lg:px-0 pb-10 space-y-10">
        {groups.map((group) => (
          <div key={group.name}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{group.name}</span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>

            {/* Services in this category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.services.map((service, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors cursor-default"
                >
                  <div className="w-8 h-8 bg-primary-600/8 dark:bg-primary-600/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(service.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How it works — timeline horizontal */}
      <div className="px-6 lg:px-0 py-8 border-t border-neutral-200 dark:border-neutral-700">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-6">¿Cómo funciona?</h2>
        <div className="flex flex-col sm:flex-row items-start gap-0">
          {[
            { num: '1', title: 'Agenda', desc: 'Reserva por WhatsApp o teléfono.' },
            { num: '2', title: 'Evaluación', desc: 'Primera sesión para entender tus necesidades.' },
            { num: '3', title: 'Tratamiento', desc: 'Plan personalizado con seguimiento.' },
          ].map((step, i) => (
            <div key={i} className="flex-1 flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
              <div className="flex items-center gap-0 sm:mb-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
                  {step.num}
                </div>
                {i < 2 && <div className="hidden sm:block w-full h-px bg-neutral-200 dark:bg-neutral-700 min-w-[40px]"></div>}
              </div>
              <div className="pb-4 sm:pb-0">
                <h4 className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">{step.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 lg:px-0 py-8 border-t border-neutral-200 dark:border-neutral-700">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Preguntas frecuentes</h2>
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
