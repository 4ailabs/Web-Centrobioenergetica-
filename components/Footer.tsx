import React from 'react';
import { YoutubeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-main)] border-t border-[var(--border-color)] mt-auto transition-colors pb-safe">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-6 lg:hidden">
          {/* Social Links - Mobile First */}
          <div className="flex flex-col items-center space-y-3">
            <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">Conectar</span>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {/* Social links removed */}
              <a href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-xl hover:border-primary-600/50 transition-all min-h-[44px]">
                <YoutubeIcon className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-medium">YouTube</span>
              </a>
            </div>
          </div>

          {/* Legal Links - Mobile */}
          <div className="flex flex-col items-center space-y-2 text-xs text-[var(--text-muted)]">
            <a href="#" className="hover:text-primary-600 transition-colors min-h-[44px] flex items-center">Política de Cookies</a>
            <a href="#" className="hover:text-primary-600 transition-colors min-h-[44px] flex items-center">Términos Legales</a>
            <a href="#" className="hover:text-primary-600 transition-colors min-h-[44px] flex items-center">Política de Privacidad</a>
          </div>

          {/* Copyright - Mobile */}
          <div className="text-xs text-[var(--text-muted)] text-center">
            © 2026 Instituto Centrobioenergetica
            <br />
            Todos los derechos reservados
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left Section - Legal Links */}
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 text-xs text-[var(--text-muted)]">
            <a href="#" className="hover:text-primary-600 transition-colors">Política de Cookies</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-600 transition-colors">Términos Legales</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-600 transition-colors">Política de Privacidad</a>
          </div>

          {/* Center Section - Copyright */}
          <div className="text-xs text-[var(--text-muted)] text-center">
            © 2026 Instituto Centrobioenergetica - Todos los derechos reservados
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)]">
            <span className="">Conectar:</span>

            <a href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center space-x-1">
              <YoutubeIcon className="w-3 h-3" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
