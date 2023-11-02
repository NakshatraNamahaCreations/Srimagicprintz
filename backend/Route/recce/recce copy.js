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
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/excelFile"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload1 = multer({ storage: storage1 });

router.post("/addrecce", RecceController.AddRecce);
router.get("/getallrecce", RecceController.getAllRecce);
router.post(
  "/addreccesviaexcelesheet/:addexcelid",
  upload1.single("excelFile"),
  RecceController.updateRecceOutletName
);
router.post(
  "/updatevendorname/:zone/:vendorid/:typesofjobid",
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
// router.post(
//   "/getcompletedfabrication/:completedfabricationid",
//   RecceController.SendPrintToInstallation
// );
router.post(
  "/getinstallation/:getinstalationid",
  RecceController.SendPrintToJobTrack
);




router.put(
  "/updatereccedata/:recceindex/:getreccedataid",
  upload.any(),
  RecceController.UpdateRecceData
);

router.put(
  "/outletupdate/:outletiddd/:vendoridd",
  RecceController.UpdateOutletVendor
);

router.put(
  "/editoutletstatus/:outletiddd/:status",
  RecceController.UpdateOutletStatus
);
router.delete("/recceoudelet/:outletin", RecceController.deleteOutletData);

router.delete("/deletereccedata/:reccedeleteid", RecceController.DeletRecce);
module.exports = router;
