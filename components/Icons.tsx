import React from 'react';
import { 
  Layout, 
  BookOpen, 
  FileText, 
  Users, 
  Grid3X3, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Menu, 
  X,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

interface IconProps {
  className?: string;
}

// Iconos principales - lo más parecidos a los originales
export const DashboardIcon: React.FC<IconProps> = ({ className }) => (
  <Layout className={className} />
);

export const CoursesIcon: React.FC<IconProps> = ({ className }) => (
  <BookOpen className={className} />
);

export const NewsIcon: React.FC<IconProps> = ({ className }) => (
  <FileText className={className} />
);

export const AboutUsIcon: React.FC<IconProps> = ({ className }) => (
  <Users className={className} />
);

export const AppsIcon: React.FC<IconProps> = ({ className }) => (
  <Grid3X3 className={className} />
);

export const HelpIcon: React.FC<IconProps> = ({ className }) => (
  <HelpCircle className={className} />
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <Search className={className} />
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
  <ArrowRight className={className} />
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <Menu className={className} />
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <X className={className} />
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <Mail className={className} />
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <Phone className={className} />
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <Instagram className={className} />
);

export const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
  <Linkedin className={className} />
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <Twitter className={className} />
);

// Logo personalizado para el Instituto Centrobioenergetica
export const LogoIcon: React.FC<IconProps> = ({ className }) => (
  <img 
    src="https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/4fc95aaa-7c07-4d87-b0f7-70d1a13dbb63/LOGO+new.png?format=300w" 
    alt="Instituto Centrobioenergetica Logo" 
    className={`${className} object-contain`}
    style={{ aspectRatio: 'auto' }}
  />
);

// Iconos para aplicaciones - manteniendo los originales
export const FramerIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18V12H6V18H12ZM18 12H6V6H18L12 12H18Z" fill="#0055FF"></path>
  </svg>
);

export const NotionIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6H16V18H14V6ZM8 6H12.5L12.5 7.5H9.5V11.5H12V13H9.5V18H8V6Z" fill="#000000"></path>
  </svg>
);

export const LemonSqueezyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z" fill="#FFC107"></path>
    <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6Z" fill="#FFEB3B"></path>
  </svg>
);

export const GumroadIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="#FF9800"></path>
  </svg>
);

export const AsanaIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="12" r="3" fill="#FB4C4C"></circle>
    <circle cx="16" cy="8" r="3" fill="#FB4C4C"></circle>
    <circle cx="16" cy="16" r="3" fill="#FB4C4C"></circle>
  </svg>
);

export const DiagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3V21H19V3H5ZM7 5H17V19H7V5Z" fill="#2196F3"></path>
    <rect x="9" y="7" width="6" height="2" fill="#2196F3"></rect>
    <rect x="9" y="11" width="6" height="2" fill="#2196F3"></rect>
    <rect x="9" y="15" width="6" height="2" fill="#2196F3"></rect>
  </svg>
);