import React, { useState, useEffect } from 'react';
import { SearchIcon, XIcon } from '../components/Icons';

interface SearchProps {
  onSearch: (query: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, onClose, isOpen }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      const input = document.getElementById('search-input');
      if (input) input.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="flex items-center px-5 py-4">
                <SearchIcon className="w-5 h-5 text-primary-600 mr-3 shrink-0" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="¿Qué estás buscando?..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && onClose()}
                  className="flex-1 text-base bg-transparent border-none outline-none text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-3 p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <XIcon className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
