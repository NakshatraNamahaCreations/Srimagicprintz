const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express();
const outLetBoardManagement = require("../../Controllers/reccemanagement/outletUpload");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Outlet");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addoutlet",
  upload.single("ouletBannerImage"),
  outLetBoardManagement.addOutlet
);
router.get("/getalloutlets", outLetBoardManagement.getAllOutlets);
router.get(
  "/getoutletboarddatabyrecceid/:id",
  outLetBoardManagement.getshopDataByRecceId
);

module.exports = router;