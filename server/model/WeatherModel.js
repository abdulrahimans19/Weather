const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  localTimeHr: {
    type: String,
    required: true,
  },
  currentTemp: {
    type: Number,
    required: true,
  },
  ConditionText: {
    type: String,
    required: true,
  },
  currentWind: {
    type: Number,
    required: true,
  },
  currentHumidity: {
    type: Number,
    required: true,
  },
  currentPrecip: {
    type: Number,
    required: true,
  },
  currentDirection: {
    type: String,
    required: true,
  },
  currentFeels: {
    type: Number,
    required: true,
  },
  currentUV: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

const weather = mongoose.model("weatherModel", weatherSchema);

module.exports = weather;
