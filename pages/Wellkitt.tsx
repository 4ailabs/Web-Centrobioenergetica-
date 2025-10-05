import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WellkittIcon } from '../components/Icons';
import { products as baseProducts, kits } from '../constants/data';
import { Product, Kit } from '../types';
import ProductCard from '../wellkitt-components/ProductCard';
import KitCard from '../wellkitt-components/KitCard';
import KitCardCompact from '../wellkitt-components/KitCardCompact';
import ProductDetailModal from '../wellkitt-components/ProductDetailModal';
import KitDetailModal from '../wellkitt-components/KitDetailModal';
import { categoryConfig, mainCategories } from '../wellkitt-components/category-config';
import { CartProvider, useCart } from '../contexts/CartContext';
import { Heart, Droplets, Zap, Shield, Activity, Brain, Dna, List, ShoppingCart, ArrowRight, TestTube, Sparkles, Truck } from 'lucide-react';

const Wellkitt: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  
  // Filtrar productos por categoría
  const filteredProducts = activeCategory === 'All' 
    ? baseProducts 
    : baseProducts.filter(p => p.category === activeCategory);

  const categories = ['All', ...Object.keys(categoryConfig)];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleShowDetails = (item: Kit | Product) => {
    if ('ingredients' in item) {
      // Es un producto
      setSelectedProduct(item as Product);
    } else {
      // Es un kit
      setSelectedKit(item as Kit);
    }
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  const handleCloseKitModal = () => {
    setSelectedKit(null);
  };

  const handleViewAllProducts = () => {
    navigate('/wellkitt/category/all');
  };

  const handleViewCategory = (category: string) => {
    navigate(`/wellkitt/category/${category}`);
  };

  return (
    <div className="w-full bg-white p-3 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl lg:mt-20 mt-12 sm:mt-16">
      <header className="mb-6 sm:mb-8 lg:mb-12">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
            <WellkittIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-black">Wellkitt</h1>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
          Tu Navegador de Salud Natural - Productos especializados para el bienestar energético
        </p>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 lg:p-8 mb-8 border border-green-200">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Wellkitt:</span> Tu Salud,<br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Ciencia Personalizada</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Revoluciona tu bienestar con productos especializados. Tests genéticos, sueroterapia premium 
            y recomendaciones personalizadas para tu perfil único.
          </p>
          
          {/* Badges de características */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-white/80 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 shadow-sm flex items-center gap-2">
              <Dna className="w-4 h-4" />
              Tests Genéticos
            </span>
            <span className="bg-white/80 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 shadow-sm flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Sueroterapia IV
            </span>
            <span className="bg-white/80 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 shadow-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Análisis Especializado
            </span>
          </div>
        </div>
      </section>

      {/* Kits Estratégicos */}
      <section className="mb-20">
        <div className="text-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Kits Estratégicos</h3>
          <p className="text-sm lg:text-base text-gray-600">
            Soluciones expertas diseñadas para los objetivos de salud más comunes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {kits.map(kit => (
            <KitCard 
              key={kit.id} 
              kit={kit} 
              allProducts={baseProducts} 
              onShowDetails={() => handleShowDetails(kit)}
            />
          ))}
        </div>
      </section>

      {/* Sección de Tests y IA */}
      <section className="mb-20">
        <div className="text-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Descubre tu Perfil de Salud</h3>
          <p className="text-sm lg:text-base text-gray-600">
            Realiza nuestros tests especializados y obtén recomendaciones personalizadas con IA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
          {/* Test de Endotelio */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Test de Salud Endotelial</h4>
                <p className="text-sm text-gray-600">20 preguntas • 6 áreas clave</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Evalúa el estado de tu endotelio y obtén recomendaciones personalizadas para tu salud cardiovascular.
            </p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Realizar Test
            </button>
          </div>

          {/* Test Nutrigenómico */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Dna className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Test Nutrigenómico</h4>
                <p className="text-sm text-gray-600">20 preguntas • 7 áreas genéticas</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Descubre cómo tus genes responden a los alimentos y optimiza tu nutrición personalizada.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Realizar Test
            </button>
          </div>
        </div>

        {/* Recomendación IA */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Recomendación Personalizada con IA</h4>
              <p className="text-sm text-gray-600">Describe tu objetivo de salud</p>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ej: Quiero mejorar mi energía y concentración..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Obtener Recomendación
            </button>
          </div>
        </div>
      </section>

      {/* Todos los Kits */}
      <section className="mb-20">
        <div className="text-center mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">Todos los Kits</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {kits.slice(0, 6).map(kit => (
            <KitCardCompact 
              key={kit.id} 
              kit={kit} 
              allProducts={baseProducts} 
              onShowDetails={() => handleShowDetails(kit)}
            />
          ))}
        </div>
        
        {/* Mostrar más kits si hay más de 6 */}
        {kits.length > 6 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 mb-2">
              Y {kits.length - 6} kits más disponibles
            </p>
            <button
              onClick={() => {
                // Aquí podrías implementar un modal o expandir la sección
                console.log('Mostrar todos los kits');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Ver todos los kits →
            </button>
          </div>
        )}
      </section>

      {/* Filtros de Categorías */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">Productos por Categoría</h3>
          <button
            onClick={handleViewAllProducts}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              onClick={() => handleViewCategory(category === 'All' ? 'all' : category)}
              className="p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-300 text-center"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                {categoryConfig[category]?.icon ? (
                  React.createElement(categoryConfig[category].icon, { className: "w-4 h-4 text-gray-600" })
                ) : (
                  <List className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <span className="text-xs font-medium text-gray-700">
                {category === 'All' ? 'Todos' : category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">
            Productos Destacados
          </h3>
          <span className="text-sm text-gray-500">
            Mostrando {filteredProducts.slice(0, 12).length} de {filteredProducts.length} productos
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {filteredProducts.slice(0, 12).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onShowDetails={() => handleShowDetails(product)}
            />
          ))}
        </div>
        
        {/* Botón para ver más productos */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllProducts}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            Ver Todos los Productos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sección de Información */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-100">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">¿Necesitas Ayuda Personalizada?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Consultoría IA</h4>
            <p className="text-xs sm:text-sm text-gray-600">Recomendaciones personalizadas con inteligencia artificial</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Calidad Premium</h4>
            <p className="text-xs sm:text-sm text-gray-600">Productos certificados y de la más alta calidad</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Entrega Rápida</h4>
            <p className="text-xs sm:text-sm text-gray-600">Envío rápido y seguro a todo el país</p>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información de Envíos */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Envíos y Entrega</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Envío gratis en compras mayores a $1,500</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Entrega en 24-48 horas en Ciudad de México</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>3-5 días hábiles al resto del país</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Rastreo en tiempo real de tu pedido</span>
            </li>
          </ul>
        </div>

        {/* Información de Garantías */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Garantías y Soporte</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Garantía de 30 días en todos los productos</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Soporte especializado de lunes a viernes</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Productos 100% originales y certificados</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Asesoría nutricional personalizada</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Contacto */}
      <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-2">¿Tienes dudas sobre algún producto?</h3>
        <p className="text-sm mb-4 opacity-90">Nuestros especialistas están listos para ayudarte</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="tel:+525579076626" 
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            📞 Llamar: +52 55 7907 6626
          </a>
          <a 
            href="https://wa.me/525579076626" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Modal de detalles de producto */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={handleCloseProductModal}
      />

      {/* Modal de detalles de kit */}
      <KitDetailModal 
        kit={selectedKit}
        allProducts={baseProducts}
        onClose={handleCloseKitModal}
      />
    </div>
  );
};

const WellkittWithCart: React.FC = () => {
  return (
    <CartProvider>
      <Wellkitt />
    </CartProvider>
  );
};

export default WellkittWithCart;
