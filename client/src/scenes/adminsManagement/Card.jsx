import { Box, Button } from "@mui/material";
import React ,{useState} from "react"; 
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const AdminCard = ({ user, refreshPage }) => {
  const[openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  
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
      
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveClick = async () => {
    
    setOpenConfirmationDialog(true);
  };
  const handleConfirmDelete = async () => {
    await handleRemoveUser();
    setOpenConfirmationDialog(false);
  };

  const handleCancelDelete =  () => {
    setOpenConfirmationDialog(false);
  };
  
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
      //   padding={"20px"}
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
          <img
            src={process.env.REACT_APP_BASE_URL + "/assets/" + user.picturePath}
            alt="User"
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
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
            variant="contained"
            style={{
              fontWeight: "normal",
              borderRadius: "20px",
              backgroundColor: "#BFB5FF",
              width: "150px",
              height: "40px",
              marginRight: "20px",
              marginBottom: "70px",
            }}
          >
            <PersonAddAltOutlinedIcon
              style={{ marginRight: "10px", fontWeight: "normal" }}
            />
            Assign Client
          </Button>
          <Button
            onClick={handleRemoveClick}
            variant="contained"
            style={{
              borderRadius: "20px",
              border: "1px solid #A6A6A6",
              backgroundColor: "white",
              marginBottom: "70px",
              height: "40px",
            }}
          >
            <PersonRemoveOutlinedIcon
              sx={{
                color: "red",
                fontWeight: "normal",
              }}
              fontWeight={"normal"}
            ></PersonRemoveOutlinedIcon>
          </Button>
          <DeleteConfirmationDialog
        isOpen={openConfirmationDialog}
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
          border="2px solid #C7C7C7"
          borderRadius={"20px"}
          padding="10px"
          width="200px"
        >
          Clients number : 0
        </Box>
        <Box
          border="2px solid #C7C7C7"
          borderRadius={"20px"}
          padding="10px"
          width="200px"
        >
          Active Clients : 0
        </Box>
        <Box
          border="2px solid #C7C7C7"
          borderRadius={"20px"}
          padding="10px"
          width="200px"
        >
          Pending Clients : 0
        </Box>
      </Box>
    </Box>
  );
};
export default AdminCard;
