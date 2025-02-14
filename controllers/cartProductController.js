const CartProduct = require("../model/CartProduct");
const User = require("../model/User");
const Product = require("../model/Product"); // Assuming you have a Product model

// Add Cart Product (Based on User)
exports.addCartProduct = async (req, res) => {
  try {
    const { userId, cartProductImage, cartProductName, cartProductPrice, cartProductQuantity, cartProductDesc, productId } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Create cart product
    const cartProduct = new CartProduct({
      cartProductId: productId,
      cartProductImage,
      cartProductName,
      cartProductPrice,
      cartProductQuantity,
      cartProductDesc,
    });

    // Save cart product
    const savedCartProduct = await cartProduct.save();

    // Add cartProduct to User's cart
    await User.findByIdAndUpdate(userId, { $push: { cartProducts: savedCartProduct._id } });

    res.status(201).json(savedCartProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cart Product Quantity (Check against original product quantity)
exports.updateCartProductQuantity = async (req, res) => {
  try {
    const { cartProductId, newQuantity } = req.body;

    // Find cart product
    const cartProduct = await CartProduct.findById(cartProductId);
    if (!cartProduct) return res.status(404).json({ message: "Cart product not found" });

    // Find original product to check stock
    const product = await Product.findById(cartProduct.cartProductId);
    if (!product) return res.status(404).json({ message: "Original product not found" });

    if (newQuantity > product.stock)
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });

    // Update quantity
    cartProduct.cartProductQuantity = newQuantity;
    await cartProduct.save();

    res.status(200).json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cart Product
exports.deleteCartProduct = async (req, res) => {
  try {
    const { userId, cartProductId } = req.params;

    // Delete from CartProduct collection
    const deletedCartProduct = await CartProduct.findByIdAndDelete(cartProductId);
    if (!deletedCartProduct) return res.status(404).json({ message: "Cart product not found" });

    // Remove from User's cart
    await User.findByIdAndUpdate(userId, { $pull: { cartProducts: cartProductId } });

    res.status(200).json({ message: "Cart product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cart Products by User ID
exports.getCartProductsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate cart products
    const user = await User.findById(userId).populate("cartProducts");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.cartProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
