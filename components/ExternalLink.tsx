import React from 'react';
import { openExternalLink } from '../utils/framerIntegration';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self';
  onClick?: () => void;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ 
  href, 
  children, 
  className = '', 
  target = '_blank',
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Llamar onClick local si existe
    onClick?.();
    
    // Abrir enlace externo
    openExternalLink(href, target);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
