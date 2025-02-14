const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, default: uuidv4 }, // Generate unique productId
  productImage: { type: String, default: "" },
  productName: { type: String, default: "", trim: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, default: 1 },
  productDesc: { type: String, default: "", trim: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
