// Import EventEmitter class from the events module
const EventEmitter = require("events");

// ee object is an instance of EventEmitter class
const ee = new EventEmitter();

// Handeling/Read
// on => method name, myEvent => event name, data => data to be passed
ee.on("myEvent", (data) => {
    console.log(data)
})

// Trigger/Sending Data
// emit => Method for triggering
ee.emit("myEvent", "Hello World")