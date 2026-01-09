const ClothingItem = require("../models/clothingItem");

const { VALIDATION_ERROR, NOT_FOUND } = require("../utils/errors");

const { NotFoundError } = require("../utils/NotFoundError");

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Item not found"))
    .then((item) => {
      res.status(200).json({ data: item });
    })
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove the user's like
    { new: true }
  )
    .orFail(new NotFoundError("Item not found"))
    .then((item) => {
      res.status(200).json({ data: item });
    })
    .catch(next);
};

module.exports = { likeItem, dislikeItem };
