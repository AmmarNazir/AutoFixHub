const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminAuthMiddleware"); // New middleware

router.use(authenticateToken); // Ensure user is authenticated
router.use(authenticateAdmin); // Ensure user is an admin

// Admin-specific routes
router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;
