
import React, { useEffect } from 'react';
import { AppProvider, useAppDispatch, useUIState } from './contexts/AppContext';
import { getUrlParams, isInIframe } from './utils/framerIntegration';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AllCourses from './pages/AllCourses';
import ClinicalServices from './pages/ClinicalServices';
import Wellkitt from './pages/Wellkitt';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Apps from './pages/Apps';
import SearchResults from './pages/SearchResults';
import Search from './pages/Search';

// Componente interno que usa el contexto
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activePage, isSearchOpen, searchQuery } = useUIState();

  // Manejar parámetros de URL para navegación directa
  useEffect(() => {
    const params = getUrlParams();
    const page = params.page;
    
    if (page) {
      const pageMap: Record<string, string> = {
        'cursos': 'Cursos',
        'servicios': 'Servicios Clínicos',
        'wellkitt': 'Wellkitt',
        'noticias': 'Noticias',
        'sobre-nosotros': 'Sobre Nosotros',
        'aplicaciones': 'Aplicaciones',
        'panel': 'Panel'
      };
      
      const mappedPage = pageMap[page];
      if (mappedPage) {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: mappedPage });
      }
    }
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch({ type: 'PERFORM_SEARCH', payload: query });
  };

  const handleOpenSearch = () => {
    dispatch({ type: 'TOGGLE_SEARCH_MODAL' });
  };

  const handleCloseSearch = () => {
    dispatch({ type: 'CLOSE_SEARCH_MODAL' });
  };

  const handleSetActivePage = (page: string) => {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Panel':
        return (
          <Dashboard 
            onNavigateToCourses={() => handleSetActivePage('Cursos')}
            onNavigateToNews={() => handleSetActivePage('Noticias')}
            onNavigateToAbout={() => handleSetActivePage('Sobre Nosotros')}
            onNavigateToApps={() => handleSetActivePage('Aplicaciones')}
          />
        );
      case 'Cursos':
        return <AllCourses />;
      case 'Servicios Clínicos':
        return <ClinicalServices />;
      case 'Wellkitt':
        return <Wellkitt />;
      case 'Noticias':
        return <News />;
      case 'Sobre Nosotros':
        return <AboutUs />;
      case 'Aplicaciones':
        return <Apps />;
      case 'Resultados de Búsqueda':
        return <SearchResults query={searchQuery} />;
      default:
        return (
          <Dashboard 
            onNavigateToCourses={() => handleSetActivePage('Cursos')}
            onNavigateToNews={() => handleSetActivePage('Noticias')}
            onNavigateToAbout={() => handleSetActivePage('Sobre Nosotros')}
            onNavigateToApps={() => handleSetActivePage('Aplicaciones')}
          />
        );
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen font-sans text-gray-900 flex flex-col">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80">
          <Sidebar 
            activeItem={activePage} 
            setActiveItem={handleSetActivePage} 
            onSearch={handleSearch} 
            onOpenSearch={handleOpenSearch} 
          />
        </div>
        
        {/* Mobile Sidebar (floating) */}
        <div className="lg:hidden">
          <Sidebar 
            activeItem={activePage} 
            setActiveItem={handleSetActivePage} 
            onSearch={handleSearch} 
            onOpenSearch={handleOpenSearch} 
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0 p-2 lg:p-8">
           <div key={activePage} className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Search Modal */}
      <Search 
        onSearch={handleSearch} 
        onClose={handleCloseSearch} 
        isOpen={isSearchOpen} 
      />
    </div>
  );
};

// Componente principal con Provider
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;