import Header from "./Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";

export default function Setting() {
  const ImageURL = process.env.REACT_APP_IMAGE_API_URL;
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Header />

      <div className="row  m-auto containerPadding">
        <div className="row m-auto ">
          <div className="col-md-2 m-auto">
            <div className="row">
              <div>
                {user === [] ? (
                  <div>
                    <AccountCircleIcon
                      style={{ fontSize: "100px", color: "grey" }}
                    />
                  </div>
                ) : (
                  <img
                    width={"100px"}
                    height={"100px"}
                    style={{ borderRadius: "100px" }}
                    src={`${ImageURL}/ProfileImage/${user?.primages}`}
                    alt=""
                  />
                )}

                <CameraAltIcon
                  style={{
                    position: "absolute",
                    top: "25%",
                    left: "61%",
                    color: "grey",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row m-auto ">
          <div className="col-md-2 m-auto ">
            <div className="row">
              <div>
                <h6>
                  {" "}
                  Sri magic prints
                  <Link to="/users">
                    <BorderColorIcon />{" "}
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
