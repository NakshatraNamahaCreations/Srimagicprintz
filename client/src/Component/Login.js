import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const ApiURL = process.env.REACT_APP_API_URL;
  const ImageURL = process.env.REACT_APP_IMAGE_API_URL;
  const [Visibility, setVisibility] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/loginuser",
        method: "POST",
        baseURL: ApiURL,
        data: {
          loginnameOrEmail: email,
          password: password,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Login success");
        window.location.assign("/Overview");
        localStorage.setItem("userData", JSON.stringify(res.data.user));
      } else {
        alert("user or password not correct");
      }
    } catch (err) {
      console.log("error", err);
      alert("failed to login", err);
    }
  };

  const handleVisibility = () => {
    setVisibility(true);
  };
  const handleVisibilityof = () => {
    setVisibility(false);
  };
  return (
    <>
      <Form className="row  m-auto mt-5">
        <div className="col-md-8 m-auto">
          <div className="row shadow   bg-body rounded m-auto">
            <div className="col-md-6  ">
              <Row className="mb-3  ">
                <h4 className="col-md-2 m-auto">Login</h4>
              </Row>
              <Row className="mb-3  m-auto">
                <Form.Label>
                  Email <span style={{ color: "red" }}>*</span>
                </Form.Label>

                <TextField
                  type="text"
                  size="small"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Row>
              <Row className="m-auto mb-3">
                <Form.Label>
                  Password <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <TextField
                  size="small"
                  placeholder="Password"
                  type={Visibility ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {Visibility ? (
                          <VisibilityIcon
                            className="text-dark"
                            onClick={handleVisibilityof}
                          />
                        ) : (
                          <VisibilityOffIcon
                            className="text-dark"
                            onClick={handleVisibility}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Row>
              <Row className="mb-3 mt-2 m-auto">
                <Button variant="light" onClick={loginUser}>
                  Login
                </Button>{" "}
              </Row>
              <Row className="mb-3 mt-2 m-auto">
                <Link to="/Signup">
                  <p className="m-2">
                    If your new to srimagicprintz? craeate account
                  </p>
                </Link>
              </Row>
            </div>
            <img alt="" className="col-md-6 p-0" src="../Assests/smpbnr.avif" />{" "}
          </div>
        </div>
      </Form>
    </>
  );
};
