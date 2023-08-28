const express = require("express");
const router = express.Router();
const DesignController = require("../../Controllers/design/design");
const multer = require("multer");
const path = require("path");

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

router.post(
  "/adddesign",
  upload.single("designimage"),
  DesignController.addDesign
);

router.get("/getalldesigns", DesignController.getAllDesign);
router.put("/updatedesign/:designid", DesignController.UpdateDesignData);
module.exports = router;
