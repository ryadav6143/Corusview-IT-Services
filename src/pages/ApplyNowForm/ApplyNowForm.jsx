import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '600px',
  margin: 'auto',
  marginTop: theme.spacing(6),
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ApplyNowForm = () => {
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
  };

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Apply Now
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormField
          label="Surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          fullWidth
          required
        />
           <FormControl fullWidth required>
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
            <MenuItem value="position1">Position 1</MenuItem>
            <MenuItem value="position2">Position 2</MenuItem>
            <MenuItem value="position3">Position 3</MenuItem>
          </Select>
        </FormControl>
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginTop: '20px' }}
        />
        <FormField
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          required
        />
     
        <FormField
          label="Last CTC"
          name="lastCtc"
          value={formData.lastCtc}
          onChange={handleChange}
          fullWidth
          required
       
        />
        <FormField
          label="Year of Experience"
          name="yearOfExperience"
          value={formData.yearOfExperience}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
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
        <SubmitButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ApplyNowForm;
