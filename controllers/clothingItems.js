const ClothingItem = require("../models/clothingItem");

const {
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
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
    .catch((err) => {
      if (err.name === "ValidationError") {
        // Return 400 for validation errors
        return res.status(VALIDATION_ERROR).send({ message: err.message });
      }
      console.error("Error creating item:", err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Error from getItems" });
    });
};

const deleteItem = (req, res) => {
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
    .catch((err) => {
      if (err.message === "Access denied") {
        return res.status(403).send({ message: "Access denied" });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "Error deleting item" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
