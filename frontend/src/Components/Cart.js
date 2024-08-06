// src/components/Cart.js
import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Cart = () => {
  const { cartItems, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, calculateTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    navigate('/checkout', { state: { totalAmount } });
  };

  return (
    <div className="cart">
      <Navbar />
      <h1 className='mt-24 ml-4 mr-4 text-center font-bold text-3xl bg-orange-500 p-3 rounded-lg text-white'>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Sr No#</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Product Image</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{item.title}</td>
                <td className="border px-4 py-2 text-center">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
                </td>
                <td className="border px-4 py-2 text-center">${item.price}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <button onClick={() => handleDecreaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-2 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-2 rounded">+</button>
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 className="text-right mr-4 mt-4">Total: ${calculateTotal().toFixed(2)}</h3>
      {cartItems.length > 0 && (
        <div className="text-right mr-4 mt-4">
          <button onClick={handleCheckout} className="bg-orange-500 text-white px-4 py-2 rounded">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
