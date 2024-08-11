// Navbar.js
import React, { useState, useEffect } from "react";
import { FaCartPlus, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo1 from "../Assets/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.profileImage) {
          const imageUrl = `http://localhost:3000${res.data.profileImage}`;
          setProfileImage(imageUrl);
        }
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-black bg-opacity-50 shadow-md p-2 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo and Company Name */}
        <div className="flex items-center">
          <a href="/">
            <img
              src={logo1}
              alt="Logo"
              className="h-14 w-14 sm:h-16 sm:w-16"
            />
          </a>
          <h1 className="text-orange-500 ml-3 text-lg sm:text-2xl font-bold font-mono hidden lg:block">
            AutoFixHub
          </h1>
        </div>

        {/* Center: Profile Image and Username */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="User Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={24} className="text-gray-500" />
          )}
          <span className="text-white ml-2 text-lg font-semibold hidden lg:block">
            {username}
          </span>
        </div>

        {/* Right: Nav Links and Cart Icon */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex space-x-4">
            <a href="/services" className="text-white hover:text-orange-300">
              Services
            </a>
            <a href="/car-parts" className="text-white hover:text-orange-300">
              Car Parts
            </a>
            <a href="/about-us" className="text-white hover:text-orange-300">
              About Us
            </a>
            <a href="/contact" className="text-white hover:text-orange-300">
              Contact
            </a>
          </div>
          <a href="/cart" className="text-white hover:text-orange-300">
            <FaCartPlus size={24} />
          </a>
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Menu for Small Screens */}
      {isOpen && (
        <ul className="sm:hidden bg-black bg-opacity-90 p-4">
          <li className="mb-2">
            <a href="/services" className="text-white hover:text-orange-300 block">
              Services
            </a>
          </li>
          <li className="mb-2">
            <a href="/car-parts" className="text-white hover:text-orange-300 block">
              Car Parts
            </a>
          </li>
          <li className="mb-2">
            <a href="/about-us" className="text-white hover:text-orange-300 block">
              About Us
            </a>
          </li>
          <li className="mb-2">
            <a href="/contact" className="text-white hover:text-orange-300 block">
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
