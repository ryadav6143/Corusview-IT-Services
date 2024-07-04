// JobRolesManagement.js

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { fetchJobRoles, addJobRole } from "../../AdminServices"; // Adjust path based on your project structure

const AddJobRole = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await fetchJobRoles();
        setJobRoles(roles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddRole = async () => {
    try {
      const newRole = { role: newRoleName }; // Structure according to your API
      const addedRole = await addJobRole(newRole);
      setJobRoles([...jobRoles, addedRole]);
      setNewRoleName(""); // Clear input field
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding job role:", error);
      // Handle error (show notification, etc.)
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
            </TableRow>
          </TableHead>
          <TableBody>
            {jobRoles.map((role, index) => (
              <TableRow key={role.role_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{role.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddJobRole;
