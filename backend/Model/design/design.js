const mongoose = require("mongoose");

const DesignModel = new mongoose.Schema({
  reeceDetails: Array,
  designimage: String,
  Designstatus: String,
});

module.exports = mongoose.model("Design", DesignModel);
