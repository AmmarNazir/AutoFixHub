// src/components/ProductDetails.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Correct import
import Navbar from './Navbar';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart(); // Use context

  const product = {
    id,
    title: 'Product Title',
    price: 19.99,
    description: 'Product description',
    image: 'https://via.placeholder.com/300',
  };

  const onAddToCart = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    const cartProduct = { ...product, quantity };
    handleAddToCart(cartProduct);
    navigate('/cart'); // Redirect to cart page
  };

  return (
    <div className="container mx-auto pt-20">
      <Navbar />
      <div className="bg-white shadow-md rounded overflow-hidden p-4">
        <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-800">{product.description}</p>
          <div>
            <label>Quantity: </label>
            <input
              type="number"
              style={{ border: '1px solid black' }}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <button
            onClick={onAddToCart}
            className="bg-white-500 hover:bg-orange-500 hover:text-white text-orange-500 font-bold py-2 px-4 mt-4 rounded-full"
            style={{ border: '2px solid orange' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
