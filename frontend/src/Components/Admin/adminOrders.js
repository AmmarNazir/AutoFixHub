import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar"; // Import the Sidebar component

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token); // Debugging: Log the token to console

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:3000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedOrder = response.data;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-8 text-gray-700">All Orders</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Order ID
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  User
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Total Amount
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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="py-3 px-5 border-b">{order._id}</td>
                    <td className="py-3 px-5 border-b">
                      {order.user?.username || "N/A"}
                    </td>
                    <td className="py-3 px-5 border-b">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-5 border-b">{order.status}</td>
                    <td className="py-3 px-5 border-b">
                      <button
                        onClick={() =>
                          handleUpdateOrder(order._id, "Processing")
                        }
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Mark as Processing
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateOrder(order._id, "Completed")
                        }
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No orders found.
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

export default AdminOrders;
