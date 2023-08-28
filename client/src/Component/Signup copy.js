import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginData } from "./store";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import Header from "./Header";

export function Signup() {
  const [form, setForm] = useState({});
  const formDataDispatch = useDispatch();

  const handleLoginData = (e) => {
    e.preventDefault();
    formDataDispatch(setLoginData(form));
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />

      <div className="row m-auto">
        <div className="col-md-12 d-flex justify-content-center m-auto ">
          <Form
            className="col-md-6 shadow p-3 mb-5 bg-white rounded"
            noValidate
            onSubmit={handleLoginData}
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <div className="text-center">
                  <Form.Label
                    htmlFor="file-upload"
                    className="custom-file-upload"
                  >
                    {form.image !== [] ? (
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "100%",
                        }}
                        src={form.image}
                        alt=""
                      />
                    ) : (
                      <i className="fa-solid fa-camera"></i>
                    )}
                  </Form.Label>
                  <Form.Control
                    name="image"
                    onChange={handleImageChange}
                    required
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  name="fname"
                  id="fname"
                  value={form.fname}
                  onChange={handleInputData}
                  required
                  type="text"
                  placeholder="First name"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Your Number</Form.Label>
                <Form.Control
                  name="number"
                  id="number"
                  value={form.number}
                  onChange={handleInputData}
                  required
                  type="text"
                  placeholder="Number"
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleInputData}
                  required
                  type="text"
                  placeholder="password"
                />
              </Form.Group>
            </Row>
            <div className="text-center">
              <Button className="col-md-4" href="/" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
