import React from 'react';
import {  FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaAddressCard } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer>
      <div className="container mx-auto flex flex-col md:flex-row justify-between bg-black text-white py-8">
        {/* Section 1: Short intro with social links */}
        <div className="mb-4 md:mb-0 md:w-1/4">
          <p className="font-bold m-4"> AutoFixHub is one of the leading  
             Car <br/> Electrical & Car Mechanic Service <br/> workshop
              in Islamabad, Pakistan. <br/> <br/> Stay connected with us:</p>
          <ul className="flex space-x-4">
            <li>
              <a href="https://facebook.com/" target='blank' className="text-white">
              <FaFacebookF size={20} className="text-blue-600 m-4" />
              </a>
            </li>
            <li>
              <a href="https://x.com/?lang=en" target='blank' className="text-white">
              <FaTwitter size={20} className="text-white-600 m-4" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target='blank' className="text-white">
              <FaInstagram size={20} className="text-purple-600 m-4" />
              </a>
            </li>
          </ul>
        </div>

        {/* Section 2: Important links */}
        <div className="mb-4 md:mb-0 md:w-1/4">
        <h3 className="font-bold text-xl m-4">Important Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about-us" className="text-white">About</a>
            </li>
            <li>
              <a href="/" className="text-white">Home</a>
            </li>
            <li>
              <a href="/Services" className="text-white">Services</a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact info with icons */}
        <div className="mb-4 md:mb-0 md:w-1/4">
          <ul className="space-y-2">
            <li className="flex items-center">
            <FaAddressCard size={20} className="text-white-600 m-4"/>            
              <span>G-9, Islamabad, Pakistan</span>
            </li>
            <li className="flex items-center">
            <FaPhone size={20} className="text-white-600 m-4"/>            
              <span>(301) 234-5678</span>
            </li>
            <li className="flex items-center">
            <FaEnvelope size={20} className="text-white-600 m-4"/>            
              <span>ammarnazir864@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Google Map and "To Top" arrow */}
        <div className="md:w-1/4 flex flex-col items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.489844115597!2d-74.006022!3d40.712784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083d%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1643723431151!5m2!1sen!2sus"
            width="200"
            height="200"
            className="mb-4"
          />
          <a href="#top" className="text-white">
            <i className="fas fa-arrow-up" />
          </a>
        </div>
      </div>

      {/* Copyright line with grey bg */}
      <div className="bg-gray-700 py-2 text-center">
        <p className="text-white mb-0">
          &copy; 2024 AutoFixHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
