const jwt = require("jsonwebtoken");

const authUtils = {
  // Generate JWT token
  generateToken: (payload, secretKey, options) => {
    return jwt.sign(payload, secretKey, options);
  },

  // Verify JWT token
  verifyToken: (token, secretKey) => {
    return jwt.verify(token, secretKey);
  },

  // Implement other authentication utility functions as needed
};

module.exports = authUtils;
