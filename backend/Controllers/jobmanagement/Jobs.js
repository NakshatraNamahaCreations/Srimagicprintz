const JobModel = require("../../Model/jobmanagement/AssignJob");

class JobManagement {
  async AssignJob(req, res) {
    let { typesofjob, client, vendor } = req.body;

    try {
      let newJobs = new JobModel({
        typesofjob,
        client,
        vendor,
      });

      let Jobs = await newJobs.save();

      return res
        .status(200)
        .json({ success: "assigned successfully added", data: Jobs });
    } catch (error) {
      console.error("Error saving job:", error);

      return res
        .status(500)
        .json({ error: "error while assigning job", details: error.message });
    }
  }

  async getAllJob(req, res) {
    try {
      const allJobs = await JobModel.find({});
      return res.json({ allJobs });
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }
}

const RecceController = new JobManagement();
module.exports = RecceController;
