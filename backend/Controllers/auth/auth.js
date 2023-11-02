const authModel = require("../../Model/auth/auth");
const bcrypt = require("bcryptjs");

class Authentication {
  async Signup(req, res) {
    try {
      const existingUser = await authModel.findOne();

      if (existingUser) {
        await authModel.deleteOne({ _id: existingUser._id });
      }
      let { name, email, password, mobileNumber } = req.body;
      let file = req.file?.filename;

      password = await bcrypt.hash(password, 10);

      const Email = await authModel.findOne({ email: email });
      if (Email) {
        return res.status(500).json({ error: "Email already exists" });
      }

      const Password = await authModel.findOne({ password: password });
      if (Password) {
        return res.status(500).json({ error: " Password already exists" });
      }

      const newUser = new authModel({
        name,
        email,
        password,
        mobileNumber,
        profileImage: file,
      });

      const data = await newUser.save();

      return res
        .status(200)
        .json({ Success: "Account created. Please login", user: data });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while creating the account" });
    }
  }

  async Login(req, res) {
    let { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(500).json({ error: "Please fill all fields" });
      } else {
        const data = await authModel.findOne({ email });
        if (!data) {
          return res.status(500).json({ error: "Invalid email id" });
        } else {
          const passcheck = await bcrypt.compare(password, data.password);
          if (passcheck) {
            // await authModel.findOneAndUpdate({ email }, { status: "Online" });
            return res
              .status(200)
              .json({ Success: "Login successful", user: data });
          } else {
            return res.status(500).json({ error: "Invalid Password" });
          }
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while logging in" });
    }
  }

  async Logoutuser(req, res) {
    const logoutid = req.params.logoutid;

    try {
      let logoutUser = await authModel.deleteOne({ _id: logoutid });
      if (logoutUser) {
        return res.json({ Success: "succesfully deleted" });
      } else {
        return res.status(401).json("Unauthorized");
      }
    } catch (err) {
      return res.json({ err: "failed to logout" });
    }
  }
}

const authController = new Authentication();
module.exports = authController;
