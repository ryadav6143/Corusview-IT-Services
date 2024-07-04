import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogContentText
} from "@mui/material";
import {
  fetchJobOpenings,
  fetchJobRoles,
  updateJobOpening,
  deleteJobOpening,
} from "../../../AdminServices"; // Adjust the path based on your project structure
import Notification from "../../../../Notification/Notification";

function EditJobOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editedJob, setEditedJob] = useState(null);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const fetchData = async () => {
    try {
      const openings = await fetchJobOpenings();
      const roles = await fetchJobRoles();
      setJobOpenings(openings);
      setJobRoles(roles);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    fetchData();
  };

  const handleEditClick = (job) => {
    setEditedJob(job);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditedJob(null);
  };

  const handleSaveChanges = async () => {
    // Validate fields
    if (
      !editedJob ||
      !editedJob.role ||
      !editedJob.position ||
      !editedJob.location ||
      !editedJob.level
    ) {
      setNotificationMessage("All fields are required.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    try {
      const updatedJob = { ...editedJob }; // Clone editedJob object
      await updateJobOpening(editedJob.id, updatedJob);

      // Update jobOpenings state with the updated job
      const updatedOpenings = jobOpenings.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      setJobOpenings(updatedOpenings);

      setOpenDialog(false);
      setEditedJob(null);

      // Show success notification
      setNotificationMessage("Job opening updated successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      console.log("Job opening updated successfully.");
    } catch (error) {
      console.error("Error updating job opening:", error);
      // Handle error, show notification, etc.
      setNotificationMessage("Error updating job opening.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleDeleteClick = (jobId) => {
    setSelectedJobId(jobId);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJobOpening(selectedJobId);

      // Update jobOpenings state by filtering out the deleted job
      const updatedOpenings = jobOpenings.filter((job) => job.id !== selectedJobId);
      setJobOpenings(updatedOpenings);

      // Show success notification
      setNotificationMessage("Job opening deleted successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      console.log("Job opening deleted successfully.");
    } catch (error) {
      console.error("Error deleting job opening:", error);
      // Handle error, show notification, etc.
      setNotificationMessage("Error deleting job opening.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    } finally {
      setOpenConfirmationDialog(false);
      setSelectedJobId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmationDialog(false);
    setSelectedJobId(null);
  };

  const filteredJobOpenings = selectedRole
    ? jobOpenings.filter((job) => job.role === selectedRole)
    : jobOpenings;

  return (
    <Paper>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          onChange={handleRoleChange}
          label="Select Role"
        >
          <MenuItem value="">
            <em>All Roles</em>
          </MenuItem>
          {jobRoles.map((role) => (
            <MenuItem key={role.id} value={role.role}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="Job Openings Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Posted Date</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Edit</TableCell> {/* Added Actions column */}
              <TableCell>Delete</TableCell> {/* Added Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobOpenings.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  {new Date(job.posted_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{job.level}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(job)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(job.id)}>
                    Delete
                  </Button>{" "}
                  {/* Delete button */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Job Details</DialogTitle>
        <DialogContent>
          {editedJob && (
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="role"
                label="Role"
                type="text"
                fullWidth
                value={editedJob.role}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, role: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="position"
                label="Position"
                type="text"
                fullWidth
                value={editedJob.position}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, position: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="location"
                label="Location"
                type="text"
                fullWidth
                value={editedJob.location}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, location: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="level"
                label="Level"
                type="text"
                fullWidth
                value={editedJob.level}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, level: e.target.value })
                }
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this job opening?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Paper>
  );
}

export default EditJobOpening;
