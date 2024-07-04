import React, { useEffect, useState } from "react";
import { fetchAboutUsCompany, updateAboutUsCompany } from "../../AdminServices";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function EditAboutPage() {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    company_content: "",
    story_content: "",
    vision_content: "",
  });
  const [selectedField, setSelectedField] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAboutUsCompany();
        setAboutUsData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditOpen = (data) => {
    setEditedData(data);
    setSelectedField("");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Call your update API here and pass the editedData
      await updateAboutUsCompany(editedData);

      setEditOpen(false);

      // Refresh the data
      const updatedData = await fetchAboutUsCompany();
      setAboutUsData(updatedData);
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Our Company</TableCell>
              <TableCell>Our Story</TableCell>
              <TableCell>Our Vision </TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aboutUsData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.company_content}</TableCell>
                <TableCell>{data.story_content}</TableCell>
                <TableCell>{data.vision_content}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditOpen(data)}
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
          <FormControl fullWidth margin="dense">
            <InputLabel fullWidth margin="dense">
              Select Field to Edit
            </InputLabel>
            <Select
              value={selectedField}
              onChange={handleFieldChange}
              fullWidth
              margin="dense"
            >
              <MenuItem value="company_content">Our Company</MenuItem>
              <MenuItem value="story_content">Our Story</MenuItem>
              <MenuItem value="vision_content">Our Vision </MenuItem>
            </Select>
          </FormControl>
          {selectedField === "company_content" && (
            <TextField
              name="company_content"
              label="Our Company"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={editedData.company_content}
              onChange={handleChange}
            />
          )}
          {selectedField === "story_content" && (
            <TextField
              name="story_content"
              label="Our Story"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={editedData.story_content}
              onChange={handleChange}
            />
          )}
          {selectedField === "vision_content" && (
            <TextField
              name="vision_content"
              label="Our Vision "
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={editedData.vision_content}
              onChange={handleChange}
            />
          )}
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

export default EditAboutPage;
