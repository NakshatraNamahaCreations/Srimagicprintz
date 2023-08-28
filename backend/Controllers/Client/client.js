const clientModel = require("../../Model/client/client");

class ClientManagement {
  async Addclient(req, res) {
    let {
     clientsName,
     ClientBusinessName,
     ClientsContactNumber1,
     ClientsContactNumber2,
     ClientsEmail,
     ClientAddress,
     Pincode,
     Zone,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newClientInfo = new clientModel({
       clientsName,
       ClientBusinessName,
       ClientsContactNumber1,
       ClientsContactNumber2,
       ClientsEmail,
       ClientAddress,
       Pincode,
       Zone,
        ClientImage: file,
      });
      if (!file) {
        return res.status(400).json({
          status: 400,
          error: "Please select client image",
        });
      }

      const clientInfo = await newClientInfo.save();

      return res
        .status(200)
        .json({ succes: "client succesfully added", data: clientInfo });
    } catch (error) {
      console.log("error accours while adding client");
      return res.status(500).json({ error: "server error" });
    }
  }

  async getAllClients(req, res) {
    try {
      let client = await clientModel.find({});
      return res.json({ client });
    } catch (err) {
      return res.json({ error: "server error" });
    }
  }
}

const clientcontroller = new ClientManagement();
module.exports = clientcontroller;
