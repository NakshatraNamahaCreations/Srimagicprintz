import React, { useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function AddDesign() {
  const [designImages, setDesignImages] = useState("");
  const [designStatus, setdesignStatus] = useState("");
  const addDesign = async () => {
    const formdata = new FormData();
    if ("designimage") {
      for (const image of designImages) {
        formdata.append("designimage", image);
      }
    }
    // formdata.append("reeceDetails", getreccedata.completedRecceId);
    formdata.append("Designstatus", designStatus);
    try {
      const config = {
        url: "/design/design/adddesign",
        baseURL: "http://localhost:8000/api",
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Successfully added design");
        window.location.href = "/Printing";
      }
    } catch (err) {
      alert(err, "error while adding design");
    }
  };

  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <Form>
          <Row>
            <Col className="mb-3">
              <Form.Label>Recce Status</Form.Label>
              <Form.Select
                value={designStatus}
                onChange={(e) => setdesignStatus(e.target.value)}
              >
                <option>Choose...</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Completed</option>
              </Form.Select>
            </Col>{" "}
            <Col className="col-md-3 mt-2">
              <div className="col-md-3 mt-2">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  value={designStatus}
                  onChange={(e) => setdesignStatus(e.target.value)}
                />{" "}
              </div>
            </Col>
          </Row>

          <Row className="row mt-5">
            <Button className="col-md-2 m-auto" onClick={addDesign}>
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
