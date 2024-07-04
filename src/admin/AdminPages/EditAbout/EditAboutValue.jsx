// EditAboutValue.js

import React, { useEffect, useState } from "react";
import { fetchOurValues, updateOurValuesById } from "../../AdminServices";
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

function EditAboutValue() {
  const [ourValues, setOurValues] = useState([]);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    heading: "",
    content: "",
  });

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
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateOurValuesById(editedData.id, editedData);
      setEditOpen(false);

      // Refresh the data
      const updatedData = await fetchOurValues();
      setOurValues(updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
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
              <Typography variant="p" color="error">
                Error: {Error}
              </Typography>
            </TableBody>
          </Table>
        </TableContainer>
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
    </>
  );
}

export default EditAboutValue;
