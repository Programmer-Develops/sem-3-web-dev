const path = require("node:path");
const express = require("express");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;
const rooms = ["general", "random", "tech"];
const messageHistory = new Map(rooms.map((room) => [room, []]));
const maxMessageLength = 1000;
const maxHistoryLength = 100;

app.use(express.static(path.join(__dirname, "public")));

app.get("/healthz", (request, response) => {
  response.json({ status: "ok" });
});

function isValidName(name) {
  return typeof name === "string"
    && name.trim().length > 0
    && name.trim().length <= 24
    && !/[\u0000-\u001f\u007f]/.test(name);
}

function isValidRoom(room) {
  return typeof room === "string" && rooms.includes(room);
}

function addSystemMessage(room, text) {
  const message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: "system",
    text,
    timestamp: new Date().toISOString()
  };
  const history = messageHistory.get(room);
  history.push(message);
  if (history.length > maxHistoryLength) history.shift();
  io.to(room).emit("chat:message", message);
}

async function broadcastPresence(room) {
  const connectedSockets = await io.in(room).fetchSockets();
  const users = [...new Set(
    connectedSockets
      .map((connectedSocket) => connectedSocket.data.username)
      .filter(Boolean)
  )].sort((first, second) => first.localeCompare(second));
  io.to(room).emit("chat:presence", users);
}

io.on("connection", (socket) => {
  socket.on("chat:join", async (payload) => {
    const name = payload && payload.name;
    const room = payload && payload.room;

    if (!isValidName(name) || !isValidRoom(room)) {
      socket.emit("chat:error", "Enter a name (up to 24 characters) and choose a valid room.");
      return;
    }

    const username = name.trim();
    const previousRoom = socket.data.room;
    const previousName = socket.data.username;

    if (previousRoom === room && previousName === username) {
      socket.emit("chat:history", messageHistory.get(room));
      await broadcastPresence(room);
      return;
    }

    if (previousRoom) {
      socket.leave(previousRoom);
      socket.to(previousRoom).emit("chat:typing", { username: previousName, isTyping: false });
      if (previousName !== username) {
        addSystemMessage(previousRoom, `${previousName} left #${previousRoom}.`);
      }
      await broadcastPresence(previousRoom);
    }

    socket.data.username = username;
    socket.data.room = room;
    socket.join(room);
    socket.emit("chat:history", messageHistory.get(room));
    addSystemMessage(room, `${username} joined #${room}.`);
    await broadcastPresence(room);
  });

  socket.on("chat:message", (payload) => {
    const room = socket.data.room;
    const text = payload && typeof payload.text === "string" ? payload.text.trim() : "";

    if (!room || !text || text.length > maxMessageLength) {
      socket.emit("chat:error", `Messages must be between 1 and ${maxMessageLength} characters.`);
      return;
    }

    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: "user",
      username: socket.data.username,
      text,
      timestamp: new Date().toISOString()
    };
    const history = messageHistory.get(room);
    history.push(message);
    if (history.length > maxHistoryLength) history.shift();
    io.to(room).emit("chat:message", message);
    socket.to(room).emit("chat:typing", { username: socket.data.username, isTyping: false });
  });

  socket.on("chat:typing", (payload) => {
    const room = socket.data.room;
    if (!room) return;
    socket.to(room).emit("chat:typing", {
      username: socket.data.username,
      isTyping: Boolean(payload && payload.isTyping)
    });
  });

  socket.on("disconnect", async () => {
    const room = socket.data.room;
    const username = socket.data.username;
    if (!room || !username) return;
    socket.to(room).emit("chat:typing", { username, isTyping: false });
    addSystemMessage(room, `${username} left #${room}.`);
    await broadcastPresence(room);
  });
});

httpServer.listen(port, () => {
  console.log(`Chat application is running at http://localhost:${port}`);
});
