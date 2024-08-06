// controllers/userController.js
const User = require("../models/User");
const authUtils = require("../utils/authUtils");
const { secretKey } = require("../config");
const bcrypt = require('bcryptjs');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("Registering user:", { username, email });

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        console.log("User already exists:", existingUser);
        return res.status(400).json({ message: "Username or email already exists" });
      }

      const newUser = new User({ username, email, password });
      await newUser.save();
      console.log("New user saved:", newUser);

      const token = authUtils.generateToken({ userId: newUser._id }, secretKey, { expiresIn: "1h" });
      console.log("Generated token:", token);

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user: Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Logging in user:", { username });

      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found with username:", username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password for user:", username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = authUtils.generateToken({ userId: user._id }, secretKey, { expiresIn: "1h" });
      console.log("Generated token for login:", token);

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to login: Server Error" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('orders').populate('appointments');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateUserProfile: async (req, res) => {
    const { username, email } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (username) user.username = username;
      if (email) user.email = email;
      if (profileImage) user.profileImage = profileImage;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUserAccount: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'Account deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
