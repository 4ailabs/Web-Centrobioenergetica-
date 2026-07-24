import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardIcon, CoursesIcon, AboutUsIcon, MenuIcon, XIcon, SearchIcon, CalendarIcon, SunIcon, MoonIcon, ClinicalServicesIcon } from './Icons';
import { LogIn, LogOut, Shield, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIState, useAppDispatch } from '../contexts/AppContext';

import UserProfile from './UserProfile';

interface SidebarProps {
  onSearch?: (query: string) => void;
  onOpenSearch?: () => void;
}

// Nav item that adapts to collapsed state. Con `to` es un enlace real
// (funciona cmd+click, abrir en pestaña, teclado); sin `to` es un botón de acción.
const SidebarNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  to?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}> = ({ icon, label, to, active, collapsed, onClick, mobile }) => {
  const className = `flex items-center w-full text-left ${collapsed ? 'justify-center' : 'gap-3'} ${collapsed ? 'px-0 py-2.5' : 'px-3 py-2.5'} rounded-[6px] transition-colors duration-150 text-[14px] ${active
    ? 'bg-neutral-200/70 dark:bg-neutral-700/50 text-neutral-800 dark:text-neutral-100 font-medium'
    : 'text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30'
  } ${mobile ? 'mobile-nav-item' : ''}`;
  const content = (
    <>
      <div className={`shrink-0 ${active ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-500'}`}>
        {icon}
      </div>
      {!collapsed && <span className="truncate">{label}</span>}
    </>
  );
  return to ? (
    <Link to={to} onClick={onClick} title={collapsed ? label : undefined} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} title={collapsed ? label : undefined} className={className}>
      {content}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onSearch, onOpenSearch }) => {
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const { user, logout } = useAuth();

  const iconSize = "w-[18px] h-[18px]";

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50 px-4 py-3 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo-instituto.svg" alt="Instituto Centrobioenergética" className="h-7 w-7" />
            <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-100">Instituto Centrobioenergética</span>
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
      <aside className={`lg:hidden fixed top-0 left-0 h-full bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 w-72 z-50 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 pt-16 flex flex-col h-full">
          <nav className="flex-grow overflow-y-auto space-y-1 pr-1">
            <div className="bg-neutral-100/60 dark:bg-neutral-800/40 rounded-xl p-1.5 mb-3">
              <SidebarNavItem icon={<SearchIcon className={iconSize} />} label="Buscar" onClick={() => onOpenSearch && onOpenSearch()} mobile />
            </div>

            <div className="space-y-0.5 py-2">
              <SidebarNavItem icon={<DashboardIcon className={iconSize} />} label="Panel" to="/" active={location.pathname === '/'} onClick={closeMobileMenu} mobile />
              <SidebarNavItem icon={<CoursesIcon className={iconSize} />} label="Cursos" to="/cursos" active={location.pathname === '/cursos'} onClick={closeMobileMenu} mobile />
              <SidebarNavItem icon={<ClinicalServicesIcon className={iconSize} />} label="Servicios Clínicos" to="/servicios" active={location.pathname === '/servicios'} onClick={closeMobileMenu} mobile />
              <SidebarNavItem icon={<CalendarIcon className={iconSize} />} label="Calendario" to="/calendario" active={location.pathname === '/calendario'} onClick={closeMobileMenu} mobile />
              <SidebarNavItem icon={<AboutUsIcon className={iconSize} />} label="Sobre Nosotros" to="/sobre-nosotros" active={location.pathname === '/sobre-nosotros'} onClick={closeMobileMenu} mobile />
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>

            <div className="space-y-0.5">
              <button onClick={toggleTheme} className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-[14px] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors">
                <span className="text-neutral-500">{isDarkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}</span>
                <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
              {user ? (
                <SidebarNavItem icon={<LogOut className={iconSize} />} label="Cerrar Sesión" onClick={() => { logout(); navigate('/'); closeMobileMenu(); }} mobile />
              ) : (
                <SidebarNavItem icon={<LogIn className={iconSize} />} label="Iniciar Sesión" to="/login" active={location.pathname === '/login'} onClick={closeMobileMenu} mobile />
              )}
            </div>
          </nav>
          <UserProfile user={user} mobile={true} />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex h-screen bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 py-4 flex-col shrink-0 overflow-hidden transition-all duration-200 ease-[cubic-bezier(.33,1,.68,1)] ${collapsed ? 'w-[60px] px-2' : 'w-[220px] px-3'}`}>
        {/* Logo + Toggle */}
        <div className={`flex items-center mb-5 ${collapsed ? 'justify-center' : 'justify-between px-2'}`}>
          {collapsed ? (
            <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30 transition-colors text-neutral-500" title="Expandir sidebar">
              <PanelLeftOpen className="w-[18px] h-[18px]" />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <img src="/logo-instituto.svg" alt="Instituto Centrobioenergética" className="h-7 w-7" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-neutral-800 dark:text-neutral-100 leading-tight">Instituto</span>
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
            <SidebarNavItem icon={<DashboardIcon className={iconSize} />} label="Panel" to="/" active={location.pathname === '/'} collapsed={collapsed} />
            <SidebarNavItem icon={<CoursesIcon className={iconSize} />} label="Cursos" to="/cursos" active={location.pathname === '/cursos'} collapsed={collapsed} />
            <SidebarNavItem icon={<ClinicalServicesIcon className={iconSize} />} label="Servicios" to="/servicios" active={location.pathname === '/servicios'} collapsed={collapsed} />
            <SidebarNavItem icon={<CalendarIcon className={iconSize} />} label="Calendario" to="/calendario" active={location.pathname === '/calendario'} collapsed={collapsed} />
            <SidebarNavItem icon={<AboutUsIcon className={iconSize} />} label="Nosotros" to="/sobre-nosotros" active={location.pathname === '/sobre-nosotros'} collapsed={collapsed} />

            {user?.isAdmin && (
              <>
                <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>
                <SidebarNavItem icon={<Shield className={iconSize} />} label="Admin" to="/admin" active={location.pathname === '/admin'} collapsed={collapsed} />
              </>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 my-3"></div>

          {/* Bottom */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={toggleTheme}
              title={collapsed ? (isDarkMode ? 'Modo Claro' : 'Modo Oscuro') : undefined}
              className={`flex items-center w-full text-left ${collapsed ? 'justify-center' : 'gap-3'} ${collapsed ? 'px-0' : 'px-3'} py-2.5 rounded-lg transition-colors duration-150 text-[14px] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-neutral-700/30`}
            >
              <span className="text-neutral-500 shrink-0">{isDarkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}</span>
              {!collapsed && <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </button>
            {user ? (
              <SidebarNavItem icon={<LogOut className={iconSize} />} label="Salir" collapsed={collapsed} onClick={() => { logout(); navigate('/'); }} />
            ) : (
              <SidebarNavItem icon={<LogIn className={iconSize} />} label="Entrar" to="/login" active={location.pathname === '/login'} collapsed={collapsed} />
            )}
          </div>
        </nav>

        {!collapsed && <UserProfile user={user} />}
      </aside>
    </>
  );
};

export default Sidebar;
