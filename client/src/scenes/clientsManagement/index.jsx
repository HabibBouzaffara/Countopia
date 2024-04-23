import React, { useEffect, useState } from "react";
import { Button, Typography, Divider, InputBase, IconButton } from "@mui/material";
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import FlexBetween from "components/FlexBetween";
import WaitingClients from "./WaitingClientsDialog";
import SuperadminClientsTable from "./SuperadminClientsTable";
import AdminClientsTable from "./AdminClientsTable";

const Search = styled('div')({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  marginLeft: '50px',
  width: '300px', // Adjust width as needed
});

const Clients = ({user}) => {
  const [clients, setClients] = useState(null);
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllClients = async () => {
    try {
      const url = new URL(process.env.REACT_APP_BASE_URL + "/clients");
      // Add user._id and user.role as query parameters
      url.searchParams.append("userId", user?._id);
      url.searchParams.append("role", user?.role);

      const clientsResponse = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await clientsResponse.json();
      if (!clientsResponse.ok) {
        throw new Error(data.msg);
      }
      setClients(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: "50px" }}>
        <Typography
          variant="h2"
          sx={{
            color: "#263238",
            fontWeight: "bold",
            flexGrow: 1, // Make the first Typography component expand
          }}
        >
          Clients 
        </Typography>
        {user.role === "superadmin" &&<Button
          variant="contained"
          onClick={handleOpen}
          style={{
            fontWeight: "normal",
            borderRadius: "20px",
            backgroundColor: "#BFB5FF",
            width: "150px",
            height: "40px",
            marginRight: "60px"
          }}
        >
          <HourglassTopOutlinedIcon
            style={{ marginRight: "10px", fontWeight: "normal" }}
          />
          Waiting List
        </Button>}
      </div>
      <Typography variant="body1" sx={{ marginLeft: "50px",marginTop: "10px",color: "#A6A6A6" }}>
      View All Your Clients Informations.
        </Typography>
      <Divider sx={{ marginLeft: "50px", marginTop: "10px", marginBottom: "10px", borderBottomWidth: "2px", borderColor: "#A6A6A6",width: "90%" }} />
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: "10px" }}>
        <Search >
        <FlexBetween
          backgroundColor="#fcfcfc"
          borderRadius="9px"
          gap="1rem" // Adjust the gap as needed
          p="0.1rem 1rem"
        >
          <InputBase
            placeholder="Search..."
            sx={{ width: '150px'}} // Adjust the width as needed
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton size="small"> {/* Adjust the size as needed */}
            <SearchIcon />
          </IconButton>
        </FlexBetween>
      </Search>
      </div>
      
      <div style={{ height: "500px", overflow: "auto",marginTop: "10px"}}>
        {clients && user.role === "superadmin" && <SuperadminClientsTable userData={clients.filter(clients => clients.approved)} handleChange={getAllClients} />}
        {clients && user.role === "admin" && <AdminClientsTable clientsData={clients} handleChange={getAllClients} />}
      </div>
      {clients && user.role === "superadmin" && <WaitingClients userData={clients.filter(clients => clients.approved === false)} open={open} handleClose={handleClose} handleChange={getAllClients} />}
    </>
  );
};

export default Clients;
