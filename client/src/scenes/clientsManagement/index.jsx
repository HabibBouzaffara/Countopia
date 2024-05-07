import React, { useEffect, useState } from "react";
import { Button, Typography, Divider, Box } from "@mui/material";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import WaitingClients from "./WaitingClientsDialog";
import SuperadminClientsTable from "./SuperadminClientsTable";
import AdminClientsTable from "./AdminClientsTable";
import ProgressCircle from "scenes/ProgressCircle";
import CustomSnackbar from "scenes/CustomSnackBar";

const Clients = ({ user }) => {
  const [clients, setClients] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbar = () => {
    setErrorMessage(false);
    setOpenAlert(true);
    setAlertMessage("Service updated successfully");
  };
  const getAllClients = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      setClients(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllClients();
  }, [user]);

  return (
    <>
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
      >
        <Typography
          variant='h2'
          sx={{
            color: "#263238",
            fontWeight: "bold",
            flexGrow: 1, // Make the first Typography component expand
          }}
        >
          Clients
        </Typography>
        {user.role === "superadmin" && (
          <Button
            variant='contained'
            onClick={handleOpen}
            style={{
              fontWeight: "normal",
              borderRadius: "20px",
              backgroundColor: "#BFB5FF",
              width: "150px",
              height: "40px",
              marginRight: "60px",
            }}
          >
            <HourglassTopOutlinedIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            Waiting List
          </Button>
        )}
      </div>
      <Typography
        variant='body1'
        sx={{ marginLeft: "50px", marginTop: "10px", color: "#A6A6A6" }}
      >
        View All Your Clients Informations.
      </Typography>
      <Divider
        sx={{
          marginLeft: "50px",
          marginTop: "10px",
          marginBottom: "10px",
          borderBottomWidth: "2px",
          borderColor: "#A6A6A6",
          width: "90%",
        }}
      />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <ProgressCircle size={90} />
        </Box>
      )}

      <div
        style={{
          height: "500px",
          overflow: "auto",
          width: "98%",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "20px",
        }}
      >
        {clients && user.role === "superadmin" && !loading && (
          <SuperadminClientsTable
            userData={clients.filter((clients) => clients.approved)}
            handleChange={getAllClients}
          />
        )}

        {clients && user.role === "admin" && !loading && (
          <AdminClientsTable
            clientsData={clients}
            handleChange={getAllClients && handleSnackbar}
          />
        )}
      </div>
      {clients && user.role === "superadmin" && (
        <WaitingClients
          userData={clients.filter((clients) => clients.approved === false)}
          open={open}
          handleClose={handleClose}
          handleChange={getAllClients}
        />
      )}
    </>
  );
};

export default Clients;
