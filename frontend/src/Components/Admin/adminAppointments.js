import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar"; // Import the Sidebar component
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanics, setSelectedMechanics] = useState({});

  useEffect(() => {
    const fetchAppointmentsAndMechanics = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [appointmentsResponse, mechanicsResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAppointments(appointmentsResponse.data);
        setMechanics(mechanicsResponse.data.filter((user) => user.isMechanic));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppointmentsAndMechanics();
  }, []);

  const handleMechanicSelect = (appointmentId, mechanicId) => {
    setSelectedMechanics((prevState) => ({
      ...prevState,
      [appointmentId]: mechanicId,
    }));
  };

  const handleAssignMechanic = async (appointmentId) => {
    try {
      const mechanicId = selectedMechanics[appointmentId];
      if (!mechanicId) {
        alert("Please select a mechanic.");
        return;
      }

      console.log(
        "Assigning mechanic:",
        mechanicId,
        "to appointment:",
        appointmentId
      );

      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:3000/api/appointments/${appointmentId}/assign`,
        { mechanicId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response from server:", response.data);

      const updatedAppointment = response.data;

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? updatedAppointment : appointment
        )
      );

      alert("Mechanic assigned successfully!");
    } catch (error) {
      console.error("Error assigning mechanic:", error);
      alert("Failed to assign mechanic. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">All Appointments</h2>
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
                Duration
              </th>
              <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                Assigned Mechanic
              </th>
              <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                Status
              </th>
              <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                User
              </th>
              <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                Select Mechanic
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
                  <td className="py-2 px-4 border-b">
                    {appointment.service?.name || "Service not available"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{appointment.time}</td>
                  <td className="py-2 px-4 border-b">
                    {appointment.duration} minutes
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appointment.assignedMechanic?.name || "Not Assigned"}
                  </td>
                  <td className="py-2 px-4 border-b">{appointment.status}</td>
                  <td className="py-2 px-4 border-b">
                    {appointment.user?.username || "User not available"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) =>
                        handleMechanicSelect(appointment._id, e.target.value)
                      }
                      className="bg-gray-100 border rounded p-2"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Mechanic
                      </option>
                      {mechanics.map((mechanic) => (
                        <option key={mechanic._id} value={mechanic._id}>
                          {mechanic.username}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleAssignMechanic(appointment._id)}
                      className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
                    >
                      Assign Mechanic
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
