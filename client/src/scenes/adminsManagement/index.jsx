import React, { useEffect, useState } from "react";
import AdminCard from "./Card";
import { Box, Typography } from "@mui/material"; // Removed unnecessary Button import

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
  const refreshPage = async () => {
    await getAdmins();
  };
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
      <div style={{ paddingBottom: "30px" }}>
        {user.map((user, index) => (
          <Box marginRight={"50px"} marginLeft={"40px"}>
            <AdminCard
              key={index}
              user={user}
              refreshPage={refreshPage}
            ></AdminCard>
          </Box>
        ))}
      </div>
    </>
  );
};

export default Admins;
