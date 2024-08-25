import React, { useState } from "react";
import {
  FaUserCircle,
  FaUsers,
  FaCalendarCheck,
  FaShoppingCart,
  FaAngleDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ profileImage, username }) => {
  const [isAppointmentsDropdownOpen, setIsAppointmentsDropdownOpen] =
    useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);

  const toggleAppointmentsDropdown = () => {
    setIsAppointmentsDropdownOpen(!isAppointmentsDropdownOpen);
  };

  const toggleOrdersDropdown = () => {
    setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
  };

  return (
    <div className="w-52 bg-gray-200 text-gray-800 flex flex-col items-center py-6 shadow-lg">
      {/* Brand Name */}

      <Link to="/admin/Dashboard">
        <div className="text-orange-500 text-2xl font-bold mb-4 font-sans-serif shadow-md p-2 rounded-lg">
          AutoFixHub
        </div>
      </Link>

      {/* Profile Section */}
      <Link
        to="/profile"
        className="flex flex-col items-center p-4 w-full mb-6"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <FaUserCircle size={96} className="text-gray-500 mb-2" />
        )}
        <span className="text-sm font-semibold">
          {username || "Admin Name"}
        </span>
      </Link>

      {/* Navigation Links Section */}
      <div className="flex-1 w-full flex flex-col ml-2 justify-start items-end pr-2 space-y-2">
        <Link
          to="/admin/users"
          className="flex items-center w-full p-2 text-gray-700 hover:text-white hover:bg-orange-500 justify-start rounded-lg text-md font-bold"
        >
          <span className="mr-2">Users</span>
          <FaUsers size={22} />
        </Link>

        {/* Appointments Dropdown */}
        <div className="w-full">
          <button
            onClick={toggleAppointmentsDropdown}
            className="flex items-center w-full p-2 text-gray-700 hover:text-white hover:bg-orange-500 justify-start rounded-lg text-md font-bold"
          >
            <span className="mr-2">Appointments</span>
            <FaCalendarCheck size={22} />
            <FaAngleDown className="ml-2" size={12} />
          </button>
          {isAppointmentsDropdownOpen && (
            <div className="w-full mt-2">
              <Link
                to="/admin/appointments"
                className="block p-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-lg"
              >
                Show Appointments
              </Link>
              <Link
                to="/admin/services"
                className="block p-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-lg"
              >
                Edit Services
              </Link>
            </div>
          )}
        </div>

        {/* Orders Dropdown */}
        <div className="w-full">
          <button
            onClick={toggleOrdersDropdown}
            className="flex items-center w-full p-2 text-gray-700 hover:text-white hover:bg-orange-500 justify-start rounded-lg text-md font-bold"
          >
            <span className="mr-2">Orders</span>
            <FaShoppingCart size={22} />
            <FaAngleDown className="ml-2" size={12} />
          </button>
          {isOrdersDropdownOpen && (
            <div className="w-full mt-2">
              <Link
                to="/admin/orders"
                className="block p-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-lg"
              >
                Show Orders
              </Link>
              <Link
                to="/admin/products"
                className="block p-2 text-gray-700 hover:text-white hover:bg-orange-500 rounded-lg"
              >
                Update Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
