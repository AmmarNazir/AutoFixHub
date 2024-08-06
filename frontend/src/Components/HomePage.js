// src/components/HomePage.js
import React from "react";
import Navbar from "./Navbar";
import BackgroundSection from "./BackgroundSection";
import CardsSection from "./CardsSection";
import DescriptionSection from "./DescriptionSection";
import FooterSection from "./FooterSection";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './CartContext';

const HomePage = () => {
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const featuredProducts = [
    { id: 1, title: 'Product Title 1', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product Title 2', price: 29.99, image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Product Title 3', price: 39.99, image: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Product Title 4', price: 49.99, image: 'https://via.placeholder.com/300' },
  ];

  const onAddToCart = (product) => {
    handleAddToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  return (
    <div>
      <Navbar />
      <BackgroundSection />
      <CardsSection />
      <DescriptionSection />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="flex flex-wrap justify-center mb-4">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/car-parts" className="text-orange-500 hover:text-orange-700 text-lg font-bold">
            Browse More
          </Link>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default HomePage;
