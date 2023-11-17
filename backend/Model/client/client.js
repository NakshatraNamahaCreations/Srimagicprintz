const mongoose = require("mongoose");

const Schemaforclient = new mongoose.Schema(
  {
    clientsName: String,
    clientsBrand: String,
    ClientsContactNumber1: Number,
    ClientsContactNumber2: Number,
    ClientsEmail: String,
    ClientAddress: String,
    Pincode: Number,
    Zone: String,
    ClientImage: String,
    // InstallationRate: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("clientinfo", Schemaforclient);
