import { act } from "react-dom/test-utils";
import { createStore } from "redux";

const initialState = {
  Name: "",
  img: "",
};

export const setLoginData = (Name, img) => ({
  type: "SET_LOGIN_DATA",
  payload: {
    Name,
    img,
  },
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_DATA":
   
      return {
        ...state,
        Name: action.payload.Name,
        img: action.payload.img,
      };
    case "UPDATE_CATEGORY_DATA":
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(loginReducer);

// Retrieve login data from localStorage if available
const savedLoginData = localStorage.getItem("loginData");
const initialLoginData = savedLoginData ? JSON.parse(savedLoginData) : {};

// Dispatch the initial login data to the store
store.dispatch(setLoginData(initialLoginData.Name, initialLoginData.img));

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "loginData",
    JSON.stringify({
      Name: state.Name,
      img: initialLoginData.img, // Retrieve password from initialLoginData
    })
  );
});

export default store;








// import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Header from "./Header";
// import Col from "react-bootstrap/Col";
// import Table from "react-bootstrap/Table";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/esm/Button";
// import Card from "react-bootstrap/Card";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
//
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
//   function JobManagement() {
//   const [AssignJob, setAssignJob] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [AssignedJob, setAssignedJob] = useState(null);
//   const [jobType, setJobType] = useState("Recce");
//   const [addPrint, setAddPrint] = useState(false);
//   const [assignedJobDetails, setAssignedJobDetails] = useState(null);
//   const [installation, setInstallation] = useState(null);
//   const [assignJobtoclient, setAssignJobToClient] = useState([]);
//   const handleAddPrint = () => {
//     setAddPrint(!addPrint);
//   };
//   const handleinstallation = (index) => {
//     setInstallation(index);
//   };
//   const handleAssignedJobDetails = (index) => {
//     setAssignedJobDetails(index);
//   };

//   const handleAssignedJob = (index) => {
//     setAssignJob(index);
//   };
//   const data1 = [
//     {
//       Group: "Group1",
//       Job: "SMP2342",
//     },
//   ];
//   const data = [
//     {
//       name: "Rahul",
//       Date: "06-28-2023",
//       mobile: 2384759234,
//       AssignedJob: 34,
//       CompletedJob: 26,
//       img: "https://lawschoolpolicyreview.files.wordpress.com/2018/06/passport-size-photo-2-e1558013566564.jpg",
//     },
//   ];

//   const handlesetSelected = (index) => {
//     setSelected(index);
//   };

//   const handleAssignJob = async () => {
//     toast.success("You have succesfully assigned job to sohel");
//     setAssignJob(true);
//   };
//   const handleAssignJobback = () => {
//     setAssignJob(false);
//   };

//   // clien info call here

//   useEffect(() => {
//     getAllClientsInfo();
//   }, []);

//   const getAllClientsInfo = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8000/api/Client/clients/getallclient"
//       );
//       if (res.status === 200) {
//         setAssignJobToClient(res.data.client);
//       }
//     } catch (err) {
//       alert(err, "err");
//     }
//   };
//   return (
//     <>
//       <Header />

//       <div className="row mt-3 m-auto containerPadding">
//         {!AssignJob ? (
//           <Form>
//             <Row>
//               <Col>
//                 <Form.Group
//                   md="5"
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Types of Job</Form.Label>
//                   <Form.Select
//                     value={jobType}
//                     onChange={(e) => setJobType(e.target.value)}
//                     type="text"
//                   >
//                     <option>Recce</option>
//                     <option>Design</option>
//                     <option>Printing</option>
//                     <option>Fabrication</option>
//                     <option>Installation</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group
//                   md="5"
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Client Name</Form.Label>
//                   <Form.Select>
//                     <option>Choose...</option>

//                     <option>{assignJobtoclient.clientsName}</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group
//                   md="5"
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Contact Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter contact number"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col>
//                 <Form.Group
//                   md="5"
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Pincode</Form.Label>
//                   <Form.Control type="text" placeholder="Pincode" />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group
//                   md="5"
//                   className="mb-3"
//                   controlId="exampleForm.ControlInput1"
//                 >
//                   <Form.Label>Zone</Form.Label>
//                   <Form.Control type="text" placeholder="Enter Zone" />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="row m-auto">
//               <Button onClick={handleAssignJob} className="col-md-2">
//                 Assign Job
//               </Button>
//             </Row>
//           </Form>
//         ) : (
//           <>
//             {!selected ? (
//               <>
//                 <div className="col-md-1 " onClick={handleAssignJobback}>
//                   <ArrowCircleLeftIcon
//                     style={{ color: "#068FFF", fontSize: "35px" }}
//                   />
//                 </div>{" "}
//                 <div className="table-container mt-1 containerPadding">
//                   <div className="table-wrapper">
//                     <Table bordered className="col-md-12 ">
//                       <thead>
//                         <tr className="text-center">
//                           <th>SI. NO. </th>
//                           <th>Client Name</th>
//                           <th>Business Name</th>
//                           <th>Location</th>
//                           <th>Zone</th>
//                           <th>Pincode</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-center">
//                         <tr onClick={handlesetSelected}>
//                           <td>1</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>2</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>3</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>4</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>5</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>6</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>

//                         <tr onClick={handlesetSelected}>
//                           <td>7</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>

//                         <tr onClick={handlesetSelected}>
//                           <td>8</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                         <tr onClick={handlesetSelected}>
//                           <td>9</td>
//                           <td>Arun</td>
//                           <td>Printing</td>
//                           <td>R.R.Nagar</td>
//                           <td>West</td>
//                           <td>324894</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               </>
//             ) : jobType === "Recce" ? (
//               <>
//                 <ToastContainer type="success" />
//                 {assignedJobDetails ? (
//                   <div className="row m-auto">
//                     <div className="col-md-1" onClick={() => setSelected(null)}>
//                       <ArrowCircleLeftIcon
//                         style={{ color: "#068FFF", fontSize: "35px" }}
//                       />
//                     </div>
//                     <div className="col-md-12 ">
//                       <div className="col-md-5 m-auto">
//                         <p>
//                           <img
//                             variant="top"
//                             src={
//                               assignedJobDetails && data[assignedJobDetails].img
//                             }
//                             alt=""
//                             style={{
//                               width: "100px",
//                               height: "100px",
//                               borderRadius: "100%",
//                             }}
//                           />
//                         </p>
//                         <p>
//                           <span className="cl">Name:</span>
//                           <span>
//                             {assignedJobDetails &&
//                               data[assignedJobDetails].name}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Contact Number:</span>
//                           <span>
//                             {assignedJobDetails &&
//                               data[assignedJobDetails].mobile}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Email:</span>
//                           <span>
//                             {assignedJobDetails &&
//                               `${data[assignedJobDetails].name}234@gmail.com`}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Account Number:</span>
//                           <span>
//                             {assignedJobDetails &&
//                               `21${data[assignedJobDetails].mobile}32`}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Address:</span>
//                           <span>
//                             #374, Dwaraka Nagar, Channasandra Near Yuva Hardware
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div
//                       className="col-md-1"
//                       onClick={() => handleAssignedJobDetails(0)}
//                     >
//                       <ArrowCircleLeftIcon
//                         style={{ color: "#068FFF", fontSize: "35px" }}
//                       />
//                     </div>
//                     <div className="row m-auto containerPadding">
//                       {data.map((ele, index) => {
//                         return (
//                           <Card
//                             key={index}
//                             className="col-md-4 m-3 p-2"
//                             style={{
//                               width: "200px",
//                               height: "250px",
//                               borderRadius: "10%",
//                             }}
//                           >
//                             <div
//                               className="row text-center m-auto"
//                               onClick={() => handleAssignedJobDetails(index)}
//                             >
//                               <img
//                                 style={{
//                                   width: "70%",
//                                   height: "50%",
//                                   borderRadius: "100%",
//                                 }}
//                                 className="m-auto"
//                                 src={ele.img}
//                                 alt=""
//                               />

//                               <span>{ele.name}</span>
//                               <span>{ele.mobile}</span>
//                             </div>
//                             <div className="row m-auto">
//                               <Button
//                                 onClick={() => handleAssignedJobDetails(index)}
//                               >
//                                 Assigned Job
//                               </Button>
//                             </div>
//                           </Card>
//                         );
//                       })}
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : jobType === "Design" ? (
//               <>
//                 <ToastContainer type="success" />
//                 <div className="col-md-1" onClick={(e) => setSelected(e, null)}>
//                   <ArrowCircleLeftIcon
//                     style={{ color: "#068FFF", fontSize: "35px" }}
//                   />
//                 </div>
//                 <div className="row m-auto containerPadding">
//                   {" "}
//                   <div className="col-md-8">
//                     <div>
//                       <img
//                         className="rounded"
//                         width={"120px"}
//                         height={"60px"}
//                         src="https://d2tl9ctlpnidkn.cloudfront.net/hlsonprint/images/products_gallery_images/vinyl-banner-printing-hls-02b35.jpg"
//                         alt=""
//                       />
//                     </div>

//                     <div className="row mt-5">
//                       <div
//                         className="col-md-5 "
//                         style={{
//                           padding: "20px",
//                           border: "1px solid grey",
//                           borderRadius: "20px",
//                         }}
//                       >
//                         <div className="text-center">
//                           <p> Add your design</p>

//                           <AddCircleOutlineIcon
//                             className="m-auto"
//                             style={{ color: "blue" }}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-1">
//                         <label>
//                           <input type="file" className="hide" />
//                           <img
//                             className="mt-4"
//                             width={"50px"}
//                             height={"50px"}
//                             alt=""
//                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
//                           />
//                         </label>
//                       </div>
//                       <div className="col-md-1">
//                         <label>
//                           <input type="file" className="hide" />
//                           <img
//                             className="mt-4"
//                             width={"50px"}
//                             height={"50px"}
//                             alt=""
//                             src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
//                           />
//                         </label>
//                       </div>
//                     </div>
//                     <div className="row mt-3">
//                       <div className="col-md-7">
//                         <Button
//                           onClick={() => setSelected(null)}
//                           className="mt-3"
//                         >
//                           Add Design
//                         </Button>{" "}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : null || jobType === "Installation" ? (
//               <>
//                 <ToastContainer type="success" />
//                 {installation ? (
//                   <div className="row m-auto">
//                     <div className="col-md-1" onClick={() => setSelected(null)}>
//                       <ArrowCircleLeftIcon
//                         style={{ color: "#068FFF", fontSize: "35px" }}
//                       />
//                     </div>
//                     <div className="col-md-12 ">
//                       <div className="col-md-5 m-auto">
//                         <p>
//                           <img
//                             variant="top"
//                             src={installation && data[installation].img}
//                             alt=""
//                             style={{
//                               width: "100px",
//                               height: "100px",
//                               borderRadius: "100%",
//                             }}
//                           />
//                         </p>
//                         <p>
//                           <span className="cl">Name:</span>
//                           <span>{installation && data[installation].name}</span>
//                         </p>
//                         <p>
//                           <span className="cl">Contact Number:</span>
//                           <span>
//                             {installation && data[installation].mobile}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Email:</span>
//                           <span>
//                             {installation &&
//                               `${data[installation].name}234@gmail.com`}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Account Number:</span>
//                           <span>
//                             {installation && `21${data[installation].mobile}32`}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="cl">Address:</span>
//                           <span>
//                             #374, Dwaraka Nagar, Channasandra Near Yuva Hardware
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="col-md-1" onClick={() => setSelected(null)}>
//                       <ArrowCircleLeftIcon
//                         style={{ color: "#068FFF", fontSize: "35px" }}
//                       />
//                     </div>
//                     <div className="row m-auto containerPadding">
//                       {data1.map((ele, index) => {
//                         return (
//                           <Card
//                             className="col-md-4 m-3 p-2"
//                             style={{
//                               width: "200px",
//                               height: "250px",
//                               borderRadius: "10%",
//                             }}
//                           >
//                             <div
//                               className="row text-center m-auto"
//                               onClick={() => handleinstallation(index)}
//                             >
//                               <h4>{ele.Group}</h4>
//                               <h4>{ele.Job}</h4>
//                             </div>
//                             <div className="row m-auto">
//                               <Button onClick={() => handleinstallation(index)}>
//                                 Assigned Job
//                               </Button>
//                             </div>
//                           </Card>
//                         );
//                       })}
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : null || jobType === "Printing" ? (
//               <>
//                 <div className="col-md-12">
//                   {!addPrint ? (
//                     <>
//                       {" "}
//                       <Row className="row m-auto">
//                         <Col>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlInput1"
//                           >
//                             <Form.Label>Category</Form.Label>
//                             <Form.Select type="text">
//                               <option>Choose All...</option>
//                               <option>Outdooor Singas</option>
//                               <option>Promption products</option>
//                               <option>Outdooor Singas</option>
//                               <option>Outdooor Singas</option>
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlInput1"
//                           >
//                             <Form.Label>Subcategory</Form.Label>
//                             <Form.Select type="text">
//                               <option>Choose All...</option>
//                               <option>Table Top Lit Poster</option>
//                               <option>Gifts</option>
//                               <option>Roll Up Standee</option>
//                               <option>Gifts</option>
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlInput1"
//                           >
//                             <Form.Label>Quantity</Form.Label>
//                             <Form.Control
//                               placeholder="Enter  Quantity"
//                               type="text"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                       <div className="row mt-3">
//                         <Button
//                           onClick={handleAddPrint}
//                           className="col-md-2 mt-3 m-auto"
//                         >
//                           Process
//                         </Button>{" "}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="row  m-auto ">
//                         <div className="col-md-8">
//                           <p>
//                             <span className="me-3 clr">Isty Bisty :</span>
//                             <span className="me-3 ">SMP01</span>
//                           </p>
//                           <p>
//                             <span className="me-3 clr">Quantity :</span>
//                             <span className="me-3 ">5</span>
//                           </p>
//                           <p className="me-3 clr">Size</p>
//                           <p>
//                             <span>width : </span> <span>5.6ft</span>
//                             <br />
//                             <span>Height : </span> <span>5.6ft</span>{" "}
//                           </p>
//                           <p className="me-3 clr">Category</p>
//                           <p>
//                             <span className="me-3 ">Promostion products</span>{" "}
//                             <br />
//                             <span className="me-3 ">Canapy </span>{" "}
//                           </p>

//                           <div>
//                             <span className="me-3 clr">Design :</span>
//                             <img
//                               width={"100px"}
//                               height={"50px"}
//                               className="me-4"
//                               style={{
//                                 border: "1px solid grey",
//                                 borderRadius: "10px",
//                               }}
//                               alt=""
//                               src="https://lh5.googleusercontent.com/p/AF1QipNhw3RlHgDeOCF8nNOHjDT282CkSu4RcY-MrhFJ=w390-h262-n-k-no"
//                             />
//                             <img
//                               width={"40px"}
//                               height={"30px"}
//                               className="me-4"
//                               alt=""
//                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
//                             />

//                             <img
//                               width={"50px"}
//                               height={"50px"}
//                               alt=""
//                               src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row mt-3">
//                         <div className="col-md-7">
//                           <Button
//                             onClick={() => setSelected(null)}
//                             className="mt-3"
//                           >
//                             Process
//                           </Button>{" "}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </>
//             ) : null || jobType === "Fabrication" ? (
//               <>
//                 <div className="col-md-8">
//                   <div>
//                     <img
//                       style={{ borderRadius: "10px" }}
//                       width={"120px"}
//                       height={"60px"}
//                       src="https://d2tl9ctlpnidkn.cloudfront.net/hlsonprint/images/products_gallery_images/vinyl-banner-printing-hls-02b35.jpg"
//                       alt=""
//                     />
//                   </div>

//                   <div className="row mt-5">
//                     <div
//                       className="col-md-5 "
//                       style={{
//                         padding: "20px",
//                         border: "1px solid grey",
//                         borderRadius: "20px",
//                       }}
//                     >
//                       <div className="text-center">
//                         <p> Add your design</p>

//                         <AddCircleOutlineIcon
//                           className="m-auto"
//                           style={{ color: "blue" }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-1">
//                       <label>
//                         <input type="file" className="hide" />
//                         <img
//                           className="mt-4"
//                           width={"50px"}
//                           height={"50px"}
//                           alt=""
//                           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAB8CAMAAAC16xlOAAAAk1BMVEX2tjj////5+fn2sR/4+vz44LzZ2dnw8PD2tC786Mv0uEnU1NXZ08zm5ubU1tjdz7v4xWr++O/87931rQD3vVL3wF7+9Ob50pL++/f85cP74bj869L5zof4xnD626r5yn362KLXxKbboS34u0X27+bcmwDx59jp4dbnqzPRmzLqwoLtvWfZsW7Tyr+7vb/GxsfftGm0tGBfAAADoUlEQVR4nM3cW1ejMBQF4GCUBmovAUq5lFplxlFn6sz//3WTQKAFi9oCPXs/6du3aNcmnJAyq45MMpd9liDbpdb4YfVfSc7FpyLGBBdBfD1S4n/hMSo/i65Eir8n0igRXoUUBV99aEcmNu51MiTn+yJlyq5BWvMzSMxPrkDKzrlKjLlXIC3PI4kxq+BC0hqPFMCRGAckOYMmHICkOnzIsKXXnzRwhEjRSKp+JRzp0Cs4pFWERmKuPEHiVBGdpO0dTeK16CJ5t0SJeSdpZtPk8SnvItmTG5JEP+Ju0oToOi1++l2k2WxCk2eHdZGIPrqbWynGI6krfUl+vYxFmtjT6fyS3L+euqEMQJpoz+KSPD6lnidHINlz++3Cuwrjvu+LZHDS1F71u4HzdUX6/aLybM/sfiUwm7/1XVLw1JD+vKrs36fvf6e9Mv/2AKYr4oFJnejfkyIt9vf7/X2vLM6aLZxMzlaBTvGPO0B6i5jLANaTjYiMbdBIG7ZDI+1Y0v8LOWh4wmI0UszOmlJeIcJhHrWhHY+FObWhmTxkcoB2GzJuxKyAGtFMoFYCK2pEI2KlSGeOvEeOyBRpjUXSS7gtVFfyrSLdYZFiRUp7LwSHjJ8qUoh1lUJNwvp6S0WSUHcUV5Oink9eg0bPddnZ24OjRu/RKtIDEmlTkJDqW+8RKNIWiKTKW5OQVt+qvDUJqb5VeWtSiEQKy/kSEsmCJVE7jpIbEs4dRSwNCae+dXkXJJz6FjtDwhme8MSQcOpbl3dBwhmeCMeQgIYnniHhDE/y0JAimOGJG1XbOjDDk6DeaUKpb7GqSSj1LR5qEkp9l2/nFCSU4UlR3iXJQSE5NckDWcT5Xk1CGZ7wsCZJakuVww64BOnK4ECKMPYJxTI6vCeA0ZVlUxoSxtZlsfKuSBj1bV6tLEkY9a3HJjUJY/VdlrchYdR3Wd6GJDFI8oiEManwrWMSxnepQUJ4IKjOSFx2NGYcUtYgIdS3Ke+KtAP4MvFdg4QwPOFJgxQjfHBxg5QikNIGCWJ44jVICPuEuWyQEIYn1TnA6kQqwANB0CLRPxAUM+9jEn19V+Vdk+jruyrvmkRf31V516SUnpS2SPSrbx62SPSveYg2ib6+c9kmkXdl+8ieFVEvdQ/H7+tfXaAenpixyTGJelLx4fgn/dsCfviBRLxrUe5VtEgeLck7QbIcQYYSwrFOkSwv+PLHV0YCBUen0hsk9ey0IWjMYNP8WYn/NPFdfinnNV8AAAAASUVORK5CYII="
//                         />
//                       </label>
//                     </div>
//                     <div className="col-md-1">
//                       <label>
//                         <input type="file" className="hide" />
//                         <img
//                           className="mt-4"
//                           width={"50px"}
//                           height={"50px"}
//                           alt=""
//                           src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
//                         />
//                       </label>
//                     </div>
//                   </div>
//                   <div className="row mt-3">
//                     <div className="col-md-7">
//                       <Button
//                         onClick={() => setSelected(null)}
//                         className="mt-3"
//                       >
//                         Add fabrication
//                       </Button>{" "}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : null}
//           </>
//         )}
//       </div>
//     </>
//   );
// }
