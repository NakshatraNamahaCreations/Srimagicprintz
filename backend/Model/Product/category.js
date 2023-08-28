const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String },
  categoryImage: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
