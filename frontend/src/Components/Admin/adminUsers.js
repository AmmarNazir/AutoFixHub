import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar"; // Import the Sidebar component
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data); // Ensure data is being fetched correctly
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, isAdmin, isMechanic) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/updateRole",
        {
          userId,
          isAdmin,
          isMechanic,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const updatedUser = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      alert("User role updated successfully!");
      window.location.reload(); // Refresh the page after role change
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-4xl font-bold mb-8 text-gray-700">All Users</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  #
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Username
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Email
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Role
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-3 px-5 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700">
                      {user.username}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700">
                      {user.isAdmin
                        ? "Admin"
                        : user.isMechanic
                        ? "Mechanic"
                        : "User"}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700">
                      <a
                        href="#!"
                        onClick={() =>
                          handleRoleChange(
                            user._id,
                            !user.isAdmin,
                            user.isMechanic
                          )
                        }
                        className={`mr-4 text-sm font-semibold ${
                          user.isAdmin ? "text-red-500" : "text-blue-500"
                        } hover:underline`}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </a>
                      <a
                        href="#!"
                        onClick={() =>
                          handleRoleChange(
                            user._id,
                            user.isAdmin,
                            !user.isMechanic
                          )
                        }
                        className={`text-sm font-semibold ${
                          user.isMechanic ? "text-red-500" : "text-green-500"
                        } hover:underline`}
                      >
                        {user.isMechanic ? "Remove Mechanic" : "Make Mechanic"}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found
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

export default AdminUsers;
