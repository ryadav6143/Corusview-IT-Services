import React, { useEffect, useState } from "react";
import { fetchMainTableData, updateMainTableData } from "../../AdminServices";
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
import Notification from "../../../Notification/Notification"; // Adjust path as per your file structure

const RecentworkHead = () => {
  const [mainTableData, setMainTableData] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updatedHeading, setUpdatedHeading] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchMainTableData();
      setMainTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = () => {
    setUpdatedHeading(mainTableData?.recent_work_heading);
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleHeadingChange = (event) => {
    const value = event.target.value;
    if (value.length > 150) {
      setNotificationSeverity("error");
      setNotificationMessage("Heading cannot exceed 150 characters");
      setNotificationOpen(true);
    } else {
      setUpdatedHeading(value);
    }
  };

  const handleUpdateHeading = async () => {
    try {
      await updateMainTableData(mainTableData.id, {
        recent_work_heading: updatedHeading,
      });
      setMainTableData((prevData) => ({
        ...prevData,
        recent_work_heading: updatedHeading,
      }));
      handleDialogClose();
      // Show success notification
      setNotificationSeverity("success");
      setNotificationMessage("Data updated successfully");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating heading:", error);
      // Show error notification
      setNotificationSeverity("error");
      setNotificationMessage("Failed to update data");
      setNotificationOpen(true);
    }
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Recent Work Heading</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{mainTableData?.id}</TableCell>
              <TableCell>{mainTableData?.recent_work_heading}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={handleEditClick}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Recent Work Heading</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Recent Work Heading"
            fullWidth
            value={updatedHeading}
            onChange={handleHeadingChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateHeading} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
};

export default RecentworkHead;
