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
} from "@mui/material";

const AssignInvoices = ({
  admin,
  isOpen,
  invoices,
  invoiceId,
  onClose,
  onCancel,
}) => {
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (isOpen) {
          const url = new URL(
            process.env.REACT_APP_BASE_URL + "/clientsToAssign"
          );
          // Add user._id and user.role as query parameters
          url.searchParams.append("userId", admin?._id);
          url.searchParams.append("role", admin?.role);

          const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch clients");
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

  const handleCheckboxChange = (clientId) => {
    setSelectedUser(clientId);
  };

  const handleAssignClients = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/clients-assign-invoices",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoices: invoices,
          clientId: selectedUser,
          invoiceId: invoiceId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to assign clients");
    }
    onClose();
  };

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
                        checked={selectedUser === client._id}
                        onChange={() => handleCheckboxChange(client._id)}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              )
          )}
        </FormGroup>
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
          onClick={handleAssignClients}
          variant='contained'
          style={{
            color: "#FFFFFF",
            backgroundColor: "#BFB5FF",
            borderRadius: "40px",
          }}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignInvoices;
