import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppDispatch, useUIState } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { getUrlParams } from './utils/framerIntegration';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';

// Carga diferida: cada página se descarga solo cuando se visita,
// en lugar de incluirse todas en el bundle inicial.
const AllCourses = lazy(() => import('./pages/AllCourses'));
const Descubrir = lazy(() => import('./pages/Descubrir'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const ClinicalServices = lazy(() => import('./pages/ClinicalServices'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Apps = lazy(() => import('./pages/Apps'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const WellvibeMedia = lazy(() => import('./pages/WellvibeMedia'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const TallerMascotas = lazy(() => import('./pages/TallerMascotas'));
const ResetHormonal = lazy(() => import('./pages/ResetHormonal'));
const ActosQueMueven = lazy(() => import('./pages/ActosQueMueven'));
const Resonantia = lazy(() => import('./pages/Resonantia'));
const Crania = lazy(() => import('./pages/Crania'));
const RegulacionBioelectrica = lazy(() => import('./pages/RegulacionBioelectrica'));
const RBMetodo = lazy(() => import('./pages/RBMetodo'));
const BioenergeticaTransgeneracional = lazy(() => import('./pages/BioenergeticaTransgeneracional'));
const TestHormonal = lazy(() => import('./pages/TestHormonal'));
const TestVinculoAnimal = lazy(() => import('./pages/TestVinculoAnimal'));

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 border-t-primary-600 animate-spin" />
  </div>
);

// Rutas accesibles vía ?page= (deep-linking desde el embed de Framer)
const PAGE_PATHS: Record<string, string> = {
  'cursos': '/cursos',
  'descubrir': '/descubrir',
  'servicios': '/servicios',
  'sobre-nosotros': '/sobre-nosotros',
  'aplicaciones': '/aplicaciones',
  'calendario': '/calendario',
  'wellvibe-media': '/wellvibe-media',
  'panel': '/'
};

// Componente interno que usa el contexto
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSearchOpen, searchQuery } = useUIState();

  // Navegación directa vía ?page= (usada por el embed de Framer)
  useEffect(() => {
    const page = getUrlParams().page;
    if (page && PAGE_PATHS[page]) {
      navigate(PAGE_PATHS[page], { replace: true });
    }
    // Solo al montar: el parámetro viene de la URL de entrada
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
    <div className="bg-[var(--bg-main)] h-[100dvh] font-sans text-[var(--text-primary)] transition-colors duration-300 flex overflow-hidden">
      {/* Sidebar (gestiona internamente las variantes desktop y móvil) */}
      <Sidebar onSearch={handleSearch} onOpenSearch={handleOpenSearch} />

      {/* Main Content + Fixed Footer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-none">
          <div className="p-2 lg:p-8">
            <div key={location.pathname} className="animate-fade-in">
              <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={
                  <Dashboard
                    onNavigateToCourses={() => navigate('/cursos')}
                    onNavigateToAbout={() => navigate('/sobre-nosotros')}
                    onNavigateToApps={() => navigate('/aplicaciones')}
                  />
                } />
                <Route path="/cursos" element={<AllCourses />} />
                <Route path="/descubrir" element={<Descubrir />} />
                <Route path="/descubrir/:articleId" element={<Descubrir />} />
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
              </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </main>

        {/* Footer fijo al fondo */}
        <Footer />
      </div>

    </div>

    {/* Search Modal — outside flex container for proper z-index.
        La clase dark vive en <html>, no necesita wrapper. */}
    {isSearchOpen && (
      <Search
        onSearch={handleSearch}
        onClose={handleCloseSearch}
        isOpen={isSearchOpen}
      />
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