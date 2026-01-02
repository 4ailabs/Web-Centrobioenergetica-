import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardIcon, CoursesIcon, NewsIcon, AboutUsIcon, AppsIcon, ClinicalServicesIcon, WellkittIcon, HelpIcon, LogoIcon, MenuIcon, XIcon, SearchIcon, CalendarIcon, SunIcon, MoonIcon } from './Icons';
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
      className={`flex items-center space-x-4 px-6 py-3 rounded-full text-sm lg:text-base transition-all duration-300 transform ${active
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
        : 'text-[var(--text-muted)] hover:bg-[var(--text-main)]/5 shadow-sm hover:shadow-xl hover:-translate-y-1'
        } ${mobile ? 'mobile-nav-item' : ''}`}
    >
      <div className={active ? 'text-white' : 'text-primary-600'}>
        {icon}
      </div>
      <span>{label}</span>
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

  const { user } = useAuth();
  const xp = user?.totalXP || 0;
  const level = Math.floor(xp / 500) + 1;
  const nextLevelXP = level * 500;
  const currentLevelXP = (level - 1) * 500;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const UserProfile = ({ mobile = false }) => (user ? (
    <div className={`mt-auto pt-8 border-t border-[var(--border-color)] ${mobile ? 'px-6' : ''}`}>
      <div className="flex items-center space-x-3 mb-6 p-2 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-600/20">
          {user.name?.[0] || user.email[0].toUpperCase()}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-black text-[var(--text-main)] uppercase tracking-tight line-clamp-1">{user.name || 'Usuario'}</span>
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Nivel {level}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Energía {xp} XP</span>
          <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--bg-main)] rounded-full overflow-hidden shadow-inner border border-[var(--border-color)]">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  ) : null);

  const ThemeToggle = ({ mobile = false }) => (
    <button
      onClick={toggleTheme}
      className={`flex items-center space-x-4 px-6 py-3 rounded-full text-sm lg:text-base transition-all duration-300 transform bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-primary-600 hover:shadow-xl ${mobile ? 'w-full' : ''}`}
    >
      <div className="text-primary-600">
        {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </div>
      <span className="font-black uppercase tracking-widest text-[10px]">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--bg-main)] border-b border-[var(--border-color)] z-50 p-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-auto" />
            <span className="text-xs sm:text-sm font-bold">Instituto Centrobioenergética</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-primary-600 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-6 h-6 text-primary-600" /> : <MenuIcon className="w-6 h-6 text-[var(--text-muted)]" />}
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
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-[var(--bg-main)] border-r border-[var(--border-color)] w-80 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-8 pt-20 flex flex-col h-full">
          <div className="flex items-center space-x-3 pb-8">
            <LogoIcon className="h-8 w-auto" />
            <span className="text-xs sm:text-sm font-bold">Instituto Centrobioenergética</span>
          </div>

          <nav className="flex-grow overflow-y-auto space-y-12">
            <div className="space-y-4">
              <h3 className="px-6 text-xs font-black text-primary-600 uppercase tracking-widest opacity-50">MENÚ</h3>
              <div className="space-y-2">
                <NavItem icon={<DashboardIcon className="w-6 h-6" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} mobile={true} />
                <NavItem icon={<CoursesIcon className="w-6 h-6" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} mobile={true} />
                <NavItem icon={<ClinicalServicesIcon className="w-6 h-6" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} mobile={true} />
                <NavItem icon={<CalendarIcon className="w-6 h-6" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} mobile={true} />
                <NavItem icon={<NewsIcon className="w-6 h-6" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} mobile={true} />
                <NavItem icon={<AboutUsIcon className="w-6 h-6" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} mobile={true} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="px-6 text-xs font-black text-primary-600 uppercase tracking-widest opacity-50">USUARIO</h3>
              <div className="space-y-2">
                <NavItem icon={<AppsIcon className="w-6 h-6" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} mobile={true} />
                <NavItem icon={<HelpIcon className="w-6 h-6" />} label="Ayuda y Soporte" active={false} onClick={() => window.location.href = 'mailto:info@centrobioenergetica.com'} mobile={true} />
                <NavItem icon={<SearchIcon className="w-6 h-6" />} label="Buscar" active={false} onClick={() => onOpenSearch && onOpenSearch()} mobile={true} />
                <ThemeToggle mobile={true} />
              </div>
            </div>
          </nav>

          <UserProfile mobile={true} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:sticky top-0 h-screen bg-[var(--bg-main)] border-r border-[var(--border-color)] p-8 flex-col w-80 shrink-0">
        <div className="flex items-center space-x-3 mb-12">
          <LogoIcon className="h-8 w-auto" />
          <span className="text-lg font-bold">Instituto Centrobioenergética</span>
        </div>

        <nav className="flex-grow space-y-12">
          <div className="space-y-4">
            <h3 className="px-6 text-xs font-black text-primary-600 uppercase tracking-widest opacity-50">MENÚ</h3>
            <div className="space-y-2">
              <NavItem icon={<DashboardIcon className="w-6 h-6" />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} />
              <NavItem icon={<CoursesIcon className="w-6 h-6" />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} />
              <NavItem icon={<ClinicalServicesIcon className="w-6 h-6" />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} />
              <NavItem icon={<CalendarIcon className="w-6 h-6" />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} />
              <NavItem icon={<NewsIcon className="w-6 h-6" />} label="Noticias" active={location.pathname === '/noticias'} onClick={() => handleNavigation('Noticias', '/noticias')} />
              <NavItem icon={<AboutUsIcon className="w-6 h-6" />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="px-6 text-xs font-black text-primary-600 uppercase tracking-widest opacity-50">USUARIO</h3>
            <div className="space-y-2">
              <NavItem icon={<AppsIcon className="w-6 h-6" />} label="Aplicaciones" active={location.pathname === '/aplicaciones'} onClick={() => handleNavigation('Aplicaciones', '/aplicaciones')} />
              <NavItem icon={<HelpIcon className="w-6 h-6" />} label="Ayuda y Soporte" active={false} onClick={() => window.location.href = 'mailto:info@centrobioenergetica.com'} />
              <NavItem icon={<SearchIcon className="w-6 h-6" />} label="Buscar" active={false} onClick={() => onOpenSearch && onOpenSearch()} />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <UserProfile />
      </aside>
    </>
  );
};

export default Sidebar;