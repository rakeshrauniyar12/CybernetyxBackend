const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/add", categoryController.addCategory);

router.get("/all", categoryController.getAllCategories);

router.put("/update/:categoryId", categoryController.updateCategory);

router.delete("/delete/:categoryId", categoryController.deleteCategory);

module.exports = router;
