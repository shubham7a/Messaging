const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Listening for connection events on the server side
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Listening for disconnection events
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

module.exports = { app, io, server };
