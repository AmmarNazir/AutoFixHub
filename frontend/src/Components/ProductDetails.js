import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Correct import
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart(); // Use context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const onAddToCart = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    const cartProduct = { ...product, quantity };
    handleAddToCart(cartProduct);
    navigate("/cart"); // Redirect to cart page
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded overflow-hidden p-8 mt-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side - Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={`http://localhost:3000${product.image}`}
              alt={product.title}
              className="object-cover mx-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Right Side - Product Details and Actions */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-8">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <h2 className="text-lg font-semibold mb-2">Price:</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <h2 className="text-lg font-semibold mb-2">Description:</h2>
            <p className="text-gray-800 mb-6">{product.description}</p>
            <div className="flex items-center mb-6">
              <label className="mr-4 font-semibold">Quantity:</label>
              <input
                type="number"
                style={{ border: "1px solid black" }}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                className="w-16 text-center"
              />
            </div>
            <button
              onClick={onAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 mt-4 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default ProductDetails;
