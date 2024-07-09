import React, { useState, useEffect } from "react";
import {
  getApplicants,
  getExportApplicants,
  deleteApplicants,
  fetchJobRoles,
} from "../../AdminServices";
import {
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";

import Notification from "../../../Notification/Notification"; // Update the path as per your file structure

function ApplyNow() {
  const [applicants, setApplicants] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [open, setOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteApplicantId, setDeleteApplicantId] = useState(null);

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        let data;
        if (selectedRole === "All") {
          data = await getApplicants();
        } else {
          data = await getApplicants(selectedRole);
        }
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [selectedRole]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await fetchJobRoles();
        setJobRoles([{ role_id: 0, role: "All" }, ...roles]);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleClickOpen = (url) => {
    setCvUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCvUrl("");
  };

  const handleExport = async () => {
    try {
      const blob = await getExportApplicants();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "applicants.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Show notification for successful download
      setNotificationMessage("Excel file downloaded successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error exporting applicants:", error);
      // Show notification for error if needed
      setNotificationMessage("Error exporting applicants");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleDelete = async (applicantId) => {
    setDeleteApplicantId(applicantId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Call API to delete applicant
      const response = await deleteApplicants(deleteApplicantId);

      // Check response status or message to determine success or failure
      if (response.status === "success") {
        setApplicants(
          applicants.filter((applicant) => applicant.id !== deleteApplicantId)
        );

        // Show success notification
        setNotificationMessage(response.message);
        setNotificationSeverity("success");
        setNotificationOpen(true);
      } else {
        // Show error notification if deletion failed
        setNotificationMessage(response.message); // Adjust if the API returns a specific error message
        setNotificationSeverity("success");
        setNotificationOpen(true);
      }

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting applicant:", error);
      // Show error notification
      setNotificationMessage("Error deleting applicant");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteApplicantId(null);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" component="h5">
        Apply Now Data
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExport}
        style={{ marginTop: "10px" }}
        startIcon={<GetAppIcon />}
      >
        Download Excel
      </Button>
      <FormControl sx={{ minWidth: 250 }} style={{ float: "right" }}>
        <InputLabel id="role-select-label">Filter by Role</InputLabel>

        <Select
          labelId="role-select-label"
          id="role-select"
          fullWidth
          value={selectedRole}
          onChange={handleRoleChange}
          label="Filter by Role"
        >
          {jobRoles.map((role) => (
            <MenuItem key={role.role_id} value={role.role}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{ marginTop: "20px", maxHeight: "500px", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Applied For</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Last CTC</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant, index) => (
              <TableRow key={applicant.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{applicant.role || "-"}</TableCell>
                <TableCell>{applicant.position || "-"}</TableCell>
                <TableCell>{applicant.name || "-"}</TableCell>
                <TableCell>{applicant.surname || "-"}</TableCell>
                <TableCell>{applicant.email || "-"}</TableCell>
                <TableCell>{applicant.contact || "-"}</TableCell>
                <TableCell>{applicant.last_ctc || "-"}</TableCell>
                <TableCell>{applicant.year_of_exp || "-"}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleClickOpen(applicant.drop_cv)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(applicant.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this applicant?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View CV Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>View CV</DialogTitle>
        <DialogContent>
          <iframe src={cvUrl} title="CV" width="100%" height="500px" />
        </DialogContent>
      </Dialog>

      {/* Notification for Excel download and delete actions */}
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default ApplyNow;
