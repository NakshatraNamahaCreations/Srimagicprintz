import { React, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PrintIcon from "@mui/icons-material/Print";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import BarChartIcon from "@mui/icons-material/BarChart";
import moment from "moment";

export default function Overview() {
  const AssignedJob = [
    {
      date: "07/07/2023",
      numberOfJob: 10,
      jobAssigned: 9,
    },
    {
      date: "07/12/2023",
      numberOfJob: 100,
      jobAssigned: 409,
    },
    {
      date: "06/23/2023",
      numberOfJob: 200,
      jobAssigned: 549,
    },
    {
      date: "04/24/2020",
      numberOfJob: 400,
      jobAssigned: 1009,
    },
    {
      date: "07/08/2021",
      numberOfJob: 600,
      jobAssigned: 2005,
    },
    {
      date: "07/14/2013",
      numberOfJob: 1000,
      jobAssigned: 3000,
    },
    {
      date: "05/23/2023",
      numberOfJob: 10,
      jobAssigned: 1009,
    },
    {
      date: "01/04/2022",
      numberOfJob: 2000,
      jobAssigned: 1009,
    },
    {
      date: "11/04/2021",
      numberOfJob: 200,
      jobAssigned: 1000,
    },

    {
      date: "12/08/2020",
      numberOfJob: 2500,
      jobAssigned: 1900,
    },
    {
      date: "05/04/2021",
      numberOfJob: 3000,
      jobAssigned: 1700,
    },
    {
      date: "05/04/2012",
      numberOfJob: 3500,
      jobAssigned: 3500,
    },
  ];

  const [filter, setFilter] = useState("All");

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filterData = () => {
    if (filter === "All") {
      return AssignedJob;
    }

    const filteredData = AssignedJob.filter((item) => {
      const itemDate = moment(item.date, "MM/DD/YYYY");
      const now = moment();

      switch (filter) {
        case "Weekly":
          return itemDate.isBetween(
            now.clone().startOf("week"),
            now.clone().endOf("week"),
            undefined,
            "[]"
          );
        case "Monthly":
          return itemDate.isBetween(
            now.clone().startOf("month"),
            now.clone().endOf("month"),
            undefined,
            "[]"
          );
        case "Yearly":
          return itemDate.isBetween(
            now.clone().startOf("year"),
            now.clone().endOf("year"),
            undefined,
            "[]"
          );
        default:
          return true;
      }
    });

    return filteredData;
  };

  return (
    <>
      <Header />
      <div className="row mt-3 m-auto containerPadding">
        <div className="row m-auto">
          <Card className="col-md-3 m-2 c_zoom">
            <div
              onClick={() => handleFilterClick("Weekly")}
              className={`row m-auto ${filter === "Weekly" && "active"}`}
            >
              <div className="col-md-6 m-auto">
                <CategoryIcon style={{ fontSize: "50px", color: "#068fff" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row">Total Recce Jobs</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom">
            <div
              onClick={() => handleFilterClick("Monthly")}
              className={`row m-auto ${filter === "Monthly" && "active"}`}
            >
              <div className="col-md-6 m-auto">
                <DesignServicesIcon
                  style={{ fontSize: "50px", color: "#068fff" }}
                />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Design Jobs</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom">
            <div
              onClick={() => handleFilterClick("Yearly")}
              className={`row m-auto ${filter === "Yearly" && "active"}`}
            >
              <div className="col-md-6 m-auto">
                <PrintIcon style={{ fontSize: "50px", color: "#068fff" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Printing Jobs</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom">
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <BuildIcon style={{ fontSize: "50px", color: "#068fff" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Fabrication Jobs</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom" style={{ height: "125px" }}>
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <BusinessIcon style={{ fontSize: "50px", color: "#068fff" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Number of Clients</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom" style={{ height: "125px" }}>
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <BarChartIcon style={{ fontSize: "50px", color: "#068fff" }} />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Number Of Venders</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom" style={{ height: "125px" }}>
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <DirectionsRunIcon
                  style={{ fontSize: "50px", color: "#068fff" }}
                />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row"> Total Running Jobs</p>
              </div>
            </div>
          </Card>
          <Card className="col-md-3 m-2 c_zoom" style={{ height: "125px" }}>
            <div className="row m-auto">
              <div className="col-md-6 m-auto">
                <AssignmentIcon
                  style={{ fontSize: "50px", color: "#068fff" }}
                />
              </div>
              <div className="col-md-6 m-auto">
                <h4 className="row">124</h4>
                <p className="row">Total Installation </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="row mt-3 m-auto">
          <Table bordered>
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Assigned Jobs</th>
                <th>Completed Jobs</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="">
              {filterData().map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.numberOfJob}</td>
                  <td>{item.jobAssigned}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>{" "}
    </>
  );
}
