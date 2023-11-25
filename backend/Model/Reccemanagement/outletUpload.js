const mongoose = require("mongoose");

const outletBoardUpload = new mongoose.Schema(
  {
    outletShopName: String,
    outletShopId: String,
    category: String,
    subCategoryName: String,
    height: String,
    width: String,
    unitsOfMeasurment: String,
    quantity: Number,
    ouletBannerImage: String,
    remark: String,
    jobStatus: Boolean,
    boardType: String,
    gstNumber: String,
    vendorId: String,
    vendorName: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("outletboard", outletBoardUpload);
