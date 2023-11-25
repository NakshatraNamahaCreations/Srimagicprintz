import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import axios from "axios";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const Login = () => {
  const [Visibility, setVisibility] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/auth/auth/login",
        method: "POST",
        baseURL: "https://admin.srimagicprintz.com/api",
        data: {
          email: email,
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
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Row>
              {Visibility ? (
                <>
                  <Row
                    className="mb-3  m-auto"
                    style={{ position: "relative" }}
                  >
                    {" "}
                    <Form.Label>
                      Password <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      placeholder="Enter your password "
                    />
                  </Row>
                  <div
                    style={{
                      position: "relative",
                      bottom: "12%",
                      right: "-88%",
                    }}
                  >
                    <VisibilityIcon onClick={handleVisibilityof} />
                  </div>
                </>
              ) : (
                <>
                  <Row className="mb-3  m-auto">
                    {" "}
                    <Form.Label>
                      Password <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </Row>
                  <div
                    style={{
                      position: "relative",
                      bottom: "12%",
                      right: "-88%",
                    }}
                  >
                    <VisibilityOffIcon onClick={handleVisibility} />
                  </div>
                </>
              )}

              <Row className="mb-3 mt-2">
                <Button variant="light" onClick={loginUser}>
                  Login
                </Button>{" "}
              </Row>
              <Row className="mb-3 mt-2">
                <Link to="/Signup">
                  <p className="m-2">
                    If your new to srimagicprintz? create account
                  </p>
                </Link>
              </Row>
            </div>
            <img
              alt=""
              className="col-md-6 p-0"
              src="https://img.freepik.com/premium-vector/abstract-vector-business-banner-designs_9583-165.jpg"
            />{" "}
          </div>
        </div>
      </Form>
    </>
  );
};
