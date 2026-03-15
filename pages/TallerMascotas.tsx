import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, BookOpen, CheckCircle2 } from 'lucide-react';

const ModuloCard: React.FC<{
  numero: string;
  fecha: string;
  titulo: string;
  bloques: { time: string; title: string; desc: string }[];
}> = ({ numero, fecha, titulo, bloques }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
    <div className="p-5 lg:p-6 flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-700">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 bg-primary-600 text-white rounded-lg flex items-center justify-center text-xs font-semibold">{numero}</div>
          <span className="text-xs text-neutral-400">{fecha}</span>
        </div>
        <h2 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-50">{titulo}</h2>
      </div>
    </div>
    <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
      {bloques.map((block, i) => (
        <div key={i} className="flex gap-4 p-5 lg:p-6">
          <div className="shrink-0 w-20 pt-0.5">
            <span className="text-[11px] font-medium text-primary-600 bg-primary-600/8 px-2 py-0.5 rounded">{block.time}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[12.5px] font-normal text-neutral-600 dark:text-neutral-300 mb-0.5">{block.title}</h3>
            <p className="text-[11.5px] text-neutral-400 dark:text-neutral-500 leading-relaxed">{block.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TallerMascotas: React.FC = () => {
  const navigate = useNavigate();

  const modulo1 = [
    { time: '3:00', title: 'El Espejo Invisible', desc: 'La ciencia detrás de la sincronización emocional entre mascota y dueño.' },
    { time: '3:45', title: 'Los Conflictos Más Comunes', desc: 'Qué manifiesta tu mascota y qué refleja de tu vida emocional.' },
    { time: '5:00', title: 'Flores de Bach para Tu Mascota', desc: 'Flores esenciales para animales. Ejercicio de selección personalizada.' },
    { time: '5:45', title: 'Lectura del Campo Mórfico', desc: 'Las preguntas clave del terapeuta. Ejercicio vivencial en parejas y casos en vivo.' },
    { time: '6:30', title: 'Tu Botiquín Diario', desc: 'Rutinas prácticas para mantener el vínculo limpio y al animal en equilibrio.' },
  ];

  const modulo2 = [
    { time: '3:00', title: 'Testimonios Vivenciales', desc: '¿Alguien resolvió algo en su vida y vio cambio en su mascota? Revisión de registros y correlaciones de las 2 semanas.' },
    { time: '3:45', title: 'Pares Biomagnéticos para Mascotas', desc: 'Pares de regulación general adaptados a animales.' },
    { time: '5:00', title: 'Fórmulas Avanzadas de Flores', desc: 'Fórmulas prediseñadas para los problemas más comunes. Ajuste de la fórmula personal.' },
    { time: '5:45', title: 'Protocolo Integrado', desc: '5 pasos: evaluar al dueño → correlacionar síntoma → leer campo mórfico → aplicar herramientas al animal → tratar al dueño.' },
    { time: '6:40', title: 'Cierre + Lo Que Viene', desc: 'Resumen de herramientas. Programa avanzado de octubre: Terapeuta Animal Integrativo con certificación.' },
  ];

  const entregables = [
    'Tabla de 10 conflictos mascota-dueño más comunes',
    '7 flores esenciales + 5 fórmulas prediseñadas',
    '10 pares biomagnéticos básicos para animales',
    'Las 3 preguntas del campo mórfico',
    'Protocolo integrado de 5 pasos',
    'Hoja resumen "refrigerator sheet" con rutina diaria y semanal',
  ];

  return (
    <div className="w-full pt-[72px] lg:pt-0 pb-16">
      {/* Back */}
      <div className="px-6 lg:px-0 pt-6 pb-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {/* Hero */}
      <div className="px-6 lg:px-0 pb-8">
        <div className="rounded-xl overflow-hidden aspect-[2.2/1] relative bg-neutral-100 dark:bg-neutral-800">
          <img src="/images/courses/taller-mascotas/mascota.png" alt="Lo Que Tu Mascota Quiere Decirte" className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-600 text-white text-[11px] font-medium rounded-full">Próximamente</span>
          </div>
        </div>
      </div>

      {/* Title + Meta */}
      <div className="px-6 lg:px-0 pb-8">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight mb-4">
          Lo Que Tu Mascota Quiere Decirte
        </h1>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
          {[
            { icon: Calendar, text: '27 marzo + 10 abril 2026' },
            { icon: Clock, text: '3:00 – 7:00 pm' },
            { icon: User, text: 'Dr. Miguel Ojeda Ríos' },
            { icon: BookOpen, text: 'Básico-Intermedio' },
            { icon: MapPin, text: 'Presencial u Online' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[13px] text-neutral-500 dark:text-neutral-400">
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Descubre cómo tu mascota refleja tu estado emocional y aprende herramientas concretas para sanar el vínculo con tu animal. Combina MFT Animales, Flores de Bach, Pares Biomagnéticos y Conflictología Biológica.
        </p>
      </div>

      {/* Módulos */}
      <div className="px-6 lg:px-0 pb-4">
        <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-4">Programa</h2>
      </div>

      <div className="px-6 lg:px-0 pb-6">
        <ModuloCard numero="1" fecha="Viernes 27 de marzo" titulo="Tu Mascota Es Tu Espejo" bloques={modulo1} />
      </div>

      <div className="px-6 lg:px-0 pb-10">
        <ModuloCard numero="2" fecha="Viernes 10 de abril" titulo="Sana el Vínculo con Tu Animal" bloques={modulo2} />
      </div>

      {/* Qué te llevas */}
      <div className="px-6 lg:px-0 pb-10">
        <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-4">Qué te llevas</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {entregables.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <span className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requisitos */}
      <div className="px-6 lg:px-0 pb-10">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40">
          <BookOpen className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300 mb-0.5">Requisitos</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Ninguno. Solo traer una foto de tu mascota.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-0">
        <div className="bg-primary-600 rounded-xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-medium text-white mb-1">¿Quieres reservar tu lugar?</h3>
            <p className="text-primary-100 text-sm">Cupo limitado · Presencial u Online</p>
          </div>
          <a
            href="https://wa.me/525579076626?text=Hola%2C%20quiero%20inscribirme%20al%20taller%20Lo%20Que%20Tu%20Mascota%20Quiere%20Decirte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-medium text-sm hover:shadow-md transition-all shrink-0"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Inscribirme por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default TallerMascotas;
