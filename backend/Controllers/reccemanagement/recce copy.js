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
        ShopName: null,
        ClientName: null,
        OutletArea: null,
        OutletCity: null,
        OutletContactNumber: null,
        OutletPincode: null,
        OutletAddress: null,
        OutletZone: null,
        FLBoard: null,
        vendor: null,
        GSB: null,
        Inshop: null,
        category: null,
        Designstatus: "Pending",
        printingStatus: "Pending",
        fabricationstatus: "Pending",
        RecceStatus: "Pending",
        reccehight: null,
        reccewidth: null,
        recceUnit: null,
        reccedesign: null,
        designupload: null,
        completedPrinting: null,
        completedFabrication: null,
        completedInstallation: null,
        installationSTatus: "Pending",
        printupload: null,
        fabricationupload: null,
        installationupload: null,
        typesofjob: null,
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

  async assignDataByZone(req, res) {
    try {
      const { data } = req.body;
      const { OutletZone } = req.params;

      const recceData = req.body.RecceData;

      if (!Array.isArray(recceData)) {
        return res.status(400).json({ message: "Invalid RecceData format" });
      }

      for (const recceItem of recceData) {
        if (!recceItem || !recceItem.outletName) {
          continue;
        }

        for (const outletArray of recceItem.outletName) {
          if (!Array.isArray(outletArray)) {
            continue;
          }

          for (const outlet of outletArray) {
            if (!outlet || !outlet.OutletZone) {
              continue;
            }

            if (outlet.OutletZone === OutletZone) {
              outlet.ClientName = data.ClientName;
              outlet.ShopName = data.ShopName;
              outlet.OutletArea = data.OutletArea;
              outlet.OutletCity = data.OutletCity;
              outlet.OutletContactNumber = data.OutletContactNumber;
              outlet.OutletPincode = data.OutletPincode;
              outlet.OutletZone = data.OutletZone;
              outlet.FLBoard = data.FLBoard;
              outlet.Inshop = data.Inshop;
              outlet.OutletAddress = data.OutletAddress;
              outlet.RecceStatus = data.RecceStatus;
              outlet.reccehight = data.reccehight;
              outlet.reccewidth = data.reccewidth;
              outlet.recceUnit = data.recceUnit;
              outlet.reccedesign = data.reccedesign;
              outlet.vendor = data.vendor;
              outlet.category = data.category;
              outlet.Designstatus = data.Designstatus;
              outlet.printingStatus = data.printingStatus;
              outlet.fabricationstatus = data.fabricationstatus;
              outlet.installationSTatus = data.installationSTatus;
              outlet.designupload = data.designupload;
              outlet.printupload = data.printupload;
              outlet.fabricationupload = data.fabricationupload;
              outlet.installationupload = data.installationupload;
              outlet.completedRecceId = data.completedRecceId;
              outlet.completedDesign = data.completedDesign;
              outlet.completedPrinting = data.completedPrinting;
              outlet.completedFabrication = data.completedFabrication;
              outlet.completedInstallation = data.completedInstallation;
            }
          }
        }
      }

      for (const recceItem of recceData) {
        await RecceModel.findOneAndUpdate({ _id: recceItem._id }, recceItem);
      }

      return res.status(200).json({ message: "Data assigned successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error assigning data" });
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

  async UpdateRecceData(req, res) {
    const filesToUpdate = req.files || [];
    const { OutlateFabricationNeed, Designstatus } = req.body;
    const recceIdToUpdate = new mongoose.Types.ObjectId(req.params.recceindex);
    const outlateid = new mongoose.Types.ObjectId(req.params.getreccedataid);

    try {
      const existingDocument = await RecceModel.findOne({
        _id: recceIdToUpdate,
        "outletName._id": outlateid,
      });
      console.log("Existing Document:", existingDocument);

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

      console.log("Database update result:", updatedRecceDoc);

      if (updatedRecceDoc.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Outlet not found in Recce document" });
      }

      console.log("Document updated successfully");
      return res.status(200).json({
        message: "Outlet updated successfully",
        data: updatedRecceDoc,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ message: "Error updating document" });
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

      // Extract fields from the request body
      const {
        outletName,
        OutlateFabricationNeed,
        fabricationupload,
        Designstatus,
        printingStatus,
        fabricationstatus,
        installationSTatus,
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

      // Map outlet data and add additional properties
      const outletNameArrayWithIDs = outletName.map((outlet) => ({
        _id: new ObjectId(),
        OutlateFabricationNeed,
        fabricationupload,
        Designstatus,
        printingStatus,
        fabricationstatus,
        installationSTatus,
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
        ...outlet,
      }));

      // Update the document
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


  async SendRecceToDesign(req, res) {
    const outlateid = req.params.getreccedataid;
    const filesToUpdate = req.files || [];
    const { OutlateFabricationNeed, Designstatus, vendor } = req.body;
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
            // "outletName.$.RecceStatus": RecceStatus,
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

}

module.exports = new Reccemanagement();
