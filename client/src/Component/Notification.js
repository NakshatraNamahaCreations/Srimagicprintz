import React from "react";
import Header from "./Header";
export default function Notification() {
  return (
    <>
      <Header />
      <div className="row m-auto containerPadding">
        <p className="row">
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
        </p>
      </div>
    </>
  );
}
