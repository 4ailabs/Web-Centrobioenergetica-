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
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <SearchIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-black">Resultados de Búsqueda</h1>
            <p className="text-base lg:text-lg text-gray-500">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''} para "{query}"
            </p>
          </div>
        </div>
      </header>

      {totalResults === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500 mb-6">
            Intenta con otros términos de búsqueda o explora nuestras categorías
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">cursos</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">terapias</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">biomagnetismo</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">flores de bach</span>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Cursos */}
          {results.courses.length > 0 && (
            <section>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Cursos ({results.courses.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                {results.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}

          {/* Servicios Clínicos */}
          {results.services.length > 0 && (
            <section>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Servicios Clínicos ({results.services.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                {results.services.map((service, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Duración: {service.duration}</span>
                      <span className="font-medium text-green-600">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Productos Wellkitt */}
          {results.products.length > 0 && (
            <section>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Productos ({results.products.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {results.products.map((product, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{product.price}</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Noticias */}
          {results.news.length > 0 && (
            <section>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Noticias ({results.news.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                {results.news.map((article, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                    <div className="text-xs text-gray-500">
                      Por {article.author}
                    </div>
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
