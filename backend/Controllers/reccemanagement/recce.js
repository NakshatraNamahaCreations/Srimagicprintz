const RecceModel = require("../../Model/Reccemanagement/recce");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var savedCompletedRecceId;
var savecompletedDesignId;
var savecompletedPrintId;
var savecompletedFabricationId;
var savecompletedinstalationId;
class Reccemanagement {
  async AddRecce(req, res) {
    let { BrandId, outletName, BrandName } = req.body;

    try {
      let newRecce = new RecceModel({
        BrandId,
        outletName,
        BrandName,
      });

      let allrecce = await newRecce.save();

      return res
        .status(200)
        .json({ message: "recce assigned succesfully", data: allrecce });
    } catch (err) {
      console.log(err, "add recce");
    }
  }

  async DeletRecce(req, res) {
    const recceId = req.params.reccedeleteid;

    try {
      const data = await RecceModel.deleteOne({ _id: recceId });

      if (data) {
        return res.status(200).json({ message: "Recce Deleted Succesfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error while deleting recce" });
    }
  }

  async updateRecceOutletName(req, res) {
    const outletid = req.params.addexcelid;

    try {
      if (!outletid || !mongoose.Types.ObjectId.isValid(outletid)) {
        return res.status(400).json({ error: "Invalid outletid provided" });
      }

      const {
        vendor,
        unit,
        height,
        date,
        width,
        category,
        outletName,
        OutlateFabricationNeed,
        OutlateFabricationDeliveryType,
        InstalationGroup,
        fabricationupload,
        GSTNumber,
        Designstatus,
        printingStatus,
        fabricationstatus,
        installationSTatus,
        RecceStatus,
        printupload,
        installationupload,
        completedDesign,
        completedRecceId,
        completedPrinting,
        completedInstallation,
        designupload,
        reccedesign,
        No_Quantity,
        SFT,
        ProductionRate,
        ProductionCost,
        transportationcost,
        InstallationRate,
        InstallationCost,
        transportationRate,
      } = req.body;

      const outletNameArrayWithIDs = outletName.map((outlet) => ({
        _id: new ObjectId(),
        OutlateFabricationNeed,
        OutlateFabricationDeliveryType,
        InstalationGroup,
        vendor,
        date,
        GSTNumber,
        unit,
        height,
        width,
        category,
        fabricationupload,
        Designstatus: "Pending",
        printingStatus: "Pending",
        fabricationstatus: "Pending",
        installationSTatus: "Pending",
        printupload,
        RecceStatus: "Pending",
        installationupload,
        completedDesign,
        completedRecceId,
        completedPrinting,
        completedInstallation,
        designupload,
        reccedesign,
        No_Quantity,
        SFT,
        ProductionRate,
        ProductionCost,
        transportationcost,
        InstallationRate,
        InstallationCost,
        transportationRate,
        createdAt: new Date(),
        ...outlet,
      }));

      const updatedRecce = await RecceModel.findByIdAndUpdate(
        outletid,
        { $push: { outletName: { $each: outletNameArrayWithIDs } } },
        { new: true }
      );

      if (!updatedRecce) {
        return res
          .status(404)
          .json({ error: `Document with _id ${outletid} not found` });
      }

      return res
        .status(200)
        .json({ message: "Outlet names updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      console.log("Error occurred");
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteOutletData(req, res) {
    const outletIdToDelete = new mongoose.Types.ObjectId(req.params.outletin);

    try {
      const result = await RecceModel.updateOne(
        { "outletName._id": outletIdToDelete },
        { $pull: { outletName: { _id: outletIdToDelete } } }
      );

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      return res.status(200).json({ message: "Outlet deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting outlet", error: error.message });
    }
  }
  async UpdateOutletVendor(req, res) {
    const outlerIDD = new mongoose.Types.ObjectId(req.params.outletiddd);
    const vendorId = req.params.vendoridd;
    const currentDate = new Date();

    try {
      const filter = {
        "outletName._id": outlerIDD,
      };

      const update = {
        $set: {
          "outletName.$.vendor": vendorId,
          "outletName.$.date": currentDate,
        },
      };

      const result = await RecceModel.updateOne(filter, update);

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      return res.status(200).json({ message: "Outlet updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating outlet", error: error.message });
    }
  }
  async UpdateInstallationToVendor(req, res) {
    const outlerIDD = new mongoose.Types.ObjectId(req.params.outletiddd);
    const InstalationIdvendor = req.params.instalationgroup;
    const currentDate = new Date();

    try {
      const filter = {
        "outletName._id": outlerIDD,
      };

      const update = {
        $set: {
          "outletName.$.InstalationGroup": InstalationIdvendor,
          "outletName.$.date": currentDate,
        },
      };

      const result = await RecceModel.updateOne(filter, update);

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      return res.status(200).json({ message: "Outlet updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating outlet", error: error.message });
    }
  }
  async UpdateRecceData(req, res) {
    const filesToUpdate = req.files || [];

    const {
      OutlateFabricationNeed,
      Designstatus,
      OutlateFabricationDeliveryType,
      fabricationstatus,
      RecceStatus,
      installationSTatus,
      printingStatus,
      InstalationGroup,
    } = req.body;

    const { recceindex, getreccedataid } = req.params;

    let recceIdToUpdate = recceindex;

    const formattedGetRecceDataId = getreccedataid.replace(/['"]+/g, "");

    const outlateid = new mongoose.Types.ObjectId(formattedGetRecceDataId);

    try {
      const existingDocument = await RecceModel.findOne({
        _id: recceIdToUpdate,
        "outletName._id": outlateid,
      });
      console.log("existingDocument:", existingDocument);

      if (!existingDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      const updatedRecceDoc = await RecceModel.updateOne(
        {
          _id: recceIdToUpdate,
          "outletName._id": outlateid,
        },
        {
          $set: {
            "outletName.$.OutlateFabricationNeed": OutlateFabricationNeed,
            "outletName.$.designupload": filesToUpdate,
            "outletName.$.Designstatus": Designstatus,
            "outletName.$.OutlateFabricationDeliveryType":
              OutlateFabricationDeliveryType,
            "outletName.$.fabricationstatus": fabricationstatus,
            "outletName.$.RecceStatus": RecceStatus,
            "outletName.$.installationSTatus": installationSTatus,
            "outletName.$.printingStatus": printingStatus,
            "outletName.$.InstalationGroup": InstalationGroup,
            "outletName.$.updatedAt": new Date(),
          },
        }
      );

      if (updatedRecceDoc.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      return res.status(200).json({
        message: "Outlet updated successfully",
        data: updatedRecceDoc,
      });
    } catch (error) {
      console.error("Error during update:", error);
      return res.status(500).json({ message: "Error updating document" });
    }
  }

  async getAllRecce(req, res) {
    try {
      const RecceData = await RecceModel.find({});
      return res.status(200).json({ RecceData });
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }
}

module.exports = new Reccemanagement();
