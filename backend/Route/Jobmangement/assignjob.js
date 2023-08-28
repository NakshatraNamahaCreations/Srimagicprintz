const express = require("express");
const router = express.Router();
const JobAssinController = require("../../Controllers/jobmanagement/Jobs");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/AssignClientsImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Example: 10 MB limit
});

router.post(
  "/assignjobs",
  JobAssinController.AssignJob
);
router.get("/getalljob", JobAssinController.getAllJob);
module.exports = router;
