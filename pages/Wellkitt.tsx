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
    <div className="w-full lg:mt-20 mt-12 sm:mt-16 px-4">
      <header className="mb-6 sm:mb-8 lg:mb-12">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/10 rounded-2xl flex items-center justify-center mr-4 border border-primary-600/20">
            <WellkittIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-3xl font-black text-[var(--text-main)] uppercase tracking-tight">Wellkitt</h1>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-[var(--text-muted)] leading-relaxed font-medium">
          Tu Navegador de Salud Natural - Productos especializados para el bienestar energético
        </p>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600/5 to-primary-600/10 rounded-[2.5rem] p-6 lg:p-12 mb-12 border border-primary-600/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[var(--panel-bg)] rounded-3xl shadow-xl border border-[var(--border-color)]">
              <Heart className="w-10 h-10 text-primary-600" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[var(--text-main)] mb-6 uppercase tracking-tight leading-none">
            <span className="text-primary-600">Wellkitt:</span> Tu Salud,<br />
            <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">Ciencia Personalizada</span>
          </h2>
          <p className="text-base lg:text-xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            Revoluciona tu bienestar con productos especializados. Tests genéticos, sueroterapia premium
            y recomendaciones personalizadas para tu perfil único.
          </p>

          {/* Badges de características */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Dna, label: 'Tests Genéticos' },
              { icon: Droplets, label: 'Sueroterapia IV' },
              { icon: Activity, label: 'Análisis Especializado' }
            ].map((badge, i) => (
              <span key={i} className="bg-[var(--panel-bg)] text-primary-600 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border border-[var(--border-color)] shadow-sm flex items-center gap-3">
                <badge.icon className="w-4 h-4" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Kits Estratégicos */}
      <section className="mb-20">
        <div className="text-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-main)] group-hover:text-primary-600 transition-colors uppercase tracking-tight">Kits Estratégicos</h3>
          <p className="text-sm lg:text-base text-[var(--text-muted)] font-medium leading-relaxed">
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
          <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-main)] group-hover:text-primary-600 transition-colors uppercase tracking-tight">Descubre tu Perfil de Salud</h3>
          <p className="text-sm lg:text-base text-[var(--text-muted)] font-medium leading-relaxed">
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
                <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">20 preguntas • 6 áreas clave</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed mb-4">
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
                <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">20 preguntas • 7 áreas genéticas</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed mb-4">
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
              <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">Describe tu objetivo de salud</p>
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
        <div className="flex items-center justify-between mb-8 px-1">
          <h3 className="text-xs font-black text-primary-600 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-px bg-primary-600/20"></span>
            Productos por Categoría
          </h3>
          <button
            onClick={handleViewAllProducts}
            className="flex items-center gap-2 text-xs font-black text-primary-600 hover:text-primary-700 uppercase tracking-widest transition-colors"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              onClick={() => handleViewCategory(category === 'All' ? 'all' : category)}
              className="p-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl hover:border-primary-600 hover:shadow-xl transition-all group text-center"
            >
              <div className="w-12 h-12 bg-[var(--panel-bg)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--border-color)] group-hover:border-primary-600 transition-colors">
                {categoryConfig[category]?.icon ? (
                  React.createElement(categoryConfig[category].icon, { className: "w-5 h-5 text-[var(--text-muted)] group-hover:text-primary-600 transition-colors" })
                ) : (
                  <List className="w-5 h-5 text-[var(--text-muted)] group-hover:text-primary-600 transition-colors" />
                )}
              </div>
              <span className="text-[10px] font-black text-[var(--text-muted)] group-hover:text-[var(--text-main)] uppercase tracking-widest">
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
      <div className="bg-[var(--bg-main)] rounded-[2.5rem] p-8 lg:p-12 border border-[var(--border-color)] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <h3 className="text-xl lg:text-3xl font-black text-[var(--text-main)] mb-10 text-center uppercase tracking-tight relative z-10">¿Necesitas Ayuda Personalizada?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-8 bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/20 border border-primary-600/10">
              <Brain className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="text-lg font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">Consultoría IA</h4>
            <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">Recomendaciones personalizadas con inteligencia artificial</p>
          </div>
          <div className="text-center p-8 bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/20 border border-primary-600/10">
              <Shield className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="text-lg font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">Calidad Premium</h4>
            <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">Productos certificados y de la más alta calidad</p>
          </div>
          <div className="text-center p-8 bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all relative z-10">
            <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/20 border border-primary-600/10">
              <Zap className="w-7 h-7 text-primary-600" />
            </div>
            <h4 className="text-lg font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">Entrega Rápida</h4>
            <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">Envío rápido y seguro a todo el país</p>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información de Envíos */}
        <div className="bg-[var(--panel-bg)] rounded-[2.5rem] p-8 lg:p-10 border border-[var(--border-color)] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary-600/10 transition-colors"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center shadow-inner border border-primary-600/10">
              <Truck className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">Envíos y Entrega</h3>
          </div>
          <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Envío gratis en compras mayores a $1,500</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Entrega en 24-48 horas en Ciudad de México</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>3-5 días hábiles al resto del país</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Rastreo en tiempo real de tu pedido</span>
            </li>
          </ul>
        </div>

        {/* Información de Garantías */}
        <div className="bg-[var(--panel-bg)] rounded-[2.5rem] p-8 lg:p-10 border border-[var(--border-color)] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary-600/10 transition-colors"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-600/10 rounded-2xl flex items-center justify-center shadow-inner border border-primary-600/10">
              <Shield className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight">Garantías y Soporte</h3>
          </div>
          <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Garantía de 30 días en todos los productos</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Soporte especializado de lunes a viernes</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
              <span>Productos 100% originales y certificados</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>
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
            className="bg-[var(--text-main)] text-[var(--bg-main)] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 hover:text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95"
          >
            📞 Llamar Ahora
          </a>
          <a
            href="https://wa.me/525579076626"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--text-main)] text-[var(--bg-main)] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 hover:text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
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
