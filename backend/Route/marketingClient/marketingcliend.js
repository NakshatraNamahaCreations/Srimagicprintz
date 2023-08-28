const MarketingClientController = require("../../Controllers/marketingmanagement/marketing");
const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/marketing"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/addmarketingclient",
  upload.single("mClientImage"),
  MarketingClientController.AddMarketingclient
);
router.get(
  "/getmarketingclient",
  MarketingClientController.getAllMarketingClients
);
router.put(
  "/updatemarketingdata/:sheduleid",

  MarketingClientController.AddSheduleTiming
);
module.exports = router;
