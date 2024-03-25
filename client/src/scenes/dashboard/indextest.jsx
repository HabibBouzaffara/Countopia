import React from 'react'

// const DashboardTest = () => {
//   return (
//     <div>DashboardTest</div>
//   )
// }
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Navbar from "scenes/navbar";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import UserWidget from "scenes/widgets/UserWidget";  

const DashboardTest = () => {
  // const [user, setUser] = useState(null);
  // 
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state); // Select entire state object

  // Log the state to see all the data stored in your Redux store
  console.log('Redux State:', state);

  const userId = useSelector((state) => state.user._id);

  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <p userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <p userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         <h1>{user.firstName}</h1>
         <h1>{user.email}</h1>
          {userId}
          {token}
          <p picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <p userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTest;

