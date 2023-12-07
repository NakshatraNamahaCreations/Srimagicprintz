const ClientController = require("../../Controllers/Client/client");
const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join
      (__dirname, "../../Public/ClientImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/addclient",
  upload.single("ClientImage"),
  ClientController.Addclient
);
router.get("/getallclient", ClientController.getAllClients);

module.exports = router;
