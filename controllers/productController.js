const Product = require("../model/Product");
const Category = require("../model/Category");
// ✅ Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      productImage,
      productPrice,
      productQuantity,
      productDesc,
      categoryId,
      inStock,
    } = req.body;

    // Validate required fields
    if (!productName || !productPrice || !categoryId) {
      return res.status(400).json({
        message: "Product name, price, and category ID are required.",
      });
    }

    const product = new Product({
      productName,
      productImage,
      productPrice,
      productQuantity,
      productDesc,
      categoryId, // Reference to Category
      inStock,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};


// ✅ Get all products based on category name
exports.getProductsByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;
     console.log(categoryName)
    // Find the category by name
    const category = await Category.findOne({ categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find products that belong to the found category
    const products = await Product.find({ categoryId: category._id }).populate(
      "categoryId",
      "categoryName"
    );

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products by category name", error });
  }
};

// ✅ Update a product (can update one or multiple fields)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// ✅ Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// ✅ Get all products with category details
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "categoryId",
      "categoryName"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// ✅ Get product by ID with category details
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "categoryId",
      "categoryName"
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// ✅ Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId }).populate(
      "categoryId",
      "categoryName"
    );

    if (!products.length)
      return res
        .status(404)
        .json({ message: "No products found for this category" });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products by category", error });
  }
};
