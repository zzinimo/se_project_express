const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validator");

// get all items (public route)
router.get("/", getItems);

// create (protected route)
router.post("/", auth, validateCardBody, createItem);

// delete (protected route)
router.delete("/:itemId", auth, validateId, deleteItem);

//  Took out per reviewer request. Thank you
// update
// router.put("/:itemId", updateItem);

module.exports = router;
