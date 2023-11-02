const outletBoardModal = require("../../Model/Reccemanagement/outletUpload");
class outLetBoardManagement {
  async addOutlet(req, res) {
    let {
      vendorId,
      outletObejctId,
      outletBrandId,
      outletBrandName,
      category,
      subCategoryName,
      height,
      width,
      unitsOfMeasurment,
      quantity,
      outletRecceIdId,
      remark,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newOutlet = new outletBoardModal({
        vendorId,
        outletObejctId,
        outletBrandId,
        outletBrandName,
        category,
        subCategoryName,
        height,
        width,
        unitsOfMeasurment,
        quantity,
        outletRecceIdId,
        ouletBannerImage: file,
        remark,
      });
      let allOutlet = await newOutlet.save();
      return res
        .status(200)
        .json({ success: "Details Collected successfully", allOutlet });
    } catch (err) {
      console.log(err, "error");
      return res.status.json({ error: "Something went wrong" });
    }
  }

  async getAllOutlets(req, res) {
    try {
      const outletData = await outletBoardModal.find({});
      return res.status(200).json({ outletData });
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }

  async getshopDataByRecceId(req, res) {
    try {
      let shopId = req.params.id;
      const outletBoard = await outletBoardModal.findOne({
        outletRecceIdId: shopId,
      });
      if (!outletBoard) {
        return res.status(404).json({ error: "outletBoard not found" });
      }
      return res.json({ outletBoard });
    } catch (err) {
      console.log("Error in fetching particular outletBoard by id", err);
      return res.status(500).json({ error: "server error" });
    }
  }

}

module.exports = new outLetBoardManagement();