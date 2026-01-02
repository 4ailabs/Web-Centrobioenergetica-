
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
    <div className="bg-[var(--panel-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2 group h-full">
      <div className="relative overflow-hidden h-64">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-bold rounded-full shadow-sm">
            {article.category || 'General'}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-[var(--text-muted)] mb-3 font-medium uppercase tracking-wider">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>5 min de lectura</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-[var(--text-main)] group-hover:text-primary-600 transition-colors uppercase">{article.title}</h3>
        <p className="text-[var(--text-muted)] text-lg mb-6 line-clamp-3 leading-relaxed">{article.description}</p>

        <div className="mt-auto border-t border-[var(--border-color)] pt-6 flex justify-between items-center">
          <p className="text-sm text-[var(--text-muted)]">por <span className="font-bold text-[var(--text-main)]">{article.author}</span></p>
          <Link to="/noticias" className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center text-[var(--text-main)] hover:bg-primary-600 hover:text-white transition-all duration-300 group-hover:translate-x-1">
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;