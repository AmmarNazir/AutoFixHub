// models/Mechanic.js
const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  specialties: {
    type: [String],
    required: true
  }
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;
