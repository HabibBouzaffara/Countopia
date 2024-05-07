import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({
  open,
  autoHideDuration,
  onClose,
  errorMessage,
  alertMessage,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ paddingBottom: "15px" }}
    >
      <MuiAlert
        elevation={6}
        variant='standard'
        severity={errorMessage ? "error" : "success"}
        onClose={handleClose}
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
