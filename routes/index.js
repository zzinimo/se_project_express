const router = require("express").Router();
const clothingItem = require("./clothingItems");

const userRouter = require("./users");

const likesRouter = require("./likes");

router.use("/items", clothingItem);
router.use("/items", likesRouter);
router.use("/users", userRouter);

module.exports = router;
