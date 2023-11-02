import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function ReceeManagementApi() {
  const [brandName, setBrandName] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setzone] = useState("");
  const [clientName, setclientName] = useState("");
  const [ClientInfo, setClientInfo] = useState("");
  const [brandId, setBrandId] = useState("");

  console.log("brandId",brandId._id)
  console.log("brandName",brandName)

  useEffect(() => {
    getAllClientsInfo();
  }, []);
  const AddRecce = async () => {
    try {
      const config = {
        url: "/recce/recce/addrecce",
        baseURL: "http://localhost:8001/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          BrandId: brandId,
          BrandName: brandName,
          // Area: area,
          // City: city,
          // ContactNumber: contactNumber,
          // Pincode: pincode,
          // Zone: zone,
          // datastatus: "Pending",
        },
      };
     

      const response = await axios(config);

      if (response.status === 200) {
        alert("Added Successfully");
        window.location.href = "/ReceeManagement";
        setBrandName("");
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

  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  let cliendId = ClientInfo?.client?.map((ele) => ele);
  // console.log(brandName, "brandName");/
  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <Form>
          <Col className="col-md-6 m-auto">
            <Form.Group
              md="5"
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Select Client</Form.Label>
              <Form.Select
                className="shadow-none p-3 mb-5 bg-light rounded"
                // value={brandName}
                onChange={(e) => {
                  const getBrands = cliendId.find(
                    (item) => item._id === e.target.value
                  );
                  
                  setBrandId(getBrands);
                  setBrandName(getBrands ? getBrands.clientsBrand : "");
                }}
                type="text"
                placeholder="Enter zone"
              >
                {" "}
                <option>Choose...</option>
                {cliendId?.map((ele) => (
                  <option value={ele._id}>{ele?.clientsBrand}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* 
          <Row className="text-center">
            {" "}
            <Col>OR</Col>
          </Row> */}
          {/* <Row>
            <Col>
              <Form.Group md="5" className="mb-3">
                <Form.Label>Company owner Name</Form.Label>
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
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  type="text"
                  placeholder="Enter  brand name"
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
                <Form.Select
                  value={zone}
                  onChange={(e) => setzone(e.target.value)}
                  type="text"
                  placeholder="Enter zone"
                >
                  <option>Choose...</option>
                  <option>North</option>
                  <option>East</option>
                  <option>West</option>
                  <option>South</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row> */}

          <Row className="row mt-5 text-center ">
            <div className="col-md-4 m-auto">
              <div className="row">
                <Button className="col-md-5 m-1 " onClick={AddRecce}>
                  Save Recce
                </Button>
                <Button
                  className="col-md-5 m-1 text-white "
                  href="/ReceeManagement"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
}
