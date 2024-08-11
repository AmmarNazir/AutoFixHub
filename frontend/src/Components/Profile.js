import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Profile = ({ onProfileImageUpdate }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profileImage: null,  // Initialize profileImage as null
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        const res = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          const imageUrl = res.data.profileImage ? `http://localhost:3000${res.data.profileImage}` : null;
          setUser(res.data);
          setFormData({
            username: res.data.username,
            email: res.data.email,
            profileImage: imageUrl,  // Set profileImage in formData with the URL
          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(
          'Error fetching user data:',
          error.response ? error.response.data : error.message
        );
        setError(
          error.response ? error.response.data.message : error.message
        );
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    if (formData.profileImage instanceof File) data.append('profileImage', formData.profileImage);

    try {
      const res = await axios.put(
        'http://localhost:3000/api/users/profile',
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (res.data) {
        const imageUrl = `http://localhost:3000${res.data.profileImage}`;
        setUser({ ...res.data, profileImage: imageUrl }); // Update user state with new image
        setFormData({ ...formData, profileImage: imageUrl }); // Update formData state with new image
        alert('Profile updated successfully!');
        if (onProfileImageUpdate) {
          onProfileImageUpdate(imageUrl); // Notify parent (Navbar) of the image update
        }
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(
        'Error updating profile:',
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      try {
        await axios.delete('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        localStorage.removeItem('token');
        navigate('/signup', { replace: true });
      } catch (error) {
        console.error(
          'Error deleting account:',
          error.response ? error.response.data : error.message
        );
        setError(
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h2 className="text-3xl font-bold mt-28 mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">
        Profile
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {user ? (
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-6">
            {formData.profileImage ? (
              <img
                src={
                  formData.profileImage instanceof File
                    ? URL.createObjectURL(formData.profileImage)
                    : formData.profileImage
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <FaUserCircle size={128} className="text-gray-500 mb-4" />
            )}
            <label className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 font-bold text-xl rounded transition duration-300 border-2 border-orange-500 cursor-pointer">
              Upload Profile Photo
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl w-full bg-white p-8 rounded-lg shadow"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-orange-500 hover:bg-orange-500 hover:text-white py-3 px-6 font-bold text-xl rounded transition duration-300 border-2 border-orange-500"
            >
              Update Profile
            </button>
          </form>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="w-1/4 bg-white text-orange-500 hover:bg-orange-500 hover:text-white py-3 px-6 font-bold text-xl rounded transition duration-300 border-2 border-orange-500"
        >
          Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          className="w-1/4 bg-red-500 text-white hover:bg-red-700 py-3 px-6 font-bold text-xl rounded transition duration-300 ml-4"
        >
          Delete Account
        </button>
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ongoing and Previous Orders
        </h2>
        {user && user.orders && user.orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {user.orders.map((order) => (
              <div
                key={order._id}
                className="p-4 border rounded-lg shadow bg-white"
              >
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.productName} (x{item.quantity}) - $
                      {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-lg font-bold">
                  Total: ${order.totalAmount}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ongoing and Previous Appointments
        </h2>
        {user && user.appointments && user.appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {user.appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="p-4 border rounded-lg shadow bg-white"
              >
                <p>
                  <strong>Service:</strong> {appointment.serviceName}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
