const express = require("express");
const router = express.Router();
const cartProductController = require("../controllers/cartProductController");

router.post("/add", cartProductController.addCartProduct);
router.put("/update-quantity", cartProductController.updateCartProductQuantity);
router.delete(
  "/:userId/:cartProductId",
  cartProductController.deleteCartProduct
);
router.get("/:userId", cartProductController.getCartProductsByUserId);

module.exports = router;
