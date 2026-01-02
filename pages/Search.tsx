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
      // Auto-focus cuando se abre
      const input = document.getElementById('search-input');
      if (input) {
        input.focus();
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-[var(--panel-bg)] rounded-3xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
              <div className="flex items-center px-6 py-5">
                <SearchIcon className="w-6 h-6 text-primary-600 mr-4" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="¿Qué estás buscando?..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-lg bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 p-2 hover:bg-[var(--bg-main)] rounded-full transition-colors group"
                >
                  <XIcon className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-main)]" />
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
