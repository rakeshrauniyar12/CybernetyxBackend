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
          returnDate: { type: Date, default:Date.now() },
          refundProcessed: { type: Boolean, default: false },
          returnAmount: { type: Number, default: 0 },
        },
      },
    ],
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptionProductSchema",
      default: null,
    },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", orderSchema);