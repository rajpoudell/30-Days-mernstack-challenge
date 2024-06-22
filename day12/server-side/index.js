// server.js
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const PORT =  5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3000',
    methods:['GET', 'POST'],
    Credential:true, ///this one for cookies
  }
});

app.get('/', (req, res) => {
  res.send('Welcome')
});
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
    socket.to(room).emit('welcome', `${socket.id} has joined the room`);
  });

  socket.on('message', ({ message, room, sender }) => {
    const msg = { sender, message };
    console.log('Message received:', msg);
    io.to(room).emit('receive-msg', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
