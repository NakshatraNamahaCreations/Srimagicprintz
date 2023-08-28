import React, { useEffect, useState } from "react";
import Header from "./Header";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
export default function Printing() {
  const ApiURL = process.env.REACT_APP_API_URL;

  const [sendLink, setSendLink] = useState("");
  const [togglelink, setToggleLink] = useState(false);
  const [link, setLink] = useState("http://localhost:3000/JobManagement");

  const [displayedData, setDisplayedData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchHight, setsearchHight] = useState("");
  const [searchwidth, setsearchwidth] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");

  const [searchshopName, setSearchshopName] = useState("");
  const [searcharea, setSearcharea] = useState("");
  const [searchcity, setSearchcity] = useState("");
  const [searchcontactNumber, setSearchcontactNumber] = useState("");
  const [searchpincode, setSearchpincode] = useState("");
  const [searchzone, setSearchzone] = useState("");
  const [searchdate, setSearchDate] = useState("");
  const [searchstatus, setSearchStatus] = useState("");
  const [searchVendorName, setSearchVendorName] = useState("");
  const [searchSINO, setSearchSINO] = useState("");
  const [designData, setDesignData] = useState([]);
  const [CategoryData, setCategoryData] = useState(null);
  const [vendordata, setVendorData] = useState(null);
  const [printingdata, setPrintingdata] = useState(null);
  const [selectedPrint, setSelectedPrint] = useState(false);
  const [indexdata, setIndexData] = useState([]);
  useEffect(() => {
    getAllDesign();
    getAllRecce();
    getAllVendorInfo();
    getAllCategory();
  }, []);
  // const handleToggle = () => {
  //   setToggleLink(!togglelink);
  // };

  // const copyShareLink = () => {
  //   setSendLink(link);
  // };

  const getAllDesign = async () => {
    try {
      const response = await axios.get(`${ApiURL}/design/design/getalldesigns`);
      if (response.status === 200) {
        setDesignData(response.data.alldesigns);
      }
    } catch (err) {
      alert("can't able to fetch data");
    }
  };

  const [printing, setPrinting] = useState([]);

  useEffect(() => {
    const filteredClients = () => {
      let results = [...printing];

      if (searchSINO) {
        results = results.filter((item, index) => {
          return (index + 1).toString().includes(searchSINO);
        });
      }

      if (searchVendorName) {
        results = results.filter((item) => {
          const selectedVendorId = item?.vendor[0];
          const selectedVendor = vendordata?.find(
            (vendor) => vendor._id === selectedVendorId
          );

          return (
            selectedVendor &&
            selectedVendor.VendorFirstName.toLowerCase().includes(
              searchVendorName.toLowerCase()
            )
          );
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
            area.indexOf(searchTerm) !== -1 || area.indexOf(searchTerm) !== -1
          );
        });
      }
      if (searchcity) {
        const searchTerm = searchcity.toLowerCase();
        results = results.filter((item) => {
          const city = item.City?.toLowerCase();

          return (
            city.indexOf(searchTerm) !== -1 || city.indexOf(searchTerm) !== -1
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
        const searchDateParts = searchdate.split("-");
        const searchYear = parseInt(searchDateParts[0]);
        const searchMonth = parseInt(searchDateParts[1]) - 1;
        const searchDay = parseInt(searchDateParts[2]);
        if (!isNaN(searchYear) && !isNaN(searchMonth) && !isNaN(searchDay)) {
          results = results.filter((item) => {
            if (!item.createdAt) {
              return false;
            }
            const createdAtDate = new Date(item.createdAt);
            const searchDate = new Date(searchYear, searchMonth, searchDay);
            return (
              createdAtDate.getFullYear() === searchDate.getFullYear() &&
              createdAtDate.getMonth() === searchDate.getMonth() &&
              createdAtDate.getDate() === searchDate.getDate()
            );
          });
        }
      }

      if (searchstatus) {
        results = results.filter((item) => {
          const status1 = item.status && item.status.toString();
          return status1?.includes(searchstatus);
        });
      }

      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, results.length);
      const dataToDisplay = results.slice(startIndex, endIndex);
      setDisplayedData(dataToDisplay);
    };
    filteredClients();
  }, [
    printing,
    searchshopName,
    searchVendorName,
    searchcontactNumber,
    searcharea,
    searchcity,
    searchpincode,
    searchzone,
    searchdate,
    searchstatus,
    searchSINO,
    currentPage,
    rowsPerPage,
  ]);

  const getAllRecce = async () => {
    try {
      const res = await axios.get(
        "http://api.srimagicprintz.com/api/recce/recce/getallrecce"
      );
      if (res.status === 200) {
        const filteredRecceData = res.data.RecceData.filter(
          (item) => item._id === item.completedRecceId
        );
        setPrinting(filteredRecceData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(
        "http://api.srimagicprintz.com/api/Product/category/getcategory"
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

  // const selectedVendorId = printingdata?.vendor?.[0];
  // const selectedVendor = vendordata?.find(
  //   (vendor) => vendor._id === selectedVendorId
  // );

  // const selectedcategoryID = printingdata?.category?.[0];
  // const selectcategry = CategoryData?.find(
  //   (ele) => ele?._id === selectedcategoryID
  // );

  useEffect(() => {
    if (designData) {
      const accumulatedIds = [];

      for (const design of designData) {
        if (
          design.reeceDetails &&
          Array.isArray(design.reeceDetails) &&
          design.reeceDetails.length > 0
        ) {
          for (let i = 0; i < design.reeceDetails.length; i++) {
            accumulatedIds.push(design.reeceDetails[i]);
          }
        }
      }

      setIndexData(accumulatedIds);
    }
  }, [designData]);

  const handleEdit = (design) => {
    setPrintingdata(design);
    setSelectedPrint(true);
  };

  return (
    <>
      <Header />
      {!selectedPrint ? (
        <div className="row  m-auto containerPadding">
          <div className="row ">
            <Col className="col-md-1 mb-3">
              <Form.Group className="row float-right">
                <Form.Label>
                  {displayedData?.length} of: {printing?.length}
                </Form.Label>
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
              </Form.Group>
            </Col>
          </div>
          <div className="row ">
            <table className="t-p">
              <thead className="t-c">
                <tr className="tr2">
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="SI.No"
                      value={searchSINO}
                      onChange={(e) => setSearchSINO(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Shop name"
                      value={searchshopName}
                      onChange={(e) => setSearchshopName(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Vendor name"
                      value={searchVendorName}
                      onChange={(e) => setSearchVendorName(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Contact"
                      value={searchcontactNumber}
                      onChange={(e) => setSearchcontactNumber(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Area"
                      value={searcharea}
                      onChange={(e) => setSearcharea(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>

                  <th>
                    <input
                      className="col-md-1"
                      placeholder="City"
                      value={searchcity}
                      onChange={(e) => setSearchcity(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>

                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Pincode"
                      value={searchpincode}
                      onChange={(e) => setSearchpincode(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Zone"
                      value={searchzone}
                      onChange={(e) => setSearchzone(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Date"
                      value={searchdate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th className="">
                    {" "}
                    <input
                      className="col-md-1"
                      placeholder="Status"
                      value={searchstatus}
                      onChange={(e) => setSearchStatus(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder="Seach hight"
                      value={searchHight}
                      onChange={(e) => setsearchHight(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder=" width"
                      value={searchwidth}
                      onChange={(e) => setsearchwidth(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th>
                    <input
                      className="col-md-1"
                      placeholder=" category"
                      value={SearchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      style={{ width: "79px" }}
                    />
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th className="th_s ">SI.No.</th>
                  <th className="th_s ">Shop Name</th>
                  {/* <th className="th_s ">Vendor Name</th> */}
                  <th className="th_s ">Contact Number</th>
                  <th className="th_s ">Area</th>
                  <th className="th_s ">City</th>
                  <th className="th_s ">Pincode</th>
                  <th className="th_s ">Zone</th>
                  <th className="th_s "> Date</th>
                  <th className="th_s "> Status</th>
                  <th className="th_s "> Height</th>
                  <th className="th_s "> Width</th>
                  <th className="th_s "> Category</th>
                  <th className="th_s ">Action</th>
                </tr>
              </thead>
              <tbody className="table">
                {displayedData?.map((item, index) => {
                  // const selectedVendorId = item?.vendor?.[0];
                  // const selectedVendor = vendordata?.find(
                  //   (vendor) => vendor?._id === selectedVendorId
                  // );
                  // const selectedcategoryId = item?.category?.[0];
                  // const category = CategoryData?.find(
                  //   (ele) => ele?._id === selectedcategoryId
                  // );
                  const indexdataSet = new Set(indexdata);
                  const shouldDisplay = indexdataSet.has(item.completedRecceId);
                  return (
                    <>
                      {shouldDisplay && (
                        <tr className="design" key={item._id}>
                          <td className="td_S ">{index + 1}</td>
                          <td className="td_S ">{item.ShopName}</td>
                          {/* <td className="td_S ">
                            {selectedVendor
                              ? selectedVendor?.VendorFirstName
                              : ""}
                          </td> */}
                          <td className="td_S ">{item.ContactNumber}</td>
                          <td className="td_S ">{item.Area}</td>
                          <td className="td_S ">{item.City}</td>
                          <td className="td_S ">{item.Pincode}</td>
                          <td className="td_S ">{item.Zone}</td>
                          <td className="td_S ">
                            {item.createdAt
                              ? new Date(item.createdAt)
                                  .toISOString()
                                  .slice(0, 10)
                              : ""}
                          </td>
                          <td className="td_S">{item.status}</td>
                          <td className="td_S">
                            {item.reccehight}
                            {item.recceUnit}
                          </td>
                          <td className="td_S">
                            {item.reccewidth}
                            {item.recceUnit}
                          </td>
                          <td className="td_S ">
                            {/* {category ? category?.categoryName : ""} */}
                            {item.category}
                          </td>
                          <td className="td_S ">
                            <span
                              className="col-md-5 "
                              variant="info "
                              onClick={() => {
                                handleEdit(item);
                              }}
                              style={{ cursor: "pointer", color: "skyblue" }}
                            >
                              View
                            </span>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row  m-auto ">
          <div className="col-md-8">
            <div className="col-md-1">
              <ArrowCircleLeftIcon
                onClick={(e) => setSelectedPrint(null)}
                style={{ color: "#068FFF" }}
              />{" "}
            </div>
            {/* <p>
              <span className="me-3 clr">Vender Name:</span>
              <span className="me-3 ">{selectedVendor.VendorFirstName}</span>
            </p> */}

            <p>
              <span className="me-3 clr">Store Name:</span>
              <span className="me-3 ">{printingdata.ShopName}</span>
            </p>
            <p className="me-3 clr">Size</p>
            <p>
              <span>width : </span> <span>5.6ft</span>
              <br />
              <span>Height : </span> <span>5.6ft</span>{" "}
            </p>
            <p className="me-3 clr">Category</p>
            <p>
              <span className="me-3 ">{printingdata.category}</span> <br />
            </p>
            <div className="col-md-8 ">
              <span className="me-3 clr">Address :</span>
              <p>
                {printingdata.Area} {printingdata.City}
                {printingdata.Zone}
                {printingdata.Pincode}
              </p>
            </div>
            <div>
              <span className="me-3 clr">Designs :</span>

              {designData.map((design) => (
                <div key={design._id}>
                  {design.reeceDetails.includes(printingdata._id) && (
                    <img
                      alt=""
                      src={`http://api.srimagicprintz.com/designimage/${design?.designimage}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* <div className="row mt-3">
              <div className="col-md-7">
                <span className="clr">Client Comment :</span>
                <Form>
                  <Form.Control
                    className="mt-3"
                    type="text"
                    style={{ padding: "20px" }}
                    as="textarea"
                  />
                  <Button className="mt-3" onClick={() => setTrackJob(null)}>
                    Send
                  </Button>{" "}
                </Form>
              </div>
            </div> */}
          </div>
          {/* <div className="col-md-4 text-end">
            <div className="col-md-12">
              <div className="row m-auto">
                <span className="col-md-12 m-auto">Share to Clients</span>
                <i
                  onClick={handleToggle}
                  className="col-md-12 "
                  style={{ fontSize: "20px", color: "#068fff" }}
                  class="fa-solid fa-share-nodes"
                ></i>{" "}
                {togglelink ? (
                  <Card className="row containerPadding">
                    <div className="row ">
                      <span className="col-md-6 m-auto">Copy the link</span>
                    </div>
                    <div className="col-md-6  text-center m-auto containerPadding">
                      {" "}
                      <img
                        className="col-md-2"
                        src="https://cdn-icons-png.flaticon.com/512/124/124034.png?w=740&t=st=1688971120~exp=1688971720~hmac=7bca837e9b0904e5010df0928343c92b899f4638fdfccf9da17226b484d216b6"
                        alt=""
                      />{" "}
                      <img
                        className="col-md-2"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-google-mail-4062821-3357707.png?f=avif&w=512"
                        alt=""
                      />
                    </div>
                    <div className="row containerPadding m-auto">
                      <input
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                        className="col-md-11 m-auto"
                        style={{ borderRadius: "50px" }}
                      />
                      <button
                        onClick={copyShareLink}
                        className="col-md-3"
                        style={{
                          borderRadius: "50px",
                          position: "absolute",
                          right: "11%",
                        }}
                      >
                        copy
                      </button>
                    </div>
                  </Card>
                ) : null}
              </div>
            </div>
          </div>{" "} */}
        </div>
      )}
    </>
  );
}
