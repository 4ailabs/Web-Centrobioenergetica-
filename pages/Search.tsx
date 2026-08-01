import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from '../components/Icons';

interface SearchProps {
  onSearch: (query: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, onClose, isOpen }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Foco al abrir, Escape a nivel de documento, y devolución de foco al cerrar
  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  // Focus trap simple: el diálogo solo tiene input y botón de cerrar
  const handleTrapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const container = e.currentTarget as HTMLElement;
    const focusables = container.querySelectorAll<HTMLElement>('input, button');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} aria-hidden="true" />

      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
        <div
          className="w-full max-w-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en el sitio"
          onKeyDown={handleTrapFocus}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="flex items-center px-5 py-4">
                <SearchIcon className="w-5 h-5 text-primary-600 mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  id="search-input"
                  type="text"
                  aria-label="Buscar cursos, servicios y contenido"
                  placeholder="¿Qué estás buscando?..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-base bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar búsqueda"
                  className="ml-3 p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <XIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
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
