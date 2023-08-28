import React, { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";

import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


export default function Trackassignedjob() {
  const [trackJob, setTrackJob] = useState(null);
  const data = [
    {
      id: 1,
      ClientsName: "Ramesh",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      jobcode: "4568",
      Status: `View  ${">"}`,
    },

    {
      id: 2,
      ClientsName: "Ramesh",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      jobcode: "4568",
      Status: `View  ${">"}`,
    },
    {
      id: 3,
      ClientsName: "Ramesh",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      jobcode: "4568",
      Status: `View  ${">"}`,
    },
    {
      id: 4,
      ClientsName: "Ramesh",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      jobcode: "4568",
      Status: `View  ${">"}`,
    },
    {
      id: 5,
      ClientsName: "Ramesh",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      jobcode: "4568",
      Status: `View  ${">"}`,
    },
  ];
  const columns = [
    {
      name: "SI.NO.",
      selector: "id",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Name",
      selector: "ClientsName",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Store Location",
      selector: "StoreLocation",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },

      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      name: "Zone",
      selector: "zone",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },

      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      name: "Pincode",
      selector: "pincode",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Job code",
      selector: "jobcode",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
  ];

  const handleTrackJob = (row) => {
    if (row) {
      const { index } = row;
      setTrackJob(index);
    }
  };
  const handleTrackJob1 = () => {
    setTrackJob(null);
  };
  const tableData = {
    columns,
    data,
  };

  const customStyles = {
    table: {
      border: "none",
      width: "100%",
    },
    cells: {
      style: {
        borderLeft: "1px solid black",
        padding: "8px",
      },
    },
    headCells: {
      style: {
        border: "1px solid black",
        fontWeight: "bold",
        borderCollapse: "collapse",
        padding: "8px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid black",
        wordBreak: "break-word",
        borderCollapse: "collapse",
      },
    },
  };
  return (
    <>
      <Header />

      {trackJob === null ? (
        <div className="row  m-auto containerPadding">
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              sortIcon={<SortIcon />}
              defaultSortAsc={true}
              pagination
              highlightOnHover
              dense
              customStyles={customStyles}
              onRowClicked={handleTrackJob}
            />
          </DataTableExtensions>
        </div>
      ) : (
        <div className="row  m-auto containerPadding">
          <div className="row">
            {" "}
            <div className="col-md-1">
              <ArrowCircleLeftIcon
                onClick={handleTrackJob1}
                style={{ color: "#068FFF" }}
              />{" "}
            </div>
          </div>
          <div className="col-md-8">
            <p>
              <span className="me-3 clr">Ashapura Hardware:</span>
              <span className="me-3 ">SMP3245</span>
            </p>

            <p>
              <span className="me-3 clr">Phone:</span>
              <span className="me-3 ">5362737263</span>
            </p>
            <p className="col-md-8">
              <span className="me-3 clr">Address :</span>
              <span>
                1st floor, Above ashapura hardware, Dwaraka Nagar, Banashankari
                6th Stage 1st Block, Channasandra, Bengaluru, Karnataka 560061
              </span>
            </p>
          </div>
          <div className="row">
            <div className="row d-flex">
              <div className="col-md-1 ">
                <CheckCircleIcon
                  className="clr2"
                  style={{ fontSize: "35px" }}
                />{" "}
                <p
                  className="track-line"
                  style={{ position: "relative", bottom: "2.5%" }}
                ></p>
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p className="clr">Recee</p>
                <p>Recee job completed on 12 june 2023</p>
              </div>
            </div>
            <div className="row d-flex">
              <div className="col-md-1 ">
                <CheckCircleIcon
                  className="clr2"
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "5%",
                  }}
                />{" "}
                <p
                  className="track-line"
                  style={{ position: "relative", bottom: "8%" }}
                ></p>
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p className="clr">Design</p>
                <p>Design approved on 14 june 2023</p>
              </div>
            </div>
            <div className="row d-flex">
              <div className="col-md-1 ">
                <CheckCircleIcon
                  className="clr2"
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "10%",
                  }}
                />{" "}
                <p
                  className="track-line"
                  style={{ position: "relative", bottom: "13%" }}
                ></p>
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p className="clr">Printing</p>
                <p>Printing completed on 16 june 2023</p>
              </div>
            </div>
            <div
              className="row d-flex"
              style={{ position: "relative", top: "0%" }}
            >
              <div className="col-md-1 ">
           
                <DonutLargeIcon
                  className="clr2"
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "10%",
                  }}
                >
                  <img
                    className="clr2"
                    width={"10px"}
                    height={"12px"}
                    alt=""
                    src="../Assests/blue-loading-fotor-20230711105926.png"
                    style={{
                      fontSize: "35px",
                      position: "relative",
                      bottom: "10%",
                    }}
                  />
                </DonutLargeIcon>
                <p
                  className="track-line track-line1"
                  style={{ position: "relative", bottom: "11%" }}
                ></p>
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p className="clr">Fabrication</p>
                <p>
                  Fabrication in progress information of jon sent to factory
                  fabrication process has started on 16 june 2023
                </p>
              </div>
            </div>
            <div
              className="row d-flex"
              style={{ position: "relative", bottom: "2%" }}
            >
              <div className="col-md-1 ">
                <PanoramaFishEyeIcon
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "10%",
                  }}
                />{" "}
                <p
                  className="track-line"
                  style={{ position: "relative", bottom: "13%" }}
                ></p>
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p >Installation</p>
                <p>fabrication process is not yet completed</p>
              </div>
            </div>
            <div
              className="row d-flex"
              style={{ position: "relative", bottom: "4%" }}
            >
              <div className="col-md-1 ">
                <PanoramaFishEyeIcon
                  style={{
                    fontSize: "35px",
                    position: "relative",
                    bottom: "10%",
                  }}
                />{" "}
              </div>{" "}
              <div className="col-md-3">
                {" "}
                <p >process completed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
