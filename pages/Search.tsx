import React, { useState } from 'react';
import { SearchIcon } from '../components/Icons';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <SearchIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-black">Buscar</h1>
        </div>
        <p className="text-base lg:text-lg text-gray-500">
          Encuentra cursos, servicios, productos y noticias
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cursos, servicios, productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sugerencias de búsqueda</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Biomagnetismo',
                'Flores de Bach',
                'Auriculoterapia',
                'Terapia de muñecos',
                'Sandplay',
                'Conflictos biológicos',
                'Par biomagnético',
                'Vitaminas y minerales'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    onSearch(suggestion);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías populares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Cursos', count: '15 cursos disponibles' },
                { name: 'Servicios Clínicos', count: '6 terapias especializadas' },
                { name: 'Productos Wellkitt', count: '6 productos únicos' },
                { name: 'Noticias', count: '4 artículos recientes' }
              ].map((category) => (
                <div
                  key={category.name}
                  className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => {
                    setQuery(category.name);
                    onSearch(category.name);
                  }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
