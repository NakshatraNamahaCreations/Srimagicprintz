import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx"; // Import the xlsx library
import axios from "axios";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

export default function Installation() {
  // const ApiURL = process.env.REACT_APP_API_URL;
  const [recceData, setRecceData] = useState([]);

  const [displayedData, setDisplayedData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAction, setselectAction] = useState(false);

  const [InstaLationGroups, setInstaLationGroups] = useState(null);

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [moreoption, setmoreoption] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRecceItems1, setSelectedRecceItems1] = useState([]);
  const [ClientInfo, setClientInfo] = useState([]);
  const [selectrecceStatus, setSelectRecceStatus] = useState(null);
  const [RecceId, setRecceId] = useState(null);
  const [show, setShow] = useState(false);
  const [instalationgrp, setInstalationgrp] = useState(null);
  const [selctedVendor, setselctedVendor] = useState(null);
  const [vendordata, setVendorData] = useState([]);
  const handleClose1 = () => setShow(false);
  const [selctedStatus, setSelectedStatus] = useState("--Select All--");
  const [OutletDoneData, setOutletDoneData] = useState([]);
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getAllInstalation();
    getAllVendorInfo();
    getAllOutlets();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        // const filteredRecceData = res.data.RecceData.filter(
        //   (item) => item._id === item.completedFabrication
        // );

        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const filteredClients = () => {
      let results = [...recceData];

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, results.length);
      const dataToDisplay = results.slice(startIndex, endIndex);
      setDisplayedData(dataToDisplay);
    };
    filteredClients();
  }, [recceData, rowsPerPage]);
  const getAllOutlets = async () => {
    try {
      const res = await axios.get(`http://api.srimagicprintz.com/api/getalloutlets`);
      if (res.status === 200) {
        setOutletDoneData(res?.data?.outletData);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://api.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
      );

      if (response.status === 200) {
        let vendors = response.data.vendors;
        setVendorData(vendors);
      } else {
        alert("Unable to fetch data");
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };
  const getAllInstalation = async () => {
    try {
      let res = await axios.get("http://api.srimagicprintz.com/api/getgroup");
      if (res.status === 200) {
        let instalationData = res?.data?.instalation?.flatMap((ele) => ele);
        setInstaLationGroups(instalationData);
        // InstalationGroup
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleExportPDF = () => {
    if (!selectedRecceItems1 || selectedRecceItems1.length === 0) {
      alert("Please select at least one record to export");
      return;
    }

    if (!filteredData) {
      alert("No data available for export");
      return;
    }

    const pdf = new jsPDF();
    const tableColumn = [
      "SI.No",
      "Shop Name",
      "Contact",
      "Address",
      "City",
      "Zone",
      "Date",
      "Status",
    ];

    let serialNumber = 0;

    const tableData = selectedRecceItems1.flatMap((outletidd) =>
      filteredData.flatMap((Ele) =>
        Ele?.outletName
          ?.filter(
            (outle) =>
              outle?._id === outletidd &&
              outle?.Designstatus?.includes("Completed") &&
              outle?.OutlateFabricationDeliveryType?.includes(
                "Go to installation"
              )
          )
          .map((item) => ({
            siNo: ++serialNumber,
            shopName: item.ShopName,
            contact: item.OutletContactNumber,
            address: item.OutletAddress,
            city: item.OutletCity,
            zone: item.OutletZone,
            date: item.createdAt
              ? new Date(item.createdAt).toISOString().slice(0, 10)
              : "",
            status: item.RecceStatus,
            // height: item.height,
            // width: item.width,
          }))
      )
    );

    if (tableData.length === 0) {
      alert("No data available for the selected records");
      return;
    }

    pdf.autoTable({
      head: [tableColumn],
      body: tableData.map((item) => Object.values(item)),
      startY: 20,
      styles: {
        fontSize: 6,
      },
      columnStyles: {
        0: { cellWidth: 10 },
      },
      bodyStyles: { borderColor: "black", border: "1px solid black" },
    });

    pdf.save("exported_data.pdf");
  };

  const handleClearDateFilters = () => {
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const filterDate = (data) => {
    return data?.filter((item) => {
      const createdAtDate = moment(item.createdAt, "YYYY-MM-DD");
      const startDate = filterStartDate
        ? moment(filterStartDate, "YYYY-MM-DD")
        : null;
      const endDate = filterEndDate
        ? moment(filterEndDate, "YYYY-MM-DD")
        : null;

      if (startDate && !createdAtDate.isSameOrAfter(startDate)) {
        return false;
      }

      if (endDate && !createdAtDate.isSameOrBefore(endDate)) {
        return false;
      }

      return true;
    });
  };
  const filteredData = filterDate(displayedData);

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  let serialNumber = 0;
  let rowsDisplayed = 0;
  const [rowsPerPage1, setRowsPerPage1] = useState(5);

  // const [PrintData, setPrintData] = useState(null);
  // const [selectedPrint, setSelectedPrint] = useState(false);

  const handleOutletToggleSelect = (receeid, outletId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems1.includes(outletId)) {
      updatedSelectedRecceItems = selectedRecceItems1.filter(
        (id) => id !== outletId
      );
    } else {
      updatedSelectedRecceItems = [...selectedRecceItems1, outletId];
    }

    setSelectedRecceItems1(updatedSelectedRecceItems);
    setRecceId(receeid);
    setmoreoption(updatedSelectedRecceItems.length > 0);
  };

  const handleOutletSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allOutletIds = filteredData.flatMap((item) =>
        item?.outletName.map((outlet) => outlet._id)
      );
      setSelectedRecceItems1(allOutletIds);
    } else {
      setSelectedRecceItems1([]);
    }

    setmoreoption(!selectAll);
  };

  const handleUpdate = async (RecceId, selectedRecceItems1) => {
    try {
      for (const outletid of selectedRecceItems1) {
        const formdata = new FormData();

        if (selectrecceStatus !== undefined && selectrecceStatus !== null) {
          formdata.append("installationSTatus", selectrecceStatus);
        }

        const config = {
          url: `/recce/recce/updatereccedata/${RecceId}/${outletid}`,
          method: "put",
          baseURL: "http://api.srimagicprintz.com/api",
          headers: { "Content-Type": "multipart/form-data" },
          data: formdata,
        };

        const res = await axios(config);

        if (res.status === 200) {
          alert("Successfully updated outlet");
          console.log(res.data);
          window.location.reload();
        } else {
          console.error("Received non-200 status code:", res.status);
        }
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert(
        "Not able to update: " +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  const selectedv = vendordata?.find((vendor) => vendor._id === selctedVendor);

  const AssignVendor = async (selectedv) => {
    try {
      const updatedRecceData = [];

      for (const outlateid of selectedRecceItems1) {
        for (const recceid of filteredData) {
          const filteredData1 = recceid.outletName.filter((outlet) => {
            if (outlateid === outlet._id) {
              outlet.InstalationGroup = selectedv._id;
            }
            return outlet;
          });

          updatedRecceData.push(...filteredData1);

          const config = {
            url: `/api/recce/recce/updateinstaltion/${outlateid}/${selectedv._id}`,
            baseURL: "http://api.srimagicprintz.com",
            method: "put",
            headers: { "Content-Type": "application/json" },
            data: { reccedata: updatedRecceData },
          };

          const res = await axios(config);

          if (res.status !== 200) {
            throw new Error(`Failed to update outlet: ${res.status}`);
          }
        }
      }

      alert(`Installation assigned to: ${selectedv.VendorFirstName}`);
      window.location.reload();
    } catch (error) {
      alert("Error while updating outlet:", error.message);
    }
  };

  const updateVendor = async () => {
    if (window.confirm(`Are you sure you want to update clients data?`)) {
      try {
        await AssignVendor(selectedv);
      } catch (error) {
        console.error("Error while updating recce items:", error);
      }
    }
  };

  const handleAssignVendor = async () => {
    setShow(true);
  };
  const [FilteredDatabystat, setFilteredDatabystat] = useState([]);

  useEffect(() => {
    const filteredDataByStatus =
      selctedStatus === "--Select All--"
        ? recceData
        : recceData?.map((recceItem) => {
            const outletNameArray = recceItem?.outletName;
            if (Array.isArray(outletNameArray)) {
              const filteredOutlets = outletNameArray.filter((outlet) =>
                outlet?.installationSTatus?.includes(selctedStatus)
              );
              return { ...recceItem, outletName: filteredOutlets };
            }
            return recceItem;
          });
    setFilteredDatabystat(filteredDataByStatus);
  }, [selctedStatus, recceData]);
  const [OutletId, setOutletId] = useState(null);

  const [ShowOutletId, setShowOutletId] = useState(false);
  const handleEdit = (outlet) => {
    setOutletId(outlet);
    setShowOutletId(true);
  };

  const mergedArray = OutletDoneData.filter(
    (Ele) => Ele?.outletShopId === OutletId
  )
    .map((board) => {
      // Transform OutletDoneData to match the structure of recceData
      // Add a property, e.g., isOutletDone: true, to distinguish between OutletDoneData and recceData

      return {
        ...board,
        isOutletDone: true,
      };
    })
    .concat(
      recceData
        ?.map((recceItem, index) =>
          recceItem?.outletName
            ?.filter((item) => item._id === OutletId)
            .map((outlet) => ({
              ...outlet,
              isOutletDone: false,
            }))
        )
        .flat()
    );

  return (
    <>
      <Header />
      <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Recce </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Col className="mb-3">
              <Form.Label>Select Vendor</Form.Label>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  value={selctedVendor}
                  onChange={(e) => setselctedVendor(e.target.value)}
                >
                  <option>Choose..</option>
                  {vendordata?.map((vendorele) => (
                    <option key={vendorele._id} value={vendorele._id}>
                      {vendorele?.VendorFirstName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={updateVendor}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {!ShowOutletId ? (
        <div className="row  m-auto containerPadding">
          <div className="row mt-2 mb-4">
            <div className="col-md-6">
              <div className="row ">
                <Col className="col-md-2">
                  <Form.Label>
                    {displayedData?.length} of: {recceData?.length}
                  </Form.Label>
                  <Form.Group className="row float-right">
                    <Form.Control
                      as="select"
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
                      <option value={80}>80</option>
                      <option value={100}>100</option>
                      <option value={140}>140</option>
                      <option value={200}>200</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col className="col-md-10">
                  <label className="col-md-5   mb-2">Start Date:</label>
                  <label className="col-md-6  mb-2">End Date:</label>
                  <div className="row">
                    <div className="col-md-5 ">
                      <Form.Control
                        type="date"
                        value={filterStartDate}
                        onChange={handleFilterStartDateChange}
                      />
                    </div>
                    <div className="col-md-5 ">
                      <Form.Control
                        type="date"
                        value={filterEndDate}
                        onChange={handleFilterEndDateChange}
                      />
                    </div>
                    <div className="col-md-2 ">
                      <Button onClick={handleClearDateFilters}>Clear</Button>
                    </div>
                  </div>
                </Col>
              </div>
            </div>

            <Col className="col-md-5">
              <label className="mb-2">Status</label>
              <div className="row">
                <div className="col-md-5">
                  <Form.Select
                    as="select"
                    value={selectrecceStatus}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue !== "Choose...") {
                        setSelectRecceStatus(selectedValue);
                      }
                    }}
                  >
                    <option>Choose...</option>
                    <option value="Completed">Completed</option>
                    <option value="Proccesing">Proccesing</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </div>
                <div className="col-md-2 ">
                  <Button
                    onClick={() => handleUpdate(RecceId, selectedRecceItems1)}
                  >
                    Save
                  </Button>
                </div>
                <Col className="col-md-1">
                  <Button onClick={handleExportPDF}> Download</Button>
                </Col>
              </div>
            </Col>
            <div className="col-md-1 ">
              {moreoption ? (
                <>
                  <p
                    className="mroe "
                    onClick={() => setselectAction(!selectAction)}
                    style={{
                      border: "1px solid white",
                      width: "38px",
                      height: "38px",
                      textAlign: "center",
                      borderRadius: "100px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <span className="text-center">
                      <MoreVertIcon />
                    </span>
                  </p>
                  {selectAction ? (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "100",
                        top: "24%",
                        right: "2%",
                      }}
                    >
                      <Card className="m-auto p-2" style={{ width: "10rem" }}>
                        <p className="cureor" onClick={handleAssignVendor}>
                          Assign to recce
                        </p>
                      </Card>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>

            <div className="col-md-3 mt-3">
              <label className="mb-2">Select Status</label>
              <Form.Select
                className="row "
                value={selctedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>--Select All--</option>
                <option value="Completed" className="cureor">
                  Completed
                </option>
                <option value="Proccesing" className="cureor">
                  Proccesing
                </option>
                <option value="Pending" className="cureor">
                  Pending
                </option>
                <option value="Cancelled" className="cureor">
                  Cancelled
                </option>
              </Form.Select>
            </div>
          </div>

          <div className="row">
            <table className="t-p">
              <thead className="t-c">
                <tr>
                  <th className="th_s ">
                    <input
                      type="checkbox"
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                      checked={selectAll}
                      onChange={handleOutletSelectAllChange}
                    />
                  </th>
                  <th className="th_s p-1">SI.No</th>
                  <th className="th_s p-1">Job.No</th>
                  <th className="th_s p-1">Brand </th>
                  <th className="th_s p-1">Shop Name</th>
                  <th className="th_s p-1">Client Name</th>
                  <th className="th_s p-1">State</th>
                  <th className="th_s p-1">Contact Number</th>
                  <th className="th_s p-1">Zone</th>
                  <th className="th_s p-1">Pincode</th>
                  <th className="th_s p-1">City</th>
                  <th className="th_s p-1">FL Board</th>
                  <th className="th_s p-1">GSB</th>
                  <th className="th_s p-1">Inshop</th>
                  {/* <th className="th_s p-1">Category</th>
                  <th className="th_s p-1">Hight</th>*/}
                  <th className="th_s p-1">Vendor</th>
                  <th className="th_s p-1">Date</th>
                  <th className="th_s p-1">Status</th>
                  <th className="th_s p-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {FilteredDatabystat?.map((recceItem, index) =>
                  recceItem?.outletName
                    .filter((ele, outletArray) =>
                      ele?.OutlateFabricationDeliveryType?.includes(
                        "Go to installation"
                      )
                    )
                    .map((outlet) => {
                      if (rowsDisplayed < rowsPerPage1) {
                        const pincodePattern = /\b\d{6}\b/;

                        let JobNob = 0;

                        FilteredDatabystat?.forEach((recceItem, recceIndex) => {
                          recceItem?.outletName?.forEach((item) => {
                            if (outlet._id === item._id) {
                              JobNob = recceIndex + 1;
                            }
                          });
                        });
                        const address = outlet?.OutletAddress;
                        const extractedPincode = address?.match(pincodePattern);
                        const selectedVendorId = outlet?.InstalationGroup;

                        const vendor = vendordata?.find(
                          (ele) => ele?._id === selectedVendorId
                        );
                        if (extractedPincode) {
                          outlet.OutletPincode = extractedPincode[0];
                        }

                        serialNumber++;
                        rowsDisplayed++;

                        return (
                          <tr className="tr_C" key={serialNumber}>
                            <td className="td_S p-1">
                              <input
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginRight: "5px",
                                }}
                                type="checkbox"
                                checked={selectedRecceItems1.includes(
                                  outlet._id
                                )}
                                onChange={() =>
                                  handleOutletToggleSelect(
                                    recceItem._id,
                                    outlet._id
                                  )
                                }
                              />
                            </td>
                            <td className="td_S p-1">{serialNumber}</td>
                            <td className="td_S p-1">Job{JobNob}</td>
                            <td className="td_S p-1">{recceItem.BrandName}</td>
                            <td className="td_S p-1">{outlet?.ShopName}</td>
                            <td className="td_S p-1">{outlet?.ClientName}</td>
                            <td className="td_S p-1">{outlet?.State}</td>
                            <td className="td_S p-1">
                              {outlet?.OutletContactNumber}
                            </td>

                            <td className="td_S p-1">{outlet?.OutletZone}</td>
                            <td className="td_S p-1">
                              {extractedPincode ? extractedPincode[0] : ""}
                            </td>
                            <td className="td_S p-1">{outlet?.OutletCity}</td>
                            <td className="td_S p-1">{outlet?.FLBoard}</td>
                            <td className="td_S p-1">{outlet?.GSB}</td>
                            <td className="td_S p-1">{outlet?.Inshop}</td>

                            <td className="td_S p-1">
                              {vendor?.VendorFirstName}
                            </td>
                            <td className="td_S p-2 text-nowrap text-center">
                              {recceItem.createdAt
                                ? new Date(recceItem.createdAt)
                                    .toISOString()
                                    .slice(0, 10)
                                : ""}
                            </td>
                            <td className="td_S ">
                              {outlet?.installationSTatus}
                            </td>
                            <td
                              className="td_S "
                              variant="info "
                              onClick={() => {
                                handleEdit(outlet._id);
                              }}
                              style={{ cursor: "pointer", color: "skyblue" }}
                            >
                              view
                            </td>
                          </tr>
                        );
                      }
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row  m-auto containerPadding">
          <div className="row">
            <div className="col-md-1">
              <ArrowCircleLeftIcon
                onClick={() => setShowOutletId(false)}
                style={{ color: "#068FFF" }}
              />{" "}
            </div>
          </div>{" "}
          <div className="row">
            {mergedArray.map((item, index) => (
              <div className="col-md-6" key={index}>
                {!item.isOutletDone ? (
                  <>
                    <div className="row">
                      {OutletDoneData.filter(
                        (Ele) => Ele?.outletShopId === OutletId
                      ).map((board) => {
                        return (
                          <>
                            <div className="col-md-12 ">
                              <p className="poppinfnt ">
                                <span className="me-2 subct">
                                  {" "}
                                  Outlet ShopName :
                                </span>{" "}
                                {board.outletShopName.charAt(0).toUpperCase() +
                                  board.outletShopName.slice(1)}
                              </p>
                              <p className="poppinfnt ">
                                <span className="me-2 subct">Board Type :</span>
                                {board.boardType.charAt(0).toUpperCase() +
                                  board.boardType.slice(1)}
                              </p>

                              <p className="poppinfnt ">
                                <span className="me-2 subct">Category :</span>{" "}
                                {board.category}
                              </p>

                              <p className="poppinfnt ">
                                <span className="me-2 subct">GST Number :</span>{" "}
                                {board.gstNumber}
                              </p>

                              <div className="row">
                                <img
                                  width={200}
                                  height={200}
                                  className="col-md-8 banrrad"
                                  alt=""
                                  src={`http://api.srimagicprintz.com/Outlet/${board.ouletInstallationImage}`}
                                />
                                <div className="col-md-1 borderlef">
                                  <span className="border-line"></span>
                                  <span className="poppinfnt ms-5 me-3">
                                    {board.height}
                                  </span>
                                  <span className="poppinfnt ms-5 me-3">
                                    {board.unitsOfMeasurment}
                                  </span>
                                  <span className="border-line"></span>
                                </div>
                              </div>

                              <div className=" mt-2 m-auto mb-2 borderlef1 ">
                                <span className="border-line2"></span>
                                <span className=" poppinfnt ms-2 me-1 ">
                                  {board.width}
                                </span>
                                <span className="poppinfnt  me-2">
                                  {board.unitsOfMeasurment}
                                </span>
                                <span className=" border-line2"></span>
                              </div>
                              <p className="poppinfnt ">
                                <span className="me-2 subct">Remark :</span>{" "}
                                {board.installationCommentOrNote}
                              </p>
                            </div>
                            <hr></hr>{" "}
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {recceData?.map((recceItem, index) =>
                      recceItem?.outletName
                        ?.filter((item) => item._id === OutletId)
                        .map((outlet) => (
                          <>
                            <p>
                              <span className="cl"> Shop Name:</span>
                              <span>{outlet.ShopName}</span>
                            </p>
                            <p>
                              <span className="cl"> Partner Code:</span>
                              <span> {outlet.PartnerCode}</span>
                            </p>
                            <p>
                              <span className="cl"> Category :</span>
                              <span> {outlet.Category}</span>
                            </p>
                            <p>
                              <span className="cl">Outlet Pincode :</span>
                              <span> {outlet.OutletPincode}</span>
                            </p>
                            <p>
                              <span className="cl"> Inshop :</span>
                              <span>
                                {outlet.Inshop === "Y" || outlet.Inshop === "y"
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> GSB :</span>
                              <span>
                                {outlet.GSB === "Y" || outlet.GSB === "y"
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> FLBoard :</span>
                              <span>
                                {outlet.FLBoard === "Y" ? "Yes" : "No"}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> Height:</span>
                              <span>
                                {outlet.Height}
                                {outlet.unit}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> Width :</span>
                              <span>
                                {outlet.width}
                                {outlet.unit}
                              </span>
                            </p>
                            <p>
                              <span className="cl"> GST Number :</span>
                              <span>{outlet.GSTNumber}</span>
                            </p>
                          </>
                        ))
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
