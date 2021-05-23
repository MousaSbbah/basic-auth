"use strict";

const bcrypt = require("bcrypt");
const User = require("./models/users.js");
const basic = require("./middleware/basic");
const express = require("express");
const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    const record = await user.save();
    console.log(record);
    res.status(201).json(record);
  } catch (error) {
    // console.log(error)
    if (error) res.status(403).json({ error: error.message });
  }
});

Router.post("/signin", basic, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = Router;
