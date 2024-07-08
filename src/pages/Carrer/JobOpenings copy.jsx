import React, { useEffect, useState } from "react";

import { currentJobOpenings, getRoles, addApplicants } from "../FrontendServices/Services";
import "./JobOpenings.css";
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

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
    applied_for: '',
    position: '',
    last_ctc: '',
    year_of_exp: '',
    drop_cv: null,
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

  const handleClickOpen = (job) => {
    const role = roles.find((role) => role.role === job.role);
    setFormData({
      ...formData,
      applied_for: role.role_id,
      position: job.position,
    });
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
      drop_cv: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for API submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('surname', formData.surname);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('contact', formData.contact);
    formDataToSubmit.append('applied_for', formData.applied_for);
    formDataToSubmit.append('position', formData.position);
    formDataToSubmit.append('last_ctc', formData.last_ctc);
    formDataToSubmit.append('year_of_exp', formData.year_of_exp);
    formDataToSubmit.append('drop_cv', formData.drop_cv);

    try {
      // API call to submit the form data
      const response = await addApplicants(formDataToSubmit);
      console.log('Form submitted successfully:', response);
      // Close the dialog after form submission
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
                    <button className="apply-btn" onClick={() => handleClickOpen(job)}>
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
                <InputLabel htmlFor="applied_for">Applied For</InputLabel>
                {/* <Select
                  id="applied_for"
                  name="applied_for"
                  value={formData.applied_for}
                  onChange={handleChange}
                  label="Applied For"
                  disabled
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {roles.map((role) => (                  
                    <MenuItem key={role.id} value={role.value}>
                      {role.role}
                    </MenuItem>
                    
                  ))}
                </Select> */}
                 <Select
                  id="appliedFor"
                  name="appliedFor"
                  value={formData.applied_for}
                  onChange={handleChange}
                  label="Applied For"
                  disabled
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
            <Grid item xs={12}>
              <TextField
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled
              />
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
                  name="last_ctc"
                  value={formData.last_ctc}
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
                    name="year_of_exp"
                    value={formData.year_of_exp}
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
                    name="drop_cv"
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
              <Button type="submit" color="primary" variant="contained">
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
