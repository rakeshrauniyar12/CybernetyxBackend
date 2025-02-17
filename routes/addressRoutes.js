const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/add", addressController.addAddress);
router.get("/get/:userId", addressController.getAddressByUserId);
router.delete("/delete/:userId/:addressId", addressController.deleteAddressByUserAndAddressId);
router.put("/update/:userId/:addressId", addressController.updateAddressByUserAndAddressId);

module.exports = router;
