const InstalationMododl = require("../../Model/Installation/instalation");

class AddInstalationGroup {
  async VendorInstallation(req, res) {
    try {
      const { InstallationGroup } = req.body;

      const Instalationdata = await InstalationMododl({
        InstallationGroup,
      });
      let InstalationSAve = await Instalationdata.save();

      return res.status(200).json({
        success: "Successfully groups created",
        data: InstalationSAve,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Error" });
    }
  }

  async getInstalation(req, res) {
    try {
      let instalation = await InstalationMododl.find({});
      return res.status(200).json({ instalation });
    } catch (err) {
      return res.status(500).json({ err: "err while fetching data" });
    }
  }
}

const Instalation = new AddInstalationGroup();
module.exports = Instalation;
