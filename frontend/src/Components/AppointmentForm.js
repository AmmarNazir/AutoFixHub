import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import FooterSection from "./FooterSection"


const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        service: '',
        time: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/appointments', formData);
            console.log(res.data);
            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error.response && error.response.data ? error.response.data : error.message);
            alert('Failed to book appointment.');
        }
    };

    return (
        <div className="container z-10 mx-auto p-8">
        <h2 className="text-3xl font-bold mt-14 mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
            Book an Appointment</h2>

            <Navbar/>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-14 my-10  p-8 rounded-lg shadow">
                <input className="w-full p-2 mb-4 border rounded" type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input className="w-full p-2 mb-4 border rounded" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input className="w-full p-2 mb-4 border rounded" type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                <select className="w-full p-2 mb-4 border rounded" name="service" onChange={handleChange} required>
                    <option value="">Select Service</option>
                    <option value="Service 1">Diagnostic Scanning</option>
                    <option value="Service 2">Engine Tuning</option>
                    {/* Add more services as needed */}
                </select>
                <select className="w-full p-2 mb-4 border rounded" name="time" onChange={handleChange} required>
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    {/* Add more time slots as needed */}
                </select>
                <input className="w-full p-2 mb-4 border rounded" type="date" name="date" onChange={handleChange} required />
                <button type="submit" className="w-full bg-white rounded-full text-orange-500 hover:bg-orange-500 hover:text-white py-3 px-6 font-bold text-xl rounded transition duration-300 border-2 border-orange-500">
                    Book Appointment
                </button>
                
            </form>
            <FooterSection/>

        </div>
    );
    
};

export default AppointmentForm;
