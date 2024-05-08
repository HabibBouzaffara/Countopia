import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#BFB5FF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WaitingListManagement = ({ userData, handleChange }) => {
  const handleApprove = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/clients/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ _id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/client-delete?action=reject`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ _id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userData.map(user => user._id));
  return (
    <TableContainer component={Paper} style={{ width: "100%" }}>
      <Table aria-label='client management table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Fiscal Code</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>

            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.companyName}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.codeFiscale}</StyledTableCell>
              <StyledTableCell>{user.phoneNumber}</StyledTableCell>
              <StyledTableCell>{user.location}</StyledTableCell>

              <StyledTableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleApprove(user._id)}
                  sx={{ borderRadius: "20px" }}
                >
                  Approve
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => handleDelete(user._id)}
                  sx={{ borderRadius: "20px" }}
                >
                  Reject
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaitingListManagement;
