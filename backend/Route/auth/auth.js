const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/auth/auth");
const multer = require("multer");
const path = require("path");

// Create a middleware for handling image uploads using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Public/ProfileImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single("profileImage"), authController.Signup);
router.post("/login", authController.Login);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authController = require("../Controllers/auth");
// const multer = require("multer");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "Public/ProfileImage");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "_" + file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage });

// router.post("/signup", upload.single("profileImage"), authController.Signup )
// router.post("/login",  authController.Login )

// module.exports = router;
