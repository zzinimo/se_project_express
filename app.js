const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`PORT listening to ${PORT}`);
});
