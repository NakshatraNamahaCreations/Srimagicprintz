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

export default function Design() {
  const ApiURL = process.env.REACT_APP_API_URL;
  const [trackJob, setTrackJob] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);

  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setzone] = useState("");
  const [clientName, setclientName] = useState("");
  const [recceexcel, setrecceexcel] = useState("");
  const [designtoprint, setDesignToPrint] = useState([]);
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

  const [editrecce, setEditRecce] = useState(false);
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [Editarea, setEditArea] = useState("");
  const [Editclient, setEditclient] = useState("");
  const [designImages, setDesignImages] = useState("");
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
  // const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [getreccedata, setgetreccedata] = useState("");
  useEffect(() => {
    getAllRecce();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setDesignToPrint(res.data.RecceData);
      }
    } catch (err) {
      alert(err);
    }
  };

  console.log("Editarea", Editarea);

  useEffect(() => {
    const filteredClients = () => {
      let results = [...designtoprint];

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
    designtoprint,
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

  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    if (importXLSheet.length > 0) {
      setUploading(true);
      try {
        const res = await axios.post(
          "http://api.srimagicprintz.com/api/recce/recce/addreccesviaexcelesheet",
          importXLSheet
        );
        if (res.status === 200) {
          toast.success("Recce uploaded successfully!");
          setDesignToPrint((prevData) => [...prevData, ...importXLSheet]);
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

  const updateRecceData = async () => {
    if (reccedesign) {
      formData.append("reccedesign", reccedesign);
    }

    try {
      const recceId = editRecceData._id;
      const config = {
        url: `/recce/recce/updatereccedata/${recceId}`,
        method: "put",
        baseURL: "http://api.srimagicprintz.com/api",
        headers: { "Content-Type": "application/json" },
        data: {
          Area: Editarea || editRecceData.Area,
          ClientName: Editclient || editRecceData.ClientName,
          City: EditCity || editRecceData.City,
          ContactNumber: EditContactNumber || editRecceData.ContactNumber,
          Pincode: EditPincode || editRecceData.Pincode,
          Zone: EditZone || editRecceData.Zone,
          recceUnit: EditrecceUnit || editRecceData.recceUnit,
          category: Editcategory || editRecceData.category,
          datastatus: Editdatastatus || editRecceData.datastatus,
          reccehight: Editreccehight || editRecceData.reccehight,
          reccewidth: Editreccewidth || editRecceData.reccewidth,
          ShopName: Editshopname || editRecceData.ShopName,
        },
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

  const selectedCategoryID = getVendorName?.category?.[0];
  const selectedCategory = CategoryData?.find(
    (ele) => ele._id === selectedCategoryID
  );

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://api.srimagicprintz.com/api/Product/category/getcategory"
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

  const filteredData = filterDate(designtoprint);

  const handleEdit = (vendor) => {
    setgetreccedata(vendor);
    setSelectedDesignIndex(true);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setDesignImages(files);
  };

  const addDesign = async () => {
    const formdata = new FormData();

    for (const image of designImages) {
      formdata.append("designimage", image);
    }
    formdata.append("reeceDetails", getreccedata.completedRecceId);
    try {
      const config = {
        url: "/design/design/adddesign",
        baseURL: "http://api.srimagicprintz.com/api",
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Successfully added design");
        setSelectedDesignIndex(false);
        // window.location.href = "/Printing";
      }
    } catch (err) {
      alert(err, "error while adding design");
    }
  };

  return (
    <>
      <Header />

      {!SelecteddesignIndex ? (
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
                  data={designtoprint}
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
                            <li className="cureor" onClick={handleAssignVendor}>
                              Assign to recce
                            </li>

                            <li onClick={handleDeleteSelectedRecceItems}>
                              Delete
                            </li>

                            <li className="cureor" onClick={{}}>
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
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="row ">
              <div className="row ">
                <label className="col-md-2">
                  {filterEndDate?.length} of: {designtoprint?.length}
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
                  // const selectedVendorId = item?.vendor?.[0];
                  // const vendor = selectedVendorId
                  //   ? vendordata?.find(
                  //       (ele) => ele._id === selectedVendorId
                  //     )
                  //   : null;

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
                      {/* <td className="td_S ">
                       {vendor
                         ? vendor?.VendorFirstName
                         : vendor?.VendorFirstName}
                     </td> */}
                      <td className="td_S ">{item.ContactNumber}</td>
                      <td className="td_S ">{item.Area}</td>
                      <td className="td_S ">{item.City}</td>
                      <td className="td_S ">{item.Pincode}</td>
                      <td className="td_S ">{item.Zone}</td>
                      <td className="td_S ">
                        {item.createdAt
                          ? new Date(item.createdAt).toISOString().slice(0, 10)
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
        </div>
      ) : (
        <div className="row  m-auto containerPadding">
          <div className="row">
            <div className="col-md-1">
              <ArrowCircleLeftIcon
                onClick={(e) => setSelectedDesignIndex(null)}
                style={{ color: "#068FFF" }}
              />{" "}
            </div>
          </div>
          <div className="col-md-8">
            {/* <p>
              <span className="me-3 clr">Vendor Name :</span>
              <span className="me-3 ">{selectedVendor?.VendorFirstName}</span>
            </p> */}
            <p>
              <span className="me-3 clr">Store Name:</span>
              <span className="me-3 ">{getreccedata.ShopName}</span>
            </p>
            <p>
              <span className="me-3 clr">Category :</span>
              <span className="me-3 ">
                {/* {selectcategry
                  ? selectcategry?.categoryName
                  : "Category not available"} */}
                z
              </span>
            </p>
            <p>
              <span className="me-3 clr">Zone :</span>
              <span>{getreccedata.Zone}</span>
            </p>
            <p>
              <span className="me-3 clr">Pincode :</span>
              <span>{getreccedata.Pincode}</span>
            </p>

            <p className="col-md-8">
              <span className="me-3 clr">Address :</span>
              <span>
                {getreccedata.Area} {getreccedata.City}
              </span>
            </p>
            <div>
              <img
                width={"100px"}
                height={"50px"}
                className="me-4"
                style={{ borderRadius: "10px", border: "1px solid grey" }}
                alt=""
                src={`src={`http://api.srimagicprintz.com
/reccedesign/${getreccedata.reccedesign}`}
              />

              <Form.Control
                type="file"
                name="designimages"
                onChange={handleImageUpload}
                multiple
                className="col-md-3"
              />
            </div>

            <div className="row mt-3">
              <Button className="col-md-2" onClick={addDesign}>
                Add Design
              </Button>
            </div>
          </div>
          {/* <div className="col-md-4 text-end">
            <div className="col-md-12">
              <div className="row m-auto">
                <span className="col-md-12 m-auto">Share to Clients</span>
                <i
                  onClick={handleToggle}
                  className="col-md-12 "
                  style={{ fontSize: "20px", color: "#068fff" }}
                  class="fa-solid fa-share-nodes"
                ></i>{" "}
                {togglelink ? (
                  <Card className="row containerPadding">
                    <div className="row ">
                      <span className="col-md-6 m-auto">Copy the link</span>
                    </div>
                    <div className="col-md-6  text-center m-auto containerPadding">
                      {" "}
                      <img
                        className="col-md-2"
                        src="https://cdn-icons-png.flaticon.com/512/124/124034.png?w=740&t=st=1688971120~exp=1688971720~hmac=7bca837e9b0904e5010df0928343c92b899f4638fdfccf9da17226b484d216b6"
                        alt=""
                      />{" "}
                      <img
                        className="col-md-2"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-google-mail-4062821-3357707.png?f=avif&w=512"
                        alt=""
                      />
                    </div>
                    <div className="row containerPadding m-auto">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                        className="col-md-11 m-auto"
                        style={{ borderRadius: "50px" }}
                      />
                      <button
                        onClick={copyShareLink}
                        className="col-md-3"
                        style={{
                          borderRadius: "50px",
                          position: "absolute",
                          right: "11%",
                        }}
                      >
                        copy
                      </button>
                    </div>
                  </Card>
                ) : null}
              </div>
            </div>
          </div>{" "} */}
        </div>
      )}
    </>
  );
}
