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
} from "@mui/material";
import {
  fetchProblems,
  updateProblem,
  deleteProblem,
  addProblem,
} from "../../AdminServices"; // Adjust path as per your project structure

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
      await updateProblem(selectedProblem.id, updatedData);
      // Refresh the problems list after successful update
      await fetchData();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating problem:", error);
      // Handle error as needed
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProblem(selectedProblem.id);
      // Refresh the problems list after successful deletion
      await fetchData();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting problem:", error);
      // Handle error as needed
    }
  };

  const handleAddProblem = async () => {
    try {
      const newProblem = {
        inner_heading: newHeading,
        inner_content: newContent,
      };
      await addProblem(newProblem);
      // Refresh the problems list after successful addition
      await fetchData();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding problem:", error);
      // Handle error as needed
    }
  };

  return (
    <Box>
      <h2> Problems</h2>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: "1rem" }}
      >
        Add Problem
      </Button>

      {/* Table of Problems */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Inner Heading</TableCell>
              <TableCell>Inner Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.id}</TableCell>
                <TableCell>{problem.inner_heading}</TableCell>
                <TableCell>{problem.inner_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(problem)}>Edit</Button>
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
            variant="contained"
            color="primary"
          >
            Save{" "}
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
            variant="contained"
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
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditServiceProblem;
