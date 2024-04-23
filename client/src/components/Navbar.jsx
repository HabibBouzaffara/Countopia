import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserPicture from "./UserPicture";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
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
      dispatch(setLogout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }finally {
      setLoading(false);
    }
  };

  if (!user) return null;
  return (
    <AppBar
      position="static"
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
          <IconButton sx={{ color: "#3F4BC9" }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor="#EEF2F6"
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase sx={{ color: "#3F4BC9" }} placeholder="Search..." />
            <IconButton>
              <Search sx={{ color: "#3F4BC9" }}  />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {/* <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>   */}
          <IconButton>
            <SettingsOutlined
              sx={{ fontSize: "25px", color: "#3F4BC9" }}
            />
          </IconButton>
          {loading ? ( // Display CircularProgress when loading is true
                    <CircularProgress size={24} />
                  ) : (
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <UserPicture name={user.name} picturePath={user.picturePath} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "#3F4BC9" }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: "#3F4BC9" }}
                >
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "superadmin"
                    ? "Superadmin"
                    : "Client"}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: "#3F4BC9", fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
                sx={{
                  width: "80px",
                  height: "30px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleClose}
              >
                <Button sx={{ color: "black" }} onClick={handleLogout}>
                  Log out
                </Button>
              </MenuItem>
            </Menu>
          </FlexBetween>)}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
