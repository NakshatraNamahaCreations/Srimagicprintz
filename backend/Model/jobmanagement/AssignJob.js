const mongoose = require("mongoose");

const JobModel = new mongoose.Schema({
  typesofjob: { type: String },

  client: { type: Array },
  vendor: { type: Array },
});

module.exports = mongoose.model("assignjob", JobModel);
