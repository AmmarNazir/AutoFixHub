const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Define routes for user authentication
router.post("/register", userController.register);
router.post("/login", userController.login);

// Define routes for user profile management
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, upload.single('profileImage'), userController.updateUserProfile);
router.delete("/profile", authMiddleware, userController.deleteUserAccount);

module.exports = router;
