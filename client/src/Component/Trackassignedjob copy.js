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
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

export default function Trackassignedjob() {
  const ApiURL = process.env.REACT_APP_API_URL;
  const [recceData, setRecceData] = useState([]);
  const [searchshopName, setSearchshopName] = useState("");
  const [searcharea, setSearcharea] = useState("");
  const [searchcity, setSearchcity] = useState("");
  const [searchcontactNumber, setSearchcontactNumber] = useState("");
  const [searchpincode, setSearchpincode] = useState("");
  const [searchzone, setSearchzone] = useState("");
  const [searchdate, setSearchDate] = useState("");
  const [searchstatus, setSearchStatus] = useState("");
  const [searchVendorName, setSearchVendorName] = useState("");
  const [searchSINO, setSearchSINO] = useState("");
  const [selectAction, setselectAction] = useState(false);
  const [displayedData, setDisplayedData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchHight, setsearchHight] = useState("");
  const [searchwidth, setsearchwidth] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");
  const [CategoryData, setCategoryData] = useState(null);
  const [vendordata, setVendorData] = useState(null);
  const [getreccedata, setgetreccedata] = useState("");
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [designImages, setDesignImages] = useState("");
  const [SearchclientName, setSearchclientName] = useState("");
  const [searchdatastatus, setSearchdatastatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [moreoption, setmoreoption] = useState(false);
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getAllRecce();
    getAllVendorInfo();
    // filterByStatus();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://admin.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const filteredRecceData = res.data.RecceData.filter(
  //   (item) => item._id === item.completedInstallation
  // );
  // console.log("filteredRecceData", filteredRecceData);
  useEffect(() => {
    const filteredClients = () => {
      let results = [...recceData];

      if (searchSINO) {
        results = results.filter((item, index) => {
          return (index + 1).toString().includes(searchSINO);
        });
      }

      if (SearchCategory) {
        results = results.filter((item) => {
          const categoryid = item?.category?.[0];
          const selectedcategory = CategoryData?.find(
            (ele) => ele._id === categoryid
          );

          return (
            selectedcategory &&
            selectedcategory.categoryName
              .toLowerCase()
              .includes(SearchCategory.toLowerCase())
          );
        });
      }

      if (SearchclientName) {
        results = results.filter((item) =>
          item.ClientName?.toLowerCase().includes(
            SearchclientName.toLowerCase()
          )
        );
      }
      if (searchshopName) {
        results = results.filter((item) =>
          item.ShopName?.toLowerCase().includes(searchshopName.toLowerCase())
        );
      }
      if (searchcontactNumber) {
        results = results.filter((item) => {
          const contactNumber1 =
            item.ContactNumber && item.ContactNumber.toString();
          return contactNumber1?.includes(searchcontactNumber);
        });
      }
      if (searcharea) {
        const searchTerm = searcharea.toLowerCase();
        results = results.filter((item) => {
          const area = item.Area?.toLowerCase();
          return (
            area.indexOf(searchTerm) !== -1 || area.indexOf(searchTerm) !== -1
          );
        });
      }
      if (searchcity) {
        const searchTerm = searchcity.toLowerCase();
        results = results.filter((item) => {
          const city = item.City?.toLowerCase();

          return (
            city.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
          );
        });
      }

      if (searchzone) {
        results = results.filter((item) => {
          const Zone1 = item.Zone && item.Zone.toString();
          return Zone1?.includes(searchzone);
        });
      }
      if (searchpincode) {
        results = results.filter((item) => {
          const Pincode1 = item.Pincode && item.Pincode.toString();
          return Pincode1?.includes(searchpincode);
        });
      }

      if (searchdate) {
        const searchDate = new Date(searchdate);

        if (!isNaN(searchDate)) {
          results = results.filter((item) => {
            if (!item.createdAt) {
              return false;
            }

            const createdAtDate = new Date(item.createdAt);

            // Compare date components (year, month, day)
            return (
              createdAtDate.getFullYear() === searchDate.getFullYear() &&
              createdAtDate.getMonth() === searchDate.getMonth() &&
              createdAtDate.getDate() === searchDate.getDate()
            );
          });
        }
      }

      if (searchdatastatus) {
        results = results.filter((item) => {
          const status1 = item.datastatus && item.datastatus.toString();
          return status1?.includes(searchdatastatus);
        });
      }

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, results.length);
      const dataToDisplay = results.slice(startIndex, endIndex);
      setDisplayedData(dataToDisplay);
    };
    filteredClients();
  }, [
    recceData,
    SearchclientName,
    searchshopName,
    searchVendorName,
    searchcontactNumber,
    searcharea,
    searchcity,
    searchpincode,
    searchzone,
    searchdate,
    searchdatastatus,
    searchSINO,
    // currentPage,
    rowsPerPage,
  ]);

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const tableColumn = [
      "SI.No",
      "Shop Name",
      "Vendor Name",
      "Contact",
      "Area",
      "City",
      "Pincode",
      "Zone",
      "Date",
      "Status",
      "Hight",
      "Width",
      "Category",
    ];
    const tableData = displayedData.map((item, index) => {
      const selectedVendorId = item?.vendor?.[0];
      const selectedVendor = vendordata?.find(
        (vendor) => vendor?._id === selectedVendorId
      );
      const selectedCategoryId = item?.category?.[0];
      const category = CategoryData?.find(
        (ele) => ele?._id === selectedCategoryId
      );

      return [
        index + 1,
        item.ShopName,
        selectedVendor ? selectedVendor.VendorFirstName : "",
        item.ContactNumber,
        item.Area,
        item.City,
        item.Pincode,
        item.Zone,
        item.createdAt
          ? new Date(item.createdAt).toISOString().slice(0, 10)
          : "",
        item.Status,
        item.height,
        item.width,
        category ? category?.categoryName : "",
      ];
    });

    pdf.autoTable({
      head: [tableColumn],
      body: tableData,
      startY: 20,
      styles: {
        fontSize: 6,
      },
      columnStyles: {
        0: { cellWidth: 10 },
      },

      bodyStyles: { borderColor: "black", borderRight: "1px solid black" },
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
  const handleToggleSelect = (itemId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems.includes(itemId)) {
      updatedSelectedRecceItems = selectedRecceItems.filter(
        (id) => id !== itemId
      );
    } else {
      updatedSelectedRecceItems = [...selectedRecceItems, itemId];
    }

    setSelectedRecceItems(updatedSelectedRecceItems);
    setmoreoption(updatedSelectedRecceItems.length > 0);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedRecceItems(displayedData.map((item) => item._id));
    } else {
      setSelectedRecceItems([]);
    }

    setmoreoption(!selectAll);
  };
  async function deleteRecce(recceId) {
    try {
      const response = await axios.delete(
        `${ApiURL}/recce/recce/deletereccedata/${recceId}`
      );
      if (response.status === 200) {
        alert("Recce deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Error while deleting recce:", error);
    }
  }

  const handleDeleteSelectedRecceItems = async () => {
    if (selectedRecceItems.length === 0) {
      return;
    }

    if (window.confirm(`Are you sure you want to delete  clients data ?`)) {
      try {
        for (const recceId of selectedRecceItems) {
          await deleteRecce(recceId);
        }

        setSelectedRecceItems([]);
      } catch (error) {
        console.error("Error while deleting recce items:", error);
      }
    }
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const createdAt = getreccedata.createdAt;
  let monthName = "";

  if (createdAt) {
    const date = new Date(createdAt);
    const monthNumber = date.getMonth();
    monthName = monthNames[monthNumber];
  }

  console.log(monthName);

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const handleEdit = (item) => {
    setgetreccedata(item);
    setSelectedDesignIndex(true);
  };
  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://admin.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
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

  const selectedVendorId = getreccedata?.vendor?.[0];
  const vendor = selectedVendorId
    ? vendordata?.find((ele) => ele._id === selectedVendorId)
    : null;

  // const [reccePending, setReccePending] = useState();
  // const [recceProcessing, setRecceProcessing] = useState();
  // const filterByStatus = () => {
  //   if (getreccedata.datastatus === "Pending" && vendor) {
  //     setReccePending(getreccedata);
  //     window.location.href = "/reccepending";
  //   } else if (getreccedata.datastatus === "Processing" && vendor) {
  //     setRecceProcessing(getreccedata);
  //   }
  // };

  return (
    <>
      <Header />

      {!SelecteddesignIndex ? (
        <div className="row  m-auto containerPadding">
          <div className="row ">
            <Col className="col-md-1 mb-3">
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
                <Form.Label>
                  {displayedData?.length} of: {recceData?.length}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col className="col-md-5">
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
            <Col className="col-md-1">
              <Button onClick={handleExportPDF}> Download</Button>
            </Col>
          </div>
          <div className="row ">
          <table>
                      <thead className="t-c">
                        <tr className="tr2">
                          <th className="p-1"></th>
                          <th className="p-1"></th>

                          <th className="p-1"></th>
                          <th className="p-1"></th>
                          <th className="p-1">
                            {" "}
                            <input
                              className="col-md-1"
                              placeholder="Shop name"
                              value={searchshopName}
                              onChange={(e) =>
                                setSearchshopName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="owner name"
                              value={SearchclientName}
                              onChange={(e) =>
                                setSearchclientName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th></th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="Contact"
                              value={searchcontactNumber}
                              onChange={(e) =>
                                setSearchcontactNumber(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" zone"
                              value={searchzone}
                              onChange={(e) => setSearchzone(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th>
                            <input
                              className="col-md-1"
                              placeholder=" pincode"
                              value={searchpincode}
                              onChange={(e) => setSearchpincode(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" city"
                              value={searchcity}
                              onChange={(e) => setSearchcity(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1"></th>

                          <th className="p-1"></th>
                          <th className="p-1"> </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" category"
                              value={SearchCategory}
                              onChange={(e) =>
                                setSearchCategory(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1"></th>
                          <th className="p-1"></th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="Vendor name"
                              value={searchVendorName}
                              onChange={(e) =>
                                setSearchVendorName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" date"
                              value={searchdate}
                              onChange={(e) => setSearchDate(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            {" "}
                            <input
                              className="col-md-1"
                              placeholder=" status"
                              value={searchdatastatus}
                              onChange={(e) =>
                                setSearchdatastatus(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                        </tr>

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
                              onChange={handleSelectAllChange}
                            />
                          </th>
                          <th className="th_s ">SI.No</th>
                          <th className="th_s ">Job.No</th>
                          <th className="th_s ">Brand </th>
                          <th className="th_s ">Shop Name</th>
                          <th className="th_s ">Client Name</th>
                          <th className="th_s ">State</th>
                          <th className="th_s ">Contact Number</th>
                          <th className="th_s ">Zone</th>
                          <th className="th_s ">Pincode</th>
                          <th className="th_s ">City</th>
                          <th className="th_s ">FL Board</th>
                          <th className="th_s ">GSB</th>
                          <th className="th_s ">Inshop</th>
                          <th className="th_s ">Category</th>
                          <th className="th_s ">Height</th>
                          <th className="th_s ">Width</th>
                          <th className="th_s ">Vendor Name</th>
                          <th className="th_s ">Date</th>
                          <th className="th_s ">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {recceData?.map((recceItem, index) =>
                          recceItem?.outletName?.map((outlet, outletArray) => {
                            console.log(recceItem, "recceItem");
                            if (rowsDisplayed < rowsPerPage1) {
                              const selectedVendorId = outlet?.vendor;
                              const vendor = selectedVendorId
                                ? vendordata?.find(
                                    (ele) => ele?._id === selectedVendorId
                                  )
                                : null;

                              rowsDisplayed++;
                              const pincodePattern = /\b\d{6}\b/;

                              const address = outlet?.OutletAddress;
                              const extractedPincode =
                                address?.match(pincodePattern);

                              if (extractedPincode) {
                                outlet.OutletPincode = extractedPincode[0];
                              }

                              return (
                                <tr className="tr_C" key={outlet._id}>
                                  <td className="td_S p-1">
                                    <input
                                      style={{
                                        width: "15px",
                                        height: "15px",
                                        marginRight: "5px",
                                      }}
                                      type="checkbox"
                                      checked={selectedRecceItems.includes(
                                        outlet._id
                                      )}
                                      onChange={() =>
                                        handleToggleSelect(outlet._id)
                                      }
                                    />
                                  </td>
                                  <td className="td_S p-1">
                                    {outletArray + 1}
                                  </td>
                                  <td className="td_S p-1">Job{index + 1}</td>
                                  <td className="td_S p-1">
                                    {recceItem.BrandName}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.ShopName}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.ClientName}
                                  </td>
                                  <td className="td_S p-1">{outlet.State}</td>
                                  <td className="td_S p-1">
                                    {outlet.OutletContactNumber}
                                  </td>

                                  <td className="td_S p-1">
                                    {outlet.OutletZone}
                                  </td>
                                  <td className="td_S p-1">
                                    {extractedPincode
                                      ? extractedPincode[0]
                                      : ""}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.OutletCity}
                                  </td>
                                  <td className="td_S p-1">{outlet.FLBoard}</td>
                                  <td className="td_S p-1">{outlet.GSB}</td>
                                  <td className="td_S p-1">{outlet.Inshop}</td>
                                  <td className="td_S p-1">
                                    {outlet.Category}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.height}
                                    {outlet.unit}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.width}
                                    {outlet.unit}
                                  </td>

                                  <td className="td_S p-1">
                                    {vendor?.VendorFirstName}
                                  </td>
                                  <td className="td_S ">
                                    {recceItem.createdAt
                                      ? new Date(recceItem.createdAt)
                                          .toISOString()
                                          .slice(0, 10)
                                      : ""}
                                  </td>
                                  <td className="td_S p-1">
                                    {outlet.RecceStatus}
                                  </td>
                                </tr>
                              );
                            }
                            return null;
                          })
                        )}
                      </tbody>
                    </table>
          </div>
        </div>
      ) : (
        <div className="row  m-auto containerPadding">
          <div className="row">
            {" "}
            <div className="row">
              <div className="col-md-1">
                <ArrowCircleLeftIcon
                  onClick={(e) => setSelectedDesignIndex(null)}
                  style={{ color: "#068FFF" }}
                />{" "}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <p>
              <span className="me-3 clr">Shop Name:</span>
              <span className="me-3 ">{getreccedata.ShopName}</span>
            </p>

            <p>
              <span className="me-3 clr">Phone:</span>
              <span className="me-3 ">{getreccedata.ContactNumber}</span>
            </p>
            <p className="col-md-8">
              <span className="me-3 clr">Address :</span>
              <span>{getreccedata.Area} </span>
              <span>{getreccedata.City} </span>
              <span> {getreccedata.Zone}</span>
              <span> {getreccedata.Pincode}</span>
            </p>
          </div>
          {getreccedata.datastatus === "Pending"
            ? {
                /* <div className="row">
          <div className="row d-flex">
            <div className="col-md-1 ">
              <CheckCircleIcon
                className="clr2"
                style={{ fontSize: "35px" }}
              />{" "}
              <p
                className="track-line"
                style={{ position: "relative", bottom: "2.5%" }}
              ></p>
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p className="clr">Recee</p>
              <p>
                <span className="me-2"> Recee job completed on </span>
                <span className="me-2">
                  {getreccedata.createdAt
                    ? new Date(getreccedata.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : ""}
                </span>
                <span>{monthName}</span>
              </p>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-1 ">
              <CheckCircleIcon
                className="clr2"
                style={{
                  fontSize: "35px",
                  position: "relative",
                  bottom: "5%",
                }}
              />{" "}
              <p
                className="track-line"
                style={{ position: "relative", bottom: "8%" }}
              ></p>
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p className="clr">Design</p>
              <p>
                Design approved on
                <span className="me-2">
                  {getreccedata.createdAt
                    ? new Date(getreccedata.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : ""}
                </span>
                <span>{monthName}</span>
              </p>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-1 ">
              <CheckCircleIcon
                className="clr2"
                style={{
                  fontSize: "35px",
                  position: "relative",
                  bottom: "10%",
                }}
              />{" "}
              <p
                className="track-line"
                style={{ position: "relative", bottom: "13%" }}
              ></p>
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p className="clr">Printing</p>
              <p>
                Printing completed on{" "}
                <span className="me-2">
                  {getreccedata.createdAt
                    ? new Date(getreccedata.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : ""}
                </span>
                <span>{monthName}</span>
              </p>
            </div>
          </div>
          <div
            className="row d-flex"
            style={{ position: "relative", top: "0%" }}
          >
            <div className="col-md-1 ">
              <DonutLargeIcon
                className="clr2"
                style={{
                  fontSize: "35px",
                  position: "relative",
                  bottom: "10%",
                }}
              >
                <img
                  className="clr2"
                  width={"10px"}
                  height={"12px"}
                  alt=""
                  src="../Assests/blue-loading-fotor-20230711105926.png"
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "10%",
                  }}
                />
              </DonutLargeIcon>
              <p
                className="track-line track-line1"
                style={{ position: "relative", bottom: "11%" }}
              ></p>
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p className="clr">Fabrication</p>
              <p>
                Fabrication in progress information of jon sent to factory
                fabrication process has started on{" "}
                <span className="me-2">
                  {getreccedata.createdAt
                    ? new Date(getreccedata.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : ""}
                </span>
                <span>{monthName}</span>
              </p>
            </div>
          </div>
          <div
            className="row d-flex"
            style={{ position: "relative", bottom: "2%" }}
          >
            <div className="col-md-1 ">
              <PanoramaFishEyeIcon
                style={{
                  fontSize: "35px",
                  position: "relative",
                  bottom: "10%",
                }}
              />{" "}
              <p
                className="track-line"
                style={{ position: "relative", bottom: "13%" }}
              ></p>
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p>Installation</p>
              <p>fabrication process is not yet completed</p>
            </div>
          </div>
          <div
            className="row d-flex"
            style={{ position: "relative", bottom: "4%" }}
          >
            <div className="col-md-1 ">
              <PanoramaFishEyeIcon
                style={{
                  fontSize: "35px",
                  position: "relative",
                  bottom: "10%",
                }}
              />{" "}
            </div>{" "}
            <div className="col-md-3">
              {" "}
              <p>process completed</p>
            </div>
          </div>
        </div> */
              }
            : null}
        </div>
      )}
    </>
  );
}
