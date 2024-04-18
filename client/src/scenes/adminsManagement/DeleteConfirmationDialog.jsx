import React from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

const DeleteConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogContent>
        Are you sure you want to delete This Admin?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
