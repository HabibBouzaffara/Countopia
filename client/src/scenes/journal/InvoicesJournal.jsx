import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import ConfirmationDialog from "scenes/ConfirmationDialog";
import CustomSnackbar from "scenes/CustomSnackBar";
const InvoicesJournal = ({ user }) => {
  const [allInvoices, setAllInvoices] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleConfirmDelete = async () => {
    setOpenConfirmationDialog(false);
    setMessage("");
    const idsArray = [];
    checkedRows.forEach((row) => {
      idsArray.push(allInvoices[row - 1]._id);
    });
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/unAssignInvoices`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idsArray }),
      }
    );
    const { message } = await response.json();
    setAlertMessage(message);
    setOpenAlert(true);
    if (!response.ok) {
      throw new Error(message);
    }
    setCheckedRows([]);
  };

  const handleAssignClick = async () => {
    setMessage("Are you sure you want to unassign the selected invoices?");
    setOpenConfirmationDialog(true);
  };

  useEffect(() => {
    if (user.role !== "client") {
      const getJournal = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/getAllJournal`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { allInvoices } = await response.json();
          if (!response.ok) {
            throw new Error(allInvoices.msg);
          }
          setAllInvoices(allInvoices);
          // console.log(allInvoices[0]);
        } catch (err) {
          console.log(err);
        }
      };
      getJournal();
    } else {
      setAllInvoices(user.factures);
    }
  }, [user, openAlert]);

  const rowsWithDash = allInvoices.map((row, index) => ({
    id: index + 1, // You can adjust the logic to generate unique ids based on your requirements
    ...row,
  }));
  const tableHead = Object.keys(allInvoices[0] || {}).filter((key) =>
    user.role === "client"
      ? key !== "client_id" && key !== "assigned" && key !== "_id"
      : key !== "_id"
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant='h3'
          sx={{
            marginLeft: "20px",
            marginTop: "5px",
            marginBottom: "0px",
            color: "#263238",
            fontWeight: "bold",
            flexGrow: 1, // Make the first Typography component expand
          }}
        >
          Invoices Journal Table
        </Typography>

        {user.role === "superadmin" && (
          <Button
            disabled={checkedRows.length === 0}
            sx={{
              marginRight: "20px",
              backgroundColor:
                checkedRows.length === 0 ? "rgba(0, 0, 0, 0.07)" : "#BFB5FF",
              color: "black",
            }}
            onClick={handleAssignClick}
          >
            Unassign Invoices
          </Button>
        )}
      </Box>

      <DataGrid
        autoHeight
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        hideFooterSelectedRowCount
        {...(user.role === "superadmin" && { checkboxSelection: true })}
        onRowSelectionModelChange={(newSelection) => {
          const updatedCheckedRows = [...checkedRows];
          newSelection.forEach((selectedRowId) => {
            if (!updatedCheckedRows.includes(selectedRowId)) {
              updatedCheckedRows.push(selectedRowId);
            }
          });
          const uncheckedRows = checkedRows.filter(
            (rowId) => !newSelection.includes(rowId)
          );
          uncheckedRows.forEach((uncheckedRowId) => {
            const index = updatedCheckedRows.indexOf(uncheckedRowId);
            if (index !== -1) {
              updatedCheckedRows.splice(index, 1);
            }
          });
          setCheckedRows(updatedCheckedRows);
        }}
        sx={{
          margin: "15px 15px 15px 15px",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#BFB5FF",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "white",
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
      <ConfirmationDialog
        isOpen={openConfirmationDialog}
        data={message}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setOpenConfirmationDialog(false);
          setCheckedRows([]);
          setMessage("");
        }}
      />
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => {
          setOpenAlert(false);
        }}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default InvoicesJournal;
