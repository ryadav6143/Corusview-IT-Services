import React, { useEffect, useState } from 'react';
import { fetchMainTableData, updateMainTableData } from '../../AdminServices';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function EditAboutUs() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ id: null, about_us: '' });

  useEffect(() => {
    const getData = async () => {
      try {
        // Assuming fetchMainTableData fetches about_us data specifically
        const result = await fetchMainTableData();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const handleOpen = () => {
    setEditedData({ id: data.id, about_us: data.about_us });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Assuming updateMainTableData updates about_us data specifically
      await updateMainTableData(editedData.id, { about_us: editedData.about_us });
      setOpen(false);
      // Update state directly after successful update
      setData({ ...data, about_us: editedData.about_us });
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>About Us</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data?.id}</TableCell>
              <TableCell>{data?.about_us}</TableCell>
              <TableCell>
                <Button  onClick={handleOpen}>Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit About Us</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="About Us"
            type="text"
            fullWidth
            name="about_us"
            value={editedData.about_us}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditAboutUs;
