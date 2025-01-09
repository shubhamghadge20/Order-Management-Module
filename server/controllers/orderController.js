const Order = require("../models/orderModel")
const Inventory = require('../models/inventoryModel');

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message : error.message});
  }
};

exports.createUserOrder = async (req, res) => {
  try {
    res.json(await new Order(req.body).save());
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message : error.message});
  }
};


exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Admin only check
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ msg: 'Order is already cancelled' });
    }

    // Update inventory (restock items)
    for (let item of order.items) {
      try {
        const inventory = await Inventory.findOne({ productId: item.productId });
        if (inventory) {
          inventory.stock += item.quantity;
          await inventory.save();
        }
      } catch (error) {
        console.error(`Error updating inventory for product ${item.productId}:`, error);
      }
    }

    order.status = 'Cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};