import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Estimate() {
  const [recceData, setRecceData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idd = searchParams.get("idd");
  const [ClientInfo, setClientInfo] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [productionRates, setProductionRates] = useState([]);
  const [transportationRates, setTransportationRates] = useState([]);
  const [selectrecceStatus, setSelectRecceStatus] = useState(null);
  const [FilteredEstimateData, setFilteredEstimateData] = useState();

  const [ProductionCost, setProductionCost] = useState([]);
  const [InstallationCost, setInstallationCost] = useState([]);
  const [transportationCost, settransportationCost] = useState([]);
  const [Sft, setSft] = useState([]);
  const [Amount, setAmount] = useState([]);
  // let Amount = 0;
  let TotalAmount = 0;
  let TotalAmountWithGST = 0;
  // let Sft = 0;
  // let ProductionCost = 0;
  // let InstallationCost = 0;
  // let transportationCost = 0;
  let brandName;
  let desiredClient;
  const outletIds = [];
  let innerIndexs = [];
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
  }, []);

  const filterData = (selectedRecceStatus) => {
    const filteredData = recceData.flatMap((recceItem) => {
      return recceItem.outletName.filter((outlet) => {
        switch (selectedRecceStatus) {
          case "RecceCompleted":
            return outlet.RecceStatus === "Completed";
          case "DesignCompleted":
            return outlet.Designstatus === "Completed";
          case "PrintingCompleted":
            return outlet.printingStatus === "Completed";
          case "fabricationCompleted":
            return (
              outlet.OutlateFabricationNeed === "Yes" &&
              outlet.fabricationstatus === "Completed"
            );
          case "InstalationCompleted":
            return (
              outlet.OutlateFabricationDeliveryType === "Go to installation" &&
              outlet.installationSTatus === "Completed"
            );
          default:
            return true;
        }
      });
    });

    setFilteredEstimateData(filteredData);
  };

  useEffect(() => {
    filterData(selectrecceStatus);
  }, [selectrecceStatus]);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
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
        "http://api.srimagicprintz.com/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const [QuantityIndex, setQuantityIndex] = useState(null);
  const handleFieldChange = (e, innerIndex, fieldName) => {
    const value = e.target.value;

    switch (fieldName) {
      case "Quantity":
        const updatedQuantity = [...quantity];
        updatedQuantity[innerIndex] = value;
        setQuantity(updatedQuantity);
        setQuantityIndex(innerIndex);
        break;
      case "Productionrates":
        const updatedProductionRates = [...productionRates];
        updatedProductionRates[innerIndex] = value;
        setProductionRates(updatedProductionRates);
        break;
      case "transportationrate":
        const updatedTransportationRates = [...transportationRates];
        updatedTransportationRates[innerIndex] = value;
        setTransportationRates(updatedTransportationRates);
        break;
      default:
        break;
    }
  };

  const gstRates = [5, 12, 18, 28];

  let GrandTotal = 0;
  let Rof = 0;
  const [selectedGSTRate, setSelectedGSTRate] = useState(0);

  const calculateGSTAmount = (totalAmount, gstRate) => {
    return (totalAmount * gstRate) / 100;
  };

  const handleGSTRateChange = (e) => {
    const rate = parseInt(e.target.value);
    setSelectedGSTRate(rate);
  };

  const handleSaveQuotation = async (filteredOutletId, innerIndex) => {
    try {
      const config = {
        url: "/quotation",
        baseURL: "http://api.srimagicprintz.com/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          No_Quantity: quantity,
          SFT: Sft,
          ProductionRate: productionRates,
          ProductionCost: ProductionCost,
          transportationcost: transportationCost,
          InstallationRate: brandName?.InstallationRate,
          InstallationCost: InstallationCost,
          transportationRate: transportationRates,
          ROF: Rof,
          Amount: Amount,
          TotalAmount: TotalAmount,
          GST: selectedGSTRate,
          GSTAmount: TotalAmountWithGST,
          GrandTotal: GrandTotal,
          ReeceId: idd,
          outletid: filteredOutletId,
          rowIdentifier: innerIndex,
        },
      };

      const response = await axios(config);
      if (response.status === 200) {
        alert("Successfully saved");
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log(Amount)
  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="col-md-1">
          <a href="/Billing">
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>
        <div className="col-md-5">
          <Form.Select
            as="select"
            value={selectrecceStatus}
            onChange={(e) => {
              const selectedValue = e.target.value;
              console.log(selectedValue, "selectedValue");
              if (selectedValue !== "Choose...") {
                setSelectRecceStatus(selectedValue);
              }
            }}
          >
            <option>Choose...</option>
            <option value="RecceCompleted">Recce</option>
            <option value="DesignCompleted">Design</option>
            <option value="PrintingCompleted">Printing</option>
            <option value="fabricationCompleted">Fabrication</option>
            <option value="InstalationCompleted">Instalation</option>
          </Form.Select>
        </div>
        <div className="containerPadding mt-3 shadow p-3 mb-5 bg-white rounded">
          <div className="row containerPadding">
            <div className="col-md-6 ">
              <img
                width={"200px"}
                height={"100px"}
                src="../Assests/images.jpg"
                alt=""
              />
            </div>
            <h4 className="col-md-6">Estimate</h4>
          </div>

          <Table bordered>
            <thead>
              <tr className="text-center">
                <th className="thstyle">SI. NO.</th>
                <th className="thstyle">Client Name </th>
                <th className="thstyle">Material </th>
                <th className="thstyle">Height</th>
                <th className="thstyle">Width</th>
                <th className="thstyle">Quantity</th>{" "}
                <th className="thstyle">TSFT</th>
                <th className="thstyle">Production Rate</th>{" "}
                <th className="thstyle">Production Cost</th>
                <th className="thstyle">Installation Rate</th>{" "}
                <th className="thstyle">Installation Cost</th>
                <th className="thstyle">Transportation Rate</th>{" "}
                <th className="thstyle">Transportation Cost</th>
                <th className="thstyle">Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <>
                {FilteredEstimateData?.map((filteredOutlet, innerIndex) => {
                  outletIds.push(filteredOutlet._id);
                  innerIndexs.push(innerIndex);
                  recceData.map((recceItem, recceIndex) => {
                    recceItem?.outletName?.filter((outlet) => {
                      desiredClient = ClientInfo?.client?.find(
                        (client) => client._id === recceItem.BrandId
                      );

                      if (outlet._id === filteredOutlet._id) {
                        brandName = desiredClient;
                      }
                    });
                  });
                  setSft(
                    parseInt(filteredOutlet?.height) *
                      parseInt(filteredOutlet?.width) *
                      Number(quantity[innerIndex] || 0)
                  );

                  setProductionCost(
                    Sft * Number(productionRates[innerIndex] || 0)
                  );
                  setInstallationCost(
                    Sft * Number(brandName?.InstallationRate || 0)
                  );
                  settransportationCost(
                    Sft * Number(transportationRates[innerIndex] || 0)
                  );

                  setAmount(
                    Number(ProductionCost) +
                      Number(InstallationCost) +
                      Number(transportationCost)
                  );
                  TotalAmount += Amount;

                  let GSTAmount = calculateGSTAmount(
                    TotalAmount,
                    selectedGSTRate
                  );

                  TotalAmountWithGST = TotalAmount + GSTAmount;

                  GrandTotal += TotalAmountWithGST;
                  Rof = Math.round(GrandTotal);

                  // return (
                  //   <tr key={innerIndex}>
                  //     <td className="thstyle">{innerIndex + 1}</td>
                  //     <td className="thstyle">{brandName?.clientsBrand}</td>
                  //     <td className="thstyle">{filteredOutlet?.category}</td>
                  //     <td className="thstyle">
                  //       {filteredOutlet?.height}
                  //       {filteredOutlet?.unit}
                  //     </td>
                  //     <td className="thstyle">
                  //       {filteredOutlet?.width}
                  //       {filteredOutlet?.unit}
                  //     </td>
                  //     <td className="thstyle">
                  //       <Form.Control
                  //         className="col-md-5"
                  //         value={quantity[innerIndex]}
                  //         onChange={(e) =>
                  //           handleFieldChange(e, innerIndex, "Quantity")
                  //         }
                  //         placeholder="Quantity"
                  //         type="text"
                  //       />
                  //     </td>
                  //     <td className="thstyle">{Sft}</td>{" "}
                  //     <td className="thstyle">
                  //       <Form.Control
                  //         className="col-md-5"
                  //         value={productionRates[innerIndex]}
                  //         onChange={(e) =>
                  //           handleFieldChange(e, innerIndex, "Productionrates")
                  //         }
                  //         placeholder="Production Rate"
                  //         type="text"
                  //       />
                  //     </td>
                  //     <td className="thstyle">{ProductionCost}</td>
                  //     <td className="thstyle">
                  //       {desiredClient?.InstallationRate}
                  //     </td>
                  //     <td className="thstyle">{InstallationCost}</td>
                  //     <td className="thstyle">
                  //       <Form.Control
                  //         className="col-md-5"
                  //         value={transportationRates[innerIndex]}
                  //         onChange={(e) =>
                  //           handleFieldChange(
                  //             e,
                  //             innerIndex,
                  //             "transportationrate"
                  //           )
                  //         }
                  //         placeholder="Transportation Rate"
                  //         type="text"
                  //       />
                  //     </td>
                  //     <td className="thstyle">{transportationCost}</td>
                  //     <td className="thstyle">
                  //       {" "}
                  //       {Amount.toLocaleString("en-IN", {
                  //         style: "currency",
                  //         currency: "INR",
                  //       })}
                  //     </td>
                  //   </tr>
                  // );
                })}
                <tr>
                  <td colSpan={"12"}></td>
                  <td>Total Amount</td>
                  <td>
                    {TotalAmount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td colSpan={"12"}></td>
                  <td>
                    GST @{" "}
                    <select
                      value={selectedGSTRate}
                      onChange={handleGSTRateChange}
                    >
                      {gstRates?.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}%
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{selectedGSTRate}</td>
                </tr>

                <tr>
                  <td colSpan={"12"}></td>
                  <td>rof</td>
                  <td>{Rof}</td>
                </tr>
                <tr>
                  <td colSpan={"12"}></td>
                  <td>Grand Total</td>
                  <td>{GrandTotal}</td>
                </tr>
              </>
            </tbody>
          </Table>
        </div>
        <div className="row mt-3">
          <div className="col-md-2">
            <Button href="/invoice" className="m-2 text-white">
              Invoice
            </Button>
          </div>
          <div className="col-md-6">
            <Button
              onClick={() => handleSaveQuotation(outletIds, innerIndexs)}
              className="m-2"
            >
              Save Quotation
            </Button>
            <Button href={`/BillingEstimate?id=${idd}`} className="m-2">
              Modify Quotation
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
