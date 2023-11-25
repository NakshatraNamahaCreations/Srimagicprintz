import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ShareIcon from "@mui/icons-material/Share";

import axios from "axios";
import { useLocation } from "react-router-dom";

function Estimate() {
  const [recceData1, setRecceData1] = useState([]);
  const [OutletDoneData, setOutletDoneData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idd = searchParams.get("idd");
  const [ClientInfo, setClientInfo] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [productionRates, setProductionRates] = useState([]);
  const [transportationRates, setTransportationRates] = useState([]);
  const [InstallationRates, setInstallationRates] = useState([]);
  const [selectrecceStatus, setSelectRecceStatus] = useState(null);
  const [FilteredEstimateData, setFilteredEstimateData] = useState();
  const [QuotationData, setQuotationData] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  let TotalAmount = 0;
  let TotalAmountWithGST = 0;
  let Sft = [];
  let Amount = [];
  let ProductionCost = [];
  let InstallationCost = [];
  let transportationCost = [];
  let brandName;
  let desiredClient;
  const outletIds = [];
  let innerIndexs = [];
  useEffect(() => {
    getAllRecce();
    getAllClientsInfo();
    getQuotation();
    getOuletById();
    getAllVendorInfo();
  }, []);
  const getOuletById = async () => {
    try {
      const res = await axios.get(
        `http://api.srimagicprintz.com/api/getoutletboarddatabyrecceid/${idd}`
      );
      if (res.status === 200) {
        setOutletDoneData(res?.data?.outletBoard);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://api.srimagicprintz.com/api/Vendor/vendorInfo/getvendorinfo"
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
  const filterData = (selectedRecceStatus) => {
    const filteredData = recceData1.flatMap((recceItem) => {
      return recceItem.outletName.filter((outlet) => {
        switch (selectedRecceStatus) {
          case "Recce":
            return outlet.RecceStatus === "Completed";
          case "Design":
            return outlet.Designstatus === "Completed";
          case "Printing":
            return outlet.printingStatus === "Completed";
          case "Fabrication":
            return (
              outlet.OutlateFabricationNeed === "Yes" &&
              outlet.fabricationstatus === "Completed"
            );
          case "Instalation":
            return (
              outlet.OutlateFabricationDeliveryType === "Go to installation" &&
              outlet.installationSTatus === "Completed"
            );
          default:
            return true;
        }
      });
    });

    if (
      recceData1
        .flatMap((ele) => ele.outletName.length)
        .every((length) => length === filteredData.length)
    ) {
      setFilteredEstimateData(filteredData);
    }
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
        let RecceID = res?.data?.RecceData?.filter((ele) => ele?._id === idd);

        setRecceData1(RecceID);
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
      case "InstalationRates":
        const updateinstaltionRate = [...InstallationRates];
        updateinstaltionRate[innerIndex] = value;
        setInstallationRates(updateinstaltionRate);
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

  const getQuotation = async () => {
    try {
      const res = await axios.get("http://api.srimagicprintz.com/api/getquotation");
      if (res.status === 200) {
        let quotation = res.data.data;

        setQuotationData(quotation);
      }
    } catch (err) {
      console.error(err);
    }
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
          InstallationRate: InstallationRates,
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
        alert(`Quotation for  ${selectrecceStatus} Saved Successfully `);

        window.location.assign(
          `/BillingEstimate?id=${idd}&type=${selectrecceStatus}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleNumeric = (e) => {
    const isNumeric = /^[0-9\b]+$/.test(e.key);
    if (!isNumeric) {
      e.preventDefault();
    }
  };

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

              if (selectedValue !== "Choose...") {
                setSelectRecceStatus(selectedValue);
              }
            }}
          >
            <option>Choose...</option>
            <option value="Recce">Recce</option>
            <option value="Design">Design</option>
            <option value="Printing">Printing</option>
            <option value="Fabrication">Fabrication</option>
            <option value="Instalation">Instalation</option>
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
                <th className="thstyle poppinfnt ">SI. NO.</th>
                <th className="thstyle poppinfnt ">Client Name </th>
                <th className="thstyle poppinfnt ">Material </th>
                <th className="thstyle poppinfnt ">Height</th>
                <th className="thstyle poppinfnt ">Width</th>
                <th className="thstyle poppinfnt ">Quantity</th>{" "}
                <th className="thstyle poppinfnt ">TSFT</th>
                <th className="thstyle poppinfnt ">Production Rate</th>{" "}
                <th className="thstyle poppinfnt ">Production Cost</th>
                <th className="thstyle poppinfnt ">Installation Rate</th>{" "}
                <th className="thstyle poppinfnt ">Installation Cost</th>
                <th className="thstyle poppinfnt ">Transportation Rate</th>{" "}
                <th className="thstyle poppinfnt ">Transportation Cost</th>
                <th className="thstyle poppinfnt ">Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <>
                {FilteredEstimateData?.map((filteredOutlet, innerIndex) => {
                  outletIds.push(filteredOutlet._id);
                  innerIndexs.push(innerIndex);
                  recceData1.map((recceItem, recceIndex) => {
                    recceItem?.outletName?.filter((outlet) => {
                      desiredClient = ClientInfo?.client?.find(
                        (client) => client._id === recceItem.BrandId
                      );

                      if (outlet._id === filteredOutlet._id) {
                        brandName = desiredClient;
                      }
                    });
                  });

                  Sft.push(
                    Number(filteredOutlet?.height) *
                      Number(filteredOutlet?.width) *
                      Number(quantity[innerIndex] || 0)
                  );
                  ProductionCost = Sft.map((sft, index) => {
                    return (
                      Number(sft) * Number(productionRates[innerIndex] || 0)
                    );
                  });

                  InstallationCost = Sft.map((sft, index) => {
                    return (
                      Number(sft) * Number(InstallationRates[innerIndex] || 0)
                    );
                  });

                  transportationCost = Sft.map((sft, index) => {
                    return (
                      Number(sft) * Number(transportationRates[innerIndex] || 0)
                    );
                  });

                  Amount = Sft.map((sft, index) => {
                    const productionCost = Number(ProductionCost[index] || 0);
                    const installationCost = Number(
                      InstallationCost[index] || 0
                    );
                    const TransportationCost = Number(
                      transportationCost[index] || 0
                    );

                    return (
                      Number(productionCost) +
                      Number(installationCost) +
                      Number(TransportationCost)
                    );
                  });

                  TotalAmount = Amount.reduce((acc, value) => acc + value, 0);

                  let GSTAmount = calculateGSTAmount(
                    TotalAmount,
                    selectedGSTRate
                  );

                  let TotalAmountWithGST = TotalAmount + GSTAmount;

                  GrandTotal += TotalAmountWithGST;
                  Rof = Math.round(GrandTotal);
                  // VendorData.map((ele)=>ele._id)
                  const selectedVendorId = filteredOutlet?.vendor;
                  const vendor = VendorData?.find(
                    (ele) => ele?._id === selectedVendorId
                  );

                  const isMatchingCondition =
                    OutletDoneData?.vendorId === vendor?._id &&
                    OutletDoneData.outletObejctId === filteredOutlet._id &&
                    OutletDoneData.outletRecceIdId === idd;
                  return (
                    <tr key={innerIndex}>
                      <td className="thstyle poppinfnt ">{innerIndex + 1}</td>
                      <td className="thstyle poppinfnt ">
                        {brandName?.clientsBrand}
                      </td>
                      <td className="thstyle poppinfnt ">
                        {filteredOutlet?.category}
                      </td>
                      <td className="thstyle poppinfnt ">
                        {filteredOutlet?.height}
                        {filteredOutlet?.unit}
                      </td>
                      <td className="thstyle poppinfnt ">
                        {filteredOutlet?.width}
                        {filteredOutlet?.unit}
                      </td>
                      <td className="thstyle poppinfnt ">
                        <Form.Control
                          className="col-md-5"
                          value={quantity[innerIndex]}
                          onKeyPress={(e) => handleNumeric(e)}
                          onChange={(e) =>
                            handleFieldChange(e, innerIndex, "Quantity")
                          }
                          placeholder="Quantity"
                          type="text"
                        />
                      </td>
                      <td className="thstyle poppinfnt ">
                        {Sft[innerIndex].toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>{" "}
                      <td className="thstyle poppinfnt ">
                        <Form.Control
                          className="col-md-5"
                          value={productionRates[innerIndex]}
                          onChange={(e) =>
                            handleFieldChange(e, innerIndex, "Productionrates")
                          }
                          onKeyPress={(e) => handleNumeric(e)}
                          placeholder="Production Rate"
                          type="text"
                        />
                      </td>
                      <td className="thstyle poppinfnt ">
                        {ProductionCost[innerIndex].toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                      <td className="thstyle poppinfnt ">
                        <Form.Control
                          className="col-md-5"
                          value={transportationRates[innerIndex]}
                          onChange={(e) =>
                            handleFieldChange(e, innerIndex, "InstalationRates")
                          }
                          onKeyPress={(e) => handleNumeric(e)}
                          placeholder="Installation Rate"
                          type="text"
                        />
                      </td>
                      <td className="thstyle poppinfnt ">
                        {InstallationCost[innerIndex].toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                      <td className="thstyle poppinfnt ">
                        <Form.Control
                          className="col-md-5"
                          value={transportationRates[innerIndex]}
                          onChange={(e) =>
                            handleFieldChange(
                              e,
                              innerIndex,
                              "transportationrate"
                            )
                          }
                          onKeyPress={(e) => handleNumeric(e)}
                          placeholder="Transportation Rate"
                          type="text"
                        />
                      </td>
                      <td className="thstyle poppinfnt ">
                        {transportationCost[innerIndex].toLocaleString(
                          "en-IN",
                          {
                            style: "currency",
                            currency: "INR",
                          }
                        )}
                      </td>
                      <td className="thstyle poppinfnt ">
                        {" "}
                        {Amount[innerIndex].toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">Total Amount</td>
                  <td className="thstyle poppinfnt bold">
                    {TotalAmount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="thstyle poppinfnt bold" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">
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
                  <td className="thstyle poppinfnt bold">{selectedGSTRate}</td>
                </tr>

                <tr>
                  <td className="thstyle poppinfnt bold" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">Rof</td>
                  <td className="thstyle poppinfnt bold">
                    {Rof.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="thstyle poppinfnt bold" colSpan={"12"}></td>
                  <td className="thstyle poppinfnt bold">Grand Total</td>
                  <td className="thstyle poppinfnt bold">
                    {GrandTotal.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
              </>
            </tbody>
          </Table>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <Button
              onClick={() => handleSaveQuotation(outletIds, innerIndexs)}
              className="m-2"
            >
              Save Quotation
            </Button>

            <Button
              href={`/BillingEstimate?id=${idd}&type=${selectrecceStatus}`}
              className="m-2"
            >
              Modify Quotation
            </Button>
          </div>
          {/* <div className="col-md-4">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Estimate;
