require("dotenv").config();
const express = require("express");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

// enable request logger
app.use(requestLogger);

app.use("/", mainRouter);

// enable error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// centralized error handler
app.use(errorHandler);

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
