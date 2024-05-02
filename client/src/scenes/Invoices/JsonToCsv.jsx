import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const JsonToCsv = ({ fileData }) => {
  // Extracting the keys from the first object in fileData
  const tableHead = Object.keys(fileData[0]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          sx={{
            color: "#263238",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          Invoice Csv
        </Typography>
        <Typography
          sx={{
            color: "#A6A6A6",
            fontSize: "15px",
            marginTop: "20px",
            alignSelf: "center",
            alignItems: "end",
            marginLeft: "auto",
            marginRight: "30px",
            // marginBottom: "25px",
          }}
        >
          Update / Transform your CSV file
        </Typography>
      </Box>

      <Box mt='20px' marginBottom='20px'>
        <TableContainer
          component={Paper}
          sx={{
            width: "90%",
            margin: "auto",
            borderRadius: "10px",
            border: "1px solid #E0E0E0",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            maxHeight: "500px",
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {/* Using tableHead to generate table headers */}
                {tableHead.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fileData.map((row, index) => (
                <TableRow key={index}>
                  {/* Using tableHead to access corresponding data */}
                  {tableHead.map((header, index) => (
                    <TableCell key={index}>
                      {row[header] ? row[header] : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          marginBottom: "20px",
          marginRight: "30px",
        }}
      >
        <Button
          variant='contained'
          endIcon={<ArrowForwardOutlinedIcon />}
          //   disabled={!file}
          sx={{
            backgroundColor: "#BFB5FF",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9D8DFE",
            },
          }}
          //   onClick={handleUpload}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default JsonToCsv;
