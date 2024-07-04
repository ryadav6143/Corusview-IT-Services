import React, { useEffect, useState } from "react";
import {
  fetchOurValues,
  updateOurValuesById,
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
import Notification from "../../../Notification/Notification"; // Adjust the path as per your file structure

function EditAboutValue() {
  const [ourValues, setOurValues] = useState([]);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    heading: "",
    content: "",
  });

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOurValues();
        setOurValues(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditOpen = (data) => {
    setEditedData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Character limit validations
    if (name === "heading" && value.length > 15) {
      setAlertMessage("Heading should not exceed 15 characters.");
      setAlertSeverity("error");
      setNotificationOpen(true);
      return;
    }

    if (name === "content" && value.length > 300) {
      setAlertMessage("Content should not exceed 300 characters.");
      setAlertSeverity("error");
      setNotificationOpen(true);
      return;
    }

    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = async () => {

    if (!editedData.heading || !editedData.content) {
      // Show notification for required fields
      setAlertMessage("This feild is required.");
      setAlertSeverity("error");
      setNotificationOpen(true);
      return;
    }
    try {
     const response = await updateOurValuesById(editedData.id, editedData);

      // Show success notification
      setAlertMessage(response.message);
      setAlertSeverity("success");
      setNotificationOpen(true);

      setEditOpen(false);

      // Refresh the data
      const updatedData = await fetchOurValues();
      setOurValues(updatedData);
    } catch (error) {
      setError(error.message);
      // Show error notification
      setAlertMessage("Failed to update data");
      setAlertSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ourValues.map((value, index) => (
              <TableRow key={value.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.heading}</TableCell>
                <TableCell>{value.content}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditOpen(value)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Content */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <TextField
            name="heading"
            label="Heading"
            fullWidth
            margin="dense"
            value={editedData.heading}
            onChange={handleChange}
          />
          <TextField
            name="content"
            label="Content"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={editedData.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </>
  );
}

export default EditAboutValue;
