import React, { useEffect, useState } from "react";
import { fetchProblemHead, updateProblemHead } from "../../AdminServices";
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

function EditProblemHead() {
  const [problemHeading, setProblemHeading] = useState("");
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedHeading, setEditedHeading] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchProblemHead();
      setProblemHeading(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditOpen = () => {
    setEditedHeading(problemHeading);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleChange = (e) => {
    setEditedHeading(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await updateProblemHead({ heading: editedHeading });
      setEditOpen(false);
      const updatedHeading = await fetchProblemHead();
      setProblemHeading(updatedHeading);
      setSuccessMessage(response.message);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(error.message, "error");
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

  if (!problemHeading) {
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
              <TableCell>Heading</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{problemHeading}</TableCell>
              <TableCell>
                <Button onClick={handleEditOpen}>Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Content */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Problem Heading</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="heading"
            name="heading"
            label="Problem Heading"
            fullWidth
            value={editedHeading}
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

export default EditProblemHead;
