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
    jobCancel: Boolean,
    boardType: String,
    gstNumber: String,
    vendorId: String,
    vendorName: String,
    ouletInstallationImage: String, //01-12-2023
    installationCommentOrNote: String, //02-12-2023
    installationStatus: Boolean, //02-12-2023
  },

  { timestamps: true }
);

module.exports = mongoose.model("outletboard", outletBoardUpload);
