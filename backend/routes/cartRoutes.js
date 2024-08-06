// src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Use authMiddleware to protect routes
router.use(authMiddleware);

// Define routes
router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
