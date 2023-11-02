import React from "react";
import Button from "react-bootstrap/esm/Button";
import Header from "./Header";
import axios from "axios";
export default function Logout() {
  const Logout = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      let res = await axios.delete(
        `http://localhost:8001/api/auth/auth/logout/${user._id}`
      );

      if (res.status === 200) {
        localStorage.removeItem("userData");
        localStorage.clear();
        alert("logged out succesfully");
        window.location.href = "/";
      }
    } catch (err) {
      alert(err, "can't abel to logout");
    }
  };

  return (
    <>
      <Header />

      <div className="row mt-5 m-auto containerPadding">
        <p className="col-md-4 m-auto" style={{ color: "#068fff" }}>
          Are you sure you want to logout
        </p>
        <div className="row text-center mt-5">
          <div className="m-auto">
            <Button className=" m-1 c_W" onClick={Logout}>
              Logout
            </Button>
            <Button className=" m-1 c_W">Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
