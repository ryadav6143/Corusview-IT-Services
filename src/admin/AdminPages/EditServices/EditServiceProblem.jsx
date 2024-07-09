import React, { useState, useEffect } from "react";
import {
  Box,
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
  TextField,
  Typography
} from "@mui/material";
import {
  fetchProblems,
  updateProblem,
  deleteProblem,
  addProblem,
} from "../../AdminServices"; // Adjust path as per your project structure
import Notification from "../../../Notification/Notification"; // Adjust path as per your project structure

function EditServiceProblem() {
  const [problems, setProblems] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false); // State for add dialog
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [newHeading, setNewHeading] = useState(""); // State for new problem heading
  const [newContent, setNewContent] = useState(""); // State for new problem content

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const problemsData = await fetchProblems();
      setProblems(problemsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed, e.g., display error message or retry fetch
    }
  };

  const handleEditClick = (problem) => {
    setSelectedProblem(problem);
    setEditedHeading(problem.inner_heading);
    setEditedContent(problem.inner_content);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (problem) => {
    setSelectedProblem(problem);
    setOpenDeleteDialog(true);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProblem(null);
    setEditedHeading("");
    setEditedContent("");
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProblem(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
    setNewContent("");
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        inner_heading: editedHeading,
        inner_content: editedContent,
      };
      const response = await updateProblem(selectedProblem.id, updatedData);
      // Refresh the problems list after successful update
      await fetchData();
      handleCloseEditDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating problem:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProblem(selectedProblem.id);
      // Refresh the problems list after successful deletion
      await fetchData();
      handleCloseDeleteDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting problem:", error);
      // Handle error as needed
      handleNotification("Error deleting problem", "error");
    }
  };

  const handleAddProblem = async () => {
    try {
      const newProblem = {
        inner_heading: newHeading,
        inner_content: newContent,
      };
      const response = await addProblem(newProblem);
      // Refresh the problems list after successful addition
      await fetchData();
      handleCloseAddDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding problem:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
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

  return (
    <Box>
      <Typography variant="h5" component="h5">
      Edit Service Problem
    </Typography>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: "1rem" ,marginTop:"10px"}}
      >
        Add Problem
      </Button>

      {/* Table of Problems */}
      <TableContainer component={Paper} style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Inner Heading</TableCell>
              <TableCell>Inner Content</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem, index) => (
              <TableRow key={problem.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{problem.inner_heading}</TableCell>
                <TableCell>{problem.inner_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(problem)}>Edit</Button>
                
                </TableCell>
                <TableCell>
                <Button
                    color="error"
                    onClick={() => handleDeleteClick(problem)}
                  >
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
        <DialogTitle>Edit Problem</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Inner Heading"
            fullWidth
            value={editedHeading}
            onChange={(e) => setEditedHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Inner Content"
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
          
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Problem Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Problem</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Inner Heading"
            fullWidth
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Inner Content"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddProblem}
       
            color="primary"
          >
            Add Problem
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Problem</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this problem?</p>
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
    </Box>
  );
}

export default EditServiceProblem;
