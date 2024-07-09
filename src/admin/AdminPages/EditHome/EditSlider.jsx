import React, { useEffect, useState } from "react";
import {
  fetchTestimonials,
  updateTestimonialById,
  deleteTestimonialById,
  addTestimonial,
} from "../../AdminServices";
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
import Notification from "../../../Notification/Notification";

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
    name: "",
  });
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState("");
  const [disableAddSave, setDisableAddSave] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

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
      name: "",
    });
    setOpenAddDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTestimonial({
      id: null,
      description: "",
      img: "",
      designation: "",
      name: "",
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setEditedTestimonial({
      id: null,
      description: "",
      img: "",
      designation: "",
      name: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Apply character limit if applicable
    if (name === "description" && value.length > 220) {
      setShowErrorNotification(true);
      setErrorNotificationMessage("Description cannot exceed 220 characters.");
      return;
    } else if (name === "designation" && value.length > 10) {
      setShowErrorNotification(true);
      setErrorNotificationMessage("Designation cannot exceed 10 characters.");
      return;
    }
    //  else if (name === "name" && value.length > 20) {
    //   setShowErrorNotification(true);
    //   setErrorNotificationMessage("name cannot exceed 20 characters.");
    //   return;
    // }
    setEditedTestimonial({ ...editedTestimonial, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const acceptedFileTypes = ["image/jpeg", "image/png"];
      if (!acceptedFileTypes.includes(file.type)) {
        setShowErrorNotification(true);
        setErrorNotificationMessage("Please upload a JPEG or PNG image.");
        setDisableAddSave(true); // Disable Add/Save button
        return;
      }

      // Check file size (max 20MB)
      const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
      if (file.size > maxFileSize) {
        setShowErrorNotification(true);
        setErrorNotificationMessage("File size exceeds 20MB limit.");
        setDisableAddSave(true); // Disable Add/Save button
        return;
      }

      setEditedTestimonial({ ...editedTestimonial, img: file });
      setDisableAddSave(false); // Enable Add/Save button if file is valid
    }
  };

  const handleSave = async () => {
    // Check for empty fields
    if (
      !editedTestimonial.description ||
      !editedTestimonial.img ||
      !editedTestimonial.name ||
      !editedTestimonial.designation
    ) {
      setShowErrorNotification(true);
      setErrorNotificationMessage("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", editedTestimonial.description);
      formData.append("designation", editedTestimonial.designation);
      formData.append("name", editedTestimonial.name);
      if (editedTestimonial.img instanceof File) {
        formData.append("img", editedTestimonial.img);
      }

      await updateTestimonialById(editedTestimonial.id, formData);

      setOpenEditDialog(false);

      const updatedTestimonials = await fetchTestimonials();
      setTestimonials(updatedTestimonials);

      setShowSuccessNotification(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddSave = async () => {
    // Check for empty fields
    if (
      !editedTestimonial.description ||
      !editedTestimonial.img ||
      !editedTestimonial.name ||
      !editedTestimonial.designation
    ) {
      setShowErrorNotification(true);
      setErrorNotificationMessage("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", editedTestimonial.description);
      formData.append("designation", editedTestimonial.designation);
      formData.append("img", editedTestimonial.img);
      formData.append("name", editedTestimonial.name);

      await addTestimonial(formData);

      setOpenAddDialog(false);

      const updatedTestimonials = await fetchTestimonials();
      setTestimonials(updatedTestimonials);

      setShowSuccessNotification(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(false);
    try {
      await deleteTestimonialById(id);
      const updatedTestimonials = testimonials.filter(
        (testimonial) => testimonial.id !== id
      );
      setTestimonials(updatedTestimonials);

      // Show success notification
      setShowErrorNotification(true);
      setErrorNotificationMessage("Data deleted successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Typography variant="h5" component="h5">
      Edit Testimonial
    </Typography>
      <Box>
        <Button
      variant="contained" color="primary"
          onClick={handleOpenAddDialog}
          style={{ marginTop: 10 }}
        >
          Add Testimonial
        </Button>
        <TableContainer style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}} component={Paper} >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Name</TableCell>
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
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>
                    <img
                      src={testimonial.img}
                      alt={testimonial.img_originalname}
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{testimonial.designation}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenEditDialog(testimonial)}>
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

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Testimonial</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="name"
              type="name"
              fullWidth
              name="name"
              value={editedTestimonial.name}
              onChange={handleChange}
            />
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
            <Button
              onClick={handleSave}
              color="primary"
              disabled={disableAddSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
            <TextField
              margin="dense"
              label="name"
              type="text"
              fullWidth
              name="name"
              value={editedTestimonial.name}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddSave}
              color="primary"
              disabled={disableAddSave}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmDelete !== false}
          onClose={() => setConfirmDelete(false)}
        >
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

        {showErrorNotification && (
          <Notification
            open={showErrorNotification}
            handleClose={() => setShowErrorNotification(false)}
            alertMessage={errorNotificationMessage}
            alertSeverity="error"
          />
        )}

        {showSuccessNotification && (
          <Notification
            open={showSuccessNotification}
            handleClose={() => setShowSuccessNotification(false)}
            alertMessage="Data Updated successfully."
            alertSeverity="success"
          />
        )}
      </Box>
    </>
  );
}

export default EditSlider;
