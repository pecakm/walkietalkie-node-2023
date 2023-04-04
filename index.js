const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  socket.on('joinRoom', () => {
    socket.broadcast.emit('userJoined', socket.id);
  });

  socket.on('welcomeUser', ({ from, to }) => {
    io.to(to).emit('welcomeUser', from);
  });

  socket.on('callUser', ({ to, from, signal }) => {
    io.to(to).emit('incomingCall', { from, signal });
  });

  socket.on('answerCall', ({ from, to, signal }) => {
    socket.to(to).emit('callAccepted', { from, signal });
  });

  socket.on('startSpeaking', () => {
    socket.broadcast.emit('disableMic');
  });

  socket.on('stopSpeaking', () => {
    socket.broadcast.emit('enableMic');
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('userDisconnected', socket.id);
  });

  socket.emit('initInfo', socket.id);
});

app.get('/', (req, res) => {
  res.send();
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
