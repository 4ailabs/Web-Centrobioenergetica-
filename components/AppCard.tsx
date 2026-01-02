
import React from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-[var(--panel-bg)] rounded-3xl p-8 flex flex-col h-full hover:bg-primary-500/5 transition-all duration-300 border border-[var(--border-color)] hover:border-primary-500/50 group">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-[var(--bg-main)] p-2 rounded-lg shadow-sm border border-[var(--border-color)]">
          {app.logo}
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-primary-600 transition-colors uppercase">{app.name}</h3>
          <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest">{app.category}</p>
        </div>
      </div>
      <p className="text-[var(--text-muted)] text-base mb-6 flex-grow leading-relaxed">{app.description}</p>
      <div className="mt-auto">
        <a href={app.website} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-4 px-6 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl font-bold hover:bg-primary-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-900/5">
          SITIO WEB
        </a>
      </div>
    </div>
  );
};

export default AppCard;