// EditServiceSolution.jsx

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
} from "@mui/material";
import {
  fetchAllSolutions,
  updateSolution,
  deleteSolution,
  addSolution,
} from "../../AdminServices";

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
      await updateSolution(selectedSolution.id, updatedData);
      await fetchData(); // Refresh the solutions list after successful update
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating solution:", error);
      // Handle error as needed
    }
  };

  const handleDeleteClick = (solution) => {
    setSelectedSolution(solution);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSolution(selectedSolution.id);
      await fetchData(); // Refresh the solutions list after successful deletion
      handleCloseDeleteDialog(); // Corrected function name here
    } catch (error) {
      console.error("Error deleting solution:", error);
      // Handle error as needed
    }
  };

  const handleCloseDeleteDialog = () => {
    // Function definition corrected here
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
      await addSolution(newSolution);
      await fetchData(); // Refresh the solutions list after successful addition
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding solution:", error);
      // Handle error as needed
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
    setNewContent("");
  };

  return (
    <Box>
      <h2>Service Solutions</h2>
      <Button
        onClick={handleAddClick}
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
      >
        Add New Solution
      </Button>
      {/* Table of Solutions */}
      <TableContainer component={Paper}>
        <Table>
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
            {solutions.map((solution) => (
              <TableRow key={solution.id}>
                <TableCell>{solution.id}</TableCell>
                <TableCell>{solution.inner_heading}</TableCell>
                <TableCell>{solution.inner_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(solution)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(solution)}>
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
            variant="contained"
            color="primary"
          >
            Save Changes
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
            variant="contained"
            color="secondary"
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
            variant="contained"
            color="primary"
          >
            Add Solution
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditServiceSolution;
