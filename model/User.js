const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: "" },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // User can have multiple orders
  cartProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartProduct" }], // User's cart products
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }], // User's multiple addresses
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
