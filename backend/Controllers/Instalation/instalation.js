const InstalationModule = require("../../Model/Installation/instalation");

class AddInstalationGroup {
  async VendorInstallation(req, res) {
    const { InstalationGroup } = req.body;
    try {
      let Instalation = new InstalationModule({ InstalationGroup });
      let Instalations = Instalation.save();
      if (Instalations) {
        return res.status(200).json({ success: "Succesfully group created" });
      }
    } catch (err) {
      return res.status(500).json({ err: "Err" });
    }
  }

  async getInstalation(req, res) {
    try {
      let instalation = await InstalationModule.find({});
      return res.status(200).json({ instalation });
    } catch (err) {
      return res.status(500).json({ err: "err while fetching data" });
    }
  }
}

const Instalation = new AddInstalationGroup();
module.exports = Instalation;
