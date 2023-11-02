const InstallationController = require("../../Controllers/Instalation/instalation");
const express = require("express");
const router = express.Router();
router.post("/createroup", InstallationController.VendorInstallation);
router.get("/getgroup",InstallationController.getInstalation)
module.exports = router;
