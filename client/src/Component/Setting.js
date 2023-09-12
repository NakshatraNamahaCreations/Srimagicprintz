import Header from "./Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
export default function Setting() {
  const user = JSON.parse(sessionStorage.getItem("userData"));
  console.log(user)
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
                   src={`http://localhost:8000/ProfileImage/${user?.profileImage}`}
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
                  <BorderColorIcon />{" "}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
