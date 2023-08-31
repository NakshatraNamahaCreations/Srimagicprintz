import Vendor from "./Component/VendorManageMent";
import Category from "./Component/Category";
import Design from "./Component/Design";
import Billing from "./Component/Billing";
import Fabrication from "./Component/fabrication";
import Installation from "./Component/installation";
import JobManagement from "./Component/JobManagement";
import Logout from "./Component/Logout";
import Printing from "./Component/Printing";
import ReceeManagement from "./Component/ReceeManagement";
import Reports from "./Component/Reports";
import Trackassignedjob from "./Component/Trackassignedjob";
import ClientsManagement from "./Component/ClientsManagement";
import Setting from "./Component/Setting";
import { Routes, Route, useLocation } from "react-router-dom";
import Overview from "./Component/Overview";
import "./App.css";
import Sidenav1 from "./Component/sidenav";
import Marketing from "./Component/Marketing";
import RecceFile from "./Component/RecceFile";
import { Login } from "./Component/Login";
import { Signup } from "./Component/Signup";
import Notification from "./Component/Notification";
import Billingquote from "./Component/Billingquote";
import BillingEstimate from "./Component/BillingEstimate";
import Estiamtecalculation from "./Component/Estimatecalculation";
import Invoice from "./Component/Invoice";
import Marketingshedule from "./Component/Marketingshedule";
import MarketingAddClient from "./Component/MarketingAddClient";
import MarketingInfo from "./Component/MarketingInfo";
import Estimate from "./Component/Estimate";
import Addcategory from "./Component/Addcategory";
// import Subcategory from "./Component/Subcategory";
import VendorInfo from "./Component/VendorInfo";
import ClientInfo from "./Component/ClientsInfo";
import ReceeManagementApi from "./Component/Recceapi";


export default function App() {
  const location = useLocation();
  const excludeRoutes = ["/RecceFile", "/", "/Signup"];
  const shouldRenderSidenav = !excludeRoutes.includes(location.pathname);
  return (
    <>
      <div className="App">
        {shouldRenderSidenav && (
          <div className="sidenav-container">
            <Sidenav1 />
          </div>
        )}
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/RecceFile" element={<RecceFile />} />
            <Route exact path="/Overview" element={<Overview />} />
            <Route path="/CategoryManagement" element={<Category />} />
            <Route path="/VendorManageMent" element={<Vendor />} />
            <Route path="/VendorInfo" element={<VendorInfo />} />
            <Route path="/ClientsManagement" element={<ClientsManagement />} />
            <Route path="/ClientsInfo" element={<ClientInfo />} />
            <Route path="/JobManagement" element={<JobManagement />} />
            <Route path="/ReceeManagement" element={<ReceeManagement />} />
            <Route path="/Recceapi" element={<ReceeManagementApi />} />
            <Route path="/Design" element={<Design />} />
         
            <Route path="/Printing" element={<Printing />} />
            <Route path="/fabrication" element={<Fabrication />} />
            <Route path="/installation" element={<Installation />} />
            <Route path="/Marketing" element={<Marketing />} />
            <Route path="/Marketingshedule" element={<Marketingshedule />} />
            <Route
              path="/MarketingAddClient"
              element={<MarketingAddClient />}
            />
            <Route path="/MarketingInfo" element={<MarketingInfo />} />
            <Route path="/Trackassignedjob" element={<Trackassignedjob />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Billing" element={<Billing />} />
            <Route path="/Billingquote" element={<Billingquote />} />
            <Route path="/Estimate" element={<Estimate />} />
            <Route path="/Addcategory" element={<Addcategory />} />
            {/* <Route path="/Subcategory" element={<Subcategory />} /> */}
            <Route
              path="/Estiamtecalculation"
              element={<Estiamtecalculation />}
            />
            <Route path="/BillingEstimate" element={<BillingEstimate />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </main>{" "}
      </div>
    </>
  );
}
