
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AllCourses from './pages/AllCourses';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Apps from './pages/Apps';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Panel');

  const renderPage = () => {
    switch (activePage) {
      case 'Panel':
        return <Dashboard />;
      case 'Cursos':
        return <AllCourses />;
      case 'Noticias':
        return <News />;
      case 'Sobre Nosotros':
        return <AboutUs />;
      case 'Aplicaciones':
        return <Apps />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen font-sans text-gray-900">
      <div className="flex">
        <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
        <main className="flex-1 p-8">
           <div key={activePage} className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;