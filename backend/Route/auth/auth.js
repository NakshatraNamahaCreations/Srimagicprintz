const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/auth/auth");
const multer = require("multer");
const path = require("path");

// Create a middleware for handling image uploads using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/ProfileImage");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single("profileImage"), authController.Signup);
router.post("/login", authController.Login);
router.delete("/logout/:logoutid",authController.Logoutuser)
module.exports = router;


