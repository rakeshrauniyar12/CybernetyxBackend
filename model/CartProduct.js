const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  cartProductId: { type: mongoose.Schema.Types.ObjectId },
  cartProductImage: { type: String, required: true, default: "" },
  cartProductName: { type: String, default: "" },
  cartProductPrice: { type: Number, required: true },
  cartProductQuantity: { type: Number, default: 1 },
  cartProductDesc: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CartProduct", cartProductSchema);
