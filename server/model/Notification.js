const mongoose = require("mongoose");

const notification = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  time: {
    type: String,
    required: true,
  },
  emails: [String],
  subject: String,
});

module.exports = mongoose.model("Notification", notification);
