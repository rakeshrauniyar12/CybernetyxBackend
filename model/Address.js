const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  flatNumber: { type: String, required: true },
  towerNumber: { type: String, required: true },
  user: { type: String, ref: "User" }, // Reference to User
});

const Address = mongoose.model("Address", addressSchema);

