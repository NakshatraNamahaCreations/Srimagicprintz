import { React, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

export default function Notification() {
  const [recceData, setRecceData] = useState([]);

  const [audio] = useState(new Audio("../audio/notification-alert.wav"));
  useEffect(() => {
    getAllRecce();
  }, []);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://admin.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        let recceData = res.data.RecceData;
        setRecceData(recceData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    recceData.forEach((recceitem) => {
      recceitem.outletName.forEach((outlet) => {
        const outletId = outlet._id;
        const updatedAt = new Date(outlet.updatedAt);
        const recceStatus = outlet.RecceStatus;

        if (recceStatus !== "Pending" && updatedAt <= new Date()) {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              text: `Notification for RecceStatus change to ${recceStatus} for ${outletId}`,
            },
          });
          audio.play();
        }
      });
    });
  }, [recceData, dispatch, audio]);

  return (
    <>
      <Header />
      <div className="row m-auto containerPadding">
        {/* <p className="row">
          <div className="col-md-1">
            <div className="row notification">
              <span>R</span>{" "}
            </div>
          </div>

          <span className="col-md-6">
            Ramesh has Completed Recce for 9 for itsy store
          </span>
        </p>
        <p className="row">
          {" "}
          <div className="col-md-1">
            <div className="row notification">
              <span>D</span>{" "}
            </div>
          </div>
          <span className="col-md-6">
            Royal mart stores board design in process
          </span>
        </p>
        <p className="row">
          {" "}
          <div className="col-md-1">
            <div className="row notification">
              <span>F</span>{" "}
            </div>
          </div>
          <span className="col-md-6">
            Ashapura hardware stores board fabrication has been approved
          </span>
        </p>
        <p className="row">
          {" "}
          <div className="col-md-1">
            <div className="row notification">
              <span>P</span>{" "}
            </div>
          </div>
          <span className="col-md-6">
            Royal mart stores board Printing in process
          </span>
        </p> */}
        <h2>Notifications</h2>
        <p>Listening for changes in RecceStatus...</p>
      </div>
    </>
  );
}
