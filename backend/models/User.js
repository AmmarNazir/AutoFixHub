const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Simple email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

// Hash the password before saving to the database
/*userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await argon2.hash(user.password);
  }
  next();
});*/

const User = mongoose.model("User", userSchema);

module.exports = User;
