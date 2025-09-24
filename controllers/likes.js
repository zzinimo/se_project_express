const ClothingItem = require("../models/clothingItem");

const {
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).json({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      return res.status(VALIDATION_ERROR).json({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove the user's like
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).json({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      return res.status(VALIDATION_ERROR).json({ message: err.message });
    });
};

module.exports = { likeItem, dislikeItem };
