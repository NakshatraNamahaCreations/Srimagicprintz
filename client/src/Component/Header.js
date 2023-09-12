import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userName = user.name;
  const Name = userName.charAt(0).toUpperCase() + userName.substr(1);

  const location = useLocation();
  const pathname = location.pathname;
  let sidenavName = "";

  if (pathname === "/Overview") {
    sidenavName = "Overview";
  } else if (pathname === "/CategoryManagement") {
    sidenavName = "Category Management";
  } else if (pathname === "/VendorManageMent") {
    sidenavName = "Vendor Management";
  } else if (pathname === "/JobManagement") {
    sidenavName = "Job Management";
  } else if (pathname === "/Design") {
    sidenavName = "Design ";
  } else if (pathname === "/fabrication") {
    sidenavName = "Fabrication ";
  } else if (pathname === "/installation") {
    sidenavName = "Installation ";
  } else if (pathname === "/Logout") {
    sidenavName = "Logout ";
  } else if (pathname === "/Printing") {
    sidenavName = "Printing ";
  } else if (pathname === "/ReceeManagement") {
    sidenavName = "Recee";
  } else if (pathname === "/Reports") {
    sidenavName = "Reports";
  } else if (pathname === "/Setting") {
    sidenavName = "Setting ";
  } else if (pathname === "/Trackassignedjob") {
    sidenavName = "Track Assigned Job ";
  } else if (pathname === "/Billing") {
    sidenavName = "Billing ";
  } else if (pathname === "/ClientsManagement") {
    sidenavName = "Clients Management ";
  } else if (pathname === "/Marketing") {
    sidenavName = "Marketing Management ";
  } else if (pathname === "/Notification") {
    sidenavName = " Notification ";
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: "#F9F9F9",
        }}
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="m-auto">
            <Nav.Link>
              {" "}
              <h4>{sidenavName}</h4>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/Notification">
              <NotificationsIcon style={{ fontSize: "40px" }} />
            </Nav.Link>
            <Nav.Link eventKey={2} as={NavLink} to="/Setting">
              {user === [] ? (
                <AccountCircleIcon style={{ fontSize: "40px" }} />
              ) : (
                <>
                 <span className="m-1"> {Name}</span>
                  <img
                    width={"35px"}
                    height={"35px"}
                    style={{ borderRadius: "100px" }}
                    src={`http://localhost:8000/ProfileImage/${user?.profileImage}`}
                    alt=""
                  />
                  <br />
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>{" "}
    </>
  );
}

export default Header;
