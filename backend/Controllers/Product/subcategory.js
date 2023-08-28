const SubcatagoryModel = require("../../Model/Product/subcategory");

class SubCatagory {
  async AddSubcatagory(req, res) {
    let { subCategoryName, catagoryName } = req.body;
    try {
      let newSubCatagory = new SubcatagoryModel({
        subCategoryName,
        catagoryName,
      });

      newSubCatagory.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log(error, "error while creating subcategory");
    }
  }

  async getsubcategory(req, res) {
    let subcategory = await SubcatagoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postsubcategory(req, res) {
    let { catagoryName } = req.body;
    let data = await SubcatagoryModel.find({ catagoryName }).sort({
      _id: -1,
    });

    if (data) {
      return res.json({ subcategory: data });
    }
  }

  async getSubcategoriesByCategory(req, res) {
    const { categoryName } = req.body;
    try {
      const subcategories = await SubcatagoryModel.find({ categoryName }).sort({
        _id: -1,
      });
      if (subcategories.length === 0) {
        console.log(subcategory, "subcategories");
        return res.json({ subcategory: subcategories });
      } else {
        return res.json({ su: [] });
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllSubcatagory(req, res) {
    try {
      let AllsubCatagory = await SubcatagoryModel.aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "catagoryId",
            foreignField: "_id",
            as: "catagories",
          },
        },
      ]);
      if (AllsubCatagory) {
        return res.send({ subcatagory: AllsubCatagory });
      } else {
        return res.status(404).json({ error: "subcatagory didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }
  async updateSubcategory(req, res) {
    let EditsubcategoryId = req.params.editsubcategoryid;
    let { subCategoryName, catagoryName } = req.body;
    try {
      let data = await SubcatagoryModel.findOneAndUpdate(
        { _id: EditsubcategoryId },
        { subCategoryName, catagoryName }
      );
      if (data) {
        return res
          .status(200)
          .json({ Success: "Updated successfully", subcategory: data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSubCatagory(req, res) {
    let subcatagory = req.params.subcatagoryid;
    const data = await SubcatagoryModel.deleteOne({ _id: subcatagory });

    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const SubCatagoryController = new SubCatagory();
module.exports = SubCatagoryController;
