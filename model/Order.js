const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      productImage: { type: String, required: true },
      productName: { type: String },
      productPrice: { type: Number },
      quantity: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Pending", "Cancelled", "Returned", "Shipped", "Delivered"],
        default: "Pending",
      },
      cancelDetails: {
        isCancel: { type: Boolean, default: false },
        cancellationReason: { type: String },
        cancelAmount: { type: Number, default: 0 },
      },

      returnDetails: {
        isReturned: { type: Boolean, default: false },
        returnReason: { type: String },
        returnDate: { type: Date, default: Date.now() },
        refundProcessed: { type: Boolean, default: false },
        returnAmount: { type: Number, default: 0 },
      },
    },
  ],
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String,default:"COD" },
  status: {
    type: String,
    enum: [
      "Pending",
      "Partially Processed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ],
    default: "Pending",
  },
  userOrderId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports= mongoose.model("Order", orderSchema);
