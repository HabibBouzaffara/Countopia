import React, { useEffect, useState } from "react";
import { Button, Typography, Divider, Box } from "@mui/material";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import WaitingClients from "./WaitingClientsDialog";
import SuperadminClientsTable from "./SuperadminClientsTable";
import AdminClientsTable from "./AdminClientsTable";
import ProgressCircle from "scenes/ProgressCircle";
import CustomSnackbar from "scenes/CustomSnackBar";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ClientForm from "./ClientForm";

const Clients = ({ user }) => {
  const [clients, setClients] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [openCreateClient, setOpenCreateClient] = useState(false);

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

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const clientsResponse = await fetch(url, {
        method: "GET",
        headers: headers, // Pass headers object
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

  const register = async (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    try {
      formData.append("picturePath", values.picture.name);
    } catch (error) {
      console.log(error);
    }

    try {
      const savedUserResponse = await fetch(
        process.env.REACT_APP_BASE_URL + "/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await savedUserResponse.json();
      if (!savedUserResponse.ok) {
        setAlertMessage(data.msg);
        setErrorMessage(true);
        setOpenAlert(true);
      } else {
        setAlertMessage(data.msg || " Client Created successfully");
        setErrorMessage(false);
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (newClient) => {
    await register(newClient);
    console.log("Submitting form:", newClient);
    setOpenCreateClient(false);
    getAllClients();
  };

  useEffect(() => {
    getAllClients();
  }, [user]);

  return (
    <>
      <ClientForm
        open={openCreateClient}
        handleClose={() => setOpenCreateClient(false)}
        handleSubmit={handleSubmit}
      />
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          marginLeft: "50px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          <Typography
            variant='body1'
            sx={{ marginTop: "10px", color: "#A6A6A6" }}
          >
            View All Your Clients Informations.
          </Typography>
        </Box>

        {user.role === "superadmin" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              marginLeft: "auto",
              flexDirection: "column",
            }}
          >
            <Button
              variant='contained'
              onClick={() => setOpenCreateClient(true)}
              style={{
                fontWeight: "normal",
                borderRadius: "20px 5px 5px 20px",
                backgroundColor: "#BFB5FF",
                width: "150px",
                height: "40px",
                marginRight: "30px",
                marginBottom: "10px",
              }}
            >
              <PersonAddAltOutlinedIcon
                style={{ marginRight: "5px", fontWeight: "normal" }}
              />
              Create Client
            </Button>
            <Button
              variant='contained'
              onClick={handleOpen}
              style={{
                fontWeight: "normal",
                borderRadius: "20px 5px 5px 20px",
                backgroundColor: "#BFB5FF",
                width: "150px",
                height: "40px",
                marginRight: "30px",
              }}
            >
              <HourglassTopOutlinedIcon
                style={{ marginRight: "10px", fontWeight: "normal" }}
              />
              Waiting List
            </Button>
          </Box>
        )}
      </div>
      <Divider
        sx={{
          marginLeft: "50px",
          marginTop: "10px",
          marginBottom: "10px",
          borderBottomWidth: "2px",
          borderColor: "#A6A6A6",
          width: "93.5%",
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
