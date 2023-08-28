import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Header from "./Header";

function Billing() {
  const [search, setSearch] = useState(true);
  const [filter, setFilter] = useState(false);
  const handleFilter = () => {
    setFilter(!filter);
  };
  const data = [
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Completed",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "North",
      pincode: "342564",
      date: "21-04-2023",
      status: "Pending",
    },
    {
      name: "Ramesh",
      businessName: "Ashapura Hardware",
      venderName: "Ashapura Hardware",
      city: "Channasandra",
      zone: "West",
      pincode: "342564",
      date: "21-04-2023",
      status: "Processing",
    },
  ];
  return (
    <>
      {" "}
      <Header />
      <div className="row  m-auto containerPadding">
        <div className="row">
          <div className="col-md-9">
            <Form.Group className="row m-auto">
              <Form.Label>Search Client</Form.Label>
              <Form.Control className="col-md-3" value={"Nike"} />
              <Button className="col-md-2" href="/Billingquote">
                Search
              </Button>
            </Form.Group>{" "}
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
        <div
          style={{ position: "relative", zIndex: "-1" }}
          className="table-container mt-4 "
        >
          <div className="table-wrapper2">
            <Table bordered className="col-md-12 ">
              <thead>
               
                <tr className="text-center">
                  <th>SI. NO.</th>
                  <th>Client Name </th>
                  <th>Store Name</th>
                  <th>Vendor Name</th>
                  <th>Store Location</th>
                  <th>Zone</th>
                  <th>Pincode</th>
                  <th>Date of Completion</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((ele, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.businessName}</td>
                      <td>{ele.businessName}</td>
                      <td>{ele.city}</td>
                      <td>{ele.zone}</td>
                      <td>{ele.pincode}</td>
                      <td>{ele.date}</td>
                      <td>{ele.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Billing;
