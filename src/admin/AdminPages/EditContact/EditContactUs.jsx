import React, { useState, useEffect } from 'react';
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
  TextField,
} from '@mui/material';
import { fetchContactUsInfo, updateContactUsInfo } from '../../AdminServices';

function EditContactUs() {
  const [contactInfo, setContactInfo] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: '',
    heading: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContactUsInfo();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact us info:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchContactUsInfo();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact us info:', error);
      // Handle errors as needed
    }
  };

  const handleEditClick = (row) => {
    setEditedData({ ...row }); // Ensure to spread row data correctly
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateContactUsInfo(editedData); // Pass editedData directly
      setEditDialogOpen(false);
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error('Error updating contact us info:', error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      <h2>Contact Us Information</h2>
      {contactInfo && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Heading</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell> {/* Add Actions column */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={contactInfo.id}>
                  <TableCell>{contactInfo.id}</TableCell>
                  <TableCell>{contactInfo.heading}</TableCell>
                  <TableCell>{contactInfo.email}</TableCell>
                  <TableCell>{contactInfo.phone}</TableCell>
                  <TableCell>{contactInfo.address}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleEditClick(contactInfo)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edit Contact Information</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="heading"
                label="Heading"
                type="text"
                fullWidth
                value={editedData.heading}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={editedData.email}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={editedData.phone}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                value={editedData.address}
                onChange={handleFieldChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default EditContactUs;
