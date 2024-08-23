import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Make sure to import this correctly
import Sidebar from "../Admin/sidebar";

const MechanicDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const decodedToken = jwtDecode(token);
        const mechanicId = decodedToken.userId;

        if (!mechanicId) {
          console.error("Mechanic ID is not available in localStorage");
          return;
        }
        console.log("Fetching appointments for mechanic:", mechanicId);

        const response = await axios.get(
          `http://localhost:3000/api/appointments/mechanic/${mechanicId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        `http://localhost:3000/api/appointments/${appointmentId}/update-status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the UI after status change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-8 text-gray-700">
          Assigned Appointments
        </h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Service
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Date
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Time
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Status
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="py-3 px-5 border-b">
                      {appointment.service?.name || "Service not available"}
                    </td>
                    <td className="py-3 px-5 border-b">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-5 border-b">{appointment.time}</td>
                    <td className="py-3 px-5 border-b">{appointment.status}</td>
                    <td className="py-3 px-5 border-b flex space-x-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus(appointment._id, "Processing")
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Mark as Processing
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(appointment._id, "Completed")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Mark as Completed
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
