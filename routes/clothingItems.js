const router = require("express").Router();
const { createItem, deleteItem } = require("../controllers/clothingItems");

// create
router.post("/", createItem);

// delete

router.delete("/:itemId", deleteItem);

//  Took out per reviewer request. Thank you
// update
// router.put("/:itemId", updateItem);

module.exports = router;
