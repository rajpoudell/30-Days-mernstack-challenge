import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message,room});
    setMessage("");
  };
  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");

  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("receive-msg", (s) => {
      console.log(s);
      setMessages((messages)=> [...messages, s])
    });
    
    socket.on("welcome", (s) => {
      console.log(s);
    });


    return () => {};
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{height:500}}/>
      
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>
      <form onSubmit={joinRoomHandler}>
        <h5>Join the room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
        />
         <Button variant="contained" color="primary" type="submit">
          Join
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="message"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
      <Stack>
        
        {messages.map((m,i) =>(
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}

          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
