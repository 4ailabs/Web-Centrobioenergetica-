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
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl">
              <div className="flex items-center px-6 py-4">
                <SearchIcon className="w-6 h-6 text-gray-400 mr-4" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XIcon className="w-5 h-5 text-gray-400" />
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
