import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, BookOpen, CheckCircle2, Users } from 'lucide-react';

const ActosQueMueven: React.FC = () => {
  const navigate = useNavigate();

  const modulo1 = [
    { time: '10:00', title: 'Apertura', desc: 'Encuadre, ronda de llegada, marco conceptual y Secuencia TAME.' },
    { time: '10:45', title: 'Romper y Reparar', desc: 'Cuando algo te impactó tanto que las piezas se separaron.' },
    { time: '11:35', title: 'Lo que Nunca se Dijo', desc: 'Cuando la voz fue silenciada y lo no dicho se acumuló.' },
    { time: '12:25', title: 'Ponerse de Pie', desc: 'Cuando aprendiste a hacerte pequeño para no ser blanco.' },
    { time: '14:15', title: 'La Cara que Construí', desc: 'Cuando construiste una cara para el mundo porque mostrar la real parecía peligroso.' },
    { time: '15:05', title: 'El Primer Bocado', desc: 'Cuando todo se apagó por dentro. Fatiga, vacío, modo mínimo.' },
    { time: '15:55', title: 'Cierre', desc: 'Círculo de integración, psicoeducación TAME y tarea entre módulos.' },
  ];

  const modulo2 = [
    { time: '10:00', title: 'Reencuentro', desc: 'Revisión de experiencias entre módulos. Preparación para la secuencia.' },
    { time: '11:00', title: 'El Peso', desc: 'Descenso — Entrar al cuerpo con todo lo que carga.' },
    { time: '11:50', title: 'La Herida que Habla', desc: 'Descenso — Nombrar lo que duele, darle palabras al patrón.' },
    { time: '13:40', title: 'El Espejo', desc: 'Encuentro — Mirarse sin máscara, encontrar al que está adentro.' },
    { time: '14:30', title: 'Diálogo con las Partes', desc: 'Encuentro — Escuchar lo que cada zona del cuerpo guarda.' },
    { time: '15:20', title: 'La Entrega a la Tierra', desc: 'Ascenso — Soltar, entregar a la tierra lo que ya no se necesita.' },
    { time: '16:10', title: 'El Nuevo Paso', desc: 'Ascenso — Reconstruir, dar el primer paso como alguien que soltó.' },
    { time: '17:00', title: 'Cierre del taller', desc: 'Círculo final, instrucciones de seguimiento, despedida.' },
  ];

  const entregables = [
    '5 actos rituales fundamentales para practicar en casa',
    'La Secuencia TAME: 5 pasos para que el acto llegue al cuerpo',
    'Una secuencia progresiva de 6 fases como modelo',
    'Plato reparado con kintsugi (Acto 1)',
    'Maceta con semilla plantada (Acto 5 del Módulo 2)',
    'Piedra-testigo del proceso completo',
    'Canal de seguimiento grupal',
  ];

  const ModuloCard: React.FC<{ numero: string; fecha: string; titulo: string; bloques: typeof modulo1 }> = ({ numero, fecha, titulo, bloques }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="p-5 flex items-center gap-2.5 border-b border-neutral-100 dark:border-neutral-700">
        <div className="w-6 h-6 bg-primary-600 text-white rounded-md flex items-center justify-center text-[11px] font-semibold">{numero}</div>
        <div>
          <h2 className="text-[15px] font-medium text-neutral-800 dark:text-neutral-100">{titulo}</h2>
          <p className="text-[11px] text-neutral-400">{fecha}</p>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {bloques.map((block, i) => (
          <div key={i} className="flex gap-4 p-5">
            <div className="shrink-0 w-16 pt-0.5">
              <span className="text-[11px] font-medium text-primary-600 bg-primary-600/8 px-2 py-0.5 rounded">{block.time}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[13px] font-normal text-neutral-600 dark:text-neutral-300 mb-0.5">{block.title}</h3>
              <p className="text-[11.5px] text-neutral-400 dark:text-neutral-500 leading-relaxed">{block.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
          <img src="/images/courses/actos-que-mueven/ritual_3.jpg" alt="Actos que Mueven" className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-600 text-white text-[11px] font-medium rounded-full">Próximamente</span>
          </div>
        </div>
      </div>

      {/* Title + Meta */}
      <div className="px-6 lg:px-0 pb-8">
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 italic mb-4">
          El cuerpo no cambia con lo que entiendes — cambia con lo que haces.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
          {[
            { icon: Calendar, text: '6 y 20 de junio 2026' },
            { icon: Clock, text: '10:00 – 18:00 h' },
            { icon: User, text: 'Dr. Miguel Ojeda Ríos' },
            { icon: BookOpen, text: 'Todo público' },
            { icon: MapPin, text: 'Presencial · Vivencial' },
            { icon: Users, text: 'Cupo: 15 personas' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[13px] text-neutral-500 dark:text-neutral-400">
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Taller vivencial de rituales personales. Dos módulos donde los participantes experimentan actos rituales diseñados para comunicarse directamente con el sistema nervioso. No requiere formación previa.
        </p>
      </div>

      {/* Programa */}
      <div className="px-6 lg:px-0 pb-4">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Programa</h2>
      </div>

      <div className="px-6 lg:px-0 pb-5">
        <ModuloCard numero="1" fecha="Sábado 6 de junio" titulo="Los 5 Actos Fundamentales" bloques={modulo1} />
      </div>

      <div className="px-6 lg:px-0 pb-8">
        <ModuloCard numero="2" fecha="Sábado 20 de junio" titulo="La Secuencia que Transforma" bloques={modulo2} />
      </div>

      {/* Qué te llevas */}
      <div className="px-6 lg:px-0 pb-8">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-4">Qué te llevas</h2>
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5">
          <div className="space-y-3">
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
      <div className="px-6 lg:px-0 pb-8">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40">
          <BookOpen className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300 mb-0.5">Requisitos</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Ninguno. No se requiere formación previa. Formato presencial y vivencial.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-0">
        <div className="bg-primary-600 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-medium text-white mb-1">¿Quieres reservar tu lugar?</h3>
            <p className="text-primary-100 text-xs">Cupo limitado a 15 personas</p>
          </div>
          <a
            href="https://wa.me/525579076626?text=Hola%2C%20quiero%20inscribirme%20al%20taller%20Actos%20que%20Mueven"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 rounded-lg font-medium text-sm hover:shadow-sm transition-all shrink-0"
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

export default ActosQueMueven;
