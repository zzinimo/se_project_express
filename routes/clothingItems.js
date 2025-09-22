const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");

// Log method and path for all /items routes
router.use((req, res, next) => {
  next();
});

// create
router.post("/", createItem);

// read
router.get("/", getItems);

// delete

router.delete("/:itemId", deleteItem);

//  Took out per reviewer request. Thank you
// update
// router.put("/:itemId", updateItem);

module.exports = router;
