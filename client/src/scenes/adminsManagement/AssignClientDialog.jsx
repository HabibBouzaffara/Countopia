import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Box } from "@mui/material";

const AssignClientDialog = ({ admin, isOpen, onClose }) => {
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (isOpen) {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/clients?adminId=${admin._id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          if (!response.ok) {
            throw new Error("Failed to fetch clients");
          }
          const { admin: fetchedAdmin, client: fetchedClients } = await response.json();
          fetchedAdmin.clients.map(clientObj => clientObj["$each"]).forEach(clientIds => 
            clientIds.forEach(clientId => {
              if (!selectedUser.includes(clientId)) {
                setSelectedUser(prevSelectedUsers => [...prevSelectedUsers, clientId]);
              }
            })
          );
          
          setClients(fetchedClients);
          console.log(fetchedAdmin.clients.map(clientObj => clientObj["$each"]));

        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchClients();
  }, [isOpen, admin._id,selectedUser]);

 

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
    const response = await fetch(process.env.REACT_APP_BASE_URL + "/clients-assign", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId: admin._id ,clientsId: selectedUser}),
    })

    if (!response.ok) {
      throw new Error("Failed to assign clients");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth fullHeight sx={{ overflow: "hidden", height: "600px", width: "500px",marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}} PaperProps={{
      style: {
        borderRadius: "20px", // Add border radius here
      },
    }}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold",color: "#BFB5FF", fontSize: "20px" }}>Assign Clients</DialogTitle>
      <DialogContent>
        <FormGroup>
          {clients.map((client) => (
            <ListItem key={client._id} disablePadding>
              <ListItemButton >
                <ListItemAvatar >
                   <Avatar alt={client.name} src={process.env.REACT_APP_BASE_URL + "/assets/" + client.picturePath} /> 
                </ListItemAvatar>
                <ListItemText primary={client.name}  />
                <Box display="flex" alignItems="center">
                   {/* <ListItemText secondary={selectedUser.includes(client._id) ? "Assigned" : "Unassigned"}  />  */}
                <Checkbox
                style={{ color: "#BFB5FF",marginLeft: "20px" }}
                  checked={selectedUser.includes(client._id)}
                  onChange={() => handleCheckboxChange(client._id)}
                />
                </Box>
                
              </ListItemButton>
            </ListItem>
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} variant="outlined" style={{ color: "#BFB5FF",border:"1px solid #BFB5FF" ,borderRadius:"40px"}}>
        Cancel
      </Button>
      <Button onClick={handleAssignClients} variant="contained"  style={{ color: "#FFFFFF",backgroundColor: "#BFB5FF", borderRadius:"40px"}}>
          Assign
      </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignClientDialog;