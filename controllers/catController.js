"use strict";
// catController
const catModel = require("../models/catModel");
const cats = catModel.cats;

const getCats = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  const cat = cats.filter((cat) => {
    return req.params.cat_id == cat.id;
  })[0];
  if (cat) {
    //res.json(cats[req.params.cat_id - 1]);
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

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
