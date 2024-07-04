import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import {
  fetchCareerImages,
  updateCareerImage,
  uploadCareerImages,
  deleteCareerImage,
} from "../../AdminServices";
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../Notification/Notification";

function EditCarrerImages() {
  const [careerImages, setCareerImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const fetchData = async () => {
    try {
      const data = await fetchCareerImages();
      setCareerImages(data);
    } catch (error) {
      console.error("Error fetching career images data:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditOpen = (data) => {
    setSelectedImageId(data.id);
    setOpenDialog(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Check file size
    if (file.size > 20 * 1024 * 1024) {
      setNotificationSeverity("error");
      setNotificationMessage(
        "File size exceeds 20 MB. Please choose a smaller file."
      );
      setNotificationOpen(true);
      return;
    }

    // Check file type
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedFormats.includes(file.type)) {
      setNotificationSeverity("error");
      setNotificationMessage(
        "Unsupported file format. Please choose a JPG, JPEG, or PNG file."
      );
      setNotificationOpen(true);
      return;
    }

    // Update selectedFiles state
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedFiles[selectedOption]) {
      console.error("Please select a file.");
      setNotificationSeverity("error");
      setNotificationMessage("Please select a file.");
      setNotificationOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append(selectedOption, selectedFiles[selectedOption]);

    try {
      const response = await updateCareerImage(selectedImageId, formData);
      console.log("Career image updated successfully:", response);
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use API response message
      setNotificationOpen(true);
      // Optionally, update state or display a success message
    } catch (error) {
      console.error("Error updating career image:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error updating career image.");
      setNotificationOpen(true);
      // Handle error as needed
    }
    fetchData();
    setOpenDialog(false);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleAddOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddImages = async () => {
    const formData = new FormData();
    Object.keys(selectedFiles).forEach((key) => {
      formData.append(key, selectedFiles[key]);
    });

    try {
      const response = await uploadCareerImages(formData);
      console.log("Career images added successfully:", response);
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use API response message
      setNotificationOpen(true);
      // Optionally, update state or display a success message
    } catch (error) {
      console.error("Error adding career images:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error adding career images.");
      setNotificationOpen(true);
      // Handle error as needed
    }

    fetchData();
    setOpenAddDialog(false);
  };

  const handleDeleteOpen = (id) => {
    setImageToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setImageToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteCareerImage(imageToDelete);
      console.log("Career image deleted successfully:", response);
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use API response message
      setNotificationOpen(true);
      // Optionally, update state or display a success message
    } catch (error) {
      console.error("Error deleting career image:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error deleting career image.");
      setNotificationOpen(true);
      // Handle error as needed
    }
    fetchData();
    handleDeleteClose();
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  const isAddImagesDisabled = Object.values(selectedFiles).some(
    (file) =>
      file.size > 20 * 1024 * 1024 ||
      !["image/jpeg", "image/jpg", "image/png"].includes(file.type)
  );
  return (
    <div>
      <h2>Career Images</h2>

      {/* Button to add images */}
      <Button variant="contained" color="primary" onClick={handleAddOpen}>
        Add Image
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image 1</TableCell>
              <TableCell>Image 2</TableCell>
              <TableCell>Image 3</TableCell>
              <TableCell>Image 4</TableCell>
              <TableCell>Image 5</TableCell>
              <TableCell>Image 6</TableCell>
              <TableCell>Image 7</TableCell>
              <TableCell>Image 8</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careerImages.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.images[0]?.img_1.url}
                    alt={item.images[0]?.img_1.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[1]?.img_2.url}
                    alt={item.images[1]?.img_2.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[2]?.img_3.url}
                    alt={item.images[2]?.img_3.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[3]?.img_4.url}
                    alt={item.images[3]?.img_4.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[4]?.img_5.url}
                    alt={item.images[4]?.img_5.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[5]?.img_6.url}
                    alt={item.images[5]?.img_6.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[6]?.img_7.url}
                    alt={item.images[6]?.img_7.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item.images[7]?.img_8.url}
                    alt={item.images[7]?.img_8.originalname}
                    style={{ maxWidth: "80px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditOpen(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteOpen(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Career Image</DialogTitle>
        <DialogContent>
          <p>Select an image to edit:</p>
          <Select
            inputProps={{ "aria-label": "Select an image" }}
            displayEmpty
            value={selectedOption}
            onChange={handleOptionChange}
            fullWidth
          >
            <MenuItem disabled value="">
              <em>Select an image</em>
            </MenuItem>
            <MenuItem value="img_1">Image 1</MenuItem>
            <MenuItem value="img_2">Image 2</MenuItem>
            <MenuItem value="img_3">Image 3</MenuItem>
            <MenuItem value="img_4">Image 4</MenuItem>
            <MenuItem value="img_5">Image 5</MenuItem>
            <MenuItem value="img_6">Image 6</MenuItem>
            <MenuItem value="img_7">Image 7</MenuItem>
            <MenuItem value="img_8">Image 8</MenuItem>
          </Select>
          {selectedOption && (
            <TextField
              margin="dense"
              fullWidth
              type="file"
              onChange={(event) => handleFileChange(event, selectedOption)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Career Images</DialogTitle>
        <DialogContent>
          <Box>
            <p>Select images to add:</p>
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_1")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_2")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_3")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_4")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_5")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_6")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_7")}
              fullWidth
              margin="normal"
            />
            <TextField
              type="file"
              onChange={(event) => handleFileChange(event, "img_8")}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddImages}
            color="primary"
            disabled={isAddImagesDisabled}
          >
            Add Images
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for deletion confirmation */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Career Image</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this image?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={closeNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditCarrerImages;
