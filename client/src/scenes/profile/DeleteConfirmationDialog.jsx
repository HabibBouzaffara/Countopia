import React from "react";
import { Dialog, DialogActions, DialogContent, Button, Typography } from "@mui/material";

const DeleteConfirmationDialog = ({ isOpen, data, onCancel, onConfirm }) => {
  
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogContent style={{ lineHeight: "1.5" }}>
        {/* Display text in separate lines */}
        <Typography variant="body1" >
        {data==="delete"?<strong>Delete profile picturet</strong>:<strong>Modify profile</strong>}
          
        </Typography>
        <Typography variant="body1" style={{ marginTop: "15px" }}>
            {data==="delete"?"Are you sure you want to delete your profile picture?":"Are you sure you want to modify your profile?"}
          
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button  style={{ color: "#60A9DE" }} onClick={onCancel}>Cancel</Button>
        <Button  style={{ color: "#60A9DE" }} color="primary" onClick={onConfirm}>{data==="delete"?"Delete":"Modify"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;