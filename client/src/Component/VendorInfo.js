import { useState } from "react";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
export default function VendorInfo() {
  const [VendorFirstName, setVendorFirstName] = useState("");
  const [VendorLastName, setVendorLastName] = useState("");
  const [VendorContactNumber, setVendorContactNumber] = useState("");
  const [VendorEmail, setVendorEmail] = useState("");
  const [VendorAdress, setVendorAdress] = useState("");
  const [vendorId, setVendorId] = useState(null);
  const [image, setImage] = useState("");

  const AddVendorData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("VendorFirstName", VendorFirstName);
    formData.append("VendorLastName", VendorLastName);
    formData.append("VendorContactNumber", VendorContactNumber);
    formData.append("VendorEmail", VendorEmail);
    formData.append("VendorAdress", VendorAdress);
    formData.append("VendorImage", image);
    formData.append("VendorId", vendorId);

    try {
      const config = {
        url: "/Vendor/vendorInfo/addvendorinfo",
        method: "post",
        baseURL: "http://api.srimagicprintz.com/api",
        Header: { "Content-Type": "application/json" },
        data: formData,
      };
      const res = await axios(config);
      if (res.status === 200) {
        const vendorIdFromBackend = res.data.VendorId;
        setVendorId(vendorIdFromBackend);
        alert("Vendor Info Successfully Added");
        window.location.href = "/VendorManageMent";
      }
    } catch (err) {
      alert("not able to add", err);
    }
  };

  return (
    <>
      <Header />
      <div className="row m-auto  containerPadding">
        <Form>
          <>
            <Row className="mb-3">
              <Col className="mb-3">
                <Form.Label>Vendor First Name</Form.Label>
                <Form.Control
                  value={VendorFirstName}
                  onChange={(e) => setVendorFirstName(e.target.value)}
                  placeholder="First name"
                />
              </Col>
              <Col className="mb-3">
                <Form.Label>Vendor Last Name</Form.Label>
                <Form.Control
                  value={VendorLastName}
                  onChange={(e) => setVendorLastName(e.target.value)}
                  placeholder="Last name"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="mb-3">
                <Form.Label>Vendor Phone Number</Form.Label>
                <Form.Control
                  value={VendorContactNumber}
                  onChange={(e) => setVendorContactNumber(e.target.value)}
                  placeholder="Please Enter  Contact number"
                />
              </Col>
              <Col className="mb-3">
                <Form.Label>Vendor Email </Form.Label>
                <Form.Control
                  value={VendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                  placeholder="Please Enter Your Email"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="mb-3">
                <Form.Label>Upload image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  placeholder="Please Enter  Address"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="mb-3">
                <Form.Label>Vendor Address</Form.Label>
                <Form.Control
                  value={VendorAdress}
                  onChange={(e) => setVendorAdress(e.target.value)}
                  as="textarea"
                  placeholder="Please Enter  Address"
                />
              </Col>
            </Row>

            <Row className="mb-3 text-center">
              <Col className="mb-3">
                <Button onClick={AddVendorData}>Save Vendor</Button>
              </Col>
              <Col>
                {" "}
                <Link to="/VendorManageMent">
                  <Button>Cancel</Button>
                </Link>
              </Col>
            </Row>
          </>
        </Form>
      </div>
    </>
  );
}
