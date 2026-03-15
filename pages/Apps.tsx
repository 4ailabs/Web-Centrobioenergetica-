
import React from 'react';
import type { AppInfo } from '../types';
import AppCard from '../components/AppCard';
import { WellkittIcon } from '../components/Icons';

const apps: AppInfo[] = [
  {
    id: 1,
    name: 'Wellkitt',
    category: 'Herramienta de Bienestar',
    description: 'Plataforma integral de bienestar y salud holística. Accede a herramientas, recursos y seguimiento personalizado para tu transformación bioenergética.',
    logo: <WellkittIcon className="w-10 h-10" />,
    website: 'https://wellkitt.vercel.app',
  },
];


const Apps: React.FC = () => {
  return (
    <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 px-6">
      <header className="mb-8 lg:mb-12 max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">Aplicaciones</h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-3">Herramientas para tu desarrollo integral</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
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