const mongoose = require("mongoose");
// const { Object } = require("mongoose/lib/schema/index");
// const { object } = require("mongoose/lib/utils");

const RecceModel = new mongoose.Schema(
  {
    BrandId: { type: String },
    BrandName: { type: String },
    ClientName: { type: String },
    ShopName: { type: String },
    outletName: { type: Array },
    OutlateFabricationNeed: { type: String },
    OutlateFabricationDeliveryType: { type: String },
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
    BrandOnerName: { type: String },
    OutletArea: { type: String },
    GSTNumber: { type: Number },
    unit: { type: String },
    height: { type: Number },
    width: { type: Number },
    date: { type: Date },
    InstalationGroup: { type: Array },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },

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
    jobStatus: {
      type: Boolean,
    },
    latitude: {
      type: String,
    },

    longitude: {
      type: String,
    },
    State: {
      type: String,
    },
    PartnerCode: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("assignRecce", RecceModel);
