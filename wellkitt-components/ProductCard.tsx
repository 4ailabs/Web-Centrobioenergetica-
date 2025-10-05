
import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
  const config = categoryConfig[product.category];
  const Icon = config?.icon;
  const { addItem } = useCart();

  // Colores por categoría
  const categoryColors: { [key: string]: string } = {
    'Vitaminas': 'bg-blue-50 border-blue-300 border-2',
    'Minerales': 'bg-green-50 border-green-300 border-2',
    'Proteínas': 'bg-purple-50 border-purple-300 border-2',
    'Antioxidantes': 'bg-red-50 border-red-300 border-2',
    'Omega': 'bg-yellow-50 border-yellow-300 border-2',
    'Prebióticos': 'bg-pink-50 border-pink-300 border-2',
    'Enzimas': 'bg-indigo-50 border-indigo-300 border-2',
    'Plantas': 'bg-emerald-50 border-emerald-300 border-2'
  };

  const cardColor = categoryColors[product.category] || 'bg-gray-50 border-gray-300 border-2';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      className={`${cardColor} rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full min-h-[280px] md:min-h-[420px]`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-3 md:p-7 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 ${config?.bgClass || 'bg-gray-100'} rounded-full`}>
                {Icon ? <Icon className={`w-4 h-4 md:w-7 md:h-7 ${config.colorClass}`} /> : <div className="w-4 h-4 md:w-7 md:h-7"></div>}
            </div>
            <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 md:px-3 py-1 rounded-full">
                {product.brand}
            </div>
        </div>
        <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-2 product-name">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className={`${config?.bgClass || 'bg-gray-100'} ${config?.colorClass || 'text-gray-700'} text-xs font-semibold px-2 py-1 rounded-full`}>
            {product.category}
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-500">{product.brand}</span>
        </div>
        
        {product.presentation && (
          <div className="mb-2 md:mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Presentación:</h4>
            <p className="text-xs md:text-sm text-slate-700 product-description">{product.presentation}</p>
          </div>
        )}

        <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Beneficios:</h4>
            <ul className="text-xs md:text-sm text-slate-700 space-y-0.5 md:space-y-1">
                {product.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="line-clamp-1">{benefit}</span>
                    </li>
                ))}
                {product.benefits.length > 3 && (
                    <li className="text-slate-500 text-xs font-medium">+{product.benefits.length - 3} beneficios más...</li>
                )}
            </ul>
        </div>

        <div className="space-y-1 mb-2 md:mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ingredientes Principales:</h4>
            <div className="flex flex-wrap gap-1">
                {product.ingredients.slice(0, 3).map((ingredient, index) => (
                    <span key={index} className={`${config?.bgClass || 'bg-gray-100'} ${config?.colorClass || 'text-gray-700'} text-xs px-2 py-1 rounded-full`}>
                        {ingredient}
                    </span>
                ))}
                {product.ingredients.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        +{product.ingredients.length - 3}
                    </span>
                )}
            </div>
        </div>

      </div>
       <div className={`p-3 md:p-6 bg-white/50 border-t ${cardColor.split(' ')[1]} mt-auto`}>
        <div className="flex gap-2">
          <motion.button
              onClick={onShowDetails}
              whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-slate-800 border border-slate-300 text-xs md:text-base font-medium py-2.5 md:py-2.5 px-2 md:px-4 rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 tracking-wide"
            >
            Ver Detalles
          </motion.button>
          <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-green-600 text-white border border-brand-green-600 text-xs md:text-base font-medium py-2.5 md:py-2.5 px-2 md:px-4 rounded-lg shadow-sm hover:bg-brand-green-700 hover:border-brand-green-700 transition-all duration-200 tracking-wide flex items-center justify-center"
            >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
