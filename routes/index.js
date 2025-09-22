const router = require("express").Router();
const clothingItem = require("./clothingItems");

const userRouter = require("./users");

const likesRouter = require("./likes");

router.use("/items", clothingItem);
router.use("/items", likesRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
