import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import React, { useState } from "react";

const UsersAction = ({ setRowId, rowId, params }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async () => {};
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color='primary'
          sx={{ width: 40, height: 40, backgroundColor: "green" }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color='primary'
          sx={{ width: 40, height: 40 }}
          disabled={params.id !== rowId || loading}
          onClick={{ handleSubmit }}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={40}
          sx={{ color: "#9D8DFE", position: "absolute" }}
        />
      )}
    </Box>
  );
};

export default UsersAction;
