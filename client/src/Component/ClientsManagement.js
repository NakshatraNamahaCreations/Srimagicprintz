import React, { useEffect } from "react";

import Header from "./Header";

import { useState } from "react";
import { Button } from "react-bootstrap";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import axios from "axios";

import DataTable from "react-data-table-component";

export default function ClientsManagement() {
  const [addClients, setAddClients] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchBusinessName, setSearchBusinessName] = useState("");
  const [searchClientContactNo1, setsearchClientContactNo1] = useState("");
  const [searchClientContactNo2, setsearchClientContactNo2] = useState("");
  const [searchClientEmail, setsearchClientEmail] = useState("");
  const [searchClientPincode, setsearchClientPincode] = useState("");
  const [searchClientzone, setsearchClientZone] = useState("");
  const [searchresultData, setSearchResultData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAllClientsInfo();
  }, []);

  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setAddClients(res.data.client);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const customStyles = {
    table: {
      width: "100%",
    },
    cells: {
      style: {
        padding: "8px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        borderCollapse: "collapse",
        padding: "8px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        wordBreak: "break-word",
        borderCollapse: "collapse",
      },
    },
  };

  useEffect(() => {
    const filteredClients = () => {
      let results = [...addClients];

      if (searchName) {
        results = results.filter((item) =>
          item.clientsName?.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      if (searchBusinessName) {
        results = results.filter((item) =>
          item.ClientBusinessName?.toLowerCase().includes(
            searchBusinessName.toLowerCase()
          )
        );
      }
      if (searchClientContactNo1) {
        results = results.filter((item) => {
          const contactNumber1 =
            item.ClientsContactNumber1 && item.ClientsContactNumber1.toString();
          return contactNumber1?.includes(searchClientContactNo1);
        });
      }

      if (searchClientContactNo2) {
        results = results.filter((item) => {
          const contactNumber2 =
            item.ClientsContactNumber2 && item.ClientsContactNumber2.toString();
          return contactNumber2?.includes(searchClientContactNo2);
        });
      }
      if (searchClientEmail) {
        results = results.filter((item) =>
          item.ClientsEmail?.toLowerCase().includes(
            searchClientEmail.toLowerCase()
          )
        );
      }

      if (searchClientPincode) {
        results = results.filter((item) => {
          const pincode1 = item.Pincode && item.Pincode.toString();
          return pincode1?.includes(searchClientPincode);
        });
      }
      if (searchClientzone) {
        results = results.filter((item) => {
          const Zone1 = item.Zone && item.Zone.toString();
         
          return Zone1?.includes(searchClientzone);
        });
      }

      setSearchResultData(results);
    };
    filteredClients();
  }, [
    addClients,
    searchName,
    searchBusinessName,
    searchClientContactNo1,
    searchClientContactNo2,
    searchClientEmail,
    searchClientPincode,
    searchClientzone,
  ]);

  const handleSelected = (_id) => {
    setSelected(_id);
  };

  const selectedItem = addClients.find((item) => item._id === selected);

  const columns = [
    {
      name: "SI.NO.",

      selector: (row) => row.id,
    },
    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              type="text"
              placeholder="Search"
            />
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            {" "}
            <p>Clients Name </p>
          </div>
        </div>
      ),
      selector: (row) => row.clientsName,
    },
    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchBusinessName}
              onChange={(e) => setSearchBusinessName(e.target.value)}
            />
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            {" "}
            <p>Client Business Name </p>
          </div>
        </div>
      ),

      selector: (row) => row.ClientBusinessName,
    },
    {
      name: (
        <div>
          <div>
            {" "}
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchClientContactNo1}
              onChange={(e) => setsearchClientContactNo1(e.target.value)}
            />{" "}
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            <p>Client Contact Number</p>
          </div>
        </div>
      ),

      selector: (row) => row.ClientsContactNumber1,
    },
    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchClientContactNo2}
              onChange={(e) => setsearchClientContactNo2(e.target.value)}
            />
          </div>{" "}
          <div style={{ width: "80px", height: "45px" }}>
            <p>Client Alternative No.</p>
          </div>
        </div>
      ),

      selector: (row) => row.ClientsContactNumber2,

      style: {
        borderRight: "1px solid #D8D9DA",
      },
    },
    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchClientEmail}
              onChange={(e) => setsearchClientEmail(e.target.value)}
            />
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            <p>Client Email</p>
          </div>
        </div>
      ),

      selector: (row) => row.ClientsEmail,
    },
    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchClientPincode}
              onChange={(e) => setsearchClientPincode(e.target.value)}
            />{" "}
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            <p>Pincode</p>
          </div>
        </div>
      ),

      selector: (row) => row.Pincode,

      style: {
        borderRight: "1px solid #D8D9DA",
      },
    },

    {
      name: (
        <div>
          <div>
            <input
              style={{ width: "79px" }}
              type="text"
              placeholder="Search"
              value={searchClientzone}
              onChange={(e) => setsearchClientZone(e.target.value)}
            />
          </div>
          <div style={{ width: "80px", height: "45px" }}>
            <p>Zone</p>
          </div>
        </div>
      ),

      selector: (row) => row.Zone,
    },

    {
      name: "View Details",
      selector: "_id",
      cell: (row) =>
        row._id && (
          <span
            onClick={() => handleSelected(row._id)}
            style={{ cursor: row._id ? "pointer" : "default" }}
          >
            {row._id ? (
              <>
                View <i className="fa-sharp fa-solid fa-angle-right"></i>
              </>
            ) : (
              <>&nbsp;</>
            )}
          </span>
        ),
    },
  ];
  const dataForTable = searchresultData.map((client, index) => ({
    id: index + 1,
    clientsName: client.clientsName,
    ClientBusinessName: client.ClientBusinessName,
    ClientsContactNumber1: client.ClientsContactNumber1,
    ClientsContactNumber2: client.ClientsContactNumber2,
    ClientsEmail: client.ClientsEmail,
    Pincode: client.Pincode,
    Zone: client.Zone,
    _id: client._id,
    ClientImage: client.ClientImage,
  }));
  return (
    <>
      <Header />
      {selected === null || dataForTable.length > 0 ? (
        <>
          <div className="col-md-12 m-auto ">
            <Button
              className="col-md-3 mt-3"
              style={{ marginLeft: "5px" }}
              href="/ClientsInfo"
            >
              Manage Clients
            </Button>
          </div>
          <div className="containerPadding">
            <DataTable
              columns={columns}
           
              data={dataForTable}
              fixedHeader
              pagination
              highlightOnHover
              selectableRowsHighlight
              subHeaderAlign="left"
              dense
              customStyles={customStyles}
              onRowClicked={handleSelected}
            />
          </div>{" "}
        </>
      ) : (
        <>
          <div className="row containerPadding m-auto">
            <div className="col-md-3">
              <ArrowCircleLeftIcon
                onClick={() => setSelected(null)}
                className="col-md-9"
                style={{ color: "#068FFF" }}
              />
            </div>
            <div className="containerPadding mt-3 card">
              <div className="row ">
                <img
                  variant="top"
                  src={`http://api.srimagicprintz.com/ClientImage/${selectedItem?.ClientImage}`}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                />

                <div className="col-md-6 m-auto">
                  <p>
                    <span className="clr">Name:</span>{" "}
                    {selectedItem?.clientsName}
                  </p>
                  <p>
                    <span className="clr">Client Business Name :</span>{" "}
                    {selectedItem?.ClientBusinessName}
                  </p>
                  <p>
                    <span className="clr">Email: </span>
                    {selectedItem?.ClientsEmail}
                  </p>
                  <p>
                    <span className="clr"> Contact Number:</span>{" "}
                    {selectedItem?.ClientsContactNumber1}
                  </p>
                  <p>
                    <span className="clr"> Alternative Number</span>{" "}
                    {selectedItem?.ClientsContactNumber2}
                  </p>
                  <p>
                    <span className="clr">Address:</span>{" "}
                    {selectedItem?.ClientAddress}
                  </p>
                  <p>
                    <span className="clr">Pincode:</span>{" "}
                    {selectedItem?.Pincode}
                  </p>
                  <p>
                    <span className="clr">Zone:</span> {selectedItem?.Zone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
