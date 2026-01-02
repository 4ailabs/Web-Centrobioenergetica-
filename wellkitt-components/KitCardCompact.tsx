import React from 'react';
import { Kit, Product } from '../types';
import { ShieldCheck, Soup, Moon, Zap, HeartPulse, Bone, Shield, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface KitCardCompactProps {
  kit: Kit;
  allProducts: Product[];
  onShowDetails: () => void;
}

const kitIcons: { [key: string]: React.ReactNode } = {
  K01: <ShieldCheck className="w-4 h-4 text-green-600" />,
  K02: <Soup className="w-4 h-4 text-green-600" />,
  K03: <Moon className="w-4 h-4 text-green-600" />,
  K04: <Zap className="w-4 h-4 text-green-600" />,
  K05: <HeartPulse className="w-4 h-4 text-green-600" />,
  K06: <Bone className="w-4 h-4 text-green-600" />,
  K07: <Shield className="w-4 h-4 text-green-600" />,
  K08: <Gauge className="w-4 h-4 text-green-600" />,
};

// Paleta de colores para cada kit
const kitColors: { [key: string]: { bg: string; icon: string } } = {
  K01: { bg: 'bg-green-50', icon: 'text-green-600' },
  K02: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  K03: { bg: 'bg-purple-50', icon: 'text-purple-600' },
  K04: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  K05: { bg: 'bg-pink-50', icon: 'text-pink-600' },
  K06: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  K07: { bg: 'bg-teal-50', icon: 'text-teal-600' },
  K08: { bg: 'bg-lime-50', icon: 'text-lime-600' },
};

const KitCardCompact: React.FC<KitCardCompactProps> = ({ kit, allProducts, onShowDetails }) => {
  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
  const color = kitColors[kit.id] || { bg: 'bg-white', icon: 'text-green-600' };
  const { addItem } = useCart();

  const handleAddKitToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    kitProducts.forEach(product => {
      addItem(product);
    });
  };

  return (
    <motion.div
      className={`${color.bg} border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[200px] cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onShowDetails}
    >
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {kitIcons[kit.id] || <div className="w-5 h-5"></div>}
          </div>
          <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {kit.discount}% OFF
          </div>
        </div>
        
        <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight product-name">
          {kit.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {kit.benefit}
        </p>
      </div>
      
      <div className="p-3 bg-gray-50/70 border-t border-gray-100">
        <button
          onClick={handleAddKitToCart}
          className="w-full bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <span>Agregar</span>
        </button>
      </div>
    </motion.div>
  );
};

export default KitCardCompact;
