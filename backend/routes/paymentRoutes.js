// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use the secret key from the .env file

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    console.log(`Creating payment intent for amount: ${amount}`);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    console.log(`Payment intent created: ${paymentIntent.id}`);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
