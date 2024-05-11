import { Box, Typography } from "@mui/material";
import UserPicture from "components/UserPicture";
import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ClientCard = ({ selectedClient }) => {
  console.log(selectedClient.name);
  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <UserPicture
        name={selectedClient.name}
        picturePath={selectedClient.picturePath}
        sx={{ width: "100px", height: "100px", marginBottom: "10px" }}
      />
      <Typography sx={{ fontWeight: "medium", fontSize: "24px", color: "#323DB3" }}>{selectedClient.companyName}</Typography>
      
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px" }}>
        <PhoneIcon sx={{ marginRight: "5px" ,color: "#323DB3"}} />
        <Typography variant="body1"> {selectedClient.phoneNumber}</Typography>
      
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <EmailIcon sx={{ marginRight: "5px" ,color: "#323DB3"}} />
        <Typography variant="body1"> {selectedClient.email}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <LocationOnIcon sx={{ marginRight: "5px" ,color: "#323DB3"}} />
        <Typography variant="body1"> {selectedClient.location}</Typography>
      </Box>
    </Box>
  );
};

export default ClientCard;
