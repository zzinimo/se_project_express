const ClothingItem = require("../models/clothingItem");

const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

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

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const owner = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(new NotFoundError("Item not found"))
    .then((clothingItem) => {
      if (clothingItem.owner.equals(owner)) {
        return clothingItem.deleteOne();
      }
      return Promise.reject(new ForbiddenError("Access denied"));
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
