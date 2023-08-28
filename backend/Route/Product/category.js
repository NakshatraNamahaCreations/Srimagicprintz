const express = require("express");
const router = express.Router();
const CategoryController = require("../../Controllers/Product/category");


router.post("/addcategory", CategoryController.AddCategory);
router.get("/getcategory", CategoryController.getAllcategory);
router.put("/editcategory/:editId", CategoryController.updateCategory);
router.delete("/deletecategory/:catagoryid", CategoryController.deleteCatagory);

module.exports = router;
