import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";
import DataTable from "react-data-table-component";
// import { ColorRing } from "react-loader-spinner";

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
  const [loading, setLoading] = useState(true);
  const [clientID, setClientID] = useState();
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
    } finally {
      setLoading(false);
    }
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

  const handleEdit = (client) => {
    setClientID(client);
    setSelected(true);
  };
  return (
    <>
      <Header />
      {!selected ? (
        <>
          <div className="col-md-11 m-auto ">
            <Button
              className="col-md-3 mt-3  c_W"
              style={{ marginLeft: "5px", color: "white" }}
              href="/ClientsInfo"
            >
              Manage Clients
            </Button>
          </div>

          <div className="row containerPadding">
            <table className="col-md-11 m-auto">
              <thead className="t-c">
                <tr>
                  <th className="th_s p-1 ">SI.No.</th>
                  <th className="th_s p-1 ">Client Name</th>{" "}
                  <th className="th_s p-1 ">Client Business Name </th>
                  <th className="th_s p-1 ">Contact Number</th>
                  <th className="th_s p-1 ">Pincode</th>
                  {/* <th className="th_s p-1 ">Installation Rate</th> */}
                  <th className="th_s p-1 "> Date</th>
                  <th className="th_s p-1 ">Action</th>
                </tr>
              </thead>

              <tbody>
                {addClients?.map((item, index) => {
                  return (
                    <tr className="tr_C" key={item._id}>
                      <td className="td_S poppinfnt p-1">{index + 1}</td>
                      <td className="td_S poppinfnt p-1">
                        {item?.clientsName}
                      </td>
                      <td className="td_S poppinfnt p-1">
                        {item?.clientsBrand}
                      </td>
                      <td className="td_S poppinfnt p-1">
                        {item?.ClientsContactNumber1}
                      </td>
                      <td className="td_S poppinfnt p-1">{item?.Pincode}</td>
                      {/* <td className="td_S poppinfnt p-1">{item?.InstallationRate}</td> */}
                      <td className="td_S poppinfnt p-1">
                        {item?.createdAt
                          ? new Date(item.createdAt).toISOString().slice(0, 10)
                          : ""}
                      </td>

                      <td className="td_S ">
                        <span
                          variant="info "
                          onClick={() => {
                            handleEdit(item);
                          }}
                          style={{ cursor: "pointer", color: "blue" }}
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
                  src={`http://api.srimagicprintz.com/ClientImage/${clientID?.ClientImage}`}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                />

                <div className="col-md-6 m-auto">
                  <p>
                    <span className="clr">Name:</span> {clientID?.clientsName}
                  </p>
                  <p>
                    <span className="clr">Client Business Name :</span>{" "}
                    {clientID?.ClientBusinessName}
                  </p>
                  <p>
                    <span className="clr">Email: </span>
                    {clientID?.ClientsEmail}
                  </p>
                  <p>
                    <span className="clr"> Contact Number:</span>{" "}
                    {clientID?.ClientsContactNumber1}
                  </p>
                  <p>
                    <span className="clr"> Alternative Number</span>{" "}
                    {clientID?.ClientsContactNumber2}
                  </p>
                  <p>
                    <span className="clr">Address:</span>{" "}
                    {clientID?.ClientAddress}
                  </p>
                  <p>
                    <span className="clr">Pincode:</span> {clientID?.Pincode}
                  </p>
                  <p>
                    <span className="clr">Zone:</span> {clientID?.Zone}
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
