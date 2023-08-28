const mongoose = require("mongoose");

const VendorInfoSchema = new mongoose.Schema(
  {
    VendorId: Number,
    VendorFirstName: String,
    VendorLastName: String,
    VendorContactNumber: String,
    VendorEmail: String,
    VendorAdress: String,
    VendorImage: String,
    selectedbank: String,
    AccountHolderName: String,
    AccountNumber: String,
    BankBranch: String,
    BankAccountType: String,
    IFSCCode: String,
    BankInfoImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorInfo", VendorInfoSchema);
