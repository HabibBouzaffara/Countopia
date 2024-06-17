import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CompositionExample from "scenes/assistance/GaugePointer";

import ClientsComponent from "./ClientsComponent";

const CompanyHealth = ({
  user,
  allClients,
  setSelectedClient,
  selectedClient,
}) => {
  const sizeWidgets = user.role === "admin" ? 2.0 : 2.5;
  const revenueTotal = selectedClient.factures.reduce((total, invoice) => {
    if (parseFloat(invoice.total) > 0) {
      return total + parseFloat(invoice.total);
    }
    return total;
  }, 0);
  const profit = selectedClient.factures.reduce(
    (total_net, invoice) => {
      return Math.round(total_net + parseFloat(invoice.total_net));
    },
    0 // Initial total value
  );
  const expenses = selectedClient.factures.reduce(
    (total, invoice) => {
      const taxeAmount =
        parseFloat(invoice.taxe) * parseFloat(invoice.nombre_unit);
      if (parseFloat(invoice.total) >= 0) {
        return total + taxeAmount;
      } else {
        return Math.round(total + Math.abs(parseFloat(invoice.total)));
      }
    },
    0 // Initial total value
  );
  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingLeft: user.role === "client" ? "9%" : "2%",
        paddingRight: user.role === "client" ? "9%" : "2%",
      }}
    >
      {user.role === "admin" && (
        <Grid item xs={12} md={3}>
          <ClientsComponent
            user={user}
            allClients={allClients}
            setSelectedClient={setSelectedClient}
            selectedClient={selectedClient}
          />
        </Grid>
      )}
      <Grid item xs={12} md={sizeWidgets}>
        <Box
          sx={{
            background:
              "linear-gradient(37deg, rgba(215,228,251,1) 15%, rgba(255,255,255,1) 60%)",
            color: "#000000",
            borderRadius: "20px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: "#A6A6A6",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Financial Success Rate
            </Typography>
            <Typography
              variant='h1'
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {((profit / revenueTotal) * 100).toFixed(2)}%
            </Typography>
          </Box>

          <CompositionExample
            value={(profit / revenueTotal) * 100}
            color={"#62D9C5"}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={sizeWidgets}>
        <Box
          sx={{
            background:
              "linear-gradient(37deg, rgba(215,228,251,1) 15%, rgba(255,255,255,1) 60%)",
            color: "#000000",
            borderRadius: "20px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: "#A6A6A6",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Operational Success Rate
            </Typography>
            <Typography
              variant='h1'
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {((expenses / revenueTotal) * 100).toFixed(2)}%
            </Typography>
          </Box>

          <CompositionExample
            value={(expenses / revenueTotal) * 100}
            color={"#82C6F8"}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={sizeWidgets}>
        <Box
          sx={{
            background:
              "linear-gradient(37deg, rgba(215,228,251,1) 15%, rgba(255,255,255,1) 60%)",
            color: "#000000",
            borderRadius: "20px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: "#A6A6A6",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Growth Success Rate
            </Typography>
            <Typography
              variant='h1'
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {selectedClient.name === "Rania" ? "10%" : "0%"}
            </Typography>
          </Box>

          <CompositionExample
            value={selectedClient.name === "Rania" ? 10 : 0}
            color={"#3F4BC9"}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            position: "relative",
            color: "#000000",
            borderRadius: "20px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(37deg, rgba(215,228,251,1) 60%, rgba(255,255,255,0.5) 100%)",
              zIndex: 1,
            }}
          />
          {selectedClient.name === "Rania" && (
            <Box
              sx={{
                position: "absolute",
                top: "25%", // Adjust this value to move the image down
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(https://cdn.builder.io/api/v1/image/assets/TEMP/965b9334205c3af1dfe9cc452cd976950ee573c1126d22d0a46b31c4646c7657?)`,
                backgroundRepeat: "no-repeat",
                backgroundsizeWidgets: "cover",
                backgroundPosition: "center",
                zIndex: 2,
                opacity: 0.5, // Adjust this value to control the transparency of the image
              }}
            />
          )}
          <Box
            sx={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",

              marginTop: "-90px",
            }}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontsizeWidgets: "25px",
              }}
            >
              {selectedClient.name === "Rania"
                ? "Your company health is vibrant and robust!"
                : "No invoices yet for this client"}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyHealth;
