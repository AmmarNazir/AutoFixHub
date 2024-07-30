import React, { useState } from "react";
import { FaCartPlus, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo1 from "../Assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black bg-opacity-50 shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div
        className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8"
        style={{ height: "50px" }}
      >
        <div className="flex items-center">
          <a href="/">
            <img
              src={logo1}
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12"
              style={{ height: "110px", width: "110px" }}
            />
          </a>
          <h1 className="text-orange-500 ml-3 text-lg sm:text-2xl font-bold font-mono">
            AutoFixHub
          </h1>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul
          className={`flex-col sm:flex-row sm:flex items-center space-x-4 sm:space-x-4 absolute sm:static bg-black bg-opacity-50 sm:bg-transparent w-full sm:w-auto left-0 sm:left-auto top-16 sm:top-auto transition-transform transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } sm:transform-none`}
        >
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/services" className="text-white hover:text-orange-300">
              Services
            </a>
          </li>
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/car-parts" className="text-white hover:text-orange-300">
              Car Parts
            </a>
          </li>
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/about-us" className="text-white hover:text-orange-300">
              About Us
            </a>
          </li>
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/contact" className="text-white hover:text-orange-300">
              Contact
            </a>
          </li>
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/profile" className="text-white hover:text-orange-300">
              <FaUserCircle size={24} />
            </a>
          </li>
          <li className="sm:mx-0 mx-2 my-2 sm:my-0">
            <a href="/cart" className="text-white hover:text-orange-300">
              <FaCartPlus size={24} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
