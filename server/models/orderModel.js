const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
    },
    items: [
      {
        // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productId : String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const OrderModel =  mongoose.model("Order", orderSchema)

module.exports = OrderModel;
