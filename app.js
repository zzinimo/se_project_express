const express = require("express");

const app = express();

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

app.listen(PORT, () => {
  console.log(`PORT listening to ${PORT}`);
});
