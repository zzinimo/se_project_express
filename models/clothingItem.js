const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    required: true,
    type: String,
    enum: ["hot", "warm", "cold"],
  },

  imageUrl: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },

  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
