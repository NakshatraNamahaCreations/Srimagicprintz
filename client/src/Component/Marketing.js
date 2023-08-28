import { useEffect, useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import "react-data-table-component-extensions/dist/index.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";

import Card from "react-bootstrap/Card";
// getmarketingclient
export default function Marketing() {
  const [MAddClients, setMAddClients] = useState([]);
  const [getMclient, setgetMclient] = useState();
  useEffect(() => {
    getAllClientsInfo();
  });
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/marketingClient/marketingcliend/getmarketingclient"
      );
      if (res.status === 200) {
        setMAddClients(res.data.mclient);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(false);
  const handleEdit = (clinet) => {
    setgetMclient(clinet);
    setSelectedIndex(true);
  };
  const [togglelink, setToggleLink] = useState(false);
  const [saveDate, setSaveDate] = useState(false);
  const [shedule, setShedule] = useState(false);
  const [sheduledDate, setSheduledDate] = useState(false);
  const [update, setupdate] = useState(false);

  const creatMeeting = () => {
    setShedule(!shedule);
  };

  const updateShedule = async () => {
    try {
      const MclientId = getMclient._id;
      const config = {
        url: `/marketingClient/marketingcliend/updatemarketingdata/${MclientId}`,
        method: "put",
        baseURL: "http://api.srimagicprintz.com/api",
        headers: { "Content-Type": "application/json" },
        data: { msaveMeetingTime: sheduledDate },
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Successfully sheduled meeting");
        window.location.href = "/Marketingshedule";
      }
    } catch (err) {
      alert("Not able to add", err);
    }
  };
  return (
    <>
      <Header />
      {!selectedIndex ? (
        <>
          <div className="row  m-auto containerPadding">
            <div className="col-md-12 ">
              <Button
                className="col-md-2"
                href="/MarketingAddClient"
                style={{ marginRight: "5px", color: "white" }}
              >
                Add Clients
              </Button>
              <Button
                href="/Marketingshedule"
                style={{ color: "white" }}
                className="col-md-2 m-1"
              >
                Sheduled Meeting
              </Button>
            </div>
          </div>
          <div className="row  m-auto containerPadding">
            <div className=" row mt-3">
              <table>
                <thead className="t-c">
                  {/* <tr className="tr2">
                  <th className="p-2"></th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="SI.No"
                      value={searchSINO}
                      onChange={(e) => setSearchSINO(e.target.value)}
                      style={{ width: "25px" }}
                    />
                  </th>
                  <th className="p-2">
                    <input
                      className="col-md-1"
                      placeholder="client name"
                      value={SearchclientName}
                      onChange={(e) => setSearchclientName(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Shop name"
                      value={searchshopName}
                      onChange={(e) => setSearchshopName(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>

                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Contact"
                      value={searchcontactNumber}
                      onChange={(e) => setSearchcontactNumber(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Area"
                      value={searcharea}
                      onChange={(e) => setSearcharea(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>

                  <th>
                    <input
                      className="col-md-1"
                      placeholder=" city"
                      value={searchcity}
                      onChange={(e) => setSearchcity(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>

                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder=" pincode"
                      value={searchpincode}
                      onChange={(e) => setSearchpincode(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder=" zone"
                      value={searchzone}
                      onChange={(e) => setSearchzone(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>

                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Vendor name"
                      value={searchVendorName}
                      onChange={(e) => setSearchVendorName(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder=" date"
                      value={searchdate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th className="p-2">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder=" status"
                      value={searchdatastatus}
                      onChange={(e) => setSearchdatastatus(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th>
                     <input
                          className="col-md-1"
                          placeholder=" hight"
                          value={searchHight}
                          onChange={(e) => setsearchHight(e.target.value)}
                          style={{ width: "79px" }}
                        /> 
                  </th>
                  <th>
                  <input
                          className="col-md-1"
                          placeholder=" width"
                          value={searchwidth}
                          onChange={(e) => setsearchwidth(e.target.value)}
                          style={{ width: "79px" }}
                        /> 
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder=" category"
                      value={SearchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      style={{ width: "65px" }}
                    />
                  </th>
                  <th></th>
                </tr> */}
                  <tr>
                    {/* <th className="th_s "> */}
                    {/* <input
                      type="checkbox"
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    /> */}
                    {/* </th> */}
                    <th className="th_s ">SI.No.</th>
                    <th className="th_s ">Client Name</th>{" "}
                    <th className="th_s ">Business Name</th>
                    <th className="th_s ">Contact Number</th>
                    <th className="th_s ">Email</th>
                    <th className="th_s ">Pincode</th>
                    <th className="th_s ">Zone</th>
                    <th className="th_s ">Sales executive </th>
                    <th className="th_s "> Date</th>
                    <th className="th_s ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MAddClients?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="td_S ">{index + 1}</td>
                        <td className="td_S ">{item.mclientsName}</td>
                        <td className="td_S ">{item.mClientBusinessName}</td>
                        <td className="td_S ">{item.mClientsContactNumber1}</td>
                        <td className="td_S ">{item.mClientsEmail}</td>

                        <td className="td_S ">{item.mPincode}</td>
                        <td className="td_S"> {item.mZone}</td>
                        <td className="td_S ">{item.msaleexecutive}</td>

                        <td className="td_S ">
                          {item.createdAt
                            ? new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10)
                            : ""}
                        </td>

                        <td className="td_S ">
                          <span
                            variant="info "
                            onClick={() => {
                              handleEdit(item);
                            }}
                            style={{ cursor: "pointer", color: "skyblue" }}
                          >
                            View
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>{" "}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="row  m-auto">
            <div className="col-md-6">
              <div className="col-md-6 mt-3">
                <img
                  width={"50px"}
                  height={"50px"}
                  style={{
                    borderRadius: "100%",
                  }}
                  src={`http://api.srimagicprintz.com/marketing/${getMclient.mClientImage}`}
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <p>
                  <span className="clr me-2">Name :</span>{" "}
                  <span>{getMclient?.mclientsName}</span>{" "}
                </p>
                <p>
                  <span className="clr me-2">Sales Exicutive Name :</span>{" "}
                  <span>{getMclient?.msaleexecutive}</span>{" "}
                </p>
                <p>
                  <span className="clr me-2">Client Added Date :</span>{" "}
                  <span>
                    {getMclient?.createdAt
                      ? new Date(getMclient.createdAt)
                          .toISOString()
                          .slice(0, 10)
                      : ""}
                  </span>{" "}
                </p>
                <p>
                  <span className="clr me-2">Number :</span>{" "}
                  <span>{getMclient?.mClientsContactNumber1}</span>
                </p>
                <p>
                  <span className="clr me-2">Business Name :</span>
                  <span>{getMclient?.mClientBusinessName}</span>
                </p>
                <p>
                  {" "}
                  <span className="clr me-2">Email :</span>
                  <span>{getMclient?.mClientsEmail}</span>
                </p>
                <p>
                  {" "}
                  <span className="clr me-2">Pincode :</span>
                  <span>{getMclient?.mPincode}</span>
                </p>
                <p>
                  {" "}
                  <span className="clr me-2">Zone :</span>
                  <span>{getMclient?.mZone}</span>
                </p>
                <p>
                  {" "}
                  <span className="clr me-2">Address :</span>
                  <span>{getMclient?.mClientAddress}</span>
                </p>
                <span>Meeting Sheduled at : {saveDate}</span>
              </div>
              <Button className="col-md-4 m-1" onClick={creatMeeting}>
                <VideoCallIcon />
                New meeting
              </Button>
              <Button className="col-md-4 m-1" onClick={updateShedule}>
                Save meeting
              </Button>
              <Button href="/Marketingshedule" className="col-md-4 m-1">
                Sheduled Meeting
              </Button>
              <div className={!shedule ? " hide" : ""}>
                <Card className="col-md-6">
                  <p>
                    <LinkIcon />
                    Create a meeting for later
                  </p>
                  <p>
                    <AddIcon />
                    Start an instant meeting
                  </p>
                  <p>
                    <span>
                      <label>
                        <input
                          style={{ width: "20px", border: "none" }}
                          type="datetime-local"
                          value={sheduledDate}
                          onChange={(e) => setSheduledDate(e.target.value)}
                        />
                      </label>
                    </span>{" "}
                    {/* <span className="cureor" onClick={updateShedule}>
                      Save Meeting
                    </span> */}
                  </p>
                </Card>
              </div>{" "}
            </div>
            <div className="col-md-6 text-end ">
              <div className="col-md-12 m-auto">
                <div className="row m-auto">
                  <span className="col-md-12 m-auto">
                    Share link to Clients
                  </span>
                  <i
                    onClick={() => setToggleLink(!togglelink)}
                    className="col-md-12 "
                    style={{ fontSize: "20px", color: "#068fff" }}
                    class="fa-solid fa-share-nodes"
                  ></i>{" "}
                  {togglelink ? (
                    <Card className="col-md-12 m-auto containerPadding">
                      <div className="col-md-7 ">
                        <span className="col-md-4 m-auto">Copy the link</span>
                      </div>
                      <div className="col-md-3  text-center m-auto containerPadding">
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
                      <div className="row containerPadding ">
                        <input
                          value={"http://localhost:3000/RecceFile"}
                          className="col-md-8 m-auto"
                          style={{ borderRadius: "50px" }}
                        />

                        <button
                          className="col-md-2"
                          style={{
                            borderRadius: "50px",
                            position: "absolute",
                            right: "17%",
                          }}
                        >
                          copy
                        </button>
                      </div>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
