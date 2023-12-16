const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/UserRigths/userRights");

const multer = require("multer");
const path = require("path");

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

router.post("/adduser", upload.single("primages"), userController.adduser);
router.get("/getuser", userController.getuser);
router.post("/edituser/:userId", userController.edituser);
router.post("/giveaccess/:userId", userController.giveRights);
router.post("/loginuser", userController.loginUser);
router.post("/deleteuser/:id", userController.postdeleteuser);
router.post("/changepassword/:userId", userController.changePassword);
router.post("/logout/:id", userController.getsignout);

module.exports = router;
