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
  DialogActions,
} from "@mui/material";
import { fetchContactForm, deleteContactFormEntry } from "../../AdminServices";
import Notification from "../../../Notification/Notification"; // Adjust path as per your file structure

function EditContactForm() {
  const [contactFormData, setContactFormData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEntryId, setDeleteEntryId] = useState(null);

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("error"); // Default severity is error

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchContactForm();
      setContactFormData(data);
    } catch (error) {
      console.error("Error fetching contact form data:", error);
      // Handle errors as needed
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteEntryId(id);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDeleteEntryId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteEntryId) {
      try {
        const response = await deleteContactFormEntry(deleteEntryId);
        setDeleteDialogOpen(false);
        fetchData(); // Refetch data after deletion

        // Show success message from API response
        setNotificationMessage(response.message); // Assuming your API response has a 'message' field
        setNotificationSeverity("success");
        setNotificationOpen(true);
      } catch (error) {
        console.error(
          `Error deleting contact form entry with ID ${deleteEntryId}:`,
          error
        );
        // Handle errors as needed
        setNotificationMessage("Failed to delete contact form entry.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    }
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <div>
      <h2>Contact Form Entries</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell> {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {contactFormData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.role}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>{entry.message}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(entry.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditContactForm;
