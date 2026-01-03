import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardIcon, CoursesIcon, NewsIcon, AboutUsIcon, AppsIcon, ClinicalServicesIcon, WellkittIcon, HelpIcon, LogoIcon, MenuIcon, XIcon, SearchIcon, CalendarIcon, SunIcon, MoonIcon, YoutubeIcon } from './Icons';
import { LogIn, LogOut, Shield } from 'lucide-react';
import { useUIState, useAppDispatch } from '../contexts/AppContext';

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
      className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${active
        ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold shadow-lg shadow-emerald-500/25'
        : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 font-medium'
        } ${mobile ? 'mobile-nav-item' : ''}`}
    >
      <div className={`relative z-10 transition-all duration-200 ${active ? 'text-white' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
        {icon}
      </div>
      <span className="relative z-10 text-[13px] tracking-wide">{label}</span>

      {/* Hover glow effect */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/5 group-hover:to-teal-600/5 rounded-xl transition-all duration-300" />
      )}
    </a>
  );
};

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
  const xp = user?.totalXP || 0;
  const level = Math.floor(xp / 500) + 1;
  const nextLevelXP = level * 500;
  const currentLevelXP = (level - 1) * 500;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const UserProfile = ({ mobile = false }) => (user ? (
    <div className={`mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-800/30 ${mobile ? 'px-6' : ''}`}>
      <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100/50 dark:border-emerald-800/20 group hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
        <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
          {user.name?.[0] || user.email[0].toUpperCase()}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 tracking-tight line-clamp-1">{user.name || 'Usuario'}</span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Nivel {level}</span>
        </div>
      </div>

      <div className="space-y-2 px-1">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Energía {xp} XP</span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  ) : null);

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
              <h3 className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">MENÚ PRINCIPAL</h3>
              <div className="space-y-1">
                <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} mobile={true} />
                <NavItem icon={<CoursesIcon className="w-5 h-5" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} mobile={true} />
                <NavItem icon={<ClinicalServicesIcon className="w-5 h-5" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} mobile={true} />
                <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} mobile={true} />
                <NavItem icon={<NewsIcon className="w-5 h-5" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} mobile={true} />
                <NavItem icon={<AboutUsIcon className="w-5 h-5" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} mobile={true} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">CONTENIDO</h3>
              <div className="space-y-1">
                <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} mobile={true} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">PERSONAL</h3>
              <div className="space-y-1">
                <NavItem icon={<AppsIcon className="w-5 h-5" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} mobile={true} />
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

          <UserProfile mobile={true} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:sticky top-0 h-screen bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-r border-zinc-200/50 dark:border-zinc-800/50 p-6 flex-col w-72 shrink-0 relative overflow-hidden">
        {/* Premium gradient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-emerald-500/10 to-transparent pointer-events-none rounded-full blur-3xl" />

        <div className="flex items-center space-x-3 mb-8 pl-1 relative z-10">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
            <LogoIcon className="h-7 w-auto text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">Instituto</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Centrobioenergética</span>
          </div>
        </div>

        <nav className="flex-grow space-y-6 pr-1 custom-scrollbar relative z-10 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest select-none flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></span>
              MENÚ
            </h3>
            <div className="space-y-1">
              <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} />
              <NavItem icon={<CoursesIcon className="w-5 h-5" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} />
              <NavItem icon={<ClinicalServicesIcon className="w-5 h-5" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} />
              <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} />
              <NavItem icon={<NewsIcon className="w-5 h-5" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} />
              <NavItem icon={<AboutUsIcon className="w-5 h-5" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest select-none flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-teal-500/50 to-transparent"></span>
              CONTENIDO
            </h3>
            <div className="space-y-1">
              <NavItem icon={<YoutubeIcon className="w-5 h-5" />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest select-none flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></span>
              PERSONAL
            </h3>
            <div className="space-y-1">
              {user?.isAdmin && (
                <NavItem icon={<Shield className="w-5 h-5" />} label="Panel Admin" active={location.pathname === '/admin'} onClick={() => handleNavigation('Panel Admin', '/admin')} />
              )}
              <NavItem icon={<AppsIcon className="w-5 h-5" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} />
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

        <UserProfile />
      </aside>
    </>
  );
};

export default Sidebar;