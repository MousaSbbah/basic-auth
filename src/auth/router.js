"use strict";

const bcrypt = require("bcrypt");
const User = require("./models/users.js");
const basic = require("./middleware/basic");
const express = require("express");
const Router = express.Router();


//signup rout function 
Router.post("/signup", async (req, res) => {
  try {
    //hash the password by use bcrypt
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    //save to the mongoose database
    const user = new User({ username, password: hash });
    const record = await user.save();
    // response
    res.status(201).json(record);
  } catch (error) {
    if (error) res.status(403).json({ error: error.message });
  }
});
//signin rout  basic middleware function
Router.post("/signin", basic, async (req, res) => {
  //response
  res.status(200).json(req.user);
});

module.exports = Router;
