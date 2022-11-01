"use strict";
const express = require("express");
const app = express();
const port = 3000;

app.get("/cat", (req, res) => {
  res.send("From this endpoint you can get cats.");
});

app.post("/cat", (req, res) => {
  console.log(req);
  res.send("From this endpoint you can add more cats.");
});
app.put("/cat", (req, res) => {
  res.send("From this point you can add more cats");
});
app.delete("/cat", (req, res) => {
  res.send("From this point you can delete more cats");
});
app.get("/user", (req, res) => {
  res.send("From this endpoint you can get users.");
});
app.get("/cat/:cat_id", (req, res) => {
  console.log(req.params);
  res.send("From this endpoint you can get cat id users." + req.params.cat_id);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
