// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { io } from "socket.io-client";
import { Events } from './components/Events';
import { MyForm } from './components/MyForm';
import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';

const App = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [userName, setUserName] = useState(""); // User-defined name
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [roomName, setRoomName] = useState(""); // Room the user has joined

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("receive-msg", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    socket.on("welcome", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive-msg");
      socket.off("welcome");
    };
  }, [socket]);

  const handleSubmit = (message) => {
    if (userName && roomName) {
      // Emit message along with user's name and the current room
      socket.emit("message", { message, room: roomName, sender: userName });
    } else {
      alert("Please enter your name and join a room before sending a message.");
    }
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    if (roomName) {
      socket.emit("join-room", roomName);
      setMessages([]); // Clear previous messages on room change
    } else {
      alert("Please enter a room name.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Socket.io Chat App
        </Typography>

        <Stack spacing={2}>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            label="Your Name"
            variant="outlined"
            fullWidth
            helperText="Set your name to use in chat"
          />
          
          <ConnectionManager
            onConnect={() => socket.connect()}
            onDisconnect={() => socket.disconnect()}
          />
          <ConnectionState isConnected={isConnected} />
          <Typography variant="body1" component="div" gutterBottom>
            Socket ID: {socketId}
          </Typography>

          <form onSubmit={joinRoomHandler}>
            <Stack spacing={2} direction="row">
              <TextField
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                label="Room Name"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Join
              </Button>
            </Stack>
          </form>

          <MyForm onSubmit={handleSubmit} />

          <Events events={messages} />
        </Stack>
      </Box>
    </Container>
  );
};

export default App;
