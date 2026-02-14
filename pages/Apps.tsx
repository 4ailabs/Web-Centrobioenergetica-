
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
    <div className="w-full lg:mt-20 mt-16 px-4">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-2xl lg:text-4xl font-black text-[var(--text-main)] uppercase tracking-tight">Aplicaciones</h1>
        <p className="text-base lg:text-lg text-[var(--text-muted)] mt-2">Todo lo que necesitas para alcanzar el éxito</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-10">
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