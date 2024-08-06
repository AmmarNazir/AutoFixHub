// src/components/Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/contact', formData);
      if (res.data.success) {
        setMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold m-14 text-center bg-orange-500 text-white py-2 px-4 rounded-lg">
          Contact Us
        </h2>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-white  text-orange-500 hover:bg-orange-500 hover:text-white py-3 px-6 font-bold text-xl rounded transition duration-300 border-2 border-orange-500 rounded-full"
          >
            Send
          </button>
        </form>
      </div>
      <FooterSection />
    </div>
  );
};

export default Contact;
