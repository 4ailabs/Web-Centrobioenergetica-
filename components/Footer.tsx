import React from 'react';
import { Link } from 'react-router-dom';
import { YoutubeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shrink-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 lg:py-4">
        {/* Mobile Layout - compact single row.
            Los enlaces legales tienen que estar aquí también: antes solo
            existían en escritorio, y desde el móvil no había forma de
            llegar al aviso de privacidad. */}
        <div className="flex lg:hidden flex-col gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <Link to="/aviso-de-privacidad" className="hover:text-primary-600 transition-colors">
              Aviso de privacidad
            </Link>
            <span className="opacity-30">|</span>
            <Link to="/terminos-y-condiciones" className="hover:text-primary-600 transition-colors">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span>© 2026 Instituto Centrobioenergética</span>
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
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs text-neutral-600 dark:text-neutral-400">
            {/* Antes eran tres enlaces a href="#": no llevaban a ninguna parte.
                La página de cookies desapareció a propósito — el sitio no usa
                cookies, y lo que sí guarda en el navegador se explica dentro
                del aviso de privacidad. */}
            <Link to="/aviso-de-privacidad" className="hover:text-primary-600 transition-colors">
              Aviso de privacidad
            </Link>
            <span className="opacity-30">|</span>
            <Link to="/terminos-y-condiciones" className="hover:text-primary-600 transition-colors">
              Términos y condiciones
            </Link>
          </div>

          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            © 2026 Instituto Centrobioenergética
          </div>

          <a
            href="https://youtube.com/@wellvibe-media?si=_Af33Bp7qJ08vz2u"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
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
