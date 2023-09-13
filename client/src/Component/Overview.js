import { React, useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PrintIcon from "@mui/icons-material/Print";
import BuildIcon from "@mui/icons-material/Build";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import BarChartIcon from "@mui/icons-material/BarChart";
import moment from "moment";
import axios from "axios";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Form from "react-bootstrap/Form";

const StatusColor = {
  Pending: { color: "#F94C10" },
  Proccesing: { color: "orange" },
  Completed: { color: "green" },
  Cancelled: { color: "red" },
};
export default function Overview() {
  const [RecceData, setRecceData] = useState([]);
  const [totalRecce, setTotalRecce] = useState([]);
  const [totalDesign, setTotalDesign] = useState([]);
  const [totalPrinting, setTotalPrinting] = useState([]);
  const [totalfabrication, setTotalFabrication] = useState([]);
  const [totalInstalation, setTotalInstalation] = useState([]);
  const [totalAddClients, setTotalAddClients] = useState([]);
  const [totalVendorData, setTotalVendorData] = useState([]);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [totalRunningJob, setTotalRunningJob] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  let data =
    totalRecce +
    totalDesign +
    totalPrinting +
    totalfabrication +
    totalInstalation;

  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getAllVendorInfo();
    setTotalRunningJob(data);
  }, []);
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        const recceData = res.data.RecceData || [];
        setRecceData(recceData);
        const totalRecceLength = recceData.reduce(
          (total, recceItem) => total + recceItem.outletName.length,
          0
        );

        const totalDesignLength = recceData.reduce((total, recceItem) => {
          const outletNames = recceItem.outletName || [];

          const outletNameCount = outletNames.reduce(
            (outletTotal, outlet) =>
              outletTotal + (outlet.RecceStatus === "Completed" ? 1 : 0),
            0
          );

          return total + outletNameCount;
        }, 0);

        const totalPrintingLenght = recceData.reduce((total, recceItem) => {
          const outletNames = recceItem.outletName || [];

          const outletNameCount = outletNames.reduce(
            (outletTotal, outlet) =>
              outletTotal + (outlet.RecceStatus === "Completed" ? 1 : 0),
            0
          );

          return total + outletNameCount;
        }, 0);

        const totalFabricationLength = recceData.reduce((total, recceItem) => {
          const outletNames = recceItem.outletName || [];

          const outletNameCount = outletNames.reduce(
            (outletTotal, outlet) =>
              outletTotal + (outlet.OutlateFabricationNeed === "Yes" ? 1 : 0),
            0
          );

          return total + outletNameCount;
        }, 0);

        const totalInstallationLength = recceData.reduce((total, recceItem) => {
          const outletNames = recceItem.outletName || [];

          const outletNameCount = outletNames.reduce(
            (outletTotal, outlet) =>
              outletTotal + (outlet.OutlateFabricationNeed === "Yes" ? 1 : 0),
            0
          );

          return total + outletNameCount;
        }, 0);

        setTotalRecce(totalRecceLength);
        setTotalDesign(totalDesignLength);
        setTotalPrinting(totalPrintingLenght);
        setTotalFabrication(totalFabricationLength);
        setTotalInstalation(totalInstallationLength);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://api.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
      );

      if (response.status === 200) {
        let vendor = response.data.vendors;
        setTotalVendorData(vendor);
      } else {
        alert("Unable to fetch data");
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setTotalAddClients(res.data.client);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  const filterData = (activeCategory) => {
    const filteredData = [];

    RecceData?.forEach((recceItem) => {
      const outletNameArray = recceItem?.outletName;

      if (Array.isArray(outletNameArray)) {
        outletNameArray.forEach((outlet) => {
          let shouldInclude = false;

          switch (activeCategory) {
            case "totalRecce":
              shouldInclude = true;
              break;
            case "totalDesign":
              shouldInclude = outlet?.RecceStatus?.includes("Completed");
              break;
            case "totalPrinting":
              shouldInclude = outlet?.RecceStatus?.includes("Completed");
              break;
            case "totalfabrication":
              shouldInclude = outlet?.OutlateFabricationNeed?.includes("Yes");
              break;
            case "totalInstalation":
              shouldInclude = outlet?.OutlateFabricationNeed?.includes("Yes");
              break;
            default:
              shouldInclude = true;
              break;
          }

          if (shouldInclude) {
            filteredData.push(outlet);
          }
        });
      }
    });

    return filteredData;
  };

  const filteredData = filterData(activeCategory);
  let rowsDisplayed = 0;

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage1(newRowsPerPage);

    rowsDisplayed = 0;
  };

  const handleClearDateFilters = () => {
    setFilterStartDate("");
    setFilterEndDate("");
  };
  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };
  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const [data1, setdata1] = useState(0);
  useEffect(() => {
    setdata1(rowsDisplayed);
  }, [rowsPerPage1]);
  return (
    <>
      <Header />
      <div className="row mt-3 m-auto containerPadding">
        <div className="row m-auto">
          <Card
            className={`col-md-3 m-2 c_zoom ${
              activeCategory === "totalRecce" ? "active1" : ""
            }`}
            style={{ height: "225px" }}
            onClick={() => handleFilterClick("totalRecce")}
          >
            <div className={`row m-auto ${"active1"}`}>
              <div className="col-md-6 m-auto">
                <CategoryIcon style={{ fontSize: "50px", color: "black" }} />
              </div>

              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalRecce}
                </h4>
                <p style={{ color: "black" }} className="row">
                  Total Recce Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${
              activeCategory === "totalDesign" ? "active1" : ""
            }`}
            style={{ height: "225px" }}
            onClick={() => handleFilterClick("totalDesign")}
          >
            <div className={`row m-auto ${"active1"}`}>
              <div className="col-md-6 m-auto">
                <DesignServicesIcon
                  style={{ fontSize: "50px", color: "black" }}
                />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalDesign}
                </h4>
                <p style={{ color: "black" }} className="row">
                  Total Design Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${
              activeCategory === "totalPrinting" ? "active1" : ""
            }`}
            style={{ height: "225px" }}
            onClick={() => handleFilterClick("totalPrinting")}
          >
            <div className={`row m-auto ${"active"}`}>
              <div className="col-md-6 m-auto">
                <PrintIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalPrinting}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Printing Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${
              activeCategory === "totalRecce" ? "active1" : ""
            }`}
            style={{ height: "225px" }}
            onClick={() => handleFilterClick("totalfabrication")}
          >
            <div className={`row m-auto ${"active"}`}>
              <div className="col-md-6 m-auto">
                <BuildIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalfabrication}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Fabrication Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px" }}
          >
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <BusinessIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalAddClients?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Number of Clients
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px" }}
          >
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <BarChartIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalVendorData?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Number Of Venders
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px" }}
          >
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <AssignmentIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalInstalation}
                </h4>
                <p style={{ color: "black" }} className="row">
                  Total Installation{" "}
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px" }}
          >
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <RunningWithErrorsIcon
                  style={{ fontSize: "50px", color: "black" }}
                />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalRunningJob}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Running Jobs
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="row mt-3 m-auto">
          <div className="col-md-5 float-end mb-3">
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
          <div className="col-md-4 ">
            <div className="row">
              <div className="col-md-2">
                <Form.Control
                  className="col-md-2"
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
              <div className="col-md-3 ">
                <span>{data1}</span> of <span>{filteredData?.length}</span>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="th_s ">SI.No.</th>
                <th className="th_s "> Outlate</th>
                <th className="th_s ">Assigned</th>
                <th className="th_s ">Status</th>
                <th className="th_s ">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.map((item, index) => {
                const textColor = StatusColor[item.RecceStatus]?.color || "";

                if (rowsDisplayed < rowsPerPage1) {
                  rowsDisplayed++;
                  return (
                    <tr className="tr_C" key={item._id}>
                      <td className="td_S p-1">{index + 1}</td>

                      <td className="td_S p-1">{item.ShopName}</td>
                      <td className="td_S p-1">{item.ShopName}</td>
                      <td className="td_S p-1" style={{ color: textColor }}>
                        {item.RecceStatus}
                      </td>

                      <td className="td_S p-1">
                        {item.createdAt
                          ? new Date(item.createdAt).toISOString().slice(0, 10)
                          : ""}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
  );
}
