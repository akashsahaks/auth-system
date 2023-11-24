const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.status(200).json({ data: " JWT Auth" });
});

module.exports = app;
