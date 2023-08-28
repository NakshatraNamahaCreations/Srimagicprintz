const categoryModel = require("../../Model/Product/category");

class CategoryManagement {
  async AddCategory(req, res) {
    let { categoryName, createdAt } = req.body;
    try {
      const newCategory = new categoryModel({
        categoryName,
        createdAt,
      });
      newCategory.save().then((item) => {
        console.log(item);
        return res.status(200).json({ succes: "succesfull" });
      });
    } catch (err) {
      console.log("Error in creating new category", err);
    }
  }

  async getAllcategory(req, res) {
    try {
      let category = await categoryModel.find({});
      if (category) {
        return res.json({ category: category });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCatagory(req, res) {
    let catagory = req.params.catagoryid;

    const data = await categoryModel.deleteOne({ _id: catagory });

    if (data) {
      console.log("Deleted Successfully");
      return res.json({ success: " Deleted Successfully " });
    } else {
      console.log("not able to delete");
      return res.json({ error: "not able to complete" });
    }
  }

  async updateCategory(req, res) {
    try {
      let editId = req.params.editId;

      let { categoryName } = req.body;
      let data = await categoryModel.findOneAndUpdate(
        { _id: editId },
        {
          categoryName,
        }
      );
      if (data) {
        return res
          .status(200)
          .json({ Success: "Please edit category", category: data });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

const CategoryController = new CategoryManagement();
module.exports = CategoryController;
