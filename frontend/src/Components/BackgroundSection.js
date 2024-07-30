// src/components/BackgroundSection.js
import React from "react";
import backgroundImage from "../Assets/background.jpg"; // Import the background image
import { FaCar, FaTools, FaCog } from "react-icons/fa"; // Import icons from react-icons

const BackgroundSection = () => {
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
        {/* <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl">
          At AutoFixHub, we revolutionize the way you maintain and repair your vehicle. Our comprehensive online platform offers seamless appointment booking for auto repairs and a wide selection of high-quality car parts available for purchase. Enjoy the convenience of managing all your automotive needs in one place, with secure online payment options ensuring a hassle-free experience.
        </p> */}

        {/* Cards */}
        {/* <div className="flex justify-center mb-12 ">
          <div
            className="bg-white rounded-lg p-4 w-64 h-80 mb-4 mr-4 shadow-md flex flex-col items-center justify-center hover:scale-110 transition duration-300 ease-in-out hover:border-orange-500 hover:border-b-4"
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: "-30%",
              left:"15%",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <FaCar size={35} className="text-orange-600 mb-2 " />
            <h2 className="text-2xl font-bold mb-2 text-grey-600">Auto Electrical Services</h2>
            <p className="text-sm text-gray-500">
            Using the newest instruments and scanning systems, our technicians will do maintenance and repairs on your car using a specialist diagnostic.            </p>
          </div>
          <div
            className="bg-white rounded-lg p-4 w-64 h-80 mb-4 mr-4 shadow-md flex flex-col items-center justify-center hover:scale-110 transition duration-300 ease-in-out hover:border-orange-500 hover:border-b-4"
            style={{
              zIndex: 2,
              position: "absolute",
              bottom: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <FaTools size={35} className="text-orange-600 mb-2" />
            <h2 className="text-2xl font-bold mb-2 text-grey-600">Auto Mechanical Works</h2>
            <p className="text-sm text-gray-500">
            Our Mechanical Works specialize in providing expert mechanical services for all types of vehicles, from routine maintenance to major repairs. With years of experience and a commitment to customer satisfaction.            </p>
          </div>
          <div
            className="bg-white rounded-lg p-4 w-64 h-80 mb-4 shadow-md flex flex-col items-center justify-center hover:scale-110 transition duration-300 ease-in-out hover:border-orange-500 hover:border-b-4"
            style={{
              zIndex: 3,
              position: "absolute",
              bottom: "-30%",
              right: "15%",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <FaCog size={35} className="text-orange-600 mb-2" />
            <h2 className="text-2xl font-bold mb-2 text-grey-600">Hybrid vehicles Services</h2>
            <p className="text-sm text-gray-500">
            Expert mechanics at Auto Surgeon Workshop, Islamabad, specialize in hybrid vehicle services, ensuring top-notch care for your hybrid cars            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BackgroundSection;