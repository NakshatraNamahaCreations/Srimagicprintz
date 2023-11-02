const mongoose = require("mongoose");

const VendorInfoSchema = new mongoose.Schema(
  {
    VendorId: Number,
    SelectedType: String,
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
    PassWord: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("VendorInfo", VendorInfoSchema);
