import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import HomePage from "./Components/HomePage";
import Services from "./Components/Services";
import CarParts from "./Components/CarParts";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import AppointmentForm from "./Components/AppointmentForm";
import Profile from "./Components/Profile";
import Sidebar from "./Components/Admin/sidebar";
import Checkout from "./Components/Checkout";
import Dashboard from "./Components/Admin/Dashboard";
import MechanicDashboard from "./Components/Mechanic/Dashboard"; // Import mechanic dashboard
import AdminAppointments from "./Components/Admin/adminAppointments"; // Import the AdminAppointments component
import AdminUsers from "./Components/Admin/adminUsers"; // Import the AdminUsers component
import AdminOrders from "./Components/Admin/adminOrders";
import AdminServices from "./Components/Admin/adminServices";
import AdminProducts from "./Components/Admin/adminProducts";

import { CartProvider } from "./Components/CartContext";

function RequireAuth({ children, isAdmin, isMechanic }) {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Check if the user is an admin and trying to access an admin route
  if (isAdmin && location.pathname.startsWith("/admin")) {
    return children;
  }

  // Check if the user is a mechanic and trying to access a mechanic route
  if (isMechanic && location.pathname.startsWith("/mechanic")) {
    return children;
  }

  // Redirect admins and mechanics to their respective dashboards if they are trying to access non-admin/mechanic routes
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (isMechanic) {
    return <Navigate to="/mechanic/dashboard" />;
  }

  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMechanic, setIsMechanic] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");

  const handleProfileImageUpdate = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")) || false);
      setIsMechanic(JSON.parse(localStorage.getItem("isMechanic")) || false);
    };

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setUsername(response.data.username);
          if (response.data.profileImage) {
            setProfileImage(
              `http://localhost:3000${response.data.profileImage}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="App">
          {isLoggedIn && (isAdmin || isMechanic) && (
            <Sidebar profileImage={profileImage} username={username} />
          )}
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/car-parts" element={<CarParts />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <RequireAuth isAdmin={isAdmin} isMechanic={isMechanic}>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route
              path="/appointmentForm"
              element={
                <RequireAuth isAdmin={isAdmin} isMechanic={isMechanic}>
                  <AppointmentForm />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth isAdmin={isAdmin} isMechanic={isMechanic}>
                  <Profile onProfileImageUpdate={handleProfileImageUpdate} />
                </RequireAuth>
              }
            />
            <Route
              path="/checkout"
              element={
                <RequireAuth isAdmin={isAdmin} isMechanic={isMechanic}>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth isAdmin={isAdmin}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <RequireAuth isAdmin={isAdmin}>
                  <AdminAppointments />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAuth isAdmin={isAdmin}>
                  <AdminUsers />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <RequireAuth isAdmin={isAdmin}>
                  <AdminOrders />
                </RequireAuth>
              }
            />
            <Route
              path="/mechanic/dashboard"
              element={
                <RequireAuth isMechanic={isMechanic}>
                  <MechanicDashboard />
                </RequireAuth>
              }
            />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/products" element={<AdminProducts />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
