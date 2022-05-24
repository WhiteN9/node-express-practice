const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
const validateZip = require("middleware/validateZip.js");
const getZoos = require("utils/getZoos.js");

// Application-level middleware
app.use(morgan("dev"));

// Routes

// No-route handler
app.use((req, res, next) => {
  res.send("That route could not be found!");
});

// Error handler
app.use((error, req, res, next) => {
  error = error || "Internal Server Error!";
  res.send(error);
});

module.exports = app;
