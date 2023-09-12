import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Header from "./Header";

export default function Logout() {
  return (
    <>
      <Header />

      <div className="row mt-5 m-auto containerPadding">
        <p className="col-md-4 m-auto" style={{ color: "#068fff" }}>
          Are you sure you want to logout
        </p>
        <div className="row text-center mt-5">
          <div className="m-auto">
            <Button className=" m-1 c_W" href="/">
              Logout
            </Button>
            <Button className=" m-1 c_W">Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
