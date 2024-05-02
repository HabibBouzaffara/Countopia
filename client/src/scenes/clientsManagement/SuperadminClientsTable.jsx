import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import { CloseFullscreen, Delete } from "@mui/icons-material";
import ConfirmationDialog from "scenes/ConfirmationDialog";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InvoicesModal from "components/InvoicesModal";

const SuperadminClientsTable = ({ userData, handleChange }) => {
  const [adminNames, setAdminNames] = useState({});
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState(null);
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async (clientId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getClientJournal?clientId=${clientId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const { journal } = await response.json();
      console.log(journal);
      setInvoices(journal);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewItems = (clientId) => {
    fetchInvoices(clientId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAdminNames = async () => {
      try {
        const adminIds = userData.map((user) => user.assigned).flat();
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/adminName`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/clients?action=delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: clientId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
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
    { field: "codeFiscale", headerName: "Fiscal Code", width: 120 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "location", headerName: "Location", width: 220 },
    {
      field: "assigned",
      headerName: "Assigned To",
      width: 130,
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
        <IconButton onClick={() => handleViewItems(params.row._id)}>
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
      <Paper style={{ maxHeight: 700, mx: "auto", borderRadius: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          sx={{
            borderRadius: "20px",
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
      <InvoicesModal
        open={open}
        handleClose={handleClose}
        invoices={invoices}
      />
    </>
  );
};

export default SuperadminClientsTable;
