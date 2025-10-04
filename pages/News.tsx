
import React from 'react';
import type { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';

const articles: NewsArticle[] = [
  {
    id: 1,
    title: 'El Poder de la Respiración Consciente en el Día a Día',
    description: 'Nuevos estudios revelan cómo la respiración puede impactar positivamente tu salud física y mental.',
    author: 'Henry Carter',
    imageUrl: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Revolución del Bienestar en la Educación para Adultos',
    description: 'Plataformas pioneras de e-learning ofrecen extensos programas de formación en bienestar.',
    author: 'Elisabeth Brooks',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Aplicaciones Innovadoras para el Crecimiento Personal',
    description: 'Una plataforma particular utiliza inteligencia artificial para guiarte en tu desarrollo personal.',
    author: 'Steve Mills',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'Tendencias en Bienestar y E-Learning para 2024',
    description: 'El aprendizaje en línea continúa evolucionando, con tendencias de bienestar actualizadas para 2024.',
    author: 'Jessica Hayes',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const News: React.FC = () => {
  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-2xl lg:text-4xl font-bold text-black">Noticias</h1>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-10">
        {articles.map((article, index) => (
          <div key={article.id} className="animate-slide-in-up" style={{ animationDelay: `${100 + index * 150}ms`, opacity: 0 }}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;