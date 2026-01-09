const router = require("express").Router();
const { createItem, deleteItem } = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validator");

// create
router.post("/", validateCardBody, createItem);

// delete

router.delete("/:itemId", validateId, deleteItem);

//  Took out per reviewer request. Thank you
// update
// router.put("/:itemId", updateItem);

module.exports = router;
