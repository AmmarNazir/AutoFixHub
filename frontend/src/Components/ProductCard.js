// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, image }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white shadow-md rounded overflow-hidden">
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        </Link>
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{price}</p>
          <button className="mt-2 bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
