const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subCategoryName: { type: String },
  catagoryName: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const subcategoryModel = mongoose.model("subcategory", subcategorySchema);
module.exports = subcategoryModel;
