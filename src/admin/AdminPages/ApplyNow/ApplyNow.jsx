import React, { useState, useEffect } from "react";
import {
  getApplicants,
  getExportApplicants,
  deleteApplicants,
  fetchJobRoles
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
import GetAppIcon from '@mui/icons-material/GetApp';

function ApplyNow() {
  const [applicants, setApplicants] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [open, setOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [deleteApplicantId, setDeleteApplicantId] = useState(null); // State to store applicant id for deletion
  
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        let data;
        if (selectedRole === "All") {
          data = await getApplicants(); // Fetch all applicants if "All" is selected
        } else {
          data = await getApplicants(selectedRole); // Fetch applicants based on selectedRole
        }
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
  
    fetchApplicants();
  }, [selectedRole]); // Add selectedRole as a dependency
  
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
      link.setAttribute("download", "applicants.xlsx"); // specify the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error exporting applicants:", error);
    }
  };

  const handleDelete = async (applicantId) => {
    // Open delete confirmation dialog
    setDeleteApplicantId(applicantId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteApplicants(deleteApplicantId);
      setApplicants(
        applicants.filter((applicant) => applicant.id !== deleteApplicantId)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteApplicantId(null);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
      <FormControl
        sx={{ minWidth: 250 }}
        style={{ float: "right" }}
      >
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
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>applied_for</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Last CTC</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant, index) => (
              <TableRow key={applicant.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{applicant.role || "-"}</TableCell>
                <TableCell>{applicant.position|| "-"}</TableCell>
                <TableCell>{applicant.name|| "-"}</TableCell>
                <TableCell>{applicant.surname|| "-"}</TableCell>
                <TableCell>{applicant.email|| "-"}</TableCell>
                <TableCell>{applicant.contact|| "-"}</TableCell>
                <TableCell>{applicant.last_ctc|| "-"}</TableCell>
                <TableCell>{applicant.year_of_exp|| "-"}</TableCell>
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
    </div>
  );
}

export default ApplyNow;
