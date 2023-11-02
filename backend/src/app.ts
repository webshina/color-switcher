import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import * as IO from 'socket.io';

// env
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}.local`),
});

// Express
const app = express();
const httpServer = http.createServer(app);
const io = new IO.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('change-color', (color) => {
    io.emit('color-changed', color);
  });
});

// Start the server
const port = 3001;
httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
