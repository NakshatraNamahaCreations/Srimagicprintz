import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
export default function JobManagement() {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [vendorData, setVendorData] = useState([]);

  const [assignJobtoclient, setAssignJobToClient] = useState([]);
  const [client, setclient] = useState([]);
  const [assignJobimage, setassignJobimage] = useState("");

  const [jobType, setJobType] = useState();
  const [recceAssignedClientName, setRecceAssignedClientName] = useState("");
  const [recceAssignedClientNumber, setRecceAssignedClientNumber] =
    useState("");
  const [recceAssignedClientZone, setRecceAssignedClientZone] = useState("");
  const [recceAssignedClientPincode, setRecceAssignedClientPincode] =
    useState("");
  const [AssignJob, setAssignJob] = useState(false);
  const [selected, setSelected] = useState(null);

  const [addPrint, setAddPrint] = useState(false);

  useEffect(() => {
    getAllClientsInfo();
  }, []);
  const handleClientNameChange = (selectedClientId) => {
    const selectedClient = assignJobtoclient.find(
      (ele) => ele._id === selectedClientId
    );
    setclient(selectedClient);

    if (selectedClient) {
      setSelectedClientId(selectedClientId);
      setRecceAssignedClientName(selectedClient?.clientsName);
      setRecceAssignedClientNumber(selectedClient?.ClientsContactNumber1);
      setRecceAssignedClientPincode(selectedClient?.Pincode);
      setRecceAssignedClientZone(selectedClient?.Zone);
      setassignJobimage(selectedClient?.ClientImage);
    }
  };

  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setAssignJobToClient(res.data.client);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  useEffect(() => {
    getAllVendorInfo();
  }, []);

  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://api.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
      );

      if (response.status === 200) {
        let vendor = response.data.vendors;
        setVendorData(vendor);
      } else {
        alert("Unable to fetch data");
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };
  const AssignJobs = async (vendordata) => {
    try {
      const config = {
        url: "/Jobmangement/assignjob/assignjobs",
        baseURL: "http://api.srimagicprintz.com/api",
        method: "post",
        data: {
          typesofjob: jobType,
          client: client,
          vendor: vendordata,
        },

        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      if (response.status === 200) {
        alert("Assigned job successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Frontend error while assigning job");
    }
  };

  const handleAddPrint = () => {
    setAddPrint(!addPrint);
  };

  return (
    <>
      <Header />

      <div className="row mt-3 m-auto containerPadding">
        <>
          {!selected ? (
            <>
              <Form>
                <Row>
                  <Col>
                    <Form.Group
                      md="5"
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Types of Job</Form.Label>
                      <Form.Select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        type="text"
                      >
                        <option>Choose...</option>
                        <option>Recce</option>
                        <option>Design</option>
                        <option>Printing</option>
                        <option>Fabrication</option>
                        <option>Installation</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      md="5"
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Client Name</Form.Label>

                      <Form.Select
                        value={selectedClientId} // Set the selected client ID
                        onChange={(e) => handleClientNameChange(e.target.value)}
                      >
                        <option>Choose..</option>
                        {assignJobtoclient.map((client) => (
                          <option key={client._id} value={client._id}>
                            {client.clientsName}
                          </option>
                        ))}
                      </Form.Select>
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
                        value={recceAssignedClientNumber}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group md="5" className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        value={recceAssignedClientPincode}
                        type="text"
                        placeholder="Pincode"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group md="5" className="mb-3">
                      <Form.Label>Zone</Form.Label>
                      <Form.Control
                        value={recceAssignedClientZone}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row m-auto">
                  <Button
                    onClick={() => setSelected(true)}
                    className="col-md-2"
                  >
                    Select Vendor
                  </Button>
                </Row>
              </Form>
            </>
          ) : jobType === "Recce" ? (
            <>
              <ToastContainer type="success" />

              <>
                <div className="col-md-1">
                  <ArrowCircleLeftIcon
                    onClick={() => setSelected(false)}
                    style={{ color: "#068FFF", fontSize: "35px" }}
                  />
                </div>
                <div className="row mt-3 m-auto containerPadding">
                  {vendorData ? (
                    vendorData.map((ele, index) => (
                      <Card
                        key={ele.VendorId}
                        className="col-md-4 m-3 "
                        style={{
                          width: "200px",
                          height: "250px",
                          borderRadius: "10%",
                        }}
                        // onClick={() => handlesetSelected(index)}
                      >
                        <div className="row text-center m-auto">
                          {ele.VendorImage ? (
                            <img
                              style={{
                                width: "70%",
                                height: "50%",
                                borderRadius: "100%",
                              }}
                              className="m-auto"
                             src={`http://api.srimagicprintz.com/VendorImage/${ele.VendorImage}`}
                              alt=""
                            />
                          ) : (
                            <span>No Image Available</span>
                          )}
                          <span>
                            {ele.VendorFirstName.charAt(0).toUpperCase() +
                              ele.VendorFirstName.substr(1)}{" "}
                            {ele.VendorLastName}
                          </span>
                          <span>{ele.VendorId}</span>
                          <span style={{ color: "orange" }}>
                            Job Assigned
                            <span style={{ margin: "5px" }}>0</span>
                          </span>
                          <span style={{ color: "green" }}>
                            Job Completed
                            <span style={{ margin: "5px" }}>0</span>
                          </span>
                          <Button onClick={() => AssignJobs(ele)}>
                            Assign job
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div>Loading or no data available</div>
                  )}
                </div>
              </>
            </>
          ) : jobType === "Design" ? (
            <>
              <ToastContainer type="success" />
              <div className="col-md-1" onClick={(e) => setSelected(e, null)}>
                <ArrowCircleLeftIcon
                 onClick={() => setSelected(null)}
                  style={{ color: "#068FFF", fontSize: "35px" }}
                />
              </div>
              <div className="row m-auto containerPadding">
                {" "}
                <div className="col-md-8">
                  <div>
                    <img
                      className="rounded"
                      width={"120px"}
                      height={"60px"}
                      src="https://d2tl9ctlpnidkn.cloudfront.net/hlsonprint/images/products_gallery_images/vinyl-banner-printing-hls-02b35.jpg"
                      alt=""
                    />
                  </div>

                  <div className="row mt-5">
                    <div
                      className="col-md-5 "
                      style={{
                        padding: "20px",
                        border: "1px solid grey",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="text-center">
                        <Form.Label>
                          <p> Add your design</p>
                          <AddCircleOutlineIcon

                            className="m-auto"
                            style={{ color: "blue" }}
                          />
                          <Form.Control
                            type="file"
                            style={{ display: "none" }}
                          />
                        </Form.Label>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <label>
                        <input type="file" className="hide" />
                        <img
                          className="mt-4"
                          width={"50px"}
                          height={"50px"}
                          alt=""
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
                        />
                      </label>
                    </div>
                    <div className="col-md-1">
                      <label>
                        <input type="file" className="hide" />
                        <img
                          className="mt-4"
                          width={"50px"}
                          height={"50px"}
                          alt=""
                          src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-7">
                      <Button
                        
                        className="mt-3"
                      >
                        Add Design
                      </Button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null || jobType === "Installation" ? (
            <>
              <ToastContainer type="success" />

              <>
                <div className="col-md-1" onClick={() => setSelected(null)}>
                  <ArrowCircleLeftIcon
                    style={{ color: "#068FFF", fontSize: "35px" }}
                  />
                </div>
                <div className="row mt-3 m-auto containerPadding">
                  {vendorData ? (
                    vendorData.map((ele, index) => (
                      <Card
                        key={ele.VendorId}
                        className="col-md-4 m-3 p-2"
                        style={{
                          width: "200px",
                          height: "250px",
                          borderRadius: "10%",
                        }}
                      >
                        <div className="row text-center m-auto">
                          <h4>Group{index + 1}</h4>
                          <h4>{jobType}</h4>
                        </div>
                        <div className="row m-auto">
                          <Button onClick={() => AssignJobs(ele)}>
                            Assigned Job
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div>Loading or no data available</div>
                  )}
                </div>
              </>
            </>
          ) : null || jobType === "Printing" ? (
            <>
              <div className="col-md-12">
                {!addPrint ? (
                  <>
                    {" "}
                    <Row className="row m-auto">
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Category</Form.Label>
                          <Form.Select type="text">
                            <option>Choose All...</option>
                            <option>Outdooor Singas</option>
                            <option>Promption products</option>
                            <option>Outdooor Singas</option>
                            <option>Outdooor Singas</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Subcategory</Form.Label>
                          <Form.Select type="text">
                            <option>Choose All...</option>
                            <option>Table Top Lit Poster</option>
                            <option>Gifts</option>
                            <option>Roll Up Standee</option>
                            <option>Gifts</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            placeholder="Enter  Quantity"
                            type="text"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="row mt-3">
                      <Button
                        onClick={handleAddPrint}
                        className="col-md-2 mt-3 m-auto"
                      >
                        Process
                      </Button>{" "}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row  m-auto ">
                      <div className="col-md-8">
                        <p>
                          <span className="me-3 clr">Isty Bisty :</span>
                          <span className="me-3 ">SMP01</span>
                        </p>
                        <p>
                          <span className="me-3 clr">Quantity :</span>
                          <span className="me-3 ">5</span>
                        </p>
                        <p className="me-3 clr">Size</p>
                        <p>
                          <span>width : </span> <span>5.6ft</span>
                          <br />
                          <span>Height : </span> <span>5.6ft</span>{" "}
                        </p>
                        <p className="me-3 clr">Category</p>
                        <p>
                          <span className="me-3 ">Promostion products</span>{" "}
                          <br />
                          <span className="me-3 ">Canapy </span>{" "}
                        </p>

                        <div>
                          <span className="me-3 clr">Design :</span>
                          <img
                            width={"100px"}
                            height={"50px"}
                            className="me-4"
                            style={{
                              border: "1px solid grey",
                              borderRadius: "10px",
                            }}
                            alt=""
                            src="https://lh5.googleusercontent.com/p/AF1QipNhw3RlHgDeOCF8nNOHjDT282CkSu4RcY-MrhFJ=w390-h262-n-k-no"
                          />
                          <img
                            width={"40px"}
                            height={"30px"}
                            className="me-4"
                            alt=""
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
                          />

                          <img
                            width={"50px"}
                            height={"50px"}
                            alt=""
                            src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-7">
                        <Button
                          onClick={() => setSelected(null)}
                          className="mt-3"
                        >
                          Process
                        </Button>{" "}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : null || jobType === "Fabrication" ? (
            <>
              <div className="col-md-8">
                <div>
                  <img
                    style={{ borderRadius: "10px" }}
                    width={"120px"}
                    height={"60px"}
                    src="https://d2tl9ctlpnidkn.cloudfront.net/hlsonprint/images/products_gallery_images/vinyl-banner-printing-hls-02b35.jpg"
                    alt=""
                  />
                </div>

                <div className="row mt-5">
                  <div
                    className="col-md-5 "
                    style={{
                      padding: "20px",
                      border: "1px solid grey",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="text-center">
                      <p> Add your design</p>

                      <AddCircleOutlineIcon
                        className="m-auto"
                        style={{ color: "blue" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label>
                      <input type="file" className="hide" />
                      <img
                        className="mt-4"
                        width={"50px"}
                        height={"50px"}
                        alt=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
                      />
                    </label>
                  </div>
                  <div className="col-md-1">
                    <label>
                      <input type="file" className="hide" />
                      <img
                        className="mt-4"
                        width={"50px"}
                        height={"50px"}
                        alt=""
                        src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
                      />
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-7">
                    <Button onClick={AssignJob} className="mt-3">
                      Add fabrication
                    </Button>{" "}
                    <Button onClick={() => setSelected(null)} className="mt-3">
                      Go back
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      </div>
    </>
  );
}
