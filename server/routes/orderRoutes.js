const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserOrders,
  createUserOrder,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// Get all orders for the user (requires authentication)
router.get("/", authMiddleware, getUserOrders);

router.post("/", authMiddleware, createUserOrder);

// Admin: Update order status
router.put("/update-status/:orderId", authMiddleware, updateOrderStatus);

// Cancel an order
router.delete("/:orderId/cancel", authMiddleware, cancelOrder);

module.exports = router;
