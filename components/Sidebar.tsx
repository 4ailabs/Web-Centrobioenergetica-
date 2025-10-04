import React, { useState } from 'react';
import { DashboardIcon, CoursesIcon, NewsIcon, AboutUsIcon, AppsIcon, HelpIcon, LogoIcon, MenuIcon, XIcon } from './Icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, mobile = false }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center space-x-4 px-6 py-3 rounded-full text-sm lg:text-base transition-all duration-300 transform ${
        active
          ? 'bg-black text-white shadow-md'
          : 'text-gray-500 hover:bg-gray-200 hover:-translate-y-1'
      } ${mobile ? 'mobile-nav-item' : ''}`}
    >
      <div className={active ? 'text-green-500' : ''}>
        {icon}
      </div>
      <span>{label}</span>
    </a>
  );
};

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigation = (item: string) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Instituto</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-[#F7F8FA] w-80 z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 pt-20 flex flex-col space-y-12 h-full">
          <div className="flex items-center space-x-3 pb-4">
            <LogoIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Instituto Centrobioenergetica</span>
          </div>

          <nav className="flex-grow">
            <div className="space-y-4">
              <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">MENÚ</h3>
              <div className="space-y-2">
                <NavItem icon={<DashboardIcon className="w-6 h-6" />} label="Panel" active={activeItem === 'Panel'} onClick={() => handleMobileNavigation('Panel')} mobile={true} />
                <NavItem icon={<CoursesIcon className="w-6 h-6" />} label="Cursos" active={activeItem === 'Cursos'} onClick={() => handleMobileNavigation('Cursos')} mobile={true} />
                <NavItem icon={<NewsIcon className="w-6 h-6" />} label="Noticias" active={activeItem === 'Noticias'} onClick={() => handleMobileNavigation('Noticias')} mobile={true} />
                <NavItem icon={<AboutUsIcon className="w-6 h-6" />} label="Sobre Nosotros" active={activeItem === 'Sobre Nosotros'} onClick={() => handleMobileNavigation('Sobre Nosotros')} mobile={true} />
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">USUARIO</h3>
              <div className="space-y-2">
                <NavItem icon={<AppsIcon className="w-6 h-6" />} label="Aplicaciones" active={activeItem === 'Aplicaciones'} onClick={() => handleMobileNavigation('Aplicaciones')} mobile={true} />
                <NavItem icon={<HelpIcon className="w-6 h-6" />} label="Ayuda y Soporte" active={activeItem === 'Ayuda y Soporte'} onClick={() => handleMobileNavigation('Ayuda y Soporte')} mobile={true} />
              </div>
            </div>
          </nav>

        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:relative top-0 left-0 h-full bg-[#F7F8FA] p-8 flex flex-col space-y-12">
        <div className="flex items-start space-x-3">
          <LogoIcon className="h-6 w-6" />
          <span className="text-lg font-bold leading-tight">Instituto<br />Centrobioenergetica</span>
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

      </aside>
    </>
  );
};

export default Sidebar;