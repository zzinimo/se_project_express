const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

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
