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

  // State for Edit Service Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedService, setEditedService] = useState({
    id: null,
    icon_img: null,
    heading: "",
    content: "",
  });

  // State for Delete Confirmation Dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

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
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewService({ icon_img: null, heading: "", content: "" }); // Reset new service state
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "icon_img") {
      const file = files[0]; // Assuming single file upload
      setNewService({ ...newService, icon_img: file });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "icon_img") {
      const file = files[0]; // Assuming single file upload
      setEditedService({ ...editedService, icon_img: file });
    } else {
      setEditedService({ ...editedService, [name]: value });
    }
  };

  const handleSubmitAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("icon_img", newService.icon_img);
      formData.append("heading", newService.heading);
      formData.append("content", newService.content);

      await addServiceData(formData);
      setOpenAddDialog(false);

      // Update state directly after successful update
      fetchData(); // Fetch updated data
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("icon_img", editedService.icon_img);
      formData.append("heading", editedService.heading);
      formData.append("content", editedService.content);

      await updateServiceData(editedService.id, formData);
      setOpenEditDialog(false);

      // Update state directly after successful update
      fetchData(); // Fetch updated data
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (serviceToDelete) {
        await deleteServiceData(serviceToDelete.id);
        fetchData(); // Refresh data after deletion
        setOpenDeleteDialog(false);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{ marginBottom: "1rem" }}
        >
          Add Service
        </Button>

        <TableContainer component={Paper}>
          <Table>
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
              {servicesData.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
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
                    <Button
                      
                      onClick={() => handleOpenEditDialog(service)}
                    >
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
            <TextField
              autoFocus
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleAddChange}
            />
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={newService.heading}
              onChange={handleAddChange}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={newService.content}
              onChange={handleAddChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitAdd} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Editing */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleEditChange}
              inputProps={{
                accept: "image/*",
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
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={editedService.content}
              onChange={handleEditChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitEdit} color="primary">
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
