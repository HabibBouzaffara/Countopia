import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormGroup,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import ProgressCircle from "scenes/ProgressCircle";

const AssignInvoices = ({
  admin,
  isOpen,
  invoices,
  invoiceId,
  onClose,
  onCancel,
  setConfirmAssignMessage,
}) => {
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (isOpen) {
          const url = new URL(
            process.env.REACT_APP_BASE_URL + "/clientsToAssign"
          );
          // Add user._id and user.role as query parameters
          url.searchParams.append("userId", admin?._id);
          url.searchParams.append("role", admin?.role);

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            setConfirmAssignMessage(
              response.statusText || "Failed to fetch clients"
            );
          }
          const clients = await response.json();
          setClients(clients);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchClients();
  }, [isOpen, admin]);

  const handleCheckboxChange = (client) => {
    setSelectedUser(client);
  };

  const handleAssignClients = async () => {
    setLoading(true);

    const response = await fetch(
      // console.log("sikou:" + JSON.stringify(invoices)),
      process.env.REACT_APP_BASE_URL + "/clients-assign-invoices",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoices: invoices,
          clientId: selectedUser._id,
          invoiceId: invoiceId,
        }),
      }
    );

    if (!response.ok) {
      setConfirmAssignMessage(
        response.statusText || "Failed to assign invoices to client"
      );
    }
    setLoading(false);

    setConfirmAssignMessage("Invoices assigned successfully to client");
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      setSelectedUser(null);
    }
  }, [isOpen]);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      sx={{
        overflow: "hidden",
        height: "500px",
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
      }}
      PaperProps={{
        style: {
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#BFB5FF",
          fontSize: "20px",
        }}
      >
        Assign Clients
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ProgressCircle size={90} />
            <Typography variant='body1' sx={{ marginTop: "10px" }}>
              Please Wait ...
            </Typography>
            <Typography
              variant='body1'
              sx={{ marginTop: "10px", color: "#BFB5FF", fontWeight: "bold" }}
            >
              Assigning Invoices to {selectedUser?.companyName} ...
            </Typography>
          </Box>
        ) : (
          <FormGroup>
            {clients.map(
              (client) =>
                ((admin.role === "superadmin" && client.approved) ||
                  admin.clients.includes(client._id)) && (
                  <ListItem key={client._id} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={client.name}
                          src={
                            process.env.REACT_APP_BASE_URL +
                            "/assets/" +
                            client.picturePath
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText primary={client.name} />
                      <Box display='flex' alignItems='center'>
                        <Checkbox
                          style={{ color: "#BFB5FF", marginLeft: "20px" }}
                          checked={selectedUser === client}
                          onChange={() => handleCheckboxChange(client)}
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant='outlined'
          style={{
            color: "#BFB5FF",
            border: "1px solid #BFB5FF",
            borderRadius: "40px",
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!selectedUser || loading}
          onClick={handleAssignClients}
          variant='contained'
          style={{
            borderRadius: "40px",
            ...(selectedUser && {
              backgroundColor: "#BFB5FF",
              color: "white",
            }),
          }}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignInvoices;
