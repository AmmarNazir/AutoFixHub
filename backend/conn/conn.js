const mongoose = require("mongoose");

// Database connection URL with the database name
const dbURI = "mongodb://127.0.0.1:27017/AutoFixHub";
// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for database connection
db.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

db.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Handle disconnection
db.on("close", () => {
  console.log("Mongoose connection closed");
});

// Close the Mongoose connection when Node process ends
process.on("SIGINT", () => {
  db.close(() => {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

// Export the Mongoose connection
module.exports = db;
