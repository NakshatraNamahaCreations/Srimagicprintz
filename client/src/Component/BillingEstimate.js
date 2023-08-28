import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function BillingEstimate() {
  return (
    <>
      {" "}
      <Header />
      <div className="row   m-auto containerPadding">
        <div className="col-md-1">
          <a href="/Billingquote">
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>
        <div className="row">
          <Form.Group className="col-md-3 ">
            <Form.Label>Add Rate</Form.Label>
            <Form.Control value={"245"} />
          </Form.Group>{" "}
          <Form.Group className="col-md-3">
            <Form.Label>Add Amount</Form.Label>
            <Form.Control value={"245"} />
          </Form.Group>{" "}
        </div>
        <div className="containerPadding mt-3">
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
          <Button className="col-md-1  m-auto" href="/Estimate">
            Add
          </Button>
        </div>
      </div>
    </>
  );
}

export default BillingEstimate;
