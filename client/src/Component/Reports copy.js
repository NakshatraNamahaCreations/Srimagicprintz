import React, { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Button from "react-bootstrap/Button";
import CheckIcon from "@mui/icons-material/Check";
import Row from "react-bootstrap/Row";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";

import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Reports() {
  const [trackJob, setTrackJob] = useState(null);
  const [clientName, setClientName] = useState(false);
  const [report, setReport] = useState(false);

  const searchReport = () => {
    setReport(!report);
  };
  const handleSelectClientName = () => {
    setClientName(!clientName);
  };

  const data = [
    {
      id: 1,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Completed",
    },

    {
      id: 2,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Pending",
    },
    {
      id: 3,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Processing",
    },
    {
      id: 4,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Completed",
    },
    {
      id: 5,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Completed",
    },
    {
      id: 6,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Completed",
    },
    {
      id: 7,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "completed",
    },

    {
      id: 8,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Pending",
    },
    {
      id: 9,
      ClientsName: "Ramesh",
      Vendor_Name: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "23-04-2023",
      Status: "Processing",
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
      name: "Vendor Name",
      selector: "Vendor_Name",
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
      name: "Date",
      selector: "date",
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

      cell: (d) => (
        <span
          style={{
            color:
              d.Status === "Processing"
                ? "orange"
                : d.Status === "Pending"
                ? "red"
                : "green",
          }}
        >
          {d.Status}
        </span>
      ),
    },
  ];
 const tableData = {
    columns,
    data,
  };
  const handleTrackJob = (row) => {
    if (row) {
      const { index } = row;
      setTrackJob(index);
    }
  };
  const handleTrackJob1 = () => {
    setTrackJob(null);
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
      {report ? (
        <>
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
                    onClick={(e) => handleTrackJob(e, null)}
                    style={{ color: "#068FFF" }}
                  />{" "}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-2" style={{ borderRadius: "100px" }}>
                  <img
                    width={"100px"}
                    height={"100px"}
                    alt=""
                    src="https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo-768x432.png"
                  />
                </div>
                <div className="col-md-2" style={{ borderRadius: "100px" }}>
                  <p>Nike</p>
                  <p>SMP0324</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-2" style={{ borderRadius: "100px" }}>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Bangalore west
                  </p>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Channasandra
                  </p>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    05/06/2022
                  </p>
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    Completed
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="row m-auto containerPadding">
          <Form className="col-md-6 m-auto">
            <Row>
              <Col className="col-md-6 mb-2 m-auto">
                <Form.Label>City</Form.Label>
                <Form.Select>
                  <option>Bengaluru</option>
                  <option>Pune</option>
                  <option>Raigad</option>
                  <option>Bidar</option>
                  <option>R.R.Nagar</option>
                  <option>Bengaluru</option>
                  <option>Pune</option>
                  <option>Raigad</option>
                  <option>Bidar</option>
                  <option>R.R.Nagar</option>
                </Form.Select>
              </Col>
              <Col className="col-md-6 mb-2 m-auto">
                <Form.Label>Pick a Category</Form.Label>
                <Form.Select>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                  <option>Printing</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="col-md-6 mb-2  m-auto">
                {" "}
                <>
                  <Form.Label>Select Clients name</Form.Label>
                  <div>
                    <Form.Control
                      className="text-center"
                      value={"Rahul"}
                      onClick={handleSelectClientName}
                      readOnly
                    />
                  </div>
                  {clientName ? (
                    <div
                      style={{ position: "absolute", width: "14.2rem" }}
                      className="col-md-2 table-container m-auto"
                    >
                      <div className=" table-wrapper3">
                        <div className="row">
                          <p style={{ borderBottom: "1px solid grey" }}>
                            <CheckIcon />
                            Apply selection
                          </p>
                        </div>
                        <div className="row m-auto">
                          <label>
                            <input type="checkbox" name="option1" />
                            Nike
                          </label>{" "}
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option2" />
                            Patek Phillipe
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option3" />
                            Chok Tai Fook
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option4" />
                            Wooden Street
                          </label>
                        </div>
                        <div className="row m-auto">
                          <label>
                            <input type="checkbox" name="option5" />
                            Nike
                          </label>{" "}
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option6" />
                            Patek Phillipe
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option7" />
                            Chok Tai Fook
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option8" />
                            Wooden Street
                          </label>
                        </div>
                        <div className="row m-auto">
                          <label>
                            <input type="checkbox" name="option9" />
                            Nike
                          </label>{" "}
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option10" />
                            Patek Phillipe
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option11" />
                            Chok Tai Fook
                          </label>
                        </div>
                        <div className="row m-auto">
                          {" "}
                          <label>
                            <input type="checkbox" name="option12" />
                            Wooden Street
                          </label>
                        </div>
                      </div>{" "}
                    </div>
                  ) : null}
                </>
              </Col>
              <Col className="col-md-6 mb-2  m-auto">
                <Form.Label>Report's</Form.Label>
                <Form.Select>
                  <option>Today's</option>
                  <option>Yesterday</option>
                  <option>ThisWeek</option>
                  <option>LastWeek</option>
                  <option>ThisMonth</option>
                  <option>LastMonth</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-5">
              <Button onClick={searchReport} className="col-md-2 m-auto ">
                Search
              </Button>
            </Row>
          </Form>{" "}
        </div>
      )}
    </>
  );
}
