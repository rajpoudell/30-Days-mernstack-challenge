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
// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('userId:' ,socket.id);

    socket.on('message', (data) =>{
      console.log(data.room, data.message);
      io.to(data.room).emit('receive-msg',data.message)
    });
    
    socket.on("disconnect", () =>{
      console.log(`User disconnected: ${socket.id}`);
    })
 
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
