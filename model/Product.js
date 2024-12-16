const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId},
  productImage: { type: String,required:true,default: "" },
  productName: { type: String, default: "" },
  productPrice: { type: Number, required:true },
  productQuantity: { type: Number, default:1 },
  productDesc:{type: String, default: ""},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);