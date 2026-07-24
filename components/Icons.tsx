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
  ArrowLeft,
  Menu,
  X,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  Filter,
  Calendar,
  Sun,
  Moon,
  Youtube
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

export const ClinicalServicesIcon: React.FC<IconProps> = ({ className }) => (
  <Stethoscope className={className} />
);

export const WellkittIcon: React.FC<IconProps> = ({ className }) => (
  <ShoppingBag className={className} />
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

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <ArrowLeft className={className} />
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

export const YoutubeIcon: React.FC<IconProps> = ({ className }) => (
  <Youtube className={className} />
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

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <Sparkles className={className} />
);

export const FilterIcon: React.FC<IconProps> = ({ className }) => (
  <Filter className={className} />
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <Calendar className={className} />
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
  <Sun className={className} />
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
  <Moon className={className} />
);
export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
