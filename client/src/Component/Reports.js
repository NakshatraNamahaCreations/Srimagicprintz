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
  const ImageURL = process.env.REACT_APP_IMAGE_API_URL;
  const [recceData, setRecceData] = useState([]);

  const [displayedData, setDisplayedData] = useState([]);

  const [CategoryData, setCategoryData] = useState(null);

  const [getreccedata, setgetreccedata] = useState("");
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [moreoption, setmoreoption] = useState(false);
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [selectedBrandNames, setSelectedBrandNames] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [ClientInfo, setClientInfo] = useState([]);

  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getAllCategory();
  }, []);
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(`${ApiURL}/Client/clients/getallclient`);
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const getAllCategory = async () => {
    try {
      const res = await fetch(`${ApiURL}/Product/category/getcategory`);
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
      const res = await axios.get(`${ApiURL}/recce/recce/getallrecce`);
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [brandName, setbrandName] = useState(false);
  const [departmentName, setdepartmentName] = useState(false);

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
      setSelectedRecceItems(displayedData?.map((item) => item._id));
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

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedCheckboxesDep, setSelectedCheckboxesDep] = useState([]);

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

  const handleCheckboxChangeDepart = (event, depart) => {
    const updatedCheckboxesd = event.target.checked
      ? [...selectedCheckboxesDep, depart]
      : selectedCheckboxesDep.filter((checkbox) => !checkbox.includes(depart));

    setSelectedCheckboxesDep(updatedCheckboxesd);
  };

  const department = [
    "Recce",
    "Design",
    "Printing",
    "Fabrication",
    "Installation",
  ];

  const handleSelectDepartment = () => {
    const selectedDepartNames = selectedCheckboxesDep.map((value) => {
      const [department] = value.split("_");
      return department;
    });
    setSelectedDepartment([selectedDepartNames.join(", ")]);
    setdepartmentName(!departmentName);
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

  const filterAndSearchData = (
    filterStartDate,
    filterEndDate,
    selectedCheckboxes,
    selectedDepartment
  ) => {
    if (!Array.isArray(recceData)) {
      console.error("Invalid data format: recceData is not an array.");
      return [];
    }

    const selectedIds = selectedCheckboxes?.map((ele) => ele.split("_")[1]);

    const filteredRecceDataWithDates = recceData.flatMap((recce) => {
      return recce.outletName.filter((item) => {
        const createdAtDate = moment(
          item.createdAt ?? "",
          ["YYYY-MM-DDTHH:mm:ss.SSSZ", "YYYY-MM-DD"],
          true
        );

        const startDate = filterStartDate
          ? moment(filterStartDate, "YYYY-MM-DD", true)
          : null;
        const endDate = filterEndDate
          ? moment(filterEndDate, "YYYY-MM-DD", true)
          : null;

        const isDateInRange =
          (!startDate || createdAtDate.isSameOrAfter(startDate)) &&
          (!endDate || createdAtDate.isSameOrBefore(endDate));

        const isSelectedId = selectedIds.includes(recce._id);

        return isDateInRange && isSelectedId;
      });
    });

    const filteredData = filteredRecceDataWithDates.filter((outlet) => {
      let shouldInclude = false;

      for (const department of selectedDepartment) {
        switch (department) {
          case "Recce":
            shouldInclude = true;
            break;
          case "Design":
            shouldInclude = outlet?.RecceStatus?.includes("Completed");
            break;
          case "Printing":
            shouldInclude = outlet?.RecceStatus?.includes("Completed");
            break;
          case "Fabrication":
            shouldInclude = outlet?.OutlateFabricationNeed?.includes("Yes");
            break;
          case "Installation":
            shouldInclude = outlet?.OutlateFabricationNeed?.includes("Yes");
            break;
          default:
            shouldInclude = true;
            break;
        }

        if (shouldInclude) {
          break;
        }
      }

      return shouldInclude;
    });

    setSelectedDesignIndex(!SelecteddesignIndex);
    setDisplayedData(filteredData);
  };

  const handleExportPDF = () => {
    if (!selectedRecceItems || selectedRecceItems?.length === 0) {
      alert("Please select at least one record to export");
      return;
    }

    if (!recceData) {
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

    const tableData = selectedRecceItems?.flatMap((outletidd) =>
      recceData.flatMap((Ele) =>
        Ele?.outletName
          ?.filter((outle) => outle?._id === outletidd)
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
      body: tableData?.map((item) => Object?.values(item)),
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

  return (
    <>
      <Header />
      {SelecteddesignIndex ? (
        <div className="row  m-auto ">
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
            <Col className="col-md-1">
              <Button onClick={handleExportPDF}> Download</Button>
            </Col>
          </div>

          <div className="row ">
            <table>
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
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th className="th_s ">SI.No</th>
                  <th className="th_s ">Job.No</th>

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

                  <th className="th_s ">Date</th>
                  <th className="th_s ">Status</th>
                </tr>
              </thead>

              <tbody>
                {recceData?.map((recceItem) =>
                  recceItem?.outletName?.flatMap((item, outletIndex) => {
                    return displayedData
                      .filter((ele) => ele._id === item._id)
                      .map((outlet) => {
                        if (rowsDisplayed < rowsPerPage1) {
                          let JobNob = 0;

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
                              <td className="td_S p-1">{outletIndex + 1}</td>
                              <td className="td_S p-1">Job{JobNob}</td>

                              <td className="td_S p-1">{outlet.ShopName}</td>
                              <td className="td_S p-1">
                                {recceItem.BrandName}
                              </td>
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
                      });
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row m-auto mt-2 ">
          <Row>
            <Col className="col-md-3 mb-2 m-auto">
              {" "}
              <>
                <Form.Label>Select Department </Form.Label>
                <div>
                  <Form.Control
                    placeholder="Select departments"
                    value={selectedDepartment}
                    onClick={() => setdepartmentName(!departmentName)}
                    readOnly
                  />
                </div>

                {departmentName ? (
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
                          onClick={handleSelectDepartment}
                          style={{ borderBottom: "1px solid grey" }}
                        >
                          <CheckIcon />
                          Apply selection
                        </p>
                      </div>
                      {department?.map((ele, index) => {
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
                                value={ele}
                                checked={selectedCheckboxesDep.includes(ele)}
                                onChange={(event) => {
                                  handleCheckboxChangeDepart(event, ele);
                                }}
                              />

                              <p className="d-inline">{ele}</p>
                            </Form.Label>
                          </div>
                        );
                      })}
                    </div>{" "}
                  </div>
                ) : null}
              </>
            </Col>
            <Col className="col-md-3 mb-2 m-auto">
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
                                {ele.BrandName}
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
            <Col className="col-md-6 mb-2 m-auto">
              <div className="row">
                <label className="col-md-5   mb-2">Start Date:</label>
                <label className="col-md-6  mb-2">End Date:</label>
                <div className="col-md-4 ">
                  <Form.Control
                    type="date"
                    value={filterStartDate}
                    onChange={handleFilterStartDateChange}
                  />
                </div>
                <div className="col-md-4 ">
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
          </Row>

          <Row className="mt-5">
            <Button
              onClick={() =>
                filterAndSearchData(
                  filterStartDate,
                  filterEndDate,
                  selectedCheckboxes,
                  selectedDepartment
                )
              }
              className="col-md-2 m-auto "
            >
              Report
            </Button>
          </Row>
        </div>
      )}
    </>
  );
}
