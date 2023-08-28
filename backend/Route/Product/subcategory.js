const express = require("express");
const router = express.Router();
const SubCatagoryController = require("../../Controllers/Product/subcategory");


router.post("/addsubcategory", SubCatagoryController.AddSubcatagory);

router.post(
  "/getSubcategoriesByCategory",
  SubCatagoryController.getSubcategoriesByCategory
);
router.get("/getsubcategory", SubCatagoryController.getsubcategory);
router.post("/postsubcategory", SubCatagoryController.postsubcategory);
router.get("/getallsubcategory", SubCatagoryController.getAllSubcatagory);
router.put(
  "/updateSubcategory/:editsubcategoryid",
  SubCatagoryController.updateSubcategory
);

router.delete(
  "/deletesubcatagory/:subcatagoryid",
  SubCatagoryController.deleteSubCatagory
);

module.exports = router;
