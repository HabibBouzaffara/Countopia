import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { io } from "socket.io-client";
import MessageComponent from "./MessageComponent";
import UserPicture from "components/UserPicture";
import { Send } from "@mui/icons-material";

const socket = io("http://localhost:3001"); // Adjust the URL as necessary

const ChatComponent = ({ user, selectedClient }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages([]); // Clear chatMessages when selectedClient changes
  }, [selectedClient]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        if (!selectedClient) return;
        const url =
          user.role === "admin"
            ? new URL(
                process.env.REACT_APP_BASE_URL +
                  "/getConversation?admin_id=" +
                  user._id +
                  "&client_id=" +
                  selectedClient._id
              )
            : new URL(
                process.env.REACT_APP_BASE_URL +
                  "/getConversation?client_id=" +
                  user._id +
                  "&admin_id=" +
                  user.assigned[0]
              );
        const headers = { "Content-Type": "application/json" };
        const conversationResponse = await fetch(url, {
          method: "GET",
          headers,
        });
        const { conversation } = await conversationResponse.json();
        if (!conversationResponse.ok) {
          throw new Error(conversation.msg);
        }
        setChatMessages(
          conversation.messages.map((message) => ({
            text: message.message,
            time_sent: message.time_sent,
            isUser: message.sender_id === user._id,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (selectedClient) {
      getConversation();
    }
  }, [selectedClient, user]);
  useEffect(() => {
    if (selectedClient) {
      socket.emit("joinRoom", {
        client_id: selectedClient._id,
        admin_id: user.role === "admin" ? user._id : user.assigned[0],
      });
      const handleMessage = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      };
      socket.on("newMessage", handleMessage);
      return () => {
        socket.off("newMessage", handleMessage);
      };
    }
  }, [selectedClient, user]);

  const handleChatMessageSend = () => {
    if (chatMessage.trim() === "") return;

    const message = {
      text: chatMessage,
      isUser: true,
      time_sent: new Date().toISOString(),
    };

    setChatMessages((prevMessages) => [...prevMessages, message]);

    fetch("http://localhost:3001/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: selectedClient._id,
        admin_id: user.role === "admin" ? user._id : user.assigned[0],
        sender_id: user._id,
        message: chatMessage,
        time_sent: message.time_sent,
      }),
    });

    setChatMessage("");
  };

  const getDateHeader = (currentMessage, previousMessage) => {
    const currentDate = new Date(currentMessage.time_sent).toLocaleDateString();
    const previousDate = previousMessage
      ? new Date(previousMessage.time_sent).toLocaleDateString()
      : null;

    return currentDate !== previousDate ? (
      <Typography
        variant='caption'
        sx={{
          display: "block",
          marginTop: "10px",
          marginBottom: "10px",
          color: "#888888",
          textAlign: "center",
        }}
      >
        {currentDate}
      </Typography>
    ) : null;
  };

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(215,228,251,1) 80%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        height: "400px",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <UserPicture
          name={selectedClient.name}
          picturePath={selectedClient.picturePath}
        />
        <Typography
          sx={{
            fontWeight: "medium",
            fontSize: "24px",
            color: "#323DB3",
            marginLeft: "10px",
          }}
        >
          Chatting with {selectedClient.name}
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {chatMessages.map((message, index) => (
          <React.Fragment key={index}>
            {getDateHeader(message, chatMessages[index - 1])}
            <MessageComponent
              text={message.text}
              time_sent={message.time_sent}
              isUser={message.isUser}
            />
          </React.Fragment>
        ))}
        {chatMessages.length === 0 && (
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: "14px",
              color: "gray",
              textAlign: "center",
            }}
          >
            No messages yet
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <TextField
          id='outlined-basic'
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          variant='outlined'
          fullWidth
          placeholder='Type your message...'
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        />
        <IconButton
          onClick={handleChatMessageSend}
          variant='contained'
          sx={{
            marginLeft: "10px",
            borderRadius: "20px",
            width: "50px",
            backgroundColor: "#BFB5FF",
            color: "white",
            fontSize: "15px",
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatComponent;
