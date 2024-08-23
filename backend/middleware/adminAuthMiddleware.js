// middleware/adminAuthMiddleware.js
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const User = require("../models/User");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token received:", token);

    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);

    const user = await User.findOne({
      _id: decoded.userId,
      "tokens.token": token, // Ensure this line is correct
    });

    if (!user) {
      console.log("User not found with given token");
      throw new Error("User not found");
    }

    if (!user.isAdmin) {
      console.log(`Access denied: User ${user._id} is not an admin`);
      throw new Error("Not authorized as an admin");
    }

    console.log(`User ${user._id} authenticated as admin`);
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin authentication failed:", error.message);
    res.status(403).json({ message: "Access denied" });
  }
};

module.exports = authenticateAdmin;
