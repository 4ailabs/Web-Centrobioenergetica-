import React from 'react';
import { useSearchResults } from '../contexts/AppContext';
import CourseCard from '../components/CourseCard';
import { SearchIcon } from '../components/Icons';

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const results = useSearchResults();
  const totalResults = results.courses.length + results.services.length + results.products.length + results.news.length;

  return (
    <div className="w-full px-6 py-12 lg:py-20 max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center">
            <SearchIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Resultados de Búsqueda</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''} para <span className="text-primary-600">"{query}"</span>
            </p>
          </div>
        </div>
      </header>

      {totalResults === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <SearchIcon className="w-10 h-10 text-neutral-600 dark:text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">No se encontraron resultados</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-md mx-auto">
            Intenta con otros términos de búsqueda.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {results.courses.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-primary-600 mb-4">Cursos ({results.courses.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.courses.map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            </section>
          )}

          {results.services.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-primary-600 mb-4">Servicios Clínicos ({results.services.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {results.services.map((service, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
                    <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-center text-xs text-neutral-600 dark:text-neutral-400">
                      <span>{service.duration}</span>
                      <span className="text-primary-600 font-medium">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.products.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-primary-600 mb-4">Productos ({results.products.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.products.map((product, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
                    <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-primary-600">{product.price}</span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">{product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {results.news.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-primary-600 mb-4">Noticias ({results.news.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {results.news.map((article, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
                    <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{article.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
