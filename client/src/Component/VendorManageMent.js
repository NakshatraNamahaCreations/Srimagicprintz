import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "react-bootstrap/esm/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";
// import { ColorRing } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
export default function Vendor() {
  const [filter, setFilter] = useState(false);
  const [selected, setSelected] = useState(null);
  const [vendorData, setVendorData] = useState([]);
  const [selectedbank, setSelectedbank] = useState("");
  const [AccountHolderName, setAccountHolderName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [BankBranch, setBankBranch] = useState("");
  const [BankAccountType, setBankAccountType] = useState("");
  const [uploadDoc, setuploadDoc] = useState("");
  const [addBank, setaddBank] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editVendor, setEditVendor] = useState(false);
  const [editvendorImage, seteEditVendorImage] = useState("");
  const [editselectedbank, setEditselectedbank] = useState("");
  const [editAccountHolderName, setEditAccountHolderName] = useState("");
  const [editAccountNumber, setEditAccountNumber] = useState("");
  const [editIFSCCode, setEditIFSCCode] = useState("");
  const [editBankBranch, setEditBankBranch] = useState("");
  const [editBankAccountType, setEditBankAccountType] = useState("");
  const [edituploadDoc, setEdituploadDoc] = useState("");
  const [editVendorFristName, setEditVendorFristName] = useState("");
  const [editVendorLastName, setEditVendorLastName] = useState("");
  const [editVendorEmail, setEditVendorEmail] = useState("");
  const [editVendorContactNumber, setEditVendorContactNumber] = useState("");
  const [editVendorAdress, setEditVendorAdress] = useState("");
  const [editVendorData, setEditVendorData] = useState(null);
  const [recceData, setRecceData] = useState([]);
  const [showGroup, setShowGroup] = useState(false);

  const handleGroupClose = () => setShowGroup(false);
  const handleGroupShow = () => setShowGroup(true);
  const [selectedvendors, setSelectedVendors] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [vendorName, setvendorName] = useState(false);

  useEffect(() => {
    getAllVendorInfo();
   
    getAllRecce();
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
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setaddBank(false);
  const handleShow = async () => {
    try {
      const response = await axios.get(
        "http://api.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
      );

      if (response.status === 200) {
        const vendorArray = response.data.vendors;
        const vendor = vendorArray.find(
          (vendor) => vendor.VendorId === vendorData[selected].VendorId
        );

        if (vendor && vendor.AccountNumber) {
          alert("Bank details already added for this vendor");
        } else {
          setaddBank(true);
        }
      }
    } catch (err) {
      alert("Error fetching vendor info", err);
    }
  };

  const AddVendorBankData = async () => {
    const formData = new FormData();
    formData.append("vendorId", vendorData[selected].VendorId);
    formData.append("selectedbank", selectedbank);
    formData.append("AccountHolderName", AccountHolderName);
    formData.append("AccountNumber", AccountNumber);
    formData.append("BankBranch", BankBranch);
    formData.append("BankAccountType", BankAccountType);
    formData.append("IFSCCode", IFSCCode);

    if (uploadDoc) {
      formData.append("BankInfoImage", uploadDoc);
    }

    try {
      const config = {
        url: "/Vendor/vendorInfo/linkbankinfo",
        method: "post",
        baseURL: "http://api.srimagicprintz.com/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      const res = await axios(config);
      if (res.status === 200) {
        alert("Vendor bank info successfully added");
        setaddBank(false);
        window.location.reload();
      }
    } catch (err) {
      alert("Not able to add", err);
    }
  };

  const handlesetSelected = (index) => {
    setSelectedCardIndex(index);
    setSelected(index);
  };

  useEffect(() => {}, [selected]);

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleVendorEdit = (vendorId) => {
    const vendorToEdit = vendorData.find(
      (vendor) => vendor.VendorId === vendorId
    );

    if (vendorToEdit) {
      setEditVendorData(vendorToEdit);
      setEditVendor(true);
    } else {
      alert("Vendor not found for editing");
    }
  };

  const handleVendorupdate = async () => {
    const formData = new FormData();

    formData.append(
      "VendorImage",
      editvendorImage ||
        (editVendorData ? editVendorData.VendorImage : vendorData.VendorImage)
    );

    formData.append(
      "VendorLastName",
      editVendorFristName ||
        (editVendorData
          ? editVendorData.VendorFirstName
          : vendorData.VendorFirstName)
    );

    formData.append(
      "VendorLastName",
      editVendorLastName ||
        (editVendorData
          ? editVendorData.VendorLastName
          : vendorData.VendorLastName)
    );
    formData.append(
      "VendorContactNumber",
      editVendorContactNumber ||
        (editVendorData
          ? editVendorData.VendorContactNumber
          : vendorData.VendorContactNumber)
    );

    formData.append(
      "VendorEmail",
      editVendorEmail ||
        (editVendorData ? editVendorData.VendorEmail : vendorData.VendorEmail)
    );
    formData.append(
      "VendorAdress",
      editVendorAdress ||
        (editVendorData ? editVendorData.VendorAdress : vendorData.VendorAdress)
    );
    formData.append(
      "selectedbank",
      editselectedbank ||
        (editVendorData ? editVendorData.selectedbank : vendorData.selectedbank)
    );
    formData.append(
      "AccountHolderName",
      editAccountHolderName ||
        (editVendorData
          ? editVendorData.AccountHolderName
          : vendorData.AccountHolderName)
    );

    formData.append(
      "AccountNumber",
      editAccountNumber ||
        (editVendorData
          ? editVendorData.AccountNumber
          : vendorData.AccountNumber)
    );
    formData.append(
      "BankAccountType",
      editBankAccountType ||
        (editVendorData
          ? editVendorData.BankAccountType
          : vendorData.BankAccountType)
    );
    formData.append(
      "BankBranch",
      editBankBranch ||
        (editVendorData ? editVendorData.BankBranch : vendorData.BankBranch)
    );
    formData.append(
      "IFSCCode",
      editIFSCCode ||
        (editVendorData ? editVendorData.IFSCCode : vendorData.IFSCCode)
    );
    formData.append(
      "BankInfoImage",
      edituploadDoc ||
        (editVendorData
          ? editVendorData.BankInfoImage
          : vendorData.BankInfoImage)
    );

    try {
      const vendorid = editVendorData._id;
      const config = {
        url: `/Vendor/vendorInfo/updatevendordata/${vendorid}`,
        baseURL: "http://api.srimagicprintz.com/api",
        method: "put",
        Header: { "Content-type": "application/json" },
        data: formData,
      };
      const response = await axios(config);

      if (response.status === 200) {
        alert("succesfully updated");
        setEditVendor(false);
      }
    } catch (err) {
      alert(err, "error frontend");
    }
  };

  const deleteVendorData = async (row) => {
    try {
      const response = await axios.delete(
        `http://api.srimagicprintz.com/api/Vendor/vendorInfo/deletevendordata/${row._id}`
      );

      if (response.status === 200) {
        alert(response.data.success);
        window.location.reload();
      }
    } catch (error) {
      alert(error, "Cannot delete vendor");
    }
  };

  const filterOldToNew = () => {
    const sortedData = [...vendorData].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setVendorData(sortedData);
  };

  const filterNewToOld = () => {
    const sortedData = [...vendorData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setVendorData(sortedData);
  };
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const vendorStatusData = {};

  vendorData.forEach((vendor) => {
    const vendorId = vendor._id;

    const statusCounts = {
      completed: 0,
      processing: 0,
    };

    recceData?.forEach((recceItem) => {
      recceItem?.outletName.forEach((outlet) => {
        if (outlet.vendor === vendorId) {
          if (outlet.RecceStatus.includes("completed")) {
            statusCounts.completed++;
          }
          if (outlet.RecceStatus.includes("proccesing")) {
            statusCounts.processing++;
          }
        }
      });
    });

    vendorStatusData[vendorId] = statusCounts;
  });

  const handleAddGroup = async () => {
    try {
      const config = {
        url: "/createroup",
        baseURL: "http://api.srimagicprintz.com/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: { InstallationGroup: selectedVendorObjects },
      };
      const response = await axios(config);
      if (response.status === 200) {
        alert("created group succesfull");
        window.location.reload();
      }
    } catch (Err) {
      console.log(Err);
    }
  };

  const [selectedVendorObjects, setSelectedVendorObjects] = useState([]);

  const handleCheckboxChange = (event, vendorObject) => {
    const updatedObjects = event.target.checked
      ? [...selectedVendorObjects, vendorObject]
      : selectedVendorObjects.filter((obj) => obj._id === vendorObject._id);

    setSelectedVendorObjects(updatedObjects);
  };

  const handleSelectClientName = () => {
    const selectedVendorObjects = vendorData.filter((vendor) =>
      selectedCheckboxes.includes(vendor._id)
    );

    setSelectedVendors(selectedVendorObjects);
    setvendorName(!vendorName);
  };

  let SelectedVendorName = selectedVendorObjects?.map(
    (Ele) => Ele.VendorFirstName
  );

  return (
    <>
      <Header />
      <div className="row m-auto containerPadding">
        {selectedCardIndex === null ? (
          <>
            <div className="row m-auto">
              <div className="row m-auto">
                <div className="col-md-12">
                  <div className="row ">
                    <div className="col-md-12 text-end m-auto">
                      <div className="row ">
                        <div>
                          <TuneIcon onClick={handleFilter} />
                          {filter ? (
                            <div
                              className="shadow-sm p-3 mb-5 bg-white rounded"
                              style={{
                                position: "absolute",
                                right: "3%",
                                zIndex: "20",
                              }}
                            >
                              <p>Sort By Date</p>
                              <p
                                onClick={filterOldToNew}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                New to Old
                              </p>
                              <p
                                onClick={filterNewToOld}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Old to New
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <Button className="col-md-2 m-1 c_W" href="/VendorInfo">
                          Add Vendor
                        </Button>
                        <Button
                          className="col-md-2 m-1 c_W"
                          onClick={handleGroupShow}
                        >
                          {" "}
                          <span className="m-auto">
                            <AddIcon />
                          </span>
                          <span className="m-auto"> Add Group</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                {vendorData ? (
                  vendorData.map((ele, index) => (
                    <Card
                      className="col-md-4 m-3 "
                      style={{
                        width: "230px",
                        height: "290px",
                        borderRadius: "10%",
                      }}
                      key={ele._id}
                      onClick={() => handlesetSelected(index)}
                    >
                      <div className="row  m-auto">
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
                          {ele.VendorFirstName?.charAt(0)?.toUpperCase() +
                            ele.VendorFirstName?.substr(1)}{" "}
                          {ele.VendorLastName}
                        </span>

                        <span style={{ color: "orange" }}>
                          Job Assigned
                          <span style={{ margin: "5px" }}>
                            {vendorStatusData[ele._id]?.processing || 0}
                          </span>
                        </span>
                        <span style={{ color: "green" }}>
                          Job Completed
                          <span style={{ margin: "5px" }}>
                            {vendorStatusData[ele._id]?.completed || 0}
                          </span>
                        </span>
                        <p className="m-0">
                          <span className="me-2">Employee Id:</span>
                          <span>{ele?.VendorId}</span>{" "}
                        </p>
                        <p className="m-0">
                          <span className="me-2">Employee Type:</span>
                          <span> {ele.SelectedType}</span>
                        </p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div>Loading or no data available</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="col-md-1 "
              onClick={() => setSelectedCardIndex(null)}
            >
              <ArrowCircleLeftIcon
                style={{ color: "#068FFF", fontSize: "35px" }}
              />
            </div>{" "}
            <div className="row m-auto">
              <div className="col-md-12">
                {vendorData &&
                  selected !== undefined &&
                  selected < vendorData.length &&
                  selected >= 0 && (
                    <div className="row m-auto">
                      {editVendor && editVendorData !== null ? (
                        <>
                          <Row>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Vendor Profile</Form.Label>
                              <Form.Control
                                type="file"
                                onChange={(e) =>
                                  seteEditVendorImage(e.target.files[0])
                                }
                              />
                            </Col>
                            {/* <Col className="col-md-4 mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.SelectedType}
                                onChange={(e) =>
                                  setEditVendorFristName(e.target.value)
                                }
                              />
                            </Col> */}
                            <Col className="col-md-4 mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.VendorFirstName}
                                onChange={(e) =>
                                  setEditVendorFristName(e.target.value)
                                }
                              />
                            </Col>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.VendorFirstName}
                                onChange={(e) =>
                                  setEditVendorLastName(e.target.value)
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Vendor Contact Number</Form.Label>
                              <Form.Control
                                defaultValue={
                                  editVendorData?.VendorContactNumber
                                }
                                onChange={(e) =>
                                  setEditVendorContactNumber(e.target.value)
                                }
                              />
                            </Col>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Vendor Email</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.VendorEmail}
                                onChange={(e) =>
                                  setEditVendorEmail(e.target.value)
                                }
                              />
                            </Col>{" "}
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Vendor Address</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.VendorAdress}
                                onChange={(e) =>
                                  setEditVendorAdress(e.target.value)
                                }
                              />{" "}
                            </Col>{" "}
                          </Row>
                          <Row>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>selected Bank</Form.Label>

                              <Form.Select
                                defaultValue={editVendorData?.selectedbank}
                                onChange={(e) =>
                                  setEditselectedbank(e.target.value)
                                }
                              >
                                <option>Choose..</option>
                                <option>MAHB</option>
                                <option>ALLA</option>
                                <option>ASBL</option>
                                <option>ANDB</option>
                              </Form.Select>
                            </Col>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>AccountHolderName</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.AccountHolderName}
                                onChange={(e) =>
                                  setEditAccountHolderName(e.target.value)
                                }
                              />
                            </Col>{" "}
                            <Col className="col-md-4 mb-3">
                              <Form.Label> Account Number</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.AccountNumber}
                                onChange={(e) =>
                                  setEditAccountNumber(e.target.value)
                                }
                              />
                            </Col>{" "}
                          </Row>
                          <Row>
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Bank Accounttype</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.BankAccountType}
                                onChange={(e) =>
                                  setEditBankAccountType(e.target.value)
                                }
                              />
                            </Col>{" "}
                            <Col className="col-md-4 mb-3">
                              <Form.Label> IFSC code</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.IFSCCode}
                                onChange={(e) =>
                                  setEditIFSCCode(e.target.value)
                                }
                              />
                            </Col>{" "}
                            <Col className="col-md-4 mb-3">
                              <Form.Label>Bank Branch</Form.Label>
                              <Form.Control
                                defaultValue={editVendorData?.BankBranch}
                                onChange={(e) =>
                                  setEditBankBranch(e.target.value)
                                }
                              />
                            </Col>{" "}
                          </Row>

                          <Row>
                            <Col className="col-md-1 mb-3 m-auto">OR</Col>
                          </Row>
                          <Row>
                            <Col className=" mb-3">
                              <Form.Label>Upload Document(passbook)</Form.Label>

                              <Form.Control
                                type="file"
                                onChange={(e) =>
                                  setEdituploadDoc(e.target.files[0])
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Button
                              className="col-md-3 m-auto c_W"
                              onClick={handleVendorupdate}
                            >
                              {" "}
                              Update
                            </Button>{" "}
                          </Row>
                        </>
                      ) : (
                        <div className="col-md-12">
                          <div
                            className="col-md-5 m-auto"
                            key={vendorData[selected].VendorId}
                          >
                            <p>
                              {vendorData[selected].VendorImage ? (
                                <img
                                  style={{
                                    width: "30%",
                                    height: "30%",
                                    borderRadius: "100%",
                                  }}
                                  src={`http://api.srimagicprintz.com/VendorImage/${vendorData[selected].VendorImage}`}
                                  alt=""
                                />
                              ) : null}
                            </p>
                            {/* 
                            <p>
                              <span className="cl">Job Type:</span>

                              {jobdata.map((ele) => {
                                return ele.vendor.map((vendorid) => {
                                  if (
                                    vendorid._id[0] ===
                                    vendorData[selected].VendorId
                                  ) {
                                    return (
                                      <span key={vendorid.VendorId}>
                                        {ele.typesofjob}
                                      </span>
                                    );
                                  }
                                  // Return null if the condition is not met
                                  return null;
                                });
                              })}
                            </p> */}
                            <p>
                              <span className="cl">Employee Type:</span>
                              <span>{vendorData[selected].SelectedType}</span>
                            </p>
                            <p>
                              <span className="cl">Name:</span>
                              <span>
                                {vendorData[selected]?.VendorFirstName?.charAt(
                                  0
                                )?.toUpperCase() +
                                  vendorData[selected]?.VendorFirstName?.substr(
                                    1
                                  )}{" "}
                                {vendorData[selected]?.VendorLastName}
                              </span>
                            </p>
                            <p>
                              <span className="cl">Contact Number:</span>
                              <span>
                                {vendorData[selected].VendorContactNumber}
                              </span>
                            </p>
                            <p>
                              <span className="cl">Employee Id:</span>
                              <span> {vendorData[selected].VendorId}</span>
                            </p>
                            <p>
                              <span className="cl">Email:</span>
                              <span>{vendorData[selected].VendorEmail}</span>
                            </p>
                            <p>
                              <span className="cl">Address:</span>
                              <span>{vendorData[selected].VendorAdress}</span>
                            </p>
                            <p>
                              <span className="cl">Bank Name:</span>
                              <span>{vendorData[selected].selectedbank}</span>
                            </p>
                            <p>
                              <span className="cl">AccountHolderName:</span>
                              <span>
                                {vendorData[selected].AccountHolderName}
                              </span>
                            </p>

                            <p>
                              <span className="cl">Account Number:</span>
                              <span>{vendorData[selected].AccountNumber}</span>
                            </p>
                            <p>
                              <span className="cl">Bank Branch:</span>
                              <span>{vendorData[selected].BankBranch}</span>
                            </p>

                            <p>
                              <span className="cl"> BankAccountType:</span>
                              <span>
                                {vendorData[selected].BankAccountType}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> IFSC code:</span>
                              <span>{vendorData[selected].IFSCCode}</span>
                            </p>
                            {vendorData[selected].BankInfoImage ? (
                              <img
                                width={"200px"}
                                height={"100px"}
                                src={`http://api.srimagicprintz.com/BankInfoImage/${vendorData[selected].BankInfoImage}`}
                                alt=""
                              />
                            ) : null}

                            <div className="row ">
                              <Button
                                className="col-md-3 m-2 c_W"
                                onClick={handleShow}
                              >
                                Add Bank{" "}
                              </Button>
                              <Button
                                className="col-md-3 m-2 c_W"
                                onClick={() =>
                                  handleVendorEdit(
                                    vendorData[selected].VendorId
                                  )
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                className="col-md-3 m-2 c_W"
                                onClick={() =>
                                  deleteVendorData(vendorData[selected])
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Modal show={addBank} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bank Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form className="row">
                      <Row className="mb-3">
                        <Col className="mb-3">
                          <Form.Label>Select Bank</Form.Label>
                          <Form.Select
                            value={selectedbank}
                            onChange={(e) => setSelectedbank(e.target.value)}
                          >
                            <option>Choose...</option>
                            <option>SBI</option>
                            <option>DCC</option>
                          </Form.Select>
                        </Col>
                        <Col className="mb-3">
                          <Form.Label>Account Name</Form.Label>
                          <Form.Control
                            value={AccountHolderName}
                            onChange={(e) =>
                              setAccountHolderName(e.target.value)
                            }
                            placeholder="Enter account holder name"
                          />
                        </Col>{" "}
                      </Row>
                      <Row className="mb-3">
                        <Col className="mb-3">
                          <Form.Label>A/C Number</Form.Label>
                          <Form.Control
                            value={AccountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Please enter  account number"
                          />
                        </Col>
                        <Col className="mb-3">
                          <Form.Label>Branch</Form.Label>
                          <Form.Control
                            value={BankBranch}
                            onChange={(e) => setBankBranch(e.target.value)}
                            placeholder="Please enter branch"
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col className="mb-3">
                          <Form.Label>A/C Type </Form.Label>
                          <Form.Control
                            value={BankAccountType}
                            onChange={(e) => setBankAccountType(e.target.value)}
                            placeholder="Please enter account type"
                          />
                        </Col>
                        <Col className="mb-3">
                          <Form.Label>IFSC Code </Form.Label>
                          <Form.Control
                            value={IFSCCode}
                            onChange={(e) => setIFSCCode(e.target.value)}
                            placeholder="Enter account IFSC code"
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 text-center">
                        <Col>OR</Col>
                      </Row>
                      <Row className="mb-3 m-auto upload">
                        <Col>
                          <Form.Label>
                            <CloudUploadIcon
                              style={{ fontSize: "30px" }}
                              className="cloud-icon "
                            />
                            <p className="m-auto">upload file</p>
                            <Form.Control
                              onChange={(e) => setuploadDoc(e.target.files[0])}
                              type="file"
                              style={{ display: "none" }}
                            />
                          </Form.Label>
                        </Col>
                      </Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="c_W"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      className="c_W"
                      variant="primary"
                      onClick={AddVendorBankData}
                    >
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal show={showGroup} onHide={handleGroupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form.Group
              md="5"
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              {" "}
              <>
                <Form.Label>Select Clients name</Form.Label>
                <div>
                  <Form.Control
                    placeholder="select clients name"
                    value={!vendorName ? SelectedVendorName : null}
                    onClick={() => setvendorName(!vendorName)}
                    readOnly
                  />
                </div>

                {vendorName ? (
                  <div
                    style={{
                      position: "absolute",
                      width: "14.2rem",
                    }}
                    className="col-md-2 m-auto shadow-sm p-3 mb-5 bg-white rounded"
                  >
                    <div>
                      <div className="row">
                        <p
                          className="cureor"
                          onClick={handleSelectClientName}
                          style={{ borderBottom: "1px solid grey" }}
                        >
                          <CheckIcon />
                          Apply selection
                        </p>
                      </div>
                      {vendorData?.map((ele, index) => {
                        return (
                          <div
                            className="row m-auto"
                            key={index}
                            style={{ zIndex: "100" }}
                          >
                            <Form.Label>
                              <Form.Check
                                type="checkbox"
                                className="me-3 d-inline"
                                value={ele?.VendorFirstName}
                                checked={selectedVendorObjects.includes(ele)}
                                onChange={(event) => {
                                  handleCheckboxChange(event, ele);
                                }}
                              />

                              <p className="d-inline">{ele?.VendorFirstName}</p>
                            </Form.Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            </Form.Group>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGroupClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddGroup}>
            Save Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
