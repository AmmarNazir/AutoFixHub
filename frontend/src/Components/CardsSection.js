import React from "react";
import { FaCar, FaTools, FaCog } from "react-icons/fa"; // Import icons from react-icons
import cardbackground from "../Assets/Cardsbg.png"; // Import the background image

const CardsSection = () => {
    return (
<div className="flex justify-center mb-12 bg-cover bg-center h-56"
 style={{
  cardbackground: "url('cardbackground')",
}}
>
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
            <h2 className="text-2xl font-bold mb-2 text-grey-600 ">Auto Mechanical Works</h2>
            <p className="text-sm text-gray-500">
            Our Mechanical Works specialize in providing expert mechanical services for all types of vehicles, from routine maintenance to major repairs.             </p>
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
        </div>
    )
}


export default CardsSection;