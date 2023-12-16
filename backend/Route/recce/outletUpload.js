const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express();
const outLetBoardManagement = require("../../Controllers/reccemanagement/outletUpload");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../Public/Outlet"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ error: "Multer Error", message: err.message });
  } else if (err) {
    return res
      .status(500)
      .json({ error: "Server Error", message: err.message });
  }
  next();
});

router.post(
  "/addoutlet",
  upload.single("ouletBannerImage"),
  outLetBoardManagement.addOutlet
);

router.get("/getalloutlets", outLetBoardManagement.getAllOutlets);
router.get(
  "/getshopdatabyshopidid/:id",
  outLetBoardManagement.getshopDataByShopId
);
router.get(
  "/getparticularshopbyid/:id",
  outLetBoardManagement.getParticularShopById
);
router.put(
  "/updateoutlets/:id",
  upload.single("ouletBannerImage"),
  outLetBoardManagement.updateOutletBoard
);
router.put(
  "/uploadimage/:id",
  upload.single("ouletBannerImage"),
  outLetBoardManagement.uploadBannerImage
);
router.patch("/completejob", outLetBoardManagement.completeJob);
router.delete("/deletejob/:id", outLetBoardManagement.deleteJob);
router.put(
  "/uploadinstallationimage/:id",
  upload.single("ouletInstallationImage"),
  outLetBoardManagement.uploadInstallationImage
);
router.put("/addinstallations/:id", outLetBoardManagement.addInstallation);

module.exports = router;
