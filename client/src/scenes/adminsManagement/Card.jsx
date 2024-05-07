import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import AssignClientDialog from "./AssignClientDialog";
import UserPicture from "components/UserPicture";

const AdminCard = ({ user, clientAssigned, setOnConfirmMessage }) => {
  const [dialogs, setDialogs] = useState({
    confirmation: false,
    assignClient: false,
  });
  const [clientsInfo, setClientsInfo] = useState({
    activeClients: 0,
    pendingClients: 0,
  });

  const handleRemoveUser = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + "/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: user._id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove admin");
      }
      const data = await response.json();
      console.log(data);
      setOnConfirmMessage("Admin removed successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const clientsStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin-clients-stats?_id=${user._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch active and pending clients count");
      }
      const { activeClients, pendingClients } = await response.json();
      setClientsInfo({ activeClients, pendingClients });
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    clientsStatus();
  }, [clientsStatus]);

  const handleRemoveClick = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, confirmation: true }));
  }, []);

  const handleConfirmDelete = async () => {
    await handleRemoveUser();
    setDialogs((prevState) => ({ ...prevState, confirmation: false }));
  };

  const handleCancelDelete = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, confirmation: false }));
  }, []);

  const handleAssignClick = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignClient: true }));
  }, []);

  const handleConfirmAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignClient: false }));
    clientAssigned();
  }, [clientAssigned]);

  const handleCancelAssign = useCallback(() => {
    setDialogs((prevState) => ({ ...prevState, assignClient: false }));
  }, []);

  return (
    <Box
      width={"100%"}
      backgroundColor={"white"}
      height={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderRadius={"15px"}
      paddingLeft={"40px"}
      paddingRight={"40px"}
      paddingTop={"20px"}
      paddingBottom={"20px"}
      marginTop={"20px"}
      marginBottom={"20px"}
      overflow={"hidden"}
      border={"2px dashed rgba(128, 128, 128, 0.5)"}
    >
      <Box
        width={"95%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Picture and user info in one column */}
        <Box display={"flex"} alignItems={"center"}>
          <UserPicture
            name={user.name}
            picturePath={user.picturePath}
            sx={{ width: "120px", height: "120px" }}
          />
          <Box marginLeft={"50px"}>
            <p style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)" }}>
              {user.name}
            </p>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <p>{user.location}</p>
          </Box>
        </Box>

        {/* Buttons aligned to the right */}
        <Box>
          <Button
            variant='contained'
            onClick={handleAssignClick}
            style={{
              fontWeight: "normal",
              borderRadius: "20px",
              backgroundColor: "#BFB5FF",
              height: "40px",
              marginRight: "20px",
              marginBottom: "70px",
            }}
          >
            <PersonAddAltOutlinedIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            Manage {user.name}'s Clients
          </Button>
          <AssignClientDialog
            admin={user}
            isOpen={dialogs.assignClient}
            onClose={handleConfirmAssign}
            onCancel={handleCancelAssign}
            setOnConfirmMessage={setOnConfirmMessage}
          />
          <Button
            onClick={handleRemoveClick}
            variant='contained'
            style={{
              borderRadius: "20px",
              border: "1px solid #A6A6A6",
              backgroundColor: "white",
              marginBottom: "70px",
              height: "40px",
            }}
          >
            <PersonRemoveOutlinedIcon
              sx={{ color: "red", fontWeight: "normal" }}
              fontWeight={"normal"}
            />
          </Button>
          <DeleteConfirmationDialog
            isOpen={dialogs.confirmation}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </Box>
      </Box>

      <Box
        width={"95%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"20px"}
      >
        {/* Three buttons in the second row */}
        <Box
          border='2px solid #C7C7C7'
          borderRadius={"20px"}
          padding='10px'
          width='200px'
        >
          Clients number : {user.clients.length}
        </Box>
        <Box
          border='2px solid #C7C7C7'
          borderRadius={"20px"}
          padding='10px'
          width='200px'
        >
          Active Clients : {clientsInfo.activeClients}
        </Box>
        <Box
          border='2px solid #C7C7C7'
          borderRadius={"20px"}
          padding='10px'
          width='200px'
        >
          Pending Clients : {clientsInfo.pendingClients}
        </Box>
      </Box>
    </Box>
  );
};
export default AdminCard;
