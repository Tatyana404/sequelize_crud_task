const express = require("express");
const errorHandler = require("./middlewares/error.handler.mw");
const router = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

module.exports = app;
