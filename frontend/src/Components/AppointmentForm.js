import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import FooterSection from "./FooterSection";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    service: "",
    subService: "",
    time: "",
    date: "",
  });

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Ensure the token is present
        if (!token) {
          throw new Error("No token provided");
        }

        // Decode the token if you need to access its content (optional)
        // If you do not need to decode, you can skip this part
        // const decodedToken = jwtDecode(token);

        // Include the token in the Authorization header
        const response = await axios.get("http://localhost:3000/api/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the services state with the fetched data
        setServices(response.data);
      } catch (error) {
        console.error(
          "Error fetching services:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchServices();
  }, []); // Ensure the dependency array is empty to only run on mount

  const handleServiceAndDateChange = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/appointments/check-availability`,
        {
          params: {
            service: formData.service,
            date: formData.date,
          },
        }
      );

      const bookedSlots = response.data.bookedSlots; // Get the booked slots from the response

      // Filter out booked slots from availableSlots
      const filteredSlots = availableSlots.filter(
        (slot) => !bookedSlots.includes(slot)
      );

      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.error("Error checking slot availability:", error);
    }
  };

  useEffect(() => {
    if (formData.service && formData.date) {
      handleServiceAndDateChange();
    }
  }, [formData.service, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "service") {
      const selectedService = services.find((service) => service._id === value);
      if (selectedService) {
        setSubServices(selectedService.subServices);
      } else {
        setSubServices([]);
      }
    }

    if (name === "subService") {
      const selectedSubService = subServices.find((sub) => sub._id === value);
      if (selectedSubService) {
        generateAvailableSlots(selectedSubService.duration);
      } else {
        setAvailableSlots([]);
      }
    }
  };

  const generateAvailableSlots = (duration) => {
    const slots = [];
    const startHour = 8; // Workday start hour
    const endHour = 17; // Workday end hour
    const interval = duration <= 60 ? 60 : duration; // Determine time slot interval

    for (
      let hour = startHour;
      hour < endHour;
      hour += Math.ceil(duration / 60)
    ) {
      const startMinute = hour % 1 === 0 ? "00" : (hour % 1) * 60;
      const slot = `${Math.floor(hour)}:${startMinute} - ${Math.floor(
        hour + Math.ceil(duration / 60)
      )}:${startMinute}`;
      slots.push(slot);
    }
    setAvailableSlots(slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Assuming the JWT is stored in localStorage
      if (!token) {
        alert("User is not logged in.");
        return;
      }

      // Decode the token to extract the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const selectedSubService = subServices.find(
        (sub) => sub._id === formData.subService
      );
      const duration = selectedSubService ? selectedSubService.duration : null;

      if (!duration) {
        alert("Please select a valid sub-service.");
        return;
      }

      const appointmentData = {
        ...formData,
        user: userId,
        duration,
      };

      const res = await axios.post(
        "http://localhost:3000/api/appointments",
        appointmentData
      );
      console.log(res.data);
      alert("Appointment booked successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "No time slots available for this time and day."
      ) {
        alert("Time slot not available. Please choose another time or day.");
      } else {
        console.error(
          "Error booking appointment:",
          error.response && error.response.data
            ? error.response.data
            : error.message
        );
        alert("Failed to book appointment.");
      }
    }
  };

  return (
    <div>
      <div className="container z-10 mx-auto p-8">
        <h2 className="text-3xl font-bold mt-20 mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
          Book an Appointment
        </h2>

        <Navbar />
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-14 my-10 p-8 rounded-lg shadow"
        >
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <select
            className="w-full p-2 mb-4 border rounded"
            name="service"
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>

          {subServices.length > 0 && (
            <select
              className="w-full p-2 mb-4 border rounded"
              name="subService"
              onChange={handleChange}
              required
            >
              <option value="">Select Sub-Service</option>
              {subServices.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          )}

          {availableSlots.length > 0 && (
            <select
              className="w-full p-2 mb-4 border rounded"
              name="time"
              onChange={handleChange}
              required
            >
              <option value="">Select Time</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          )}

          <input
            className="w-full p-2 mb-4 border rounded"
            type="date"
            name="date"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-white rounded-full text-orange-500 hover:bg-orange-500 hover:text-white py-3 px-6 font-bold text-xl rounded transition duration-300 border-2 border-orange-500"
          >
            Book Appointment
          </button>
        </form>
      </div>
      <FooterSection />
    </div>
  );
};

export default AppointmentForm;
