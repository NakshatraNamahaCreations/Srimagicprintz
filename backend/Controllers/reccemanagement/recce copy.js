const RecceModel = require("../../Model/Reccemanagement/recce");
var savedCompletedRecceId;
class Reccemanagement {
  async AddRecce(req, res) {
    let { ClientName, ShopName, Area, City, ContactNumber, Pincode, Zone } =
      req.body;

    try {
      let newRecce = new RecceModel({
        ClientName,
        ShopName,
        Area,
        City,
        ContactNumber,
        Pincode,
        Zone,
        vendor: null,
        category: null,
        status: null,
        reccehight: null,
        reccewidth: null,
        recceUnit: null,
        reccedesign: null,
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
      const {
        ClientName,
        ShopName,
        Area,
        City,
        ContactNumber,
        Pincode,
        Zone,
        vendor,
        category,
        status,
        reccehight,
        reccewidth,
        recceUnit,
      } = req.body;
      let file = req.file?.filename;

      const updatedRecce = await RecceModel.findOne({ _id: recceId });

      if (!updatedRecce) {
        return res.status(404).json({ message: "Recce not found" });
      }
      updatedRecce.ClientName = ClientName || updatedRecce.ClientName;
      updatedRecce.ShopName = ShopName || updatedRecce.ShopName;
      updatedRecce.Area = Area || updatedRecce.Area;
      updatedRecce.City = City || updatedRecce.City;
      updatedRecce.ContactNumber = ContactNumber || updatedRecce.ContactNumber;
      updatedRecce.Pincode = Pincode || updatedRecce.Pincode;
      updatedRecce.Zone = Zone || updatedRecce.Zone;
      updatedRecce.vendor = vendor || updatedRecce.vendor;
      updatedRecce.category = category || updatedRecce.category;
      updatedRecce.status = status || updatedRecce.status;
      updatedRecce.reccehight = reccehight || updatedRecce.reccehight;
      updatedRecce.reccewidth = reccewidth || updatedRecce.reccewidth;
      updatedRecce.recceUnit = recceUnit || updatedRecce.recceUnit;
      updatedRecce.reccedesign = file || updatedRecce.reccedesign;

      const saveRecce = await RecceModel.findOneAndUpdate(
        { _id: recceId },
        updatedRecce,
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Recce deatils added", data: saveRecce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating recce" });
    }
  }

  async UpdateRecceData(req, res) {
    let recceid = req.params.reccedataid;
    let {
      ClientName,
      ShopName,
      Area,
      City,
      ContactNumber,
      Pincode,
      Zone,
      vendor,
      category,
      status,
      reccehight,
      reccewidth,
      recceUnit,
    } = req.body;

    try {
      let recceupdate = await RecceModel.findOneAndUpdate(
        { _id: recceid },
        {
          ClientName,
          ShopName,
          Area,
          City,
          ContactNumber,
          Pincode,
          Zone,
          vendor,
          category,
          status,
          reccehight,
          reccewidth,
          recceUnit,
          reccedesign: req.file ? req.file.filename : null,
        },
        { new: true }
      );

      console.log("Updated Recce Data:", recceupdate);

      if (recceupdate) {
        return res.status(200).json({ success: "Successfully edited" });
      } else {
        return res.status(404).json({ error: "Recce not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error while updating" });
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
