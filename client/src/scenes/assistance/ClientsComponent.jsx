import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import UserPicture from "components/UserPicture";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ClientsComponent = ({
  user,
  allClients,
  setSelectedClient,
  selectedClient,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allClients.length - 1 : prevIndex - 1
    );
    setSelectedClient(allClients[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allClients.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedClient(allClients[currentIndex]);
  };

  const currentClient = selectedClient;
  return (
    <Box
      sx={{
        background:
          "linear-gradient(37deg, rgba(215,228,251,1) 60%, rgba(255,255,255,0.5) 100%)",
        color: "#000000",
        borderRadius: "20px",
        height: "220px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={handlePrevious}
        sx={{
          minWidth: "12px",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          "&:hover": {
            backgroundColor:
              "linear-gradient(37deg, rgba(215,228,251,1) 10%, rgba(255,255,255,1) 40%)",
          },

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          zIndex: 2,
        }}
      >
        <ArrowBack sx={{ color: "#9D8DFE" }} />
      </Button>
      <Box
        sx={{
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "5px",
          textAlign: "center",
          flexGrow: 1,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserPicture
          name={currentClient.name}
          picturePath={currentClient.picturePath}
          sx={{ width: "70px", height: "70px", marginBottom: "10px" }}
        />
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", color: "#323DB3" }}
        >
          {currentClient.name}
        </Typography>
        <Typography sx={{ fontSize: "15px", marginTop: "8px" }}>
          <PhoneIcon
            sx={{
              fontSize: "18px",
              marginRight: "5px",
              color: "#323DB3",
            }}
          />
          {currentClient.phoneNumber}
        </Typography>
        <Typography sx={{ fontSize: "15px", marginTop: "8px" }}>
          <EmailIcon
            sx={{
              fontSize: "15px",
              marginRight: "5px",
              color: "#323DB3",
            }}
          />
          {currentClient.email}
        </Typography>
      </Box>
      <Button
        onClick={handleNext}
        sx={{
          minWidth: "12px",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          "&:hover": {
            backgroundColor:
              "linear-gradient(37deg, rgba(215,228,251,1) 10%, rgba(255,255,255,1) 40%)",
          },

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 0,
          zIndex: 2,
        }}
      >
        <ArrowForward sx={{ color: "#9D8DFE" }} />
      </Button>
    </Box>
  );
};

export default ClientsComponent;
