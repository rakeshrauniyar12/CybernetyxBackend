const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  fullAddress: { type: String },
  userAddressId: { type: String, required: true },
});

module.exports = mongoose.model("Address", addressSchema);
