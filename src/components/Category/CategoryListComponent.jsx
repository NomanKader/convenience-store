import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const CategoryListComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    axios.get("http://localhost:5000/api/category")
      .then(response => {
        setCategories(response.data.categories); // Assuming the response contains an array of categories
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []); // Empty dependency array ensures that the effect runs only once

  const columns = [
    {
      name: "Category_ID",
      label: "id",
    },
    {
      name: "Category_Name",
      label: "name",
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <button onClick={() => handleEdit(tableMeta.rowData[0])}>Edit</button>
        ),
      },
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <button onClick={() => handleDelete(tableMeta.rowData[0])}>Delete</button>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
  };

  const handleEdit = (categoryId) => {
    console.log("Edit category with ID:", categoryId);
    // Implement your edit logic here
  };

  const handleDelete = (categoryId) => {
    console.log("Delete category with ID:", categoryId);
    // Implement your delete logic here
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      {categories.length > 0 ? (
        <div style={{ height: '100%' }}> {/* Set your desired height */}
          <MUIDataTable data={categories} columns={columns} options={options} />
        </div>
      ) : (
        <Typography>No categories available.</Typography>
      )}
    </Box>
  );
};

export default CategoryListComponent;
