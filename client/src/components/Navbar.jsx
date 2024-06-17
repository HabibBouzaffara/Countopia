import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  // SettingsOutlined,
  // ArrowDropDownOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout, setSimulation, setUser } from "state";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserPicture from "./UserPicture";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const simulation = useSelector((state) => state.simulation);
  console.log(simulation);
  const dispatch = useDispatch();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const isOpen = Boolean(anchorEl);
  // const handleClick = (event) => setAnchorEl(event.currentTarget);
  // const handleClose = () => setAnchorEl(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_BASE_URL}/setLogout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: user._id }),
      });
      dispatch(setSimulation({ simulation: false }));
      dispatch(setLogout());

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleEndSimulation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endSimulate = await fetch(
        `${process.env.REACT_APP_BASE_URL}/endSimulate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await endSimulate.json();
      if (!endSimulate.ok) throw new Error(response.msg);
      if (response) {
        dispatch(setSimulation({ simulation: false }));
        dispatch(setLogin({ user: response.user, token: response.token }));
        dispatch(setUser({ user: response.user, token: response.token }));
        localStorage.setItem("token", response.token);
        navigate("/admins");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    //
  };

  if (!user) return null;
  return (
    <AppBar
      position='sticky' //static old version
      sx={{
        background: "none",
        boxShadow: "none",
        mb: "1.5rem",
        backgroundColor: "white",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            sx={{ color: "#3F4BC9" }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>

          <FlexBetween
            backgroundColor='#EEF2F6'
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'
          >
            <InputBase sx={{ color: "#3F4BC9" }} placeholder='Search...' />
            <IconButton>
              <Search sx={{ color: "#3F4BC9" }} />
            </IconButton>
          </FlexBetween>
          {simulation.simulation && (
            <Typography
              fontWeight='bold'
              color='rgba(255, 0, 0, 0.9)'
              sx={{
                display: { xs: "none", sm: "block" },
                marginLeft: "9rem",
                fontSize: "20px",
              }}
            >
              You are on simulation Mode!
            </Typography>
          )}
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>   */}
          {/* <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px", color: "#3F4BC9" }} />
          </IconButton> */}
          {loading ? ( // Display CircularProgress when loading is true
            <CircularProgress size={24} />
          ) : (
            <FlexBetween>
              <Box
                onClick={() => navigate("/profile")}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
              >
                <UserPicture name={user.name} picturePath={user.picturePath} />
                <Box textAlign='left'>
                  <Typography
                    fontWeight='bold'
                    fontSize='0.85rem'
                    sx={{ color: "#3F4BC9" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography fontSize='0.75rem' sx={{ color: "#3F4BC9" }}>
                    {user.role === "admin"
                      ? "Admin"
                      : user.role === "superadmin"
                      ? "Superadmin"
                      : "Client"}
                  </Typography>
                </Box>
              </Box>
              {!simulation.simulation && (
                <IconButton>
                  <Box
                    onClick={handleLogout}
                    sx={{
                      color: "#3F4BC9",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                    }}
                  >
                    <ExitToAppRoundedIcon />
                    <Typography fontSize='0.85rem'>Logout</Typography>
                  </Box>
                </IconButton>
              )}
              {simulation.simulation && (
                <IconButton>
                  <Box
                    onClick={handleEndSimulation}
                    sx={{
                      color: "#3F4BC9",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <MeetingRoomRoundedIcon sx={{ marginRight: "5px" }} />
                      <Typography fontSize='0.85rem'>Exit</Typography>
                    </Box>

                    <Typography fontSize='0.85rem'>Simulation</Typography>
                  </Box>
                </IconButton>
              )}
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
