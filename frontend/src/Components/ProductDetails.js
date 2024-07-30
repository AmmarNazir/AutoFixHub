// src/components/ProductDetails.js
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import CartContext
import Navbar from './Navbar';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useContext(CartContext); // Use context
  const product = {
    id,
    title: 'Product Title',
    price: 19.99, // Change price to a number
    description: 'Product description',
    image: 'https://via.placeholder.com/300',
  };

  const onAddToCart = () => {
    const cartProduct = { ...product, quantity };
    handleAddToCart(cartProduct);
  };

  return (
    <div className="container mx-auto pt-20">
      <Navbar/>
      <div className="bg-white shadow-md rounded overflow-hidden p-4">
        <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-800">{product.description}</p>
          <div>
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          </div>
          <button onClick={onAddToCart} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
