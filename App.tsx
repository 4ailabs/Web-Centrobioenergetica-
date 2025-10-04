
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AllCourses from './pages/AllCourses';
import ClinicalServices from './pages/ClinicalServices';
import Wellkitt from './pages/Wellkitt';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Apps from './pages/Apps';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Panel');

  const renderPage = () => {
    switch (activePage) {
      case 'Panel':
        return (
          <Dashboard 
            onNavigateToCourses={() => setActivePage('Cursos')}
            onNavigateToNews={() => setActivePage('Noticias')}
            onNavigateToAbout={() => setActivePage('Sobre Nosotros')}
            onNavigateToApps={() => setActivePage('Aplicaciones')}
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
      default:
        return (
          <Dashboard 
            onNavigateToCourses={() => setActivePage('Cursos')}
            onNavigateToNews={() => setActivePage('Noticias')}
            onNavigateToAbout={() => setActivePage('Sobre Nosotros')}
            onNavigateToApps={() => setActivePage('Aplicaciones')}
          />
        );
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen font-sans text-gray-900 flex flex-col">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80">
          <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
        </div>
        
        {/* Mobile Sidebar (floating) */}
        <div className="lg:hidden">
          <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
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
    </div>
  );
};

export default App;