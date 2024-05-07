import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, MenuItem, Select } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import InvoicesModal from "components/InvoicesModal";
import CustomSnackbar from "scenes/CustomSnackBar";

const AdminClientsTable = ({ clientsData, handleChange }) => {
  const [selectedService, setSelectedService] = useState({});
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
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
    setOpen(true);
    setClientName(companyName);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const initialSelectedService = {};
    clientsData.forEach((user) => {
      initialSelectedService[user._id] = user.service;
    });
    setSelectedService(initialSelectedService);
  }, [clientsData]);

  const handleServiceChange = (userService, userId, service) => {
    setSelectedService((prevState) => ({
      ...prevState,
      [userId]: service,
    }));
    if (userService !== service) {
      updateService(userId, service);
    }
  };

  const updateService = async (_id, service) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/service`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, service }),
        }
      );
      if (!response.ok) {
        setErrorMessage(true);
        setOpenAlert(true);
        setAlertMessage("Failed to update service" + response.statusText);
      }
      console.log("Service updated successfully");
      handleChange();
    } catch (error) {
      console.error("Error updating service:", error);
      setErrorMessage(true);
      setOpenAlert(true);
      setAlertMessage("Failed to update service");
    }
  };

  const columns = [
    { field: "id", hide: true },
    {
      field: "client",
      headerName: "Client",
      width: 200,
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
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "service",
      headerName: "Service",
      width: 150,
      renderCell: (params) => (
        <Select
          sx={{ width: 120 }}
          value={selectedService[params.row._id] || ""}
          onChange={(e) =>
            handleServiceChange(
              params.row.service,
              params.row._id,
              e.target.value
            )
          }
        >
          <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='ongoing'>Ongoing</MenuItem>
          <MenuItem value='done'>Done</MenuItem>
        </Select>
      ),
    },
    {
      field: "invoice",
      headerName: "Invoices",
      width: 100,
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
  ];

  const rows = clientsData.map((user, index) => ({ ...user, id: index + 1 }));

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
          maxHeight: "500px",
          width: "90%",
          overflow: "auto",
          margin: "auto",
          borderRadius: "20px",
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
            borderRadius: "20px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#BFB5FF",
            },
          }}
        />
      </Paper>
      <InvoicesModal
        open={open}
        handleClose={handleClose}
        invoices={invoices}
        clientName={clientName}
        loading={loading}
      />
    </>
  );
};

export default AdminClientsTable;
