const mongoose = require("mongoose");

const RecceModel = new mongoose.Schema(
  {
    ClientName: { type: String },
    BrandName: { type: String },
    ShopName: { type: String },
    Area: { type: String },
    City: { type: String },
    ContactNumber: { type: Number },
    Pincode: { type: Number },
    Zone: { type: String },
    datastatus: { type: String },
    reccehight: { type: String },
    reccewidth: { type: String },
    recceUnit: { type: String },
    reccedesign: { type: String },
    vendor: { type: Array },
    outletName: { type: Array },
    category: { type: Array },
    Designstatus: { type: String },
    printingStatus: { type: String },
    fabricationstatus: { type: String },
    installationSTatus: { type: String },
    designupload: { type: String },
    printupload: { type: String },
    fabricationupload: { type: String },
    installationupload: { type: String },
    completedRecceId: {
      type: String,
    },
    completedDesign: {
      type: String,
    },
    completedPrinting: {
      type: String,
    },
    completedFabrication: {
      type: String,
    },
    completedInstallation: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("assignRecce", RecceModel);
