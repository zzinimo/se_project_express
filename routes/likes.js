const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateId } = require("../middlewares/validator");

const { likeItem, dislikeItem } = require("../controllers/likes");

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
