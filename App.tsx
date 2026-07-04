import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useAppDispatch, useUIState } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { getUrlParams, isInIframe } from './utils/framerIntegration';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AllCourses from './pages/AllCourses';
import CourseDetail from './pages/CourseDetail';
import ClinicalServices from './pages/ClinicalServices';
import Login from './pages/Login';
import Register from './pages/Register';
// import Wellkitt from './pages/Wellkitt'; // Temporalmente deshabilitado
// import WellkittCategory from './pages/WellkittCategory'; // Temporalmente deshabilitado
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Apps from './pages/Apps';
import SearchResults from './pages/SearchResults';
import Search from './pages/Search';
import CalendarPage from './pages/CalendarPage';
import WellvibeMedia from './pages/WellvibeMedia';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import TallerMascotas from './pages/TallerMascotas';
import ResetHormonal from './pages/ResetHormonal';
import ActosQueMueven from './pages/ActosQueMueven';
import Resonantia from './pages/Resonantia';
import Crania from './pages/Crania';
import RegulacionBioelectrica from './pages/RegulacionBioelectrica';
import RBMetodo from './pages/RBMetodo';
import BioenergeticaTransgeneracional from './pages/BioenergeticaTransgeneracional';
import TestHormonal from './pages/TestHormonal';
import TestVinculoAnimal from './pages/TestVinculoAnimal';

const PAGE_MAP: Record<string, string> = {
  'cursos': 'Cursos',
  'servicios': 'Servicios Clínicos',
  // 'noticias': 'Noticias',
  'sobre-nosotros': 'Sobre Nosotros',
  'aplicaciones': 'Aplicaciones',
  'calendario': 'Calendario',
  'wellvibe-media': 'Wellvibe Media',
  'panel': 'Panel'
};

// Componente interno que usa el contexto
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activePage, isSearchOpen, searchQuery, isDarkMode } = useUIState();

  // Manejar parámetros de URL para navegación directa
  useEffect(() => {
    const params = getUrlParams();
    const page = params.page;

    if (page && PAGE_MAP[page]) {
      dispatch({ type: 'SET_ACTIVE_PAGE', payload: PAGE_MAP[page] });
    }
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch({ type: 'PERFORM_SEARCH', payload: query });
    navigate('/search');
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

  return (
    <>
    <div className={`${isDarkMode ? 'dark' : ''} bg-[var(--bg-main)] h-[100dvh] font-sans text-[var(--text-primary)] transition-colors duration-300 flex overflow-hidden`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
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

      {/* Main Content + Fixed Footer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-none">
          <div className="p-2 lg:p-8">
            <div key={activePage} className="animate-fade-in">
              <Routes>
                <Route path="/" element={
                  <Dashboard
                    onNavigateToCourses={() => {
                      handleSetActivePage('Cursos');
                      navigate('/cursos');
                    }}
                    onNavigateToAbout={() => {
                      handleSetActivePage('Sobre Nosotros');
                      navigate('/sobre-nosotros');
                    }}
                    onNavigateToApps={() => {
                      handleSetActivePage('Aplicaciones');
                      navigate('/aplicaciones');
                    }}
                  />
                } />
                <Route path="/cursos" element={<AllCourses />} />
                <Route path="/servicios" element={<ClinicalServices />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/aplicaciones" element={<Apps />} />
                <Route path="/calendario" element={<CalendarPage />} />
                <Route path="/wellvibe-media" element={<WellvibeMedia />} />
                <Route path="/taller-mascotas" element={<TallerMascotas />} />
                <Route path="/reset-hormonal" element={<ResetHormonal />} />
                <Route path="/actos-que-mueven" element={<ActosQueMueven />} />
                <Route path="/resonantia" element={<Resonantia />} />
                <Route path="/crania" element={<Crania />} />
                <Route path="/regulacion-bioelectrica" element={<RegulacionBioelectrica />} />
                <Route path="/rb" element={<RBMetodo />} />
                <Route path="/bioenergetica-transgeneracional" element={<BioenergeticaTransgeneracional />} />
                <Route path="/test-hormonal" element={<TestHormonal />} />
                <Route path="/test-vinculo-animal" element={<TestVinculoAnimal />} />
                <Route path="/course/:courseId" element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchResults query={searchQuery} />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </main>

        {/* Footer fijo al fondo */}
        <Footer />
      </div>

    </div>

    {/* Search Modal — outside flex container for proper z-index */}
    {isSearchOpen && (
      <div className={isDarkMode ? 'dark' : ''}>
        <Search
          onSearch={handleSearch}
          onClose={handleCloseSearch}
          isOpen={isSearchOpen}
        />
      </div>
    )}
    </>
  );
};

// Componente principal con Provider y Router
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;