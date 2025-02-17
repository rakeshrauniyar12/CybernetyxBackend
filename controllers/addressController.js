const Address = require("../model/Address");

// Add a new address
exports.addAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      city,
      state,
      fullAddress,
      userId,
    } = req.body;
    const newAddress = new Address({
      firstName,
      lastName,
      phoneNumber,
      city,
      state,
      fullAddress,
      userAddressId: userId,
    });
    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding address", error: error.message });
  }
};

// Get addresses by user ID
exports.getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId: userId });
    res.status(200).json({ addresses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching addresses", error: error.message });
  }
};

// Delete an address by user ID and address ID
exports.deleteAddressByUserAndAddressId = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting address", error: error.message });
  }
};

// Update an address by user ID and address ID
exports.updateAddressByUserAndAddressId = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({
        message: "Address updated successfully",
        address: updatedAddress,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating address", error: error.message });
  }
};
