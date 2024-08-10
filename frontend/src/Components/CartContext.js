import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingProductIndex >= 0) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingProductIndex].quantity += product.quantity || 1;
        return updatedCartItems;
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);  // Clear the cartItems state
    localStorage.removeItem('cartItems');  // Remove cartItems from localStorage
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, calculateTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
