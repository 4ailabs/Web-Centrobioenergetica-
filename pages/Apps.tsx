
import React from 'react';
import type { AppInfo } from '../types';
import AppCard from '../components/AppCard';
import { WellkittIcon } from '../components/Icons';
import { Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { URL_TABLERO, tieneAccesoAlTablero } from '../data/catalog';

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

// El tablero va aparte porque no es de acceso libre: solo lo ve quien lo tiene
// concedido. Enseñárselo al resto sería ofrecer una puerta que se cierra al
// empujarla.
const tablero: AppInfo = {
  id: 2,
  name: 'Los Cuatro Caminos',
  category: 'Tablero de trabajo',
  description: 'Hoja a escala real para colocar figuras, caminos y relaciones. Guarda y carga escenas; sirve igual para la sesión clínica que para la clase.',
  logo: <Compass className="w-10 h-10" />,
  website: URL_TABLERO,
};

const Apps: React.FC = () => {
  const { user } = useAuth();
  const visibles = tieneAccesoAlTablero(Boolean(user?.isAdmin), user?.enrolledCourses)
    ? [tablero, ...apps]
    : apps;

  return (
    <div className="w-full lg:pt-12 pt-[72px] sm:pt-8 px-6">
      <header className="mb-8 lg:mb-12 max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">Aplicaciones</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-3">Herramientas para tu desarrollo integral</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {visibles.map((app, index) => (
          <div key={app.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 100}ms`, opacity: 0 }}>
            <AppCard app={app} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;