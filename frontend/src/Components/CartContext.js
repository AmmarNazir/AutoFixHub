// src/components/CartContext.js
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingProductIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingProductIndex >= 0) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingProductIndex].quantity += product.quantity;
        return updatedCartItems;
      } else {
        return [...prevItems, product];
      }
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
