import React, { useEffect, useState } from "react";
import {
  fetchOurServicesData,
  updateServiceData,
  addServiceData,
  deleteServiceData,
} from "../../AdminServices";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure

const MAX_HEADING_LENGTH = 25;
const MAX_CONTENT_LENGTH = 200;

function EditServices() {
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  // State for Add Service Dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newService, setNewService] = useState({
    icon_img: null,
    heading: "",
    content: "",
  });
  const [addFileError, setAddFileError] = useState(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false); // To disable save button on error
  const [headingError, setHeadingError] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [headingErrorNotification, setHeadingErrorNotification] =
    useState(null);
  const [contentErrorNotification, setContentErrorNotification] =
    useState(null);

  // State for Edit Service Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedService, setEditedService] = useState({
    id: null,
    icon_img: null,
    heading: "",
    content: "",
  });
  const [editFileError, setEditFileError] = useState(null);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false); // To disable save button on error
  const [editHeadingError, setEditHeadingError] = useState(null);
  const [editContentError, setEditContentError] = useState(null);
  const [editHeadingErrorNotification, setEditHeadingErrorNotification] =
    useState(null);
  const [editContentErrorNotification, setEditContentErrorNotification] =
    useState(null);

  // State for Delete Confirmation Dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Success message state
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchOurServicesData();
      setServicesData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenEditDialog = (service) => {
    setEditedService({ ...service, icon_img: null }); // Reset icon_img state for editing
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditHeadingError(null); // Clear heading error on close
    setEditContentError(null); // Clear content error on close
    setEditHeadingErrorNotification(null); // Clear heading error notification on close
    setEditContentErrorNotification(null); // Clear content error notification on close
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewService({ icon_img: null, heading: "", content: "" }); // Reset new service state
    setAddFileError(null); // Clear file error state
    setAddButtonDisabled(false); // Enable save button on dialog close
    setHeadingError(null); // Clear heading error on close
    setContentError(null); // Clear content error on close
    setHeadingErrorNotification(null); // Clear heading error notification on close
    setContentErrorNotification(null); // Clear content error notification on close
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      const file = files[0]; // Assuming single file upload
      if (file) {
        const fileSize = file.size / 1024 / 1024; // in MB
        const fileType = file.type.split("/")[1]; // Extract file type

        // Check file type and size
        if (!["png", "jpg", "jpeg"].includes(fileType)) {
          setAddFileError(
            "Unsupported file type. Please upload PNG, JPG, or JPEG files."
          );
          setAddButtonDisabled(true); // Disable save button on error
        } else if (fileSize > 20) {
          setAddFileError(
            "File size exceeds 20 MB. Please upload a smaller file."
          );
          setAddButtonDisabled(true); // Disable save button on error
        } else {
          setNewService({ ...newService, icon_img: file });
          setAddFileError(null); // Clear file error if no errors
          setAddButtonDisabled(false); // Enable save button if error resolved
        }
      }
    } else if (name === "heading") {
      if (value.length >= MAX_HEADING_LENGTH) {
        setHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        setHeadingErrorNotification(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, heading: value });
        setHeadingError(null); // Clear heading error if no errors
        setHeadingErrorNotification(null); // Clear heading error notification if no errors
      }
    } else if (name === "content") {
      if (value.length >= MAX_CONTENT_LENGTH) {
        setContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        setContentErrorNotification(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, content: value });
        setContentError(null); // Clear content error if no errors
        setContentErrorNotification(null); // Clear content error notification if no errors
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      // File handling logic remains unchanged
    } else if (name === "heading") {
      if (value.length >= MAX_HEADING_LENGTH) {
        setEditHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        setEditHeadingErrorNotification(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, heading: value });
        setEditHeadingError(null);
        setEditHeadingErrorNotification(null); // Clear notification on valid input
      }
    } else if (name === "content") {
      if (value.length >= MAX_CONTENT_LENGTH) {
        setEditContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        setEditContentErrorNotification(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, content: value });
        setEditContentError(null);
        setEditContentErrorNotification(null); // Clear notification on valid input
      }
    }
  };

  const handleSubmitAdd = async () => {
    try {
      // Validate if any field is empty
      if (!newService.icon_img) {
        setAddFileError("Icon image is required.");
        return; // Stop submission if icon_img is empty
      } else {
        setAddFileError(null);
      }

      if (!newService.heading) {
        setHeadingError("Heading is required.");
        return; // Stop submission if heading is empty
      } else if (newService.heading.length >= MAX_HEADING_LENGTH) {
        setHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        return; // Stop submission if heading exceeds max length
      } else {
        setHeadingError(null);
      }

      if (!newService.content) {
        setContentError("Content is required.");
        return; // Stop submission if content is empty
      } else if (newService.content.length > MAX_CONTENT_LENGTH) {
        setContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        return; // Stop submission if content exceeds max length
      } else {
        setContentError(null);
      }

      // If all validations pass, proceed to submit form data
      const formData = new FormData();
      formData.append("icon_img", newService.icon_img);
      formData.append("heading", newService.heading);
      formData.append("content", newService.content);

      const response = await addServiceData(formData);
      fetchData(); // Refresh data after addition
      handleCloseAddDialog();
      setSuccessMessage(response.message); // Set success message
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      // Validate if any field is empty or exceeds limits
      if (!editedService.heading) {
        setEditHeadingError("Heading is required.");
        return;
      } else if (editedService.heading.length >= MAX_HEADING_LENGTH) {
        setEditHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        return;
      }

      if (!editedService.content) {
        setEditContentError("Content is required.");
        return;
      } else if (editedService.content.length > MAX_CONTENT_LENGTH) {
        setEditContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("id", editedService.id);
      formData.append("heading", editedService.heading);
      formData.append("content", editedService.content);

      // Add icon_img if it exists
      if (editedService.icon_img) {
        formData.append("icon_img", editedService.icon_img);
      }

      // Call updateServiceData function
      const response = await updateServiceData(editedService.id, formData);
      setSuccessMessage(response.message); // Assuming your response structure has a 'message' field
      fetchData(); // Refresh data after update
      handleCloseEditDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (serviceToDelete) {
        const response = await deleteServiceData(serviceToDelete.id);
        fetchData(); // Refresh data after deletion
        setOpenDeleteDialog(false);
        setSuccessMessage(response.message); // Set success message
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDialogOpen = (service) => {
    setServiceToDelete(service);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSuccessNotificationClose = () => {
    setSuccessMessage(null); // Close success notification
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        Edit Sevices
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{ marginBottom: "1rem", marginTop: "10px" }}
        >
          Add Service
        </Button>

        {/* Success Notification */}
        {successMessage && (
          <Notification
            open={true}
            handleClose={handleSuccessNotificationClose}
            alertMessage={successMessage}
            alertSeverity="success"
          />
        )}

        <TableContainer component={Paper} style={{ marginTop: "10px",maxHeight: "500px", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesData.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={service.icon_img}
                      alt={service.icon_img_originalname}
                      style={{ width: 50 }}
                    />
                  </TableCell>
                  <TableCell>{service.heading}</TableCell>
                  <TableCell>{service.content}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenEditDialog(service)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDeleteDialogOpen(service)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Adding */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogContent>
            {/* Error Notifications */}
            {addFileError && (
              <Notification
                open={true}
                handleClose={() => setAddFileError(null)}
                alertMessage={addFileError}
                alertSeverity="error"
              />
            )}
            {headingError && (
              <Notification
                open={true}
                handleClose={() => setHeadingError(null)}
                alertMessage={headingError}
                alertSeverity="error"
              />
            )}
            {contentError && (
              <Notification
                open={true}
                handleClose={() => setContentError(null)}
                alertMessage={contentError}
                alertSeverity="error"
              />
            )}

            {/* Input Fields */}
            <TextField
              autoFocus
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleAddChange}
              error={!!addFileError}
              helperText={addFileError}
              inputProps={{
                accept: "image/png, image/jpeg, image/jpg",
              }}
            />
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={newService.heading}
              onChange={handleAddChange}
              // error={!!headingError}
              // helperText={headingError}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={newService.content}
              onChange={handleAddChange}
              // error={!!contentError}
              // helperText={contentError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitAdd}
              color="primary"
              disabled={addButtonDisabled}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Editing */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogContent>
            {editFileError && (
              <Notification
                open={true}
                handleClose={() => setEditFileError(null)}
                alertMessage={editFileError}
                alertSeverity="error"
              />
            )}
            {editHeadingErrorNotification && (
              <Notification
                open={true}
                handleClose={() => setEditHeadingErrorNotification(null)}
                alertMessage={editHeadingErrorNotification}
                alertSeverity="error"
              />
            )}
            {editContentErrorNotification && (
              <Notification
                open={true}
                handleClose={() => setEditContentErrorNotification(null)}
                alertMessage={editContentErrorNotification}
                alertSeverity="error"
              />
            )}
            <TextField
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleEditChange}
              error={!!editFileError}
              helperText={editFileError}
              inputProps={{
                accept: "image/png, image/jpeg, image/jpg",
              }}
            />
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={editedService.heading}
              onChange={handleEditChange}
              // error={!!editHeadingError}
              // helperText={editHeadingError}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={editedService.content}
              onChange={handleEditChange}
              // error={!!editContentError}
              // helperText={editContentError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitEdit}
              color="primary"
              disabled={editButtonDisabled}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Delete Confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this service?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default EditServices;
