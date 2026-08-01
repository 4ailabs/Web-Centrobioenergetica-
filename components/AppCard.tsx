import React from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <a
      href={app.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors"
    >
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
        {app.logo}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors">{app.name}</h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-500 mb-1">{app.category}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">{app.description}</p>
      </div>
    </a>
  );
};

export default AppCard;
