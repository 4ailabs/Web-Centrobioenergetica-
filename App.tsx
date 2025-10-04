
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
import SearchResults from './pages/SearchResults';
import Search from './pages/Search';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Panel');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    courses: [],
    services: [],
    products: [],
    news: []
  });

  // Datos de ejemplo para búsqueda
  const allCourses = [
    {
      id: 1,
      title: 'Biomagnetismo Kids',
      description: 'Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños y su desarrollo energético.',
      author: '',
      price: 0,
      lessons: 12,
      level: 'Principiante',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    // ... más cursos
  ];

  const allServices = [
    {
      title: 'Biomagnetismo',
      description: 'Técnica terapéutica que utiliza imanes para equilibrar el pH del organismo y restaurar la salud.',
      duration: '60-90 min',
      price: 'Consultar',
    },
    // ... más servicios
  ];

  const allProducts = [
    {
      name: 'Kit de Biomagnetismo',
      description: 'Set completo con imanes terapéuticos para sesiones de biomagnetismo en casa.',
      price: '$299 MXN',
      category: 'Terapéutico',
    },
    // ... más productos
  ];

  const allNews = [
    {
      title: 'El Poder de la Respiración Consciente en el Día a Día',
      description: 'Nuevos estudios revelan cómo la respiración puede impactar positivamente tu salud física y mental.',
      author: 'Henry Carter',
    },
    // ... más noticias
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActivePage('Resultados de Búsqueda');
    
    // Búsqueda simple por texto
    const filteredCourses = allCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredServices = allServices.filter(service => 
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredNews = allNews.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults({
      courses: filteredCourses,
      services: filteredServices,
      products: filteredProducts,
      news: filteredNews
    });
  };

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
      case 'Búsqueda':
        return <Search onSearch={handleSearch} />;
      case 'Resultados de Búsqueda':
        return <SearchResults query={searchQuery} results={searchResults} />;
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
          <Sidebar activeItem={activePage} setActiveItem={setActivePage} onSearch={handleSearch} />
        </div>
        
        {/* Mobile Sidebar (floating) */}
        <div className="lg:hidden">
          <Sidebar activeItem={activePage} setActiveItem={setActivePage} onSearch={handleSearch} />
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