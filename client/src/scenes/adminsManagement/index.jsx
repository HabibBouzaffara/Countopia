import React, { useEffect, useState } from "react";
import AdminCard from "./Card";
import { Box, Button, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AdminForm from "./AdminForm";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CustomSnackbar from "scenes/CustomSnackBar";

const Admins = ({ superadmin }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // State to control the dialog visibility
  const [onConfirmMessage, setOnConfirmMessage] = useState("");

  if (onConfirmMessage !== "" && !openAlert) {
    setAlertMessage(onConfirmMessage);
    setErrorMessage(false);
    setOpenAlert(true);
  }
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
        setAlertMessage(data.msg || " Admin Created successfully");
        setErrorMessage(false);
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const admins = await fetch(process.env.REACT_APP_BASE_URL + "/admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await admins.json();
      if (!admins.ok) {
        throw new Error(data.msg);
      }
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (newAdmin) => {
    await register(newAdmin);
    console.log("Submitting form:", newAdmin);
    setOpen(false);
    getAdmins();
  };
  useEffect(() => {
    getAdmins();
  }, [onConfirmMessage === "Admin removed successfully"]);

  if (!user) return null;

  if (superadmin && superadmin.role) {
    if (superadmin.role !== "superadmin")
      return (
        <Box textAlign='center' mt={12}>
          <WarningAmberOutlinedIcon
            sx={{ fontSize: 300, color: "rgba(255, 0, 0, 0.6)" }}
          />
          <Typography
            variant='h1'
            gutterBottom
            style={{ color: "rgba(255, 0, 0, 0.7)", fontWeight: "bold" }}
          >
            Access Denied
          </Typography>
          <Typography variant='h2' style={{ color: "rgba(255, 0, 0, 0.6)" }}>
            This page is only visible to superadmins.
          </Typography>
        </Box>
      );
  }

  return (
    <>
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
          Admins
        </Typography>
        <Button
          variant='contained'
          onClick={() => setOpen(true)}
          style={{
            fontWeight: "normal",
            borderRadius: "20px",
            backgroundColor: "#BFB5FF",
            width: "150px",
            height: "40px",
            marginRight: "60px",
          }}
        >
          <PersonAddAltOutlinedIcon
            style={{ marginRight: "10px", fontWeight: "normal" }}
          />
          Create Admin
        </Button>
      </div>
      <div style={{ paddingBottom: "30px" }}>
        {user.map((user) => (
          <Box key={user._id} marginRight={"50px"} marginLeft={"40px"}>
            <AdminCard
              user={user}
              clientAssigned={getAdmins}
              setOnConfirmMessage={setOnConfirmMessage}
            />
          </Box>
        ))}
      </div>
      <AdminForm
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
      <CustomSnackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => {
          setOpenAlert(false);
          setOnConfirmMessage("");
        }}
        errorMessage={errorMessage}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default Admins;
