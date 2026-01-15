const router = require("express").Router();
const NotFoundError = require("../utils/NotFoundError");

// Routers
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const likesRouter = require("./likes");

// Auth router
const auth = require("../middlewares/auth"); // Add this import

// Validation
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validator");

// controllers
const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItemsRouter);
router.use("/items", auth, likesRouter);
router.use("/users", auth, userRouter);

// POST routes for authentication
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
