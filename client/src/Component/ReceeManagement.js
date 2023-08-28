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

export default function ReceeManagement() {
  const ApiURL = process.env.REACT_APP_API_URL;
  const [trackJob, setTrackJob] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  // const [sendLink, setSendLink] = useState("");
  // const [togglelink, setToggleLink] = useState(false);
  // const [link, setLink] = useState("http://localhost:3000/RecceFile");
  // const [shopName, setShopName] = useState("");

  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setzone] = useState("");
  const [clientName, setclientName] = useState("");
  const [recceexcel, setrecceexcel] = useState("");
  const [reccedata, setRecceData] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  const [selctedVendor, setselctedVendor] = useState("");
  const [searchshopName, setSearchshopName] = useState("");
  const [searcharea, setSearcharea] = useState("");
  const [searchcity, setSearchcity] = useState("");
  const [searchcontactNumber, setSearchcontactNumber] = useState("");
  const [searchpincode, setSearchpincode] = useState("");
  const [searchzone, setSearchzone] = useState("");
  const [searchdate, setSearchDate] = useState("");
  const [searchdatastatus, setSearchdatastatus] = useState("");
  const [searchVendorName, setSearchVendorName] = useState("");
  const [SearchclientName, setSearchclientName] = useState("");
  const [searchSINO, setSearchSINO] = useState("");
  const [importXLSheet, setImportXLSheet] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState();
  const [getVendorName, setgetVendorName] = useState(null);
  const [CategoryData, setCategoryData] = useState();
  const [selectedcategory, setselectedcategory] = useState("");
  const [searchHight, setsearchHight] = useState("");
  const [searchwidth, setsearchwidth] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");
  const [assignvendor, setAssignVendor] = useState(false);
  const [reccedatastatus, setReccedatastatus] = useState("");
  const [reccehight, setreccehight] = useState("");
  const [reccewidth, setreccewidth] = useState("");
  const [recceunit, setrecceunit] = useState("");
  const [reccedesign, setreccedesign] = useState("");
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [assign, setAssign] = useState([]);
  // const [editRecceData, setEditRecceData] = useState(null);
  const [editrecce, setEditRecce] = useState(false);
  const [Editarea, setEditArea] = useState("");
  const [Editclient, setEditclient] = useState("");
  const [Editshopname, setEditShopName] = useState("");
  const [EditCity, setEditCity] = useState("");
  const [EditContactNumber, setEditContactNumber] = useState("");
  const [EditPincode, setEditPincode] = useState("");
  const [EditZone, setEditZone] = useState("");
  const [Editvendor, setEditvendor] = useState("");
  const [Editcategory, setEditcategory] = useState("");
  const [Editdatastatus, setEditdatastatus] = useState("");
  const [Editreccehight, setEditreccehight] = useState("");
  const [Editreccewidth, setEditreccewidth] = useState("");
  const [EditrecceUnit, setEditrecceUnit] = useState("");
  const [Editreccedesign, setEditreccedesign] = useState("");
  const [editRecceData, setEditRecceData] = useState({});
  const [moreoption, setmoreoption] = useState(false);
  const [show, setShow] = useState(false);
  const [selectAction, setselectAction] = useState(false);
  const handleClose1 = () => setShow(false);
  const [shopName, setShopName] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [showvendorlist, setshowvendorlist] = useState(false);

  useEffect(() => {
    getAllRecce();
    getAllVendorInfo();
    getAllCategory();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/Vendor/vendorInfo/getvendorinfo"
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
  useEffect(() => {
    const filteredClients = () => {
      let results = [...reccedata];

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
            area.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
          );
        });
      }
      if (searchcity) {
        const searchTerm = searchcity.toLowerCase();
        results = results.filter((item) => {
          const city = item.City?.toLowerCase();

          return (
            area.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
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
    reccedata,
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

  useEffect(() => {
    if (recceexcel && importXLSheet.length === 0) {
      readFile();
    }
    handleImport();
  }, [recceexcel, importXLSheet]);

  function readFile() {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      try {
        const jsonData = convertToJson(data);
        setImportXLSheet(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsBinaryString(recceexcel);
  }

  function convertToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        let value = currentLine[j]
          ? currentLine[j].replace(/""/g, "").trim()
          : "";

        if (value.startsWith("{") && value.endsWith("}")) {
          try {
            const jsonValue = JSON.parse(value);
            obj[headers[j]] = jsonValue.VendorId;
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          obj[headers[j]] = value;
        }
      }
      result.push(obj);
    }
    return result;
  }
  const handleEdit = (vendor) => {
    setgetVendorName(vendor);
    setSelectedIndex(true);
  };

  const [uploading, setUploading] = useState(false);
  const [image, setimage] = useState(null);
  const [designImages, setDesignImages] = useState("");
  const handleImport = async () => {
    if (importXLSheet.length > 0) {
      setUploading(true);
      try {
        const res = await axios.post(
          "http://localhost:8000/api/recce/recce/addreccesviaexcelesheet",
          importXLSheet
        );
        if (res.status === 200) {
          toast.success("Recce uploaded successfully!");
          setRecceData((prevData) => [...prevData, ...importXLSheet]);
          setrecceexcel(null);
          setImportXLSheet([]);
          window.location.reload();
        } else {
          toast.error("Failed to upload recce data. Please check the data.");

          const errorMessage =
            res.data && res.data.message
              ? res.data.message
              : "Error occurred while importing recce data.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Error occurred while uploading the file.");
      } finally {
        setUploading(false);
      }
    }
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    setDesignImages(files);
  };
  const updateRecceData = async () => {
    const formdata = new FormData();
    if ("reccedesign") {
      for (const image of designImages) {
        formdata.append("designimage", image);
      }
    }

    formdata.append("Area", Editarea || editRecceData.Area);
    formdata.append("ClientName", Editclient || editRecceData.ClientName);
    formdata.append(" City", EditCity || editRecceData.City);
    formdata.append(
      " ContactNumber",
      EditContactNumber || editRecceData.ContactNumber
    );
    formdata.append("Pincode", EditPincode || editRecceData.Pincode);
    formdata.append(" Zone", EditZone || editRecceData.Zone);
    formdata.append("recceUnit", EditrecceUnit || editRecceData.recceUnit);
    formdata.append("category", Editcategory || editRecceData.category);
    formdata.append(" datastatus", Editdatastatus || editRecceData.datastatus);

    formdata.append(" reccehight", Editreccehight || editRecceData.reccehight);

    formdata.append("reccewidth", Editreccewidth || editRecceData.reccewidth);

    formdata.append("ShopName", Editshopname || editRecceData.ShopName);
    try {
      const recceId = editRecceData._id;
      const config = {
        url: `/recce/recce/updatereccedata/${recceId}`,
        method: "put",
        baseURL: "http://localhost:8000/api",
        headers: { "Content-Type": "application/json" },

        data: formdata,
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Successfully linked vendor to recce");
        setSelectedIndex(null);
        window.location.reload();
      }
    } catch (err) {
      alert("Not able to add", err);
    }
  };

  const handleVendorEdit = (recceid) => {
    const recceTobeedit = filteredData.find((recce) => recce._id === recceid);

    if (recceTobeedit) {
      setEditRecceData(recceTobeedit);
      setEditRecce(true);
      console.log(recceTobeedit, "editid");
    } else {
      alert("Recce not found for editing");
    }
  };

  const selectedVendor = vendordata?.find(
    (vendor) => vendor._id === selctedVendor
  );

  const AssignVendor = async () => {
    try {
      let alreadyAssigned = false;
      let clientName = "";

      for (const recceId of selectedRecceItems) {
        const currentRecceData = reccedata.find((item) => item._id === recceId);

        if (currentRecceData.vendor) {
          alreadyAssigned = true;
          clientName = currentRecceData.ClientName;
          break;
        }
      }

      if (alreadyAssigned) {
        alert(
          `A vendor has already been assigned to  for client ${clientName}.`
        );
        return;
      }

      for (const recceId of selectedRecceItems) {
        const formData = new FormData();
        formData.append("vendor", selectedVendor._id);

        const config = {
          url: `/recce/recce/updatevendorname/${recceId}`,
          method: "post",
          baseURL: "http://localhost:8000/api",
          data: formData,
        };

        const res = await axios(config);

        if (res.status === 200) {
          alert(`Recce assigned to: ${selectedVendor.VendorFirstName}`);
        } else {
          alert(`Failed to assign recce to: ${selectedVendor.VendorFirstName}`);
        }
      }

      alert("Successfully linked vendors to recce items");
      setSelectedIndex(null);
      window.location.reload();
    } catch (err) {
      alert("Not able to assign", err);
    }
  };

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        "ClientName",
        "ShopName",
        "ContactNumber",
        "Area",
        "City",
        "Pincode",
        "Zone",
      ],
    ];

    wsData.push([
      clientName,
      shopName,
      contactNumber,
      area,
      city,
      pincode,
      zone,
      selctedVendor,
    ]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const headerCellStyle = {
      fill: { fgColor: { rgb: "FFFF00" } },
      font: { bold: true },
    };

    ["A1", "B1", "C1", "D1", "E1", "F1"].forEach((cell) => {
      ws[cell].s = headerCellStyle;
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "recce.xlsx");
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/Product/category/getcategory"
      );
      if (res.ok) {
        const data = await res.json();

        const categoriesArray = Object.values(data.category);
        setCategoryData(categoriesArray);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleAssignVendor = async () => {
    for (const itemId of selectedRecceItems) {
      setAssign(itemId);
      setShow(true);
    }
  };
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

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
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

  const handlesendRecceToDesign = async () => {
    for (const recceId of selectedRecceItems) {
      const recceData = filteredData.find((item) => item._id === recceId);

      if (
        recceData.datastatus === "Completed" &&
        recceData.reccehight > 0 &&
        recceData.reccewidth > 0
      ) {
        try {
          const response = await axios.post(
            `http://localhost:8000/api/recce/recce/getcompletedid/${recceData._id}`
          );

          if (response.status === 200) {
            alert(`Successfully sent recce to design`);
            window.location.href = "/Design";
          } else {
            alert(`Failed to send recce to design`);
          }
        } catch (err) {
          alert(`Please Complete Recce or fill all data`);
        }
      } else {
        alert(`Recce  not completed yet`);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="row m-auto containerPadding">
        <ToastContainer position="top-right" />

        {!selectedIndex ? (
          <div className="col-md-12">
            <div className="row ">
              <div className="col-md-6">
                <div className="row">
                  <Button className="col-md-3 m-1" href="/Recceapi">
                    Add Recce
                  </Button>

                  <Button
                    className="col-md-3 btn btn-danger m-1"
                    onClick={handleDownload}
                    style={{ backgroundColor: "#a9042e", border: 0 }}
                  >
                    Download
                  </Button>

                  <CSVLink
                    className="col-md-1 m-1 p-0"
                    data={reccedata}
                    filename={"recce.csv"}
                  >
                    <Button
                      className=" btn btn-danger"
                      style={{ backgroundColor: "#a9042e", border: 0 }}
                    >
                      Export
                    </Button>
                  </CSVLink>
                  <div className="col-md-4 ">
                    {moreoption ? (
                      <>
                        <p
                          className="mroe m-1"
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
                              zIndex: "10px",
                              top: "18%",
                            }}
                          >
                            <Card
                              className="m-auto p-3"
                              style={{ width: "12rem" }}
                            >
                              <li
                                className="cureor"
                                onClick={handleAssignVendor}
                              >
                                Assign to recce
                              </li>

                              <li onClick={handleDeleteSelectedRecceItems}>
                                Delete
                              </li>

                              <li
                                className="cureor"
                                onClick={handlesendRecceToDesign}
                              >
                                Mark as Completed
                              </li>
                            </Card>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row ">
                  <div className="col-md-5">
                    <Form.Label
                      className="btn btn-outline-danger "
                      style={{ borderColor: "#a9042e" }}
                      htmlFor="icon-button-file"
                    >
                      <input
                        className="col-md-1 p-0"
                        accept=".xlsx,.xls,.csv"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => setrecceexcel(e.target.files[0])}
                      />
                      Import Excel
                    </Form.Label>
                  </div>
                  <div className="col-md-1">
                    {recceexcel && (
                      <Button
                        className="btn btn-danger"
                        style={{ backgroundColor: "#a9042e", border: 0 }}
                        onClick={handleImport}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    )}
                  </div>
                  {/* <div className="col-md-4">
                    <Button onClick={(e) => setshowvendorlist(!showvendorlist)}>
                      {" "}
                      Assigned To
                    </Button>
                    {showvendorlist ? (
                      <Card style={{ position: "absolute", width: "200px" }}>
                        {filteredData?.map((ele, index) => {
                          return (
                            <ul key={index}>
                              <li>{vendor ? vendor?.VendorFirstName : null}</li>
                            </ul>
                          );
                        })}
                      </Card>
                    ) : null}
                  </div> */}
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="row ">
                <div className="row ">
                  <label className="col-md-2">
                    {displayedData?.length} of: {reccedata?.length}
                  </label>
                  <div className="col-md-4  m-auto">
                    <div className="row float-end ">
                      <label className="col-md-6  m-auto">Start Date:</label>

                      <label className="col-md-6 m-auto">Start Date:</label>
                    </div>{" "}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6 ">
                    <div className="row ">
                      <div className="col-md-2 ">
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
                          <option value={300}>300</option>
                          <option value={400}>400</option>
                          <option value={600}>600</option>
                          <option value={700}>700</option>
                          <option value={1000}>1000</option>
                          <option value={1500}>1500</option>
                          <option value={10000}>10000</option>
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 float-end">
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
                  </div>
                </div>
              </div>
            </div>

            <div className=" row mt-3">
              <table>
                <thead className="t-c">
                  <tr className="tr2">
                    <th className="p-2"></th>
                    <th>
                      <input
                        className="col-md-1"
                        placeholder="SI.No"
                        value={searchSINO}
                        onChange={(e) => setSearchSINO(e.target.value)}
                        style={{ width: "25px" }}
                      />
                    </th>
                    <th className="p-2">
                      <input
                        className="col-md-1"
                        placeholder="client name"
                        value={SearchclientName}
                        onChange={(e) => setSearchclientName(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder="Shop name"
                        value={searchshopName}
                        onChange={(e) => setSearchshopName(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>

                    <th>
                      <input
                        className="col-md-1"
                        placeholder="Contact"
                        value={searchcontactNumber}
                        onChange={(e) => setSearchcontactNumber(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder="Area"
                        value={searcharea}
                        onChange={(e) => setSearcharea(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>

                    <th>
                      <input
                        className="col-md-1"
                        placeholder=" city"
                        value={searchcity}
                        onChange={(e) => setSearchcity(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>

                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder=" pincode"
                        value={searchpincode}
                        onChange={(e) => setSearchpincode(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder=" zone"
                        value={searchzone}
                        onChange={(e) => setSearchzone(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>

                    <th>
                      <input
                        className="col-md-1"
                        placeholder="Vendor name"
                        value={searchVendorName}
                        onChange={(e) => setSearchVendorName(e.target.value)}
                        style={{ width: "79px" }}
                      />
                    </th>
                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder=" date"
                        value={searchdate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th className="p-2">
                      {" "}
                      <input
                        className="col-md-1"
                        placeholder=" status"
                        value={searchdatastatus}
                        onChange={(e) => setSearchdatastatus(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th>
                      {/* <input
                          className="col-md-1"
                          placeholder=" hight"
                          value={searchHight}
                          onChange={(e) => setsearchHight(e.target.value)}
                          style={{ width: "79px" }}
                        /> */}
                    </th>
                    <th>
                      {/* <input
                          className="col-md-1"
                          placeholder=" width"
                          value={searchwidth}
                          onChange={(e) => setsearchwidth(e.target.value)}
                          style={{ width: "79px" }}
                        /> */}
                    </th>
                    <th>
                      <input
                        className="col-md-1"
                        placeholder=" category"
                        value={SearchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        style={{ width: "65px" }}
                      />
                    </th>
                    <th></th>
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
                    <th className="th_s ">SI.No.</th>
                    <th className="th_s ">Client Name</th>{" "}
                    <th className="th_s ">Shop Name</th>
                    <th className="th_s ">Contact Number</th>
                    <th className="th_s ">Area</th>
                    <th className="th_s ">City</th>
                    <th className="th_s ">Pincode</th>
                    <th className="th_s ">Zone</th>
                    <th className="th_s ">Vendor Name</th>
                    <th className="th_s "> Date</th>
                    <th className="th_s "> Status</th>
                    <th className="th_s "> Height</th>
                    <th className="th_s "> Width</th>
                    <th className="th_s "> Category</th>
                    <th className="th_s ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((item, index) => {
                    const selectedVendorId = item?.vendor?.[0];
                    const vendor = selectedVendorId
                      ? vendordata?.find((ele) => ele._id === selectedVendorId)
                      : null;

                    // const selectedCategoryId = item?.category?.[0];
                    // const category = selectedCategoryId
                    //   ? CategoryData?.find(
                    //       (ele) => ele._id === selectedCategoryId
                    //     )
                    //   : null;

                    return (
                      <tr key={item._id}>
                        <td className="td_S p-1">
                          <input
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            type="checkbox"
                            checked={selectedRecceItems.includes(item._id)}
                            onChange={() => handleToggleSelect(item._id)}
                          />
                        </td>
                        <td className="td_S ">{index + 1}</td>
                        <td className="td_S ">{item.ClientName}</td>
                        <td className="td_S ">{item.ShopName}</td>

                        <td className="td_S ">{item.ContactNumber}</td>
                        <td className="td_S ">{item.Area}</td>
                        <td className="td_S ">{item.City}</td>
                        <td className="td_S ">{item.Pincode}</td>
                        <td className="td_S ">{item.Zone}</td>
                        <td className="td_S ">
                          {vendor
                            ? vendor?.VendorFirstName
                            : vendor?.VendorFirstName}
                        </td>
                        <td className="td_S ">
                          {item.createdAt
                            ? new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10)
                            : ""}
                        </td>

                        <td className="td_S">{item.datastatus}</td>
                        <td className="td_S">
                          {" "}
                          {item.reccehight}
                          {item.recceUnit}
                        </td>
                        <td className="td_S">
                          {" "}
                          {item.reccewidth} {item.recceUnit}
                        </td>
                        <td className="td_S">
                          {item.category}
                          {/* {category ? category?.categoryName : ""} */}
                        </td>
                        <td className="td_S ">
                          <span
                            variant="info "
                            onClick={() => {
                              handleEdit(item);
                            }}
                            style={{ cursor: "pointer", color: "skyblue" }}
                          >
                            View
                          </span>
                          {/* <span
                              className="col-md-5 "
                              variant="success "
                              onClick={() => {
                                handlesendRecceToDesign(item);
                              }}
                              style={{ cursor: "pointer", color: "green" }}
                            >
                              completed
                            </span> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>{" "}
            </div>
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
                <Button variant="primary" onClick={AssignVendor}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <div className="row  m-auto containerPadding">
            {editrecce ? (
              <>
                <Form>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Area</Form.Label>

                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Area}
                        onChange={(e) => {
                          setEditArea(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ClientName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ClientName}
                        onChange={(e) => {
                          setEditclient(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ShopName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ShopName}
                        onChange={(e) => {
                          setEditShopName(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.City}
                        onChange={(e) => {
                          setEditCity(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ContactNumber</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ContactNumber}
                        onChange={(e) => {
                          setEditContactNumber(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Pincode}
                        onChange={(e) => {
                          setEditPincode(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Zone</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Zone}
                        onChange={(e) => {
                          setEditZone(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>recceUnit</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.recceUnit}
                        onChange={(e) => {
                          setEditrecceUnit(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        defaultValue={editRecceData?.datastatus}
                        onChange={(e) => setEditdatastatus(e.target.value)}
                      >
                        <option>Choose Status...</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>category</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.category}
                        onChange={(e) => {
                          setEditcategory(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>reccewidth</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.reccewidth}
                        onChange={(e) => {
                          setEditreccewidth(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>reccehight</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.reccehight}
                        onChange={(e) => {
                          setEditreccehight(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Row>
                    <div className="col-md-3 mt-2">
                      <Form.Control
                        type="file"
                        name="designimages"
                        onChange={handleImageUpload}
                        multiple
                        className="col-md-3"
                      />
                    </div>
                  </Row>
                  <Button onClick={updateRecceData}>Update</Button>
                </Form>
              </>
            ) : (
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-1">
                    <ArrowCircleLeftIcon
                      onClick={(e) => setSelectedIndex(null)}
                      style={{ color: "#068FFF" }}
                    />{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="row"></div>
                  <p>
                    <span className="me-3 clr">Vendor Name:</span>

                    <span className="me-2 ">
                      {selectedVendor ? selectedVendor?.VendorFirstName : ""}
                    </span>
                  </p>
                  <p className="col-md-8">
                    <span className="me-3 clr">Category :</span>{" "}
                    {/* {selectedCategory ? selectedCategory?.categoryName : ""} */}
                    {getVendorName.category}
                  </p>

                  <p>
                    <span className="me-3 clr">Shop Name:</span>
                    <span className="me-3 ">
                      {getVendorName.ShopName || null}
                    </span>
                  </p>

                  <p className="col-md-8">
                    <span className="me-3 clr">Area :</span>{" "}
                    {getVendorName.Area}
                  </p>
                  <p>
                    <span className="me-3 clr">City :</span>{" "}
                    {getVendorName.City}
                  </p>
                  <p>
                    <span className="me-3 clr">Contact Number :</span>
                    {getVendorName.ContactNumber}
                  </p>
                  <p>
                    <span className="me-3 clr">Pincode :</span>
                    {getVendorName.Pincode}
                  </p>
                  <p>
                    <span className="me-3 clr">Zone :</span>
                    {getVendorName.Zone}
                  </p>
                  <p>
                    <span className="me-3 clr">createdAt :</span>
                    {getVendorName.createdAt
                      ? new Date(getVendorName.createdAt)
                          .toISOString()
                          .slice(0, 10)
                      : ""}
                  </p>

                  <p>
                    <Button
                      className="m-2"
                      onClick={() => handleVendorEdit(getVendorName._id)}
                    >
                      Edit
                    </Button>
                    {/* <Button onClick={() => handleVendorEdit(getVendorName._id)}>
                      Edit
                    </Button> */}
                  </p>
                  {/* <div className="col-md-12">
                    <Modal show={assignvendor} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Recce Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form className="row">
                          <Row className="mb-3">
                            <Col className="mb-3">
                              <Form.Label>Recce Hight</Form.Label>
                              <Form.Control
                                value={reccehight}
                                onChange={(e) => setreccehight(e.target.value)}
                                placeholder="Please enter  account number"
                              />
                            </Col>
                            <Col className="mb-3">
                              <Form.Label>Recce Width</Form.Label>
                              <Form.Control
                                value={reccewidth}
                                onChange={(e) => setreccewidth(e.target.value)}
                                placeholder="Please enter branch"
                              />
                            </Col>

                            <Col className="mb-3">
                              <Form.Label> Shop Name</Form.Label>
                              <Form.Control
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                placeholder="Please enter branch"
                              />
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col className="mb-3">
                              <Form.Label>Recce Status</Form.Label>

                              <Form.Select
                                value={reccestatus}
                                onChange={(e) => setRecceStatus(e.target.value)}
                              >
                                <option>Choose...</option>
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Completed</option>
                              </Form.Select>
                            </Col>{" "}
                            <Col className="mb-3">
                              <Form.Label>Recce Unit</Form.Label>

                              <Form.Select
                                value={recceunit}
                                onChange={(e) => setrecceunit(e.target.value)}
                              >
                                <option>Choose...</option>
                                <option>cm</option>
                                <option>inch</option>
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col className="mb-3">
                              <Form.Label>Select VendorName</Form.Label>
                              <Form.Group
                                md="5"
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Select
                                  value={selctedVendor}
                                  onChange={(e) =>
                                    setselctedVendor(e.target.value)
                                  }
                                >
                                  <option>Choose..</option>
                                  {vendordata.map((vendorele) => (
                                    <option
                                      key={vendorele._id}
                                      value={vendorele._id}
                                    >
                                      {vendorele?.VendorFirstName}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col className="mb-3">
                              <Form.Group
                                md="5"
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Select Category</Form.Label>
                                <Form.Select
                                  value={selectedcategory}
                                  onChange={(e) =>
                                    setselectedcategory(e.target.value)
                                  }
                                >
                                  <option>Choose..</option>

                                  {CategoryData.map((ele) => (
                                    <option key={ele._id} value={ele._id}>
                                      {ele.categoryName}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3 text-center">
                            <Col>OR</Col>
                          </Row>
                          <Row className="mb-3 m-auto upload">
                            <Col>
                              <Form.Label>
                                <p className="m-auto">upload file</p>
                                <Form.Control
                                  onChange={(e) =>
                                    setreccedesign(e.target.files[0])
                                  }
                                  type="file"
                                  style={{ display: "none" }}
                                />
                              </Form.Label>
                            </Col>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={updateRecceData}>
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
