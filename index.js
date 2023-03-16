const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

app.get('/', (req, res) => {
  res.send('Hello world');
});

// io.on('connection', (socket) => {
//   socket.on('callUser', (signal) => {
//     socket.broadcast.emit("incomingCall", signal);
//   });

//   socket.on('answerCall', (signal) => {
//     socket.broadcast.emit("callAccepted", signal);
//   });

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('callEnded');
//   });
// });

app.listen(3001, () => {
  console.log("Server started");
});
