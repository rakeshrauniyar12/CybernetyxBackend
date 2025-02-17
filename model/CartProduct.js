const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  cartProductId: { type: String },
  cartProductImage: { type: String, required: true, default: "" },
  cartProductName: { type: String, default: "" },
  cartProductPrice: { type: Number, required: true },
  cartProductQuantity: { type: Number, default: 1 },
  cartProductDesc: { type: String, default: "" },
  userCartId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CartProduct", cartProductSchema);
