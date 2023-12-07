import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
// import "/MyComponent.css"

function Userrights() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const location = useLocation();
  const { data } = location.state || {};

  const [citydata, setcitydata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [selected, setSelected] = useState(0);
  const [home, setHome] = useState(false);
  const [master, setMaster] = useState(data?.master || false);
  const [enquiry, setEnquiry] = useState(data?.enquiry || false);
  const [enquiryFollowup, setEnquiryFollowup] = useState(
    data?.enquiryFollowup || false
  );
  const [survey, setSurvey] = useState(data?.survey || false);
  const [quote, setQuote] = useState(data?.quote || false);
  const [customer, setCustomer] = useState(data?.customer || false);
  const [quoteFollowup, setQuoteFollowup] = useState(
    data?.quoteFollowup || false
  );
  const [dsr, setDSR] = useState(data?.dsr || false);
  const [runningProjects, setRunningProjects] = useState(
    data?.runningProjects || false
  );
  const [closeProjects, setCloseProject] = useState(
    data?.closeProjects || false
  );
  const [b2b, setB2B] = useState(data?.b2b || false);
  const [community, setCommunity] = useState(data?.community || false);
  const [paymentReport, setpaymentReport] = useState(data?.paymentReport || false);
  const [reports, setReports] = useState(data?.reports || false);
  const apiURL = process.env.REACT_APP_API_URL;
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [selectedCatagory, setSelectedCatagory] = useState(
    data?.category || []  );
  const [selectedCity, setSelectedCity] = useState(data.city || []);

  const givenRights = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/giveaccess/${data._id}`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          userid: data._id,
          master: master,
          enquiry: enquiry,
          enquiryFollowup: enquiryFollowup,
          survey: survey,
          quote: quote,
          customer: customer,
          quoteFollowup: quoteFollowup,
          dsr: dsr,
          runningProjects: runningProjects,
          closeProjects: closeProjects,
          b2b: b2b,
          community: community,
          reports: reports,
          category: selectedCatagory,
          city: selectedCity,
          paymentReport:paymentReport
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("Added");
          window.location.assign("/user");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
      setfilterdata(res.data?.category);
    }
  };

  // console.log("categorydata", categorydata);
  useEffect(() => {
    getcategory();
    getcity();
  }, []);

  const onSelectCatagory = (selectedList, selectedItem) => {
    // Handle select event
    setSelectedCatagory(selectedList);
    console.log(selectedList);
    console.log(selectedItem);
  };

  const onRemoveCatagory = (selectedList, removedItem) => {
    // Handle remove event
    setSelectedCatagory(selectedList);
    console.log(selectedList);
    console.log(removedItem);
  };

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
      // console.log("city", res);
      setfilterdata(res.data?.mastercity);
    }
  };

  const onSelectCity = (selectedList, selectedItem) => {
    // Handle select event
    setSelectedCity(selectedList);
    console.log(selectedList);
    console.log(selectedItem);
  };

  const onRemoveCity = (selectedList, removedItem) => {
    // Handle remove event
    setSelectedCity(selectedList);
    console.log(selectedList);
    console.log(removedItem);
  };

  return (
    <div className="row pb-3">
      <Header />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card mt-2">
            <div className="card-body">
              <div className="header-text1">
                User Rights For : {admin?.displayname}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-end pt-3">
        <div className="col-md-1 p-0">
          <Link to="/user">
            <button
              className="btn-primary-button"
              //   style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              User Add
            </button>
          </Link>
        </div>
        <div className="col-md-1 p-0">
          <Link to="/user">
            <button
              //   style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-primary-button"
            >
              User View
            </button>
          </Link>
        </div>
      </div>

      <div className="row mt-4 m-auto">
        <div className="col-md-6" style={{ width: "36%" }}>
          <div className="card" style={{ padding: "10px 27px" }}>
            <div className="table-content ">Rights For Left Menu</div>
            <Multiselect
              className="mt-3"
              options={categorydata.map((category) => ({
                name: category.category,
                // id: category._id,
              }))}
              placeholder="Select Catagory"
              selectedValues={selectedCatagory}
              onSelect={onSelectCatagory}
              onRemove={onRemoveCatagory}
              displayValue="name"
              // disablePreSelectedValues={true}
              showCheckbox={true}
            />{" "}
            <Multiselect
              className="mt-3"
              options={citydata.map((cityData) => ({
                name: cityData.city,
                // id: cityData._id,
              }))}
              placeholder="Select City"
              // selectedValues={citydata}
              selectedValues={selectedCity}
              onSelect={onSelectCity}
              onRemove={onRemoveCity}
              displayValue="name"
              // disablePreSelectedValues={false}
              showCheckbox={true}
            />
            <table class="table table-bordered mt-3">
              <tbody>
                {/* <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={home}
                      onChange={(e) => setHome(e.target.checked)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Home</td>
                </tr> */}
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={master}
                      onChange={(e) => setMaster(!master)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Master</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={enquiry}
                      onChange={(e) => setEnquiry(!enquiry)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Enquiry</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={enquiryFollowup}
                      onChange={(e) => setEnquiryFollowup(!enquiryFollowup)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Enquiry Followup</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={survey}
                      onChange={(e) => setSurvey(!survey)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Survey</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={quote}
                      onChange={(e) => setQuote(!quote)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Quote</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={customer}
                      onChange={(e) => setCustomer(!customer)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Customer</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={quoteFollowup}
                      onChange={(e) => setQuoteFollowup(!quoteFollowup)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Quote Followup</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={dsr}
                      onChange={(e) => setDSR(!dsr)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>DSR</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={runningProjects}
                      onChange={(e) => setRunningProjects(!runningProjects)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Running Project</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={closeProjects}
                      onChange={(e) => setCloseProject(!closeProjects)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Close Project</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={b2b}
                      onChange={(e) => setB2B(!b2b)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>B2B</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={community}
                      onChange={(e) => setCommunity(!community)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Community</td>
                </tr>
                  <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={paymentReport}
                      onChange={(e) => setpaymentReport(!paymentReport)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Payment Report</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={reports}
                      onChange={(e) => setReports(!reports)}
                    />
                  </td>
                  <td style={{ width: "80%" }}>Reports</td>
                </tr>
                <tr
                  className="user-tbale-body"
                  style={{ backgroundColor: "#eee", height: "40px" }}
                >
                  <td className="text-center"></td>
                  <td className="text-center">
                    <button className="vhs-button" onClick={givenRights}>
                      Save
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6" style={{ width: "36%", marginLeft: "50px" }}>
          <div className="card" style={{ padding: "10px 27px" }}>
            <div className="table-content">Rights For Mis Reports</div>
          
            <table class="table table-bordered mt-3">
              <tbody>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>Dsr</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>Dsr Call</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}> Customer Payment Gst Bill</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>
                    Customer Pending Payment Pending Bill
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>
                    {" "}
                    Customer Payment Non Gst Bill
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>
                    Customer Payment Combine Both Gst And Non Gst Payment
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}> Customer Payment Received</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}> Expense</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}> Customer Service Expiry</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>Amc Sale</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>Service Due</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}>Enquiry</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }}>
                    <input type="checkbox" className="table-checkbox" />
                  </td>
                  <td style={{ width: "80%" }}> Not Interested Enquiry</td>
                </tr>
                <tr
                  className="user-tbale-body"
                  style={{ backgroundColor: "#eee", height: "40px" }}
                >
                  <td className="text-center"></td>
                  <td className="text-center">
                    <button className="vhs-button">Save</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userrights;