const mongoose = require("mongoose");

const outletBoardUpload = new mongoose.Schema(
  {
    vendorId: String,
    outletRecceIdId: String,
    outletObejctId: String,
    outletBrandId: String,
    outletBrandName: String,
    category: String,
    subCategoryName: String,
    height: Number,
    width: Number,
    unitsOfMeasurment: String,
    quantity: Number,
    ouletBannerImage: String,
    remark: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("outletboard", outletBoardUpload);