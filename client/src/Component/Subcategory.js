import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function Subcategory() {
  const ApiURL = process.env.REACT_APP_API_URL;
  const ImageURL = process.env.REACT_APP_IMAGE_API_URL;
  const [subcatagoryName, setSubCatagoryName] = useState("");
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catagoryName, setCatagoryName] = useState("");
  const [catagorydata, setCatagorydata] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [EditSubcategoryData, setEditSubcategoryData] = useState(null);
  const [editSubcategoryName, setEditSubCatagoryName] = useState("");
  const [editcategoryName, setEditCatagoryName] = useState("");

  const AddSubCatagory = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/Product/subcategory/addsubcategory",
        method: "post",
        baseURL: ApiURL,
        Header: { "Content-Type": "application/json" },
        data: { catagoryName: catagoryName, subCategoryName: subcatagoryName },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          alert("Subcatagory Added");
          window.location.reload();
        }
      });
    } catch (error) {
      alert("not able to complete");
    }
  };

  const getAllSubcategory = async () => {
    let res = await axios.get(
      `${ApiURL}/Product/subcategory/getallsubcategory`
    );
    if (res.status === 200) {
      setSubcategoryData(res.data?.subcatagory);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllSubcategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await fetch(`${ApiURL}/Product/category/getcategory`);
      if (res.ok) {
        const data = await res.json();
        const categoriesArray = Object.values(data.category);
        setCatagorydata(categoriesArray);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (data) => {
    setEditSubcategoryData(data);
    setShowPopup(true);
  };

  const handelUpdate = async () => {
    try {
      const categoryId = EditSubcategoryData._id;

      const config = {
        url: `/Product/subcategory/updateSubcategory/${categoryId}`,
        method: "put",
        baseURL: ApiURL,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          subCategoryName:
            editSubcategoryName || EditSubcategoryData.subCategoryName,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Edit updated");
        window.location.reload();
      }
    } catch (err) {
      alert("you can't edit");
    }
  };

  const deleteCatagory = async (row) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/Product/subcategory/deletesubcatagory/${row._id}`
      );

      if (response.status === 200) {
        alert(response.data.success);
        window.location.reload();
      }
    } catch (error) {
      alert(error, "Cannot delete Subcategory");
    }
  };
  const columns = [
    {
      dataField: "catagoryName",
      text: "Category",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "subCategoryName",
      text: "SubCategory",
      headerAlign: "center",
      align: "center",
    },
    {
      text: "Action",
      headerAlign: "center",
      align: "center",
      formatter: (cell, row) => {
        return (
          <div>
            <span
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => handleEdit(row)}
            >
              Edit
            </span>{" "}
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => deleteCatagory(row)}
            >
              Delete
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="row m-3 containerPadding">
        {!showPopup ? (
          <div className="row  ">
            <div className="col-md-5">
              <div className="row m-auto">
                <Form.Label>Choose Category</Form.Label>{" "}
                <div className="col-md-8">
                  <Form.Select
                    onChange={(e) => setCatagoryName(e.target.value)}
                  >
                    <option value="">Select</option>
                    {catagorydata?.map((category) => (
                      <option key={category._id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row m-auto">
                <Form.Label>Enter SubCategory</Form.Label>{" "}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Control
                      className="col-md-4"
                      type="text"
                      id="Category"
                      placeholder="Enter SubCategory"
                      value={subcatagoryName}
                      onChange={(e) => setSubCatagoryName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <Button variant="primary" onClick={AddSubCatagory}>
                      Save
                    </Button>
                  </div>
                  <div className="col-md-4">
                    <Button variant="primary" href="/CategoryManagement">
                      Go back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6 ">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  defaultValue={EditSubcategoryData?.catagoryName}
                  onChange={(e) => setEditCatagoryName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="row">SubCategory</Form.Label>
                <div className="row">
                  <div className="col-md-8">
                    <Form.Control
                      defaultValue={EditSubcategoryData?.subCategoryName}
                      onChange={(e) => setEditSubCatagoryName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <Button className="row" onClick={handelUpdate}>
                      Update
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="row">
          <div className="col-md-11 m-auto mt-3  containerPadding">
            <BootstrapTable
              striped
              bordered
              hover
              className="h_p"
              keyField="_id"
              data={subcategoryData}
              columns={columns}
              noDataIndication="No data available"
              pagination={paginationFactory({
                sizePerPage: 5,
                hidePageListOnlyOnePage: true,
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
