# Gather — Chat Application

A real-time, room-based chat app built with the Week 9 Day 2 stack: Node.js, Express, and Socket.IO.

## Features

- Three chat rooms: `#general`, `#random`, and `#tech`
- Live messages, room member lists, and typing indicators
- Up to 100 recent messages kept in memory per room
- Choose and change your display name; it is saved in your browser
- Responsive dark interface for desktop and mobile
- Chat message text is rendered as plain text, not HTML

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Set `PORT` to use a different port.

Messages and presence are held in server memory, so message history resets when the server restarts. No database or additional framework is used.
