"use strict";
// catRoute
const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");
router.get("/", catController.getCats);

router.post("/", (req, res) => {
  console.log(req);
  res.send("From this endpoint you can add more cats.");
  no;
});
router.put("/", (req, res) => {
  res.send("From this point you can add more cats");
});
router.delete("/", (req, res) => {
  res.send("From this point you can delete more cats");
});
router.get("/", (req, res) => {
  res.send("From this endpoint you can get users.");
});
router.get("/:cat_id", catController.getCat);

module.exports = router;
