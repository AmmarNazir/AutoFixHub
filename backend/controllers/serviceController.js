const Service = require('../models/Service');

const serviceController = {
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get services', error: error.message });
    }
  },
};

module.exports = serviceController;
