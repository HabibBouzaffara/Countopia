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
          body: JSON.stringify({ journal: cleanedVersion }), // Pass journal data in the body
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

  console.log(cleanedVersion);
  // Ensure cleanedVersion exists and is not empty

  // Define columns manually
  const columns = [
    {
      field: "client_id",
      headerName: "client_id",
      flex: 1,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date_facture",
      headerName: "date_facture",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
      type: "date",
      valueFormatter: (params) => {
        return format(new Date(params.value), "dd/MM/yyyy");
      },
    },
    {
      field: "description",
      headerName: "description",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nom_unite",
      headerName: "nom_unite",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nombre_unit",
      headerName: "nombre_unit",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prix_unite",
      headerName: "prix_unite",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total_unit",
      headerName: "total_unit",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total_net",
      headerName: "total_net",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "taxe",
      headerName: "taxe",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "total",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "num_facture",
      headerName: "num_facture",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Categorie",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["V", "A"],
      align: "center",
      headerAlign: "center",
    },
    {
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
    },
  ];
  if (!cleanedVersion || cleanedVersion.length === 0) return null;
  // Replace empty values with dash (-) in rows
  const rowsWithDash = cleanedVersion.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    client_id: row.client_id || "-",
    date_facture: row.date_facture || "-",
    description: row.description || "-",
    nom_unite: row.nom_unite || "-",
    nombre_unit: row.nombre_unit || "-",
    prix_unit: row.prix_unit || "-",
    total_unit: row.total_unit || "-",
    total_net: row.total_net || "-",
    taxe: row.taxe || "-",
    total: row.total || "-",
    num_facture: row.num_facture || "-",
    category: row.category || "-",
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

      <Box mt='10px' marginBottom='20px' width='98%' mx='auto'>
        <div style={{ width: "100%" }}>
          <DataGrid
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
