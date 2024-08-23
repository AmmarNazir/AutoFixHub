import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar"; // Import the Sidebar component
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [usersResponse, appointmentsResponse, ordersResponse] =
          await Promise.all([
            axios.get("http://localhost:3000/api/users", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3000/api/appointments", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3000/api/orders", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setUserCount(usersResponse.data.length);
        setAppointmentCount(appointmentsResponse.data.length);
        setOrderCount(ordersResponse.data.length);

        // Show only the first 4 records in each section
        setUsers(usersResponse.data.slice(0, 4));
        setAppointments(appointmentsResponse.data.slice(0, 4));
        setOrders(ordersResponse.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-white">
        <div className="text-3xl font-bold p-6 text-center text-orange-300 justify-center rounded-lg shadow-lg mb-8">
          Welcome to AFH's Admin Dashboard
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-2 text-gray-600">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-orange-500">{userCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-2 text-gray-600">
              Total Appointments
            </h3>
            <p className="text-4xl font-bold text-orange-500">
              {appointmentCount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-2 text-gray-600">
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-orange-500">{orderCount}</p>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Appointments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 bg-gray-100 shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold mb-2">{appointment.title}</h3>
                <p className="text-gray-600">{appointment.description}</p>
              </div>
            ))}
          </div>
          <Link
            to="/admin/appointments"
            className="text-orange-500 hover:underline mt-4 inline-block"
          >
            Check More
          </Link>
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-100 shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold mb-2">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
          <Link
            to="/admin/users"
            className="text-orange-500 hover:underline mt-4 inline-block"
          >
            Check More
          </Link>
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-gray-100 shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold mb-2">{order.product}</h3>
                <p className="text-gray-600">Total: {order.total}</p>
              </div>
            ))}
          </div>
          <Link
            to="/admin/orders"
            className="text-orange-500 hover:underline mt-4 inline-block"
          >
            Check More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
