
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
    'Vitaminas': 'bg-blue-500/5 border-blue-500/20 dark:bg-blue-500/10',
    'Minerales': 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-500/10',
    'Proteínas': 'bg-purple-500/5 border-purple-500/20 dark:bg-purple-500/10',
    'Antioxidantes': 'bg-red-500/5 border-red-500/20 dark:bg-red-500/10',
    'Omega': 'bg-amber-500/5 border-amber-500/20 dark:bg-amber-500/10',
    'Prebióticos': 'bg-pink-500/5 border-pink-500/20 dark:bg-pink-500/10',
    'Enzimas': 'bg-indigo-500/5 border-indigo-500/20 dark:bg-indigo-500/10',
    'Plantas': 'bg-teal-500/5 border-teal-500/20 dark:bg-teal-500/10'
  };

  const cardColor = categoryColors[product.category] || 'bg-[var(--bg-main)] border-[var(--border-color)]';

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
          <div className={`p-1.5 md:p-3 ${config?.bgClass || 'bg-primary-600/10'} rounded-2xl border border-primary-600/10 shadow-inner`}>
            {Icon ? <Icon className={`w-4 h-4 md:w-7 md:h-7 ${config.colorClass}`} /> : <div className="w-4 h-4 md:w-7 md:h-7"></div>}
          </div>
          <div className="bg-[var(--bg-main)] text-primary-600 text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full border border-[var(--border-color)] uppercase tracking-widest">
            {product.brand}
          </div>
        </div>
        <h3 className="text-sm md:text-xl font-black text-[var(--text-main)] mb-2 uppercase tracking-tight leading-tight">{product.name}</h3>

        <div className="flex items-center gap-2 mb-4">
          <span className={`${config?.bgClass || 'bg-primary-600/10'} ${config?.colorClass || 'text-primary-600'} text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary-600/20`}>
            {product.category}
          </span>
          <span className="text-xs text-[var(--text-muted)] opacity-30">•</span>
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{product.brand}</span>
        </div>

        {product.presentation && (
          <div className="mb-4">
            <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1.5">Presentación:</h4>
            <p className="text-xs md:text-sm text-[var(--text-main)] font-medium leading-relaxed">{product.presentation}</p>
          </div>
        )}

        <div className="space-y-1 md:space-y-2 mb-4">
          <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1.5">Beneficios:</h4>
          <ul className="text-xs md:text-sm text-[var(--text-muted)] space-y-1 font-medium leading-relaxed">
            {product.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-green-500 mt-1">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
            {product.benefits.length > 3 && (
              <li className="text-primary-600 text-[10px] font-black uppercase tracking-widest mt-2 cursor-pointer hover:underline">+{product.benefits.length - 3} beneficios más...</li>
            )}
          </ul>
        </div>

        <div className="space-y-1 mb-4">
          <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1.5">Ingredientes:</h4>
          <div className="flex flex-wrap gap-1">
            {product.ingredients.slice(0, 3).map((ingredient, index) => (
              <span key={index} className={`${config?.bgClass || 'bg-primary-600/10'} ${config?.colorClass || 'text-primary-600'} text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-primary-600/10`}>
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="bg-[var(--bg-main)] text-[var(--text-muted)] text-[8px] px-2 py-1 rounded-lg font-black uppercase border border-[var(--border-color)]">
                +{product.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

      </div>
      <div className={`p-4 md:p-6 bg-[var(--bg-main)]/50 border-t border-[var(--border-color)] mt-auto`}>
        <div className="flex gap-3">
          <motion.button
            onClick={onShowDetails}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--text-main)', color: 'var(--bg-main)' }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] text-[10px] md:text-sm font-black py-3 px-4 rounded-xl shadow-sm transition-all duration-300 uppercase tracking-widest hover:border-primary-600"
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
