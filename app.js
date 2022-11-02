"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
//const router = express.Router();
const catRouter = require("./routes/catRoute");
const userRouter = require("./routes/userRouter");
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cat", catRouter);
//app.get("/user", (req, res) => {
// res.send("From this endpoint you can get users.");
//});
app.use("/user", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
