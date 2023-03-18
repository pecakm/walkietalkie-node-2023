const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 3001;
const turnId = process.env.TURN_ID || '';
const turnPwd = process.env.TURN_PWD || '';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('callUser', (signal) => {
    socket.broadcast.emit("incomingCall", signal);
  });

  socket.on('answerCall', (signal) => {
    socket.broadcast.emit("callAccepted", signal);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  io.to(socket).emit({ turnId, turnPwd });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(`ID: ${turnId}`);
});
