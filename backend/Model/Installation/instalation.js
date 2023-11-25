const mongoose = require("mongoose");

const InstaLationSchema = new mongoose.Schema({
  InstallationGroup: [{ _id: String }],
});

module.exports = mongoose.model("instalations", InstaLationSchema);
