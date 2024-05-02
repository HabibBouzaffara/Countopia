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

const AssignClientDialog = ({ admin, isOpen, onClose, onCancel }) => {
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (isOpen) {
          // console.log(admin._id);
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/clients-assign?adminId=${admin._id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch clients");
          }
          const { admin: fetchedAdmin, client: fetchedClients } =
            await response.json();

          // console.log("Fetched admin:", fetchedAdmin);
          // console.log("Fetched clients:", fetchedClients);

          // Check if fetchedAdmin has clients before iterating over them
          if (fetchedAdmin.clients && fetchedAdmin.clients.length > 0) {
            fetchedAdmin.clients.forEach((clientId) => {
              if (!selectedUser.includes(clientId)) {
                setSelectedUser((prevSelectedUsers) => [
                  ...prevSelectedUsers,
                  clientId,
                ]);
              }
            });
          }

          setClients(fetchedClients);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, [isOpen, admin._id]);

  const handleCheckboxChange = (clientId) => {
    setSelectedUser((prevSelectedClients) => {
      // If the clicked clientId is already in selectedUser, remove it
      if (prevSelectedClients.includes(clientId)) {
        return prevSelectedClients.filter((id) => id !== clientId);
      } else {
        // If the clicked clientId is not in selectedUser, add it
        return [...prevSelectedClients, clientId];
      }
    });
  };

  const handleAssignClients = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/clients-assign",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: admin._id, clientsId: selectedUser }),
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
          borderRadius: "20px", // Add border radius here
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
              (client.assigned.length === 0 ||
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
                      <ListItemText
                        secondary={
                          client.assigned.length === 0
                            ? "Unassigned"
                            : "Assigned"
                        }
                      />
                      <Checkbox
                        style={{ color: "#BFB5FF", marginLeft: "20px" }}
                        checked={selectedUser.includes(client._id)}
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

export default AssignClientDialog;
