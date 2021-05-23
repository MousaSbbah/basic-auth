"use strict";
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

module.exports = async (req, res, next) => {
  try {
    const encoded = req.headers.authorization.split(" ")[1];
    const decoded = base64.decode(encoded);
    const [username, password] = decoded.split(":");
    const user = await User.findOne({ username });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        req.user = user;
        next();
      } else {
        next({ message: "Invalid password ", status: "401" });
      }
    } else {
      next({ message: "Invalid  username", status: "401" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
