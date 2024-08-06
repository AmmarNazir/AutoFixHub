// controllers/orderController.js
const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { items, totalAmount } = req.body;
      const userId = req.user.userId; // Get user ID from the authenticated user

      // Adjust the items structure to match the products array in the Order schema
      const products = items.map(item => ({
        product: item.productId, // Assuming item has productId field
        quantity: item.quantity
      }));

      const newOrder = new Order({
        user: userId,
        products,
        totalAmount,
        status: 'Pending', // Ensure the status matches the enum values
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ message: 'Failed to get orders', error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error('Error getting order:', error);
      res.status(500).json({ message: 'Failed to get order', error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      Object.assign(order, req.body);
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
  },
};

module.exports = orderController;
