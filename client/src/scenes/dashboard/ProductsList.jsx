import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ProductsList({ bestSeller }) {
  if (!bestSeller) return null;
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
          {bestSeller.map((row, index) => (
            <TableRow key={row.nom_unit} sx={{ border: "none" }}>
              <TableCell component="th" scope="row">
                {row.nom_unit}
              </TableCell>
              <TableCell align="right">{row.totalNombreUnit}</TableCell>
              <TableCell align="right">{row.prix_unit}</TableCell>
              <TableCell align="right">{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
