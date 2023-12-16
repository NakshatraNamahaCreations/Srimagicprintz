import React, { useEffect, useState } from "react";
// import Header from "./layout/Header";
// import Sidebar from "./layout/Sidebar";
import { Link, useLocation } from "react-router-dom";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import { faB, faR } from "@fortawesome/free-solid-svg-icons";
import JobManagement from "./JobManagement";
import { Button } from "react-bootstrap";
// import Multiselect from "multiselect-react-dropdown";
// import "/MyComponent.css"

function Userrights() {
  // const admin = JSON.parse(sessionStorage.getItem("admin"));
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data, "data");
  const [selected, setSelected] = useState(0);
  const [home, setHome] = useState(false);

  const [CategoryMamgement, setcategoryMamgement] = useState(
    data?.categoryMamgement || false
  );
  const [Vendor, setvendor] = useState(data?.vendor || false);
  const [Client, setclient] = useState(data?.client || false);

  const [Jobmangements, setjobmangements] = useState(
    data?.jobmangement || false
  );
  const [Recce, setRecce] = useState(data?.Recce || false);

  const [Design, setDesign] = useState(data?.Design || false);

  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  const [Printing, setprinting] = useState(data?.printing || false);
  const [Fabrication, setfabrication] = useState(data?.fabrication || false);
  const [Marketing, setmarketing] = useState(data?.marketing || false);
  const [Trackjob, settrackjob] = useState(data?.trackjob || false);
  const [Installation, setinstallation] = useState(data?.installation || false);

  const [Reports, setreports] = useState(data?.reports || false);
  const [Billing, setbilling] = useState(data?.billing || false);
  const ApiURL = process.env.REACT_APP_API_URL;
  const ImageURL = process.env.REACT_APP_IMAGE_API_URL;
  const givenRights = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/giveaccess/${data._id}`,
        method: "post",
        baseURL: ApiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          userid: data._id,
          categoryMamgement: CategoryMamgement,
          vendor: Vendor,
          client: Client,
          jobmangement: Jobmangements,
          Recce: Recce,
          Design: Design,
          printing: Printing,
          fabrication: Fabrication,
          installation: Installation,
          marketing: Marketing,
          trackjob: Trackjob,
          reports: Reports,
          billing: Billing,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Added");
          window.location.assign("/Users");
          console.log(response.data);
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  return (
    <div className="row m-auto ">
      {/* <Header /> */}

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card mt-2">
            <div className="card-body">
              <div className="header-text1">
                User Rights For : {data?.displayname}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row   ">
        <div className="col-md-10"></div>
        <div className="col-md-2 ">
          <div className="row">
            <div className="col-md-6 p-0">
              <Link to="/Users">
                <Button
                  className=" p-1"
                  style={{ backgroundColor: "grey", color: "white",border:"none" }}
                  onClick={handleClick(1)}
                >
                  User Add
                </Button>
              </Link>
            </div>
            <div className="col-md-6 p-0">
              <Link to="/Users">
                <Button
                  // style={selected == 0 ? active : inactive}
                  onClick={handleClick(0)}
                  className="btn-primary-button p-1"
                >
                  User View
                </Button>
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="row mt-4 m-auto">
        <div className="col-md-9">
          <div className="card" style={{ padding: "10px 27px" }}>
            <div className="table-content ">Rights For Left Menu</div>

            <table class="table table-bordered mt-3">
              <body>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={home}
                      onChange={(e) => setHome(!home)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Overview</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={CategoryMamgement}
                      onChange={(e) => setcategoryMamgement(!CategoryMamgement)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Category Mamgement</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Vendor}
                      onChange={(e) => setvendor(!Vendor)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Vendor Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Client}
                      onChange={(e) => setclient(!Client)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Client Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Jobmangements}
                      s
                      onChange={(e) => setjobmangements(!Jobmangements)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Job Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Recce}
                      onChange={(e) => setRecce(!Recce)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Recce Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Design}
                      onChange={(e) => setDesign(!Design)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Design Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Printing}
                      onChange={(e) => setprinting(!Printing)}
                    />
                  </td>
                  <td style={{ width: "80%" }}> Printing Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Fabrication}
                      onChange={(e) => setfabrication(!Fabrication)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Fabrication Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Installation}
                      onChange={(e) => setinstallation(!Installation)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Installation Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Marketing}
                      onChange={(e) => setmarketing(!Marketing)}
                    />
                  </td>
                  <td>Marketing Management</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Trackjob}
                      onChange={(e) => settrackjob(!Trackjob)}
                    />
                  </td>
                  <td>Track job </td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Reports}
                      onChange={(e) => setreports(!Reports)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Reports Management</td>
                </tr>{" "}
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={Billing}
                      onChange={(e) => setbilling(!Billing)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Billing Management</td>
                </tr>
                <tr
                  className="user-tbale-body"
                  style={{ backgroundColor: "#eee" }}
                >
                  <td className="text-center"></td>
                  <td className="text-center">
                    <button
                      className="vhs-button p-1  col-md-8 "
                      onClick={givenRights}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </body>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userrights;
