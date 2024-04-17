import React, { useEffect, useState } from "react";
import AdminCard from "./Card";
import { Box, Button, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const Admins = () => {
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    getAdmins();
  }, []);
  if (!user) return null;

  console.log(user);

  return (
    <>
      <Typography
        variant="h2"
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          color: "#263238",
          marginLeft: "40px",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Admins
      </Typography>
      {/* <Button
        display={"flex-end"}
        justifyContent={"space-between"}
        variant="contained"
        style={{
          fontWeight: "normal",
          borderRadius: "20px",
          backgroundColor: "#BFB5FF",
          width: "150px",
          height: "40px",
        }}
      >
        <PersonAddAltOutlinedIcon
          style={{ marginRight: "10px", fontWeight: "normal" }}
        />
        Assign Client
      </Button> */}
      <div style={{ paddingBottom: "30px" }}>
        {user.map((user, index) => (
          <Box marginRight={"50px"} marginLeft={"40px"}>
            <AdminCard key={index} user={user}></AdminCard>
          </Box>
        ))}
      </div>
    </>
  );
};

export default Admins;
