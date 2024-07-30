// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Services from "./Components/Services";
import CarParts from "./Components/CarParts";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/services" element={isLoggedIn ? <Services /> : <Navigate to="/login" />} />
            <Route path="/car-parts" element={isLoggedIn ? <CarParts /> : <Navigate to="/login" />} />
            <Route path="/about-us" element={isLoggedIn ? <AboutUs /> : <Navigate to="/login" />} />
            <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
            <Route path="/product/:id" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
