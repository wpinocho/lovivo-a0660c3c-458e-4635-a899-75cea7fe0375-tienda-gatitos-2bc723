import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import KittenCard from '../components/KittenCard';
import Cart from '../components/Cart';
import Filters from '../components/Filters';
import { kittens } from '../data/kittens';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  console.log('Index component rendered');
  console.log('Current filters:', { searchTerm, selectedBreed, selectedGender, priceRange });

  const breeds = useMemo(() => {
    return Array.from(new Set(kittens.map(kitten => kitten.breed)));
  }, []);

  const filteredKittens = useMemo(() => {
    return kittens.filter(kitten => {
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = !selectedBreed || kitten.breed === selectedBreed;
      const matchesGender = !selectedGender || kitten.gender === selectedGender;
      const matchesPrice = kitten.price >= priceRange[0] && kitten.price <= priceRange[1];
      
      return matchesSearch && matchesBreed && matchesGender && matchesPrice;
    });
  }, [searchTerm, selectedBreed, selectedGender, priceRange]);

  console.log('Filtered kittens count:', filteredKittens.length);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Encuentra tu Compañero Perfecto
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre gatitos adorables esperando un hogar lleno de amor. 
              Cada uno de nuestros gatitos está vacunado y listo para ser parte de tu familia.
            </p>
          </div>

          <Filters 
            breeds={breeds}
            selectedBreed={selectedBreed}
            onBreedChange={setSelectedBreed}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
          />

          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredKittens.length} gatito{filteredKittens.length !== 1 ? 's' : ''} disponible{filteredKittens.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredKittens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😿</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No se encontraron gatitos
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus filtros para ver más opciones
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKittens.map((kitten) => (
                <KittenCard key={kitten.id} kitten={kitten} />
              ))}
            </div>
          )}
        </main>

        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="text-3xl mb-4">🐱</div>
            <h3 className="text-xl font-semibold mb-2">Gatitos Adorables</h3>
            <p className="text-gray-400 mb-4">
              Conectando gatitos con familias amorosas desde 2024
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <span>Todos los gatitos están vacunados</span>
              <span>•</span>
              <span>Garantía de salud</span>
              <span>•</span>
              <span>Soporte 24/7</span>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;