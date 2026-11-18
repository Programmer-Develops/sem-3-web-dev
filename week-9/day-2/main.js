const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

io.on("connection", (socket)=> {
    // sending data to client
    socket.emit("sending", "Hello World from server");

    // reading data from client
    socket.on("reading", (data) => {
        console.log(data);
    })
})

httpserver.listen(3000, () => {
    console.log("Server is running on port 3000");
})