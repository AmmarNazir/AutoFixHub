import React from "react";
import engineImg from "../Assets/engine.jpg";
import { useNavigate } from 'react-router-dom';

const DescriptionSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/services');
  };  return (
    <div className="flex flex-wrap justify-center">
      <div className="md:w-2/3 xl:w-1/2 p-20 flex flex-col">
        <h4 className="text-blue-500 text-lg font-bold m-4">Best Auto Workshop in Islamabad | Trusted Car Mechanics</h4>
        <h2 className="text-4xl font-bold  m-4">We Specialize in providing expert car repair services</h2>
        <h3  className="text-gray-500 text-2xl  m-4 ">Welcome to our AutoFixHub Workshop in Islamabad!</h3>
        <p className="text-lg text-gray-600 m-4">Leading experts with years of expertise, AutoFixHub Workshop has a passion for all things automotive. Due to the state-of-the-art instruments and scanning technology in our workshop, we are able to identify and fix even the most complicated electrical problems. 
            We are a team of highly skilled and experienced mechanics who are dedicated to providing the best possible service.
            <br/><br/>In our shop, we take great pride in offering excellent service and achieving complete client satisfaction. We are committed to making sure that your car is operating smoothly and safely, whether you require a little electrical inspection or a significant repair.</p>
        <button onClick={handleClick} className="bg-white h-10 w-25 hover:bg-orange-500 text-orange-500 hover:text-white font-bold py-1 px-2 ml-4 rounded-full border-2 border-orange-500 hover:border-transparent transition duration-300 ease-in-out">
      Services
    </button>
      </div>
      <div className="md:w-1/3 xl:w-1/2 p-10">
        <img src={engineImg} alt="Image" className="w-100 h-100 object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default DescriptionSection;