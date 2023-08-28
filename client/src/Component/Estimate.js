import { React, useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ShareIcon from "@mui/icons-material/Share";
function Estimate() {
  return (
    <>
      {" "}
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="col-md-1">
          <a href="/BillingEstimate">
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>

        <div className="containerPadding mt-3 shadow p-3 mb-5 bg-white rounded">
          <div className="row containerPadding">
            <div className="col-md-6 ">
              <img
                width={"200px"}
                height={"50px"}
                src="http://localhost:3000/Assests/images.jpg"
                alt=""
              />
            </div>
            <h6 className="col-md-6">Estimate</h6>
          </div>

          <Table bordered>
            <thead>
              <tr className="text-center">
                <th className="thstyle">SI. NO.</th>
                <th className="thstyle">Material </th>
                <th className="thstyle">Height</th>
                <th className="thstyle">Width</th>
                <th className="thstyle">Quantity</th>
                <th className="thstyle">TSFT</th>
                <th className="thstyle">Rate</th>
                <th className="thstyle">Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>1</td>
                <td>Vinyl+Lamination</td>
                <td>3</td>
                <td>5</td>
                <td>3</td>
                <td>57</td>
                <td>342</td>
                <td>54</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Vinyl+Lamination</td>
                <td>3</td>
                <td>5</td>
                <td>3</td>
                <td>57</td>
                <td>34</td>
                <td>234</td>
              </tr>
              <tr>
                <td colSpan={"6"}></td>
                <td>Total Amount</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={"6"}></td>
                <td>CGST @9%</td>
                <td>234</td>
              </tr>
              <tr>
                <td colSpan={"6"}></td>
                <td>SGST @9%</td>
                <td>234</td>
              </tr>
              <tr>
                <td colSpan={"6"}></td>
                <td>rof</td>
                <td>234</td>
              </tr>
              <tr>
                <td colSpan={"6"}></td>
                <td>Grand Total</td>
                <td>234</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="row mt-3">
          <div className="col-md-7">
            <Button href="/BillingEstimate" className="m-2">
              Modify
            </Button>
            <Button href="/Estiamtecalculation" className="m-2">
              Estimate
            </Button>
          </div>

          <div className="col-md-4">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <span className="col-md-6"> Download Estimate</span>
                  <div className="col-md-6">
                    <DownloadForOfflineIcon
                      style={{ color: "#068FFF", fontSize: "35px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <p className="col-md-6"> Download Estimate</p>
                  <div className="col-md-6">
                    <ShareIcon style={{ color: "#068FFF", fontSize: "35px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Estimate;
