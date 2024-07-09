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
  Typography
} from "@mui/material";
import { fetchJobRoles, addJobRole, deleteJobRole } from "../../AdminServices";
import Notification from "../../../Notification/Notification";

const AddJobRole = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "default",
  });

  const fetchData = async () => {
    try {
      const roles = await fetchJobRoles();
      console.log("Fetched roles:", roles);
      setJobRoles(roles);
    } catch (error) {
      console.error("Error fetching job roles:", error);
      setNotification({
        open: true,
        message: "Error fetching job roles.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRole = async () => {
    try {
      const newRole = { role: newRoleName };
      const response = await addJobRole(newRole);
      console.log("Add role response:", response);
      setJobRoles([...jobRoles, response.data]);
      setNewRoleName("");
      fetchData();
      setOpenDialog(false);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding job role:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error adding job role.",
        severity: "error",
      });
    }
  };

  const handleDeleteRole = async () => {
    try {
      if (roleToDelete) {
        const response = await deleteJobRole(roleToDelete.role_id);
        console.log("Delete role response:", response);
        fetchData();
        setOpenDeleteDialog(false);
        setRoleToDelete(null);
        setNotification({
          open: true,
          message: response.message,
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting job role:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error deleting job role.",
        severity: "error",
      });
    }
  };

  const handleOpenDeleteDialog = (role) => {
    setRoleToDelete(role);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRoleName("");
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRoleToDelete(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
        <Typography variant="h5" component="h5">
     Add Job Roles
    </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Role
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} >
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

      <TableContainer component={Paper} style={{ marginTop: "10px" ,maxHeight: "500px", overflow: "auto"}}>
        <Table aria-label="Job Roles Table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobRoles.map((role, index) =>
              role && role.role ? (
                <TableRow key={role.role_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleOpenDeleteDialog(role)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete the role?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRole} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
};

export default AddJobRole;
