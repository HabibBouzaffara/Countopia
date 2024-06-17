import React from "react";
import { Box, Typography } from "@mui/material";

const formatTime = (dateString) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleTimeString([], options);
};

const MessageComponent = ({ text, time_sent, isUser }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start",
      marginBottom: "10px",
    }}
  >
    <Box
      sx={{
        backgroundColor: isUser ? "#323DB3" : "#e0e0e0",
        color: isUser ? "#ffffff" : "#000000",
        borderRadius: "10px",
        padding: "8px 12px",
        maxWidth: "70%",
      }}
    >
      <Typography variant='body2'>{text}</Typography>
    </Box>
    <Typography
      variant='caption'
      sx={{
        marginTop: "4px",
        marginRight: isUser ? "4px" : "0",
        marginLeft: isUser ? "0" : "4px",
        color: isUser ? "#bbbbbb" : "#888888",
      }}
    >
      {formatTime(time_sent)}
    </Typography>
  </Box>
);

export default MessageComponent;
