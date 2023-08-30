const authModel = require("../../Model/auth/auth");
const bcrypt = require("bcryptjs");

class Authentication {
  async Signup(req, res) {
    try {
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
            return res.json({ Success: "Signin successful", user: data });
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
}

const authController = new Authentication();
module.exports = authController;
