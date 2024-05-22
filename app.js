const express = require("express");
const errorHandler = require("./middlewares/error.handler.mw");
const router = require("./routes");

const app = express();

app.use(express.json()); // data stream -> json -> js object -> req.body
/* 
  http://localhost:5000/api/*
 */
app.use("/api", router);

app.use(errorHandler);

module.exports = app;
