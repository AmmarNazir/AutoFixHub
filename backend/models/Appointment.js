// models/Appointment.js
const mongoose = require("mongoose");
const Mechanic = require("./Mechanic"); // Make sure to import the Mechanic model

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // duration in minutes
  },
  assignedMechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the Mechanic model
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Assigned", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
