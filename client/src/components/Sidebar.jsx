import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  PointOfSaleOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import UserPicture from "./UserPicture";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    role: ["client", "admin", "superadmin"],
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
    role: ["admin", "superadmin"],
  },
  // {
  //   text: "Profile",
  //   icon: null,
  //   role: ["client", "admin", "superadmin"],
  // },

  // {
  //   text: "Client Facing",
  //   icon: null,
  //   role: ["client", "admin", "superadmin"],
  // },
  // {
  //   text: "Sales",
  //   icon: null,
  //   role: ["client", "admin", "superadmin"],
  // },
  {
    text: "Management",
    icon: null,
    role: ["admin", "superadmin"],
  },
  {
    text: "Profile",
    icon: <SettingsOutlined />,
    role: ["client", "admin", "superadmin"],
  },
  {
    text: "Admins",
    icon: <AdminPanelSettingsOutlined />,
    role: ["superadmin"],
  },
  {
    text: "Clients",
    icon: <Groups2Outlined />,
    role: ["superadmin", "admin"],
  },
  {
    text: "Journal",
    icon: null,
    role: ["client", "admin", "superadmin"],
  },
  {
    text: "Invoices",
    icon: <DescriptionOutlinedIcon />,
    role: ["superadmin", "admin"],
  },

  {
    text: "Journal",
    icon: <TocOutlinedIcon />,
    role: ["client"],
  },
  {
    text: "Next Feature",
    icon: null,
    role: ["client", "admin", "superadmin"],
  },
  {
    text: "Ask Your DB",
    icon: <QueryStatsOutlinedIcon />,
    role: ["superadmin", "admin", "client"],
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const filteredNavItems = navItems.filter(({ role }) =>
    role.includes(user.role)
  );

  if (!user) return <CircularProgress />;

  return (
    <Box component="nav" bgcolor="white">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "white",
              border: isNonMobile ? 0 : "2px solid #3F4BC9",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box ml="1.5rem" display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold" color="#9D8DFE">
                  Countopia
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {filteredNavItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem", color: "#C7C7C7" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        bgcolor:
                          active === lcText
                            ? "rgba(157, 141, 254, 0.7)"
                            : "transparent",
                        color: active === lcText ? "#323DB3" : "#3F4BC9",
                        borderRadius: "0 0.5rem 0.5rem 0",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lcText ? "#323DB3" : "#3F4BC9",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem" width="100%">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <UserPicture name={user.name} picturePath={user.picturePath} />

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: "#9D8DFE" }}
                >
                  {user.name}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: "#3F4BC9" }}>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "superadmin"
                    ? "Superadmin"
                    : "Client"}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: "#3F4BC9",
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
