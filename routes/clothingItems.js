const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");

// Log method and path for all /items routes
router.use((req, res, next) => {
  console.log(`ZACH METHOD: ${req.method} PATH: ${req.originalUrl}`);
  next();
});

//create
router.post("/", createItem);

//read
router.get("/", getItems);

//update
router.put("/:itemId", updateItem);

//delete

router.delete("/:itemId", deleteItem);

module.exports = router;
