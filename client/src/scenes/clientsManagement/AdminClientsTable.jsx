import React, {  useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton, MenuItem, Select } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';



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

const AdminClientsTable = ({ clientsData,handleChange }) => {
    const [selectedService, setSelectedService] = useState({});
    // const navigate = useNavigate();

    // const handleOpen = (userId) => {
    // navigate('/invoices?userId=' + userId);
    // };



    useEffect(() => {
        const initialSelectedService = {};
        clientsData.forEach(user => {
          initialSelectedService[user._id] = user.service;
        });
        setSelectedService(initialSelectedService);
      }, [clientsData]);
    
      const handleServiceChange = (userService, userId, service) => {
        setSelectedService(prevState => ({
          ...prevState,
          [userId]: service
        }));
        if (userService!==service) {
        updateService(userId, service);
        }
      };
    
      const updateService = async (_id, service) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/service`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id,service })
          });
          if (!response.ok) {
            throw new Error('Failed to update service');
          }
          console.log('Service updated successfully');
          handleChange();
        } catch (error) {
          console.error('Error updating service:', error);
        }
      };
  
    return (
      <CenteredTableContainer component={Paper} style={{ width: '90%'}}> 
        <Table aria-label="customized table">
          <TableHead  >
            <TableRow >
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Service</StyledTableCell>
              <StyledTableCell>Invoice</StyledTableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsData.map((user) => (
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
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.location}</StyledTableCell>
                <StyledTableCell>
                  <Select
                    value={selectedService[user._id] || ''}
                    onChange={(e) => handleServiceChange(user.service,user._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="ongoing">Ongoing</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton >
                  <DescriptionOutlinedIcon />
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
  
  export default AdminClientsTable;