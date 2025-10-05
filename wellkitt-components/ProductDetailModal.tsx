import React from 'react';
import { X, ShoppingCart, Star, Package, Shield, Clock, AlertTriangle, Activity, Droplets } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 product-name">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">{product.brand}</span>
          </div>

          {/* Presentation */}
          {product.presentation && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Presentación: </span>
              <span className="text-sm text-gray-900 product-description">{product.presentation}</span>
            </div>
          )}

          {/* Dosage and Usage */}
          {(product.dosage || product.usage) && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Instrucciones de Uso
              </h3>
              {product.dosage && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-700">Dosis: </span>
                  <span className="text-sm text-blue-900 dosage-info">{product.dosage}</span>
                </div>
              )}
              {product.usage && (
                <div>
                  <span className="text-xs font-medium text-blue-700">Modo de uso: </span>
                  <span className="text-sm text-blue-900 dosage-info">{product.usage}</span>
                </div>
              )}
            </div>
          )}

          {/* Systems */}
          {product.systems && product.systems.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Sistemas que Beneficia
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.systems.map((system, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs capitalize"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contraindications */}
          {product.contraindications && product.contraindications.length > 0 && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Precauciones
              </h3>
              <ul className="space-y-1">
                {product.contraindications.map((contraindication, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start gap-2 warning-text">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{contraindication}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-green-600" />
              Ingredientes Activos
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Beneficios Principales
            </h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Category */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              {product.category}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/525579076626?text=Hola, tengo una consulta sobre el producto ${product.name} (${product.brand})`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.21-.624-5.96-1.8l-.426-.27-4.65 1.22 1.24-4.53-.277-.44A9.93 9.93 0 0 1 6.083 15c0-5.478 4.44-9.917 9.917-9.917S25.917 9.522 25.917 15 21.478 25.917 16 25.917zm5.44-7.26c-.297-.148-1.76-.867-2.033-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.457.13-.604.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.148-.669-1.612-.916-2.21-.242-.58-.487-.502-.669-.511-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.463 1.065 2.877 1.213 3.075.148.198 2.099 3.205 5.086 4.37.712.307 1.267.49 1.7.627.714.227 1.364.195 1.877.118.573-.085 1.76-.719 2.008-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
