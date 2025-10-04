import React from 'react';
import { MailIcon, PhoneIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F8FA] border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left Section - Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-xs text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Política de Cookies</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black transition-colors">Términos Legales</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black transition-colors">Política de Privacidad</a>
          </div>

          {/* Center Section - Copyright */}
          <div className="text-xs text-gray-600 text-center">
            © Instituto Centrobioenergetica - Todos los derechos reservados
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span className="text-gray-600">Conectar:</span>
            <a href="#" className="hover:text-black transition-colors flex items-center space-x-1">
              <InstagramIcon className="w-3 h-3" />
              <span>Instagram</span>
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black transition-colors flex items-center space-x-1">
              <LinkedinIcon className="w-3 h-3" />
              <span>LinkedIn</span>
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black transition-colors flex items-center space-x-1">
              <TwitterIcon className="w-3 h-3" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
