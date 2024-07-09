import React, { useEffect, useState } from "react";
import {
  currentJobOpenings,
  getRoles,
  addApplicants,
  getPositions,
} from "../FrontendServices/Services";
import "./JobOpenings.css";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Notification from "../../Notification/Notification";
function JobOpenings({ openDialog, setOpenDialog }) {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]); // State to store positions
  const [searchTerm, setSearchTerm] = useState("");
  // const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    contact: "",
    applied_for: "",
    position: "", // Updated to use dropdown
    last_ctc: "",
    year_of_exp: "",
    drop_cv: null,
  });
  const [fileName, setFileName] = useState(""); // State to store selected file name

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const getJobRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const getJobOpenings = async () => {
    const data = await currentJobOpenings();
    setJobOpenings(data);
  };

  const getJobPositions = async () => {
    try {
      const data = await getPositions();
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    getJobOpenings();
    getJobRoles();
    getJobPositions(); // Fetch positions when component mounts
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
    setFormData("");
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
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setNotification({
        open: true,
        message: "Only PDF files are allowed",
        severity: "error",
      });
      setFormData({
        ...formData,
        drop_cv: null,
      });
      setFileName(""); // Clear file name
      return;
    }
    setFormData({
      ...formData,
      drop_cv: file,
    });
    setFileName(file.name); // Set selected file name
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.contact ||
      !formData.drop_cv
    ) {
      setNotification({
        open: true,
        message: "This field is required",
        severity: "error",
      });
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("surname", formData.surname);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("contact", formData.contact);
    formDataToSubmit.append("applied_for", formData.applied_for);
    formDataToSubmit.append("position", formData.position);
    formDataToSubmit.append("last_ctc", formData.last_ctc);
    formDataToSubmit.append("year_of_exp", formData.year_of_exp);
    formDataToSubmit.append("drop_cv", formData.drop_cv);

    try {
      const response = await addApplicants(formDataToSubmit);
      console.log("Form submitted successfully:", response);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
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
                  placeholder="Search Jobs"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="all-roles">
              <button onClick={handleClearSearch}>All</button>
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
                    <button
                      className="apply-btn"
                      onClick={() => handleClickOpen(job)}
                    >
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
                  placeholder="John"
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
                  placeholder="Doe"
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
                  placeholder="john.doe@example.com"
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
                  placeholder="1234567890"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required margin="normal">
                  <InputLabel htmlFor="appliedFor">Role</InputLabel>
                  <Select
                    id="appliedFor"
                    name="applied_for"
                    value={formData.applied_for}
                    onChange={handleChange}
                    label="Applied For"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.role_id}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required margin="normal">
                  <InputLabel htmlFor="position">Position</InputLabel>
                  <Select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    label="Position"
                  >
                    {positions.map((pos) => (
                      <MenuItem key={pos.id} value={pos.position}>
                        {pos.position}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  placeholder="0.0 LPA"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required margin="normal">
                  <InputLabel htmlFor="yearOfExperience">
                    Year of Experience
                  </InputLabel>
                  <Select
                    id="yearOfExperience"
                    name="year_of_exp"
                    value={formData.year_of_exp}
                    onChange={handleChange}
                    label="Year of Experience"
                  >
                    {Array.from(Array(5).keys()).map((index) => (
                      <MenuItem key={index} value={`${index}-${index + 1}`}>
                        {index}-{index + 1} year{index === 0 ? "" : "s"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Upload CV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    type: "file",
                    inputProps: {
                      accept: ".pdf,.doc,.docx", // Specify accepted file types if needed
                    },
                    onChange: handleFileChange,
                    required: true,
                  }}
                  placeholder="Select your CV file"
                />
                  <p style={{ color: "gray", fontSize: "0.8rem" }}>
                  Only PDF files are allowed.
                </p>
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </>
  );
}

export default JobOpenings;
