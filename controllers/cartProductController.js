const CartProduct = require("../models/CartProduct");

const addProductToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const {
      cartProductImage,
      cartProductName,
      cartProductPrice,
      cartProductQuantity,
      cartProductDesc,
    } = req.body;

    // Create a new product
    const newProduct = await CartProduct.create({
      cartProductImage,
      cartProductName,
      cartProductPrice,
      cartProductQuantity,
      cartProductDesc,
    });

    res.status(201).json({
      success: true,
      message: "Product added to the cart successfully.",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product to the cart.",
      error: error.message,
    });
  }
};


const getAllCartProduct = async (req, res) => {
    try {
      const products = await CartProduct.find(); // Get all products from the cart
      res.status(200).json({
        success: true,
        message: "All products retrieved successfully.",
        products: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving all products from the cart.",
        error: error.message,
      });
    }
  }
export { addProductToCart, getAllCartProduct };
