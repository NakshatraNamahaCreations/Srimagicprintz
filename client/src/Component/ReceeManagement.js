import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "react-data-table-component-extensions/dist/index.css";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx";
import axios from "axios";
import pptxgen from "pptxgenjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { saveAs } from "file-saver";
import HeightIcon from "@mui/icons-material/Height";
const ExcelJS = require("exceljs");

export default function ReceeManagement() {
  const ApiURL = process.env.REACT_APP_API_URL;

  const [selectedIndex, setSelectedIndex] = useState(false);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");

  const [recceexcel, setrecceexcel] = useState("");
  const [reccedata, setRecceData] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  // const [searchshopName, setSearchshopName] = useState("");
  // const [searcharea, setSearcharea] = useState("");
  // const [searchcity, setSearchcity] = useState("");
  // const [searchcontactNumber, setSearchcontactNumber] = useState("");
  // const [searchpincode, setSearchpincode] = useState("");
  // const [searchzone, setSearchzone] = useState("");
  // const [searchdate, setSearchDate] = useState("");
  // const [searchdatastatus, setSearchdatastatus] = useState("");
  // const [searchVendorName, setSearchVendorName] = useState("");
  // const [SearchclientName, setSearchclientName] = useState("");
  // const [searchSINO, setSearchSINO] = useState("");
  const [importXLSheet, setImportXLSheet] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState();
  const [getVendorName, setgetVendorName] = useState(null);
  const [CategoryData, setCategoryData] = useState();
  // const [selectedcategory, setselectedcategory] = useState("");
  // const [SearchCategory, setSearchCategory] = useState("");
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);

  const [selectedRecceItems1, setSelectedRecceItems1] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editrecce, setEditRecce] = useState(false);
  // const [Editarea, setEditArea] = useState("");
  // const [Editclient, setEditclient] = useState("");
  // const [Editshopname, setEditShopName] = useState("");
  // const [EditCity, setEditCity] = useState("");
  // const [EditContactNumber, setEditContactNumber] = useState("");
  // const [EditPincode, setEditPincode] = useState("");
  // const [EditZone, setEditZone] = useState("");
  // const [Editdatastatus, setEditdatastatus] = useState("");
  // const [Editreccehight, setEditreccehight] = useState("");
  // const [Editreccewidth, setEditreccewidth] = useState("");
  // const [EditrecceUnit, setEditrecceUnit] = useState("");

  const [editRecceData, setEditRecceData] = useState({});
  const [moreoption, setmoreoption] = useState(false);
  const [moreoption1, setmoreoption1] = useState(false);
  const [show, setShow] = useState(false);
  const [selectAction, setselectAction] = useState(false);
  const [selectAction1, setselectAction1] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [uploading, setUploading] = useState(false);
  const [outletNames, setOutletNames] = useState(null);
  const [designImages, setDesignImages] = useState("");

  const [SNo, setSNo] = useState();
  const [ShopName, setShopName] = useState();
  const [ClientName, setClientName] = useState();
  const [OutletContactNumber, setOutletContactNumber] = useState();
  const [OutletZone, setOutletZone] = useState();
  const [OutletCity, setOutletCity] = useState();
  const [FLBoard, setFLBoard] = useState();
  const [GSB, setGSB] = useState();
  const [Inshop, setInshop] = useState();
  const [Category, setCategory] = useState();
  const [height, setheight] = useState();
  const [unit, setunit] = useState();
  const [width, setwidth] = useState();
  const [vendor, setvendor] = useState();
  const [RecceStatus, setRecceStatus] = useState();
  const [State, setState] = useState();
  const [completedStatus, setcompletedStatus] = useState([]);
  const [pendingStatus, setpendingStatus] = useState([]);
  const [cancelledStatus, setcancelledStatus] = useState([]);
  const [proccesingStatus, setproccesingStatus] = useState([]);
  const [selctedVendor, setselctedVendor] = useState(null);
  const [ClientInfo, setClientInfo] = useState([]);
  const handleClose1 = () => setShow(false);
  const [data1, setdata1] = useState(0);
  const [OutletDoneData, setOutletDoneData] = useState([]);
  const [selectrecceStatus, setSelectRecceStatus] = useState(null);
  const [viewOutletBoards, setViewOutletBoard] = useState(false);
  const [viewOutletBoardsIdd, setViewOutletBoardIdd] = useState(null);

  useEffect(() => {
    getAllRecce();
    getAllVendorInfo();
    getAllCategory();
    getAllClientsInfo();
    getAllOutlets();
  }, []);
  useEffect(() => {
    getLengthOfStatus();
  }, [reccedata]);
  //http://localhost:8001/api
  const getAllOutlets = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/api/getalloutlets`);
      if (res.status === 200) {
        setOutletDoneData(res?.data?.outletData);
      }
    } catch (err) {
      // alert(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  const getAllVendorInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/Vendor/vendorInfo/getvendorinfo"
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
  useEffect(() => {
    setdata1(rowsDisplayed);
  }, [rowsPerPage1]);

  let rowsDisplayed = 0;

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage1(newRowsPerPage);

    rowsDisplayed = 0;
  };
  useEffect(() => {
    const filteredClients = () => {
      let results = [...reccedata];

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, results.length);
      const dataToDisplay = results.slice(startIndex, endIndex);
      setDisplayedData(dataToDisplay);
    };
    filteredClients();
  }, [reccedata, rowsPerPage]);

  useEffect(() => {
    if (recceexcel && importXLSheet.length === 0) {
      readFile();
    }
    handleImport();
  }, [recceexcel, importXLSheet]);

  function convertToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        let value = currentLine[j]
          ? currentLine[j].replace(/""/g, "").trim()
          : "";

        if (value.startsWith("{") && value.endsWith("}")) {
          try {
            const jsonValue = JSON.parse(value);
            obj[headers[j]] = jsonValue.VendorId;
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          obj[headers[j]] = value;
        }
      }
      result.push(obj);
    }
    return result;
  }
  const handleEdit = (vendor, action) => {
    setgetVendorName(vendor);
    setSelectedIndex({ action });
  };
  const handleOutletView = (idd) => {
    setViewOutletBoardIdd(idd);
    setViewOutletBoard(true);
  };
  const handleImport = async (outlateid) => {
    if (!outlateid) {
      return;
    }
    if (selectedRecceItems.length === 0) {
      alert("Please select at least one row before importing.");
    } else {
      if (filteredData.length > 0) {
        setUploading(true);
        try {
          const flattenOutletNames = (data) => {
            return data.reduce((acc, item) => {
              if (Array.isArray(item)) {
                return [...acc, ...flattenOutletNames(item)];
              }
              return [...acc, item];
            }, []);
          };

          const outletNames = flattenOutletNames(filteredData);

          const res = await axios.post(
            `http://localhost:8001/api/recce/recce/addreccesviaexcelesheet/${outlateid}`,
            { outletName: outletNames },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.status === 200) {
            toast.success("Outlet names updated successfully!");

            setOutletNames(outletNames);

            toast.success("Outlet names in recce updated successfully!");
            setrecceexcel(null);
            setDisplayedData();
            window.location.reload();
          } else {
            toast.error(
              "Failed to update outlet names. Please check the data."
            );

            const errorMessage =
              res.data && res.data.message
                ? res.data.message
                : "Error occurred while updating outlet names.";
            toast.error(errorMessage);
          }
        } catch (error) {
          toast.error("Error occurred while updating outlet names.");
        } finally {
          setUploading(false);
        }
      }
    }
  };

  function readFile() {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      try {
        const jsonData = convertToJson(data);

        const flattenedData = jsonData.flat();

        setDisplayedData(flattenedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsBinaryString(recceexcel);
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setDesignImages(files);
  };

  const handleVendorEdit = (recceid) => {
    const recceTobeedit = filteredData.find((recce) => recce._id === recceid);

    if (recceTobeedit) {
      setEditRecceData(recceTobeedit);
      setEditRecce(true);
      console.log(recceTobeedit, "editid");
    } else {
      alert("Recce not found for editing");
    }
  };

  const handleDownload = () => {
    if (!selectedRecceItems || selectedRecceItems.length === 0) {
      alert("Please select at least one record to export");
      return;
    } else {
      const pdf = new jsPDF();
      const tableColumn = [
        "SI.No",
        "Shop Name",
        "Client Name",
        "Job No",
        "Contact",
        "Address",
        "City",
        "Zone",
        "Date",
        "Status",
        "Height",
        "Width",
        "Category",
      ];

      let serialNumber = 0;
      let JobNob = 0;

      const tableData = selectedRecceItems.flatMap((outletId) =>
        displayedData
          ?.filter((recce) => recce?._id === outletId)
          .flatMap((recceItem) =>
            recceItem?.outletName.map((outlet) => {
              reccedata?.forEach((recceItem, recceIndex) => {
                recceItem?.outletName?.forEach((rece) => {
                  if (outletId === rece._id) {
                    JobNob = recceIndex + 1;
                  }
                });
              });

              let outletDimensions = findOutletDimensions(
                OutletDoneData,
                outlet._id
              );

              return {
                siNo: ++serialNumber,
                shopName: outlet.ShopName,
                Clientname: recceItem.BrandName,
                jobNo: `JOB ${JobNob}`,
                contact: outlet.OutletContactNumber,
                address: outlet.OutletAddress,
                city: outlet.OutletCity,
                zone: outlet.OutletZone,
                date: outlet.createdAt
                  ? new Date(outlet.createdAt).toISOString().slice(0, 10)
                  : "",
                status: outlet.RecceStatus,
                height: outletDimensions.height,
                width: outletDimensions.width,
                Category: outletDimensions.category,
              };
            })
          )
      );

      function findOutletDimensions(OutletDoneData, outletId) {
        const outletDimensions = OutletDoneData.find((ele) =>
          ele?.outletShopId.includes(outletId)
        );

        return {
          height: outletDimensions ? outletDimensions.height : "",
          width: outletDimensions ? outletDimensions.width : "",
          category: outletDimensions ? outletDimensions.category : "",
        };
      }

      pdf.autoTable({
        head: [tableColumn],
        body: tableData.map((item) => Object.values(item)),
        startY: 20,
        styles: {
          fontSize: 6,
        },
        columnStyles: {
          0: { cellWidth: 10 },
        },
        bodyStyles: { borderColor: "black", border: "1px solid black" },
      });

      pdf.save("exported_data.pdf");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://localhost:8001/api/Product/category/getcategory"
      );
      if (res.ok) {
        const data = await res.json();

        const categoriesArray = Object.values(data.category);
        setCategoryData(categoriesArray);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleToggleSelect = (itemId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems?.includes(itemId)) {
      updatedSelectedRecceItems = selectedRecceItems.filter(
        (id) => id !== itemId
      );
    } else {
      updatedSelectedRecceItems = [...selectedRecceItems, itemId];
    }

    setSelectedRecceItems(updatedSelectedRecceItems);
    setmoreoption(updatedSelectedRecceItems.length > 0);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedRecceItems(displayedData?.map((item) => item?._id));
    } else {
      setSelectedRecceItems([]);
    }

    setmoreoption(!selectAll);
  };
  async function deleteRecce(recceId) {
    try {
      const response = await axios.delete(
        `${ApiURL}/recce/recce/deletereccedata/${recceId}`
      );
      if (response.status === 200) {
        alert("Recce deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Error while deleting recce:", error);
    }
  }

  const handleDeleteSelectedRecceItems = async () => {
    if (selectedRecceItems.length === 0) {
      return;
    }

    if (window.confirm(`Are you sure you want to delete  clients data ?`)) {
      try {
        for (const recceId of selectedRecceItems) {
          await deleteRecce(recceId);
        }

        setSelectedRecceItems([]);
      } catch (error) {
        console.error("Error while deleting recce items:", error);
      }
    }
  };

  const handleAssignVendor = async () => {
    setShow(true);
  };

  const selectedv = vendordata?.find((vendor) => vendor._id === selctedVendor);

  const handleUpdate = async () => {
    try {
      for (const outletid of selectedRecceItems1) {
        const formdata = new FormData();

        if (selectrecceStatus !== undefined && selectrecceStatus !== null) {
          formdata.append("RecceStatus", selectrecceStatus);
        }

        const config = {
          url: `/recce/recce/updatereccedata/${getVendorName._id}/${outletid}`,
          method: "put",
          baseURL: "http://localhost:8001/api",
          headers: { "Content-Type": "multipart/form-data" },
          data: formdata,
        };

        const res = await axios(config);

        if (res.status === 200) {
          alert("Successfully updated outlet");
          console.log(res.data);
          window.location.reload();
        } else {
          console.error("Received non-200 status code:", res.status);
        }
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert(
        "Not able to update: " +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  async function AssignVendor(selectedVendor) {
    try {
      const updatedRecceData = [];

      for (const recceId of selectedRecceItems1) {
        const filteredData = reccedata.map((ele) =>
          ele.outletName.filter((item) => {
            if (recceId === item._id) {
              item.vendor = vendordata._id;
            }
            return item;
          })
        );

        updatedRecceData.push(...filteredData);

        const config = {
          url: `/api/recce/recce/outletupdate/${recceId}/${selectedv?._id}`,
          baseURL: "http://localhost:8001",
          method: "put",
          headers: { "Content-Type": "application/json" },
          data: { reccedata: updatedRecceData },
        };

        const res = await axios(config);

        if (res.status === 200) {
          alert(`Recce Assign to ${selectedv.VendorFirstName}`);
          window.location.reload();
        }
      }
    } catch (error) {
      alert("Error while updating outlet:", error.message);
    }
  }

  const updateVendor = async () => {
    if (window.confirm(`Are you sure you want to update clients data?`)) {
      try {
        await AssignVendor(selectedv);
      } catch (error) {
        console.error("Error while updating recce items:", error);
      }
    }
  };

  async function deleteOutlet(recceId) {
    try {
      const response = await axios.delete(
        `${ApiURL}/recce/recce/recceoudelet/${recceId}`
      );

      if (response.status === 200) {
        alert("Outlet deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Error while deleting outlet:", error.message);
    }
  }

  const handleDeleteSelectedOutlet = async () => {
    if (selectedRecceItems1.length === 0) {
      return;
    }

    if (window.confirm(`Are you sure you want to delete  clients data ?`)) {
      try {
        for (const recceId of selectedRecceItems1) {
          await deleteOutlet(recceId);
        }

        setSelectedRecceItems1([]);
      } catch (error) {
        console.error("Error while deleting recce items:", error);
      }
    }
  };
  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const handleClearDateFilters = () => {
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const filterDate = (data) => {
    return data?.filter((item) => {
      const createdAtDate = moment(item.createdAt, "YYYY-MM-DD");
      const startDate = filterStartDate
        ? moment(filterStartDate, "YYYY-MM-DD")
        : null;
      const endDate = filterEndDate
        ? moment(filterEndDate, "YYYY-MM-DD")
        : null;

      if (startDate && !createdAtDate.isSameOrAfter(startDate)) {
        return false;
      }

      if (endDate && !createdAtDate.isSameOrBefore(endDate)) {
        return false;
      }

      return true;
    });
  };

  const filteredData = filterDate(displayedData);

  const filteredData1 = filteredData?.filter(
    (vendor) => vendor?._id === getVendorName?._id
  );

  const getLengthOfStatus = () => {
    const statusCounts = {
      completed: 0,
      pending: 0,
      cancelled: 0,
      processing: 0,
    };

    reccedata?.forEach((recceItem) => {
      const outletNameArray = recceItem?.outletName;

      if (Array.isArray(outletNameArray)) {
        outletNameArray?.forEach((outlet) => {
          if (outlet.RecceStatus?.includes("Pending")) {
            statusCounts.pending++;
          }
          if (outlet.RecceStatus?.includes("Cancelled")) {
            statusCounts.cancelled++;
          }
          if (
            outlet.RecceStatus?.includes("Completed") &&
            outlet.vendor !== null &&
            outlet.vendor !== undefined
          ) {
            statusCounts.completed++;
          }
          if (
            outlet.RecceStatus?.includes("Proccesing") &&
            outlet.vendor !== null &&
            outlet.vendor !== undefined
          ) {
            statusCounts.processing++;
          }
        });
      }
    });

    setcompletedStatus(statusCounts.completed);
    setpendingStatus(statusCounts.pending);
    setcancelledStatus(statusCounts.cancelled);
    setproccesingStatus(statusCounts.processing);
  };

  function convertToFeet(value, unit) {
    if (unit === "inch") {
      return Math.round(value / 12);
    } else if (unit === "Centimeter") {
      return Math.round(value * 0.0328084);
    } else if (unit === "Meter") {
      return Math.round(value * 3.28084);
    } else if (unit === "Feet") {
      return value;
    } else {
      console.error("Unknown unit: " + unit);
      return value;
    }
  }

  const Export = () => {
    const extractedData = [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Extracted Data");

    if (selectedRecceItems.length === 0 || filteredData.length === 0) {
      alert("Please import outlet or select brand");
      return;
    }

    try {
      for (const recceId of selectedRecceItems) {
        if (!recceId) {
          continue;
        }

        const recceData = filteredData.find((item) => item._id === recceId);

        if (!recceData) {
          alert("Recce data not found for selected item");
          continue;
        }

        recceData.outletName.forEach((outlet) => {
          if (recceData.outletName.length === 0) {
            throw new Error("Please import outlet");
          }

          if (outlet.RecceStatus?.includes("Completed")) {
            const OutletDoned = OutletDoneData.filter(
              (Ele) => Ele?.outletShopId === outlet._id
            );

            for (const outl of OutletDoned) {
              extractedData.push({
                "Outlate Name": outlet.ShopName || null,
                "Outlet Address": outlet.OutletAddress || null,
                "Outlet Contact Number": outlet.OutletContactNumber || null,
                "Board Type": outl.boardType,
                "GST Number": !outlet.GSTNumber
                  ? outl.gstNumber
                  : outlet.GSTNumber,
                "Media .": outl.category || null,
                "A Height": `${outl.height} ${outl.unitsOfMeasurment} ` || null,
                "A Width": `${outl.width} ${outl.unitsOfMeasurment} ` || null,
                "No.Quantity": outl.quantity || null,
                "R Height":
                  `${convertToFeet(
                    outl.height,
                    outl.unitsOfMeasurment
                  )} feet ` || null,
                "R Width":
                  `${convertToFeet(
                    outl.width,
                    outl.unitsOfMeasurment
                  )} feet ` || null,
              });
            }
          }
        });

        const headerRow = worksheet.addRow([
          "Outlate Name",
          "Outlet Address",
          "Outlet Contact Number",
          "Board Type",
          "GST Number",
          "Media .",
          "A Height",
          "A Width",
          "No.Quantity",
          "R Height",
          "R Width",
        ]);
        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
        worksheet.getColumn(5).width = 15;
        worksheet.getColumn(6).width = 35;
        worksheet.getColumn(7).width = 8;
        worksheet.getColumn(8).width = 8;
        worksheet.getColumn(9).width = 8;
        worksheet.getColumn(10).width = 8;

        extractedData.forEach((dataItem) => {
          const row = worksheet.addRow([
            dataItem["Outlate Name"],
            dataItem["Outlet Address"],
            dataItem["Outlet Contact Number"],
            dataItem["Board Type"],
            dataItem["GST Number"],
            dataItem["Media ."],
            dataItem["A Height"],
            dataItem["A Width"],
            dataItem["No.Quantity"],
            dataItem["R Height"],
            dataItem["R Width"],
          ]);
          row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
            if (colNumber <= 10) {
              cell.alignment = { wrapText: true };
            }
          });

          row.getCell(9).numFmt = "0.00";
          row.getCell(10).numFmt = "0.00";
        });

        headerRow.eachCell((cell) => {
          cell.alignment = { wrapText: true };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "74BDE2" },
          };
          cell.font = {
            size: 12,
          };
        });

        for (let i = 2; i <= worksheet.rowCount; i++) {
          worksheet.getRow(i).eachCell((cell) => {
            cell.font = {
              size: 10,
            };
          });
        }

        const lastRowNumber = worksheet.rowCount;
        for (let i = extractedData.length; i <= lastRowNumber; i++) {
          const cellA = worksheet.getCell(`A${i}`);
          const cellB = worksheet.getCell(`B${i}`);
          if (!cellA.isMerged) {
            worksheet.mergeCells(`A${i}:B${i}`);
          }
          if (!cellB.isMerged) {
            worksheet.mergeCells(`B${i}:C${i}`);
          }
        }
      }
      workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "actual.xlsx";
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })

        .catch((error) => {
          alert(error.message);
          console.error("Error creating Excel file:", error);
        });
    } catch (error) {
      alert("Please import outlate");
      console.error("Error in processing data:", error);
    }
  };

  const handlePPT = () => {
    const pptx = new pptxgen();
    console.log("Starting handlePPT");
    if (selectedRecceItems.length === 0 || filteredData.length === 0) {
      alert("Please import outlet or select a brand");
      return;
    }

    try {
      for (const recceId of selectedRecceItems) {
        if (!recceId) {
          continue;
        }

        const recceData = filteredData.find((item) => item._id === recceId);

        if (!recceData) {
          alert("Recce data not found for the selected item");
          continue;
        }

        for (const outlet of recceData.outletName) {
          if (outlet.length === 0) {
            alert("Please import outlet");
            continue;
          }

          if (outlet.RecceStatus?.includes("Completed")) {
            const OutletDoned = OutletDoneData.filter(
              (Ele) => Ele?.outletShopId === outlet._id
            );
            for (const outl of OutletDoned) {
              const width = outl.width || 1;
              const height = outl.height || 1;
              const rHeightInFeet = convertToFeet(
                height,
                outl.unitsOfMeasurment
              );
              const rWidthInFeet = convertToFeet(width, outl.unitsOfMeasurment);
              const media = outl.category || "";

              const slide = pptx.addSlide();

              slide.addText(`Outlet Name: ${outlet.ShopName}`, {
                x: 1,
                y: 0.3,
                w: "100%",
                fontSize: 12,
              });

              slide.addText(`Address: ${outlet.OutletAddress}`, {
                x: 1,
                y: 0.6,
                w: "100%",
                fontSize: 12,
              });
              const formattedDimensions = `H${Math.round(
                rHeightInFeet
              )}XW${Math.round(rWidthInFeet)}`;
              // const imageUrls = ["url1.jpg", "url2.jpg", "url3.jpg"];
              const imageWidth = "30%";

              const centerX = "35%";

              const centerY = "30%";

              let currentX = centerX;

              const fullImageUrl = `http://api.srimagicprintz.com/Outlet/${outl.ouletBannerImage}`;

              slide.addImage({
                path: fullImageUrl,
                x: currentX,
                y: centerY,
                w: imageWidth,
              });
              currentX = `+=35%`;

              slide.addText(formattedDimensions, {
                x: 1,
                y: "90%",
                w: "100%",
                fontSize: 12,
              });

              slide.addText(`Category: ${media}`, {
                x: 1,
                y: "95%",
                w: "100%",
                fontSize: 12,
                align: "left",
              });
            }
          }
        }

        pptx.write("blob").then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "presentation.pptx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
        // pptx.write("blob").then((blob) => {
        //   const url = window.URL.createObjectURL(blob);
        //   const a = document.createElement("a");
        //   a.style.display = "none";
        //   a.href = url;
        //   a.download = "presentation.pptx";
        //   document.body.appendChild(a);
        //   a.click();
        //   window.URL.revokeObjectURL(url);
        // });
      }
    } catch (err) {
      console.error("Error:", err);
      alert(`An error occurred: ${err.message}`);
    }
  };

  const handleEstimate = () => {
    const extractedData = [];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Extracted Data");
    const headerRow = worksheet.getRow(1);
    headerRow.height = 10 / 9;
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 35;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 35;
    worksheet.getColumn(7).width = 8;
    worksheet.getColumn(8).width = 8;
    worksheet.getColumn(9).width = 8;
    worksheet.getColumn(10).width = 8;
    worksheet.getColumn(11).width = 8;
    worksheet.getColumn(12).width = 8;
    worksheet.getColumn(13).width = 10;
    worksheet.getColumn(14).width = 10;
    worksheet.getColumn(15).width = 20;

    headerRow.eachCell({ includeEmpty: false }, (cell) => {
      cell.alignment = { wrapText: true };
    });
    if (selectedRecceItems.length === 0 || filteredData.length === 0) {
      alert("Please import outlet or select brand");
      return;
    }

    try {
      for (const recceId of selectedRecceItems) {
        if (!recceId) {
          continue;
        }

        const recceData = filteredData.find((item) => item._id === recceId);

        if (!recceData) {
          alert("Recce data not found for selected item");
          continue;
        }

        recceData.outletName.forEach((outlet) => {
          if (outlet.length === 0) {
            throw new Error("Please import outlet");
          }

          if (outlet.RecceStatus?.includes("Completed")) {
            const OutletDoned = OutletDoneData.filter(
              (Ele) => Ele?.outletShopId === outlet._id
            );
            for (const outl of OutletDoned) {
              const rHeightInFeet = convertToFeet(
                outl.height,
                outl.unitsOfMeasurment
              );
              const rWidthInFeet = convertToFeet(
                outl.width,
                outl.unitsOfMeasurment
              );
              extractedData.push({
                "Outlet Name": outlet.ShopName,
                "Outlet Address": outlet.OutletAddress,
                "Board Type": outl.boardType,
                "Outlet Contact Number": outlet.OutletContactNumber,
                "GST Number": !outlet.GSTNumber
                  ? outl.gstNumber
                  : outlet.GSTNumber,
                "Media .": outl.category,
                "GSB/inshop": outlet.GSB || outlet.Inshop,
                "No.Quantity": outl.quantity || 0,

                Height: rHeightInFeet || 0,
                Width: rWidthInFeet || 0,
                SFT: outlet.SFT,
                "Production Rate": outlet.ProductionRate,
                "Production Cost": outlet.ProductionCost,
                "Installation Rate": outlet.InstallationRate,
                "Installation Cost": outlet.InstallationCost,
                "transportation rate": outlet.transportationRate,
                "transportation cost": outlet.transportationcost,
                "Production Cost + Installation Cost + transportation cost":
                  0 + 18 + 0,
              });
            }
          }
        });

        const firstRow = extractedData.length + 1;
        const secondRow = firstRow + 1;
        const thirdRow = secondRow + 1;

        extractedData.push({
          "GST @18%": `M${firstRow}`,
          "Gross Amount": `M${secondRow}`,
          Rof: `M${thirdRow}`,

          "transportation rate": `O${firstRow}`,
          "transportation cost": `O${secondRow}`,
          "Production Cost + Installation Cost + transportation cost": `O${thirdRow}`,
        });

        const headerRow = worksheet.addRow([
          "Outlet Name",
          "Outlet Address",
          "Board Type",
          "Outlet Contact Number",
          "GST Number",
          "Media .",
          "GSB/inshop",
          "No.Quantity",
          "Height",
          "Width",
          "SFT",
          "Production Rate",
          "Production Cost",
          "Installation Rate",
          "Installation Cost",
          "transportation cost",
          "Production Cost + Installation Cost + transportation cost",
        ]);

        extractedData.forEach((dataItem) => {
          const row = worksheet.addRow([
            dataItem["Outlet Name"],
            dataItem["Outlet Address"],
            dataItem["Board Type"],
            dataItem["Outlet Contact Number"],
            dataItem["GST Number"],
            dataItem["Media ."],
            dataItem["GSB/inshop"],
            dataItem["No.Quantity"],
            dataItem["Height"],
            dataItem["Width"],
            dataItem["SFT"],
            dataItem["Production Rate"],
            dataItem["Production Cost"],
            dataItem["Installation Rate"],
            dataItem["Installation Cost"],
            dataItem["transportation cost"],
            dataItem[
              "Production Cost + Installation Cost + transportation cost"
            ],
          ]);
          row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
            if (colNumber <= 10) {
              cell.alignment = { wrapText: true };
            }
          });

          row.getCell(9).numFmt = "0.00";
          row.getCell(10).numFmt = "0.00";
        });

        headerRow.eachCell((cell) => {
          cell.alignment = { wrapText: true };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "74BDE2" },
          };
          cell.font = {
            size: 12,
          };
        });

        for (let i = 2; i <= worksheet.rowCount; i++) {
          worksheet.getRow(i).eachCell((cell) => {
            cell.font = {
              size: 10,
            };
          });
        }

        const lastRowNumber = worksheet.rowCount;
        for (let i = extractedData.length; i <= lastRowNumber; i++) {
          const cellA = worksheet.getCell(`A${i}`);
          const cellB = worksheet.getCell(`B${i}`);
          if (!cellA.isMerged) {
            worksheet.mergeCells(`A${i}:B${i}`);
          }
          if (!cellB.isMerged) {
            worksheet.mergeCells(`B${i}:C${i}`);
          }
        }
      }
      workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "estimate.xlsx";
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })

        .catch((error) => {
          alert(error.message);
          console.error("Error creating Excel file:", error);
        });
    } catch (error) {
      alert("Please import outlate");
      console.error("Error in processing data:", error);
    }
  };

  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/Client/clients/getallclient"
      );
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };

  const handleOutletToggleSelect = (item, outletId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems1?.includes(outletId)) {
      updatedSelectedRecceItems = selectedRecceItems1.filter(
        (id) => id !== outletId
      );
    } else {
      updatedSelectedRecceItems = [...selectedRecceItems1, outletId];
    }

    setSelectedRecceItems1(updatedSelectedRecceItems);
    setmoreoption1(updatedSelectedRecceItems.length > 0);
  };

  const handleOutletSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allOutletIds = reccedata.flatMap((item) =>
        item?.outletName.map((outlet) => outlet._id)
      );
      setSelectedRecceItems1(allOutletIds);
    } else {
      setSelectedRecceItems1([]);
    }

    setmoreoption1(!selectAll);
  };

  const [FilterStartDate1, setFilterStartDate1] = useState();
  const [FilterEndDate1, setFilterEndDate1] = useState();

  const handleClearDateFilters1 = () => {
    setFilterStartDate1("");
    setFilterEndDate1("");
  };
  const handleFilterEndDateChange1 = (event) => {
    setFilterEndDate1(event.target.value);
  };
  const handleFilterStartDateChange1 = (event) => {
    setFilterStartDate1(event.target.value);
  };

  const filterDateswise = (data) => {
    return data?.filter((item) => {
      const createdAtDate = moment(item.createdAt, "YYYY-MM-DD");
      const startDate = FilterStartDate1
        ? moment(FilterStartDate1, "YYYY-MM-DD")
        : null;
      const endDate = FilterEndDate1
        ? moment(FilterEndDate1, "YYYY-MM-DD")
        : null;

      if (startDate && !createdAtDate.isSameOrAfter(startDate)) {
        return false;
      }

      if (endDate && !createdAtDate.isSameOrBefore(endDate)) {
        return false;
      }

      return true;
    });
  };

  const filteredDate = filterDateswise(filteredData1);

  return (
    <>
      <Header />
      <div className="row m-auto containerPadding">
        <ToastContainer position="top-right" />

        {!selectedIndex ? (
          <div className="row m-auto containerPadding">
            <div className="row ">
              <div className="col-md-8">
                <div className="row">
                  <Button className="col-md-2 m-1 c_W" href="/Recceapi">
                    Add Recce
                  </Button>

                  <Button
                    className="col-md-2 btn btn-danger m-1"
                    onClick={handleDownload}
                    style={{ backgroundColor: "#a9042e", border: 0 }}
                  >
                    Download
                  </Button>
                  <Button
                    onClick={handlePPT}
                    className="col-md-1 btn btn-danger m-1"
                    style={{ backgroundColor: "#a9042e", border: 0 }}
                  >
                    PPT
                  </Button>
                  <Button
                    onClick={handleEstimate}
                    className="col-md-2 btn btn-danger m-1"
                    style={{ backgroundColor: "#a9042e", border: 0 }}
                  >
                    Estimate
                  </Button>
                  <button
                    className="col-md-2 btn btn-danger m-1"
                    onClick={Export}
                    style={{ backgroundColor: "#a9042e", border: 0 }}
                  >
                    Actual
                  </button>
                  <div className="col-md-2 ">
                    {moreoption ? (
                      <>
                        <p
                          className="mroe m-1"
                          onClick={() => setselectAction(!selectAction)}
                          style={{
                            border: "1px solid white",
                            width: "38px",
                            height: "38px",
                            textAlign: "center",
                            borderRadius: "100px",
                            backgroundColor: "#F5F5F5",
                          }}
                        >
                          <span className="text-center">
                            <MoreVertIcon />
                          </span>
                        </p>
                        {selectAction ? (
                          <div
                            style={{
                              position: "absolute",
                              zIndex: "100",
                              top: "21%",
                            }}
                          >
                            <Card
                              className="m-auto p-3"
                              style={{ width: "6rem" }}
                            >
                              <li onClick={handleDeleteSelectedRecceItems}>
                                <span style={{ color: "red" }}>Delete</span>
                              </li>
                            </Card>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row ">
                  <div className="col-md-6">
                    <Form.Label
                      className="btn btn-outline-danger"
                      style={{ borderColor: "#a9042e" }}
                      htmlFor="icon-button-file"
                    >
                      <input
                        className="col-md-3 p-0"
                        accept=".xlsx,.xls,.csv"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        disabled={selectedRecceItems?.length === 0}
                        onChange={(e) => {
                          setrecceexcel(e.target.files[0]);
                        }}
                      />
                      Import Excel
                    </Form.Label>
                  </div>
                  <div className="col-md-1">
                    {recceexcel && (
                      <Button
                        className="btn btn-danger"
                        style={{ backgroundColor: "#a9042e", border: 0 }}
                        onClick={() => handleImport(selectedRecceItems[0])}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Assign Recce </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="row">
                  <Col className="mb-3">
                    <Form.Label>Select Vendor</Form.Label>
                    <Form.Group
                      md="5"
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Select
                        value={selctedVendor}
                        onChange={(e) => setselctedVendor(e.target.value)}
                      >
                        <option disabled>Choose..</option>
                        {vendordata?.map((vendorele) => (
                          <option key={vendorele._id} value={vendorele._id}>
                            {vendorele?.VendorFirstName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateVendor}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="row m-auto mt-3">
              <Card
                className={`col-md-3 m-2 c_zoom ${"active1"}`}
                style={{ height: "125px" }}
              >
                <div className="row "></div>
                <div className="row m-auto">
                  <p
                    style={{
                      fontSize: "25px",
                      color: "green",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {completedStatus}
                  </p>
                  <p style={{ color: "black", textAlign: "center" }}>
                    Total Completed{" "}
                  </p>
                </div>
              </Card>
              <Card
                className={`col-md-3 m-2 c_zoom ${"active1"}`}
                style={{ height: "125px" }}
              >
                <div className="row "></div>
                <div className="row m-auto">
                  <p
                    style={{
                      fontSize: "25px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {pendingStatus}
                  </p>
                  <p style={{ color: "black", textAlign: "center" }}>
                    Total Pending{" "}
                  </p>
                </div>
              </Card>
              <Card
                className={`col-md-3 m-2 c_zoom ${"active1"}`}
                style={{ height: "125px" }}
              >
                <div className="row "></div>
                <div className={`row m-auto ${"active"}`}>
                  <p
                    style={{
                      fontSize: "25px",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {proccesingStatus}
                  </p>
                  <p style={{ color: "black", textAlign: "center" }}>
                    Total Processing{" "}
                  </p>
                </div>
              </Card>
              <Card
                className={`col-md-3 m-2 c_zoom ${"active1"}`}
                style={{ height: "125px" }}
              >
                <div className="row "></div>
                <div className="row m-auto">
                  <p
                    style={{
                      fontSize: "25px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {cancelledStatus}
                  </p>
                  <p style={{ color: "black", textAlign: "center" }}>
                    Total Cancelled
                  </p>
                </div>
              </Card>
            </div>
            <div className="row mt-3">
              <div className="col-md-2 ">
                <label className="col-md-6">
                  {displayedData?.length} of: {reccedata?.length}
                </label>
                <Form.Control
                  as="select"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={80}>80</option>
                  <option value={100}>100</option>
                  <option value={140}>140</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                  <option value={400}>400</option>
                  <option value={600}>600</option>
                  <option value={700}>700</option>
                  <option value={1000}>1000</option>
                  <option value={1500}>1500</option>
                  <option value={10000}>10000</option>
                </Form.Control>
              </div>

              <div className="col-md-6 float-end">
                <div className="row">
                  <label className="col-md-3  m-auto">Start Date:</label>
                  <label className="col-md-6 m-auto">End Date:</label>
                  <div className="col-md-5 ">
                    <Form.Control
                      type="date"
                      value={filterStartDate}
                      onChange={handleFilterStartDateChange}
                    />
                  </div>
                  <div className="col-md-5 ">
                    <Form.Control
                      type="date"
                      value={filterEndDate}
                      onChange={handleFilterEndDateChange}
                    />
                  </div>
                  <div className="col-md-2 ">
                    <Button onClick={handleClearDateFilters}>Clear</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" row mt-3">
              <table>
                <thead className="t-c">
                  <tr>
                    <th className="th_s poppinfnt p-2">
                      <input
                        type="checkbox"
                        style={{
                          width: "15px",
                          height: "15px",
                          marginRight: "5px",
                        }}
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    </th>
                    <th className="th_s poppinfnt p-2">SI.No.</th>
                    <th className="th_s poppinfnt p-2">Job.No.</th>
                    <th className="th_s poppinfnt p-2">Client Name </th>
                    <th className="th_s poppinfnt p-2">Contact Number</th>
                    <th className="th_s poppinfnt p-2"> Date</th>
                    <th className="th_s poppinfnt p-2">Action</th>
                    <th className="th_s poppinfnt p-2">Outlate</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData?.map((item, index) => {
                    const desiredClient = ClientInfo?.client?.find(
                      (client) => client._id === item.BrandId
                    );

                    return (
                      <tr key={item._id}>
                        <td className="td_S poppinfnt p-1">
                          <input
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            type="checkbox"
                            checked={selectedRecceItems?.includes(item._id)}
                            onChange={() => handleToggleSelect(item._id)}
                          />
                        </td>
                        <td className="td_S poppinfnt ">{index + 1}</td>
                        <td className="td_S poppinfnt ">Job {index + 1}</td>
                        <td className="td_S poppinfnt ">{item?.BrandName}</td>
                        <td className="td_S poppinfnt ">
                          {desiredClient?.ClientsContactNumber1}
                        </td>
                        <td className="td_S poppinfnt p-2 text-nowrap text-center">
                          {item.createdAt
                            ? new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10)
                            : ""}
                        </td>

                        <td className="td_S poppinfnt ">
                          <span
                            variant="info "
                            onClick={() => {
                              handleEdit(item, "details");
                            }}
                            style={{ cursor: "pointer", color: "skyblue" }}
                          >
                            Details
                          </span>
                        </td>
                        <td className="td_S poppinfnt ">
                          <span
                            variant="info "
                            onClick={() => {
                              handleEdit(item, "view");
                            }}
                            style={{ cursor: "pointer", color: "skyblue" }}
                          >
                            view
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="row  m-auto containerPadding">
            {editrecce ? (
              <>
                {/* <Form>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Area</Form.Label>

                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Area}
                        onChange={(e) => {
                          setEditArea(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ClientName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ClientName}
                        onChange={(e) => {
                          setEditclient(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ShopName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ShopName}
                        onChange={(e) => {
                          setEditShopName(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.City}
                        onChange={(e) => {
                          setEditCity(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>ContactNumber</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.ContactNumber}
                        onChange={(e) => {
                          setEditContactNumber(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Pincode}
                        onChange={(e) => {
                          setEditPincode(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Zone</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.Zone}
                        onChange={(e) => {
                          setEditZone(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>recceUnit</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.recceUnit}
                        onChange={(e) => {
                          setEditrecceUnit(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        defaultValue={editRecceData?.datastatus}
                        onChange={(e) => setEditdatastatus(e.target.value)}
                      >
                        <option>Choose Status...</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group className="row">
                    <Col className="col-md-4 mb-3">
                      <Form.Label>category</Form.Label>
                      <Form.Select
                        defaultValue={editRecceData?.category}
                        onChange={(e) => setselectedcategory(e.target.value)}
                      >
                        <option value="">Select..</option>
                        {CategoryData?.map((category) => (
                          <option
                            key={category._id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>reccewidth</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.reccewidth}
                        onChange={(e) => {
                          setEditreccewidth(e.target.value);
                        }}
                      />
                    </Col>
                    <Col className="col-md-4 mb-3">
                      <Form.Label>reccehight</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={editRecceData?.reccehight}
                        onChange={(e) => {
                          setEditreccehight(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Row>
                    <div className="col-md-3 mt-2">
                      <Form.Control
                        type="file"
                        name="designimages"
                        onChange={handleImageUpload}
                        multiple
                        className="col-md-3"
                      />
                    </div>
                  </Row>
                  <Button onClick={updateRecceData}>Update</Button>
                </Form> */}
              </>
            ) : (
              <>
                {selectedIndex.action === "details" ? (
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-1">
                        <ArrowCircleLeftIcon
                          onClick={(e) => setSelectedIndex(null)}
                          style={{ color: "#068FFF" }}
                        />{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="row"></div>

                      <p>
                        <span className="me-3 clr">Brand Name:</span>
                        <span className="me-3 ">
                          {getVendorName.BrandName || null}
                        </span>
                      </p>

                      <p className="col-md-8">
                        <span className="me-3 clr">Area :</span>{" "}
                        {getVendorName.Area}
                      </p>
                      <p>
                        <span className="me-3 clr">City :</span>{" "}
                        {getVendorName.City}
                      </p>
                      <p>
                        <span className="me-3 clr">Contact Number :</span>
                        {getVendorName.ContactNumber}
                      </p>
                      <p>
                        <span className="me-3 clr">Pincode :</span>
                        {getVendorName.Pincode}
                      </p>
                      <p>
                        <span className="me-3 clr">Zone :</span>
                        {getVendorName.Zone}
                      </p>
                      <p>
                        <span className="me-3 clr">createdAt :</span>
                        {getVendorName.createdAt
                          ? new Date(getVendorName.createdAt)
                              .toISOString()
                              .slice(0, 10)
                          : ""}
                      </p>

                      <p>
                        {/* <Button
                          className="m-2"
                          onClick={() => handleVendorEdit(getVendorName._id)}
                        >
                          Edit
                        </Button> */}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {viewOutletBoards ? (
                      <>
                        <div className="col-md-1 mb-3">
                          <ArrowCircleLeftIcon
                            onClick={() => setViewOutletBoard(false)}
                            style={{ color: "#068FFF", cursor: "pointer" }}
                          />
                        </div>
                        <div className="row">
                          {OutletDoneData.filter(
                            (Ele) => Ele?.outletShopId === viewOutletBoardsIdd
                          ).map((board) => {
                            return (
                              <>
                                <div className="col-md-4 ">
                                  <p className="poppinfnt ">
                                    <span className="me-2 subct">
                                      {" "}
                                      Outlet ShopName :
                                    </span>{" "}
                                    {board.outletShopName
                                      .charAt(0)
                                      .toUpperCase() +
                                      board.outletShopName.slice(1)}
                                  </p>
                                  <p className="poppinfnt ">
                                    <span className="me-2 subct">
                                      Board Type :
                                    </span>
                                    {board.boardType.charAt(0).toUpperCase() +
                                      board.boardType.slice(1)}
                                  </p>

                                  <p className="poppinfnt ">
                                    <span className="me-2 subct">
                                      Category :
                                    </span>{" "}
                                    {board.category}
                                  </p>

                                  <p className="poppinfnt ">
                                    <span className="me-2 subct">
                                      GST Number :
                                    </span>{" "}
                                    {board.gstNumber}
                                  </p>

                                  <div className="row">
                                    <img
                                      width={200}
                                      height={200}
                                      className="col-md-8 banrrad"
                                      alt=""
                                      src={`http://api.srimagicprintz.com/Outlet/${board.ouletBannerImage}`}
                                    />
                                    <div className="col-md-1 borderlef">
                                      <span className="border-line"></span>
                                      <span className="poppinfnt ms-5 me-3">
                                        {board.height}
                                      </span>
                                      <span className="poppinfnt ms-5 me-3">
                                        {board.unitsOfMeasurment}
                                      </span>
                                      <span className="border-line"></span>
                                    </div>
                                  </div>

                                  <div className=" mt-2 m-auto mb-2 borderlef1 ">
                                    <span className="border-line2"></span>
                                    <span className=" poppinfnt ms-2 me-1 ">
                                      {board.width}
                                    </span>
                                    <span className="poppinfnt  me-2">
                                      {board.unitsOfMeasurment}
                                    </span>
                                    <span className=" border-line2"></span>
                                  </div>
                                  <p className="poppinfnt ">
                                    <span className="me-2 subct">Remark :</span>{" "}
                                    {board.remark}
                                  </p>
                                </div>
                                <hr></hr>{" "}
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row " style={{ height: "10vh" }}>
                          <div className="col-md-1 ">
                            <ArrowCircleLeftIcon
                              onClick={() => setSelectedIndex(null)}
                              style={{ color: "#068FFF", cursor: "pointer" }}
                            />
                          </div>
                          <div className="col-md-1 ">
                            {moreoption1 ? (
                              <>
                                <p
                                  className="mroe "
                                  onClick={() =>
                                    setselectAction1(!selectAction1)
                                  }
                                  style={{
                                    border: "1px solid white",
                                    height: "38px",
                                    width: "35px",
                                    textAlign: "center",
                                    borderRadius: "100px",
                                    backgroundColor: "#F5F5F5",
                                  }}
                                >
                                  <span className="text-center">
                                    <MoreVertIcon />
                                  </span>
                                </p>
                                {selectAction1 ? (
                                  <div
                                    style={{
                                      position: "absolute",
                                      zIndex: "10px",
                                      top: "22%",
                                    }}
                                  >
                                    <Card
                                      className="m-auto p-3"
                                      style={{ width: "12rem" }}
                                    >
                                      <p
                                        className="cureor"
                                        onClick={handleAssignVendor}
                                      >
                                        Assign to recce
                                      </p>

                                      <p
                                        className="cureor"
                                        style={{ color: "red" }}
                                        onClick={handleDeleteSelectedOutlet}
                                      >
                                        <span style={{ color: "red" }}>
                                          Delete
                                        </span>
                                      </p>
                                    </Card>
                                  </div>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="row ">
                            <div className="col-md-1 ">
                              <label className="col-md-9 mb-2">
                                <span>{data1}</span> <span>Of </span>
                                {filteredDate?.map((recceItem, index) => (
                                  <span>{recceItem?.outletName?.length}</span>
                                ))}
                              </label>
                              <Form.Control
                                as="select"
                                value={rowsPerPage1}
                                onChange={handleRowsPerPageChange}
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value={80}>80</option>
                                <option value={100}>100</option>
                                <option value={140}>140</option>
                                <option value={200}>200</option>
                                <option value={300}>300</option>
                                <option value={400}>400</option>
                                <option value={600}>600</option>
                                <option value={700}>700</option>
                                <option value={1000}>1000</option>
                                <option value={1500}>1500</option>
                                <option value={10000}>10000</option>
                              </Form.Control>
                            </div>

                            <div className="col-md-5 ">
                              <div className="row">
                                <label className="col-md-5   mb-2">
                                  Start Date:
                                </label>
                                <label className="col-md-6  mb-2">
                                  End Date:
                                </label>
                                <div className="col-md-5 ">
                                  <Form.Control
                                    type="date"
                                    value={FilterStartDate1}
                                    onChange={handleFilterStartDateChange1}
                                  />
                                </div>
                                <div className="col-md-5 ">
                                  <Form.Control
                                    type="date"
                                    value={FilterEndDate1}
                                    onChange={handleFilterEndDateChange1}
                                  />
                                </div>
                                <div className="col-md-2 ">
                                  <Button onClick={handleClearDateFilters1}>
                                    Clear
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-2 ">
                              <label className="col-md-9 mb-2 ">Status</label>
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
                                <option value="Completed">Completed</option>
                                <option value="Proccesing">Proccesing</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                              </Form.Select>
                            </div>
                            <div className="col-md-2 mt-4">
                              <Button
                                className="row mt-2"
                                onClick={handleUpdate}
                              >
                                Save
                              </Button>
                            </div>
                            {/* <div className="col-md-2 mt-4">
                          <Button onClick={()=>handleButtonClick(selectedRecceItems1)}>
                            Create Quote
                          </Button>
                        </div> */}
                          </div>
                        </div>

                        <table>
                          <thead className="t-c">
                            <tr>
                              <th className="th_s poppinfnt p-1">
                                <input
                                  type="checkbox"
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "5px",
                                  }}
                                  checked={selectAll}
                                  onChange={handleOutletSelectAllChange}
                                />
                              </th>
                              <th className="th_s poppinfnt p-1">SI.No</th>
                              <th className="th_s poppinfnt p-1">Job.No</th>
                              <th className="th_s poppinfnt p-1">Brand </th>
                              <th className="th_s poppinfnt p-1">Shop Name</th>
                              <th className="th_s poppinfnt p-1">
                                Client Name
                              </th>
                              <th className="th_s poppinfnt p-1">State</th>
                              <th className="th_s poppinfnt p-1">
                                Contact Number
                              </th>
                              <th className="th_s poppinfnt p-1">Zone</th>
                              <th className="th_s poppinfnt p-1">Pincode</th>
                              <th className="th_s poppinfnt p-1">City</th>
                              <th className="th_s poppinfnt p-1">FL Board</th>
                              <th className="th_s poppinfnt p-1">GSB</th>
                              <th className="th_s poppinfnt p-1">Inshop</th>
                              <th className="th_s poppinfnt p-1">
                                Vendor Name
                              </th>
                              <th className="th_s poppinfnt p-1">Date</th>
                              <th className="th_s poppinfnt p-1">
                                Assigned Date
                              </th>

                              <th className="th_s poppinfnt p-1">Status</th>
                              <th className="th_s poppinfnt p-1">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {filteredDate?.map((recceItem, index) =>
                              recceItem?.outletName?.map(
                                (outlet, outletArray) => {
                                  let JobNob = 0;

                                  reccedata?.forEach(
                                    (recceItem, recceIndex) => {
                                      recceItem?.outletName?.forEach((item) => {
                                        if (outlet._id === item._id) {
                                          JobNob = recceIndex + 1;
                                        }
                                      });
                                    }
                                  );

                                  if (rowsDisplayed < rowsPerPage1) {
                                    const selectedVendorId = outlet?.vendor;
                                    const vendor = vendordata?.find(
                                      (ele) => ele?._id === selectedVendorId
                                    );

                                    rowsDisplayed++;
                                    const pincodePattern = /\b\d{6}\b/;

                                    const address = outlet?.OutletAddress;
                                    const extractedPincode =
                                      address?.match(pincodePattern);

                                    if (extractedPincode) {
                                      outlet.OutletPincode =
                                        extractedPincode[0];
                                    }

                                    return (
                                      <tr className="tr_C" key={outlet._id}>
                                        <td className="td_S poppinfnt p-1">
                                          <input
                                            style={{
                                              width: "15px",
                                              height: "15px",
                                              marginRight: "5px",
                                            }}
                                            type="checkbox"
                                            checked={selectedRecceItems1?.includes(
                                              outlet._id
                                            )}
                                            onChange={() =>
                                              handleOutletToggleSelect(
                                                recceItem.BrandId,
                                                outlet._id
                                              )
                                            }
                                          />
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outletArray + 1}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          Job{JobNob}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {recceItem.BrandName}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.ShopName}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.ClientName}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.State}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.OutletContactNumber}
                                        </td>

                                        <td className="td_S poppinfnt p-1">
                                          {outlet.OutletZone}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {extractedPincode
                                            ? extractedPincode[0]
                                            : ""}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.OutletCity}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.FLBoard}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.GSB}
                                        </td>
                                        <td className="td_S poppinfnt p-1">
                                          {outlet.Inshop}
                                        </td>

                                        <td className="td_S poppinfnt p-1">
                                          {vendor?.VendorFirstName}
                                        </td>
                                        <td className="td_S poppinfnt p-2 text-nowrap text-center">
                                          {recceItem.createdAt
                                            ? moment(
                                                recceItem.createdAt
                                              ).format("DD MMMM YYYY")
                                            : ""}
                                        </td>

                                        <td className="td_S poppinfnt p-1">
                                          {outlet.date
                                            ? moment(outlet.date).format(
                                                "DD MMMM YYYY"
                                              )
                                            : ""}
                                        </td>

                                        <td className="td_S poppinfnt p-1">
                                          {outlet.RecceStatus}
                                        </td>
                                        <td
                                          className="td_S poppinfnt p-1"
                                          onClick={() =>
                                            handleOutletView(outlet._id)
                                          }
                                        >
                                          View
                                        </td>
                                      </tr>
                                    );
                                  }
                                }
                              )
                            )}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Recce </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Col className="mb-3">
              <Form.Label>Select Vendor</Form.Label>
              <Form.Group
                md="5"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  value={selctedVendor}
                  onChange={(e) => setselctedVendor(e.target.value)}
                >
                  <option>Choose..</option>
                  {vendordata?.map((vendorele) => (
                    <option key={vendorele._id} value={vendorele._id}>
                      {vendorele?.VendorFirstName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={AssignVendor}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
