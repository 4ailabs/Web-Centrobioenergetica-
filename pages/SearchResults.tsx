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
    <div className="w-full bg-[var(--panel-bg)] p-4 lg:p-8 rounded-[2.5rem] lg:mt-20 mt-16 border border-[var(--border-color)] shadow-sm">
      <header className="mb-8 lg:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center mr-5 border border-primary-600/20">
            <SearchIcon className="w-7 h-7 text-primary-600" />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-black text-[var(--text-main)] uppercase tracking-tight">Resultados de Búsqueda</h1>
            <p className="text-base lg:text-lg text-[var(--text-muted)] font-medium">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''} para <span className="text-primary-600">"{query}"</span>
            </p>
          </div>
        </div>
      </header>

      {totalResults === 0 ? (
        <div className="text-center py-20 bg-[var(--bg-main)] rounded-3xl border border-[var(--border-color)] border-dashed">
          <div className="w-24 h-24 bg-[var(--panel-bg)] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-[var(--border-color)]">
            <SearchIcon className="w-12 h-12 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-xl font-black text-[var(--text-main)] mb-3 uppercase">No se encontraron resultados</h3>
          <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
            Intenta con otros términos de búsqueda o explora nuestras categorías populares a continuación.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['cursos', 'terapias', 'biomagnetismo', 'flores de bach'].map(tag => (
              <span key={tag} className="px-5 py-2 bg-[var(--panel-bg)] text-[var(--text-muted)] rounded-xl text-xs font-bold uppercase tracking-widest border border-[var(--border-color)] hover:border-primary-600 hover:text-primary-600 cursor-pointer transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Cursos */}
          {results.courses.length > 0 && (
            <section>
              <h2 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                <span className="w-8 h-px bg-primary-600/20"></span>
                Cursos ({results.courses.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-6 lg:gap-6">
                {results.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}

          {/* Servicios Clínicos */}
          {results.services.length > 0 && (
            <section>
              <h2 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                <span className="w-8 h-px bg-primary-600/20"></span>
                Servicios Clínicos ({results.services.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-6 lg:gap-6">
                {results.services.map((service, index) => (
                  <div key={index} className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl p-6 hover:shadow-xl transition-all group">
                    <h3 className="text-xl font-black text-[var(--text-main)] mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{service.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                      <span className="text-[var(--text-muted)]">Duración: {service.duration}</span>
                      <span className="text-primary-600 bg-primary-600/10 px-3 py-1 rounded-full">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Productos Wellkitt */}
          {results.products.length > 0 && (
            <section>
              <h2 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                <span className="w-8 h-px bg-primary-600/20"></span>
                Productos ({results.products.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-6">
                {results.products.map((product, index) => (
                  <div key={index} className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl p-6 hover:shadow-xl transition-all group">
                    <h3 className="text-xl font-black text-[var(--text-main)] mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{product.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg font-black text-primary-600">{product.price}</span>
                      <span className="text-[10px] font-bold bg-[var(--panel-bg)] text-[var(--text-muted)] px-3 py-1 rounded-full uppercase tracking-widest border border-[var(--border-color)]">
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
              <h2 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                <span className="w-8 h-px bg-primary-600/20"></span>
                Noticias ({results.news.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-6 lg:gap-6">
                {results.news.map((article, index) => (
                  <div key={index} className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl p-6 hover:shadow-xl transition-all group">
                    <h3 className="text-xl font-black text-[var(--text-main)] mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{article.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed line-clamp-2">{article.description}</p>
                    <div className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                      Contenido de bienestar
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
