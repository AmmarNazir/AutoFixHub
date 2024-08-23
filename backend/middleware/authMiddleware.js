const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id.toString() }, secretKey, {
    expiresIn: "1h",
  });
};

// const login = async (req, res) => {
//   // After user is authenticated
//   const token = generateToken(user);
//   res.send({ token });
// };

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("Authenticated user:", decoded);
    req.user = decoded; // Attaching the user information to the request
    next();
  });
};

module.exports = authenticateToken;
