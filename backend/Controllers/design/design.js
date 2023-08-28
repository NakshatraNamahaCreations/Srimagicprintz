const DesignModel = require("../../Model/design/design");

class DesignManagement {
  async addDesign(req, res) {
    let { reeceDetails, Designstatus } = req.body;
    let file = req?.file?.filename;

    try {
      const design = new DesignModel({
        reeceDetails,
        Designstatus,
        designimage: file,
      });

      // if (!file) {
      //   return res.status(400).json("Please select a file");
      // }

      const alldesign = await design.save();

      return res
        .status(200)
        .json({ success: "Successfully added", data: alldesign });
    } catch (err) {
      console.log(err, "Error while adding design");
      return res.status(500).json({ err: "Server error" });
    }
  }
  async getAllDesign(req, res) {
    try {
      let alldesigns = await DesignModel.find({});
      return res.json({ alldesigns });
    } catch (err) {
      res.json({ err: "server error" });
    }
  }

  async UpdateDesignData(req, res) {
    const recceId = req.params.designid;

    try {
      const { Designstatus } = req.body;

      const updateDesign = await DesignModel.findOneAndUpdate(
        { _id: recceId },
        {
          Designstatus,
        },
        { new: true }
      );

      if (!updateDesign) {
        return res.status(404).json({ message: "design not found" });
      }

      return res
        .status(200)
        .json({ message: "Recce details updated", data: updateDesign });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating recce" });
    }
  }
}

module.exports = new DesignManagement();
