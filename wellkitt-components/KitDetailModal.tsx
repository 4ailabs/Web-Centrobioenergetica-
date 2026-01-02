import React from 'react';
import { Kit, Product } from '../types';
import { X, Tag, List, CheckCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface KitDetailModalProps {
  kit: Kit | null;
  allProducts: Product[];
  onClose: () => void;
}

const KitDetailModal: React.FC<KitDetailModalProps> = ({ kit, allProducts, onClose }) => {
  const { addItem } = useCart();

  if (!kit) return null;

  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];

  const handleAddKitToCart = () => {
    kitProducts.forEach(product => {
      addItem(product);
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[var(--panel-bg)] backdrop-blur-md rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 border border-[var(--border-color)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-600/10 rounded-full p-2 transition-colors z-10 border border-transparent hover:border-primary-600/20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6 sm:p-8">
            <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-main)] mb-3 uppercase tracking-tight">
              {kit.name}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-primary-600/10 text-primary-600 border border-primary-600/20 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {kit.discount}% de descuento
              </span>
              <span className="bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-color)] rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                {kitProducts.length} productos incluidos
              </span>
            </div>

            <p className="text-[var(--text-muted)] mb-8 text-lg font-medium leading-relaxed">{kit.benefit}</p>

            <div className="bg-[var(--bg-main)] rounded-2xl p-6 mb-8 border border-[var(--border-color)]">
              <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3">Problema que soluciona:</h4>
              <p className="text-[var(--text-main)] font-medium leading-relaxed">{kit.problem}</p>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <List className="w-5 h-5 text-green-600" />
                Productos Incluidos en este Kit
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {kitProducts.map(product => (
                  <div key={product.id} className="bg-[var(--bg-main)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm hover:border-primary-600/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <h5 className="font-black text-[var(--text-main)] text-base uppercase tracking-tight">{product.name}</h5>
                      <span className="bg-primary-600/10 text-primary-600 border border-primary-600/20 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                        {product.category}
                      </span>
                    </div>

                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-4">{product.brand}</p>

                    {product.presentation && (
                      <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-4 bg-[var(--panel-bg)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                        {product.presentation}
                      </p>
                    )}

                    <div className="space-y-2">
                      <h6 className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Beneficios:
                      </h6>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                        {product.benefits.length > 2 && (
                          <li className="text-gray-500">+{product.benefits.length - 2} beneficios más</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddKitToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar Kit al Carrito
              </button>

              <a
                href={`https://wa.me/525579076626?text=${encodeURIComponent(`Hola, quiero más información sobre el kit "${kit.name}" que incluye: ${kitProducts.map(p => p.name).join(', ')}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors duration-200 shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.21-.624-5.96-1.8l-.426-.27-4.65 1.22 1.24-4.53-.277-.44A9.93 9.93 0 0 1 6.083 15c0-5.478 4.44-9.917 9.917-9.917S25.917 9.522 25.917 15 21.478 25.917 16 25.917zm5.44-7.26c-.297-.148-1.76-.867-2.033-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.457.13-.604.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.148-.669-1.612-.916-2.21-.242-.58-.487-.502-.669-.511-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.463 1.065 2.877 1.213 3.075.148.198 2.099 3.205 5.086 4.37.712.307 1.267.49 1.7.627.714.227 1.364.195 1.877.118.573-.085 1.76-.719 2.008-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitDetailModal;
