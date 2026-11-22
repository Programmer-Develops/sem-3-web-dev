const socket = io();
const roomDescriptions = {
  general: "The place for everything and everyone.",
  random: "A little bit of everything, just for fun.",
  tech: "Ideas, tools, and things we're building."
};
const avatarColors = ["#e8b38f", "#a9c5e8", "#c4ade8", "#e7bbce", "#a8d4c2", "#e5d38f", "#e3a98f"];
const roomButtons = [...document.querySelectorAll(".channel")];
const messageList = document.querySelector("#message-list");
const emptyState = document.querySelector("#empty-state");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");
const nameDialog = document.querySelector("#name-dialog");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const nameError = document.querySelector("#name-error");
const connectionNote = document.querySelector("#connection-note");
const typingRow = document.querySelector("#typing-row");
const currentTypers = new Set();
let username = localStorage.getItem("gather-name") || "";
let currentRoom = "general";
let typingTimeout;
let bannerDismissed = false;

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function colorFor(name) {
  let hash = 0;
  for (const character of name) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return avatarColors[hash % avatarColors.length];
}

function setConnected(connected, message) {
  connectionNote.classList.toggle("connected", connected);
  connectionNote.classList.toggle("error", !connected && Boolean(message));
  connectionNote.lastElementChild.textContent = message || (connected ? "Connected — you're all caught up." : "Reconnecting to Gather…");
}

function updateProfile() {
  document.querySelector("#profile-name").textContent = username || "Your profile";
  const avatar = document.querySelector("#profile-avatar");
  avatar.textContent = username ? initials(username) : "?";
  if (username) avatar.style.background = colorFor(username);
}

function showNameDialog() {
  nameInput.value = username;
  nameError.textContent = "";
  if (!nameDialog.open) nameDialog.showModal();
  requestAnimationFrame(() => nameInput.focus());
}

function updateRoom(room) {
  currentRoom = room;
  roomButtons.forEach((button) => {
    const active = button.dataset.room === room;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
  document.querySelector("#room-title").textContent = room;
  document.querySelector("#room-description").textContent = roomDescriptions[room];
  document.querySelector("#welcome-room").textContent = room;
  messageInput.placeholder = `Message #${room}`;
  currentTypers.clear();
  renderTyping();
  bannerDismissed = false;
  document.querySelector("#welcome-banner").hidden = false;
  socket.emit("chat:join", { name: username, room });
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(timestamp));
}

function appendMessage(message) {
  emptyState.hidden = true;
  const item = document.createElement("article");

  if (message.type === "system") {
    item.className = "system-message";
    item.append(document.createTextNode(message.text));
    const time = document.createElement("time");
    time.dateTime = message.timestamp;
    time.textContent = formatTime(message.timestamp);
    item.append(time);
    messageList.append(item);
    return;
  }

  item.className = "message";
  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.textContent = initials(message.username);
  avatar.style.background = colorFor(message.username);

  const body = document.createElement("div");
  body.className = "message-body";
  const meta = document.createElement("div");
  meta.className = "message-meta";
  const author = document.createElement("span");
  author.className = "message-author";
  author.textContent = message.username;
  const time = document.createElement("time");
  time.className = "message-time";
  time.dateTime = message.timestamp;
  time.textContent = formatTime(message.timestamp);
  const text = document.createElement("p");
  text.className = "message-text";
  text.textContent = message.text;

  meta.append(author, time);
  body.append(meta, text);
  item.append(avatar, body);
  messageList.append(item);
}

function replaceHistory(messages) {
  messageList.replaceChildren();
  if (messages.length === 0) {
    messageList.append(emptyState);
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;
  messages.forEach(appendMessage);
  messageList.scrollTop = messageList.scrollHeight;
}

function renderTyping() {
  const names = [...currentTypers];
  if (names.length === 0) {
    typingRow.textContent = "";
  } else if (names.length === 1) {
    typingRow.textContent = `${names[0]} is typing…`;
  } else if (names.length === 2) {
    typingRow.textContent = `${names[0]} and ${names[1]} are typing…`;
  } else {
    typingRow.textContent = "Several people are typing…";
  }
}

function renderPresence(users) {
  const memberList = document.querySelector("#member-list");
  memberList.replaceChildren();
  users.forEach((name) => {
    const item = document.createElement("li");
    item.className = "member-item";
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = initials(name);
    avatar.style.background = colorFor(name);
    const label = document.createElement("span");
    label.className = "member-name";
    label.textContent = name;
    if (name === username) {
      const you = document.createElement("span");
      you.className = "member-you";
      you.textContent = "(you)";
      label.append(you);
    }
    item.append(avatar, label);
    memberList.append(item);
  });
  const count = users.length;
  document.querySelector("#online-count").textContent = `${count} online`;
  document.querySelector("#members-count").textContent = count;
  document.querySelector("#members-online-count").textContent = count;
}

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.room !== currentRoom) updateRoom(button.dataset.room);
  });
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nextName = nameInput.value.trim();
  if (!nextName || nextName.length > 24 || /[\u0000-\u001f\u007f]/.test(nextName)) {
    nameError.textContent = "Please enter a name of 1–24 characters.";
    nameInput.focus();
    return;
  }
  username = nextName;
  localStorage.setItem("gather-name", username);
  updateProfile();
  nameDialog.close();
  messageInput.disabled = false;
  sendButton.disabled = false;
  updateRoom(currentRoom);
  messageInput.focus();
});

document.querySelector("#profile-edit").addEventListener("click", showNameDialog);
document.querySelector("#banner-close").addEventListener("click", () => {
  bannerDismissed = true;
  document.querySelector("#welcome-banner").hidden = true;
});
document.querySelector("#focus-message").addEventListener("click", () => messageInput.focus());
document.querySelector("#members-toggle").addEventListener("click", () => {
  document.querySelector("#members-panel").classList.toggle("open");
});
document.addEventListener("click", (event) => {
  const panel = document.querySelector("#members-panel");
  if (panel.classList.contains("open") && !panel.contains(event.target) && !event.target.closest("#members-toggle")) {
    panel.classList.remove("open");
  }
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text || text.length > 1000 || !username) return;
  socket.emit("chat:message", { text });
  messageInput.value = "";
  sendButton.disabled = true;
  socket.emit("chat:typing", { isTyping: false });
});

messageInput.addEventListener("input", () => {
  sendButton.disabled = messageInput.value.trim().length === 0;
  socket.emit("chat:typing", { isTyping: messageInput.value.trim().length > 0 });
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => socket.emit("chat:typing", { isTyping: false }), 1200);
});

socket.on("connect", () => {
  setConnected(true);
  if (username) {
    messageInput.disabled = false;
    sendButton.disabled = messageInput.value.trim().length === 0;
    updateRoom(currentRoom);
  }
});

socket.on("disconnect", () => {
  setConnected(false);
  renderPresence([]);
  currentTypers.clear();
  renderTyping();
});

socket.on("connect_error", () => setConnected(false));
socket.on("chat:history", replaceHistory);
socket.on("chat:message", (message) => {
  appendMessage(message);
  messageList.scrollTop = messageList.scrollHeight;
  document.querySelector("#empty-state").hidden = true;
});
socket.on("chat:presence", renderPresence);
socket.on("chat:typing", ({ username: name, isTyping }) => {
  if (name === username) return;
  if (isTyping) currentTypers.add(name);
  else currentTypers.delete(name);
  renderTyping();
});
socket.on("chat:error", (message) => {
  setConnected(false, message);
});

updateProfile();
document.querySelector("#welcome-banner").hidden = bannerDismissed;
if (!username) showNameDialog();
