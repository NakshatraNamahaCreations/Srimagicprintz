const mongoose = require("mongoose");

const RecceModel = new mongoose.Schema(
  {
    BrandOnerName: { type: String },
    Area: { type: String },
    City: { type: String },
    ContactNumber: { type: Number },
    typesofjob: { type: Array },
    Pincode: { type: Number },
    Zone: { type: String },
    BrandName: { type: String },
    ClientName: { type: String },
    ShopName: { type: String },
    OutletArea: { type: String },
    OutlateFabricationNeed: { type: String },
    OutletCity: { type: String },
    OutletContactNumber: { type: Number },
    OutletPincode: { type: Number },
    OutletAddress: { type: Number },
    OutletZone: { type: String },
    FLBoard: { type: String },
    GSB: { type: String },
    Inshop: { type: String },
    RecceStatus: { type: String },
    reccehight: { type: String },
    reccewidth: { type: String },
    recceUnit: { type: String },
    reccedesign: { type: String },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    outletName: { type: Array },
    category: { type: String },
    Designstatus: { type: String },
    printingStatus: { type: String },
    fabricationstatus: { type: String },
    installationSTatus: { type: String },
    designupload: [String],
    printupload: { type: String },
    fabricationupload: { type: String },
    installationupload: { type: String },
    No_Quantity: { type: Number },
    SFT: { type: Number },
    ProductionRate: { type: Number },
    ProductionCost: { type: Number },
    transportationcost: { type: Number },
    InstallationRate: { type: Number },
    InstallationCost: { type: Number },
    transportationRate: { type: Number },
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
