// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointment,
    updateAppointment
} = require('../controllers/appointmentController');

router.post('/', createAppointment);
router.get('/', getAppointment);
router.put('/:id', updateAppointment);

module.exports = router;
