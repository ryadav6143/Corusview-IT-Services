import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { fetchHeaderData, updateHeaderColor } from "../../AdminServices";
import Notification from "../../../Notification/Notification"; // Import the Notification component

const HeaderTable = () => {
  const [headerData, setHeaderData] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [editItemName, setEditItemName] = useState(""); // Use name for editing
  const [loading, setLoading] = useState(true);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchHeaderData();
      setHeaderData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (name) => {
    setEditItemName(name); // Set name for editing
    setEditDialogOpen(true);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleColorUpdate = async () => {
    try {
      // Determine which color to update based on editItemName
      let fieldToUpdate;
      if (editItemName === "header_color1") {
        fieldToUpdate = "header_color1";
      } else if (editItemName === "header_color2") {
        fieldToUpdate = "header_color2";
      }

      const response = await updateHeaderColor(
        headerData.id,
        selectedColor,
        fieldToUpdate
      );

      // Handle successful update
      setNotificationMessage(response.message || "Update successful");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      fetchData(); // Refresh data after update
      setEditDialogOpen(false);
    } catch (error) {
      // Handle error update
      console.error("Error updating color:", error);
      setNotificationMessage("Failed to update color");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!headerData) {
    return null;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Header Color</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{headerData.id}</TableCell>
              <TableCell
                style={{
                  backgroundColor: headerData.header_color1,
                }}
              ></TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick("header_color1")}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{headerData.id}</TableCell>
              <TableCell
                style={{
                  backgroundColor: headerData.header_color2,
                }}
              ></TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick("header_color2")}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Color</DialogTitle>
        <DialogContent>
          <ChromePicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleColorUpdate} color="primary">
            Update Color
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
};

export default HeaderTable;
