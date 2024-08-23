import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import { useCart } from "./CartContext";

const CarParts = () => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts(); // Fetch products on component mount
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products"); // Fetch products from your backend
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onAddToCart = (product) => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login", { state: { from: "/car-parts" } });
      return;
    }
    const cartProduct = { ...product, quantity: 1 };
    handleAddToCart(cartProduct);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto pt-20">
      <Navbar />
      <h1 className="text-3xl font-bold mt-8 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
        Car Parts
      </h1>
      <p className="text-lg mb-8 text-center font-bold">
        At AutoFixHub, we provide the best quality auto parts at good rates.
      </p>
      <div className="flex flex-wrap justify-center mb-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div className="bg-white shadow-md rounded overflow-hidden">
              <a href={`/product/${product._id}`}>
                <img
                  src={`http://localhost:3000${product.image}`}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
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
