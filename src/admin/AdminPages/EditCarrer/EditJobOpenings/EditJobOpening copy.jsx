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
  Box,
  DialogContentText,
} from "@mui/material";
import {
  fetchJobOpenings,
  fetchJobRoles,
  updateJobOpening,
  deleteJobOpening,
  addJobOpening,
} from "../../../AdminServices";
import Notification from "../../../../Notification/Notification";

function EditJobOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editedJob, setEditedJob] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const [formValid, setFormValid] = useState(false); // State for form validation

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await fetchJobRoles();
        setJobRoles(roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const fetchData = async () => {
    try {
      const openings = await fetchJobOpenings(selectedRole);
      setJobOpenings(openings);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAddNewJob = async () => {
    if (
      !editedJob ||
      !editedJob.position ||
      !editedJob.location ||
      !editedJob.level ||
      !selectedRole
    ) {
      setNotificationMessage("All fields are required.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("role", selectedRole);
      formData.append("position", editedJob.position);
      formData.append("location", editedJob.location);
      formData.append("level", editedJob.level);

      const response = await addJobOpening(formData);

      const addedJob = response.data;

      setOpenAddDialog(false);
      setEditedJob(null);
      setSelectedRole("");

      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      fetchData();
    } catch (error) {
      console.error("Error adding new job opening:", error);
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleEditClick = (job) => {
    setEditedJob(job);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenAddDialog(false);
    setOpenDialog(false);
    setEditedJob(null);
  };

  const handleSaveChanges = async () => {
    if (
      !editedJob ||
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
      const updatedJob = { ...editedJob };
      const response = await updateJobOpening(editedJob.id, updatedJob);

      const updatedOpenings = jobOpenings.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      setJobOpenings(updatedOpenings);

      setOpenDialog(false);
      setEditedJob(null);

      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      fetchData();
    } catch (error) {
      console.error("Error updating job opening:", error);
      setNotificationMessage(error.message);
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
      const response = await deleteJobOpening(selectedJobId);

      const updatedOpenings = jobOpenings.filter(
        (job) => job.id !== selectedJobId
      );
      setJobOpenings(updatedOpenings);

      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      fetchData();
    } catch (error) {
      console.error("Error deleting job opening:", error);
      setNotificationMessage(error.message);
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

  // Update form validation state based on editedJob and selectedRole
  useEffect(() => {
    if (
      editedJob &&
      editedJob.position &&
      editedJob.location &&
      editedJob.level &&
      selectedRole
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [editedJob, selectedRole]);

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px", marginLeft: "10px" }}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Job Opening
      </Button>

      <FormControl
        sx={{ minWidth: 250 }}
        style={{ float: "right", marginTop: "10px" }}
      >
        <InputLabel id="role-select-label">Select Role</InputLabel>

        <Select
          labelId="role-select-label"
          id="role-select"
          fullWidth
          value={selectedRole}
          onChange={handleRoleChange}
          label="Select Role"
        >
          {jobRoles.map((role) => (
            <MenuItem key={role.role_id} value={role.role}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Paper>
        <TableContainer style={{ marginTop: "30px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="Job Openings Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Posted Date</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
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
                    <Button
                      color="error"
                      onClick={() => handleDeleteClick(job.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openAddDialog} onClose={handleDialogClose}>
          <DialogTitle>Add New Job Opening</DialogTitle>
          <DialogContent>
            <form>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Select Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  fullWidth
                >
                  {jobRoles &&
                    jobRoles.map((role) => (
                      <MenuItem key={role.role_id} value={role.role}>
                        {role.role}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="position"
                label="Position"
                type="text"
                fullWidth
                value={editedJob?.position || ""}
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
                value={editedJob?.location || ""}
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
                value={editedJob?.level || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, level: e.target.value })
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleAddNewJob}
              color="primary"
              disabled={!formValid}
            >
              Add Job Opening
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit Job Opening</DialogTitle>
          <DialogContent>
            <form>
              <FormControl fullWidth>
                <InputLabel id="edit-role-select-label">Select Role</InputLabel>
                <Select
                  labelId="edit-role-select-label"
                  id="edit-role-select"
                  value={editedJob ? editedJob.role : ""}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, role: e.target.value })
                  }
                  fullWidth
                >
                  {jobRoles.map((role) => (
                    <MenuItem key={role.role_id} value={role.role}>
                      {role.role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="edit-position"
                label="Position"
                type="text"
                fullWidth
                value={editedJob?.position || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, position: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="edit-location"
                label="Location"
                type="text"
                fullWidth
                value={editedJob?.location || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, location: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="edit-level"
                label="Level"
                type="text"
                fullWidth
                value={editedJob?.level || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, level: e.target.value })
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openConfirmationDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this job opening?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Box>
  );
}

export default EditJobOpening;
