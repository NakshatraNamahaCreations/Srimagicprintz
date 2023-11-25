import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
// import Header from "./Header";
import ImageIcon from "@mui/icons-material/Image";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const signupUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("mobileNumber", mobileNumber);
    formData.append("profileImage", profileImage);

    try {
      const config = {
        url: "/api/auth/auth/signup",
        method: "POST",
        baseURL: "http://api.srimagicprintz.com",
        data: formData,
      };

      let res = await axios(config);

      if (res.status === 200) {
        alert("Signup success");
        window.location.assign("/");
      } else {
        alert("Email or Mobile already exists");
      }
    } catch (err) {
      alert("Failed to signup", err);
    }
  };

  return (
    <>
      <div className="row m-auto mt-5 p-2">
        <div className="col-md-12 d-flex justify-content-center m-auto p-4">
          <Form
            className="col-md-6 shadow p-4 mb-5 bg-white rounded"
            noValidate
          >
            <Row className="p-2 mb-3">
              <Form.Group as={Col}>
                <div className="text-center">
                  <Form.Label
                    htmlFor="file-upload"
                    className="custom-file-upload"
                  >
                    {imagePreview !== [] ? (
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "100%",
                        }}
                        src={imagePreview}
                        alt=""
                      />
                    ) : (
                      <div>
                        <ImageIcon style={{ fontSize: "35px" }} />
                      </div>
                    )}
                  </Form.Label>
                  <Form.Control
                    name="image"
                    onChange={handleImageChange}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Group>
            </Row>

            <Row className="p-2 mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  name="fname"
                  id="fname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  placeholder="Your name"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Your Number</Form.Label>
                <Form.Control
                  name="number"
                  id="number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  type="text"
                  placeholder="Number"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="text"
                  placeholder="password"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="text"
                  placeholder="Email"
                />
              </Form.Group>
            </Row>
            <div className="text-center">
              <Button className="col-md-4" onClick={signupUser}>
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
