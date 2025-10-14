const bcrypt = require("bcryptjs"); // importing bcrypt
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT_ERROR).send({ message: "Error getting users" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const userInfo = {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        };
        res.status(201).send(userInfo);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res.status(VALIDATION_ERROR).send({ message: err.message });
        }
        if (err.code === 11000) {
          return res.status(409).send({ message: "Email already exists" });
        }
        return res
          .status(DEFAULT_ERROR)
          .send({ message: "Error creating user" });
      });
  });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Error getting profile" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error("Error is", err);
      res.status(400).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(VALIDATION_ERROR).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Error updating profile" });
    });
};
module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
