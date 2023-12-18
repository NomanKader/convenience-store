import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BackDropComponent from "../Loading/BackDropComponent";

const UserFormComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [userRole, setUserRole] = useState(""); // New state for user role
  const [roles, setRoles] = useState(["manager", "cashier"]); // Options for Autocomplete
  const [users, setUsers] = useState([]);
  const [showBackDrop, setShowBackDrop] = useState(false);
  // Edit Modal State
  const [editUserId, setEditUserId] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    // Fetch users from the server
    axios
      .get("http://localhost:5000/api/user")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  const handleAddUser = () => {
    // Make a POST request to add a new user
    const currentDate = new Date().toISOString();
    axios
      .post("http://localhost:5000/api/user", {
        user_name: userName,
        password: password, // Include password in the request
        user_role: userRole, // Include user role in the request
        create_date:currentDate
      })
      .then((response) => {
        // Update the users list after successful addition
        setUsers([
          {
            User_ID: response.data.insertedUserId,
            User_Name: userName,
            Password: password,
            User_Role: userRole,
          },
          ...users,
        ]);
        // Clear the input fields after adding
        setUserName("");
        setPassword("");
        setUserRole("");
        toast.success('User Added Successfully');
      })
      .catch((error) => {
        // ... (existing error handling code)
      });
  };
  const handleEditModalOpen = (userId, userName, password, userRole) => {
    setEditUserId(userId);
    setEditUserName(userName);
    setEditPassword(password);
    setEditUserRole(userRole);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    // Make a PUT request to update the user
    axios
      .put(`http://localhost:5000/api/user/${editUserId}`, {
        user_name: editUserName,
        password: editPassword,
        user_role: editUserRole,
      })
      .then((response) => {
        console.log("User updated successfully:", response.data);

        // Update the users list after successful update
        const updatedUsers = users.map((user) => {
          if (user.User_ID === editUserId) {
            return {
              ...user,
              User_Name: editUserName,
              Password: editPassword,
              User_Role: editUserRole,
            };
          }
          return user;
        });

        setUsers(updatedUsers);
        toast.success('User Updated Successfully');
        handleEditModalClose();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.warning('User Already Exists');
        } else {
          toast.error('Server is Busy');
        }
        console.error("Error updating user:", error);
      });
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setShowBackDrop(true);
      // Make a DELETE request to remove the user
      axios
        .delete(`http://localhost:5000/api/user/${userId}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);

          // Update the users list after successful deletion
          const updatedUsers = users.filter((user) => user.User_ID !== userId);
          setUsers(updatedUsers);
          setShowBackDrop(false);
          toast.success('User Deleted Successfully');
        })
        .catch((error) => {
          if (error.response.status === 409) {
            toast.warning('User Already Exists');
          } else {
            toast.error('Server is Busy');
          }
          console.error("Error deleting user:", error);
        });
    }
  };

  const columns = [
    {
      name: "User_ID",
      label: "ID",
    },
    {
      name: "User_Name",
      label: "Name",
    },
    {
      name: "Password",
      label: "Password",
    },
    {
      name: "User_Role",
      label: "Role",
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditModalOpen(...tableMeta.rowData)}
          >
            Edit
          </Button>
        ),
      },
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(tableMeta.rowData[0])}
          >
            Delete
          </Button>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
  };

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Typography variant="h6">Add New User</Typography>
      <TextField
        label="User Name"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" } }}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password" // New text input for password
        type="password"
        variant="outlined"
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Autocomplete
        id="user-role-autocomplete"
        options={roles}
        getOptionLabel={(option) => option}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
        value={userRole}
        onChange={(event, newValue) => setUserRole(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="User Role"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        sx={{ width: { lg: "30%", xs: "80%" }, mt: 1 }}
      >
        Add User
      </Button>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Users
      </Typography>
      {users.length > 0 ? (
        <MUIDataTable data={users} columns={columns} options={options} />
      ) : (
        <Typography>No users available.</Typography>
      )}
      {showBackDrop ? <BackDropComponent /> : <></>}
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
  <TextField
    label="User Name"
    variant="outlined"
    fullWidth
    value={editUserName}
    onChange={(e) => setEditUserName(e.target.value)}
    margin="normal"
  />
  <TextField
    label="Password"
    type="password"
    variant="outlined"
    fullWidth
    value={editPassword}
    onChange={(e) => setEditPassword(e.target.value)}
    margin="normal"
  />
  <Autocomplete
  id="edit-user-role-autocomplete"
  options={roles}
  getOptionLabel={(option) => option}
  fullWidth
  value={editUserRole}
  onChange={(event, newValue) => setEditUserRole(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="User Role"
      variant="outlined"
      margin="normal"
    />
  )}
/>

</DialogContent>

        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default UserFormComponent;
