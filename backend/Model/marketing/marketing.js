const mongoose = require("mongoose");

const Schemaformarketingclient = new mongoose.Schema(
  {
    mclientsName: String,
    mClientBusinessName: String,
    mClientsContactNumber1: Number,
    MClientAddress: String,
    mClientsEmail: String,
    msaveMeetingTime: String,
    mPincode: Number,
    mZone: String,
    mClientImage: String,
    msaleexecutive: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "marketingclientinfo",
  Schemaformarketingclient
);
