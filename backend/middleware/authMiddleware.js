const jwt = require("jsonwebtoken");
const authUtils = require("../utils/authUtils");
const { secretKey } = require("../config");

const authMiddleware = {
  // Middleware to verify JWT token
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as a Bearer token

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    try {
      const decoded = authUtils.verifyToken(token, secretKey);
      req.user = decoded; // Attach the decoded payload to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(400).json({ message: "Invalid token." });
    }
  },
};

module.exports = authMiddleware;
