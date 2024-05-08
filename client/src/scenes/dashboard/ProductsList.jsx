import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, quantity, price, top) {
  return { name, quantity, price, top };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 1),
  createData("Ice cream sandwich", 237, 9.0, 2),
  createData("Eclair", 262, 16.0, 3),
];

export default function ProductsList() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        width: 520,
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <Table sx={{ width: 520, border: "none" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#F6F5FF",
                borderTopLeftRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            >
              Product Name
            </TableCell>
            <TableCell align="right" style={{ backgroundColor: "#F6F5FF" }}>
              Quantity
            </TableCell>
            <TableCell align="right" style={{ backgroundColor: "#F6F5FF" }}>
              Price
            </TableCell>
            <TableCell
              align="right"
              style={{
                backgroundColor: "#F6F5FF",
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              Top
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ border: "none" }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.top}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
