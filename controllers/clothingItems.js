const ClothingItem = require("../models/clothingItem");

const {
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner,
  })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch(next);
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Error from getItems" });
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const owner = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
      if (clothingItem.owner.equals(owner)) {
        return clothingItem.deleteOne();
      }
      return Promise.reject(new Error("Access denied"));
    })
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
