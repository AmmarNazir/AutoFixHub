// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment({
            ...req.body,
            status: 'Pending'  // Set status as 'Pending' when creating a new appointment
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('user service assignedMechanic');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, status: 'Assigned' },  // Set status as 'Assigned' when updating
            { new: true }
        );
        res.json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// New method to assign an appointment to a mechanic
exports.assignMechanic = async (req, res) => {
    try {
        const { mechanicId } = req.body;
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.assignedMechanic = mechanicId;
        appointment.status = 'Assigned';
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
