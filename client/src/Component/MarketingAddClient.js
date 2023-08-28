import Header from "./Header";
import axios from "axios";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { mockComponent } from "react-dom/test-utils";

function MarketingAddClient() {
  // addmarketingclient

  const [mclientName, setmClientsName] = useState("");
  const [mbusinessName, setMBusinessName] = useState("");
  const [mclientsContact1, setmClientsContact1] = useState("");
  const [mclientsEmail, setmClientsEmail] = useState("");

  const [mClientAddress, setmClientAddress] = useState("");
  const [mpincode, setMPincode] = useState("");
  const [mzone, setMZone] = useState("");
  const [msalesRepresentative, setmsalesRepresentative] = useState("");
  const [mclientImage, setMClientImage] = useState("");

  const AddMClientsData = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("mclientsName", mclientName);
    formData.append("mClientBusinessName", mbusinessName);
    formData.append("mClientsContactNumber1", mclientsContact1);
    formData.append("MClientAddress", mClientAddress);
    formData.append("mClientsEmail", mclientsEmail);
    formData.append("mClientAddress", mClientAddress);
    formData.append("mPincode", mpincode);
    formData.append("mZone", mzone);
    formData.append("msaleexecutive", msalesRepresentative);
    formData.append("mClientImage", mclientImage);

    try {
      const config = {
        url: "/marketingClient/marketingcliend/addmarketingclient",
        baseURL: "http://localhost:8000/api",
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: formData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Clients added");
        window.location.href = "/Marketing";
      }
    } catch (err) {
      alert("Failed to add clients");
    }
  };

  
  // updatemarketingdata
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
                value={mclientName}
                onChange={(e) => setmClientsName(e.target.value)}
                type="text"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Business Name</Form.Label>
              <Form.Control
                value={mbusinessName}
                onChange={(e) => setMBusinessName(e.target.value)}
                type="text"
                placeholder="Please Enter Business"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Contact Number1</Form.Label>
              <Form.Control
                value={mclientsContact1}
                onChange={(e) => setmClientsContact1(e.target.value)}
                type="text"
                placeholder="Please Enter Number"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Address</Form.Label>
              <Form.Control
                value={mClientAddress}
                onChange={(e) => setmClientAddress(e.target.value)}
                type="text"
                placeholder="Please Enter Number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's Email</Form.Label>
              <Form.Control
                value={mclientsEmail}
                onChange={(e) => setmClientsEmail(e.target.value)}
                type="text"
                placeholder="Please Enter email"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Client's image</Form.Label>

              <Form.Control
                type="file"
                name="marketing"
                onChange={(e) => setMClientImage(e.target.files[0])}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                value={mpincode}
                onChange={(e) => setMPincode(e.target.value)}
                type="text"
                placeholder="Enter pincode"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                value={mzone}
                onChange={(e) => setMZone(e.target.value)}
                type="text"
                placeholder="Enter  Zone"
              />
            </Form.Group>
          </Row>
          <Row className="mt-5" style={{ border: "1px solid grey" }}></Row>{" "}
          <p className="text-center">Sales Team Information</p>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Sales Represantive</Form.Label>
              <Form.Control
                value={msalesRepresentative}
                onChange={(e) => setmsalesRepresentative(e.target.value)}
                required
                type="text"
                placeholder="Enter sales represantive name"
              />
            </Form.Group>
            {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Date of Client addition</Form.Label>
              <Form.Control required type="date" />
            </Form.Group> */}
          </Row>
          <Row className="mb-3">
            <Button onClick={AddMClientsData} className="col-md-2 m-auto">
              Add Clients
            </Button>{" "}
          </Row>
        </Form>
      </div>
    </>
  );
}

export default MarketingAddClient;
