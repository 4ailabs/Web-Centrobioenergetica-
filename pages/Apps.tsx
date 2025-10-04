
import React from 'react';
import type { AppInfo } from '../types';
import AppCard from '../components/AppCard';
import { FramerIcon, NotionIcon, LemonSqueezyIcon, GumroadIcon, AsanaIcon, DiagramIcon } from '../components/Icons';

const apps: AppInfo[] = [
  {
    id: 1,
    name: 'Framer',
    category: 'Plataforma de Diseño Web',
    description: 'Pasa fácilmente del diseño a un sitio de primera clase con Framer, el constructor web para profesionales creativos. Optimiza para cada punto de interrupción, sin necesidad de código y publica de forma gratuita.',
    logo: <FramerIcon className="w-10 h-10" />,
    website: '#',
  },
  {
    id: 2,
    name: 'Notion',
    category: 'Espacio de Trabajo',
    description: 'Una nueva herramienta que combina tus aplicaciones de trabajo diarias en una sola. Es el espacio de trabajo todo en uno para ti y tu equipo.',
    logo: <NotionIcon className="w-10 h-10" />,
    website: '#',
  },
   {
    id: 3,
    name: 'Lemon Squeezy',
    category: 'Plataforma de Pagos',
    description: 'Lemon Squeezy es la plataforma todo en uno para gestionar tu negocio SaaS. Pagos, suscripciones, cumplimiento fiscal global, prevención de fraudes, multidivisa.',
    logo: <LemonSqueezyIcon className="w-10 h-10" />,
    website: '#',
  },
  {
    id: 4,
    name: 'Gumroad',
    category: 'Plataforma de Pagos',
    description: 'Gumroad: hacemos que sea fácil ganar tu primer dólar en línea vendiendo productos digitales y membresías. Gumroad fue creado para ayudarte a experimentar con todo tipo de ideas y formatos.',
    logo: <GumroadIcon className="w-10 h-10" />,
    website: '#',
  },
  {
    id: 5,
    name: 'Asana',
    category: 'Gestión de Proyectos',
    description: 'Mantén a todos y todo organizado. Con Asana, puedes asignar tareas, establecer plazos y seguir el progreso. Mantén a los equipos remotos y distribuidos enfocados en sus metas.',
    logo: <AsanaIcon className="w-10 h-10" />,
    website: '#',
  },
  {
    id: 6,
    name: 'Diagram',
    category: 'Herramienta de Diseño IA',
    description: 'Un diagrama es una representación simbólica de información usando técnicas de visualización. Los diagramas se han utilizado desde tiempos prehistóricos, pero se hicieron más frecuentes durante la Ilustración.',
    logo: <DiagramIcon className="w-10 h-10" />,
    website: '#',
  },
];


const Apps: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-3xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-black">Aplicaciones</h1>
        <p className="text-lg text-gray-500 mt-2">Todo lo que necesitas para alcanzar el éxito</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {apps.map((app, index) => (
           <div key={app.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 100}ms`, opacity: 0 }}>
             <AppCard app={app} />
           </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;