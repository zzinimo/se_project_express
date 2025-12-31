const bcrypt = require("bcryptjs"); // importing bcrypt
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
  CONFLICT,
} = require("../utils/errors");

const createUser = (req, res, next) => {
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
      .catch(next);
  });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  // Validate field types
  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .send({ message: "Email and password must be strings" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error("Authentication error:", err);
      // This should only be 401 for actual auth failures (wrong email/password)
      res.status(401).send({ message: "Incorrect email or password" });
    });
};

const updateProfile = (req, res, next) => {
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
    .catch(next);
};
module.exports = { createUser, getCurrentUser, login, updateProfile };
