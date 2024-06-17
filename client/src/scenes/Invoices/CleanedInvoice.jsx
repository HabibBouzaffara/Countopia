import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { format } from "date-fns";

import { DeleteForever, Save } from "@mui/icons-material";
import CustomSnackbar from "scenes/CustomSnackBar";

const CleanedInvoice = ({
  adminId,
  adminName,
  cleanedVersion,
  setCleanedVersion,
  setFileData,
  setSuccessMessage,
  fileName,
}) => {
  const [rowId, setRowId] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const uploadJournal = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/uploadJournal?adminId=${adminId}&adminName=${adminName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ journal: cleanedVersion, fileName: fileName }), // Pass journal data in the body
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(true);
        setOpenAlert(true);
        setAlertMessage(data.msg || "Failed to upload journal");
      }
      console.log(data);
      setSuccessMessage("Journal uploaded successfully");
      setCleanedVersion(null);
      setFileData(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Ensure cleanedVersion exists and is not empty
  if (!cleanedVersion || cleanedVersion.length === 0) return null;

  // Generate table headers based on keys of the first object in cleanedVersion
  const tableHead = Object.keys(cleanedVersion[0]);

  // Define columns excluding the action column
  const columns = tableHead.map((key) => ({
    field: key,
    headerName: key,
    flex: 1,
    editable: true,
    align: "center",
    headerAlign: "center",
    valueOptions: key === "category" ? ["V", "A"] : null,
    type:
      key === "category"
        ? "singleSelect"
        : key === "date_facture"
        ? "date"
        : "string",
    valueFormatter: (params) => {
      key === "date_facture" && format(new Date(params.value), "MM/dd/yyyy");
    },
  }));

  // Add the action column
  columns.push({
    field: "actions",
    cellClassName: "actions",
    headerName: "Actions",
    type: "actions",
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <>
        <div style={{ textAlign: "center" }}>
          <IconButton
            sx={{
              color: "#9D8DFE",
            }}
            disabled={params.row.id !== rowId}
            onClick={() => handleEditClick(params.row.id, params.row)}
          >
            <Save />
          </IconButton>
          <div style={{ fontSize: "10px" }}>Save</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <IconButton
            sx={{
              color: "#C95F50",
            }}
            onClick={() => handleDeleteClick(params.row.id, params.row)}
          >
            <DeleteForever />
          </IconButton>
          <div style={{ fontSize: "10px" }}>Delete</div>
        </div>
      </>
    ),
  });

  // Replace empty values with dash (-) in rows
  const rowsWithDash = cleanedVersion.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    ...row,
  }));

  const handleDeleteClick = (id) => {
    // Handle delete action here
    const updatedData = rowsWithDash.filter((row) => row.id !== id);
    setCleanedVersion(updatedData);
  };
  const handleEditClick = (id, editedRow) => {
    // Find the index of the row with the provided id
    const oldRowIndex = rowsWithDash.findIndex((row) => row.id === id);
    const updateRow = rowsWithDash[oldRowIndex];

    // Update the row with the new values
    Object.entries(editedRow).forEach(([key, value]) => {
      updateRow[key] = value;
    });

    // Replace the old row with the updated row
    const updatedData = [...rowsWithDash];
    updatedData[oldRowIndex] = updateRow;

    setCleanedVersion(updatedData);
    setRowId(null);
  };

  return (
    <>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
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
          Cleaned version of {cleanedVersion.length} invoices:
        </Typography>
        <Box
          sx={{
            alignSelf: "center",
            alignItems: "start",
            marginLeft: "auto",
            marginRight: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#BFB5FF",
              fontSize: "15px",
              marginTop: "20px",
            }}
          >
            Update / Transform your CSV file
          </Typography>
          <Typography
            sx={{
              color: "#A6A6A6",
              fontSize: "13px",
            }}
          >
            Close the SideBar for better experience
          </Typography>
        </Box>
      </Box>

      <Box mt='5px' marginBottom='10px' width='98%' mx='auto'>
        <div style={{ width: "100%" }}>
          <DataGrid
            rowHeight={50}
            rows={rowsWithDash}
            columns={columns}
            editMode='row'
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25, 50]}
            hideFooterSelectedRowCount
            sx={{
              "& .MuiDataGrid-cell": {
                cursor: "auto",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "#BFB5FF",
              },
              "& .actions:hover": {
                color: "black",
                cursor: "default",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#BFB5FF",
              },
            }}
            onRowEditStart={(params) => setRowId(params.id)}
          />
        </div>
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
          endIcon={<CloseOutlinedIcon />}
          sx={{
            backgroundColor: "#BFB5FF",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9D8DFE",
            },
          }}
          onClick={() => setCleanedVersion(null)}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          endIcon={<ArrowForwardOutlinedIcon />}
          sx={{
            marginLeft: "15px",
            backgroundColor: "#BFB5FF",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9D8DFE",
            },
          }}
          onClick={uploadJournal}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default CleanedInvoice;
