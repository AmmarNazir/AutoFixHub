const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Create a new user document with the hashed password
      const newUser = new User({ username, email, password });
      await newUser.save();

      // Generate JWT token for the newly registered user using newUser._id
      const token = jwt.sign({ _id: newUser._id.toString() }, secretKey, {
        expiresIn: "1h",
      });

      const decoded = jwt.verify(token, secretKey);

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

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found");
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      console.log("User found:", user);

      // Check if the provided password matches the stored password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate a new JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
          isMechanic: user.isMechanic,
        },
        secretKey,
        { expiresIn: "1h" }
      );

      // Add the token to the tokens array in the user document
      user.tokens = user.tokens.concat({ token });
      await user.save();

      res
        .status(200)
        .json({ token, isAdmin: user.isAdmin, isMechanic: user.isMechanic });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to login: Server Error" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId)
        .select("-password")
        .populate({
          path: "orders",
          populate: { path: "products.product" }, // Adjust based on your schema
        })
        .populate({
          path: "appointments",
          populate: { path: "service" }, // Adjust based on your schema
        });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { username, email } = req.body;
      const updateData = { username, email };

      if (req.file) {
        updateData.profileImage = `/uploads/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  deleteUserAccount: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      console.log("Fetching all users..."); // Debug log
      const users = await User.find().select("-password");
      console.log("Users fetched:", users); // Debug log
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users: Server Error" });
    }
  },

  // New: Update user roles (Admin/Mechanic)
  updateUserRole: async (req, res) => {
    const { userId, isAdmin, isMechanic } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.isAdmin = isAdmin;
      user.isMechanic = isMechanic;

      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = userController;
