// config.js
const crypto = require("crypto");

// Generate a random secret key
const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits
};

module.exports = {
  secretKey: generateRandomKey(),
};
