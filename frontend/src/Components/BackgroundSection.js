// src/components/BackgroundSection.js
import React from "react";
import backgroundImage from "../Assets/background.jpg";
import { useNavigate } from 'react-router-dom';

const BackgroundSection = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleAppointmentClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { state: { from: '/appointmentForm' } });
      return;
    }
    navigate('/appointmentForm');
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-gray-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to AutoFixHub: Your Ultimate Auto Repair and Car Parts Solution
        </h1>
        <div className="flex flex-col items-center">
        <button
          onClick={handleAppointmentClick}
          className="w-25% mt-8 rounded-lg bg-orange-500  text-white hover:bg-orange-600 hover:text-white py-3 px-6 font-bold text-xl  transition duration-300"
          style={{ border: '2px solid orange', }}
        >
          Book an Appointment
        </button>
      </div>

      </div>
    </div>
  );
};

export default BackgroundSection;
