// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authenticateToken = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminAuthMiddleware");

router.post(
  "/",
  authenticateToken,
  // authenticateAdmin,
  serviceController.createService
);
router.get("/", authenticateToken, serviceController.getServices);
router.put(
  "/:id",
  authenticateToken,
  // authenticateAdmin,
  serviceController.updateService
);
router.delete(
  "/:id",
  authenticateToken,
  // authenticateAdmin,
  serviceController.deleteService
);

module.exports = router;
