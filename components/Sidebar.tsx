import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardIcon, CoursesIcon, AboutUsIcon, LogoIcon, MenuIcon, XIcon, SearchIcon, CalendarIcon, SunIcon, MoonIcon, YoutubeIcon, ClinicalServicesIcon } from './Icons';
import { LogIn, LogOut, Shield, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIState, useAppDispatch } from '../contexts/AppContext';

import UserProfile from './UserProfile';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  onSearch?: (query: string) => void;
  onOpenSearch?: () => void;
}

// Nav item that adapts to collapsed state
const SidebarNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick: () => void;
  mobile?: boolean;
}> = ({ icon, label, active, collapsed, onClick, mobile }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    title={collapsed ? label : undefined}
    className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} ${collapsed ? 'px-0 py-2.5' : 'px-3 py-2.5'} rounded-[6px] transition-colors duration-150 text-[14px] ${active
      ? 'bg-neutral-200/70 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-50 font-medium'
      : 'text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30'
    } ${mobile ? 'mobile-nav-item' : ''}`}
  >
    <div className={`shrink-0 ${active ? 'text-neutral-900 dark:text-neutral-50' : 'text-neutral-500 dark:text-neutral-500'}`}>
      {icon}
    </div>
    {!collapsed && <span className="truncate">{label}</span>}
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, onSearch, onOpenSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, isSidebarCollapsed } = useUIState();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const collapsed = isSidebarCollapsed;

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const handleNavigation = (item: string, path: string) => {
    setActiveItem(item);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const { user, logout } = useAuth();

  const iconSize = "w-[18px] h-[18px]";

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#F2F0EC] dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50 px-4 py-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="h-7 w-auto" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">Instituto</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-[#F2F0EC] dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 w-72 z-50 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 pt-16 flex flex-col h-full">
          <nav className="flex-grow overflow-y-auto space-y-1 pr-1">
            <div className="bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl p-1.5 mb-3">
              <SidebarNavItem icon={<SearchIcon className={iconSize} />} label="Buscar" onClick={() => onOpenSearch && onOpenSearch()} mobile />
            </div>

            <div className="space-y-0.5 py-2">
              <SidebarNavItem icon={<DashboardIcon className={iconSize} />} label="Panel" active={location.pathname === '/'} onClick={() => handleNavigation('Panel', '/')} mobile />
              <SidebarNavItem icon={<CoursesIcon className={iconSize} />} label="Cursos" active={location.pathname === '/cursos'} onClick={() => handleNavigation('Cursos', '/cursos')} mobile />
              <SidebarNavItem icon={<ClinicalServicesIcon className={iconSize} />} label="Servicios Clínicos" active={location.pathname === '/servicios'} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} mobile />
              <SidebarNavItem icon={<CalendarIcon className={iconSize} />} label="Calendario" active={location.pathname === '/calendario'} onClick={() => handleNavigation('Calendario', '/calendario')} mobile />
              <SidebarNavItem icon={<AboutUsIcon className={iconSize} />} label="Sobre Nosotros" active={location.pathname === '/sobre-nosotros'} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} mobile />
              <SidebarNavItem icon={<YoutubeIcon className={iconSize} />} label="Wellvibe Media" active={location.pathname === '/wellvibe-media'} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} mobile />
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>

            <div className="space-y-0.5">
              <button onClick={toggleTheme} className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-[14px] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors">
                <span className="text-neutral-500">{isDarkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}</span>
                <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
              {user ? (
                <SidebarNavItem icon={<LogOut className={iconSize} />} label="Cerrar Sesión" onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }} mobile />
              ) : (
                <SidebarNavItem icon={<LogIn className={iconSize} />} label="Iniciar Sesión" active={location.pathname === '/login'} onClick={() => { handleNavigation('Login', '/login'); setIsMobileMenuOpen(false); }} mobile />
              )}
            </div>
          </nav>
          <UserProfile user={user} mobile={true} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex h-screen bg-[#F2F0EC] dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 py-4 flex-col shrink-0 overflow-hidden transition-all duration-200 ease-[cubic-bezier(.33,1,.68,1)] ${collapsed ? 'w-[60px] px-2' : 'w-[220px] px-3'}`}>
        {/* Logo + Toggle */}
        <div className={`flex items-center mb-5 ${collapsed ? 'justify-center' : 'justify-between px-2'}`}>
          {collapsed ? (
            <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors text-neutral-500" title="Expandir sidebar">
              <PanelLeftOpen className="w-[18px] h-[18px]" />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <LogoIcon className="h-7 w-auto" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-50 leading-tight">Instituto</span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-tight">Centrobioenergética</span>
                </div>
              </div>
              <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors text-neutral-400" title="Cerrar sidebar">
                <PanelLeftClose className="w-[16px] h-[16px]" />
              </button>
            </>
          )}
        </div>

        <nav className="flex-grow flex flex-col overflow-y-auto">
          {/* Search */}
          <div className={`bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl ${collapsed ? 'p-1' : 'p-1.5'} mb-3`}>
            <SidebarNavItem icon={<SearchIcon className={iconSize} />} label="Buscar" collapsed={collapsed} onClick={() => onOpenSearch && onOpenSearch()} />
          </div>

          {/* Main nav */}
          <div className="space-y-0.5 flex-grow">
            <SidebarNavItem icon={<DashboardIcon className={iconSize} />} label="Panel" active={location.pathname === '/'} collapsed={collapsed} onClick={() => handleNavigation('Panel', '/')} />
            <SidebarNavItem icon={<CoursesIcon className={iconSize} />} label="Cursos" active={location.pathname === '/cursos'} collapsed={collapsed} onClick={() => handleNavigation('Cursos', '/cursos')} />
            <SidebarNavItem icon={<ClinicalServicesIcon className={iconSize} />} label="Servicios" active={location.pathname === '/servicios'} collapsed={collapsed} onClick={() => handleNavigation('Servicios Clínicos', '/servicios')} />
            <SidebarNavItem icon={<CalendarIcon className={iconSize} />} label="Calendario" active={location.pathname === '/calendario'} collapsed={collapsed} onClick={() => handleNavigation('Calendario', '/calendario')} />
            <SidebarNavItem icon={<AboutUsIcon className={iconSize} />} label="Nosotros" active={location.pathname === '/sobre-nosotros'} collapsed={collapsed} onClick={() => handleNavigation('Sobre Nosotros', '/sobre-nosotros')} />
            <SidebarNavItem icon={<YoutubeIcon className={iconSize} />} label="Wellvibe" active={location.pathname === '/wellvibe-media'} collapsed={collapsed} onClick={() => handleNavigation('Wellvibe Media', '/wellvibe-media')} />

            {user?.isAdmin && (
              <>
                <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>
                <SidebarNavItem icon={<Shield className={iconSize} />} label="Admin" active={location.pathname === '/admin'} collapsed={collapsed} onClick={() => handleNavigation('Panel Admin', '/admin')} />
              </>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>

          {/* Bottom */}
          <div className="space-y-0.5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); toggleTheme(); }}
              title={collapsed ? (isDarkMode ? 'Modo Claro' : 'Modo Oscuro') : undefined}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} ${collapsed ? 'px-0' : 'px-3'} py-2.5 rounded-lg transition-colors duration-150 text-[14px] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30`}
            >
              <span className="text-neutral-500 shrink-0">{isDarkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}</span>
              {!collapsed && <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </a>
            {user ? (
              <SidebarNavItem icon={<LogOut className={iconSize} />} label="Salir" collapsed={collapsed} onClick={() => { logout(); navigate('/'); }} />
            ) : (
              <SidebarNavItem icon={<LogIn className={iconSize} />} label="Entrar" active={location.pathname === '/login'} collapsed={collapsed} onClick={() => handleNavigation('Login', '/login')} />
            )}
          </div>
        </nav>

        {!collapsed && <UserProfile user={user} />}
      </aside>
    </>
  );
};

export default Sidebar;
