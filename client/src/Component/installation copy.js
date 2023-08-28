import React, { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Installation() {
  const [trackJob, setTrackJob] = useState(null);
  const [sendLink, setSendLink] = useState("");
  const [togglelink, setToggleLink] = useState(false);
  const [link, setLink] = useState("http://localhost:3000/JobManagement");

  const handleToggle = () => {
    setToggleLink(!togglelink);
 
  };

  const copyShareLink = () => {
    setSendLink(link);
  };
  const handleTrackJob = (row) => {
    const { index } = row;
    setTrackJob(index);
  };
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
      selector: "names",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Store Name",
      selector: "StoreNames",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Vender Name",
      selector: "venderName",
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
      selector: "status",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },

      cell: (d) => (
        <span
          style={{
            color:
              d.status === "Processing"
                ? "orange"
                : d.status === "Pending"
                ? "red"
                : "green",
          }}
        >
          {d.status}
        </span>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      id: 2,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      id: 3,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 4,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      id: 5,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      id: 6,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 7,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      id: 8,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      id: 9,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 10,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      id: 11,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      id: 12,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 13,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      id: 14,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      id: 15,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 16,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 17,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 18,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 19,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 20,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 21,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 22,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 23,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      id: 24,
      names: "Ramesh",
      StoreNames: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      StoreLocation: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
  ];

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
        <div className="row  m-auto ">
          <div className="col-md-8">
            <p>
              <span className="me-3 clr">Dev mobiles</span>
            </p>
            <span className="me-3 clr">Address :</span>
            <p>
              1st floor, Above ashapura hardware, Dwaraka Nagar, Banashankari
              6th Stage 1st Block, Channasandra, Bengaluru, Karnataka 560061
            </p>
            <p>
              <span className="me-3 clr">Phone</span>
              <span className="me-3 "> 3425768912 </span>
            </p>
            <p className="me-3 clr">
              Recce remarks for installation
              <p style={{ color: "green" }}>No remarks all is good!</p>
            </p>
            <div className="col-md-8 ">
              <div>
                <img
                  width={"120px"}
                  height={"100px"}
                  className="me-4"
                  style={{ border: "1px solid grey", borderRadius: "10px" }}
                  alt=""
                  src="https://images.jdmagicbox.com/comp/bangalore/k5/080pxx80.xx80.180409111532.e9k5/catalogue/v-connect-mobile-point-moodalapalya-bangalore-mobile-phone-dealers-7hn6uzolu1.jpg?temp=1"
                />
              </div>
              <div className="row mt-3">
                <div className="col-md-7">
                  <span className="clr">Client Comment :</span>
                  <Form>
                    <Form.Control
                      className="mt-3"
                      type="text"
                      style={{ padding: "20px" }}
                      as="textarea"
                    />
                    <Button className="mt-3" onClick={() => setTrackJob(null)}>
                      Send
                    </Button>{" "}
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-end">
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
          </div>{" "}
        </div>
      )}
    </>
  );
}
