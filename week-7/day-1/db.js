const mongoose = require("momgoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/avenger")

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const userModel = mongoose.model("user", userSchema);

module.exports = {connection, userModel};