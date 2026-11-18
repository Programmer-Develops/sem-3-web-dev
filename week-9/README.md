# What is three way handshake in http ?
- The three-way handshake is a process used in the Transmission Control Protocol (TCP) to establish a reliable connection between a client and a server before data can be transmitted.Transaction in http is a fundamental concept that ensures reliable data transfer between the client and server. It is not specific to HTTP, but it is a fundamental part of how TCP works, which underlies HTTP communication.

## EventEmitter and Websockets 

# What is Websocket ?
- Websocket is a protocol that provides full-duplex communication channels over a single TCP connection. It allows for real-time, bidirectional data exchange between a client and a server, making it ideal for applications that require low-latency communication, such as chat applications, online games, and live updates.
In Simple terms, WebSocket enables a persistent connection between the client and server, allowing them to send and receive data at any time without the overhead of establishing a new connection for each message. This is different from traditional HTTP communication, which is request-response based and typically requires a new connection for each interaction.

# How does WebSocket work ?
- WebSocket works by establishing a handshake between the client and server, similar to the three-way handshake in TCP. Once the connection is established, both parties can send and receive messages independently of each other. The WebSocket protocol uses a specific format for messages, allowing for efficient communication with minimal overhead.

# What is EventEmitter ?
- EventEmitter is a core module in Node.js that allows objects to emit events and register listeners for those events. It provides a way to handle asynchronous events and is commonly used in server-side applications to manage events such as incoming requests, data processing, and other asynchronous operations.