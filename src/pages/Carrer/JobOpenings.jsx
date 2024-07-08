import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentJobOpenings, getRoles } from "../FrontendServices/Services";
import "./JobOpenings.css";
import { Grid,Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Box, Paper } from '@mui/material';

function JobOpenings() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    contact: '',
    appliedFor: '',
    lastCtc: '',
    yearOfExperience: '',
    cv: null,
  });


  const getJobRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const getJobOpenings = async () => {
    const data = await currentJobOpenings();
    setJobOpenings(data);
  };

  useEffect(() => {
    getJobOpenings();
    getJobRoles();
  }, []);

  // Filter job openings based on selected role or search term
  const filteredJobOpenings = jobOpenings.filter(
    (job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data:', formData);
    // Close the dialog after form submission
    handleClose();
  };


  return (
    <>
      <div className="job-board">
        <div className="inner-job-board">
          <div className="board-heading">
            <p>Job Openings</p>
          </div>
          <div className="all-openings">
            <div className="search-bar">
              <div>
                <input
                  type="text"
                  placeholder="Search by job role, level, or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="all-roles">
              {roles.map((role) => (
                <button key={role.id} onClick={() => setSearchTerm(role.role)}>
                  {role.role}
                </button>
              ))}
            </div>
          </div>
          <div>
            {filteredJobOpenings.map((job) => (
              <div key={job.id} className="current-job-openings">
                <div className="job-role">
                  <p>{job.role}</p>
                </div>
                <div className="position">
                  <div>
                    <p>
                      {job.position}-<span>{job.level}</span>
                    </p>
                    <p className="job-location">{job.location}</p>
                  </div>
                  <div>
                    <button className="apply-btn" onClick={handleClickOpen}>
                     Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Apply Now</DialogTitle>
  <DialogContent>
    <Box component="form" onSubmit={handleSubmit}>
    <Grid item xs={12}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="appliedFor">Applied For</InputLabel>
            <Select
              id="appliedFor"
              name="appliedFor"
              value={formData.appliedFor}
              onChange={handleChange}
              label="Applied For"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last CTC"
            name="lastCtc"
            value={formData.lastCtc}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="yearOfExperience">Year of Experience</InputLabel>
            <Select
              id="yearOfExperience"
              name="yearOfExperience"
              value={formData.yearOfExperience}
              onChange={handleChange}
              label="Year of Experience"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((year) => (
                <MenuItem key={year} value={year}>
                  {year} year{year > 1 && 's'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
          >
            Upload CV
            <input
              type="file"
              hidden
              name="cv"
              onChange={handleFileChange}
              required
            />
          </Button>
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Box>
  </DialogContent>
</Dialog>
    </>
  );
}

export default JobOpenings;
