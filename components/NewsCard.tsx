import React from 'react';
import type { NewsArticle } from '../types';
import { ArrowRightIcon } from './Icons';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Reciente';

  return (
    <div className="bg-white dark:bg-neutral-800 rounded overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col group h-full">
      <div className="relative overflow-hidden h-56">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-primary-600 text-white text-xs font-medium rounded">
            {article.category || 'General'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-normal">
          <span>{formattedDate}</span>
          <span className="mx-2 opacity-40">·</span>
          <span>5 min lectura</span>
        </div>

        <h3 className="font-display text-xl font-bold mb-3 line-clamp-2 text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-6 line-clamp-3 leading-relaxed font-normal">
          {article.description}
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Bienestar práctico
          </span>
          <div className="w-9 h-9 bg-neutral-100 dark:bg-neutral-700 group-hover:bg-primary-600 rounded flex items-center justify-center transition-all duration-200">
            <ArrowRightIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-300 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
