import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from './CartContext'; 
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const stripePromise = loadStripe('pk_test_51PjymZP5js6yvb4Qp17scldQD7dhSU0o9JHxwWvxReY14Xh6uDN80EjJTO4kT605buQsFqSDgbmZEA6v7S4GushX00kQBjl49q'); // Replace with your publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { clearCart } = useCart(); // Access the clearCart function from the CartContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    try {
      console.log(`Creating payment intent for amount: ${totalAmount * 100}`);
      const response = await axios.post('http://localhost:3000/api/create-payment-intent', {
        amount: totalAmount * 100
      });

      console.log('Payment intent response:', response);
      const { data } = response;
      console.log('Payment intent created, clientSecret:', data.clientSecret);

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name,
            email,
            address: {
              line1: address,
            },
          },
        },
      });

      if (paymentResult.error) {
        console.error('Payment error:', paymentResult.error.message);
        setError(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          console.log('Payment successful:', paymentResult.paymentIntent);
          
          const token = localStorage.getItem('token');
          const orderData = {
            items: [], // Add items array if needed with proper structure
            totalAmount: paymentResult.paymentIntent.amount / 100,
          };

          console.log('Order data being sent:', orderData);

          try {
            const orderResponse = await axios.post('http://localhost:3000/api/orders', orderData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            console.log('Order response:', orderResponse);
            alert('Payment Successful!');

            clearCart(); // Clear the cart after the order is successfully placed

            navigate('/'); // Redirect to home or another page
          } catch (orderError) {
            console.error('Order creation error:', orderError.response ? orderError.response.data : orderError.message);
            setError('Order creation failed. Please contact support.');
          }
        } else {
          setError('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during payment processing:', error.response ? error.response.data : error.message);
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <Navbar />
      <h2 className="text-3xl font-bold mt-28 mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg text-center">Checkout</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="w-full px-3 py-2 border rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Card Details</label>
          <CardElement className="p-3 border rounded-lg" />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          disabled={!stripe || loading}
        >
          {loading ? 'Processing...' : `Pay $${totalAmount}`}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
