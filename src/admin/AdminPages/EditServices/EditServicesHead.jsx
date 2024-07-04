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

function EditServicesHead() {
  const [servicesHead, setServicesHead] = useState(null);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    services_heading: "",
    services_content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServicesHead();
        setServicesHead(data);
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
      await updateServicesHead(editedData); // Call updateServicesHead with editedData
      setEditOpen(false);
      const updatedData = await fetchServicesHead(); // Refresh data after update
      setServicesHead(updatedData);
    } catch (error) {
      setError(error.message);
    }
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
                  variant="outlined"
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
    </>
  );
}

export default EditServicesHead;
