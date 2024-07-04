import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios"; // Import Axios for API calls
import { fetchJobRoles, addJobRole, deleteJobRole } from "../../AdminServices"; // Adjust path based on your project structure

const AddJobRole = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

 // Fetch data on component mount

  const fetchData = async () => {
    try {
      const roles = await fetchJobRoles();
      setJobRoles(roles);
    } catch (error) {
      console.error("Error fetching job roles:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddRole = async () => {
    try {
      const newRole = { role: newRoleName };
      const addedRole = await addJobRole(newRole);
      setJobRoles([...jobRoles, addedRole]);
      setNewRoleName(""); // Clear input field
      fetchData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding job role:", error);
    }
  };

  const handleDeleteRole = async (role_id) => {
    try {
      const response = await deleteJobRole(role_id);
console.log(response,"???");
fetchData();
    } catch (error) {
      console.error("Error deleting job role:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRoleName(""); // Clear input field
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Role
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Job Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="roleName"
            label="Role Name"
            type="text"
            fullWidth
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRole} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="Job Roles Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobRoles.map((role, index) => (
              <TableRow key={role.role_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{role.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteRole(role.role_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddJobRole;
