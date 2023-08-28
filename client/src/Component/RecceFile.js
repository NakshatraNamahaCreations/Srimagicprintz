import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RecceFile() {
  return (
    <div className="row m-auto mt-3">
      <p>
        <img
          variant="top"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34R0O05LegURUY4r7XpTJdl-LL6aM2oqFiT2ftXDI1IGF5v7-fseCri-eJ6hJqD-N2G0&usqp=CAU"
          alt=""
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100%",
          }}
        />
      </p>
      <p>
        <span className="me-3 clr">Name:</span>
        <span className="me-3 ">Rahul</span>
      </p>
      <p>
        <span className="me-3 clr">Isty Bisty :</span>
        <span className="me-3 ">SMP01</span>
      </p>
      <p>
        <span className="me-3 clr">Phone:</span>
        <span className="me-3 ">5362737263</span>
      </p>
      <p>
        <span className="me-3 clr">Zone :</span>
        <span>East Bengaluru</span>
      </p>
      <p>
        <span className="me-3 clr">Pincode :</span>
        <span>342008</span>
      </p>
      <p>
        <span className="me-3 clr">Pincode :</span>
        <span>342008</span>
      </p>
      <p className="col-md-5">
        <span className="me-3 clr">Address :</span>
        <span>
          1st floor, Above ashapura hardware, Dwaraka Nagar, Banashankari 6th
          Stage 1st Block, Channasandra, Bengaluru, Karnataka 560061
        </span>
      </p>
      <p>
        <span className="me-3 clr">Status :</span>
        <span>Processing</span>
      </p>
      <div className="row ">
        <div className="col-md-5">
          <span className="clr">Client Comment :</span>
          <Form>
            <Form.Control
              className=" mt-3"
              type="text"
              style={{ padding: "20px" }}
              as="textarea"
            />
            <Button className="mt-3">Send</Button>{" "}
          </Form>
        </div>
      </div>
    </div>
  );
}
