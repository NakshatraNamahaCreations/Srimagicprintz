const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express();
const RecceController = require("../../Controllers/reccemanagement/recce");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../Public/reccedesign"));
//   },
//   filename: (req, file, cb) => {
//     const uniqueFileName = Date.now() + "_" + file.originalname;
//     cb(null, uniqueFileName);
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/designimage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

router.post("/addrecce", RecceController.AddRecce);
router.get("/getallrecce", RecceController.getAllRecce);
router.post("/addreccesviaexcelesheet", RecceController.addreccevaiexcel);
router.post(
  "/updatevendorname/:reccevendorid",

  RecceController.AddRecceDetails
);
router.post("/getcompletedid/:completedid", RecceController.SendRecceToDesign);
router.post(
  "/getdesigncompletedid/:designcompletedid",
  RecceController.SendDesignToPrinting
);
router.post(
  "/getcompltedprint/:completedprintid",
  RecceController.SendPrintToFabrication
);
router.post(
  "/getcompletedfabrication/:completedfabricationid",
  RecceController.SendPrintToInstallation
);
router.post(
  "/getinstallation/:getinstalationid",
  RecceController.SendPrintToJobTrack
);

// printingimage
router.put(
  "/updatereccedata/:reccedataid",
  upload.single("designimage"),
  RecceController.UpdateRecceData
);
router.delete("/deletereccedata/:reccedeleteid", RecceController.DeletRecce);
module.exports = router;
