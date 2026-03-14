import React from 'react';
import { YoutubeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-main)] border-t border-neutral-200 dark:border-neutral-800 shrink-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 lg:py-4">
        {/* Mobile Layout - compact single row */}
        <div className="flex lg:hidden items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>© 2026 Instituto Centrobioenergetica</span>
          <a
            href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary-600 transition-colors min-h-[44px]"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </a>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400">
            <a href="#" className="hover:text-primary-600 transition-colors">Política de Cookies</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-600 transition-colors">Términos Legales</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-600 transition-colors">Política de Privacidad</a>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            © 2026 Instituto Centrobioenergetica
          </div>

          <a
            href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-primary-600 transition-colors"
          >
            <YoutubeIcon className="w-3 h-3" />
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
