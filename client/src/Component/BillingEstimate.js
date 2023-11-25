import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
function BillingEstimate() {
  const [recceData, setRecceData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const selectedStatus = searchParams.get("type");
  const [RecceId, setRecceId] = useState(null);
  useEffect(() => {
    getAllRecce();
    getQuotation();
  }, []);
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "https://admin.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        let recceData = res.data.RecceData.filter((ele) => ele._id === id);
        setRecceData(recceData);
        setRecceId(recceData.flatMap((ele) => ele._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [QuotationData, setQuotationData] = useState([]);
  const getQuotation = async () => {
    try {
      const res = await axios.get("https://admin.srimagicprintz.com/api/getquotation");
      if (res.status === 200) {
        let quotation = res.data.data;
        let filtered = quotation.filter((ele) => ele.ReeceId === id);
        setQuotationData(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };
  let TotalAmount = 0;
  let selectedGSTRate = 0;
  let Rof = 0;
  let GrandTotal = 0;

  const generatePDF = () => {
    const element = document.querySelector(".quotation");
    const table = element.querySelector("table");
    table.style.overflowX = "auto";
    table.style.width = "100%";
    table.style.maxWidth = "none";
    // table.style.border = "1px solid black";

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = table.offsetWidth;
      const pdfHeight = table.offsetHeight;
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save(`${selectedStatus} quotation.pdf`);
    });
  };
  return (
    <>
      <Header />
      <div className="row   m-auto containerPadding">
        <div className="col-md-1">
          <a href={`/Estimate?id=${id}`}>
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>
        {/* <div className="row">
          <Form.Group className="col-md-3 ">
            <Form.Label>Add Rate</Form.Label>
            <Form.Control value={"23"} />
          </Form.Group>{" "}
          <Form.Group className="col-md-3">
            <Form.Label>Add Amount</Form.Label>
            <Form.Control value={"245"} />
          </Form.Group>{" "}
        </div> */}
        <div className="containerPadding mt-3 quotation">
          <Table bordered className="table">
            <thead>
              <tr>
                <th colSpan="14">{selectedStatus} Quotation</th>
              </tr>
              <tr className="text-center">
                <th className="thstyle poppinfnt">SI. NO.</th>
                <th className="thstyle poppinfnt">Client Name </th>
                <th className="thstyle poppinfnt">Material </th>
                <th className="thstyle poppinfnt">Height</th>
                <th className="thstyle poppinfnt">Width</th>
                <th className="thstyle poppinfnt">Quantity</th>{" "}
                <th className="thstyle poppinfnt">TSFT</th>
                <th className="thstyle poppinfnt">Production Rate</th>{" "}
                <th className="thstyle poppinfnt">Production Cost</th>
                <th className="thstyle poppinfnt">Installation Rate</th>{" "}
                <th className="thstyle poppinfnt">Installation Cost</th>
                <th className="thstyle poppinfnt">Transportation Rate</th>{" "}
                <th className="thstyle poppinfnt">Transportation Cost</th>
                <th className="thstyle poppinfnt">Amount</th>
              </tr>
            </thead>
            <tbody className="text-center ">
              <>
                {QuotationData?.flatMap((filteredOutlet, innerIndex) => {
                  return filteredOutlet?.outletid?.map((item, outletIndex) => {
                    let No_Quantity = filteredOutlet?.No_Quantity[outletIndex];

                    let TSFT = filteredOutlet.SFT[outletIndex];
                    let Amount = filteredOutlet?.Amount[outletIndex];
                    let InstallationRate = filteredOutlet?.InstallationRate;
                    let InstallationCost =
                      filteredOutlet?.InstallationCost[outletIndex];
                    let ProductionRate =
                      filteredOutlet?.ProductionRate[outletIndex];
                    let ProductionCost =
                      filteredOutlet?.ProductionCost[outletIndex];
                    let transportationRate =
                      filteredOutlet?.transportationRate[outletIndex];
                    let transportationcost =
                      filteredOutlet?.transportationcost[outletIndex];
                    TotalAmount = filteredOutlet?.TotalAmount;

                    selectedGSTRate = filteredOutlet?.GST;
                    Rof = filteredOutlet?.ROF;

                    GrandTotal = Number(filteredOutlet?.GrandTotal.toFixed(2));

                    return recceData?.flatMap((receeitem) =>
                      receeitem?.outletName
                        ?.filter((ele) => ele?._id === item)
                        ?.map((outlet) => (
                          <tr key={innerIndex}>
                            <td className="thstyle poppinfnt">
                              {outletIndex + 1}
                            </td>
                            <td className="thstyle poppinfnt">
                              {receeitem?.BrandName}
                            </td>
                            <td className="thstyle poppinfnt">
                              {outlet?.category}
                            </td>
                            <td className="thstyle poppinfnt">
                              {outlet.height}
                            </td>
                            <td className="thstyle poppinfnt">
                              {outlet?.width}
                            </td>
                            <td className="thstyle poppinfnt">{No_Quantity}</td>
                            <td className="thstyle poppinfnt">{TSFT}</td>
                            <td className="thstyle poppinfnt">
                              {ProductionRate}
                            </td>{" "}
                            <td className="thstyle poppinfnt">
                              {ProductionCost}
                            </td>
                            <td className="thstyle poppinfnt">
                              {InstallationRate}
                            </td>{" "}
                            <td className="thstyle poppinfnt">
                              {InstallationCost}
                            </td>
                            <td className="thstyle poppinfnt">
                              {transportationRate}
                            </td>{" "}
                            <td className="thstyle poppinfnt">
                              {transportationcost}
                            </td>
                            <td className="thstyle poppinfnt">{Amount}</td>
                          </tr>
                        ))
                    );
                  });
                })}

                <tr>
                  <td className="thstyle poppinfnt" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">Total Amount</td>
                  <td className="thstyle poppinfnt bold">
                    {TotalAmount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="thstyle poppinfnt" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">GST @ </td>
                  <td className="thstyle poppinfnt bold">{selectedGSTRate}</td>
                </tr>

                <tr>
                  <td className="thstyle poppinfnt" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">rof</td>
                  <td className="thstyle poppinfnt bold">{Rof}</td>
                </tr>
                <tr>
                  <td className="thstyle poppinfnt" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">Grand Total</td>
                  <td className="thstyle poppinfnt bold">{GrandTotal}</td>
                </tr>
              </>
            </tbody>
          </Table>
        </div>

        <div className="col-md-6">
          <span className="poppinfnt"> Download Quotation</span>
          <DownloadForOfflineIcon
            onClick={generatePDF}
            style={{ color: "#068FFF", fontSize: "35px" }}
          />{" "}
        </div>
        <div className="col-md-2">
          <div className="col-md-2">
            <Button href={`/invoice?id=${RecceId}`} className="m-2 text-white">
              Invoice
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillingEstimate;
