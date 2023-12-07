import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PrintIcon from "@mui/icons-material/Print";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimelineIcon from "@mui/icons-material/Timeline";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import axios from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublicIcon from "@mui/icons-material/Public";
import { useLocation } from "react-router-dom";

const navData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Home",
    link: "/Overview",
  },
  {
    id: 1,
    icon: <CategoryIcon />,
    text: "Category Management",
    link: "/CategoryManagement",
  },
  {
    id: 2,
    icon: <BarChartIcon />,
    text: "Vendor Management",
    link: "/VendorManageMent",
  },
  {
    id: 3,
    icon: <BusinessIcon />,
    text: "Clients Management",
    link: "/ClientsManagement",
  },
  {
    id: 4,
    icon: <AssignmentIcon />,
    text: "Job Management",
    link: "/JobManagement",
  },

  {
    id: 5,
    icon: <SettingsIcon />,
    text: "Recee Management",
    link: "/ReceeManagement",
  },
  {
    id: 6,
    icon: <DesignServicesIcon />,
    text: "Design Management",
    link: "/Design",
  },
  {
    id: 7,
    icon: <PrintIcon />,
    text: "Printing Management",
    link: "/Printing",
  },
  {
    id: 8,
    icon: <BuildIcon />,
    text: "Fabrication ",
    link: "/fabrication",
  },
  {
    id: 9,
    icon: <DirectionsRunIcon />,
    text: "Installation ",
    link: "/installation",
  },
  {
    id: 10,
    icon: <PublicIcon />,
    text: "Marketing ",
    link: "/Marketing",
  },
  {
    id: 11,
    icon: <TimelineIcon />,
    text: " Track Assigned Jobs",
    link: "/Trackassignedjob",
  },
  {
    id: 12,
    icon: <DescriptionIcon />,
    text: "Reports",
    link: "/Reports",
  },
  {
    id: 13,
    icon: <MonetizationOnIcon />,
    text: "Billing Management",
    link: "/Billing",
  },
  // {
  //   id: 14,
  //   icon: <SettingsApplicationsIcon />,
  //   text: "Setting",
  //   link: "/Setting",
  // },
  {
    id: 15,
    icon: <ExitToAppIcon />,
    text: "Logout",
    link: "/Logout",
  },
];

const Sidenav1 = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  const toggleOpen = () => {
    setOpen(!open);
  };
  const logindata = localStorage.getItem("userData");
  const giveaccessData = JSON.parse(logindata);
  const [userdata, setuserdata] = useState([]);
  const idd = giveaccessData ? giveaccessData : null;
  useEffect(() => {
    getuser();
  }, []);
  const getuser = async () => {
    let res = await axios.get("http://api.srimagicprintz.com/api/getuser");
    if ((res.status = 200)) {
      console.log(res.data.masteruser);
      setuserdata(res.data?.masteruser);
      // setfilterdata(res.data?.masteruser);
    }
  };
  let userPermissions = userdata.filter((user) => user._id === idd._id);

  let permissions = {};
  if (userPermissions.length > 0) {
    permissions = userPermissions[0];
  }

  const filteredNavData = navData.filter((item) => {
    switch (item.text) {
      case "Category Management":
        return permissions.categoryMamgement;
      case "Vendor Management":
        return permissions.vendor;
      case "Clients Management":
        return permissions.client;
      case "Job Management":
        return permissions.jobmangement;
      case "Recee Management":
        return permissions.Recce;
      case "Design Management":
        return permissions.Design;
      case "Printing Management":
        return permissions.printing;
      case "Fabrication ":
        return permissions.fabrication;
      case "Installation ":
        return permissions.installation;
      case "Marketing ":
        return permissions.marketing;
      case " Track Assigned Jobs":
        return permissions.trackjob;
      case "Reports":
        return permissions.reports;
      case "Billing Management":
        return permissions.billing;
      default:
        return true;
    }
  });

  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>
      <button className="menuBtn" onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>

      <div className="row ul_list">
        <li
          style={{
            width: "95%",
            borderBottom: "1px solid grey",
            display: open ? " flex" : "none",
          }}
        >
          <NavLink
            to="/"
            className="link_tag img"
            style={{ textDecoration: "none" }}
          >
            <img
              className="m-auto"
              style={{ borderRadius: "100px" }}
              width="60px"
              height="60px"
              src="../Assests/images.jpg"
              alt=""
            />
            <h6
              style={{
                display: open ? " flex" : " none",
              }}
            >
              Sri Magic Printz
            </h6>
          </NavLink>
        </li>

        {filteredNavData.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                className={
                  isActive(item.link) ? "sideitem active" : "sideitem "
                }
                activeClassName="active"
                to={item.link}
              >
                {item.icon}
                <span className={open ? "linkText " : "linkTextClosed active"}>
                  {item.text}
                </span>
              </NavLink>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenav1;
