import React from 'react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Reciente';

  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-3 aspect-[4/3]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
        {article.description}
      </p>
      <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{article.category || 'General'}</span>
      </div>
    </div>
  );
};

export default NewsCard;
