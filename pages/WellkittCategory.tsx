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
    <div className="w-full bg-[var(--panel-bg)] p-3 sm:p-6 lg:p-8 rounded-[2.5rem] lg:mt-20 mt-12 sm:mt-16 border border-[var(--border-color)]">
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-main)] hover:bg-primary-600 hover:text-white rounded-2xl transition-all border border-[var(--border-color)] shadow-sm font-black text-[10px] uppercase tracking-widest active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Wellkitt
        </button>

        <div className="flex items-center gap-3 bg-[var(--bg-main)] px-5 py-3 rounded-2xl border border-[var(--border-color)]">
          <ShoppingCart className="w-4 h-4 text-primary-600" />
          <span className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest">Carrito</span>
        </div>
      </div>

      {/* Título de la categoría */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary-600/10 rounded-3xl flex items-center justify-center border border-primary-600/20 shadow-xl">
            {React.createElement(categoryInfo.icon, {
              className: "w-10 h-10 text-primary-600"
            })}
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">
          {category === 'all' ? 'Todos los Productos' : (categoryInfo as any).name || category}
        </h1>
        <p className="text-sm lg:text-lg text-[var(--text-muted)] font-medium">
          {sortedProducts.length} productos disponibles en esta sección
        </p>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 px-1">
        <div className="flex items-center gap-4 bg-[var(--bg-main)] p-2 rounded-2xl border border-[var(--border-color)]">
          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-3">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'brand')}
            className="px-4 py-2 bg-[var(--panel-bg)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary-600 transition-all cursor-pointer"
          >
            <option value="name">Nombre</option>
            <option value="brand">Marca</option>
          </select>
        </div>

        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-main)] px-4 py-2 rounded-xl border border-[var(--border-color)]">
          Mostrando {sortedProducts.length} de {baseProducts.length} productos
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-8">
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
        <div className="text-center py-20 bg-[var(--bg-main)] rounded-[2.5rem] border border-[var(--border-color)] border-dashed">
          <div className="w-20 h-20 bg-[var(--panel-bg)] rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[var(--border-color)] shadow-xl">
            <Filter className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">No hay productos</h3>
          <p className="text-[var(--text-muted)] mb-8 font-medium">No se encontraron productos en esta categoría actualmente.</p>
          <button
            onClick={handleBack}
            className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-95"
          >
            Ver catálogo completo
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
