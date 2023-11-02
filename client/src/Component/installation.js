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
  const [selectedRecceItems1, setSelectedRecceItems1] = useState([]);
  const [ClientInfo, setClientInfo] = useState([]);
  const [selectrecceStatus, setSelectRecceStatus] = useState(null);
  const [RecceId, setRecceId] = useState(null);
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/recce/recce/getallrecce"
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

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const [designData, setDesignData] = useState([]);

  const handleEdit = (item) => {
    setgetreccedata(item, designData);
    setDesignData(designData);
    setSelectedDesignIndex(true);
  };

  const handlesendPrinting = async () => {
    for (const recceId of selectedRecceItems) {
      const recceData = filteredData.find((item) => item._id === recceId);

      if (
        recceData.installationSTatus === "Completed" &&
        recceData.installationupload !== null
      ) {
        try {
          const response = await axios.post(
            `http://localhost:8001/api/recce/recce/getinstallation/${recceData._id}`
          );

          if (response.status === 200) {
            alert(`Successfully installation sent to track`);
            window.location.href = "/Trackassignedjob";
          } else {
            alert(`Failed to send installation to trackjob`);
          }
        } catch (err) {
          alert(`Please Complete installation or fill all data`);
        }
      } else {
        alert(`Installation  not completed yet`);
      }
    }
  };
  let serialNumber = 0;
  let rowsDisplayed = 0;
  const [rowsPerPage1, setRowsPerPage1] = useState(5);

  const [PrintData, setPrintData] = useState(null);
  const [selectedPrint, setSelectedPrint] = useState(false);

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

    // setmoreoption1(!selectAll);
  };

  const handleUpdate = async (RecceId, selectedRecceItems1) => {
    try {
      for (const outletid of selectedRecceItems1) {
        const formdata = new FormData();
        console.log(outletid, "outletid");
        if (selectrecceStatus !== undefined && selectrecceStatus !== null) {
          formdata.append("installationSTatus", selectrecceStatus);
        }

        const config = {
          url: `/recce/recce/updatereccedata/${RecceId}/${outletid}`,
          method: "put",
          baseURL: "http://localhost:8001/api",
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

  return (
    <>
      <Header />

      {!selectedPrint ? (
        <div className="row  m-auto containerPadding">
          <div className="row mt-2 mb-4">
            <div className="col-md-7">
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
                <div className="col-md-2 me-2">
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
                  <th className="th_s p-1">Category</th>
                  <th className="th_s p-1">Hight</th>
                  <th className="th_s p-1">Width</th>
                  <th className="th_s p-1">Date</th>
                  <th className="th_s p-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((recceItem, index) =>
                  recceItem?.outletName.map((outlet, outletArray) => {
                    if (rowsDisplayed < rowsPerPage1) {
                      const pincodePattern = /\b\d{6}\b/;

                      let JobNob = 0;

                      filteredData?.forEach((recceItem, recceIndex) => {
                        recceItem?.outletName?.forEach((item) => {
                          if (outlet._id === item._id) {
                            JobNob = recceIndex + 1;
                          }
                        });
                      });
                      const address = outlet?.OutletAddress;
                      const extractedPincode = address?.match(pincodePattern);

                      if (extractedPincode) {
                        outlet.OutletPincode = extractedPincode[0];
                      }
                      if (
                        outlet?.OutlateFabricationDeliveryType?.includes(
                          "Go to installation"
                        )
                      ) {
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
                            <td className="td_S p-1">{outlet?.Category}</td>
                            <td className="td_S p-1">
                              {outlet?.height}
                              {outlet?.unit}
                            </td>
                            <td className="td_S p-1">
                              {outlet?.width}
                              {outlet?.unit}
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
                          </tr>
                        );
                      }
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
            <div className="col-md-1">
              <ArrowCircleLeftIcon
                onClick={(e) => setSelectedPrint(false)}
                style={{ color: "#068FFF" }}
              />{" "}
            </div>
          </div>
          <div className="col-md-8">
            <p>
              <span className="cl"> Shop Name:</span>
              <span>{PrintData.ShopName}</span>
            </p>
            <p>
              <span className="cl"> Partner Code:</span>
              <span> {PrintData.PartnerCode}</span>
            </p>
            <p>
              <span className="cl"> Category :</span>
              <span> {PrintData.Category}</span>
            </p>
            <p>
              <span className="cl">Outlet Pincode :</span>
              <span> {PrintData.OutletPincode}</span>
            </p>
            <p>
              <span className="cl"> Inshop :</span>
              <span>
                {PrintData.Inshop === "Y" || "y" ? PrintData.Inshop : "No"}
              </span>
            </p>
            <p>
              <span className="cl"> GSB :</span>
              <span>{PrintData.GSB === "Y" || "y" ? PrintData.GSB : "No"}</span>
            </p>
            <p>
              <span className="cl"> FLBoard :</span>
              <span>
                {PrintData.FLBoard === "Y" ? PrintData.FLBoard : "No"}
              </span>
            </p>
            <p>
              <span className="cl"> Hight:</span>
              <span>
                {PrintData.Height}
                {PrintData.unit}
              </span>
            </p>
            <p>
              <span className="cl"> Width :</span>
              <span>
                {PrintData.width}
                {PrintData.unit}
              </span>
            </p>
            <p>
              <span className="cl"> GST Number :</span>
              <span>{PrintData.GSTNumber}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
