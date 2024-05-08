import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DataGrid,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem,
} from "@mui/x-data-grid";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { Close } from "@mui/icons-material";
import CustomSnackbar from "scenes/CustomSnackBar";

const FinancialReport = ({
  openExport,
  handleExport,
  handleCloseExport,
  rowsFound,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  clientName,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);
  const handleExcelExport = () => {
    try {
      if (rowsFound.length > 0) {
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = `Financial_Report_${clientName}_`;

        const ws = XLSX.utils.json_to_sheet(rowsFound); // Use invoices directly
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
        });

        const data = new Blob([excelBuffer], { type: fileType });
        const url = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName + fileExtension;
        a.click();
        console.log("Financial Report exported successfully (.xslx)");
        setAlertMessage("Financial Report exported successfully (.xslx)");
        setOpenAlert(true);
        setErrorMessage(false);
      } else {
        console.log("No data found for Excel export");
        setAlertMessage("No data found for Excel export");
        setOpenAlert(true);
        setErrorMessage(true);
        setAlertMessage("No data found for Excel export");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (rowsFound && rowsFound.length > 0 && !columns && !rows) {
    const rowsWithDash = rowsFound.map((row, index) => ({
      id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
      ...row,
    }));
    setRows(rowsWithDash);
    const tableHead = Object.keys(rowsFound[0] || {});
    const columns = tableHead.map((key) => ({
      field: key,
      headerName: key,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    }));
    setColumns(columns);
  }

  const customExportButton = () => {
    return (
      <GridToolbarExportContainer
        sx={{
          backgroundColor: "#0F9D58",
          height: "40px",
          "&:hover": {
            backgroundColor: "rgb(8,87,49)",
          },
        }}
      >
        <GridPrintExportMenuItem
          sx={{
            paddingLeft: "60px",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "rgba(15,157,88,0.3)" },
          }}
        />
        <GridCsvExportMenuItem
          label='Export as CSV'
          sx={{
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "rgba(15,157,88,0.3)" },
          }}
        />
        <Button
          onClick={handleExcelExport}
          sx={{
            "&:hover": { backgroundColor: "rgba(15,157,88,0.3)" },
            color: "#3f3f3f",
            paddingLeft: "9px",
            fontSize: "13px",
            backgroundColor: "transparent",
          }}
        >
          Download as Excel
        </Button>
      </GridToolbarExportContainer>
    );
  };

  return (
    <>
      <Modal
        open={openExport}
        onClose={handleCloseExport}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {rowsFound === null ? (
          <Box
            sx={{
              width: "30%",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: 24,
              p: 3,
            }}
          >
            <Typography
              align='center'
              variant='h5'
              color='#BFB5FF'
              fontWeight='bold'
              gutterBottom
            >
              Pick a date range for exporting your invoices:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  mt: 2,
                }}
              >
                <DatePicker
                  label='From'
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  TextFieldProps={{
                    sx: {
                      "& .MuiInputBase-input": {
                        color: "#BFB5FF",
                      },
                    },
                  }}
                  format='DD/MM/YYYY'
                  views={["year", "month", "day"]}
                  openTo='year'
                />
                <DatePicker
                  label='To'
                  value={endDate}
                  minDate={startDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  TextFieldProps={{
                    sx: {
                      "& .MuiInputBase-input": {
                        color: "#BFB5FF",
                      },
                    },
                  }}
                  format='DD/MM/YYYY'
                  views={["year", "month", "day"]}
                  openTo='year'
                />
                <Button
                  disabled={!startDate || !endDate}
                  onClick={handleExport}
                  variant='contained'
                  sx={{
                    backgroundColor: "#BFB5FF",
                    color: "white",
                    borderRadius: "5px",
                    width: "220px",
                  }}
                >
                  Generate a Financial Report
                </Button>
              </Box>
            </LocalizationProvider>
          </Box>
        ) : (
          <Box
            sx={{
              width: "1200px",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: 24,
              p: 3,
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            {" "}
            {rowsFound && rows && columns && (
              <DataGrid
                slots={{
                  toolbar: customExportButton,
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                hideFooterSelectedRowCount
                sx={{
                  width: "1150px",
                  maxHeight: "600px",
                  marginBottom: "10px",
                  borderRadius: "0 0 20px 20px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(15,157,88,0.3)",
                  },
                  "& .MuiDataGrid-toolbarContainer": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "20px",
                  },
                  "& .MuiDataGrid-cell": {
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                  },
                  "& .MuiDataGrid-row:hover": {
                    "&:hover": {
                      backgroundColor: "rgba(15,157,88,0.3)",
                    },
                  },
                }}
                rows={rows}
                columns={columns}
              />
            )}
            <Box>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#0F9D58",
                  border: "2px solid #0F9D58",
                  borderRadius: "15px",
                  alignItems: "center",
                  justifyContent: "center",

                  width: "100px",
                  marginRight: "10px",
                }}
                endIcon={<Close />}
                onClick={handleCloseExport}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: "#0F9D58",
                  borderRadius: "15px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  width: "170px",
                  "&:hover": {
                    backgroundColor: "rgb(8,87,49)",
                  },
                }}
                endIcon={<AssignmentOutlinedIcon />}
                onClick={handleExcelExport}
              >
                Export As Excel
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default FinancialReport;
