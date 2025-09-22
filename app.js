const express = require("express");

const app = express();
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
app.use(express.json());

const mainRouter = require("./routes/index");

app.use((req, res, next) => {
  req.user = {
    _id: "68ccbd974321679185339454", // paste the _id of the test user created in the previous step Alice first in collection
  };
  next();
});

app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // console.log("Connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

app.listen(PORT, () => {
  // console.log(`PORT listening to ${PORT}`);
});
