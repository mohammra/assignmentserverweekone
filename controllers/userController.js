"use strict";
// catController
const userModel = require("../models/userModel");
const users = userModel.users;

const getUsers = (req, res) => {
  users.map((user) => {
    delete user.password;
    return user;
  });
  res.json(users);
};

const getUser = (req, res) => {
  const user = cats.filter((user) => {
    return req.params.user_id == user.id;
  })[0];
  if (user) {
    delete user.password;
    //res.json(cats[req.params.cat_id - 1]);
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const modifyUser = (req, res) => {};
const createUser = (req, res) => {
  const message = `username: ${req.body.name}, email: ${req.body.name}`;
  res.send("Adding new user" + userInfo);

  // res.sen("creating user" + userInfo);
};

const deleteUser = (req, res) => {};

module.exports = {
  getUser,
  getUsers,
  modifyUser,
  createUser,
  deleteUser,
};
