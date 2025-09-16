const mongoose = require("mongoose");

const userSchema = new mongoose.schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: true,
  },
});

modules.exports = mongoose.model("user", userSchema);
