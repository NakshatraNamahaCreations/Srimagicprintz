const MarketingclientModel = require("../../Model/marketing/marketing");

class ClientMManagement {
  async AddMarketingclient(req, res) {
    let {
      mclientsName,
      mClientBusinessName,
      mClientsContactNumber1,
      mClientsContactNumber2,
      mClientsEmail,
      mClientAddress,
      mPincode,
      msaleexecutive,
      msaveMeetingTime,
      mZone,
    } = req.body;
    let file = req.file?.filename;

    try {
      let newClientInfo = new MarketingclientModel({
        mclientsName,
        mClientBusinessName,
        mClientsContactNumber1,
        mClientsContactNumber2,
        mClientsEmail,
        mClientAddress,
        mPincode,
        msaleexecutive,
        msaveMeetingTime: null,
        mZone,
        mClientImage: file,
      });
      if (!file) {
        return res.status(400).json({
          status: 400,
          error: "Please select client image",
        });
      }

      const mclientInfo = await newClientInfo.save();

      return res
        .status(200)
        .json({ succes: "client succesfully added", data: mclientInfo });
    } catch (error) {
      console.log("error accours while adding client");
      return res.status(500).json({ error: "server error" });
    }
  }
  async AddSheduleTiming(req, res) {
    const recceId = req.params.sheduleid;

    try {
      const { msaveMeetingTime } = req.body;

      const AddShedueTime = await MarketingclientModel.findOneAndUpdate(
        { _id: recceId },
        { msaveMeetingTime },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Recce details updated", data: AddShedueTime });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating recce" });
    }
  }
  async getAllMarketingClients(req, res) {
    try {
      let mclient = await MarketingclientModel.find({});
      return res.json({ mclient });
    } catch (err) {
      return res.json({ error: "server error" });
    }
  }
}

const clientmcontroller = new ClientMManagement();
module.exports = clientmcontroller;
