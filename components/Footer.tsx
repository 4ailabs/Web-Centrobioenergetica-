import React from 'react';
import { MailIcon, PhoneIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-main)] border-t border-[var(--border-color)] mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
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
            © Instituto Centrobioenergetica - Todos los derechos reservados
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)]">
            <span className="">Conectar:</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center space-x-1">
              <InstagramIcon className="w-3 h-3" />
              <span>Instagram</span>
            </a>
            <span className="opacity-30">|</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center space-x-1">
              <LinkedinIcon className="w-3 h-3" />
              <span>LinkedIn</span>
            </a>
            <span className="opacity-30">|</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center space-x-1">
              <TwitterIcon className="w-3 h-3" />
              <span>Twitter</span>
            </a>
            <span className="opacity-30">|</span>
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
