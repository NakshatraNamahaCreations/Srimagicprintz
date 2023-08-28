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

export default function Design() {
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
  const [getreccedata, setgetreccedata] = useState({});
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [designImages, setDesignImages] = useState("");
  const [SearchclientName, setSearchclientName] = useState("");
  const [searchdatastatus, setSearchdatastatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [moreoption, setmoreoption] = useState(false);
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [designData, setDesignData] = useState([]);
  const [designStatus, setdesignStatus] = useState("");
  const [SelectedIndexd, setSelectedIndexd] = useState(false);
  const [assign, setAssign] = useState([]);
  const [show2, setshow2] = useState(false);
  const [selctedVendor, setselctedVendor] = useState("");
  useEffect(() => {
    getAllRecce();
    getAllDesign();
    getAllVendorInfo();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        const filteredRecceData = res.data.RecceData.filter(
          (item) => item._id === item.completedRecceId
        );
        setRecceData(filteredRecceData);
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

  // const handleEdit = (vendor) => {
  //   setgetreccedata(vendor);
  //   setSelectedDesignIndex(true);
  // };

  // const selectedVendorId = getreccedata?.vendor?.[0];
  // const selectedVendor = vendordata?.find(
  //   (vendor) => vendor._id === selectedVendorId
  // );

  // const selectedcategoryID = getreccedata?.category?.[0];
  // const selectcategry = CategoryData?.find(
  //   (ele) => ele?._id === selectedcategoryID
  // );
  const [getVendorName, setgetVendorName] = useState(null);
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
  const handleImageUpload = (event) => {
    const files = event.target.files;
    setDesignImages(files);
  };

  const addDesign = async () => {
    const formdata = new FormData();
    if ("designimage") {
      for (const image of designImages) {
        formdata.append("designimage", image);
      }
    }
    formdata.append("reeceDetails", getreccedata.completedRecceId);
    formdata.append("Designstatus", designStatus);
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
        window.location.href = "/Printing";
      }
    } catch (err) {
      alert(err, "error while adding design");
    }
  };

  const handleEdit = (vendor) => {
    setgetreccedata(vendor);
    setSelectedIndex(true);
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

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const getAllDesign = async () => {
    try {
      const response = await axios.get(`${ApiURL}/design/design/getalldesigns`);
      if (response.status === 200) {
        setDesignData(response.data.alldesigns);
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };

  const handleVendorEdit = (recceid) => {
    const recceTobeedit = filteredData.find((recce) => recce._id === recceid);

    if (recceTobeedit) {
      setgetreccedata(recceTobeedit);
      setSelectedDesignIndex(true);
      console.log(recceTobeedit, "editid");
    } else {
      alert("Recce not found for editing");
    }
  };
  // const updateRecceData = async () => {
  //   try {
  //     const recceId = getreccedata._id;
  //     const config = {
  //       url: `/recce/recce/updatedesign/${recceId}`,
  //       method: "put",
  //       baseURL: "http://api.srimagicprintz.com/api",
  //       headers: { "Content-Type": "application/json" },
  //       data: {
  //         Designstatus: designStatus,
  //       },
  //     };

  //     const res = await axios(config);

  //     if (res.status === 200) {
  //       alert("Successfully linked vendor to recce");
  //       // set(null);
  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     alert("Not able to add", err);
  //   }
  // };
  // const selectedVendor = vendordata?.find(
  //   (vendor) => vendor._id === selctedVendor
  // );

  const AssignVendor = async () => {
    try {
      let alreadyAssigned = false;
      let clientName = "";

      for (const recceId of selectedRecceItems) {
        const currentRecceData = recceData.find((item) => item._id === recceId);

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
        formData.append("vendor", selctedVendor._id);

        const config = {
          url: `/recce/recce/updatevendorname/${recceId}`,
          method: "post",
          baseURL: "http://api.srimagicprintz.com/api",
          data: formData,
        };

        const res = await axios(config);

        if (res.status === 200) {
          alert(`Recce assigned to: ${selctedVendor.VendorFirstName}`);
        } else {
          alert(`Failed to assign recce to: ${selctedVendor.VendorFirstName}`);
        }
      }

      alert("Successfully linked vendors to recce items");
      setSelectedIndexd(null);
      window.location.reload();
    } catch (err) {
      alert("Not able to assign", err);
    }
  };

  const handleAssignVendor = async () => {
    for (const itemId of selectedRecceItems) {
      setAssign(itemId);
      setshow2(true);
    }
  };

  const [editDesignstatus, setEditDesignstatus] = useState("");
  const [SelectedIndex, setSelectedIndex] = useState(false);
  const updateRecceData = async () => {
    // if (reccedesign) {
    //   formData.append("reccedesign", reccedesign);
    // }

    try {
      const recceId = getreccedata._id;
      const config = {
        url: `/recce/recce/updatereccedata/${recceId}`,
        method: "put",
        baseURL: "http://api.srimagicprintz.com/api",
        headers: { "Content-Type": "application/json" },
        data: {
          Designstatus: editDesignstatus || getreccedata.Designstatus,
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
            <Col className="col-md-1">
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
                        zIndex: "10px",
                        top: "18%",
                      }}
                    >
                      <Card className="m-auto p-3" style={{ width: "12rem" }}>
                        <li className="cureor" onClick={handleAssignVendor}>
                          Assign to recce
                        </li>

                        {/* <li onClick={{}}>Delete</li> */}

                        <li
                          className="cureor"
                          // onClick={ha}
                        >
                          Mark as Completed
                        </li>
                      </Card>
                    </div>
                  ) : null}
                </>
              ) : null}
            </Col>
          </div>
          <div className="row ">
            <table className="t-p">
              <thead className="t-c">
                <tr className="tr2">
                  <th></th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="SI.No"
                      value={searchSINO}
                      onChange={(e) => setSearchSINO(e.target.value)}
                      style={{ width: "79px" }}
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
                  {/* <th>
                    <input
                      className="col-md-1"
                      placeholder="Vendor name"
                      value={searchVendorName}
                      onChange={(e) => setSearchVendorName(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th> */}
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Contact"
                      value={searchcontactNumber}
                      onChange={(e) => setSearchcontactNumber(e.target.value)}
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
                      placeholder="City"
                      value={searchcity}
                      onChange={(e) => setSearchcity(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>

                  <th className="p-1">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Pincode"
                      value={searchpincode}
                      onChange={(e) => setSearchpincode(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="p-1">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Zone"
                      value={searchzone}
                      onChange={(e) => setSearchzone(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="p-1">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Date"
                      value={searchdate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="p-1">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Status"
                      value={searchstatus}
                      onChange={(e) => setSearchStatus(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    {/* <input
                      className="col-md-1"
                      placeholder="Seach hight"
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
                      style={{ width: "79px" }}
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
                  <th className="th_s p-1">SI.No.</th>
                  <th className="th_s ">Client Name</th>{" "}
                  <th className="th_s p-1">Shop Name</th>
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
              <tbody className="table">
                {filteredData?.map((item, index) => {
                  return (
                    <tr className="design" key={item._id}>
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
                      <td className="td_S p-1">{index + 1}</td>
                      <td className="td_S p-1">{item.ClientName}</td>
                      <td className="td_S p-1">{item.ShopName}</td>
                      {/* <td className="td_S p-1">
                        {selectedVendor ? selectedVendor?.VendorFirstName : ""}
                      </td> */}
                      <td className="td_S p-1">{item.ContactNumber}</td>
                      <td className="td_S p-1">{item.Area}</td>
                      <td className="td_S p-1">{item.City}</td>
                      <td className="td_S p-1">{item.Pincode}</td>
                      <td className="td_S p-1">{item.Zone}</td>
                      <td className="td_S p-1">
                        {item.createdAt
                          ? new Date(item.createdAt).toISOString().slice(0, 10)
                          : ""}
                      </td>
                      <td className="td_S">{item.Designstatus}</td>
                      <td className="td_S">
                        {" "}
                        {item.reccehight}
                        {item.recceUnit}
                      </td>
                      <td className="td_S">
                        {item.reccewidth}
                        {item.recceUnit}
                      </td>

                      <td className="td_S p-1">
                        {item.category}
                        {/* {category ? category?.categoryName : ""} */}
                      </td>
                      <td className="td_S p-1">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Modal show={show2} onHide={() => setshow2(false)}>
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
              <Button variant="secondary" onClick={() => setshow2(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={AssignVendor}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        // <div className="row  m-auto containerPadding">
        //   <div className="row">
        //     <div className="col-md-1">
        //       <ArrowCircleLeftIcon
        //         onClick={(e) => setSelectedDesignIndex(null)}
        //         style={{ color: "#068FFF" }}
        //       />{" "}
        //     </div>
        //   </div>
        //   <div className="col-md-8">
        //     <p>
        //       <span className="me-3 clr">Store Name:</span>
        //       <span className="me-3 ">{getreccedata.ShopName}</span>
        //     </p>
        //     <p>
        //       <span className="me-3 clr">Hight:</span>
        //       <span className="me-3 ">
        //         {getreccedata.reccehight}
        //         {getreccedata.recceUnit}
        //       </span>
        //     </p>
        //     <p>
        //       <span className="me-3 clr">Width:</span>
        //       <span className="me-3 ">
        //         {getreccedata.reccewidth}
        //         {getreccedata.recceUnit}
        //       </span>
        //     </p>
        //     <p>
        //       <span className="me-3 clr">Contact Number:</span>
        //       <span className="me-3 ">{getreccedata.ContactNumber}</span>
        //     </p>

        //     <p>
        //       <span className="me-3 clr">Category :</span>
        //       <span className="me-3 ">
        //         {/* {selectcategry
        //           ? selectcategry?.categoryName
        //           : "Category not available"} */}
        //         {getreccedata.category}
        //       </span>
        //     </p>
        //     <p>
        //       <span className="me-3 clr">Zone :</span>
        //       <span>{getreccedata.Zone}</span>
        //     </p>
        //     <p>
        //       <span className="me-3 clr">Pincode :</span>
        //       <span>{getreccedata.Pincode}</span>
        //     </p>

        //     <p className="col-md-8">
        //       <span className="me-3 clr">Address :</span>
        //       <span>
        //         {getreccedata.Area} {getreccedata.City}
        //       </span>
        //     </p>
        //     <div className="mt-2">
        //       <img
        //         width={"100px"}
        //         height={"50px"}
        //         className="me-4"
        //         style={{ borderRadius: "10px", border: "1px solid grey" }}
        //         alt=""
        //         src={`http://localhost:8000/reccedesign/${getreccedata.reccedesign}`}
        //       />
        //     </div>
        //     <p>
        //       <span className="me-3 clr">Status:</span>

        //       <span className="me-3 ">
        //         {designData ? designData.Designstatus : "Loading..."}
        //       </span>
        //     </p>
        //     <div className="col-md-3 mt-2">
        //       <Form.Control
        //         type="file"
        //         name="designimages"
        //         onChange={handleImageUpload}
        //         multiple
        //         className="col-md-3"
        //       />
        //     </div>
        //     <div className="col-md-3 mt-2">
        //       <Form.Label>Status</Form.Label>
        //       <Form.Control
        //         value={editDesignstatus}
        //         onChange={(e) => setEditDesignstatus(e.target.value)}
        //       />{" "}
        //     </div>

        //     <div className="row mt-3">
        //       <Button className="col-md-2" onClick={updateRecceData}>
        //         update
        //       </Button>
        //     </div>
        //   </div>
        // </div>
        <div className="row  m-auto containerPadding">
          {SelectedIndex ? (
            <>
              <Form>
                {/* <Form.Group className="row">
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
              </Form.Group> */}
                <Form.Group className="row">
                  <Col className="col-md-4 mb-3">
                    <Form.Label>Zone</Form.Label>
                    {/* <Form.Control
                      type="text"
                      defaultValue={editRecceData?.Zone}
                      onChange={(e) => {
                        setEditZone(e.target.value);
                      }}
                    /> */}
                  </Col>
                  <Col className="col-md-4 mb-3">
                    <Form.Label>recceUnit</Form.Label>
                    {/* <Form.Control
                      type="text"
                      defaultValue={editRecceData?.recceUnit}
                      onChange={(e) => {
                        setEditrecceUnit(e.target.value);
                      }}
                    /> */}
                  </Col>
                  <Col className="col-md-4 mb-3">
                    <Form.Label>status</Form.Label>
                    <Form.Control
                      type="text"
                      // defaultValue={?.datastatus}
                      onChange={(e) => {
                        setEditDesignstatus(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* <Form.Group className="row">
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
              </Form.Group> */}
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
                    {/* {selectedVendor ? selectedVendor?.VendorFirstName : ""} */}
                  </span>
                </p>
                <p className="col-md-8">
                  <span className="me-3 clr">Category :</span>{" "}
                  {/* {selectedCategory ? selectedCategory?.categoryName : ""} */}
                  {getreccedata.category}
                </p>

                <p>
                  <span className="me-3 clr">Shop Name:</span>
                  <span className="me-3 ">{getreccedata.ShopName || null}</span>
                </p>

                <p className="col-md-8">
                  <span className="me-3 clr">Area :</span> {getreccedata.Area}
                </p>
                <p>
                  <span className="me-3 clr">City :</span> {getreccedata.City}
                </p>
                <p>
                  <span className="me-3 clr">Contact Number :</span>
                  {getreccedata.ContactNumber}
                </p>
                <p>
                  <span className="me-3 clr">Pincode :</span>
                  {getreccedata.Pincode}
                </p>
                <p>
                  <span className="me-3 clr">Zone :</span>
                  {getreccedata.Zone}
                </p>
                <p>
                  <span className="me-3 clr">createdAt :</span>
                  {getreccedata.createdAt
                    ? new Date(getreccedata.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    : ""}
                </p>

                <p>
                  <Button
                    className="m-2"
                    onClick={() => handleVendorEdit(getreccedata._id)}
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
    </>
  );
}
