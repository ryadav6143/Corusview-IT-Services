// EditCarrerHead.js

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
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { fetchCareerHead, updateCareerHead } from "../../AdminServices";

function EditCarrerHead() {
  const [careerHead, setCareerHead] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    carrer_heading: "",
    carrer_content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCareerHead();
        setCareerHead(data);
      } catch (error) {
        console.error("Error fetching career head data:", error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []);

  const handleEditOpen = () => {
    setEditedData({
      carrer_heading: careerHead.carrer_heading,
      carrer_content: careerHead.carrer_content,
    });
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
      await updateCareerHead(editedData);
      setEditOpen(false);
      // Refresh career head data after update
      const updatedData = await fetchCareerHead();
      setCareerHead(updatedData);
    } catch (error) {
      console.error("Error updating career head data:", error);
      // Handle error
    }
  };

  if (!careerHead) {
    return <div>Loading...</div>; // Add a loader or placeholder while data is being fetched
  }

  return (
    <div>
      <h2>Career Head Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{careerHead.carrer_heading}</TableCell>
              <TableCell>{careerHead.carrer_content}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={handleEditOpen}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Career Head</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="carrer_heading"
            label="Career Heading"
            fullWidth
            value={editedData.carrer_heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="carrer_content"
            label="Career Content"
            fullWidth
            multiline
            rows={4}
            value={editedData.carrer_content}
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
    </div>
  );
}

export default EditCarrerHead;
