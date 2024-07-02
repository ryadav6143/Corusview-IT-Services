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

function EditHeading() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ id: null, heading_1: '', heading_2: '' });

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchMainTableData();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const handleOpen = () => {
    setEditedData({ id: data.id, heading_1: data.heading_1, heading_2: data.heading_2 });
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
      await updateMainTableData(editedData.id, { heading_1: editedData.heading_1, heading_2: editedData.heading_2 });
      setOpen(false);
      // Update state directly after successful update
      setData({ ...data, heading_1: editedData.heading_1, heading_2: editedData.heading_2 });
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
              <TableCell>Heading 1</TableCell>
              <TableCell>Heading 2</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data?.id}</TableCell>
              <TableCell>{data?.heading_1}</TableCell>
              <TableCell>{data?.heading_2}</TableCell>
              <TableCell>
                <Button  onClick={handleOpen}>Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading 1"
            type="text"
            fullWidth
            name="heading_1"
            value={editedData.heading_1}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Heading 2"
            type="text"
            fullWidth
            name="heading_2"
            value={editedData.heading_2}
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

export default EditHeading;
