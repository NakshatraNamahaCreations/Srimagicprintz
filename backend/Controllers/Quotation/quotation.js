const QuotationModel = require("../../Model/Quotation/quotation");

class SaveQuotation {
  async QuotationData(req, res) {
    let {
      No_Quantity,
      SFT,
      ProductionRate,
      ProductionCost,
      transportationcost,
      InstallationRate,
      InstallationCost,
      transportationRate,
      ROF,
      Amount,
      TotalAmount,
      GST,
      GrandTotal,
      ReeceId,
      outletid,
      GSTAmount,
    } = req.body;
    try {
      console.log("Received data:", req.body);

      let Quotations = new QuotationModel({
        GSTAmount,
        No_Quantity,
        SFT,
        ProductionRate,
        ProductionCost,
        transportationcost,
        InstallationRate,
        InstallationCost,
        transportationRate,
        ROF,
        Amount,
        TotalAmount,
        GST,
        GrandTotal,
        ReeceId,
        outletid,
      });

      let QuotationsData = await Quotations.save();
      console.log("Saved data:", QuotationsData);

      return res
        .status(200)
        .json({ success: "successfully saved data", data: QuotationsData });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
  async getQuotationData(req, res) {
    try {
      let quotation = await QuotationModel.find({});
      if (quotation) {
        return res
          .status(200)
          .json({ message: "succesfully fetched", data: quotation });
      }
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  }
}

module.exports = new SaveQuotation();
