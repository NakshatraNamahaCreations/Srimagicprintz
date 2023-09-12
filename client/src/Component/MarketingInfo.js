import Header from "./Header";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";

import "react-data-table-component-extensions/dist/index.css";
export default function MarketingInfo() {
  const [saveDate, setSaveDate] = useState(false);
  const [shedule, setShedule] = useState(false);
  const [sheduledDate, setSheduledDate] = useState(false);

  const creatMeeting = () => {
    setShedule(!shedule);
  };
  const handleSaveDate = () => {
    setSaveDate(sheduledDate);
  };

  return (
    <>
      <Header />
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
                src="https://pbs.twimg.com/media/EwM0fRbVcAEUISG.jpg:large"
                alt=""
              />
            </div>
            <div className="col-md-4">
              <p>
                <span className="clr">Category :</span>
                <span>Nike</span>
              </p>
              <p>
                <span className="clr">Name :</span> <span>Ram Prasad</span>{" "}
              </p>
              <p>
                <span className="clr">Number :</span> <span>5643278134</span>
              </p>
              <p>
                <span className="clr">City :</span>
                <span>Bangalore south</span>
              </p>
              <p>
                {" "}
                <span className="clr">Pincode :</span>
                <span>453623</span>
              </p>
              <span>Meeting Sheduled at : {saveDate}</span>
            </div>
            <Button className="col-md-4 m-1 c_W" onClick={creatMeeting}>
              <VideoCallIcon />
              New meeting
            </Button>
            <Button className="col-md-4 m-1 c_W" href="/Marketingshedule">
              schedule meeting
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
                        onChange={(e) => setSheduledDate(e.target.value)}
                      />
                    </label>
                  </span>{" "}
                  <span onClick={handleSaveDate}>Select Date</span>
                </p>
              </Card>
            </div>{" "}
          </div>
          {/* <div className="col-md-6 text-end ">
            <div className="col-md-12 m-auto">
              <div className="row m-auto">
                <span className="col-md-12 m-auto">Share link to Clients</span>
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
          </div> */}
        </div>
      </>
    </>
  );
}
