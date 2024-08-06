// controllers/orderController.js
const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { items, total } = req.body;
      const userId = req.user.userId; // Get user ID from the authenticated user

      const newOrder = new Order({
        userId,
        items,
        total,
        status: 'pending',
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.user.userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get orders', error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get order', error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
  },
};

module.exports = orderController;
