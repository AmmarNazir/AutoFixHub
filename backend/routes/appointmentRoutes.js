// routes/appointmentRoutes.js
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const appointmentController = require("../controllers/appointmentController");

const router = express.Router();
const {
  createAppointment,
  getAppointment,
  updateAppointment,
  assignMechanic,
} = require("../controllers/appointmentController");

router.post("/", authenticateToken, appointmentController.createAppointment);
router.get("/", getAppointment);
router.put("/:id", updateAppointment);

// New route for assigning a mechanic
router.put("/:id/assign", assignMechanic); // Ensure this matches the route used in your frontend
// routes/appointmentRoutes.js
router.get(
  "/mechanic/:mechanicId",
  authenticateToken,
  appointmentController.getMechanicAppointments
);

router.put(
  "/:id/update-status",
  authenticateToken,
  appointmentController.updateAppointmentStatus
);

//to get all booked slots

router.get("/check-availability", async (req, res) => {
  const { service, date } = req.query;

  try {
    const appointments = await Appointment.find({ service, date });
    const bookedSlots = appointments.map((appointment) => appointment.time);
    res.status(200).json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available slots" });
  }
});

module.exports = router;
