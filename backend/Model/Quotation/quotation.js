const mongoose = require("mongoose");

const QuotationModel = new mongoose.Schema(
  {
    No_Quantity: { type: Array },
    SFT: { type: Array },
    ProductionRate: { type: Array },
    ProductionCost: { type: Array },
    transportationcost: { type: Array },
    InstallationRate: { type: Array },
    InstallationCost: { type: Array },
    transportationRate: { type: Array },
    ROF: { type: Number },
    Amount: { type: Array },
    TotalAmount: { type: Number },
    GST: { type: Number },
    GSTAmount: { type: Number },
    GrandTotal: { type: Number },
    ReeceId: { type: Object },
    outletid: { type: Array },
  },
  { timestamps: true }
);

const ExportQuotationModel = mongoose.model("quotation", QuotationModel);
module.exports = ExportQuotationModel;
