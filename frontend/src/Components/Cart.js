// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Import CartContext
import Navbar from './Navbar';

const Cart = () => {
  const { cartItems, handleRemoveFromCart, calculateTotal } = useContext(CartContext); // Use context

  return (
    <div className="cart">
      <Navbar/>
      <h1 className='mt-24 ml-4 mr-4 text-center font-bold text-3xl bg-orange-500 p-3 rounded-lg text-white'>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              <span>${item.price}</span>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
