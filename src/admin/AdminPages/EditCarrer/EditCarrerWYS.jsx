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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import {
  fetchCareerWYS,
  updateCareerWYS,
  deleteCareerWYS,
  createCareerWYS,
} from "../../AdminServices";
import Notification from "../../../Notification/Notification";

function EditCarrerWYS() {
  const [careerData, setCareerData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [updatedHeading, setUpdatedHeading] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");




  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");


  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };


  const fetchData = async () => {
    try {
      const data = await fetchCareerWYS();
      setCareerData(data);
    } catch (error) {
      console.error("Error fetching career data:", error);
      // Handle errors as needed
    }
  };

  const handleEditClick = (career) => {
    setSelectedCareer(career);
    setUpdatedHeading(career.heading);
    setUpdatedContent(career.content);
    setOpenEdit(true);
  };

  const handleDeleteClick = (career) => {
    setSelectedCareer(career);
    setOpenDelete(true);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewHeading("");
    setNewContent("");
  };

  const handleUpdate = async () => {

    if (!updatedHeading || !updatedContent) {
      showNotification("This feild is required", "error");
      return;
    }
    try {
      const response = await updateCareerWYS(selectedCareer.id, {
        heading: updatedHeading,
        content: updatedContent,
      });
      fetchData(); // Refresh data after update
      handleCloseEdit();
      // Show success notification
      showNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating career data:", error);
      // Handle errors as needed
      showNotification("Error updating career information", "error");
    }
  };


  const handleDelete = async () => {
    try {
      const response = await deleteCareerWYS(selectedCareer.id);
      fetchData(); // Refresh data after delete
      handleCloseDelete();
      // Show success notification
      showNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting career data:", error);
      // Handle errors as needed
      showNotification("Error deleting career information", "error");
    }
  };

  const handleAdd = async () => {

    if (!newHeading || !newContent) {
      showNotification("This feild is required", "error");
      return;
    }
    try {
      const newCareerData = {
        heading: newHeading,
        content: newContent,
      };
      const response = await createCareerWYS(newCareerData);
      fetchData(); // Refresh data after add
      handleCloseAdd();
      // Show success notification
      showNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding career data:", error);
      // Handle errors as needed
      showNotification("Error adding career information", "error");
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
   <Typography variant="h5" component="h5">
      Edit Carrer What You'll See
    </Typography>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{marginTop:"10px"}}>
        Add Career
      </Button>
      <TableContainer style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careerData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.heading}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEditClick(item)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteClick(item)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Career Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            value={updatedHeading}
            onChange={(e) => setUpdatedHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Career Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Career Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this career information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditCarrerWYS;
