// src/components/CarParts.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSection from './FooterSection';
import { useCart } from './CartContext';

const CarParts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    { id: 1, title: 'Product Title 1', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product Title 2', price: 29.99, image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Product Title 3', price: 39.99, image: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Product Title 4', price: 49.99, image: 'https://via.placeholder.com/300' },
    { id: 5, title: 'Product Title 5', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 6, title: 'Product Title 6', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 7, title: 'Product Title 7', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 8, title: 'Product Title 8', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Product Title 9', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 10, title: 'Product Title 10', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 11, title: 'Product Title 11', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 12, title: 'Product Title 12', price: 19.99, image: 'https://via.placeholder.com/300' },
  ];

  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const onAddToCart = (product) => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { state: { from: '/car-parts' } });
      return;
    }
    const cartProduct = { ...product, quantity: 1 };
    handleAddToCart(cartProduct);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto pt-20">
      <Navbar />
      <h1 className="text-3xl font-bold m-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
        Car Parts
      </h1>
      <p className="text-lg mb-8 text-center font-bold">
        At AutoFixHub, we provide the best quality auto parts at good rates.
      </p>
      <div className="flex flex-wrap justify-center mb-4">
        {products.map(product => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-white shadow-md rounded overflow-hidden">
              <a href={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
              </a>
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <button
                  className="mt-2 bg-transparent rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded transition duration-300"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FooterSection />
    </div>
  );
};

export default CarParts;
