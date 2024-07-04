// EditJobOpening.js

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { fetchJobOpenings, fetchJobRoles, updateJobOpening, deleteJobOpening } from '../../../AdminServices'; // Adjust the path based on your project structure

function EditJobOpening() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editedJob, setEditedJob] = useState(null);
  const fetchData = async () => {
    try {
      const openings = await fetchJobOpenings();
      const roles = await fetchJobRoles();
      setJobOpenings(openings);
      setJobRoles(roles);
    } catch (error) {
      console.error('Error in fetching data:', error);
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
    try {
      const updatedJob = { ...editedJob }; // Clone editedJob object
      await updateJobOpening(editedJob.id, updatedJob);
      
      // Update jobOpenings state with the updated job
      const updatedOpenings = jobOpenings.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      );
      setJobOpenings(updatedOpenings);
      
      setOpenDialog(false);
      setEditedJob(null);
      console.log('Job opening updated successfully.');
    } catch (error) {
      console.error('Error updating job opening:', error);
      // Handle error, show notification, etc.
    }
  };

  const handleDeleteClick = async (jobId) => {
    try {
      await deleteJobOpening(jobId);
      
      // Update jobOpenings state by filtering out the deleted job
      const updatedOpenings = jobOpenings.filter(job => job.id !== jobId);
      setJobOpenings(updatedOpenings);
      
      console.log('Job opening deleted successfully.');
    } catch (error) {
      console.error('Error deleting job opening:', error);
      // Handle error, show notification, etc.
    }
  };

  const filteredJobOpenings = selectedRole
    ? jobOpenings.filter(job => job.role === selectedRole)
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
          {jobRoles.map(role => (
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
            {filteredJobOpenings.map(job => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{new Date(job.posted_date).toLocaleDateString()}</TableCell>
                <TableCell>{job.level}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(job)}>Edit</Button>
                 
                </TableCell>
                <TableCell>
                <Button onClick={() => handleDeleteClick(job.id)}>Delete</Button> {/* Delete button */}
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
                onChange={(e) => setEditedJob({ ...editedJob, role: e.target.value })}
              />
              <TextField
                margin="dense"
                id="position"
                label="Position"
                type="text"
                fullWidth
                value={editedJob.position}
                onChange={(e) => setEditedJob({ ...editedJob, position: e.target.value })}
              />
              <TextField
                margin="dense"
                id="location"
                label="Location"
                type="text"
                fullWidth
                value={editedJob.location}
                onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
              />
              <TextField
                margin="dense"
                id="level"
                label="Level"
                type="text"
                fullWidth
                value={editedJob.level}
                onChange={(e) => setEditedJob({ ...editedJob, level: e.target.value })}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default EditJobOpening;
