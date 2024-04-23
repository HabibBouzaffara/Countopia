import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import WaitingListManagement from "./WaitingListManagement";

const WaitingClientsDialog = ({userData, open, handleClose,handleChange }) => {

  return (
    <Dialog open={open} onClose={handleClose} sx={{  overflow: "hidden", maxHeight: "600px", marginTop: "auto",marginBottom: "auto",marginLeft: "auto",marginRight: "auto"}} fullWidth maxWidth="lg">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold",color: "#BFB5FF", fontSize: "20px" }}
      >Waiting List</DialogTitle>
      <DialogContent>
        <WaitingListManagement userData={userData} handleChange={handleChange} />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: "#BFB5FF",color:"white" ,borderRadius: "15px",width:"100px" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WaitingClientsDialog;
