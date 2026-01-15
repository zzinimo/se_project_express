const bcrypt = require("bcryptjs"); // importing bcrypt
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const NotFoundError = require("../utils/NotFoundError");
const ConflictError = require("../utils/ConflictError");
const BadRequestError = require("../utils/BadRequestError");
const UnauthorizedError = require("../utils/UnauthorizedError");

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
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError("Email already exists"));
        } else {
          next(err);
        }
      });
  });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError("Current user not found"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("Email is required"));
  }

  if (!password) {
    return next(new BadRequestError("Password is required"));
  }

  // Validate field types
  if (typeof email !== "string" || typeof password !== "string") {
    return next(new BadRequestError("Email and password must be strings"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
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
    .orFail(new NotFoundError("User not found"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
module.exports = { createUser, getCurrentUser, login, updateProfile };
