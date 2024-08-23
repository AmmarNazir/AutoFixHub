// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        // Save mechanicId in localStorage if the user is a mechanic
        if (data.isMechanic) {
          localStorage.setItem("mechanicId", data.userId);
        }

        // Call the onLogin callback
        onLogin();

        // Navigate to the appropriate dashboard based on the user's role
        if (data.isAdmin) {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else if (data.isMechanic) {
          navigate("/mechanic/dashboard"); // Redirect to mechanic dashboard
        } else {
          navigate("/"); // Redirect to regular user dashboard
        }
      } else {
        setError(data.message || "Login failed"); // Displays API or fallback error
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // General error for network issues or others
    }
  };

  return (
    <div className="container mx-auto my-4 p-4 max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-orange-500"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-orange-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
