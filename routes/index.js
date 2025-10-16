const router = require("express").Router();
const { getItems } = require("../controllers/clothingItems");

// Routers
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const likesRouter = require("./likes");

// Auth router
const auth = require("../middlewares/auth"); // Add this import

// controllers
const { login, createUser } = require("../controllers/users");

// Errors
const { NOT_FOUND } = require("../utils/errors");

// public GET route
router.get("/items", getItems);

router.use("/items", auth, clothingItemsRouter);
router.use("/items", auth, likesRouter);
router.use("/users", auth, userRouter);

// POST routes for authentication
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
