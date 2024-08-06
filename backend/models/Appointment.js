// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    service: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' }, // reference to the Mechanic model
    status: { type: String, default: 'Pending' } // Pending, Assigned, Completed
});

module.exports = mongoose.model('Appointment', appointmentSchema);
