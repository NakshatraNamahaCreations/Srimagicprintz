const RecceModel = require("../../Model/Reccemanagement/recce");
var savedCompletedRecceId;
var savecompletedDesignId;
var savecompletedPrintId;
var savecompletedFabricationId;
var savecompletedinstalationId;
class Reccemanagement {
  async AddRecce(req, res) {
    let {
      ClientName,
      ShopName,
      Area,
      City,
      ContactNumber,
      Pincode,
      Zone,
      datastatus,
      Designstatus,
      printingStatus,
      fabricationstatus,
      installationSTatus,
    } = req.body;

    try {
      let newRecce = new RecceModel({
        ClientName,
        ShopName,
        Designstatus: "Pending",
        printingStatus: "Pending",
        fabricationstatus: "Pending",
        Area,
        City,
        ContactNumber,
        Pincode,
        Zone,
        vendor: null,
        category: null,
        datastatus: "Pending",
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
      });

      let allrecce = await newRecce.save();

      return res
        .status(200)
        .json({ message: "recce assigned succesfully", data: allrecce });
    } catch (err) {
      console.log(err, "add recce");
    }
  }

  async addreccevaiexcel(req, res) {
    const data = req.body;

    try {
      const transformedData = data.map((item) => ({
        ClientName: item.ClientName,
        ShopName: item.ShopName,
        Area: item.Area,
        City: item.City,
        ContactNumber: item.ContactNumber,
        Pincode: item.Pincode,
        Zone: item.Zone,
        vendor: [item.VendorId],
      }));

      const insertedRecce = await RecceModel.insertMany(transformedData);
      if (insertedRecce.length > 0) {
        return res.status(200).json({ message: "Recce uploaded successfully" });
      } else {
        return res.status(400).json({ error: "Failed to add Recce" });
      }
    } catch (error) {
      console.error("Error adding Recce:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async AddRecceDetails(req, res) {
    const recceId = req.params.reccevendorid;

    try {
      const { vendor } = req.body;
      const updatedRecce = await RecceModel.findOne({ _id: recceId });

      if (!updatedRecce) {
        return res.status(404).json({ message: "Recce entry not found" });
      }

      if (vendor !== undefined) {
        updatedRecce.vendor = vendor;
      }

      const saveRecce = await RecceModel.findOneAndUpdate(
        { _id: recceId },
        updatedRecce,
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Recce details added", data: saveRecce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating recce" });
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
    const recceId = req.params.reccedataid;
    let file = req?.file?.filename;
    try {
      const {
        ClientName,
        Designstatus,
        ShopName,
        Area,
        City,
        ContactNumber,
        Pincode,
        Zone,
        reccedesign,
        fabricationstatus,
        category,
        datastatus,
        reccehight,
        reccewidth,
        recceUnit,
        designupload,
        printingStatus,
        printupload,
        fabricationupload,
        installationupload,
        installationSTatus,
      } = req.body;

      // Find the existing record first
      const existingRecce = await RecceModel.findById(recceId);

      if (!existingRecce) {
        return res.status(404).json({ message: "Recce not found" });
      }

      // Update the properties with new or existing values based on conditions
      const updatedRecce = await RecceModel.findOneAndUpdate(
        { _id: recceId },
        {
          ClientName,
          ShopName,
          Area,
          City,
          ContactNumber,
          Pincode,
          Zone,
          fabricationstatus,
          installationSTatus,
          category,
          datastatus,
          reccehight,
          reccewidth,
          recceUnit,
          Designstatus,
          printingStatus,
          reccedesign: file || existingRecce.reccedesign,
          designupload: file || existingRecce.designupload,
          printupload: file || existingRecce.printupload,
          fabricationupload: file || existingRecce.fabricationupload,
          installationupload: file || existingRecce.installationupload,
        },
        { new: true }
      );

      console.log(updatedRecce, "after");
      return res
        .status(200)
        .json({ message: "Recce details updated", data: updatedRecce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating recce" });
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
  completedFabrication;
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
