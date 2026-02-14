
import React from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 flex flex-col h-full border border-neutral-200 dark:border-neutral-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-600">
          {app.logo}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{app.name}</h3>
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{app.category}</p>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-8 flex-grow leading-relaxed">{app.description}</p>
      <div className="mt-auto">
        <a href={app.website} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all active:scale-95 shadow-md hover:shadow-lg">
          Acceder
        </a>
      </div>
    </div>
  );
};

export default AppCard;