import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';
import { fetchCareerHead, updateCareerHead } from '../../AdminServices';

function EditCarrerRYS() {
  const [careerHead, setCareerHead] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedHeading, setUpdatedHeading] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  const fetchData = async () => {
    try {
      const data = await fetchCareerHead();
      setCareerHead(data);
    } catch (error) {
      console.error('Error fetching career head data:', error);
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
      await updateCareerHead({
        ryh_heading: updatedHeading,
        ryh_content: updatedContent,
      });
      fetchData(); // Refresh data after update
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating career head data:', error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      <h2>Career Head Information</h2>
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
              <TableCell>{careerHead.ryh_heading}</TableCell>
              <TableCell>{careerHead.ryh_content}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={handleEditClick}>
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
          <DialogContentText>Edit the career head information:</DialogContentText>
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
    </div>
  );
}

export default EditCarrerRYS;