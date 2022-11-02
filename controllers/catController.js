"use strict";
// catController
const catModel = require("../module/catModel");
const cats = catModel.cats;

const getCats = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {};
const modifyCat = (req, res) => {};
const createCat = (req, res) => {};
const deleteCat = (req, res) => {};

module.exports = {
  getCat,
  getCats,
  modifyCat,
  createCat,
  deleteCat,
};
