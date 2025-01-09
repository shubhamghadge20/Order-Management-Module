const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const InventoryModel = mongoose.model("Inventory", inventorySchema)
module.exports = InventoryModel;
