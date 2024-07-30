const User = require("../models/User");
const authUtils = require("../utils/authUtils");
const { secretKey } = require("../config");
const bcrypt = require('bcryptjs');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("Registering user:", { username, email });

      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        console.log("User already exists:", existingUser);
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      const newUser = new User({ username, email, password: hashedPassword });

      // Save the new user to the database
      await newUser.save();
      console.log("New user saved:", newUser);

      // Generate JWT token for the newly registered user
      const token = authUtils.generateToken(
        { userId: newUser._id },
        secretKey,
        { expiresIn: "1h" }
      );
      console.log("Generated token:", token);

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ message: "Failed to register user: Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Logging in user:", { username });

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found with username:", username);
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      console.log("User found:", user);

      // Check if the provided password matches the stored password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password for user:", username);
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate JWT token for the authenticated user
      const token = authUtils.generateToken({ userId: user._id }, secretKey, {
        expiresIn: "1h",
      });
      console.log("Generated token for login:", token);

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to login: Server Error" });
    }
  },
};

module.exports = userController;
