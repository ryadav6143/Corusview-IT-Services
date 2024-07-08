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
import { fetchCareerHead, updateCareerHead } from "../../AdminServices";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your file structure

function EditCarrerRYS() {
  const [careerHead, setCareerHead] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedHeading, setUpdatedHeading] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  // Notification state variables
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");

  // Function to show notifications
  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const fetchData = async () => {
    try {
      const data = await fetchCareerHead();
      setCareerHead(data);
    } catch (error) {
      console.error("Error fetching career head data:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    setUpdatedHeading(careerHead.ryh_heading);
    setUpdatedContent(careerHead.ryh_content);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleUpdate = async () => {
    try {
      // Check for empty fields
      if (!updatedHeading.trim() || !updatedContent.trim()) {
        showNotification("All fields are required", "error");
        return;
      }

      const response = await updateCareerHead({
        ryh_heading: updatedHeading,
        ryh_content: updatedContent,
      });
      
      fetchData(); // Refresh data after update
      handleCloseEdit();
      showNotification(response.message, "success"); // Show success notification
    } catch (error) {
      console.error("Error updating career head data:", error);
      // Handle errors as needed
      showNotification("Error updating career head information", "error");
    }
  };

  return (
    <div>
     <Typography variant="h5" component="h5">
      Edit Go Ahead
    </Typography>
      <TableContainer component={Paper} style={{marginTop:"10px"}}>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{careerHead.ryh_heading}</TableCell>
              <TableCell>{careerHead.ryh_content}</TableCell>
              <TableCell>
                <Button
                  
                  color="primary"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Career Head Information</DialogTitle>
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

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditCarrerRYS;
