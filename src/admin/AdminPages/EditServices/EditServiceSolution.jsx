import React, { useState, useEffect } from "react";
import {
  TextField,
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
  Box,
  Typography
} from "@mui/material";
import {
  fetchAllSolutions,
  updateSolution,
  deleteSolution,
  addSolution,
} from "../../AdminServices";
import Notification from "../../../Notification/Notification"; // Adjust path as per your project structure

function EditServiceSolution() {
  const [solutions, setSolutions] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false); // Added state for the add dialog
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const solutionsData = await fetchAllSolutions();
      setSolutions(solutionsData);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      // Handle errors as needed
    }
  };

  const handleEditClick = (solution) => {
    setSelectedSolution(solution);
    setEditedHeading(solution.inner_heading);
    setEditedContent(solution.inner_content);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedSolution(null);
    setEditedHeading("");
    setEditedContent("");
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        inner_heading: editedHeading,
        inner_content: editedContent,
      };
      const response = await updateSolution(selectedSolution.id, updatedData);
      await fetchData(); // Refresh the solutions list after successful update
      handleCloseEditDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating solution:", error);
      // Handle error as needed
      handleNotification("Error updating solution", "error");
    }
  };

  const handleDeleteClick = (solution) => {
    setSelectedSolution(solution);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSolution(selectedSolution.id);
      await fetchData(); // Refresh the solutions list after successful deletion
      handleCloseDeleteDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting solution:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedSolution(null);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleSaveNewSolution = async () => {
    try {
      const newSolution = {
        inner_heading: newHeading,
        inner_content: newContent,
      };
      const response = await addSolution(newSolution);
      await fetchData(); // Refresh the solutions list after successful addition
      handleCloseAddDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding solution:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
    setNewContent("");
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
      Edit Service Solution
    </Typography>
      <Button
        onClick={handleAddClick}
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" ,marginTrim:"10px"}}
      >
        Add New Solution
      </Button>
      {/* Table of Solutions */}
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
            {solutions.map((solution,index) => (
              <TableRow key={solution.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{solution.inner_heading}</TableCell>
                <TableCell>{solution.inner_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(solution)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteClick(solution)}>
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
        <DialogTitle>Edit Solution</DialogTitle>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Solution</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this solution?</p>
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

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Solution</DialogTitle>
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
            onClick={handleSaveNewSolution}
          
            color="primary"
          >
            Add Solution
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

export default EditServiceSolution;
