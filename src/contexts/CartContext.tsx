import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Kitten } from '../types/kitten';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (kittenId: string) => void;
  updateQuantity: (kittenId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        toast.success(`${kitten.name} ya está en el carrito`);
        return prevItems.map(item =>
          item.kitten.id === kitten.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${kitten.name} agregado al carrito`);
        return [...prevItems, { kitten, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (kittenId: string) => {
    console.log('Removing kitten from cart:', kittenId);
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.kitten.id === kittenId);
      if (item) {
        toast.success(`${item.kitten.name} eliminado del carrito`);
      }
      return prevItems.filter(item => item.kitten.id !== kittenId);
    });
  };

  const updateQuantity = (kittenId: string, quantity: number) => {
    console.log('Updating quantity for kitten:', kittenId, 'to:', quantity);
    if (quantity <= 0) {
      removeFromCart(kittenId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.kitten.id === kittenId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
    toast.success('Carrito vaciado');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};