"use strict";

const express = require("express");
// create user router
const router = express.Router();
// -create user controller
const userController = require("../controllers/userController");

// create user router
// -create user controller

// use the data available in userModel.js
router.post("/", userController.createUser);
router.put("/", (req, res) => {
  res.send("From this point you can add more users");
});
router.delete("/", (req, res) => {
  res.send("From this point you can delete more user");
});
router.get("/", (req, res) => {
  res.send("From this endpoint you can get users.");
});
module.exports = router;
