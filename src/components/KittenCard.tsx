import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';

interface KittenCardProps {
  kitten: Kitten;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Adding to cart:', kitten.name);
    addToCart(kitten);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={kitten.image} 
          alt={kitten.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        {kitten.vaccinated && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Vacunado
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{kitten.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.8</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{kitten.breed}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{kitten.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs text-gray-500">
            <span className="block">{kitten.age} meses</span>
            <span className="block capitalize">{kitten.gender === 'male' ? 'Macho' : 'Hembra'}</span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="block">Color: {kitten.color}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${kitten.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Adoptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default KittenCard;