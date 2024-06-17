import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, IconButton } from "@mui/material";
import CompanyHealth from "./CompanyHealth";
import ChatComponent from "./ChatComponent";
import { helix } from "ldrs";
import { Send } from "@mui/icons-material";
const Assistance = ({ user }) => {
  helix.register();
  const [allClients, setAllClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [dbMessage, setDbMessage] = useState("");

  useEffect(() => {
    if (user.role !== "client") {
      const getAllClients = async () => {
        try {
          const url = new URL(process.env.REACT_APP_BASE_URL + "/clients");
          const token = localStorage.getItem("token");
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const clientsResponse = await fetch(url, {
            method: "GET",
            headers,
          });

          const data = await clientsResponse.json();
          if (!clientsResponse.ok) {
            throw new Error(data.msg);
          }
          setSelectedClient(data[2]);
          // console.log(data[0].factures);
          setAllClients(data);
        } catch (err) {
          console.log(err);
        }
      };
      getAllClients();
    } else {
      setSelectedClient(user);
    }
  }, [user]);

  const handleDbMessageSend = () => {
    // Handle sending the message to the DB (not implemented)
    setDbMessage("");
  };

  return (
    selectedClient && (
      <>
        <CompanyHealth
          user={user}
          allClients={allClients}
          setSelectedClient={setSelectedClient}
          selectedClient={selectedClient}
        />

        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(215,228,251,1) 80%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                height: "400px",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontSize: "24px",
                  color: "#323DB3",
                  marginBottom: "10px",
                }}
              >
                Ask your db
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  overflowY: "auto",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: "30px",
                  }}
                >
                  <l-helix size='130' speed='6' color='#323DB3' />

                  <Typography
                    variant='body1'
                    sx={{
                      marginTop: "20px",
                      fontSize: "25px",
                      color: "#323DB3",
                    }}
                  >
                    This Feature is Coming Soon ...
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                <TextField
                  value={dbMessage}
                  onChange={(e) => setDbMessage(e.target.value)}
                  variant='outlined'
                  fullWidth
                  placeholder='Type your message...'
                  InputProps={{
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                />

                <IconButton
                  onClick={handleDbMessageSend}
                  variant='contained'
                  sx={{
                    marginLeft: "10px",
                    borderRadius: "20px",
                    width: "50px",
                    backgroundColor: "#BFB5FF",
                    color: "white",
                    fontSize: "15px",
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChatComponent user={user} selectedClient={selectedClient} />
          </Grid>
        </Grid>
      </>
    )
  );
};

export default Assistance;
