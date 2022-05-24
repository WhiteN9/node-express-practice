const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
const validateZip = require("./middleware/validateZip.js");
const getZoos = require("./utils/getZoos.js");

// Application-level middleware
app.use(morgan("dev"));

// Routes
app.get("/zoos/all", (req, res) => {
  const status = req.query.admin;
  if (status === "true") {
    res.send(`All zoos: ${getZoos("all").join("; ")}`);
  } else {
    res.send("You do not have access to that route.");
  }
});

app.get("/check/:zip", validateZip, (req, res) => {
  const zipcode = req.params.zip;
  if (getZoos(zipcode)) {
    res.send(`${zipcode} exists in our records.`);
  } else {
    res.send(`${zipcode} does not exist in our records.`);
  }
});

// app.get("/zoos/:zip", validateZip, (req, res) => {
//   const zipcode = req.params.zip;
//   if (getZoos(zipcode).length > 0) {
//     res.send(`${zipcode} zoos: ${zoos.join("; ")}`);
//   } else {
//     res.send(`${zipcode} has no zoos.`);
//   }
// });

app.get("/zoos/:zip", validateZip, (req, res) => {
  const zipcode = req.params.zip;
  if (getZoos(zipcode).length > 0) {
    res.send(`${zipcode} zoos: ${getZoos(zipcode).join("; ")}`);
  } else {
    res.send(`${zipcode} has no zoos.`);
  }
});

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
