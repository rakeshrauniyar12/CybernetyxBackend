const Product = require("../model/Product.js")


const addProduct = async (req, res) => {
    try {
      const productData = req.body; // Get product data from request body
      const newProduct = await Product.create(productData);
  
      res.status(201).json({
        success: true,
        message: "Product added successfully.",
        product: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding product.",
        error: error.message,
      });
    }
  }

  const getProductById = async (req, res) => {
    try {
      const { id } = req.params; // Get product ID from URL parameters
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully.",
        product: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving product.",
        error: error.message,
      });
    }
  }


  const getAllProduct = async (req, res) => {
    try {
      const products = await Product.find(); // Get all products
      res.status(200).json({
        success: true,
        message: "All products retrieved successfully.",
        products: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving all products.",
        error: error.message,
      });
    }
  }


  export {addProduct,getProductById,getAllProduct}