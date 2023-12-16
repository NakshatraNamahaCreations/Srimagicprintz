import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";
import moment from "moment";
import axios from "axios";

function Billing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);

  const [filter, setFilter] = useState(false);
  const handleFilter = () => {
    setFilter(!filter);
  };
  let serialNumber = 0;
  let rowsDisplayed = 0;
  // const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [getreccedata, setgetreccedata] = useState("");
  const [SelecteddesignIndex, setSelectedDesignIndex] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRecceItems1, setSelectedRecceItems1] = useState([]);
  const [filterEndDate, setFilterEndDate] = useState("");
  const [displayedData, setDisplayedData] = useState([]);
  const [ClientInfo, setClientInfo] = useState([]);
  const [recceData, setRecceData] = useState([]);
  const [searchshopName, setSearchshopName] = useState("");

  const handleOutletSelectAllChange = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allOutletIds = filteredData?.flatMap((item) =>
        item?.outletName?.map((outlet) => outlet?._id)
      );
      setSelectedRecceItems1(allOutletIds);
    } else {
      setSelectedRecceItems1([]);
    }
  };
  const ApiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getAllRecce();

    getAllClientsInfo();
  }, []);
  const getAllClientsInfo = async () => {
    try {
      const res = await axios.get(`${ApiURL}/Client/clients/getallclient`);
      if (res.status === 200) {
        setClientInfo(res.data);
      }
    } catch (err) {
      alert(err, "err");
    }
  };
  const getAllRecce = async () => {
    try {
      const res = await axios.get(`${ApiURL}/recce/recce/getallrecce`);
      if (res.status === 200) {
        setRecceData(res.data.RecceData);
      }
    } catch (err) {
      console.error(err);
    }
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
  const filteredData = filterDate(recceData);
  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage1(newRowsPerPage);
    setCurrentPage(1);
  };
  // const handleRowsPerPageChange = (e) => {
  //   const newRowsPerPage = parseInt(e.target.value);
  //   setRowsPerPage1(newRowsPerPage);
  //   serialNumber = 0;
  //   rowsDisplayed = 0;
  // };
  const handleOutletToggleSelect = (item, outletId) => {
    let updatedSelectedRecceItems;

    if (selectedRecceItems1.includes(outletId)) {
      updatedSelectedRecceItems = selectedRecceItems1.filter(
        (id) => id !== outletId
      );
    } else {
      updatedSelectedRecceItems = [...selectedRecceItems1, outletId];
    }

    setSelectedRecceItems1(updatedSelectedRecceItems);
    // setmoreoption1(updatedSelectedRecceItems.length > 0);
  };
  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const [data1, setdata1] = useState(rowsPerPage1);
  useEffect(() => {
    setdata1(rowsDisplayed);
  }, [rowsPerPage1, data1]);
  let outletName = 0;

  filteredData?.forEach((Ele) => {
    if (Ele?.outletName) {
      outletName += Ele?.outletName?.length;
    }
  });
  const handleClearDateFilters = () => {
    setFilterStartDate("");
    setFilterEndDate("");
  };

  // useEffect(() => {
  //   const filteredClients = () => {
  //     const filteredOutlets = recceData.map((recceItem) => ({
  //       ...recceItem,
  //       outletName: recceItem.outletName.filter((item) =>
  //         item.BrandName?.toLowerCase().includes(searchshopName.toLowerCase())
  //       ),
  //     }));

  //     const dataToDisplay = filteredOutlets.slice(
  //       (currentPage - 1) * rowsPerPage1,
  //       currentPage * rowsPerPage1
  //     );
  //     setDisplayedData(dataToDisplay);
  //   };

  //   filteredClients();
  // }, [recceData, searchshopName, rowsPerPage1, currentPage]);
  useEffect(() => {
    const filteredClients = () => {
      const filteredOutlets = recceData.filter((recceItem) =>
        recceItem.BrandName?.toLowerCase()?.includes(
          searchshopName?.toLowerCase()
        )
      );

      const dataToDisplay = filteredOutlets?.slice(
        (currentPage - 1) * rowsPerPage1,
        currentPage * rowsPerPage1
      );
      setDisplayedData(dataToDisplay);
    };

    filteredClients();
  }, [recceData, searchshopName, rowsPerPage1, currentPage]);
  return (
    <>
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="row">
          <div className="col-md-8">
            <Form.Group className="row m-auto"></Form.Group>{" "}
          </div>
          <div className="col-md-3 m-auto text-end">
            <TuneIcon onClick={handleFilter} />
          </div>
        </div>
        <div className="row m-auto">
          <div
            className={!filter ? "col-md-2  hide" : "col-md-2 card"}
            style={{
              position: "absolute",
              top: "24%",
              right: "1.8%",
              zIndex: "10",
              backgroundColor: "white",
              boxShadow: "2px 2px 2px white",
            }}
          >
            <p>Sort By</p>
            <p>Date(new to old)</p>
            <p>Date (old to new)</p>
          </div>{" "}
        </div>

        <div className="row mb-4 mt-3">
          <div className="col-md-4 ">
            <div className="row">
              <Form.Label>Search Client</Form.Label>
              <div className="col-md-8 ">
                <Form.Control
                  className="col-md-12"
                  placeholder="Search  outlet here...! "
                  onChange={(e) => setSearchshopName(e.target.value)}
                  value={searchshopName}
                />
              </div>

              {/* <div className="col-md-4 ">
                <Button
                  className="col-md-12 text-white"
                  href={`/Billingquote?searhcvalue=${searchshopName}`}
                >
                  Search
                </Button>
              </div> */}
            </div>
          </div>
          <div className="col-md-2 ">
            <div className="col-md-8  mb-2">
              <span>{data1}</span> of <span>{outletName}</span>
            </div>
            <Form.Control
              className="col-md-10"
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

          <div className="col-md-5 float-end">
            <div className="row">
              <label className="col-md-5   mb-2">Start Date:</label>
              <label className="col-md-6  mb-2">End Date:</label>
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
        <div className="row">
          <table className="t-p">
            <thead className="t-c">
              <tr>
                <th className="th_s p-1">SI.No</th>
                <th className="th_s p-1">Job.No</th>
                <th className="th_s p-1">Client Name </th>
                {/* <th className="th_s p-1">Client Name</th> */}
                {/* <th className="th_s p-1">State</th> */}
                <th className="th_s p-1">Contact Number</th>
                <th className="th_s p-1">Date</th>
                <th className="th_s p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData?.map((recceItem, index) => {
                if (rowsDisplayed < rowsPerPage1) {
                  let JobNob = 0;

                  const desiredClient = ClientInfo?.client?.find(
                    (client) => client._id === recceItem.BrandId
                  );
                  if (recceItem._id[index]) {
                    JobNob = index + 1;
                  }

                  serialNumber++;
                  rowsDisplayed++;
                  return (
                    <tr className="tr_C" key={serialNumber}>
                      <td className="td_S p-1">{index + 1}</td>
                      <td className="td_S p-1">Job{JobNob}</td>
                      <td className="td_S p-1">{recceItem?.BrandName}</td>
                      <td className="td_S p-1">
                        {desiredClient?.ClientsContactNumber1}
                      </td>

                      <td className="td_S p-2 text-nowrap text-center">
                        {recceItem.createdAt
                          ? new Date(recceItem.createdAt)
                              .toISOString()
                              .slice(0, 10)
                          : ""}
                      </td>
                      <td className="td_S ">
                        <a
                          variant="info "
                          href={`/Estimate?idd=${recceItem._id}`}
                          style={{
                            cursor: "pointer",
                            color: "skyblue",
                          }}
                        >
                          view
                        </a>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Billing;
