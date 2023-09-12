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
import "react-toastify/dist/ReactToastify.css";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx";
import axios from "axios";
import pptxgen from "pptxgenjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { saveAs } from "file-saver";
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
  const [searchshopName, setSearchshopName] = useState("");
  const [searcharea, setSearcharea] = useState("");
  const [searchcity, setSearchcity] = useState("");
  const [searchcontactNumber, setSearchcontactNumber] = useState("");
  const [searchpincode, setSearchpincode] = useState("");
  const [searchzone, setSearchzone] = useState("");
  const [searchdate, setSearchDate] = useState("");
  const [searchdatastatus, setSearchdatastatus] = useState("");
  const [searchVendorName, setSearchVendorName] = useState("");
  const [SearchclientName, setSearchclientName] = useState("");
  const [searchSINO, setSearchSINO] = useState("");
  const [importXLSheet, setImportXLSheet] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState();
  const [getVendorName, setgetVendorName] = useState(null);
  const [CategoryData, setCategoryData] = useState();
  const [selectedcategory, setselectedcategory] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");
  const [selectedRecceItems, setSelectedRecceItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editrecce, setEditRecce] = useState(false);
  const [Editarea, setEditArea] = useState("");
  const [Editclient, setEditclient] = useState("");
  const [Editshopname, setEditShopName] = useState("");
  const [EditCity, setEditCity] = useState("");
  const [EditContactNumber, setEditContactNumber] = useState("");
  const [EditPincode, setEditPincode] = useState("");
  const [EditZone, setEditZone] = useState("");
  const [Editdatastatus, setEditdatastatus] = useState("");
  const [Editreccehight, setEditreccehight] = useState("");
  const [Editreccewidth, setEditreccewidth] = useState("");
  const [EditrecceUnit, setEditrecceUnit] = useState("");
  const [editRecceData, setEditRecceData] = useState({});
  const [moreoption, setmoreoption] = useState(false);
  const [show, setShow] = useState(false);
  const [selectAction, setselectAction] = useState(false);

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

  useEffect(() => {
    getAllRecce();
    getAllVendorInfo();
    getAllCategory();
  }, []);
  useEffect(() => {
    getLengthofStatus();
  }, [reccedata]);
  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/recce/recce/getallrecce"
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
        "http://localhost:8000/api/Vendor/vendorInfo/getvendorinfo"
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
    const filteredClients = () => {
      let results = [...reccedata];

      if (searchSINO) {
        results = results.filter((item, index) => {
          return (index + 1).toString().includes(searchSINO);
        });
      }

      if (SearchCategory) {
        results = results.filter((item) => {
          const categoryid = item?.category?.[0];
          const selectedcategory = CategoryData?.find(
            (ele) => ele._id === categoryid
          );

          return (
            selectedcategory &&
            selectedcategory.categoryName
              .toLowerCase()
              .includes(SearchCategory.toLowerCase())
          );
        });
      }

      if (SearchclientName) {
        results = results.filter((item) =>
          item.ClientName?.toLowerCase().includes(
            SearchclientName.toLowerCase()
          )
        );
      }
      if (searchshopName) {
        results = results.filter((item) =>
          item.ShopName?.toLowerCase().includes(searchshopName.toLowerCase())
        );
      }
      if (searchcontactNumber) {
        results = results.filter((item) => {
          const contactNumber1 =
            item.ContactNumber && item.ContactNumber.toString();
          return contactNumber1?.includes(searchcontactNumber);
        });
      }
      if (searcharea) {
        const searchTerm = searcharea.toLowerCase();
        results = results.filter((item) => {
          const area = item.Area?.toLowerCase();
          return (
            area.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
          );
        });
      }
      if (searchcity) {
        const searchTerm = searchcity.toLowerCase();
        results = results.filter((item) => {
          const city = item.City?.toLowerCase();

          return (
            area.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
          );
        });
      }

      if (searchzone) {
        results = results.filter((item) => {
          const Zone1 = item.Zone && item.Zone.toString();
          return Zone1?.includes(searchzone);
        });
      }
      if (searchpincode) {
        results = results.filter((item) => {
          const Pincode1 = item.Pincode && item.Pincode.toString();
          return Pincode1?.includes(searchpincode);
        });
      }

      if (searchdate) {
        const searchDate = new Date(searchdate);

        if (!isNaN(searchDate)) {
          results = results.filter((item) => {
            if (!item.createdAt) {
              return false;
            }

            const createdAtDate = new Date(item.createdAt);

            // Compare date components (year, month, day)
            return (
              createdAtDate.getFullYear() === searchDate.getFullYear() &&
              createdAtDate.getMonth() === searchDate.getMonth() &&
              createdAtDate.getDate() === searchDate.getDate()
            );
          });
        }
      }

      if (searchdatastatus) {
        results = results.filter((item) => {
          const status1 = item.datastatus && item.datastatus.toString();
          return status1?.includes(searchdatastatus);
        });
      }

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, results.length);
      const dataToDisplay = results.slice(startIndex, endIndex);
      setDisplayedData(dataToDisplay);
    };
    filteredClients();
  }, [
    reccedata,
    SearchclientName,
    searchshopName,
    searchVendorName,
    searchcontactNumber,
    searcharea,
    searchcity,
    searchpincode,
    searchzone,
    searchdate,
    searchdatastatus,
    searchSINO,
    // currentPage,
    rowsPerPage,
  ]);

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
            `http://localhost:8000/api/recce/recce/addreccesviaexcelesheet/${outlateid}`,
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
  const updateRecceData = async () => {
    const formdata = new FormData();
    if ("reccedesign") {
      for (const image of designImages) {
        formdata.append("designimage", image);
      }
    }

    formdata.append("Area", Editarea || editRecceData.Area);
    formdata.append("ClientName", Editclient || editRecceData.ClientName);
    formdata.append("City", EditCity || editRecceData.City);
    formdata.append(
      "ContactNumber",
      EditContactNumber || editRecceData.ContactNumber
    );
    formdata.append("Pincode", EditPincode || editRecceData.Pincode);
    formdata.append("Zone", EditZone || editRecceData.Zone);
    formdata.append("recceUnit", EditrecceUnit || editRecceData.recceUnit);
    formdata.append("category", selectedcategory || editRecceData.category);
    formdata.append("datastatus", Editdatastatus || editRecceData.datastatus);

    formdata.append("reccehight", Editreccehight || editRecceData.reccehight);

    formdata.append("reccewidth", Editreccewidth || editRecceData.reccewidth);

    formdata.append("ShopName", Editshopname || editRecceData.ShopName);
    try {
      const recceId = editRecceData._id;
      const config = {
        url: `/recce/recce/updatereccedata/${recceId}`,
        method: "put",
        baseURL: "http://localhost:8000/api",
        headers: { "Content-Type": "application/json" },

        data: formdata,
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Successfully linked vendor to recce");
        setSelectedIndex(null);
        window.location.reload();
      }
    } catch (err) {
      alert("Not able to add", err);
    }
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
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        "SNo",
        "ShopName",
        "ClientName",
        "State",
        "OutletContactNumber",
        "OutletZone",
        "OutletCity",
        "FLBoard",
        "GSB",
        "Inshop",
        "Category",
        "height",
        "unit",
        "width",
        "unit",
        "vendor",
        "RecceStatus",
      ],
    ];

    wsData.push([
      SNo,
      ShopName,
      ClientName,
      State,
      OutletContactNumber,
      OutletZone,
      OutletCity,
      FLBoard,
      GSB,
      Inshop,
      Category,
      height,
      unit,
      width,
      unit,
      vendor,
      RecceStatus,
    ]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const headerCellStyle = {
      fill: { fgColor: { rgb: "FFFF00" } },
      font: { bold: true },
    };

    ["A1", "B1", "C1", "D1", "E1", "F1"].forEach((cell) => {
      ws[cell].s = headerCellStyle;
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "recce.xlsx");
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/Product/category/getcategory"
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

  // const handleAssignVendor = async () => {
  //   for (const itemId of selectedRecceItems) {
  //     setAssign(itemId);
  //     setShow(true);
  //   }
  // };
  const handleToggleSelect = (itemId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems.includes(itemId)) {
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
      setSelectedRecceItems(displayedData.map((item) => item._id));
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

  // const handlesendRecceToDesign = async () => {
  //   for (const recceId of selectedRecceItems) {
  //     const recceData = filteredData.find((item) => item._id === recceId);

  //     if (
  //       recceData.datastatus === "Completed" &&
  //       recceData.reccehight > 0 &&
  //       recceData.reccewidth > 0 &&
  //       recceData.reccedesign !== null
  //     ) {
  //       try {
  //         const response = await axios.post(
  //           `http://localhost:8000/api/recce/recce/getcompletedid/${recceData._id}`
  //         );

  //         if (response.status === 200) {
  //           alert(`Successfully sent recce to design`);
  //           window.location.href = "/Design";
  //         } else {
  //           alert(`Failed to send recce to design`);
  //         }
  //       } catch (err) {
  //         alert(`Please Complete Recce or fill all data`);
  //       }
  //     } else {
  //       alert(`Recce  not completed yet`);
  //     }
  //   }
  // };

  const filteredData1 = filteredData?.filter(
    (vendor) => vendor?._id === getVendorName?._id
  );

  let serialNumber = 0;
  let rowsDisplayed = 0;

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage1(newRowsPerPage);
    serialNumber = 0;
    rowsDisplayed = 0;
  };

  useEffect(() => {
    const filteredClients = () => {
      if (SearchclientName) {
        filteredData1.flatMap((ele) =>
          ele.outletName.flatMap((item) =>
            item.filter(
              (data) =>
                !SearchclientName ||
                (data.clientName &&
                  data.clientName
                    .toLowerCase()
                    .includes(SearchclientName.toLowerCase()))
            )
          )
        );
      }
    };
    filteredClients();
  }, [
    filteredData1,
    SearchclientName,
    searchshopName,
    searchVendorName,
    searchcontactNumber,
    searcharea,
    searchcity,
    searchpincode,
    searchzone,
    searchdate,
    searchdatastatus,
    searchSINO,
    // currentPage,
    rowsPerPage,
  ]);

  const [completedStatus, setcompletedStatus] = useState([]);
  const [pendingStatus, setpendingStatus] = useState([]);
  const [cancelledStatus, setcancelledStatus] = useState([]);
  const [proccesingStatus, setproccesingStatus] = useState([]);

  const getLengthofStatus = () => {
    const statusCounts = {
      completed: 0,
      pending: 0,
      cancelled: 0,
      processing: 0,
    };

    reccedata?.forEach((recceItem) => {
      recceItem?.outletName.forEach((outletArray) => {
        outletArray.forEach((outlet) => {
          const vendorId = outlet.vendor;

          if (outlet.RecceStatus.includes("pending")) {
            statusCounts.pending++;
          }
          if (outlet.RecceStatus.includes("cancelled")) {
            statusCounts.cancelled++;
          }
          if (
            outlet.RecceStatus.includes("completed") &&
            vendorId !== null &&
            vendorId !== undefined
          ) {
            statusCounts.completed++;
          }
          if (
            outlet.RecceStatus.includes("processing") &&
            vendorId !== null &&
            vendorId !== undefined
          ) {
            statusCounts.processing++;
          }
        });
      });
    });

    setcompletedStatus(statusCounts.completed);
    setpendingStatus(statusCounts.pending);
    setcancelledStatus(statusCounts.cancelled);
    setproccesingStatus(statusCounts.processing);
  };

  function convertToFeet(value, unit) {
    if (unit === "inch") {
      return Math.round(value / 12);
    } else if (unit === "cm") {
      return Math.round(value * 0.0328084);
    } else {
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
        // Skip if recceId is empty or null
        if (!recceId) {
          continue;
        }

        const recceData = filteredData.find((item) => item._id === recceId);

        if (!recceData) {
          alert("Recce data not found for selected item");
          continue; // Skip this iteration and move to the next one
        }

        recceData.outletName.forEach((outletArray) => {
          if (outletArray.length === 0) {
            throw new Error("Please import outlet");
          }

          outletArray.forEach((outlet) => {
            if (outlet.RecceStatus.includes("completed")) {
              const rHeightInFeet = convertToFeet(outlet.height, outlet.unit);
              const rWidthInFeet = convertToFeet(outlet.width, outlet.unit);
              extractedData.push({
                "Outlet Name": outlet.ShopName,
                "Outlate Name": outlet.ShopName,
                "Outlet Address": outlet.OutletAddress,
                "Outlet Contact Number": outlet.OutletContactNumber,
                "GST Number": outlet.GSTNumber,
                "Media .": outlet.Category,
                "A Height": outlet.height,
                "A Width": outlet.width,
                "No.Quantity": outlet.Qty,
                "R Height": rHeightInFeet,
                "R Width": rWidthInFeet,
              });
            }
          });
        });

        const headerRow = worksheet.addRow([
          "Outlate Name",
          "Outlet Address",
          "Outlet Contact Number",
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
        worksheet.getColumn(6).width = 8;
        worksheet.getColumn(7).width = 8;
        worksheet.getColumn(8).width = 8;
        worksheet.getColumn(9).width = 8;
        worksheet.getColumn(10).width = 8;

        extractedData.forEach((dataItem) => {
          const row = worksheet.addRow([
            dataItem["Outlate Name"],
            dataItem["Outlet Address"],
            dataItem["Outlet Contact Number"],
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
            // bold: true,
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
          // Check if the cell is already merged before merging
          const cellA = worksheet.getCell(`A${i}`);
          const cellB = worksheet.getCell(`B${i}`);
          if (!cellA.isMerged) {
            worksheet.mergeCells(`A${i}:B${i}`);
          }
          if (!cellB.isMerged) {
            worksheet.mergeCells(`B${i}:C${i}`);
          }
          // Continue with other columns as needed
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

        for (const outletArray of recceData.outletName) {
          if (outletArray.length === 0) {
            // Skip processing this outletArray and show an alert
            alert("Please import outlet");
            continue;
          }

          for (const outlet of outletArray) {
            if (outlet.RecceStatus.includes("completed")) {
              const rHeightInFeet = convertToFeet(outlet.height, outlet.unit);
              const rWidthInFeet = convertToFeet(outlet.width, outlet.unit);
              const media = outlet.Category || "";

              // Format the height and width as "H12XW34" after converting to feet
              const formattedDimensions = `H${Math.round(
                rHeightInFeet
              )}XW${Math.round(rWidthInFeet)}`;

              // Create a slide with outlet name and address
              const slide = pptx.addSlide();
              slide.addText(`Outlatename:${outlet.ShopName}`, {
                x: 1,
                y: 0.3,
                w: "100%",
                fontSize: 12,
              });

              slide.addText(`Address:${outlet.OutletAddress}`, {
                x: 1,
                y: 0.1,
                w: "100%",
                fontSize: 12,
              });

              const imageUrls = ["url1.jpg", "url2.jpg", "url3.jpg"]; // Replace with your image URLs
              const imageWidth = "30%"; // Adjust image width as needed

              const centerX = "35%"; // X coordinate for center

              // Calculate the Y coordinate to center the images vertically
              const centerY = "30%"; // Adjust as needed

              // Loop through image URLs and add them to the slide
              let currentX = centerX;
              for (const imageUrl of imageUrls) {
                slide.addImage({
                  path: imageUrl,
                  x: currentX,
                  y: centerY,
                  w: imageWidth,
                });
                currentX = `+=35%`; // Adjust horizontal spacing
              }

              // Display the formatted dimensions in the slide
              slide.addText(formattedDimensions, {
                x: 1,
                y: "90%",
                w: "100%",
                fontSize: 12,
              });

              // Category in the footer
              slide.addText(`Category: ${media}`, {
                x: 1,
                y: "95%",
                w: "100%",
                fontSize: 12,
                align: "left", // Center the category
              });
            }
          }
        }
      }

      pptx.write("blob").then((blob) => {
        // Create a download link for the Blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "presentation.pptx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEstimate = () => {
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

        recceData.outletName.forEach((outletArray) => {
          if (outletArray.length === 0) {
            throw new Error("Please import outlet");
          }

          outletArray.forEach((outlet) => {
            if (outlet.RecceStatus.includes("completed")) {
              const rHeightInFeet = convertToFeet(outlet.height, outlet.unit);
              const rWidthInFeet = convertToFeet(outlet.width, outlet.unit);
              extractedData.push({
                "Outlet Name": outlet.ShopName,
                "Outlet Address": outlet.OutletAddress,
                "Outlet Contact Number": outlet.OutletContactNumber,
                "GST Number": outlet.GSTNumber,
                "GSB/inshop": outlet.GSB || outlet.Inshop,
                "Media .": outlet.Category,
                Height: rHeightInFeet || 0,
                Width: rWidthInFeet || 0,
                "No.Quantity": outlet.Qty || 0,
                SFT: 0,
                "Production Rate": 0,
                "Production Cost": 0,
                "Installation Rate": 18,
                "Installation Cost": 0,
                "transportation rate": 13,
                "transportation cost": 0,
                "Production Cost + Installation Cost + transportation cost":
                  0 + 18 + 0, //
              });
            }
          });
        });
        const totalProductionCost = extractedData.reduce((sum, item) => {
          return sum + (item["Production Cost"] || 0);
        }, 0);

        const totalInstallationCost = extractedData.reduce((sum, item) => {
          return sum + (item["Installation Cost"] || 0);
        }, 0);

        const totalTransportationCost = extractedData.reduce((sum, item) => {
          return sum + (item["transportation cost"] || 0);
        }, 0);

        const grossAmount =
          totalProductionCost + totalInstallationCost + totalTransportationCost;

        const gst18 = (grossAmount * 0.18).toFixed(2);

        const rof = calculateRof(
          totalProductionCost,
          totalInstallationCost,
          totalTransportationCost
        );

        function calculateRof(
          totalProductionCost,
          totalInstallationCost,
          totalTransportationCost
        ) {
          return 0;
        }
   const firstRow = extractedData.length + 1; // Start from the row after the last row
const secondRow = firstRow + 1; // One row below the first row
const thirdRow = secondRow + 1; // Two rows below the last row

// Add the footer data with labels and values
extractedData.push({
  "GST @18%": `M${firstRow}`,
  "Gross Amount": `M${secondRow}`, // Label "Gross Amount" with corresponding value
  Rof: `M${thirdRow}`,
  // Values corresponding to dynamic cell references
  "transportation rate": `O${firstRow}`,
  "transportation cost": `O${secondRow}`,
  "Production Cost + Installation Cost + transportation cost": `O${thirdRow}`,
});

        console.log("extractedData", extractedData);
        const headerRow = worksheet.addRow([
          "Outlet Name",
          "Outlet Address",
          "Outlet Contact Number",
          "GST Number",
          "Media .",
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

        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
        worksheet.getColumn(5).width = 15;
        worksheet.getColumn(6).width = 8;
        worksheet.getColumn(7).width = 8;
        worksheet.getColumn(8).width = 8;
        worksheet.getColumn(9).width = 8;
        worksheet.getColumn(10).width = 8;
        worksheet.getColumn(11).width = 8;
        worksheet.getColumn(12).width = 8;
        worksheet.getColumn(13).width = 10;
        worksheet.getColumn(14).width = 10;
        worksheet.getColumn(15).width = 20;

        extractedData.forEach((dataItem) => {
          const row = worksheet.addRow([
            dataItem["Outlet Name"],
            dataItem["Outlet Address"],
            dataItem["Outlet Contact Number"],
            dataItem["GST Number"],
            dataItem["Media ."],
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
            // bold: true,
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
          // Check if the cell is already merged before merging
          const cellA = worksheet.getCell(`A${i}`);
          const cellB = worksheet.getCell(`B${i}`);
          if (!cellA.isMerged) {
            worksheet.mergeCells(`A${i}:B${i}`);
          }
          if (!cellB.isMerged) {
            worksheet.mergeCells(`B${i}:C${i}`);
          }
          // Continue with other columns as needed
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
                    Export
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

                              {/* <li
                                className="cureor"
                                onClick={handlesendRecceToDesign}
                              >
                                Mark as Completed
                              </li> */}
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
                        disabled={selectedRecceItems.length === 0}
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
              <div className="row ">
                <div className="row ">
                  <label className="col-md-2">
                    {displayedData?.length} of: {reccedata?.length}
                  </label>
                  <div className="col-md-4  m-auto">
                    <div className="row float-end ">
                      <label className="col-md-6  m-auto">Start Date:</label>

                      <label className="col-md-6 m-auto">End Date:</label>
                    </div>{" "}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6 ">
                    <div className="row ">
                      <div className="col-md-2 ">
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
                    </div>
                  </div>
                  <div className="col-md-5 float-end">
                    <div className="row">
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
              </div>
            </div>

            <div className=" row mt-3">
              <table>
                <thead className="t-c">
                  <tr>
                    <th className="th_s ">
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
                    <th className="th_s ">SI.No.</th>
                    <th className="th_s ">Job.No.</th>
                    <th className="th_s ">Brand Name</th>
                    <th className="th_s ">Contact Number</th>
                    <th className="th_s "> Date</th>
                    <th className="th_s ">Action</th>
                    <th className="th_s ">Outlate</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="td_S p-1">
                          <input
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            type="checkbox"
                            checked={selectedRecceItems.includes(item._id)}
                            onChange={() => handleToggleSelect(item._id)}
                          />
                        </td>
                        <td className="td_S ">{index + 1}</td>
                        <td className="td_S ">Job {index + 1}</td>
                        <td className="td_S ">{item.BrandName}</td>
                        <td className="td_S ">{item.ContactNumber}</td>
                        <td className="td_S ">
                          {item.createdAt
                            ? new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10)
                            : ""}
                        </td>

                        <td className="td_S ">
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
                        <td className="td_S ">
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
            {/* <Modal show={show} onHide={handleClose1}>
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
                <Button variant="primary">Save</Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        ) : (
          <div className="row  m-auto containerPadding">
            {editrecce ? (
              <>
                <Form>
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
                </Form>
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
                        <Button
                          className="m-2"
                          onClick={() => handleVendorEdit(getVendorName._id)}
                        >
                          Edit
                        </Button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row ">
                      <div className="col-md-1 mb-3">
                        <ArrowCircleLeftIcon
                          onClick={() => setSelectedIndex(null)}
                          style={{ color: "#068FFF", cursor: "pointer" }}
                        />
                      </div>
                      <div className="row ">
                        <div className="col-md-6 mb-3">
                          <div className="row ">
                            <div className="col-md-2 ">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <table>
                      <thead className="t-c">
                        <tr className="tr2">
                          <th className="p-1"></th>
                          <th className="p-1"></th>

                          <th className="p-1"></th>
                          <th className="p-1"></th>
                          <th className="p-1">
                            {" "}
                            <input
                              className="col-md-1"
                              placeholder="Shop name"
                              value={searchshopName}
                              onChange={(e) =>
                                setSearchshopName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="owner name"
                              value={SearchclientName}
                              onChange={(e) =>
                                setSearchclientName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th></th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="Contact"
                              value={searchcontactNumber}
                              onChange={(e) =>
                                setSearchcontactNumber(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" zone"
                              value={searchzone}
                              onChange={(e) => setSearchzone(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th>
                            <input
                              className="col-md-1"
                              placeholder=" pincode"
                              value={searchpincode}
                              onChange={(e) => setSearchpincode(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>

                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" city"
                              value={searchcity}
                              onChange={(e) => setSearchcity(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1"></th>

                          <th className="p-1"></th>
                          <th className="p-1"> </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" category"
                              value={SearchCategory}
                              onChange={(e) =>
                                setSearchCategory(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1"></th>
                          <th className="p-1"></th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder="Vendor name"
                              value={searchVendorName}
                              onChange={(e) =>
                                setSearchVendorName(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            <input
                              className="col-md-1"
                              placeholder=" date"
                              value={searchdate}
                              onChange={(e) => setSearchDate(e.target.value)}
                              style={{ width: "55px" }}
                            />
                          </th>
                          <th className="p-1">
                            {" "}
                            <input
                              className="col-md-1"
                              placeholder=" status"
                              value={searchdatastatus}
                              onChange={(e) =>
                                setSearchdatastatus(e.target.value)
                              }
                              style={{ width: "55px" }}
                            />
                          </th>
                        </tr>

                        <tr>
                          <th className="th_s ">
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
                          <th className="th_s ">SI.No</th>
                          <th className="th_s ">Job.No</th>
                          <th className="th_s ">Brand </th>
                          <th className="th_s ">Shop Name</th>
                          <th className="th_s ">Client Name</th>
                          <th className="th_s ">State</th>
                          <th className="th_s ">Contact Number</th>
                          <th className="th_s ">Zone</th>
                          <th className="th_s ">Pincode</th>
                          <th className="th_s ">City</th>
                          <th className="th_s ">FL Board</th>
                          <th className="th_s ">GSB</th>
                          <th className="th_s ">Inshop</th>
                          <th className="th_s ">Category</th>
                          <th className="th_s ">Height</th>
                          <th className="th_s ">Width</th>
                          <th className="th_s ">Vendor Name</th>
                          <th className="th_s ">Date</th>
                          <th className="th_s ">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredData1?.map((recceItem, index) =>
                          recceItem?.outletName.map((outletArray) => {
                            return outletArray.map(
                              (outlet, innerOutletIndex) => {
                                if (rowsDisplayed < rowsPerPage1) {
                                  const selectedVendorId = outlet?.vendor;
                                  const vendor = selectedVendorId
                                    ? vendordata?.find(
                                        (ele) => ele._id === selectedVendorId
                                      )
                                    : null;

                                  serialNumber++;
                                  rowsDisplayed++;
                                  const pincodePattern = /\b\d{6}\b/;

                                  const address = outlet?.OutletAddress;
                                  const extractedPincode =
                                    address?.match(pincodePattern);

                                  if (extractedPincode) {
                                    outlet.OutletPincode = extractedPincode[0];
                                  }

                                  return (
                                    <tr className="tr_C" key={serialNumber}>
                                      <td className="td_S p-1">
                                        <input
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                            marginRight: "5px",
                                          }}
                                          type="checkbox"
                                          checked={selectedRecceItems.includes(
                                            outlet._id
                                          )}
                                          onChange={() =>
                                            handleToggleSelect(outlet._id)
                                          }
                                        />
                                      </td>
                                      <td className="td_S p-1">
                                        {serialNumber}
                                      </td>
                                      <td className="td_S p-1">
                                        Job{index + 1}
                                      </td>
                                      <td className="td_S p-1">{recceItem.BrandName}</td>
                                      <td className="td_S p-1">
                                        {outlet.ShopName}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.ClientName}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.State}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.OutletContactNumber}
                                      </td>

                                      <td className="td_S p-1">
                                        {outlet.OutletZone}
                                      </td>
                                      <td className="td_S p-1">
                                        {extractedPincode
                                          ? extractedPincode[0]
                                          : ""}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.OutletCity}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.FLBoard}
                                      </td>
                                      <td className="td_S p-1">{outlet.GSB}</td>
                                      <td className="td_S p-1">
                                        {outlet.Inshop}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.Category}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.height}
                                        {outlet.unit}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.width}
                                        {outlet.unit}
                                      </td>

                                      <td className="td_S p-1">
                                        {vendor?.VendorFirstName}
                                      </td>
                                      <td className="td_S ">
                                        {recceItem.createdAt
                                          ? new Date(recceItem.createdAt)
                                              .toISOString()
                                              .slice(0, 10)
                                          : ""}
                                      </td>
                                      <td className="td_S p-1">
                                        {outlet.RecceStatus}
                                      </td>
                                    </tr>
                                  );
                                }
                                return null;
                              }
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
