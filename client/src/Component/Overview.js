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
// import moment from "moment";
import axios from "axios";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Form from "react-bootstrap/Form";

export default function Overview() {
  const [totalRecce, setTotalRecce] = useState([]);
  const [totalDesign, setTotalDesign] = useState([]);
  const [totalPrinting, setTotalPrinting] = useState([]);
  const [totalfabrication, setTotalFabrication] = useState([]);
  const [totalInstalation, setTotalInstalation] = useState([]);
  const [totalAddClients, setTotalAddClients] = useState([]);
  const [totalVendorData, setTotalVendorData] = useState([]);

  const [totalRunningJob, setTotalRunningJob] = useState([]);

  // const [filter, setFilter] = useState("All");

  // const handleFilterClick = (selectedFilter) => {
  //   setFilter(selectedFilter);
  // };

  // const filterData = () => {
  //   const filteredData = totalRecce.filter((item) => {
  //     // const itemDate = moment(item.createdAt, "MM/DD/YYYY");
  //     // const now = moment();

  //     switch (filter) {
  //       case totalRecce:
  //         return totalRecce;
  //       case totalDesign:
  //         return totalDesign;
  //       case totalPrinting:
  //         return totalPrinting;
  //       case totalfabrication:
  //         return totalfabrication;
  //       case totalInstalation:
  //         return totalInstalation;

  //       default:
  //         return true;
  //     }
  //   });

  //   return filteredData;
  // };

  let data =
    totalRecce?.length +
    totalDesign?.length +
    totalPrinting?.length +
    totalfabrication?.length +
    totalInstalation?.length;

  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getAllVendorInfo();
    setTotalRunningJob(data);
  },);
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setTotalRecce(res.data.RecceData);
      }
      if (res.status === 200) {
        const filteredDesignData = res.data.RecceData.filter(
          (item) => item._id === item.completedRecceId
        );
        setTotalDesign(filteredDesignData);
      }
      if (res.status === 200) {
        const filteredPrintingData = res.data.RecceData.filter(
          (item) => item._id === item.completedDesign
        );
        setTotalPrinting(filteredPrintingData);
      }
      if (res.status === 200) {
        const filteredfabricationData = res.data.RecceData.filter(
          (item) => item._id === item.completedPrinting
        );

        setTotalFabrication(filteredfabricationData);
      }
      if (res.status === 200) {
        const filteredInstalationData = res.data.RecceData.filter(
          (item) => item._id === item.completedFabrication
        );

        setTotalInstalation(filteredInstalationData);
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
        "http://localhost:8000/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setTotalAddClients(res.data.client);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  return (
    <>
      <Header />
      <div className="row mt-3 m-auto containerPadding">
        <div className="row m-auto">
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px",  }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
            <div
              // onClick={() => handleFilterClick(totalRecce)}
              className={`row m-auto ${"active"}`}
            >
              <div className="col-md-6 m-auto">
                <CategoryIcon style={{ fontSize: "50px", color: "black" }} />
              </div>

              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalRecce?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  Total Recce Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px",  }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
            <div
              // onClick={() => handleFilterClick("Monthly")}
              className={`row m-auto ${"active"}`}
            >
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
                  {totalDesign?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Design Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px", }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
            <div
              // onClick={() => handleFilterClick(totalPrinting)}
              className={`row m-auto ${"active"}`}
            >
              <div className="col-md-6 m-auto">
                <PrintIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalPrinting?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  {" "}
                  Total Printing Jobs
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px",}}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
            <div
              // onClick={() => handleFilterClick(totalfabrication)}
              className={`row m-auto ${"active"}`}
            >
              <div className="col-md-6 m-auto">
                <BuildIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalfabrication?.length}
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
            style={{ height: "225px", }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
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
            style={{ height: "225px", }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
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
            style={{ height: "225px", }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <AssignmentIcon style={{ fontSize: "50px", color: "black" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4
                  style={{ fontSize: "35px", color: "black" }}
                  className="row"
                >
                  {totalInstalation?.length}
                </h4>
                <p style={{ color: "black" }} className="row">
                  Total Installation{" "}
                </p>
              </div>
            </div>
          </Card>
          <Card
            className={`col-md-3 m-2 c_zoom ${"active1"}`}
            style={{ height: "225px",  }}
          >
            <div className="row ">
              <div className="float-end">
                <ArrowCircleDownIcon
                // style={{ color: "white", fontSize: "25px" }}
                />
              </div>
            </div>
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
                  // value={filterStartDate}
                  // onChange={handleFilterStartDateChange}
                />
              </div>
              <div className="col-md-5 ">
                <Form.Control
                  type="date"
                  // value={filterEndDate}
                  // onChange={handleFilterEndDateChange}
                />
              </div>
              <div className="col-md-2 ">
                <Button
                //  onClick={handleClearDateFilters}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <Table bordered>
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Assigned Jobs</th>
                <th>Completed Jobs</th>
                <th>Date</th>
              </tr>
            </thead>{" "}
            <tbody>
              {/* {filterData().map((item, index) => {
                const selectedVendorId = item?.vendor?.[0];
                const vendor = selectedVendorId
                  ? totalVendorData?.find((ele) => ele._id === selectedVendorId)
                  : null;

                if (vendor !== null) {
                  return (
                    <tr key={item._id}>
                      <td className="td_S ">{index + 1}</td>
                      <td className="td_S ">{vendor?.VendorFirstName}</td>
                      <td className="td_S ">
                        {item.createdAt
                          ? new Date(item.createdAt).toISOString().slice(0, 10)
                          : ""}
                      </td>
                    </tr>
                  );
                }

                return null;
              })} */}
            </tbody>
          </Table>
        </div>
      </div>{" "}
    </>
  );
}
