import React, { useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function ReceeManagementApi() {
  const [shopName, setShopName] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setzone] = useState("");
  const [clientName, setclientName] = useState("");
  const AddRecce = async () => {
    try {
      const config = {
        url: "/recce/recce/addrecce",
        baseURL: "http://localhost:8000/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          ClientName: clientName,
          ShopName: shopName,
          Area: area,
          City: city,
          ContactNumber: contactNumber,
          Pincode: pincode,
          Zone: zone,
          datastatus: "Pending",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Added Successfully");
        window.location.href = "/ReceeManagement";
        setShopName("");
        setCity("");
        setContactNumber("");
        setArea("");
        setPincode("");
        setzone("");
      }
    } catch (err) {
      alert(err, "error in add recce");
    }
  };

  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <Form>
          <Row>
            <Col>
              <Form.Group md="5" className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  value={clientName}
                  onChange={(e) => setclientName(e.target.value)}
                  type="text"
                  placeholder="Enter  client name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group md="5" className="mb-3">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  type="text"
                  placeholder="Enter  shop name"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  type="text"
                  placeholder="
                    Enter contact number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Area</Form.Label>
                <Form.Control
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type="text"
                  placeholder="Enter area"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group md="5" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Enter city"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="text"
                  placeholder="Enter pincode"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Zone</Form.Label>
                <Form.Control
                  value={zone}
                  onChange={(e) => setzone(e.target.value)}
                  type="text"
                  placeholder="Enter zone"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="row mt-5">
            <Button className="col-md-2 m-auto" onClick={AddRecce}>
              Save Recce
            </Button>
            <Button className="col-md-2 m-auto" href="/ReceeManagement">
              Cancel
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
}
