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
  // async updateRecceOutletName(req, res) {
  //   const outletid = req.params.addexcelid;

  //   try {
  //     if (!outletid || !mongoose.Types.ObjectId.isValid(outletid)) {
  //       return res.status(400).json({ error: "Invalid outletid provided" });
  //     }

  //     const { outletName } = req.body;
  //     const outletNameArrayWithIDs = outletName.map((outlet) => {
  //       const mappedOutlet = {
  //         _id: new ObjectId(),
  //         ...outlet,
  //       };

  //       mappedOutlet.vendor = outlet.vendor || null;
  //       mappedOutlet.unit = outlet.unit || null;
  //       mappedOutlet.State = outlet.State || null;
  //       mappedOutlet.PartnerCode = outlet.PartnerCode || null;
  //       mappedOutlet.height = outlet.height || null;
  //       mappedOutlet.date = outlet.date || null;
  //       mappedOutlet.width = outlet.width || null;
  //       mappedOutlet.category = outlet.category || null;
  //       mappedOutlet.OutlateFabricationNeed =
  //         outlet.OutlateFabricationNeed || null;
  //       mappedOutlet.OutlateFabricationDeliveryType =
  //         outlet.OutlateFabricationDeliveryType || null;
  //       mappedOutlet.InstalationGroup = outlet.InstalationGroup || null;
  //       mappedOutlet.fabricationupload = outlet.fabricationupload || null;
  //       mappedOutlet.GSTNumber = outlet.GSTNumber || null;
  //       mappedOutlet.Designstatus = outlet.Designstatus || null;
  //       mappedOutlet.printingStatus = outlet.printingStatus || null;
  //       mappedOutlet.fabricationstatus = outlet.fabricationstatus || null;
  //       mappedOutlet.installationSTatus = outlet.installationSTatus || null;
  //       mappedOutlet.RecceStatus = outlet.RecceStatus || null;
  //       mappedOutlet.printupload = outlet.printupload || null;
  //       mappedOutlet.installationupload = outlet.installationupload || null;
  //       mappedOutlet.completedDesign = outlet.completedDesign || null;
  //       mappedOutlet.completedRecceId = outlet.completedRecceId || null;
  //       mappedOutlet.completedPrinting = outlet.completedPrinting || null;
  //       mappedOutlet.completedInstallation =
  //         outlet.completedInstallation || null;
  //       mappedOutlet.designupload = outlet.designupload || null;
  //       mappedOutlet.reccedesign = outlet.reccedesign || null;

  //       mappedOutlet.No_Quantity = outlet.No_Quantity || null;
  //       mappedOutlet.SFT = outlet.SFT || null;

  //       mappedOutlet.ProductionRate = outlet.ProductionRate || null;
  //       mappedOutlet.ProductionCost = outlet.ProductionCost || null;
  //       mappedOutlet.transportationcost = outlet.transportationcost || null;
  //       mappedOutlet.InstallationRate = outlet.InstallationRate || null;
  //       mappedOutlet.InstallationCost = outlet.InstallationCost || null;
  //       mappedOutlet.transportationRate = outlet.transportationRate || null;
  //       mappedOutlet.latitude = outlet.latitude || null;
  //       mappedOutlet.longitude = outlet.longitude || null;

  //       return mappedOutlet;
  //     });

  //     const updatedRecce = await RecceModel.findByIdAndUpdate(
  //       outletid,
  //       { $set: { outletName: outletNameArrayWithIDs } },
  //       { new: true }
  //     );

  //     if (!updatedRecce) {
  //       return res
  //         .status(404)
  //         .json({ error: `Document with _id ${outletid} not found` });
  //     }
  //     console.log(updatedRecce, "updatedRecce");
  //     return res
  //       .status(200)
  //       .json({ message: "Outlet names and properties updated successfully" });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     console.log("Error occurred");
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

  async updateRecceOutletName(req, res) {
    const outletid = req.params.addexcelid;

    try {
      if (!outletid || !mongoose.Types.ObjectId.isValid(outletid)) {
        return res.status(400).json({ error: "Invalid outletid provided" });
      }

      const {
        vendor,
        unit,
        State,
        PartnerCode,
        height,
        date,
        width,
        category,
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
        latitude,
        longitude,
        outletName,
        ...rest
      } = req.body;

      const updatedRecce = await RecceModel.findByIdAndUpdate(
        outletid,
        {
          $set: {
            vendor,
            unit,
            State,
            PartnerCode,
            height,
            date,
            width,
            category,
            OutlateFabricationNeed,
            OutlateFabricationDeliveryType,
            InstalationGroup,
            fabricationupload,
            GSTNumber,
            Designstatus: "Pending",
            printingStatus: "Pending",
            fabricationstatus: "Pending",
            installationSTatus: "Pending",
            RecceStatus: "Pending",
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
            latitude,
            longitude,
            outletName,
          },
        },
        { new: true }
      );

      if (!updatedRecce) {
        return res
          .status(404)
          .json({ error: `Document with _id ${outletid} not found` });
      }
      console.log(updatedRecce);
      return res
        .status(200)
        .json({ message: "Outlet properties updated successfully" });
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

  // kiruthika's backend
  // this

  async getAllRecceDataByVendorId(req, res) {
    try {
      const vendorId = req.params.id;
      // console.log("vendorId=======", vendorId);

      const outletData = await RecceModel.aggregate([
        {
          $match: {
            "outletName.vendor": vendorId,
          },
        },
        {
          $project: {
            _id: 1, // Include any fields you need here
            createdAt: 1,
            updatedAt: 1,
            BrandId: 1,
            BrandName: 1,
            outletName: {
              $filter: {
                input: "$outletName",
                as: "outlet",
                cond: { $eq: ["$$outlet.vendor", vendorId] },
              },
            },
          },
        },
      ]);

      if (!outletData || outletData.length === 0) {
        return res
          .status(404)
          .json({ error: "No data for the specified vendor" });
      }

      // console.log("length================", outletData.length);
      // console.log("outletData===================", outletData);

      return res.status(200).json({ outletData });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  // this
  async getParticularRecceByRecceId(req, res) {
    try {
      const recceId = req.params.Id;
      console.log("recceId", recceId);
      const recce = await RecceModel.findOne(
        {
          "outletName._id": recceId,
        },
        {
          "outletName.$": 1, // Select the matched outletName object
          typesofjob: 1,
          _id: 1,
          InstalationGroup: 1,
          BrandId: 1,
          BrandName: 1,
          designupload: 1,
          createdAt: 1,
          updatedAt: 1,
        }
      );
      console.log("reccekjv kef ibiw", recce);

      // const outletData = recce.filter((item) => item._id === recceId);
      if (!recce) {
        return res
          .status(404)
          .json({ error: "No such data present in the database." });
      } else {
        return res.status(200).json({ recce });
      }
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  //this
  async addOutlet(req, res) {
    const outletShopId = req.params.id;
    console.log("OutletShopId:", outletShopId);
    try {
      const boardType = req.body.boardType;
      const newOutlet = {
        outletShopName: req.body.outletShopName,
        category: req.body.category,
        subCategoryName: req.body.subCategoryName,
        height: req.body.height,
        width: req.body.width,
        unitsOfMeasurment: req.body.unitsOfMeasurment,
        quantity: req.body.quantity,
        remark: req.body.remark,
        jobStatus: req.body.jobStatus,
        boardType: req.body.boardType,
        // : req.body.ouletBannerImage,
      };

      const boardDocument = await RecceModel.findOne({
        "outletName._id": outletShopId,
      });
      console.log("BoardDocument:", boardDocument);

      if (boardDocument) {
        return res.status(403).json({ error: "Board document not found" });
      }

      const outlet = boardDocument.outletName?.find(
        (outlet) => outlet._id == outletShopId
      );
      if (!outlet) {
        return res.status(404).json({ error: "Outlet not found" });
      }
      outlet[boardType].push(newOutlet);

      await boardDocument.save();
      return res.status(200).json({ success: "Thanks for completing the job" });
    } catch (err) {
      console.log(err, "error");
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  // async completeJob(req, res) {
  //   try {
  //     const shopId = req.params.id;
  //     const { jobStatus } = req.body;
  //     // const findShop = await RecceModel.findByIdAndUpdate({ "outletName._id": shopId });
  //     // const updateShop = await RecceModel.updateOne(
  //     //   {
  //     //     "outletName._id": findShop,
  //     //   },
  //     //   {
  //     //     $set: {
  //     //       "outletName.$.jobStatus": jobStatus,
  //     //     },
  //     //   }
  //     // );
  //     const updateShop = await RecceModel.findByIdAndUpdate(
  //       { "outletName._id": shopId },
  //       { $set: { "outletName.$.jobStatus": jobStatus } },
  //       { new: true } // This option returns the modified document
  //     );
  //     if (!updateShop) {
  //       return res
  //         .status(404)
  //         .json({ message: "Outlet not found in Recce document" });
  //     }
  //     return res.status(200).json({
  //       message: "Thanks for completing the job",
  //       data: updateShop,
  //     });
  //   } catch {
  //     return res.status(500).json({ error: "Something went wrong" });
  //   }
  // }

  async completeJob(req, res) {
    try {
      const shopId = req.params.id;

      const findShop = await RecceModel.findOne({ "outletName._id": shopId });
      if (!findShop) {
        return res.status(404).json({ error: "No such record found" });
      }

      const outletIndex = findShop.outletName.findIndex(
        (outlet) => outlet._id.toString() === shopId
      );

      if (outletIndex !== -1) {
        // Update the jobStatus for the found outlet
        findShop.outletName[outletIndex].jobStatus = true;

        // Save the changes to the database
        await findShop.save();

        return res.status(200).json({
          message: "Thanks for completing the job",
          data: findShop,
        });
      } else {
        return res.status(404).json({ error: "Outlet not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = new Reccemanagement();
