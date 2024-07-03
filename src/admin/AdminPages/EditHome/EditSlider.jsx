import React, { useEffect, useState } from "react";
import { fetchTestimonials, updateTestimonialById, deleteTestimonialById, addTestimonial } from "../../AdminServices"; // Make sure to import addTestimonial from your service
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function EditSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirmation dialog
  const [editedTestimonial, setEditedTestimonial] = useState({
    id: null,
    description: "",
    img: "",
    designation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleOpenEditDialog = (testimonial) => {
    setEditedTestimonial(testimonial);
    setOpenEditDialog(true);
  };

  const handleOpenAddDialog = () => {
    setEditedTestimonial({
      id: null,
      description: "",
      img: "",
      designation: "",
    });
    setOpenAddDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTestimonial({ ...editedTestimonial, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedTestimonial({ ...editedTestimonial, img: file });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("description", editedTestimonial.description);
      formData.append("designation", editedTestimonial.designation);
      if (editedTestimonial.img instanceof File) {
        formData.append("img", editedTestimonial.img);
      }
  
      // Perform the update
      await updateTestimonialById(editedTestimonial.id, formData);
  
      // Close the dialog
      setOpenEditDialog(false);
  
      // Fetch updated testimonials after update
      const updatedTestimonials = await fetchTestimonials();
      setTestimonials(updatedTestimonials);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddSave = async () => {
    try {
      const formData = new FormData();
      formData.append("description", editedTestimonial.description);
      formData.append("designation", editedTestimonial.designation);
      formData.append("img", editedTestimonial.img);
  
      // Perform the add operation
      await addTestimonial(formData);
  
      // Close the dialog
      setOpenAddDialog(false);
  
      // Fetch updated testimonials after add
      const updatedTestimonials = await fetchTestimonials();
      setTestimonials(updatedTestimonials);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(false); // Reset confirmation dialog state
    try {
      await deleteTestimonialById(id);
      const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id);
      setTestimonials(updatedTestimonials);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <>

    <Box>
      
      {/* Button to Add New Testimonial */}
      <Button variant="outlined" onClick={handleOpenAddDialog} style={{ marginTop: 10 }}>
        Add Testimonial
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.id}</TableCell>
                <TableCell>{testimonial.description}</TableCell>
                <TableCell>
                  <img
                    src={testimonial.img}
                    alt={testimonial.img_originalname}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{testimonial.designation}</TableCell>
                <TableCell>
                  <Button
                  
                    onClick={() => handleOpenEditDialog(testimonial)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    
                    color="error"
                    onClick={() => setConfirmDelete(testimonial.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Testimonial Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Testimonial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={editedTestimonial.description}
            onChange={handleChange}
          />
          <TextField
            type="file"
            margin="dense"
            fullWidth
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextField
            margin="dense"
            label="Designation"
            type="text"
            fullWidth
            name="designation"
            value={editedTestimonial.designation}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Testimonial Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Testimonial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={editedTestimonial.description}
            onChange={handleChange}
          />
          <TextField
            type="file"
            margin="dense"
            fullWidth
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextField
            margin="dense"
            label="Designation"
            type="text"
            fullWidth
            name="designation"
            value={editedTestimonial.designation}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmDelete !== false} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this testimonial?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(confirmDelete)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
   

    </>
  );
}

export default EditSlider;
