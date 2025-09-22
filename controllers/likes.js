const ClothingItem = require("../models/clothingItem");

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
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(400).json({ message: err.message });
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
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(400).json({ message: err.message });
    });
};

module.exports = { likeItem, dislikeItem };
