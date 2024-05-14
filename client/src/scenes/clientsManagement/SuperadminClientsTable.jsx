import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ConfirmationDialog from "scenes/ConfirmationDialog";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InvoicesModal from "components/InvoicesModal";
import CustomSnackbar from "scenes/CustomSnackBar";

const SuperadminClientsTable = ({ userData, handleChange }) => {
  const [adminNames, setAdminNames] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState(null);
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchInvoices = async (clientId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getClientJournal?clientId=${clientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const { journal } = await response.json();
      console.log(journal);
      setInvoices(journal);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleViewItems = (clientId, companyName) => {
    fetchInvoices(clientId);
    setClientName(companyName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAdminNames = async () => {
      try {
        const adminIds = userData.map((user) => user.assigned).flat();
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/clients/adminName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ adminIds }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin names");
        }

        const data = await response.json();
        setAdminNames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdminNames();
  }, [userData]);

  const handleConfirmDelete = async () => {
    try {
      await deleteClient();
      setOpenConfirmationDialog(false);
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveClick = async (_id) => {
    setClientId(_id);
    setMessage("deleteClient");
    setOpenConfirmationDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationDialog(false);
  };

  const deleteClient = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/client-delete?action=delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ _id: clientId }),
        }
      );

      if (!response.ok) {
        setErrorMessage(true);
        setOpenAlert(true);
        setAlertMessage("Failed to delete client");
      }
      const data = await response.json();
      setErrorMessage(false);
      setOpenAlert(true);
      setAlertMessage("Client deleted successfully");
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "companyName",
      headerName: "Client",
      width: 180,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={params.row.name}
            style={{ marginRight: "10px" }}
            src={
              process.env.REACT_APP_BASE_URL +
              "/assets/" +
              params.row.picturePath
            }
          />
          <div>
            <span style={{ fontWeight: "bold", color: "#A6A6A6" }}>
              {params.row.companyName}
            </span>
            <br />
            {params.row.name}
          </div>
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "codeFiscale", headerName: "Fiscal Code", width: 110 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "location", headerName: "Location", width: 220 },
    {
      field: "assigned",
      headerName: "Assigned To",
      width: 120,
      renderCell: (params) =>
        params.row.assigned.length === 0
          ? "Unassigned"
          : adminNames[params.row.assigned],
    },
    {
      field: "invoice",
      headerName: "Invoice",
      width: 70,
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            handleViewItems(params.row._id, params.row.companyName)
          }
        >
          <DescriptionOutlinedIcon />
        </IconButton>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => (
        <IconButton
          aria-label='delete'
          onClick={() => handleRemoveClick(params.row._id)}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  // Map userData to DataGrid rows and add unique id
  const rows = userData.map((user, index) => ({ ...user, id: index + 1 }));

  return (
    <>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
      <Paper
        style={{
          maxHeight: 700,

          mx: "auto",
          marginLeft: "25px",
          marginRight: "20px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25, 50]}
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
          sx={{
            display: "flex",

            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#BFB5FF",
            },
          }}
        />
        <ConfirmationDialog
          isOpen={openConfirmationDialog}
          data={message}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Paper>
      {invoices && (
        <InvoicesModal
          open={open}
          handleClose={handleClose}
          invoices={invoices}
          loading={loading}
          clientName={clientName}
        />
      )}
    </>
  );
};

export default SuperadminClientsTable;
