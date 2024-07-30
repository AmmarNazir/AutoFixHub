const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./conn/conn"); // Import your database connection file

const corsOptions = {
  origin: 'http://localhost:3001', // frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); // Parse JSON requests

// Routes setup
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes"); // Import product routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes); // Use product routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
