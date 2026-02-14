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
      className={`group flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${mobile ? 'w-full' : ''} text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 font-medium`}
    >
      <div className="relative z-10 transition-colors duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">
        {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </div>
      <span className="relative z-10 text-[13px] tracking-wide">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 z-50 px-4 py-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-auto" />
            <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-white">Instituto Centrobioenergética</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-transparent border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6 text-zinc-800 dark:text-white" /> : <MenuIcon className="w-6 h-6 text-zinc-800 dark:text-white" />}
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
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 w-80 z-50 transition-transform duration-300 ease-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-20 flex flex-col h-full bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/20">
          <nav className="flex-grow overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            <div className="space-y-3">
              <h3 className="px-4 text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide opacity-50">Menú Principal</h3>
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
              <h3 className="px-4 text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide opacity-50">Contenido</h3>
              <div className="space-y-1">
                <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} mobile={true} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="px-4 text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide opacity-50">Personal</h3>
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
      <aside className="hidden lg:flex lg:sticky top-0 h-screen bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-r border-zinc-200/50 dark:border-zinc-800/50 p-6 flex-col w-64 shrink-0 relative overflow-hidden">
        {/* Premium gradient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-emerald-500/10 to-transparent pointer-events-none rounded-full blur-3xl" />

        <div className="flex items-center space-x-3 mb-8 pl-1 relative z-10">
          <LogoIcon className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">Instituto</span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Centrobioenergética</span>
          </div>
        </div>

        <nav className="flex-grow space-y-6 pr-1 custom-scrollbar relative z-10 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="px-3 text-[7px] font-normal text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none flex items-center gap-2 opacity-30">
              <span className="w-4 h-px bg-gradient-to-r from-emerald-500/20 to-transparent"></span>
              MENÚ
            </h3>
            <div className="space-y-1">
              <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} />
              <NavItem icon={<CoursesIcon className="w-5 h-5" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} />
              <NavItem icon={<ClinicalServicesIcon className="w-5 h-5" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} />
              <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} />
              {/* <NavItem icon={<NewsIcon className="w-5 h-5" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} /> */}
              <NavItem icon={<AboutUsIcon className="w-5 h-5" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="px-3 text-[7px] font-normal text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none flex items-center gap-2 opacity-30">
              <span className="w-4 h-px bg-gradient-to-r from-teal-500/20 to-transparent"></span>
              CONTENIDO
            </h3>
            <div className="space-y-1">
              <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="px-3 text-[7px] font-normal text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none flex items-center gap-2 opacity-30">
              <span className="w-4 h-px bg-gradient-to-r from-cyan-500/20 to-transparent"></span>
              PERSONAL
            </h3>
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