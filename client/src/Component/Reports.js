import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CheckIcon from "@mui/icons-material/Check";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Reports() {
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

  const [displayedData, setDisplayedData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchCategory, setSearchCategory] = useState("");
  const [CategoryData, setCategoryData] = useState(null);
  const [vendordata, setVendorData] = useState(null);
  const [getreccedata, setgetreccedata] = useState("");
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [SearchclientName, setSearchclientName] = useState("");
  const [searchdatastatus, setSearchdatastatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [moreoption, setmoreoption] = useState(false);
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [report, setReport] = useState(false);
  const [selectedcategory, setselectedcategory] = useState("");
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [selectedBrandNames, setSelectedBrandNames] = useState("");
  // const searchReport = () => {
  //   setReport(!report);
  // };
  const [ClientInfo, setClientInfo] = useState([]);
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getAllCategory();
  }, []);
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://admin.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://admin.srimagicprintz.com/api/Product/category/getcategory"
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
    rowsPerPage,
  ]);
  const [brandName, setbrandName] = useState(false);

  const [filter, setFilter] = useState("All");

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
  let serialNumber;
  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage1(newRowsPerPage);
    serialNumber = 0;
    rowsDisplayed = 0;
  };
  let rowsDisplayed = 0;
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

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  // const handleSelectClientName = () => {
  //   setbrandName(!brandName);
  // };
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

  const filteredData1 = (selecteddate) => {
    if (filter === "All") {
      return recceData;
    }

    const now = moment();

    switch (filter) {
      case "Today":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isSame(now, "day")
        );
      case "Yesterday":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isSame(
            now.clone().subtract(1, "days"),
            "day"
          )
        );
      case "ThisWeek":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isBetween(
            now.clone().startOf("week"),
            now,
            undefined,
            "[]"
          )
        );
      case "LastWeek":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isBetween(
            now.clone().subtract(1, "weeks").startOf("week"),
            now.clone().subtract(1, "weeks").endOf("week"),
            undefined,
            "[]"
          )
        );
      case "ThisMonth":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isBetween(
            now.clone().startOf("month"),
            now,
            undefined,
            "[]"
          )
        );
      case "LastMonth":
        return recceData.filter((item) =>
          moment(item.createdAt, "YYYY-MM-DD").isBetween(
            now.clone().subtract(1, "months").startOf("month"),
            now.clone().subtract(1, "months").endOf("month"),
            undefined,
            "[]"
          )
        );
      default:
        return recceData;
    }
  };
  console.log(selectedCheckboxes, "selectedCheckboxes");
  const searchReport = (selectedDate) => {
    const selectedIds = selectedCheckboxes.map((ele) => {
      const parts = ele.split("_");
      return parts[1];
    });

    const filteredDataByDate = filteredData1(selectedDate);

    // Filter recceData based on selectedIds
    const filteredRecceData = filteredDataByDate.filter((item) =>
      selectedIds.some((id) => id === item._id)
    );

    setSelectedDesignIndex(!SelecteddesignIndex);
    setDisplayedData(filteredRecceData);
  };

  const handleSelectClientName1 = () => {
    const selectedBrandNames = selectedCheckboxes.map((value) => {
      const [brandName] = value.split("_");
      const desiredClient = ClientInfo?.client?.find(
        (client) => client._id === brandName
      );

      return desiredClient?.clientsBrand || brandName;
    });

    setSelectedBrandNames(selectedBrandNames.join(", "));
    setbrandName(!brandName);
  };
  const handleCheckboxChange1 = (event, brandName, recceItemId) => {
    const updatedCheckboxes = event.target.checked
      ? [...selectedCheckboxes, `${brandName}_${recceItemId}`]
      : selectedCheckboxes.filter(
          (checkbox) => !checkbox.includes(`${brandName}_${recceItemId}`)
        );

    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
    <>
      <Header />
      {SelecteddesignIndex ? (
        <div className="row  m-auto containerPadding">
          <div className="row mb-3">
            <div>
              <ArrowCircleLeftIcon
                onClick={() => setSelectedDesignIndex(false)}
                style={{ color: "#068FFF", fontSize: "35px" }}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-1 mb-3">
              <Form.Control
                as="select"
                value={rowsPerPage1}
                onChange={handleRowsPerPageChange}
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
                      onChange={(e) => setSearchshopName(e.target.value)}
                      style={{ width: "55px" }}
                    />
                  </th>
                  <th className="p-1">
                    <input
                      className="col-md-1"
                      placeholder="owner name"
                      value={SearchclientName}
                      onChange={(e) => setSearchclientName(e.target.value)}
                      style={{ width: "55px" }}
                    />
                  </th>

                  <th></th>
                  <th className="p-1">
                    <input
                      className="col-md-1"
                      placeholder="Contact"
                      value={searchcontactNumber}
                      onChange={(e) => setSearchcontactNumber(e.target.value)}
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
                      onChange={(e) => setSearchCategory(e.target.value)}
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
                      onChange={(e) => setSearchVendorName(e.target.value)}
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
                      onChange={(e) => setSearchdatastatus(e.target.value)}
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
                {displayedData?.map((recceItem, index) =>
                  recceItem?.outletName?.map((outlet, outletArray) => {
                    if (rowsDisplayed < rowsPerPage1) {
                      // const selectedVendorId = outlet?.vendor;
                      // const vendor = selectedVendorId
                      //   ? vendordata?.find(
                      //       (ele) => ele?._id === selectedVendorId
                      //     )
                      //   : null;
                      let JobNob = 0;
                      const desiredClient = ClientInfo?.client?.find(
                        (client) => client._id === recceItem.BrandName
                      );
                      recceData?.forEach((recceItem, recceIndex) => {
                        recceItem?.outletName?.forEach((item) => {
                          if (outlet._id === item._id) {
                            JobNob = recceIndex + 1;
                          }
                        });
                      });
                      rowsDisplayed++;
                      const pincodePattern = /\b\d{6}\b/;

                      const address = outlet?.OutletAddress;
                      const extractedPincode = address?.match(pincodePattern);

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
                              checked={selectedRecceItems.includes(outlet._id)}
                              onChange={() => handleToggleSelect(outlet._id)}
                            />
                          </td>
                          <td className="td_S p-1">{outletArray + 1}</td>
                          <td className="td_S p-1">Job{JobNob}</td>
                          <td className="td_S p-1">
                            {desiredClient?.clientsBrand}
                          </td>
                          <td className="td_S p-1">{outlet.ShopName}</td>
                          <td className="td_S p-1">{outlet.ClientName}</td>
                          <td className="td_S p-1">{outlet.State}</td>
                          <td className="td_S p-1">
                            {outlet.OutletContactNumber}
                          </td>

                          <td className="td_S p-1">{outlet.OutletZone}</td>
                          <td className="td_S p-1">
                            {extractedPincode ? extractedPincode[0] : ""}
                          </td>
                          <td className="td_S p-1">{outlet.OutletCity}</td>
                          <td className="td_S p-1">{outlet.FLBoard}</td>
                          <td className="td_S p-1">{outlet.GSB}</td>
                          <td className="td_S p-1">{outlet.Inshop}</td>
                          <td className="td_S p-1">{outlet.Category}</td>
                          <td className="td_S p-1">
                            {outlet.height}
                            {outlet.unit}
                          </td>
                          <td className="td_S p-1">
                            {outlet.width}
                            {outlet.unit}
                          </td>

                          {/* <td className="td_S p-1">
                            {vendor?.VendorFirstName}
                          </td> */}
                          <td className="td_S ">
                            {recceItem.createdAt
                              ? new Date(recceItem.createdAt)
                                  .toISOString()
                                  .slice(0, 10)
                              : ""}
                          </td>
                          <td className="td_S p-1">{outlet.RecceStatus}</td>
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
        <div className="row m-auto containerPadding">
          <Form className="col-md-10 m-auto">
            <Row>
              <Col className="col-md-4 mb-2 m-auto">
                {" "}
                <>
                  <Form.Label>Select Clients name</Form.Label>
                  <div>
                    <Form.Control
                      placeholder="select clients name"
                      value={selectedBrandNames}
                      onClick={() => setbrandName(!brandName)}
                      readOnly
                    />
                  </div>

                  {brandName ? (
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
                            onClick={handleSelectClientName1}
                            style={{ borderBottom: "1px solid grey" }}
                          >
                            <CheckIcon />
                            Apply selection
                          </p>
                        </div>
                        {recceData?.map((ele, index) => {
                          const desiredClient = ClientInfo?.client?.find(
                            (client) => client._id === ele.BrandName
                          );

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
                                  value={`${ele.BrandName}_${index}`}
                                  checked={selectedCheckboxes.includes(
                                    `${ele.BrandName}_${ele._id}`
                                  )}
                                  onChange={(event) => {
                                    handleCheckboxChange1(
                                      event,
                                      ele.BrandName,

                                      ele._id
                                    );
                                  }}
                                />

                                <p className="d-inline">
                                  <span className="me-3"> Job {index + 1}</span>
                                  {desiredClient?.clientsBrand}
                                </p>
                              </Form.Label>
                            </div>
                          );
                        })}
                      </div>{" "}
                    </div>
                  ) : null}
                </>
              </Col>
              <Col className="col-md-4 mb-2 m-auto">
                <Form.Label>Report's</Form.Label>
                <Form.Select onChange={handleFilterChange}>
                  <option value="All">All</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                  <option value="ThisWeek">This Week</option>
                  <option value="LastWeek">Last Week</option>
                  <option value="ThisMonth">This Month</option>
                  <option value="LastMonth">Last Month</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-5">
              <Button onClick={searchReport} className="col-md-2 m-auto ">
                Report
              </Button>
            </Row>
          </Form>{" "}
        </div>
      )}
    </>
  );
}
