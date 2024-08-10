import React from 'react';
import Navbar from './Navbar';
import AboutImg1 from "../Assets/About1.png"
import FooterSection from "./FooterSection"
import bgimg from "../Assets/Servicesbg.png";


const AboutUs = () => {
  return (
<div>
    <div className="flex flex-col lg:flex-row items-center justify-center py-20">
        <Navbar/>
      <div className="lg:w-1/2 xl:w-2/3 pr-20">
        <h1 className="text-3xl font-bold m-8 line-orange-500 text-center" >About Our Workshop</h1>
        <p className="text-lg font-bold text-center text-gray-400">
        Welcome to AutoFixHub, your one-stop workshop for all your car repair needs! </p>
        <h1 className="text-5xl mb-4  text-center" >Best Auto Workshop in Islamabad</h1>
        <p className="text-lg   text-gray-700 ">
        Welcome to <span className=' text-orange-500 font-bold'> AutoFixHub!</span> We are a team of expert car mechanics who specialize in electrical, electronics, Hybrid car, and mechanical repair using the latest technologies and scanners to provide our services in Islamabad, Pakistan.<br/><br/>

        We understand that having a well-functioning vehicle is important, which is why we’re committed to providing our clients with top-quality service to ensure their cars are running at their best. Our expert car mechanics have years of experience in the automotive industry and are up-to-date  with the latest technology and repair techniques. <br/><br/>

        We take pride in our workmanship and attention to detail, ensuring that every repair is completed to the highest standard. Our expert car mechanics use only the best quality parts and equipment to ensure that your vehicle is in the best possible condition when it leaves our workshop.<br/><br/>

        Our services include electrical and electronics repairs, as well as diagnostic testing using the latest scanners. Whether you need a simple repair or a complex overhaul, our expert car mechanics are equipped to handle any job, big or small.<br/><br/>

        At <span className=' text-gray-500 font-bold'>AutoFixHub,</span> our goal is to provide our clients with an exceptional service experience that exceeds their expectations. We believe that customer satisfaction is the foundation of our success, and we’re dedicated to building long-term relationships with our clients. Our expert car mechanics are committed to providing you with the best possible service.<br/><br/>

        Thank you for considering AutoFixHub for your automotive repair needs. We look forward to serving you and providing you with the best possible service please Contact Us.
            </p>

      </div>
      <div className="relative w-80 h-80 m-10">
        <img src={AboutImg1} alt="Image 1" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
      </div>
    </div>
    <FooterSection />

</div>
  );
};

export default AboutUs;