
import React from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-gray-50 rounded-3xl p-8 flex flex-col h-full hover:bg-gray-100 transition-colors duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-white p-2 rounded-lg shadow-sm">
            {app.logo}
        </div>
        <div>
            <h3 className="text-xl font-bold">{app.name}</h3>
            <p className="text-gray-500">{app.category}</p>
        </div>
      </div>
      <p className="text-gray-600 text-base mb-6 flex-grow">{app.description}</p>
      <div className="mt-auto">
        <a href={app.website} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-3 px-6 bg-white border border-gray-200 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          SITIO WEB
        </a>
      </div>
    </div>
  );
};

export default AppCard;