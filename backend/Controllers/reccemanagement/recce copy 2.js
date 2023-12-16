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
    let {
      BrandOnerName,
      Area,
      City,
      ContactNumber,
      Pincode,
      Zone,
      outletName,
      BrandName,
    } = req.body;

    try {
      let newRecce = new RecceModel({
        BrandOnerName,
        Area,
        City,
        ContactNumber,
        Pincode,
        Zone,
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

  async AddRecceDetails(req, res) {
    const venoderid = req.params.vendorid;
    const typesofjobid = req.params.typesofjobid;
    const zone = req.params.zone;
    try {
      const recceDataArray = req.body.RecceData;

      if (!Array.isArray(recceDataArray)) {
        return res.status(400).json({ message: "Invalid RecceData format" });
      }

      const updatedRecceData = [];

      for (const recceData of recceDataArray) {
        if (!recceData || !Array.isArray(recceData.outletName)) {
          continue;
        }

        for (const outletArray of recceData.outletName) {
          if (!Array.isArray(outletArray)) {
            continue;
          }

          for (const outlet of outletArray) {
            if (!outlet) {
              continue;
            }

            if (outlet.OutletZone === zone) {
              outlet.typesofjob = typesofjobid;
              outlet.vendor = venoderid;
              outlet.updatedAt = new Date();
            }
          }
        }

        const updatedRecce = await RecceModel.findOneAndUpdate(
          { _id: recceData._id },
          recceData,
          { new: true }
        );

        if (!updatedRecce) {
          return res.status(404).json({ message: "Document not found" });
        }

        updatedRecceData.push(updatedRecce);
      }

      return res.status(200).json({
        message: "Vendor updated successfully for the selected zone",
        data: updatedRecceData,
      });
    } catch (error) {
      console.error("Error updating vendor:", error);
      return res.status(500).json({ message: "Error updating vendor" });
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

  async SendRecceToDesign(req, res) {
    const CompleteId = req.params.completedid;
    try {
      let completeRecce = await RecceModel.findById(CompleteId);
      if (completeRecce) {
        savedCompletedRecceId = CompleteId;
        completeRecce.completedRecceId = CompleteId;
        await completeRecce.save();

        return res.status(200).json({ completedRecce: completeRecce });
      }
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
    savecompletedDesignId;
  }

  async SendDesignToPrinting(req, res) {
    const desigid = req.params.designcompletedid;
    try {
      let completedesign = await RecceModel.findById(desigid);
      if (completedesign) {
        savecompletedDesignId = desigid;
        completedesign.completedDesign = desigid;
        await completedesign.save();

        return res.status(200).json({ completedRecce: completedesign });
      }
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }

  async SendPrintToFabrication(req, res) {
    const printid = req.params.completedprintid;
    try {
      let completedprint = await RecceModel.findById(printid);
      if (completedprint) {
        savecompletedPrintId = printid;
        completedprint.completedPrinting = printid;
        await completedprint.save();

        return res.status(200).json({ completedRecce: completedprint });
      }
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }

  async SendPrintToInstallation(req, res) {
    const fabrication = req.params.completedfabricationid;
    try {
      let completedfabrication = await RecceModel.findById(fabrication);
      if (completedfabrication) {
        savecompletedFabricationId = fabrication;
        completedfabrication.completedFabrication = fabrication;
        await completedfabrication.save();

        return res.status(200).json({ completedRecce: completedfabrication });
      }
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }

  async SendPrintToJobTrack(req, res) {
    const instalation = req.params.getinstalationid;
    try {
      let completedinstalation = await RecceModel.findById(instalation);
      if (completedinstalation) {
        savecompletedinstalationId = instalation;
        completedinstalation.completedInstallation = instalation;
        await completedinstalation.save();

        return res.status(200).json({ completedRecce: completedinstalation });
      }
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }
  // async UpdateOutletStatus(req, res) {
  //   const outlerIDD = req.params.outletiddd;
  //   const RecceStatus = req.params.status;

  //   try {
  //     const filter = {
  //       "outletName._id": outlerIDD,
  //     };

  //     const update = {
  //       $set: {
  //         "outletName.$.RecceStatus": RecceStatus,
  //       },
  //     };

  //     const result = await RecceModel.updateOne(filter, update);

  //     if (result.nModified === 0) {
  //       return res
  //         .status(404)
  //         .json({ message: "Outlet not found in Recce document" });
  //     }

  //     return res.status(200).json({ message: "Outlet updated successfully" });
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ message: "Error updating outlet", error: error.message });
  //   }
  // }
  async getAllRecce(req, res) {
    try {
      const RecceData = await RecceModel.find({});
      return res.status(200).json({ RecceData });
    } catch (err) {
      return res.status(500).json({ err: "server error" });
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
        category,
        outletName,
        OutlateFabricationNeed,
        fabricationupload,
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
        vendor,
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

  async UpdateRecceData(req, res) {
    const outlateid = req.params.getreccedataid;
    const filesToUpdate = req.files || [];
    const { OutlateFabricationNeed, Designstatus } = req.body;
    const recceIdToUpdate = new mongoose.Types.ObjectId(req.params.recceindex);

    try {
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
          },
        }
      );

      if (!updatedRecceDoc) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      return res.status(200).json({
        message: "Outlet updated successfully",
        data: updatedRecceDoc,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error updating document" });
    }
  }

  async deleteOutletData(req, res) {
    const outletIdToDelete = req.params.outletin;

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
}

module.exports = new Reccemanagement();
