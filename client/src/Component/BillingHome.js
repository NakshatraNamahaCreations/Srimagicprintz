import React from "react";
import Button from "react-bootstrap/esm/Button";
import Header from "./Header";

import Table from "react-bootstrap/esm/Table";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Billing() {
  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <div>
          <ArrowCircleLeftIcon style={{ color: "#068FFF", fontSize: "35px" }} />
        </div>
        <div className="table-container mt-4 containerPadding">
          <Table bordered className="col-md-12 ">
            <thead>
              <tr className="text-center">
                <th>Client Name</th>
                <th>Business Name</th>
                <th>Client Contact</th>
                <th>Board</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Zone</th>
                <th>Pincode</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ram Prasad</td>
                <td>Nike</td>
                <td>
                  <span>6473829153</span>
                  <span>5637298012</span>
                </td>
                <td>Backlite Board With Tube light(single sides)</td>
                <td>Vinayl</td>
                <td>10</td>
                <td style={{ padding: "15px" }}>12 Sq.Ft</td>
                <td>324/Sq.Ft</td>
                <td>South</td>
                <td>435672</td>
                <td>2,40,125.00</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="row m-auto text-center">
          <div className="col-md-7 m-auto">
            <Button className=" me-3">Estimate Calculated</Button>

            <Button>Invoice</Button>
          </div>
        </div>
      </div>
    </>
  );
}
