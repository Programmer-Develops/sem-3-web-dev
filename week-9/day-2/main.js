const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

let count = 0

io.on("connection", (socket)=> {  // connection here is an event which is emitted when a client connects to the server
    count++;
    console.log("Client connected ", count);

    socket.broadcast.emit("join","A new client has joined the chat");  // broadcast is used to send data to all clients except the one that triggered the event

    // sending data to client
    socket.emit("sending", "Hello World from server");

    // reading data from client
    socket.on("reading", (data) => {
        console.log(data);
    })

    socket.on("disconnect", () => {
        count--;
        console.log("Client disconnected ", count);
    })

    // announcement
    io.emit("announcement", "You'll always have a Great Day!");  // emit is used to send data to all clients including the one that triggered the event
}
)

httpserver.listen(3000, () => {
    console.log("Server is running on port 3000");
})