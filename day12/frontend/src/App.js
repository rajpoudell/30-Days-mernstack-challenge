import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message,room});
    setMessage("");
    setRoom("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socketId);
      console.log("Connected", socket.id);
    });

    socket.on("receive-msg", (s) => {
      console.log(s);
    });
    
    socket.on("welcome", (s) => {
      console.log(s);
    });


    return () => {};
  }, []);

  return (
    <Container maxWidth="sm">
      
      <Typography variant="h6" component="div" gutterBottom>
        {socket.id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="room"
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
    </Container>
  );
};

export default App;
