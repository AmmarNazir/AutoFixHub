import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar"; // Ensure the correct path for Sidebar

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    subServices: [{ name: "", duration: "" }],
  });
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

        if (!token) {
          console.error("No token found, please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/services", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubServiceChange = (index, e) => {
    const updatedSubServices = [...newService.subServices];
    updatedSubServices[index][e.target.name] = e.target.value;
    setNewService({ ...newService, subServices: updatedSubServices });
  };

  const addSubService = () => {
    setNewService({
      ...newService,
      subServices: [...newService.subServices, { name: "", duration: "" }],
    });
  };

  const handleCreateOrUpdateService = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No token found, please log in again.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingServiceId) {
        const response = await axios.put(
          `http://localhost:3000/api/services/${editingServiceId}`,
          newService,
          config
        );

        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === editingServiceId ? response.data : service
          )
        );
        alert("Service updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/services",
          newService,
          config
        );
        setServices([...services, response.data]);
        alert("Service added successfully!");
      }

      setNewService({ name: "", subServices: [{ name: "", duration: "" }] });
      setEditingServiceId(null);
    } catch (error) {
      console.error("Error creating/updating service:", error);
      alert("Failed to create/update service. Please try again.");
    }
  };

  const handleEditService = (service) => {
    setNewService({
      name: service.name,
      subServices: service.subServices.map((sub) => ({
        name: sub.name,
        duration: sub.duration,
      })),
    });
    setEditingServiceId(service._id);
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No token found, please log in again.");
        return;
      }

      await axios.delete(`http://localhost:3000/api/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setServices(services.filter((service) => service._id !== serviceId));
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">
          {editingServiceId ? "Update Service" : "Manage Services"}
        </h2>

        {/* Form to add or update service */}
        <div className="mb-8">
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            name="name"
            value={newService.name}
            placeholder="Service Name"
            onChange={handleServiceChange}
            required
          />
          {newService.subServices.map((subService, index) => (
            <div key={index} className="flex gap-4">
              <input
                className="w-full p-2 mb-4 border rounded"
                type="text"
                name="name"
                value={subService.name}
                placeholder="Sub-Service Name"
                onChange={(e) => handleSubServiceChange(index, e)}
                required
              />
              <input
                className="w-full p-2 mb-4 border rounded"
                type="number"
                name="duration"
                value={subService.duration}
                placeholder="Duration (minutes)"
                onChange={(e) => handleSubServiceChange(index, e)}
                required
              />
            </div>
          ))}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
            onClick={addSubService}
          >
            Add Sub-Service
          </button>
          <button
            className="w-full bg-green-500 text-white p-2 rounded"
            onClick={handleCreateOrUpdateService}
          >
            {editingServiceId ? "Update Service" : "Create Service"}
          </button>
        </div>

        {/* Section to display existing services */}
        <h3 className="text-2xl font-bold mb-4">Existing Services</h3>
        {services.map((service) => (
          <div
            key={service._id}
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h4 className="text-xl font-bold mb-2">{service.name}</h4>
            <ul>
              {service.subServices.map((subService, index) => (
                <li key={index} className="mb-2">
                  {subService.name} - {subService.duration} minutes
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-yellow-500 text-white p-2 rounded"
                onClick={() => handleEditService(service)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteService(service._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
