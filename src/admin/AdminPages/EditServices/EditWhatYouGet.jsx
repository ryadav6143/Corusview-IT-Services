import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";
import {
  fetchWhatYouGetServices,
  updateWhatYouGetService,
  deleteWhatYouGetService,
  addWhatYouGetService,
} from "../../AdminServices"; // Adjust the import path as per your project structure
import Notification from "../../../Notification/Notification"; // Adjust the import path as per your project structure

function EditWhatYouGet() {
  const [services, setServices] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [deleteServiceId, setDeleteServiceId] = useState(null); // State to hold the service ID to delete

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchWhatYouGetServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Handle errors as needed
      }
    };

    getServices();
  }, []);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditedHeading(service.heading);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedService(null);
    setEditedHeading("");
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        heading: editedHeading,
      };
      const response = await updateWhatYouGetService(
        selectedService.id,
        updatedData
      );
      // Refresh the services list after successful update
      await fetchAndSetServices();
      handleCloseEditDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating service:", error);
      // Handle error as needed
      handleNotification("Error updating service", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteServiceId(id); // Set the service ID to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteWhatYouGetService(deleteServiceId);
      // Refresh the services list after successful deletion
      await fetchAndSetServices();
      handleCloseDeleteDialog(); // Close the delete confirmation dialog
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting service:", error);
      // Handle error as needed
      handleNotification("Error deleting service", "error");
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close the delete confirmation dialog
    setDeleteServiceId(null); // Clear the delete service ID
  };

  const fetchAndSetServices = async () => {
    try {
      const data = await fetchWhatYouGetServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      // Handle errors as needed
    }
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
  };

  const handleAddService = async () => {
    try {
      const newService = {
        heading: newHeading,
      };
      const response = await addWhatYouGetService(newService);
      // Refresh the services list after successful addition
      await fetchAndSetServices();
      handleCloseAddDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding service:", error);
      // Handle error as needed
      handleNotification("Error adding service", "error");
    }
  };

  const handleNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleEditedHeadingChange = (e) => {
    if (e.target.value.length >= 30) {
      handleNotification("Cannot update with more than 30 characters", "error");
    } else {
      setEditedHeading(e.target.value);
    }
  };

  const handleNewHeadingChange = (e) => {
    if (e.target.value.length >= 30) {
      handleNotification("Cannot insert more than 30 characters", "error");
    } else {
      setNewHeading(e.target.value);
    }
  };

  return (
    <div>
     <Typography variant="h5" component="h5">
      Edit What You Will Get
    </Typography>
      <Button
        onClick={handleAddClick}
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem",marginTop:"10px" }}
      >
        Add Service
      </Button>
      <TableContainer component={Paper} style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={service.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.heading}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(service)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteClick(service.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            fullWidth
            value={editedHeading}
            onChange={handleEditedHeadingChange}
            inputProps={{ maxLength: 30 }}
            error={editedHeading.length > 30}
            helperText={
              editedHeading.length > 30 ? "Cannot exceed 30 characters" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
           
            color="primary"
            disabled={editedHeading.length > 30}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            fullWidth
            value={newHeading}
            onChange={handleNewHeadingChange}
            inputProps={{ maxLength: 30 }}
            error={newHeading.length > 30}
            helperText={
              newHeading.length > 30 ? "Cannot exceed 30 characters" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddService}
          
            color="primary"
            disabled={newHeading.length > 30}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContent>
            Are you sure you want to delete this service?
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
          
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={openNotification}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditWhatYouGet;
