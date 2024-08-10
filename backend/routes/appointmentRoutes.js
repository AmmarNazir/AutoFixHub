// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointment,
    updateAppointment,
    assignMechanic
} = require('../controllers/appointmentController');

router.post('/', createAppointment);
router.get('/', getAppointment);
router.put('/:id', updateAppointment);

// New route for assigning a mechanic
router.put('/:id/assign', assignMechanic);

module.exports = router;
