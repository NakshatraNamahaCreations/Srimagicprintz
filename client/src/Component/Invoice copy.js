import React from "react";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

export default function Invoice() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idd = searchParams.get("id");
  const [ClientInfo, setClientInfo] = useState([]);
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
  const [vendordata, setVendorData] = useState([]);
  const [recceData, setRecceData] = useState([]);
  const [QuotationData, setQuotationData] = useState([]);
  const [OutletDoneData, setOutletDoneData] = useState([]);
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getQuotation();
    getOuletById();
    getAllVendorInfo();
  }, []);
  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://admin.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
      );

      if (response.status === 200) {
        let vendors = response.data.vendors;
        setVendorData(vendors);
      } else {
        alert("Unable to fetch data");
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };
  const getOuletById = async () => {
    try {
      const res = await axios.get(
        `http://admin.srimagicprintz.com/api/getoutletboarddatabyrecceid/${idd}`
      );
      if (res.status === 200) {
        setOutletDoneData(res?.data?.outletBoard);
      }
    } catch (err) {
      alert(err);
    }
  };
  const getQuotation = async () => {
    try {
      const res = await axios.get("http://admin.srimagicprintz.com/api/getquotation");
      if (res.status === 200) {
        let quotation = res.data.data;
        let filtered = quotation.filter((ele) => ele.ReeceId === idd);
        setQuotationData(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://admin.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        let recceData = res.data.RecceData.filter((ele) => ele._id === idd);
        setRecceData(recceData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://admin.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const desiredClient = ClientInfo?.client?.find((client) =>
    recceData.map((ele) => client._id === ele.BrandId)
  );
  console.log(desiredClient, "desiredClient");

  let TotalAmount = 0;
  let selectedGSTRate = 0;
  let Rof = 0;
  let GrandTotal = 0;

  return (
    <>
      {" "}
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="col-md-1">
          <a href="/Estimate">
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
              height={"100px"}
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
              <span>{desiredClient?.Pincode}</span>
            </p>
            <p className="m-auto p_style">
              <span>Dated .:</span>
              <span>
                {QuotationData.flatMap((ele) =>
                  !ele.updatedAt
                    ? ""
                    : moment(ele.updatedAt).format("DD MMMM YYYY")
                )}
              </span>
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
              <span className="ml-4">Sri Magic Printz</span>
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
              <span className="ml-4">Karnataka</span>
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
              <span className="ml-4">{desiredClient?.clientsBrand}</span>
            </p>
            <p className="m-auto p_style">
              <span>Address : </span>
              <span className="ml-4">{desiredClient?.ClientAddress}</span>
            </p>
            <p className="m-auto p_style">
              <span>GSTIN NO :</span>
              <span className="ml-4">29GGGGG1314R9Z6.14</span>
            </p>
            <p className="m-auto p_style">
              <span>State :</span>
              <span className="ml-4">Karnataka</span>
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
              {QuotationData?.flatMap((filteredOutlet, innerIndex) => {
                // Assuming these variables are defined within the scope
                let No_Quantity = filteredOutlet?.No_Quantity;
                let TSFT = filteredOutlet.SFT;
                let Amount = filteredOutlet?.Amount;
                let InstallationRate = filteredOutlet?.InstallationRate;
                let InstallationCost = filteredOutlet?.InstallationCost;
                let ProductionRate = filteredOutlet?.ProductionRate;
                let ProductionCost = filteredOutlet?.ProductionCost;
                let transportationRate = filteredOutlet?.transportationRate;
                let transportationcost = filteredOutlet?.transportationcost;
                TotalAmount = filteredOutlet?.TotalAmount;
                selectedGSTRate = filteredOutlet?.GST;
                let Rof = filteredOutlet?.ROF;
                GrandTotal = filteredOutlet?.GrandTotal;

                // Remove the extra 'return' statement here
                return filteredOutlet?.outletid?.map((item, outletIndex) => {
                  return recceData?.flatMap((receeitem) =>
                    receeitem?.outletName
                      ?.filter((ele) => ele?._id === item)
                      ?.map((outlet) => {
                        const selectedVendorId = outlet?.vendor;
                        const vendor = vendordata?.find(
                          (ele) => ele?._id === selectedVendorId
                        );
                        const isMatchingCondition =
                          OutletDoneData?.vendorId === vendor?._id &&
                          OutletDoneData.outletObejctId === outlet._id &&
                          OutletDoneData.outletRecceIdId === receeitem._id;

                        return (
                          <tr key={innerIndex}>
                            {outletIndex === 0 ? (
                              <>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                >
                                  {innerIndex + 1}
                                </td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                >
                                  {receeitem?.BrandName}
                                </td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                >
                                  Annexure A
                                </td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                >
                                  Production
                                </td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                >
                                  342362722
                                </td>
                              </>
                            ) : null}
                            <td>A4</td>
                            <td>
                              {isMatchingCondition && OutletDoneData?.category}
                            </td>
                            <td>
                              {isMatchingCondition &&
                                OutletDoneData?.unitsOfMeasurment}
                            </td>
                            {/* <td>3245.00 Sq.Ft</td> */}

                            <td>{TSFT[outletIndex]}/Sq.Ft</td>
                            <td>{Amount[outletIndex]}</td>
                            <td>{selectedGSTRate}</td>
                            <td></td>
                            <td>{outlet.OutletAddress}</td>
                            {outletIndex === 0 ? (
                              <>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                ></td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                ></td>
                                <td
                                  rowSpan={filteredOutlet.outletid.length * 4}
                                ></td>
                              </>
                            ) : null}
                          </tr>
                        );
                      })
                  );
                });
              })}

              <tr>
                <td></td>
                <td className="b-text">Sub Total</td>
                <td></td>
                <td></td>
                <td className="b-text">{TotalAmount}</td>
              </tr>

              <tr>
                <td colSpan={"9"} className="text-center b-text">
                  {" "}
                  Total
                </td>
                <td colSpan={"1"} className="b-text ">
                  {" "}
                  {TotalAmount}
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
                  {GrandTotal}
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
