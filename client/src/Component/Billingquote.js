import React, { useState } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
function Billingquote() {
  const [trackJob, setTrackJob] = useState(null);
  const handleTrackJob = (row) => {
    const { index } = row;
    setTrackJob(index);
  };
  const columns = [
    {
      name: "SI.NO.",
      selector: "id",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Client Name",
      selector: "clientname",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Bussiness Name",
      selector: "bussinessname",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Board ",
      selector: "board",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Material",
      selector: "material",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },

      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Unit",
      selector: "unit",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Rate",
      selector: "rate",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Zone",
      selector: "zone",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },

    {
      name: "Pincode",
      selector: "pincode",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
    {
      name: "Amount",
      selector: "Amount",
      sortable: true,
      style: {
        borderRight: "1px solid black",
      },
    },
  ];

  const data = [
    {
      id: 1,
      clientname: "Ramesh",
      bussinessname: "Ashapura Hardware",
      clientcontact: 4682932214,
      board: "Blacklit Board with tube lights(single side)",
      material: "vinyl",
      quantity: 6,
      unit: "245.00 Sq.Ft",
      rate: "222 Sq.ft",
      zone: "west",
      pincode: 34672,
      Amount: "1,23,400.5",
    },
    {
      id: 2,
      clientname: "Ramesh",
      bussinessname: "Ashapura Hardware",
      clientcontact: 4682932214,
      board: "Blacklit Board with tube lights(single side)",
      material: "vinyl",
      quantity: 6,
      unit: "245.00 Sq.Ft",
      rate: "222 Sq.ft",
      zone: "west",
      pincode: 34672,
      Amount: "1,23,400.5",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const customStyles = {
    table: {
      border: "none",
      width: "100%",
    },
    cells: {
      style: {
        borderLeft: "1px solid black",
        padding: "8px",
      },
    },
    headCells: {
      style: {
        border: "1px solid black",
        fontWeight: "bold",
        borderCollapse: "collapse",
        padding: "8px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid black",
        wordBreak: "break-word",
        borderCollapse: "collapse",
      },
    },
  };
  return (
    <>
      {" "}
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="col-md-1">
          <a href="/Billing">
            <ArrowCircleLeftIcon
              style={{ color: "#068FFF", fontSize: "35px" }}
            />
          </a>
        </div>
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="id"
            sortIcon={<SortIcon />}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
            customStyles={customStyles}
            onRowClicked={handleTrackJob}
          />
        </DataTableExtensions>
        <div className="text-center m-auto ">
          <Button className="col-md-1 m-1" href="/BillingEstimate">
            Quote
          </Button>
          <Button className="col-md-1 m-1" href="/BillingEstimate">
            Invoice
          </Button>
        </div>
      </div>
    </>
  );
}

export default Billingquote;
