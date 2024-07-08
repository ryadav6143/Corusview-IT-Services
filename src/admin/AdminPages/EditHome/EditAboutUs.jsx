import React, { useEffect, useState } from "react";
import { fetchMainTableData, updateMainTableData } from "../../AdminServices";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure

const MAX_ABOUT_US_LENGTH = 350;

function EditAboutUs() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ id: null, about_us: "" });
  const [characterLimitError, setCharacterLimitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
    setEditedData({ id: data.id, about_us: data.about_us });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessMessage(null); // Reset success message when dialog is closed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "about_us" && value.length > MAX_ABOUT_US_LENGTH) {
      setCharacterLimitError(
        `About Us cannot exceed ${MAX_ABOUT_US_LENGTH} characters.`
      );
    } else {
      setCharacterLimitError(null);
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (editedData.about_us.length > MAX_ABOUT_US_LENGTH) {
        setCharacterLimitError(
          `About Us cannot exceed ${MAX_ABOUT_US_LENGTH} characters.`
        );
        return;
      }

      const response = await updateMainTableData(editedData.id, {
        about_us: editedData.about_us,
      });
      setOpen(false);
      setData({ ...data, about_us: editedData.about_us });
      setSuccessMessage(response.message); // Set success message
    } catch (error) {
      setError(error.message);
      setSuccessMessage(error.message, "error");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Typography variant="h5" component="h5">
      Edit About Us
    </Typography>
      <TableContainer component={Paper} style={{marginTop:"10px"}}>
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
                <Button onClick={handleOpen}>Edit</Button>
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
            error={characterLimitError !== null}
            helperText={characterLimitError}
            multiline
            rows={4}
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

      {/* Notification for Character Limit */}
      <Notification
        open={characterLimitError !== null}
        handleClose={() => setCharacterLimitError(null)}
        alertMessage={characterLimitError}
        alertSeverity="error"
      />

      {/* Success Notification */}
      <Notification
        open={successMessage !== null}
        handleClose={() => setSuccessMessage(null)}
        alertMessage={successMessage}
        alertSeverity="success"
      />
    </>
  );
}

export default EditAboutUs;
