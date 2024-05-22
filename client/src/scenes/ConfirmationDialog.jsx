import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";

const ConfirmationDialog = ({ isOpen, data, onCancel, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogContent style={{ lineHeight: "1.5" }}>
        {/* Display text in separate lines */}
        <Typography variant='body1'>
          {data === "deleteProfilePicture" ? (
            <strong>Delete profile picture</strong>
          ) : data === "modifyProfile" ? (
            <strong>Modify profile</strong>
          ) : data === "deleteClient" ? (
            <strong>Delete Client</strong>
          ) : data ===
            "Are you sure you want to unassign the selected invoices?" ? (
            <strong>Unassign invoices</strong>
          ) : null}
        </Typography>
        <Typography variant='body1' style={{ marginTop: "15px" }}>
          {data === "deleteProfilePicture"
            ? "Are you sure you want to delete your profile picture?"
            : data === "modifyProfile"
            ? "Are you sure you want to modify your profile?"
            : data === "deleteClient"
            ? "Are you sure you want to delete this client?"
            : data}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: "#60A9DE" }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          style={{ color: "#60A9DE" }}
          color='primary'
          onClick={onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
