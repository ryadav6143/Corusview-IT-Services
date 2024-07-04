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
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure

const MAX_HEADING_LENGTH = 20;
const MAX_CONTENT_LENGTH = 100;

function EditServices() {
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newService, setNewService] = useState({
    icon_img: null,
    heading: "",
    content: "",
  });
  const [addFileError, setAddFileError] = useState(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedService, setEditedService] = useState({
    id: null,
    icon_img: null,
    heading: "",
    content: "",
  });
  const [editFileError, setEditFileError] = useState(null);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
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
    setEditedService({ ...service, icon_img: null });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    clearEditErrors(); // Clear edit dialog errors
  };

  const clearEditErrors = () => {
    setEditFileError(null);
    setEditButtonDisabled(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    clearAddErrors(); // Clear add dialog errors
  };

  const clearAddErrors = () => {
    setNewService({ icon_img: null, heading: "", content: "" });
    setAddFileError(null);
    setAddButtonDisabled(false);
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      const file = files[0];
      if (file) {
        const fileSize = file.size / 1024 / 1024; // in MB
        const fileType = file.type.split("/")[1]; // Extract file type

        if (!["png", "jpg", "jpeg"].includes(fileType)) {
          setAddFileError(
            "Unsupported file type. Please upload PNG, JPG, or JPEG files."
          );
          setAddButtonDisabled(true);
        } else if (fileSize > 20) {
          setAddFileError(
            "File size exceeds 20 MB. Please upload a smaller file."
          );
          setAddButtonDisabled(true);
        } else {
          setNewService({ ...newService, icon_img: file });
          setAddFileError(null);
          setAddButtonDisabled(false);
        }
      }
    } else if (name === "heading") {
      if (value.length > MAX_HEADING_LENGTH) {
        setNewService({
          ...newService,
          heading: value.substring(0, MAX_HEADING_LENGTH),
        });
        setAddFileError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, heading: value });
        setAddFileError(null);
      }
    } else if (name === "content") {
      if (value.length > MAX_CONTENT_LENGTH) {
        setNewService({
          ...newService,
          content: value.substring(0, MAX_CONTENT_LENGTH),
        });
        setAddFileError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, content: value });
        setAddFileError(null);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      const file = files[0];
      if (file) {
        const fileSize = file.size / 1024 / 1024; // in MB
        const fileType = file.type.split("/")[1]; // Extract file type

        if (!["png", "jpg", "jpeg"].includes(fileType)) {
          setEditFileError(
            "Unsupported file type. Please upload PNG, JPG, or JPEG files."
          );
          setEditButtonDisabled(true);
        } else if (fileSize > 20) {
          setEditFileError(
            "File size exceeds 20 MB. Please upload a smaller file."
          );
          setEditButtonDisabled(true);
        } else {
          setEditedService({ ...editedService, icon_img: file });
          setEditFileError(null);
          setEditButtonDisabled(false);
        }
      }
    } else if (name === "heading") {
      if (value.length > MAX_HEADING_LENGTH) {
        setEditedService({
          ...editedService,
          heading: value.substring(0, MAX_HEADING_LENGTH),
        });
        setEditFileError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, heading: value });
        setEditFileError(null);
      }
    } else if (name === "content") {
      if (value.length > MAX_CONTENT_LENGTH) {
        setEditedService({
          ...editedService,
          content: value.substring(0, MAX_CONTENT_LENGTH),
        });
        setEditFileError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, content: value });
        setEditFileError(null);
      }
    }
  };

  const handleSubmitAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("icon_img", newService.icon_img);
      formData.append("heading", newService.heading);
      formData.append("content", newService.content);

      const response = await addServiceData(formData);
      setSuccessMessage(response.message);
      fetchData();
      handleCloseAddDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editedService.id);
      if (editedService.icon_img) {
        formData.append("icon_img", editedService.icon_img);
      }
      formData.append("heading", editedService.heading);
      formData.append("content", editedService.content);

      const response = await updateServiceData(formData);
      setSuccessMessage(response.message);
      fetchData();
      handleCloseEditDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (serviceToDelete) {
        await deleteServiceData(serviceToDelete.id);
        setSuccessMessage("Service deleted successfully!");
        fetchData();
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

  const handleSuccessNotificationClose = () => {
    setSuccessMessage(null);
  };

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

        {successMessage && (
          <Notification
            open={true}
            handleClose={handleSuccessNotificationClose}
            alertMessage={successMessage}
            alertSeverity="success"
          />
        )}

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
              error={!!addFileError}
              helperText={addFileError}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={newService.content}
              onChange={handleAddChange}
              error={!!addFileError}
              helperText={addFileError}
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

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogContent>
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
              error={!!editFileError}
              helperText={editFileError}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={editedService.content}
              onChange={handleEditChange}
              error={!!editFileError}
              helperText={editFileError}
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
