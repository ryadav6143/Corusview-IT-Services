import React, { useEffect, useState } from "react";
import { fetchServicesHead, updateServicesHead } from "../../AdminServices";
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
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure

function EditServicesHead() {
  const [servicesHead, setServicesHead] = useState(null);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    services_heading: "",
    services_content: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchServicesHead();
      setServicesHead(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditOpen = (data) => {
    setEditedData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await updateServicesHead(editedData);
      setEditOpen(false);
      setSuccessMessage(response.message);
      fetchData(); // Refresh data after update
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSuccessNotificationClose = () => {
    setSuccessMessage(null);
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  if (!servicesHead) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading...
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
              <TableCell>Services Heading</TableCell>
              <TableCell>Services Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{servicesHead.services_heading}</TableCell>
              <TableCell>{servicesHead.services_content}</TableCell>
              <TableCell>
                <Button
              
                  onClick={() => handleEditOpen(servicesHead)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Content */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Services</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="services_heading"
            name="services_heading"
            label="Services Heading"
            fullWidth
            value={editedData.services_heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="services_content"
            name="services_content"
            label="Services Content"
            fullWidth
            multiline
            rows={4}
            value={editedData.services_content}
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

      {/* Notification for Success */}
      {successMessage && (
        <Notification
          open={true}
          handleClose={handleSuccessNotificationClose}
          alertMessage={successMessage}
          alertSeverity="success"
        />
      )}

      {/* Notification for Error (if needed) */}
      {/* <Notification
        open={error !== null}
        handleClose={() => setError(null)}
        alertMessage={error}
        alertSeverity="error"
      /> */}
    </>
  );
}

export default EditServicesHead;
