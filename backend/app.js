const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

//import routes
const authRoute = require("./Route/auth/auth");
const categoryRoute = require("./Route/Product/category");
const subcategoryRoute = require("./Route/Product/subcategory");
const VendorInfo = require("./Route/Vendor/vendorInfo");
const ClientInfo = require("./Route/Client/clients");
const jobmanagement = require("./Route/Jobmangement/assignjob");
const Reccemanagement = require("./Route/recce/recce");
const MarketingManagement = require("./Route/marketingClient/marketingcliend");

//Data Base connection

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!", err));

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//creating routes
app.use("/api/auth/auth", authRoute);
app.use("/api/Product/category", categoryRoute);
app.use("/api/Product/subcategory", subcategoryRoute);
app.use("/api/Vendor/vendorInfo", VendorInfo);
app.use("/api/Client/clients", ClientInfo);
app.use("/api/Jobmangement/assignjob", jobmanagement);
app.use("/api/recce/recce", Reccemanagement);
app.use("/api/marketingClient/marketingcliend", MarketingManagement);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
