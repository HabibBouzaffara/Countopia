import React, {  useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ConfirmationDialog from 'scenes/ConfirmationDialog';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#BFB5FF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const CenteredTableContainer = styled(TableContainer)({

  borderRadius: '20px', // Set the border radius
  marginRight: 'auto', // Set the margin-right to auto
  marginLeft: 'auto', // Set the margin-left to auto
  marginBottom: 'auto', // Add spacing from the bottom

  
});

const SuperadminClientsTable = ({ userData, handleChange }) => {
  const [adminNames, setAdminNames] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [message,setMessage] = useState('');
  const [clientId, setClientId] = useState(null);
  useEffect(() => {
    const fetchAdminNames = async () => {
      try {
        const adminIds = userData.map(user => user.assigned).flat();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/adminName`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminIds }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin names");
        }

        const data = await response.json();
        setAdminNames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdminNames();
  }, [userData]);


const handleConfirmDelete = async () => {
  try{
    await deleteClient();
  setOpenConfirmationDialog(false);
  handleChange();
  }catch(err){
    console.log(err);
  }
  
};
const handleRemoveClick = async (_id) => {
  setClientId(_id);
  setMessage("deleteClient");
  setOpenConfirmationDialog(true);
};
const handleCancelDelete =  () => {
  setOpenConfirmationDialog(false);
};

  const deleteClient = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/clients?action=delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id:clientId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    
    <CenteredTableContainer component={Paper} style={{ width: '90%'}}> 
    <ConfirmationDialog
        isOpen={openConfirmationDialog}
        data={message}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <Table aria-label="customized table">
        <TableHead  >
          <TableRow >
            <StyledTableCell>Client</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Fiscal Code</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Assigned To</StyledTableCell>
            <StyledTableCell align="center" >Action</StyledTableCell>
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt={user.name} style={{ marginRight: '10px' }} src={process.env.REACT_APP_BASE_URL + "/assets/" + user.picturePath} />
                   <div>
                    <span style={{ fontWeight: 'bold', color: '#A6A6A6' }}>{user.companyName}</span><br />
                    {user.name}
                   </div>
               </div>
              </StyledTableCell>
              <StyledTableCell >{user.email}</StyledTableCell>
              <StyledTableCell >{user.codeFiscale}</StyledTableCell>
              <StyledTableCell >{user.phoneNumber}</StyledTableCell>
              <StyledTableCell >{user.location}</StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">               
                {user.assigned.length === 0 ? "Unassigned" :  adminNames[user.assigned]}
              </StyledTableCell>
              <StyledTableCell align="center" >
                <IconButton aria-label="delete" onClick={() => handleRemoveClick(user._id)}>
                  <Delete  />
                </IconButton>
              </StyledTableCell>
              {/* Add more table cells for additional user data */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </CenteredTableContainer>
  );
};

export default SuperadminClientsTable;