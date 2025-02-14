const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to add a product
router.post("/add", productController.addProduct);

// Route to update a product (one or more fields)
router.put("/update/:id", productController.updateProduct);

// Route to delete a product by ID
router.delete("/delete/:id", productController.deleteProduct);

// Route to get all products
router.get("/all", productController.getAllProducts);
router.get("/category/:categoryName", productController.getProductsByCategoryName);
// Route to get a product by ID
router.get("/:id", productController.getProductById);

module.exports = router;
