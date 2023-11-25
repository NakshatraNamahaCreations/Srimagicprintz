const express = require("express");
const router = express.Router();

const VendorInfoController = require("../../Controllers/Vendor/VendorInfo");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/VendorImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/BankInfoImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload1 = multer({ storage: storage1 });
const upload = multer({ storage: storage });
router.post(
  "/addvendorinfo",
  upload.single("VendorImage"),
  VendorInfoController.addVendorInfo
);
// router.post("/createroup",VendorInfoController.VendorInstallation)
router.post(
  "/linkbankinfo",
  upload1.single("BankInfoImage"),
  VendorInfoController.linkBankInfoToVendor
);
router.get("/getvendorinfo", VendorInfoController.getAllVendorInfo);
router.put(
  "/updatevendordata/:vendordataid",
  VendorInfoController.UpdateVendorData
);
router.delete(
  "/deletevendordata/:vendordeletid",
  VendorInfoController.deleteVendorData
);
// router.post("/login", VendorInfoController.VendorLogin);
// router.delete("/signout", VendorInfoController.SignOut);
router.post("/login", VendorInfoController.VendorLogin);
router.post("/loginwithemail", VendorInfoController.VendorLoginWitheEmail);
router.get("/getvendorbyid/:id", VendorInfoController.getParticulatVendorById); //this
router.get("/signout/:id", VendorInfoController.vendorSignout);

module.exports = router;
