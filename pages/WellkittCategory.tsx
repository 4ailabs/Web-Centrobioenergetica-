import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Filter } from 'lucide-react';
import { products as baseProducts } from '../constants/data';
import { Product } from '../types';
import ProductCard from '../wellkitt-components/ProductCard';
import { categoryConfig, mainCategories } from '../wellkitt-components/category-config';
import { CartProvider, useCart } from '../contexts/CartContext';

const WellkittCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'name' | 'brand'>('name');
  
  // Obtener productos de la categoría
  const categoryProducts = category === 'all' 
    ? baseProducts 
    : baseProducts.filter(p => p.category === category);

  // Ordenar productos
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.brand.localeCompare(b.brand);
    }
  });

  const categoryInfo = categoryConfig[category || ''] || { name: 'Todos los Productos', icon: Filter };

  const handleShowDetails = (product: Product) => {
    // Aquí podrías abrir un modal con detalles
    console.log('Mostrar detalles:', product);
  };

  const handleBack = () => {
    navigate('/wellkitt');
  };

  return (
    <div className="w-full bg-white p-3 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl lg:mt-20 mt-12 sm:mt-16">
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver a Wellkitt</span>
        </button>
        
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">Carrito</span>
        </div>
      </div>

      {/* Título de la categoría */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            {React.createElement(categoryInfo.icon, { 
              className: "w-8 h-8 text-blue-600"
            })}
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {category === 'all' ? 'Todos los Productos' : (categoryInfo as any).name || category}
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          {sortedProducts.length} productos disponibles
        </p>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'brand')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Nombre</option>
            <option value="brand">Marca</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-600">
          Mostrando {sortedProducts.length} de {baseProducts.length} productos
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onShowDetails={() => handleShowDetails(product)}
          />
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay productos disponibles</h3>
          <p className="text-gray-600 mb-4">No se encontraron productos en esta categoría.</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Todos los Productos
          </button>
        </div>
      )}
    </div>
  );
};

const WellkittCategoryWithCart: React.FC = () => {
  return (
    <CartProvider>
      <WellkittCategory />
    </CartProvider>
  );
};

export default WellkittCategoryWithCart;
