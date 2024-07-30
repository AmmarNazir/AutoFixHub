const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes for user authentication
router.post("/register", async (req, res) => {
  try {
    // Register user and generate JWT token
    const { username, email, password } = req.body;
    const result = await userController.register(
      { body: { username, email, password } },
      res
    );

    if (!result) {
      // If the register function returns null, it means there was a server error
      return;
    }

    const { newUser, token } = result;

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await userController.login(req, res);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add other routes as needed

module.exports = router;
