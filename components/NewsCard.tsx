
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="bg-[var(--panel-bg)] rounded-[2.5rem] overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 dark:hover:shadow-primary-600/10 transition-all duration-500 flex flex-col hover:-translate-y-2 group h-full hover:border-primary-500/20">
      <div className="relative overflow-hidden h-64 lg:h-72">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-primary-600/90 backdrop-blur-md text-white text-[10px] font-black rounded-full shadow-lg uppercase tracking-widest">
            {article.category || 'General'}
          </span>
        </div>
      </div>
      <div className="p-8 lg:p-10 flex flex-col flex-grow">
        <div className="flex items-center text-[10px] text-[var(--text-muted)] mb-5 font-black uppercase tracking-[0.2em]">
          <span>{formattedDate}</span>
          <span className="mx-3 opacity-30">•</span>
          <span>5 min lectura</span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-black mb-4 line-clamp-2 text-[var(--text-main)] group-hover:text-primary-600 transition-colors uppercase leading-[1.1] tracking-tight">{article.title}</h3>
        <p className="text-[var(--text-muted)] text-base mb-8 line-clamp-3 leading-relaxed font-medium">{article.description}</p>

        <div className="mt-auto pt-6 border-t border-[var(--border-color)]/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600/10 rounded-full flex items-center justify-center text-primary-600 font-black text-[10px]">
              {article.author[0]}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">por <span className="font-black text-[var(--text-main)]">{article.author}</span></p>
          </div>
          <div className="flex items-center gap-2 text-primary-600 group-hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Leer más</span>
            <div className="w-10 h-10 rounded-2xl bg-primary-600/5 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;