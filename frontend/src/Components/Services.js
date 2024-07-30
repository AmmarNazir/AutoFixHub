import React from "react";
import Navbar from "./Navbar";
import bgimg from "../Assets/Servicesbg.png";
import { FaCogs, FaBolt, FaLightbulb, FaHeartbeat,  FaPlug, FaBatteryHalf, FaFan, FaSignal, FaTools,  } from "react-icons/fa"; // Import icons from react-icons
import FooterSection from "./FooterSection"

const Services = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />

      <div className="absolute top-0 left-0 w-full h-1/2">
        <img src={bgimg} alt="Background 1" className="w-full h-full object-cover" />
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full h-1/2">
        <img src={bgimg2} alt="Background 2" className="w-full h-full object-cover" />
      </div> */}

      <div className="relative z-10 container mx-auto p-8">
        <h1 className="text-3xl font-bold mt-14 mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
          Our Services
        </h1>
        <p className="text-lg mb-8 text-center font-bold">
          At AutoFixHub, we offer a wide range of services to keep your vehicle running smoothly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaCogs size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Diagnostic Scanning</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Our state-of-the-art diagnostic scanning technology enables us to identify and troubleshoot issues in your car’s engine, transmission, brakes, and other systems quickly and accurately.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaBolt size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Electrical System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">From faulty wiring to malfunctioning sensors, our team can diagnose and repair any electrical issues in your car to ensure its optimal performance. quickly and accurately.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out relative overflow-hidden hover:bg-blue-900 hover:text-white"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaHeartbeat size={35} className="text-orange-600 m-4 hover:text-white" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Air Conditioning and Heating System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Our team can diagnose and repair any issues with your car’s air conditioning and heating system to ensure your comfort while driving.</p>
              </div>
            </div>
          </div>
          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:text-white hover:bg-blue-900 relative overflow-hidden "
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaLightbulb size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Check Engine Light Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">If your check engine light is on, our team can help you diagnose the problem and provide the necessary repairs to get you back on the road.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaPlug size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Brake System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Brake System Diagnosis If you notice any issues with your brakes, our team can perform a comprehensive diagnosis to identify any underlying issues and make necessary repairs to ensure your safety.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaBatteryHalf size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Fuel System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Fuel System Diagnosis: If you are experiencing issues with your car’s fuel system, our team can diagnose the issue and provide necessary repairs to ensure optimal fuel efficiency and performance.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaFan size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Exhaust System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Exhaust System Diagnosis: Our team can diagnose any issues with your car’s exhaust system, including leaks and damaged components, and provide necessary repairs to ensure optimal performance and safety.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaSignal size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Transmission System Diagnosis</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Transmission System Diagnosis: Our experienced technicians can diagnose and repair any issues with your car’s transmission, ensuring your car operates smoothly and efficiently.</p>
              </div>
            </div>
          </div>

          <div className="p-6 m-6">
            <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-900 relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 5px rgba(255, 166, 0, 1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-orange-500 transform translate-y-full transition-transform duration-300 ease-in-out"></div>
              <div className="flex flex-col justify-center items-center p-4">
                <FaTools size={35} className="text-orange-600 m-4" />
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 hover:text-white">Engine Tuning</h2>
                <p className="text-lg text-gray-500 text-center hover:text-white">Engine Tuning: Our expert team provides precise engine tuning to enhance your car’s performance, fuel efficiency, and overall driving experience.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
      <FooterSection />

    </div>
  );
};

export default Services;
