import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { fetchWhatYouGetServices, updateWhatYouGetService, deleteWhatYouGetService, addWhatYouGetService } from '../../AdminServices'; // Adjust the import path as per your project structure

function EditWhatYouGet() {
  const [services, setServices] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editedHeading, setEditedHeading] = useState('');
  const [newHeading, setNewHeading] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [deleteServiceId, setDeleteServiceId] = useState(null); // State to hold the service ID to delete

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchWhatYouGetServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
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
    setEditedHeading('');
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        heading: editedHeading,
      };
      await updateWhatYouGetService(selectedService.id, updatedData);
      // Refresh the services list after successful update
      await fetchAndSetServices();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating service:', error);
      // Handle error as needed
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteServiceId(id); // Set the service ID to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteWhatYouGetService(deleteServiceId);
      // Refresh the services list after successful deletion
      await fetchAndSetServices();
      handleCloseDeleteDialog(); // Close the delete confirmation dialog
    } catch (error) {
      console.error('Error deleting service:', error);
      // Handle error as needed
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
      console.error('Error fetching services:', error);
      // Handle errors as needed
    }
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading('');
  };

  const handleAddService = async () => {
    try {
      const newService = {
        heading: newHeading,
      };
      await addWhatYouGetService(newService);
      // Refresh the services list after successful addition
      await fetchAndSetServices();
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding service:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Services What You Get</h2>
      <Button onClick={handleAddClick} variant="contained" color="primary" style={{ marginBottom: '1rem' }}>Add Service</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.heading}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(service)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(service.id)}>Delete</Button>
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
            onChange={(e) => setEditedHeading(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">Save </Button>
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
            onChange={(e) => setNewHeading(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddService} variant="contained" color="primary">Add </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContent>Are you sure you want to delete this service?</DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditWhatYouGet;
