const Order = require("../models/Order");

const orderController = {
  createOrder: async (req, res) => {
    console.log("req.user", req.user);
    console.log("Order creation payload:", req.body);
    try {
      const { items, totalAmount } = req.body;
      const userId = req.user.userId; // Extract user ID from the request

      // Ensure items are passed and valid
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in the order." });
      }

      // Create a new order document
      const order = new Order({
        user: userId, // Set the user field
        products: items.map((item) => ({
          product: item.product, // Ensure this corresponds to the correct field in your schema
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        totalAmount: totalAmount,
        status: "Pending",
      });

      // Save the order to the database
      await order.save();

      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate({
          path: "products.product",
          model: "Product",
          select: "title price", // Specify the fields you want to select from the Product model
        })
        .exec();

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  },

  // New function: Get Orders
  getOrders: async (req, res) => {
    try {
      let orders;

      // Check if the user is an admin
      if (req.user.isAdmin) {
        // If admin, get all orders
        orders = await Order.find()
          .populate({
            path: "products.product",
            model: "Product",
            select: "title price",
          })
          .populate({
            path: "user",
            model: "User",
            select: "username email",
          })
          .exec();
      } else {
        // If not admin, get orders for the logged-in user
        orders = await Order.find({ user: req.user._id })
          .populate({
            path: "products.product",
            model: "Product",
            select: "title price",
          })
          .exec();
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (
        order.user.toString() !== req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      Object.assign(order, req.body);
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res
        .status(500)
        .json({ message: "Failed to update order", error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (
        order.user.toString() !== req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res
        .status(500)
        .json({ message: "Failed to delete order", error: error.message });
    }
  },
};

module.exports = orderController;
