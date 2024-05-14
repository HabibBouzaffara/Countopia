import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { CloseFullscreen } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ProgressCircle from "scenes/ProgressCircle";
import { format } from "date-fns";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import FinancialReport from "./FinancialReport";
import CustomSnackbar from "scenes/CustomSnackBar";

const InvoicesModal = ({
  open,
  handleClose,
  invoices,
  clientName,
  loading,
}) => {
  const [rowsFound, setRowsFound] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openExport, setOpenExport] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const handleCloseExport = () => {
    setOpenExport(false);
    setEndDate(null);
    setStartDate(null);
    setRowsFound(null);
  };

  const handleExport = () => {
    try {
      if (startDate && endDate && startDate <= endDate) {
        // Filter the rows based on the date range
        const filteredRows = invoices.filter((invoice) => {
          const invoiceDate = new Date(invoice.date_facture);
          return invoiceDate >= startDate && invoiceDate <= endDate;
        });

        if (filteredRows.length === 0) {
          console.log("No data found in the selected date range");
          setAlertMessage("No data found in the selected date range");
          setErrorMessage(true);
          setOpenAlert(true);
        } else {
          // Create an array to hold all rows found
          const allRowsFound = [];
          // Iterate over invoices and add them to allRowsFound
          invoices.forEach((invoice) => {
            const invoiceDate = new Date(invoice.date_facture.split(" ")[0]);
            if (invoiceDate >= startDate && invoiceDate <= endDate) {
              allRowsFound.push(invoice);
            }
          });
          setRowsFound(allRowsFound);
        }
      } else {
        console.log("Invalid date range");
        setAlertMessage("Invalid date range");
        setErrorMessage(true);
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rowsWithDash = invoices.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    ...row,
  }));
  const tableHead = Object.keys(invoices[0] || {}).filter(
    (key) => key !== "assigned"
  );
  const columns = tableHead.map((key) => {
    let column = {
      field: key,
      headerName: key,
      flex: 1,
      align: "center",
      headerAlign: "center",
    };

    // Check if the column is named "date_facture"
    if (key === "date_facture") {
      column.type = "date";
      column.valueFormatter = (params) => {
        return format(new Date(params.value.split(" ")[0]), "MM/dd/yyyy");
      };
    }

    return column;
  });

  return (
    <>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
      <Modal
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25, 50]}
        hideFooterSelectedRowCount
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading ? (
            <ProgressCircle size='100px' />
          ) : (
            <>
              {invoices.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <Typography
                    id='modal-title'
                    variant='h6'
                    component='h2'
                    gutterBottom
                    marginLeft='10px'
                  >
                    Invoices:
                  </Typography>
                  <Button
                    variant='contained'
                    onClick={() => setOpenExport(true)}
                    style={{
                      fontWeight: "normal",
                      borderRadius: "20px 5px 5px 20px",
                      backgroundColor: "#BFB5FF",
                      width: "170px",
                      height: "40px",
                    }}
                  >
                    <AssignmentOutlinedIcon
                      style={{ marginRight: "10px", fontWeight: "normal" }}
                    />
                    Financial Report
                  </Button>
                </Box>
              )}
              {invoices.length > 0 ? (
                <div style={{ maxWidth: "lg" }}>
                  <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                      position: "fixed",
                      right: 120,
                      marginTop: "-97px",
                      color: "grey",
                      backgroundColor: "rgba(191,181,255,0.5)",
                    }}
                  >
                    <CloseFullscreen />
                  </IconButton>
                  <DataGrid
                    slots={{
                      toolbar: GridToolbar,
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    hideFooterSelectedRowCount
                    sx={{
                      width: "1200px",
                      maxHeight: "600px",
                      marginBottom: "10px",
                      borderRadius: "0 0 20px 20px",
                      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#BFB5FF",
                      },
                      "& .MuiDataGrid-toolbarContainer": {
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "20px",
                      },
                    }}
                    rows={rowsWithDash}
                    columns={columns}
                  />
                </div>
              ) : (
                <div>
                  <Typography fontSize='16px' textAlign='center'>
                    This client has no invoices yet.
                  </Typography>
                  <Box display='flex' justifyContent='center'>
                    <Button
                      onClick={handleClose}
                      variant='contained'
                      sx={{
                        backgroundColor: "#BFB5FF",
                        color: "white",
                        borderRadius: "15px",
                        width: "60px",
                        marginTop: "20px",
                      }}
                    >
                      OK
                    </Button>
                  </Box>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
      <FinancialReport
        handleExport={handleExport}
        handleCloseExport={handleCloseExport}
        openExport={openExport}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        rowsFound={rowsFound}
        clientName={clientName}
      />
    </>
  );
};

export default InvoicesModal;
