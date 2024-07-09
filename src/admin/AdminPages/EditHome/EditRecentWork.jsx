import React, { useEffect, useState } from "react";
import {
  fetchRecentWorks,
  updateRecentWorkById,
  deleteRecentWorkById,
  addRecentWork,
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

import Notification from "../../../Notification/Notification"; // Adjust the import path as per your folder structure

function EditRecentWork() {
  const [recentWorks, setRecentWorks] = useState([]);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editedWork, setEditedWork] = useState({ id: null, img: "" });
  const [workToDelete, setWorkToDelete] = useState(null);
  const [newWork, setNewWork] = useState({ img: "" });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("error");
  const [addSaveDisabled, setAddSaveDisabled] = useState(true);
  const [editSaveDisabled, setEditSaveDisabled] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchRecentWorks();
      setRecentWorks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditOpen = (work) => {
    setEditedWork(work);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditedWork({ id: null, img: "" });
    setEditOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const isValidType =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isValidType) {
        showNotification(
          "Invalid file type. Please upload a JPEG or PNG image."
        );
        setEditSaveDisabled(true);
        return;
      }

      // Validate file size (20 MB limit)
      const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
      if (file.size > maxSize) {
        showNotification("File size exceeds 20 MB limit.");
        setEditSaveDisabled(true);
        return;
      }

      setEditedWork({ ...editedWork, img: file });
      setEditSaveDisabled(false);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("img", editedWork.img);

      await updateRecentWorkById(editedWork.id, formData);

      setEditOpen(false);
      showNotification("File updated successfully!", "success");

      fetchData(); // Refresh the data after update
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteOpen = (work) => {
    setWorkToDelete(work);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setWorkToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteRecentWorkById(workToDelete.id);

      setDeleteOpen(false);
      setWorkToDelete(null);

      showNotification("File deleted successfully!", "success");

      fetchData(); // Refresh the data after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setNewWork({ img: "" });
    setAddSaveDisabled(true);
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const isValidType =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isValidType) {
        showNotification(
          "Invalid file type. Please upload a JPEG or PNG image."
        );
        setAddSaveDisabled(true);
        return;
      }

      // Validate file size (20 MB limit)
      const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
      if (file.size > maxSize) {
        showNotification("File size exceeds 20 MB limit.");
        setAddSaveDisabled(true);
        return;
      }

      setNewWork({ img: file });
      setAddSaveDisabled(false);
    }
  };

  const handleAddSave = async () => {
    try {
      const formData = new FormData();
      formData.append("img", newWork.img);

      await addRecentWork(formData);

      setAddOpen(false);
      showNotification("File added successfully!", "success");

      fetchData(); // Refresh the data after addition
    } catch (error) {
      setError(error.message);
    }
  };

  const showNotification = (message, severity = "error") => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationMessage("");
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
      <Typography variant="h5" component="h5">
      Edit Recent Work
    </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOpen}
        style={{ marginBottom: "20px", marginTop:"10px" }}
      >
        Add New Work
      </Button>

      <TableContainer component={Paper} style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentWorks.map((work, index) => (
              <TableRow key={work.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={work.img}
                    alt={work.img_originalname}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditOpen(work)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteOpen(work)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding Image */}
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New Image</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            margin="dense"
            fullWidth
            onChange={handleAddFileChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddSave}
            color="primary"
            disabled={!newWork.img || addSaveDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Editing Image */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            margin="dense"
            fullWidth
            onChange={handleFileChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={!editedWork.img || editSaveDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Deleting Work */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={closeNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default EditRecentWork;
