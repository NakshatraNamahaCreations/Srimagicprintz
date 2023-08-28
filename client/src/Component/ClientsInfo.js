import React from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
export default function ClientInfo() {
  const [clientName, setClientsName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [clientsContact1, setClientsContact1] = useState("");
  const [clientsEmail, setClientsEmail] = useState("");
  const [clientsContact2, setClientsContact2] = useState("");
  const [ClientAddress, setsetClientAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setZone] = useState("");

  const [clientImage, setClientImage] = useState("");
  const AddClientsData = async (e) => {
    e.preventDefault();

    
    let formData = new FormData();
    formData.append("clientsName", clientName);
    formData.append("ClientBusinessName", businessName);
    formData.append("ClientsContactNumber1", clientsContact1);
    formData.append("ClientsContactNumber2", clientsContact2);
    formData.append("ClientsEmail", clientsEmail);
    formData.append("ClientAddress", ClientAddress);
    formData.append("Pincode", pincode);
    formData.append("Zone", zone);
    formData.append("ClientImage", clientImage);

    try {
      const config = {
        url: "/Client/clients/addclient",
        baseURL: "http://localhost:8000/api",
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: formData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Clients added");
        window.location.href = "/ClientsManagement";
      }
    } catch (err) {
      alert("Failed to add clients");
    }
  };

  return (
    <>
      <Header />

      <div className="row containerPadding m-auto">
        <h5>Enter Client Details</h5>
        <Form className="card containerPadding ">
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Clients Name</Form.Label>
              <Form.Control
                name="clientname"
                value={clientName}
                onChange={(e) => setClientsName(e.target.value)}
                type="text"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Business Name</Form.Label>
              <Form.Control
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                type="text"
                placeholder="Please Enter Business"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Contact </Form.Label>
              <Form.Control
                value={clientsContact1}
                onChange={(e) => setClientsContact1(e.target.value)}
                type="text"
                placeholder="Please Enter Number"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Alternative Contact</Form.Label>
              <Form.Control
                value={clientsContact2}
                onChange={(e) => setClientsContact2(e.target.value)}
                type="text"
                placeholder="Please Enter Number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Email</Form.Label>
              <Form.Control
                value={clientsEmail}
                onChange={(e) => setClientsEmail(e.target.value)}
                type="text"
                placeholder="Please Enter email"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={ClientAddress}
                onChange={(e) => setsetClientAddress(e.target.value)}
                type="text"
                placeholder="Enter number of stores"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                placeholder="Enter pincode"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                type="text"
                placeholder="Enter  Zone"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Upload Client's image</Form.Label>
              <Form.Control
                onChange={(e) => setClientImage(e.target.files[0])}
                type="file"
              />
            </Form.Group>
          </Row>
          <Button
            onClick={AddClientsData}
            type="submit"
            className="col-md-3 mt-4"
          >
            Add Client
          </Button>
        </Form>
      </div>
    </>
  );
}
