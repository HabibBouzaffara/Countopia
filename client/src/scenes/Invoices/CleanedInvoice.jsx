import React from "react";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const CleanedInvoice = ({
  adminId,
  adminName,
  cleanedVersion,
  setCleanedVersion,
  setFileData,
}) => {
  const uploadJournal = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/uploadJournal?adminId=${adminId}&adminName=${adminName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ journal: cleanedVersion }), // Pass journal data in the body
        }
      );
      const data = await response.json();
      console.log(data);
      setCleanedVersion(null);
      setFileData(null);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cleanedVersion);
  // Ensure cleanedVersion exists and is not empty
  if (!cleanedVersion || cleanedVersion.length === 0) return null;

  // Add unique id property to each row
  const rowsWithIds = cleanedVersion.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    ...row,
  }));

  // Define columns based on the keys of the first row
  const columns = Object.keys(cleanedVersion[0]).map((header) => ({
    field: header,
    headerName: header,
    flex: 1,
    editable: header !== "client_id",
    align: "center",
    headerAlign: "center",
  }));

  // Add action column
  columns.push({
    field: "actions",
    headerName: "Actions",
    align: "center",
    headerAlign: "center",
    width: 150,
    renderCell: (params) => (
      <>
        <Button
          variant='outlined'
          size='small'
          sx={{
            backgroundColor: "#BFB5FF",
            color: "black",
            marginRight: "10px",
          }}
          startIcon={<ModeEditOutlineOutlinedIcon />}
          onClick={() => handleEditClick(params.row.id, params.row)}
        >
          Edit
        </Button>
        <Button
          sx={{
            color: "#C95F50",
            borderColor: "#C95F50",
          }}
          variant='outlined'
          size='small'
          startIcon={<DeleteIcon sx={{ color: "#C95F50" }} />}
          onClick={() => handleDeleteClick(params.row.id, params.row)}
        >
          Delete
        </Button>
      </>
    ),
  });

  // Replace empty values with dash (-) in rows
  const rowsWithDash = rowsWithIds.map((row) =>
    Object.entries(row).reduce((acc, [key, value]) => {
      acc[key] = value || "-";
      return acc;
    }, {})
  );

  const handleDeleteClick = (id) => {
    // Handle delete action here
    const updatedData = rowsWithIds.filter((row) => row.id !== id);
    setCleanedVersion(updatedData);
  };
  const handleEditClick = (id, editedRow) => {
    // Find the index of the row with the provided id
    const oldRowIndex = rowsWithIds.findIndex((row) => row.id === id);
    const updateRow = rowsWithIds[oldRowIndex];

    // Update the row with the new values

    Object.entries(editedRow).forEach(([key, value]) => {
      updateRow[key] = value;
    });

    // Replace the old row with the updated row

    const updatedData = [...rowsWithIds];
    updatedData[oldRowIndex] = updateRow;

    setCleanedVersion(updatedData);
  };

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

      <Box mt='20px' marginBottom='20px' width='98%' mx='auto'>
        <div style={{ maxHeight: 600, width: "100%" }}>
          <DataGrid
            rows={rowsWithDash}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            editMode='row'
            sx={{
              maxHeight: 600,
              "& .MuiDataGrid-cell": {
                cursor: "pointer",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "#BFB5FF",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#BFB5FF",
              },
            }}
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
