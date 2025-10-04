
import React from 'react';
import { DashboardIcon, CoursesIcon, NewsIcon, AboutUsIcon, AppsIcon, HelpIcon, SearchIcon, LogoIcon } from './Icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center space-x-4 px-6 py-3 rounded-full text-lg transition-all duration-300 transform ${
        active
          ? 'bg-black text-white shadow-md'
          : 'text-gray-500 hover:bg-gray-200 hover:-translate-y-1'
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
    return (
        <aside className="w-80 bg-[#F7F8FA] p-8 flex flex-col space-y-12 animate-slide-in-left">
            <div className="flex items-start space-x-3">
                <LogoIcon className="h-8 w-8" />
                <span className="text-2xl font-bold leading-tight">Instituto<br />Centrobioenergetica</span>
            </div>

            <nav className="flex-grow">
                <div className="space-y-4">
                    <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">MENÚ</h3>
                    <div className="space-y-2">
                        <NavItem icon={<DashboardIcon className="w-6 h-6" />} label="Panel" active={activeItem === 'Panel'} onClick={() => setActiveItem('Panel')} />
                        <NavItem icon={<CoursesIcon className="w-6 h-6" />} label="Cursos" active={activeItem === 'Cursos'} onClick={() => setActiveItem('Cursos')} />
                        <NavItem icon={<NewsIcon className="w-6 h-6" />} label="Noticias" active={activeItem === 'Noticias'} onClick={() => setActiveItem('Noticias')} />
                        <NavItem icon={<AboutUsIcon className="w-6 h-6" />} label="Sobre Nosotros" active={activeItem === 'Sobre Nosotros'} onClick={() => setActiveItem('Sobre Nosotros')} />
                    </div>
                </div>

                <div className="mt-12 space-y-4">
                    <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">USUARIO</h3>
                     <div className="space-y-2">
                        <NavItem icon={<AppsIcon className="w-6 h-6" />} label="Aplicaciones" active={activeItem === 'Aplicaciones'} onClick={() => setActiveItem('Aplicaciones')} />
                        <NavItem icon={<HelpIcon className="w-6 h-6" />} label="Ayuda y Soporte" active={activeItem === 'Ayuda y Soporte'} onClick={() => setActiveItem('Ayuda y Soporte')} />
                    </div>
                </div>
            </nav>

            <div className="space-y-4">
                <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">BÚSQUEDA</h3>
                <div className="relative px-2">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full py-3 pl-4 pr-12 text-md bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5">
                       <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;