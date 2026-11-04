const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  // Logic for register

  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (hash) {
        const newUser = new userModel({ name, email, password: hash });
        await newUser.save();
        res.send({ msg: "New user Created successfully" });
      } else {
        res.send({ msg: "something went wrong" });
      }
    });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  // Logic for login
  const { email, password } = req.body;
  const oldUser = await userModel.find({email});
  if (oldUser.length > 0) {
    // User exists, now check the password
    bcrypt.compare(password, oldUser[0].password, (err, result) => {
      if (result) {
        const token = jwt.sign({a:"b"}, "coding") // here a is payload and b is secret key and coding is secret key which is used to verify the token
        res.send({ msg: "Login successful", token });
      } else {
        res.send({ msg: "Invalid credentials" });
      }
    });
  } else {
    res.send({ msg: "User not found" });
  }
});

module.exports = { userRouter };