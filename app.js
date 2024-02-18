const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Tell our Node.js Server to host our P5.JS sketch from the public folder.
app.use(express.static("public"));

const port = process.env.PORT;

// Setup Our Node.js server to listen to connections from chrome, and open chrome when it is ready
server.listen(port, () => {
  console.log(`starting server at ${port}`);
});


// Setup Our Node.js server to listen to connections from chrome, and open chrome when it is ready
//server.listen(3000, () => {
//  console.log("listening on *:3000");
//});

io.on("connection", (socket) => {
  console.log("a user connected : " + socket.id);
  socket.on("drawing", (data) => {
    console.log(data);
    socket.broadcast.emit("drawing", data);
  });
});
