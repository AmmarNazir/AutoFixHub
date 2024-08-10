const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subServices: [subServiceSchema], // Array of sub-services
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
