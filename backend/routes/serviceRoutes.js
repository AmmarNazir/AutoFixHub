const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.get('/services', servicesController.getServices);

module.exports = router;
