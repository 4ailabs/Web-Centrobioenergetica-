import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardIcon, CoursesIcon, NewsIcon, AboutUsIcon, AppsIcon, ClinicalServicesIcon, WellkittIcon, HelpIcon, LogoIcon, MenuIcon, XIcon, SearchIcon, CalendarIcon, SunIcon, MoonIcon, YoutubeIcon } from './Icons';
import { LogIn, LogOut, Shield } from 'lucide-react';
import { useUIState, useAppDispatch } from '../contexts/AppContext';

import NavItem from './NavItem';
import UserProfile from './UserProfile';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  onSearch?: (query: string) => void;
  onOpenSearch?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, onSearch, onOpenSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useUIState();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const handleNavigation = (item: string, path: string) => {
    setActiveItem(item);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const { user, logout } = useAuth();

  const ThemeToggle = ({ mobile = false }) => (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${mobile ? 'w-full' : ''} text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800`}
    >
      <div className="transition-colors duration-200">
        {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </div>
      <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50 px-4 py-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-auto" />
            <span className="text-xs sm:text-sm font-display font-bold text-neutral-900 dark:text-white tracking-tight">Instituto</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 w-80 z-50 transition-transform duration-300 ease-out shadow-lg ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-20 flex flex-col h-full">
          <nav className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">Menú</h3>
              <div className="space-y-1">
                <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} mobile={true} />
                <NavItem icon={<CoursesIcon className="w-5 h-5" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} mobile={true} />
                <NavItem icon={<ClinicalServicesIcon className="w-5 h-5" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} mobile={true} />
                <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} mobile={true} />
                {/* <NavItem icon={<NewsIcon className="w-5 h-5" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} mobile={true} /> */}
                <NavItem icon={<AboutUsIcon className="w-5 h-5" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} mobile={true} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">Contenido</h3>
              <div className="space-y-1">
                <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} mobile={true} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">Personal</h3>
              <div className="space-y-1">
                {/* <NavItem icon={<AppsIcon className="w-5 h-5" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} mobile={true} /> */}
                <NavItem icon={<SearchIcon className="w-5 h-5" />} label="Buscar" active={false} onClick={() => onOpenSearch && onOpenSearch()} mobile={true} />
                <ThemeToggle mobile />
                {user ? (
                  <NavItem
                    icon={<LogOut className="w-5 h-5" />}
                    label="Cerrar Sesión"
                    active={false}
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    mobile
                  />
                ) : (
                  <NavItem
                    icon={<LogIn className="w-5 h-5" />}
                    label="Iniciar Sesión"
                    active={location.pathname === '/login'}
                    onClick={() => {
                      handleNavigation('Login', '/login');
                      setIsMobileMenuOpen(false);
                    }}
                    mobile
                  />
                )}
              </div>
            </div>
          </nav>

          <UserProfile user={user} mobile={true} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:sticky top-0 h-screen bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-6 flex-col w-64 shrink-0 relative overflow-hidden">

        <div className="flex items-center gap-3 mb-8">
          <LogoIcon className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-sm font-display font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">Instituto</span>
            <span className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400 tracking-tight">Centrobioenergética</span>
          </div>
        </div>

        <nav className="flex-grow space-y-4 pr-1 custom-scrollbar overflow-y-auto">
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">Menú</h3>
            <div className="space-y-1">
              <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} />
              <NavItem icon={<CoursesIcon className="w-5 h-5" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} />
              <NavItem icon={<ClinicalServicesIcon className="w-5 h-5" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} />
              <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} />
              {/* <NavItem icon={<NewsIcon className="w-5 h-5" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} /> */}
              <NavItem icon={<AboutUsIcon className="w-5 h-5" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h3 className="px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">Contenido</h3>
            <div className="space-y-1">
              <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h3 className="px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">Personal</h3>
            <div className="space-y-1">
              {user?.isAdmin && (
                <NavItem icon={<Shield className="w-5 h-5" />} label="Panel Admin" active={location.pathname === '/admin'} onClick={() => handleNavigation('Panel Admin', '/admin')} />
              )}
              {/* <NavItem icon={<AppsIcon className="w-5 h-5" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} /> */}
              <NavItem icon={<SearchIcon className="w-5 h-5" />} label="Buscar" active={false} onClick={() => onOpenSearch && onOpenSearch()} />
              <ThemeToggle />
              {user ? (
                <NavItem
                  icon={<LogOut className="w-5 h-5" />}
                  label="Cerrar Sesión"
                  active={false}
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                />
              ) : (
                <NavItem
                  icon={<LogIn className="w-5 h-5" />}
                  label="Iniciar Sesión"
                  active={location.pathname === '/login'}
                  onClick={() => handleNavigation('Login', '/login')}
                />
              )}
            </div>
          </div>
        </nav>

        <UserProfile user={user} />
      </aside>
    </>
  );
};

export default Sidebar;