import React from 'react';
import { WellkittIcon, ArrowRightIcon } from '../components/Icons';

const Wellkitt: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Kit de Biomagnetismo',
      description: 'Set completo con imanes terapéuticos para sesiones de biomagnetismo en casa.',
      price: '$299 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Terapéutico',
    },
    {
      id: 2,
      name: 'Esencias Florales de Bach',
      description: 'Colección completa de 38 esencias florales para el equilibrio emocional.',
      price: '$450 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Esencias',
    },
    {
      id: 3,
      name: 'Set de Auriculoterapia',
      description: 'Kit profesional con semillas y herramientas para terapia auricular.',
      price: '$180 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Terapéutico',
    },
    {
      id: 4,
      name: 'Muñecos Terapéuticos',
      description: 'Colección de muñecos especializados para terapia de muñecos y playmobil.',
      price: '$320 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Terapéutico',
    },
    {
      id: 5,
      name: 'Kit de Sandplay',
      description: 'Set completo con bandeja, arena y figuras para terapia de sandplay.',
      price: '$280 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Terapéutico',
    },
    {
      id: 6,
      name: 'Vitaminas y Minerales',
      description: 'Suplementos naturales para el equilibrio energético y la salud integral.',
      price: '$150 MXN',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Suplementos',
    },
  ];

  const categories = ['Todos', 'Terapéutico', 'Esencias', 'Suplementos'];

  return (
    <div className="w-full bg-white p-4 lg:p-8 rounded-3xl lg:mt-20 mt-16">
      <header className="mb-8 lg:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <WellkittIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-black">Wellkitt</h1>
        </div>
        <p className="text-base lg:text-lg text-gray-500">
          Tienda especializada en productos para el bienestar energético y terapias alternativas
        </p>
      </header>

      {/* Filtros de Categorías */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'Todos'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-12">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
            <div className="h-48 lg:h-56 relative">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                  Agregar al Carrito
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Información */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">Envíos y Garantía</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Envío Gratis</h3>
            <p className="text-sm text-gray-600">En compras mayores a $500 MXN</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Garantía 30 días</h3>
            <p className="text-sm text-gray-600">Devolución sin preguntas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Calidad Premium</h3>
            <p className="text-sm text-gray-600">Productos certificados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellkitt;
