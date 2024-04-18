import React from "react";
import { Dialog, DialogActions, DialogContent, Button, Typography } from "@mui/material";

const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogContent style={{ lineHeight: "1.5" }}>
        {/* Display text in separate lines */}
        <Typography variant="body1" >
          <strong>Delete an administrator account</strong>
        </Typography>
        <Typography variant="body1" style={{ marginTop: "15px" }}>
          Are you sure you want to remove This Admin?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button  style={{ color: "#60A9DE" }} onClick={onCancel}>Cancel</Button>
        <Button  style={{ color: "#60A9DE" }} color="primary" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
