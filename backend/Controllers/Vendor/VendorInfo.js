const VendorInfoModel = require("../../Model/Vendor/vendorInfo");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
function uuidStringToNumber(uuid) {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  const sixDigitNumber = Math.abs(hash) % 1000000;
  const formattedSixDigitNumber = String(sixDigitNumber).padStart(6, "0");

  return formattedSixDigitNumber;
}

class VendorInfo {
  async addVendorInfo(req, res) {
    let {
      VendorFirstName,
      VendorLastName,
      VendorContactNumber,
      VendorEmail,
      VendorAdress,
      SelectedType,
      PassWord,
    } = req.body;

    let file = req.file?.filename;

    try {
      const uniqueId = uuidv4();

      const numericVendorId = uuidStringToNumber(uniqueId);

      let newVendorInfo = new VendorInfoModel({
        VendorId: numericVendorId,
        VendorFirstName,
        VendorLastName,
        VendorContactNumber,
        VendorEmail,
        VendorAdress,
        SelectedType,
        VendorImage: file,
        selectedbank: null,
        AccountHolderName: null,
        AccountNumber: null,
        BankBranch: null,
        BankAccountType: null,
        IFSCCode: null,
        BankInfoImage: null,
        PassWord,
      });
// if(VendorEmail)
      if (!file) {
        return res.status(400).json({
          status: 400,
          error: "Please select vendor image",
        });
      }

      const savedVendorInfo = await newVendorInfo.save();

      return res
        .status(200)
        .json({ success: "Vendor Info Added", data: savedVendorInfo });
    } catch (err) {
      console.log("Error in vendor info controller", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async linkBankInfoToVendor(req, res) {
    try {
      const {
        vendorId,
        selectedbank,
        AccountHolderName,
        AccountNumber,
        BankBranch,
        BankAccountType,
        IFSCCode,
      } = req.body;

      const vendor = await VendorInfoModel.findOne({ VendorId: vendorId });

      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      if (vendor.AccountNumber) {
        return res.status(400).json({ error: "Bank details already added" });
      }

      vendor.selectedbank = selectedbank;
      vendor.AccountHolderName = AccountHolderName;
      vendor.AccountNumber = AccountNumber;
      vendor.BankBranch = BankBranch;
      vendor.BankAccountType = BankAccountType;
      vendor.IFSCCode = IFSCCode;
      vendor.BankInfoImage = req.file ? req.file.filename : null;
      await vendor.save();

      return res.status(200).json({ success: "Bank details linked to vendor" });
    } catch (error) {
      console.log("Error in linking bank details to vendor:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getAllVendorInfo(req, res) {
    try {
      const vendors = await VendorInfoModel.find({});
      return res.json({ vendors });
    } catch (err) {
      console.log("Error while getting vendor info:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async UpdateVendorData(req, res) {
    let vendorid = req.params.vendordataid;
    let {
      VendorFirstName,
      VendorLastName,
      VendorContactNumber,
      VendorEmail,
      VendorAdress,
      selectedbank,
      AccountHolderName,
      AccountNumber,
      BankBranch,
      BankAccountType,
      IFSCCode,
      SelectedType,
    } = req.body;
    try {
      let vendor = await VendorInfoModel.findOneAndUpdate(
        {
          _id: vendorid,
        },
        {
          VendorFirstName,
          VendorLastName,
          VendorContactNumber,
          VendorEmail,
          VendorAdress,
          selectedbank,
          AccountHolderName,
          AccountNumber,
          BankBranch,
          BankAccountType,
          IFSCCode,
          SelectedType,
        }
      );
      if (vendor) {
        return res.status(200).json({ success: "Succesfully edited" });
      }
    } catch (error) {
      console.log("Error while updating", error);
    }
  }

  async deleteVendorData(req, res) {
    let Vendordelete = req.params.vendordeletid;
    const data = await VendorInfoModel.deleteOne({ _id: Vendordelete });

    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
  async VendorLogin(req, res) {
    let { VendorContactNumber, PassWord } = req.body;
    try {
      if (!VendorContactNumber || !PassWord) {
        return res.status(400).json({ error: "Please fill in all fields" });
      } else {
        const contact = await VendorInfoModel.findOne({ VendorContactNumber });
        if (!contact) {
          return res.status(400).json({ error: "Invalid Phone Number" });
        } else {
          const vendor = await VendorInfoModel.findOne({
            VendorContactNumber,
            PassWord,
          });
          if (vendor) {
            return res.status(200).json({ success: "Login Successfully" });
          } else {
            return res.status(400).json({ error: "Invalid Password" });
          }
        }
      }
    } catch (err) {
      console.log(err, "err");
      return res
        .status(500)
        .json({ error: "Error occurred while logging in Vendor" });
    }
  }

  async VendorLoginWitheEmail(req, res) {
    //this
    let { VendorEmail, PassWord } = req.body;
    try {
      if (!VendorEmail || !PassWord) {
        return res.status(400).json({ error: "Please fill in all fields" });
      } else {
        const email = await VendorInfoModel.findOne({ VendorEmail });
        if (!email) {
          return res.status(400).json({ error: "Invalid Email" });
        } else {
          const vendor = await VendorInfoModel.findOne(
            {
              VendorEmail,
              PassWord,
            },
            { status: "Online" }
          );
          if (vendor) {
            return res
              .status(200)
              .json({ success: "Login Successfully", user: vendor });
          } else {
            return res.status(400).json({ error: "Invalid Password" });
          }
        }
      }
    } catch (err) {
      console.log(err, "err");
      return res
        .status(500)
        .json({ error: "Error occurred while logging in Vendor" });
    }
  }

  async vendorSignout(req, res) {
    //this
    const logoutid = req.params.id;
    try {
      if (!logoutid) {
        return res.status(400).json({ error: "Invalid signout ID" });
      }
      await VendorInfoModel.findOneAndUpdate(
        { _id: logoutid },
        { status: "Offline" }
      );
      console.log("Logged out successfully");
      res.status(200).json("Successfully logged out");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }



  async getParticulatVendorById(req, res) {
    try {
      let vendorId = req.params.id;
      const vendor = await VendorInfoModel.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      console.log("vendor======", vendor);
      return res.status(200).json({ vendor });
    } catch (err) {
      console.log("Error in fetching particular vendor by id", err);
      return res.status(500).json({ error: "server error" });
    }
  }

  // async VendorLogin(req, res) {
  //   let { VendorContactNumber, PassWord } = req.body;
  //   try {
  //     if (!VendorContactNumber || !PassWord) {
  //       return res.status(400).json({ error: "Please fill in all fields" });
  //     } else {
  //       const contact = await VendorInfoModel.findOne({ VendorContactNumber });
  //       if (!contact) {
  //         return res.status(400).json({ error: "Invalid Phone Number" });
  //       } else {
  //         const vendor = await VendorInfoModel.findOne({
  //           VendorContactNumber,
  //           PassWord,
  //         });
  //         if (vendor) {
  //           return res.status(200).json({ success: "Login Successfully" });
  //         } else {
  //           return res.status(400).json({ error: "Invalid Password" });
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err, "err");
  //     return res
  //       .status(500)
  //       .json({ error: "Error occurred while logging in Vendor" });
  //   }
  // }

  // async SignOut(req, res) {
  //   const logoutid = req.params.loginid;

  //   try {
  //     let logoutUser = await VendorInfoModel.deleteMany({ _id: logoutid });
  //     if (logoutUser) {
  //       return res.json({ Success: "succesfully deleted" });
  //     } else {
  //       return res.status(401).json("Unauthorized");
  //     }
  //   } catch (err) {
  //     return res.json({ err: "failed to logout" });
  //   }
  // }
}

const VendorInfoController = new VendorInfo();
module.exports = VendorInfoController;
