import React from "react";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice() {
  const generatePDF = () => {
    const element = document.querySelector(".Invoice");
    const table = element.querySelector("table");
    table.style.overflowX = "auto";
    table.style.width = "100%";
    table.style.maxWidth = "none";

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
      doc.save("invoice.pdf");
    });
  };

  return (
    <>
      {" "}
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="col-md-1">
          <a href="/Estiamtecalculation">
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>
      </div>
      <div className="row  m-auto Invoice">
        <div className="row">
          <div className="col-md-3">
            <img
              width={"200px"}
              height={"50px"}
              src="http://localhost:3000/Assests/images.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="row text-center">
          <h5 style={{ color: "grey" }}>Performa Invoice</h5>
        </div>
        <div
          className="row m-auto"
          style={{
            borderTop: "1px solid grey",
            borderBottom: "1px solid grey",
            padding: "10px",
          }}
        >
          <div className="col-md-9">
            <p className="m-auto p_style">
              <span>GSTIN NO .:</span>
              <span>29GGGGG1314R9Z6.14</span>
            </p>
            <p className="m-auto p_style">
              <span>Pan NO .:</span>
              <span>ABCTY1234D</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="m-auto p_style">
              <span>PI NO .:</span>
              <span>9302</span>
            </p>
            <p className="m-auto p_style">
              <span>Dated .:</span>
              <span>14/05/2023</span>
            </p>
            <p className="m-auto p_style">
              <span>Reference .:</span>
              <span>783492342</span>
            </p>
          </div>
        </div>
        <div
          className="row m-auto"
          style={{
            borderBottom: "1px solid grey",
          }}
        >
          <div className="col-md-6" style={{ padding: "10px" }}>
            <p className="m-auto p_style">
              <h6>Details of Bills To :</h6>
            </p>
            <p className="m-auto p_style">
              <span>Name :</span>
              <span className="ml-4">Lenskrat</span>
            </p>
            <p className="m-auto p_style">
              <span>Address :</span>
              <span className="ml-4">
                Katherguppe main road,Banshankari 3rd stage
              </span>
            </p>
            <p className="m-auto p_style">
              <span>GSTIN NO :</span>
              <span className="ml-4">29GGGGG1314R9Z6.14</span>
            </p>
            <p className="m-auto p_style">
              <span>State :</span>
              <span className="ml-4">Karnatake</span>
            </p>
          </div>
          <div
            className="col-md-6"
            style={{ borderLeft: "1px solid grey", padding: "10px" }}
          >
            <p className="m-auto p_style">
              <h6>Details of Ship To:</h6>
            </p>
            <p className="m-auto p_style">
              <span>Name :</span>
              <span className="ml-4">Lenskrat</span>
            </p>
            <p className="m-auto p_style">
              <span>Address : </span>
              <span className="ml-4">
                Katherguppe main road,Banshankari 3rd stage
              </span>
            </p>
            <p className="m-auto p_style">
              <span>GSTIN NO :</span>
              <span className="ml-4">29GGGGG1314R9Z6.14</span>
            </p>
            <p className="m-auto p_style">
              <span>State :</span>
              <span className="ml-4">Karnatake</span>
            </p>
          </div>
        </div>

        <div className="w-150">
          <Table bordered className="mt-3 table">
            <thead>
              <tr>
                <th>SI.NO</th>
                <th>Client Name</th>
                <th colSpan={"2"}>Particulars</th>
                <th>HSN/SAC Code</th>
                <th>Brand Codes</th>
                <th>Element</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>IGST@18%</th>
                <th>Billing detais with GST</th>
                <th>Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={"4"}>1</td>
                <td rowSpan={"4"}>Lenskrat</td>
                <td rowSpan={"4"}>Annexure A</td>
                <td rowSpan={"4"}>Production</td>
                <td rowSpan={"4"}>342362722</td>
                <td>A4</td>
                <td>Blacklit Board with tube lights(single side)</td>
                <td>3245.00 Sq.Ft</td>
                <td>374/Sq.Ft</td>
                <td>3,45,300.00</td>
                <td rowSpan={"8"}></td>
                <td rowSpan={"8"}></td>
                <td rowSpan={"8"}></td>
              </tr>
              <tr>
                <td>A3</td>
                <td>Blacklit Board with tube lights(single side)</td>
                <td>3245.00 Sq.Ft</td>
                <td>374/Sq.Ft</td>
                <td>3,45,300.00</td>
              </tr>
              <tr>
                <td>C1</td>
                <td>Blacklit Board with tube lights(single side)</td>
                <td>3245.00 Sq.Ft</td>
                <td>374/Sq.Ft</td>
                <td>3,45,300.00</td>
              </tr>
              <tr>
                <td></td>
                <td className="b-text">Sub Total</td>
                <td></td>
                <td></td>
                <td className="b-text">3,45,300.00</td>
              </tr>
              <tr>
                <td rowSpan={"4"}>1</td>
                <td rowSpan={"4"}>Lenskrat</td>
                <td rowSpan={"4"}>Annexure A</td>
                <td rowSpan={"4"}>Production</td>
                <td rowSpan={"4"}>342362722</td>
              </tr>
              <tr>
                <td>A3</td>
                <td>Blacklit Board with tube lights(single side)</td>
                <td>3245.00 Sq.Ft</td>
                <td>374/Sq.Ft</td>
                <td>3,45,300.00</td>
              </tr>
              <tr>
                <td>C1</td>
                <td>Blacklit Board with tube lights(single side)</td>
                <td>3245.00 Sq.Ft</td>
                <td>374/Sq.Ft</td>
                <td>3,45,300.00</td>
              </tr>
              <tr>
                <td></td>
                <td className="b-text">Sub Total</td>
                <td></td>
                <td></td>
                <td className="b-text">3,45,300.00</td>
              </tr>
              <tr>
                <td colSpan={"9"} className="text-center b-text">
                  {" "}
                  Total
                </td>
                <td colSpan={"1"} className="b-text ">
                  {" "}
                  3,45,300.00{" "}
                </td>
                <td colSpan={"3"} className="b-text ">
                  {" "}
                  3,45,300.00{" "}
                </td>
              </tr>
              <tr>
                <td colSpan={"9"} className="text-center">
                  {" "}
                </td>
                <td colSpan={"1"}> 0.93</td>
                <td colSpan={"3"}> </td>
              </tr>
              <tr>
                <td colSpan={"9"} className="text-center b-text ">
                  GrandTotal
                </td>

                <td colSpan={"4"} className="b-text ">
                  {" "}
                  3,45,300.00{" "}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row  m-auto containerPadding">
        <span className="col-md-2"> Download Invoice</span>
        <div className="col-md-1">
          <DownloadForOfflineIcon
            onClick={generatePDF}
            style={{ color: "#068FFF", fontSize: "35px" }}
          />
        </div>
      </div>
    </>
  );
}
