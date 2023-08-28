import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
// import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx"; // Import the xlsx library
import axios from "axios";

export default function ReceeManagement() {
  const ApiURL = process.env.REACT_APP_API_URL;
  const [trackJob, setTrackJob] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  // const [sendLink, setSendLink] = useState("");
  // const [togglelink, setToggleLink] = useState(false);
  // const [link, setLink] = useState("http://localhost:3000/RecceFile");
  const [shopName, setShopName] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [zone, setzone] = useState("");
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
  const [searchstatus, setSearchStatus] = useState("");
  const [searchVendorName, setSearchVendorName] = useState("");
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
  const [reccestatus, setRecceStatus] = useState("");
  const [reccehight, setreccehight] = useState("");
  const [reccewidth, setreccewidth] = useState("");
  const [recceunit, setrecceunit] = useState("");
  const [reccedesign, setreccedesign] = useState(null);

  const [editRecceData, setEditRecceData] = useState(null);
  const [editrecce, setEditRecce] = useState(false);
  const [Editarea, setEditArea] = useState("");
  const [Editshopname, setEditShopName] = useState("");
  const [EditCity, setEditCity] = useState("");
  const [EditContactNumber, setEditContactNumber] = useState("");
  const [EditPincode, setEditPincode] = useState("");
  const [EditZone, setEditZone] = useState("");
  const [Editvendor, setEditvendor] = useState("");
  const [Editcategory, setEditcategory] = useState("");
  const [Editstatus, setEditstatus] = useState("");
  const [Editreccehight, setEditreccehight] = useState("");
  const [Editreccewidth, setEditreccewidth] = useState("");
  const [EditrecceUnit, setEditrecceUnit] = useState("");
  const [Editreccedesign, setEditreccedesign] = useState("");

  useEffect(() => {
    getAllRecce();
    getAllVendorInfo();
    getAllCategory();
  }, []);

  const AddRecce = async () => {
    try {
      const config = {
        url: "/recce/recce/addrecce",
        baseURL: "http://localhost:8000/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          ShopName: shopName,
          Area: area,
          City: city,
          ContactNumber: contactNumber,
          Pincode: pincode,
          Zone: zone,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Added Successfully");
        AddRecce();
        // window.location.href = "/ReceeManagement";
        setShopName("");
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

      if (searchVendorName) {
        results = results.filter((item) => {
          const selectedVendorId = item?.vendor[0];
          const selectedVendor = vendordata?.find(
            (vendor) => vendor._id === selectedVendorId
          );

          return (
            selectedVendor &&
            selectedVendor.VendorFirstName.toLowerCase().includes(
              searchVendorName.toLowerCase()
            )
          );
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

      if (SearchCategory) {
        results = results.filter((item) => {
          const categoryid = item?.category[0];
          const selectedcategory = CategoryData?.find(
            (ele) => ele._id === categoryid
          );

          return (
            selectedcategory &&
            selectedcategory?.categoryName
              .toLowerCase()
              .includes(SearchCategory.toLowerCase())
          );
        });
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
        const searchDateParts = searchdate.split("-");
        const searchYear = parseInt(searchDateParts[0]);
        const searchMonth = parseInt(searchDateParts[1]) - 1;
        const searchDay = parseInt(searchDateParts[2]);
        if (!isNaN(searchYear) && !isNaN(searchMonth) && !isNaN(searchDay)) {
          results = results.filter((item) => {
            if (!item.createdAt) {
              return false;
            }
            const createdAtDate = new Date(item.createdAt);
            const searchDate = new Date(searchYear, searchMonth, searchDay);
            return (
              createdAtDate.getFullYear() === searchDate.getFullYear() &&
              createdAtDate.getMonth() === searchDate.getMonth() &&
              createdAtDate.getDate() === searchDate.getDate()
            );
          });
        }
      }

      if (searchstatus) {
        results = results.filter((item) => {
          const status1 = item.status && item.status.toString();
          return status1?.includes(searchstatus);
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
    searchshopName,
    searchVendorName,
    searchcontactNumber,
    searcharea,
    searchcity,
    searchpincode,
    searchzone,
    searchdate,
    searchstatus,
    searchSINO,
    currentPage,
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

  const handlesendRecceToDesign = async (completed) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/recce/recce/getcompletedid/${completed._id}`
      );

      if (response.status === 200) {
        let data = response.data.completedRecce;
        if (
          data.status === "Completed" &&
          data.reccehight !== "" &&
          data.reccewidth !== ""
        ) {
          alert("Succesfully recce fetched to design");
          window.location.href = "/Design";
        } else {
          alert("Please complete the Recce");
        }
      }
    } catch (err) {
      alert("recce not fetched to design");
    }
  };

  const handleImport = async () => {
    if (importXLSheet.length > 0) {
      setTrackJob(false);
      try {
        const res = await axios.post(
          "http://localhost:8000/api/recce/recce/addreccesviaexcelesheet",
          importXLSheet
        );
        if (res.status === 200) {
          setRecceData((prevData) => [...prevData, ...importXLSheet]);
          setrecceexcel(null);
          setImportXLSheet([]);
        }
      } catch (error) {
        console.error(`Error while uploading file ${error}`);
      }
    }
  };
  const updateRecceData = async () => {
    const formData = new FormData();

    formData.append("ShopName", Editshopname);
    formData.append("Area", Editarea);
    formData.append("City", EditCity);

    try {
      const recceId = getVendorName._id;

      const config = {
        url: `/recce/recce/updatereccedata/${recceId}`,
        baseURL: "http://localhost:8000/api",
        headers: { "content-type": "multipart/form-data" },
        method: "put",
        data: formData,
      };
      const response = await axios(config);
      if (response.status === 200) {
        alert("Successfully updated recce data");
        const updatedData = displayedData.map((item) => {
          // if (item._id === recceId) {

          //   return {
          //     ...item,
          //     ShopName: Editshopname,
          //     Area: Editarea,
          //     City: EditCity,
          //   };
          // }
          console.log(item._id, "id");
          console.log(recceId, "i");
          return item;
        });
        console.log("Updated Recce Data:", updatedData);
        setDisplayedData(updatedData);
        setEditRecce(false);
      }
    } catch (err) {
      alert(err, "Error in frontend");
    }
  };

  const handleVendorEdit = (recceid) => {
    const recceTobeedit = displayedData.find((recce) => recce._id === recceid);
    if (recceTobeedit) {
      setEditRecceData(recceTobeedit);
      setEditRecce(true);
    } else {
      alert("recce not found for editing");
    }
  };

  const handleClose = () => {
    setAssignVendor(false);
  };
  const handleOpen = () => {
    setAssignVendor(true);
  };
  const AssignVendor = async () => {
    const formData = new FormData();
    formData.append("vendor", selctedVendor);
    formData.append("category", selectedcategory);
    formData.append("status", reccestatus);
    formData.append("reccehight", reccehight);
    formData.append("reccewidth", reccewidth);
    formData.append("recceUnit", recceunit);

    if (reccedesign) {
      formData.append("reccedesign", reccedesign);
    }

    try {
      const recceId = getVendorName._id;
      const config = {
        url: `/recce/recce/updatevendorname/${recceId}`,
        method: "post",
        baseURL: "http://localhost:8000/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
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

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["ShopName", "ContactNumber", "Area", "City", "Pincode", "Zone"],
    ];

    wsData.push([
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

  const selectedVendorId = getVendorName?.vendor?.[0];
  const selectedVendor = vendordata?.find(
    (vendor) => vendor._id === selectedVendorId
  );

  const selectedCategoryID = getVendorName?.category?.[0];
  const selectedCategory = CategoryData?.find(
    (ele) => ele._id === selectedCategoryID
  );

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

  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        {!trackJob ? (
          <>
            {!selectedIndex ? (
              <>
                <div className="row  ">
                  <Col className="col-md-2">
                    <Form.Group>
                      {" "}
                      <Button onClick={() => setTrackJob(true)}>
                        Add Recce
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col className="col-md-2">
                    <Form.Group>
                      <Button
                        className="btn btn-danger"
                        onClick={handleDownload}
                        style={{ backgroundColor: "#a9042e", border: 0 }}
                      >
                        Download
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col className="col-md-1">
                    <Form.Group>
                      <CSVLink data={reccedata} filename={"recce.csv"}>
                        {" "}
                        <Button
                          className="btn btn-danger"
                          style={{ backgroundColor: "#a9042e", border: 0 }}
                        >
                          Export
                        </Button>
                      </CSVLink>
                    </Form.Group>
                  </Col>
                  <Col className="col-md-2">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        accept=".xlsx,.xls,.csv"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => setrecceexcel(e.target.files[0])}
                      />
                      <Form.Label
                        className="btn btn-outline-danger "
                        style={{ borderColor: "#a9042e" }}
                        htmlFor="icon-button-file"
                      >
                        {" "}
                        Import Excel
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col className="col-md-1">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      {recceexcel && (
                        <Button
                          className="btn btn-danger"
                          style={{ backgroundColor: "#a9042e", border: 0 }}
                          onClick={handleImport}
                        >
                          Upload
                        </Button>
                      )}
                    </Form.Group>
                  </Col>
                </div>
                <div className="row ">
                  <Col className="col-md-1 mb-3">
                    <Form.Group className="row float-right">
                      <Form.Label>
                        {displayedData?.length} of: {reccedata?.length}
                      </Form.Label>
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
                </div>
                <div className="row ">
                  <table className="t-p">
                    <thead className="t-c">
                      <tr className="tr2">
                        <th>
                          <input
                            className="col-md-1"
                            placeholder="SI.No"
                            value={searchSINO}
                            onChange={(e) => setSearchSINO(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder="Shop name"
                            value={searchshopName}
                            onChange={(e) => setSearchshopName(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th>
                          <input
                            className="col-md-1"
                            placeholder="Vendor name"
                            value={searchVendorName}
                            onChange={(e) =>
                              setSearchVendorName(e.target.value)
                            }
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th>
                          <input
                            className="col-md-1"
                            placeholder="Contact"
                            value={searchcontactNumber}
                            onChange={(e) =>
                              setSearchcontactNumber(e.target.value)
                            }
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder="Area"
                            value={searcharea}
                            onChange={(e) => setSearcharea(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>

                        <th>
                          <input
                            className="col-md-1"
                            placeholder=" city"
                            value={searchcity}
                            onChange={(e) => setSearchcity(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>

                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder=" pincode"
                            value={searchpincode}
                            onChange={(e) => setSearchpincode(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder=" zone"
                            value={searchzone}
                            onChange={(e) => setSearchzone(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder=" date"
                            value={searchdate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th className="p-1">
                          {" "}
                          <input
                            className="col-md-1"
                            placeholder=" status"
                            value={searchstatus}
                            onChange={(e) => setSearchStatus(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th>
                          <input
                            className="col-md-1"
                            placeholder=" hight"
                            value={searchHight}
                            onChange={(e) => setsearchHight(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th>
                          <input
                            className="col-md-1"
                            placeholder=" width"
                            value={searchwidth}
                            onChange={(e) => setsearchwidth(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th>
                          <input
                            className="col-md-1"
                            placeholder=" category"
                            value={SearchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            style={{ width: "79px" }}
                          />
                        </th>
                        <th></th>
                      </tr>
                      <tr>
                        <th className="th_s p-1">SI.No.</th>
                        <th className="th_s p-1">Shop Name</th>
                        <th className="th_s p-1">Vendor Name</th>
                        <th className="th_s p-1">Contact Number</th>
                        <th className="th_s p-1">Area</th>
                        <th className="th_s p-1">City</th>
                        <th className="th_s p-1">Pincode</th>
                        <th className="th_s p-1">Zone</th>
                        <th className="th_s p-1"> Date</th>
                        <th className="th_s p-1"> Status</th>
                        <th className="th_s p-1"> Height</th>
                        <th className="th_s p-1"> Width</th>
                        <th className="th_s p-1"> Category</th>
                        <th className="th_s p-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData?.map((item, index) => {
                        const selectedVendorId = item?.vendor?.[0]; // Use optional chaining
                        const vendor = selectedVendorId
                          ? vendordata?.find(
                              (ele) => ele._id === selectedVendorId
                            )
                          : null;

                        const selectedCategoryId = item?.category?.[0]; // Use optional chaining
                        const category = selectedCategoryId
                          ? CategoryData?.find(
                              (ele) => ele._id === selectedCategoryId
                            )
                          : null;

                        return (
                          <tr key={item._id}>
                            <td className="td_S p-1">{index + 1}</td>
                            <td className="td_S p-1">{item.ShopName}</td>
                            <td className="td_S p-1">
                              {vendor
                                ? vendor?.VendorFirstName
                                : vendor?.VendorFirstName}
                            </td>
                            <td className="td_S p-1">{item.ContactNumber}</td>
                            <td className="td_S p-1">{item.Area}</td>
                            <td className="td_S p-1">{item.City}</td>
                            <td className="td_S p-1">{item.Pincode}</td>
                            <td className="td_S p-1">{item.Zone}</td>
                            <td className="td_S p-1">
                              {item.createdAt
                                ? new Date(item.createdAt)
                                    .toISOString()
                                    .slice(0, 10)
                                : ""}
                            </td>

                            <td className="td_S">{item.status}</td>
                            <td className="td_S">
                              {" "}
                              {item.reccehight}
                              {item.recceUnit}
                            </td>
                            <td className="td_S">
                              {" "}
                              {item.reccewidth}
                              {item.recceUnit}
                            </td>
                            <td className="td_S">
                              {category ? category?.categoryName : ""}
                            </td>
                            <td className="td_S ">
                              <span
                                className="col-md-5 p-1"
                                variant="info "
                                onClick={() => {
                                  handleEdit(item);
                                }}
                                style={{ cursor: "pointer", color: "skyblue" }}
                              >
                                View
                              </span>
                              <span
                                className="col-md-5 p-1"
                                variant="success "
                                onClick={() => {
                                  handlesendRecceToDesign(item);
                                }}
                                style={{ cursor: "pointer", color: "green" }}
                              >
                                completed
                              </span>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              ""
            )}
            {selectedIndex ? (
              <div className="row  m-auto containerPadding">
                {editrecce ? (
                  <>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Area </Form.Label>
                      <Form.Control
                        defaultValue={editRecceData?.Area}
                        onChange={(e) => setEditArea(e.target.value)}
                      />
                    </Col>
                    <Button onClick={updateRecceData}>Update</Button>
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
                          {selectedVendor
                            ? selectedVendor?.VendorFirstName
                            : ""}
                        </span>
                      </p>
                      <p className="col-md-8">
                        <span className="me-3 clr">Category :</span>{" "}
                        {selectedCategory ? selectedCategory?.categoryName : ""}
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
                        <Button className="m-2" onClick={handleOpen}>
                          Assign Vendor
                        </Button>
                        <Button
                          onClick={() => handleVendorEdit(getVendorName._id)}
                        >
                          Edit
                        </Button>
                      </p>
                      <div className="col-md-12">
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
                                    onChange={(e) =>
                                      setreccehight(e.target.value)
                                    }
                                    placeholder="Please enter  account number"
                                  />
                                </Col>
                                <Col className="mb-3">
                                  <Form.Label>Recce Width</Form.Label>
                                  <Form.Control
                                    value={reccewidth}
                                    onChange={(e) =>
                                      setreccewidth(e.target.value)
                                    }
                                    placeholder="Please enter branch"
                                  />
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col className="mb-3">
                                  <Form.Label>Recce Status</Form.Label>

                                  <Form.Select
                                    value={reccestatus}
                                    onChange={(e) =>
                                      setRecceStatus(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setrecceunit(e.target.value)
                                    }
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
                            <Button variant="primary" onClick={AssignVendor}>
                              Save
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <Form>
            <Row>
              <Col>
                <Form.Group md="5" className="mb-3">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    type="text"
                    placeholder="Enter  shop name"
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
                  <Form.Control
                    value={zone}
                    onChange={(e) => setzone(e.target.value)}
                    type="text"
                    placeholder="Enter zone"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="row mt-5">
              <Button className="col-md-2 m-auto" onClick={AddRecce}>
                Save Recce
              </Button>
              <Button
                className="col-md-2 m-auto"
                onClick={() => setTrackJob(false)}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
}
