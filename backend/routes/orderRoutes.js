const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminAuthMiddleware");

// Route for users to create an order
router.post(
  "/",
  authenticateToken, // Only require authentication, not admin privileges
  orderController.createOrder
);

// Admin routes for managing orders
router.get(
  "/",
  authenticateToken,
  authenticateAdmin,
  orderController.getOrders
);
router.get(
  "/:id",
  authenticateToken,
  authenticateAdmin,
  orderController.getOrderById
);
router.put(
  "/:id",
  authenticateToken,
  authenticateAdmin,
  orderController.updateOrder
);
router.delete(
  "/:id",
  authenticateToken,
  authenticateAdmin,
  orderController.deleteOrder
);

module.exports = router;
