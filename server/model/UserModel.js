const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("userModel", userSchema);

module.exports = user;
