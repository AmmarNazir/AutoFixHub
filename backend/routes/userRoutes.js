// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminAuthMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Define routes for user authentication
router.post("/register", userController.register);
router.post("/login", userController.login);

// Define routes for user profile management
router.get("/profile", authenticateToken, userController.getUserProfile);
router.put(
  "/profile",
  authenticateToken,
  upload.single("profileImage"),
  userController.updateUserProfile
);
router.delete("/profile", authenticateToken, userController.deleteUserAccount);

// Admin routes for managing users
router.get(
  "/",
  authenticateToken,
  authenticateAdmin,
  userController.getAllUsers
);
router.post(
  "/updateRole",
  authenticateToken,
  authenticateAdmin,
  userController.updateUserRole
);

module.exports = router;
