import React, { useEffect, useState } from "react";
import AdminCard from "./Card";
import { Box, Button, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AdminForm from "./AdminForm";

const Admins = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // State to control the dialog visibility


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const register = async (values) => {
    
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try{
    const savedUserResponse = await fetch(
      process.env.REACT_APP_BASE_URL + "/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();

    if (!savedUserResponse.ok) {
      // Handle server error
      console.log(savedUser);
      return;
    }
    if (savedUser) {
      console.log(savedUser._id);
    }
    }catch(error){
      console.log(error);
    }
  };

  const getAdmins = async () => {
    try {
      const admins = await fetch(process.env.REACT_APP_BASE_URL + "/admins", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    handleClose();
    getAdmins();
  };
  useEffect(() => {
    getAdmins();
  }, []);
  if (!user) return null;

   console.log(user);

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
      Admins
    </Typography>
    <Button
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
        <PersonAddAltOutlinedIcon
          style={{ marginRight: "10px", fontWeight: "normal" }}
        />
        Create Admin
      </Button>

  </div>
      <div style={{ paddingBottom: "30px" }}>
        {user.map((user, index) => (
          <Box marginRight={"50px"} marginLeft={"40px"}>
            <AdminCard key={index} user={user}></AdminCard>
          </Box>
        ))}
      </div>
      <AdminForm open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
    </>
  );
};

export default Admins;
