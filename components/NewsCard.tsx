
import React from 'react';
import type { NewsArticle } from '../types';
import { ArrowRightIcon } from './Icons';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2 group">
      <div className="overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 flex-grow">{article.title}</h3>
        <p className="text-gray-500 text-lg mb-6">{article.description}</p>
        
        <div className="border-t border-gray-200 pt-6 flex justify-between items-center text-lg">
          <p className="text-gray-600">por <span className="font-bold text-black">{article.author}</span></p>
           <a href="#" className="text-black hover:text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="w-7 h-7" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;