import React, { useState, useEffect } from 'react';
import { getApplicants } from '../../AdminServices';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ApplyNow() {
  const [applicants, setApplicants] = useState([]);
  const [open, setOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getApplicants();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleClickOpen = (url) => {
    setCvUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCvUrl('');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Applied For</TableCell>
              <TableCell>Last CTC</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.id}</TableCell>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.surname}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.contact}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(applicant.drop_cv)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{applicant.applied_for}</TableCell>
                <TableCell>{applicant.last_ctc}</TableCell>
                <TableCell>{applicant.year_of_exp}</TableCell>
                <TableCell>{applicant.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>View CV</DialogTitle>
        <DialogContent>
          <iframe
            src={cvUrl}
            title="CV"
            width="100%"
            height="500px"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApplyNow;
